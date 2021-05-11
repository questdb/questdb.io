---
title: InfluxDB line protocol
description:
  This document describes how to write data into QuestDB using InfluxDB line
  protocol with details on the message format and hints for troubleshooting
  common issues
---

QuestDB exposes a reader for InfluxDB line protocol which allows using QuestDB
as a drop-in replacement for InfluxDB and other systems which implement this
protocol. This guide provides practical details of using InfluxDB line protocol
to send data to QuestDB, with hints for formatting messages to ensure that
QuestDB correctly parses incoming data as the desired data type.

For more details on configuring the QuestDB server with ingestion settings,
refer to the [InfluxDB API reference](/docs/reference/api/influxdb/).

## Message format

InfluxDB line protocol messages have the following syntax:

```shell
table_name,tagset fieldset timestamp
```

The data of each row is serialized in a "pseudo-CSV" format where each line is
composed of the following:

- the table name followed by a comma
- several comma-separated items of tags in the format `<label>=<value>` followed
  by a space
- several comma-separated items of fields in the format `<label>=<value>`
  followed by a space
- an optional timestamp for the record
- a newline character `\n`

A single line of text in line protocol format represents one table row QuestDB.
Consider the following InfluxDB line protocol message:

```shell title="Basic line protocol message"
sensors,location=london-1 temperature=22 1465839830100400200
```

This would create a new row in the `sensors` table with the following contents:

| location | temperature | timestamp           |
| -------- | ----------- | ------------------- |
| london-1 | 22          | 1465839830100400200 |

### InfluxDB terminology

InfluxDB have the following description of the elements of line protocol:

```shell title="InfluxDB line protocol"
measurementName,tagKey=tagValue fieldKey="fieldValue" 1465839830100400200
--------------- --------------- --------------------- -------------------
       |               |                  |                    |
  Measurement         Tags              Fields             Timestamp
```

In the context of QuestDB, it should be noted that the `measurementName` element
equates to a **table name**.

## Naming restrictions

Tag keys and field keys in InfluxDB line protocol messages equate to column
names. In QuestDB, column names cannot contain the following characters, and as
such, tag and field keys must not contain any of the following characters:

```text
[whitespace]
.
?
,
:
\
/
\\
\0
)
(
_
+
*
~
%
```

### Differences with InfluxDB

In InfluxDB, table names, tag keys, and field keys cannot begin with an
underscore `_`. This restriction is **not enforced** in QuestDB, and therefore
the following InfluxDB line protocol message will produce a valid row in
QuestDB:

```bash
_sensor_data,_sensor=london_1 _value=12.4,string="sensor data, rev 1"
```

Note that spaces and commas do not require an escaping backslash in the field
value for `string`.

## Data types

Field values may be parsed by QuestDB as one of the following types:

- `double`
- `long`
- `boolean`
- `string`

All subsequent field values must match the type of the first row written to a
given column.

:::info

For details on the available data types in QuestDB, see the
[data types reference](/docs/reference/sql/datatypes/).

:::

### Strings

If field values are passed string types, the field values must be double-quoted.
Special characters are supported without escaping:

```bash
sensors,location=london temperature=22,software_version="A.B C-123"
sensors,location=london temperature=22,software_version="SV .#_123"
```

For string types in QuestDB, the storage is allocated as `32+n*16` bits where
`n` is the string length with a maximum value of `0x7fffffff`.

### Numeric

The default numerical type is a 64-bit `double` type. To store numeric values as
integers, a trailing `i` must follow the value. The following line protocol
message adds a `long` type integer column for temperature:

```bash
sensors,location=london temperature=22,temp_int=22i
```

The `sensors` table would have the following row added:

| column      | type           | value  |
| ----------- | -------------- | ------ |
| location    | `string`       | london |
| temperature | `double`       | 22     |
| temp_int    | `long` integer | 22     |

QuestDB handles `long` types as a signed integer from `0x8000000000000000L` to
`0x7fffffffffffffffL`.

### Boolean

Boolean values can be passed in InfluxDB line protocol messages with any of the
following:

| Type    | Variants                   |
| ------- | -------------------------- |
| `TRUE`  | `t`, `T`, `true`, `True`   |
| `FALSE` | `f`, `F`, `false`, `False` |

The following example adds a `boolean` type column called `warning`:

```bash
sensors,location=london temperature=22,warning=false
```

## Table schema

It is not necessary to create a table schema for messages passed via InfluxDB
line protocol. A table will be dynamically created if one does not exist. If new
columns are added as field or tag sets, the table is automatically updated to
reflect the new structure and the new column will be back-propagated with null
values.

When new tables are created by inserting records via InfluxDB line protocol, a
default [partitioning strategy](/docs/concept/partitions/) by `DAY` is applied.
This default can be overridden by means of passing server configuration for
`line.tcp.default.partition.by`, i.e.

```bash title="server.conf"
line.tcp.default.partition.by=MONTH
```

For information describing how to pass server settings to QuestDB, see the
[configuration documentation](/docs/reference/configuration/) page.

## QuestDB listener configuration

QuestDB can ingest line protocol packets both over TCP and UDP with the
following defaults:

- InfluxDB TCP listener on port `9009` by default
- InfluxDB UDP listener on port `9009` by default

For more details on configuring how QuestDB ingests InfluxDB line protocol
messages, including setting alternative ports, refer to the following server
configuration references:

- [InfluxDB line protocol TCP configuration](/docs/reference/configuration/#influxdb-line-protocol-tcp)
- [InfluxDB line protocol UDP configuration](/docs/reference/configuration/#influxdb-line-protocol-udp)

## Examples

The following basic Python example demonstrates how to stream InfluxDB line
protocol messages to QuestDB over TCP. For more examples using different
languages, see the [insert data](/docs/develop/insert-data/) documentation.

```python
import time
import socket
# For UDP, change socket.SOCK_STREAM to socket.SOCK_DGRAM
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

try:
  sock.connect(('localhost', 9009))
  # Single record insert
  sock.send(('trades,name=client_timestamp value=12.4 %d\n' %(time.time_ns())).encode())
  # Omitting the timestamp allows the server to assign one
  sock.send(('trades,name=server_timestamp value=12.4\n').encode())
  # Streams of readings must be newline-delimited
  sock.send(('trades,name=ilp_stream_1 value=12.4\ntrades,name=ilp_stream_2 value=11.4\n').encode())

except socket.error as e:
  print("Got error: %s" % (e))

sock.close()
```
