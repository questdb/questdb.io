---
title: REST API
sidebar_label: REST
description: REST API reference documentation.
---

The QuestDB REST API is based on standard HTTP features and is understood by
off-the-shelf HTTP clients. It provides a simple way to interact with QuestDB
and is compatible with most programming languages. API functions are fully keyed
on the URL and they use query parameters as their arguments.

The Web Console is the official Web client relying on the REST API. Find out
more in the section [using the Web Console](/docs/reference/web-console/).

**Available methods**

- [`/imp`](#imp---import-data) for importing data from `.CSV` files
- [`/exec`](#exec---execute-queries) to execute a SQL statement
- [`/exp`](#exp---export-data) to export data

## /imp - Import data

`/imp` streams tabular text data directly into a table. It supports CSV, TAB and
pipe (`|`) delimited inputs with optional headers. There are no restrictions on
data size. Data types and structures are detected automatically, without
additional configuration. In some cases, additional configuration can be
provided to improve the automatic detection as described in
[user-defined schema](#user-defined-schema).

:::note

The structure detection algorithm analyses the chunk in the beginning of the
file and relies on relative uniformity of data. When the first chunk is
non-representative of the rest of the data, automatic imports can yield errors.

If the data follows a uniform pattern, the number of lines which are analyzed
for schema detection can be reduced to improve performance during uploads using
the `http.text.analysis.max.lines` key. Usage of this setting is described in
the
[HTTP server configuration](/docs/reference/configuration#minimal-http-server)
documentation.

:::

### URL parameters

`/imp` is expecting an HTTP POST request using the `multipart/form-data`
Content-Type with following optional URL parameters which must be URL encoded:

| Parameter     | Required | Default          | Description                                                                                                                                                                                                          |
| ------------- | -------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `atomicity`   | No       | `2`              | `0`, `1` or `2`. Behaviour when an error is detected in the data. `0`: the entire file will be skipped. `1`: the row is skipped. `2`: the column is skipped.                                                         |
| `durable`     | No       | `false`          | `true` or `false`. When set to `true`, import will be resilient against OS errors or power losses by forcing the data to be fully persisted before sending a response back to the user.                              |
| `fmt`         | No       | `tabular`        | Can be set to `json` to get the response formatted as such.                                                                                                                                                          |
| `forceHeader` | No       | `false`          | `true` or `false`. When `false`, QuestDB will try to infer if the first line of the file is the header line. When set to `true`, QuestDB will expect that line to be the header line.                                |
| `name`        | No       | Name of the file | Name of the table to create, [see below](/docs/reference/api/rest/#names).                                                                                                                                           |
| `overwrite`   | No       | `false`          | `true` or `false`. When set to true, any existing data or structure will be overwritten.                                                                                                                             |
| `partitionBy` | No       | `NONE`           | See [partitions](/docs/concept/partitions/#properties).                                                                                                                                                              |
| `skipLev`     | No       | `false`          | `true` or `false`. Skip “Line Extra Values”, when set to true, the parser will ignore those extra values rather than ignoring entire line. An extra value is something in addition to what is defined by the header. |
| `timestamp`   | No       |                  | Name of the column that will be used as a [designated timestamp](/docs/concept/designated-timestamp/).                                                                                                               |

```shell title="Example usage"
curl -F data=@weather.csv \
'http://localhost:9000/imp?overwrite=true&name=new_table&timestamp=ts&partitionBy=MONTH'
```

Further example queries with context on the source CSV file contents relative
and the generated tables are provided in the [examples section](#examples)
below.

### Names

Table and column names are subject to restrictions, the following list of
characters are automatically removed:

```plain
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
-
*
~
%
```

When the header row is missing, column names are generated automatically.

### Consistency guarantees

`/imp` benefits from the properties of the QuestDB
[storage model](/docs/concept/storage-model/#consistency-and-durability),
although Atomicity and Durability can be relaxed to meet convenience and
performance demands.

#### Atomicity

QuestDB is fully insured against any connection problems. If the server detects
closed socket(s), the entire request is rolled back instantly and transparently
for any existing readers. The only time data can be partially imported is when
atomicity is in `relaxed` mode and data cannot be converted to column type. In
this scenario, any "defective" row of data is discarded and `/imp` continues to
stream request data into table.

#### Consistency

This property is guaranteed by consistency of append transactions against
QuestDB storage engine.

#### Isolation

Data is committed to QuestDB storage engine at end of request. Uncommitted
transactions are not visible to readers.

#### Durability

`/imp` streams data from network socket buffer directly into memory mapped
files. At this point data is handed over to the OS and is resilient against
QuestDB internal errors and unlikely but hypothetically possible crashes. This
is default method of appending data and it is chosen for its performance
characteristics. In cases where transaction has to be resilient against OS
errors or power losses physical durability can be enforced. At a cost of append
performance QuestDB storage engine will also guarantee that each memory block is
flushed to physical device.

### Examples

#### Automatic schema detection

The following example uploads a file `ratings.csv` which has the following
contents:

| ts                          | visMiles       | tempF | dewpF |
| --------------------------- | -------------- | ----- | ----- |
| 2010-01-01T00:00:00.000000Z | 8.8            | 34    | 30    |
| 2010-01-01T00:51:00.000000Z | 9.100000000000 | 34    | 30    |
| 2010-01-01T01:36:00.000000Z | 8.0            | 34    | 30    |
| ...                         | ...            | ...   | ...   |

An import can be performed with automatic schema detection with the following
request:

```shell
curl -F data=@weather.csv 'http://localhost:9000/imp'
```

A HTTP status code of `200` will be returned and the response will be:

```shell
+-------------------------------------------------------------------------------+
|      Location:  |     weather.csv  |        Pattern  | Locale  |      Errors  |
|   Partition by  |            NONE  |                 |         |              |
|      Timestamp  |            NONE  |                 |         |              |
+-------------------------------------------------------------------------------+
|   Rows handled  |           49976  |                 |         |              |
|  Rows imported  |           49976  |                 |         |              |
+-------------------------------------------------------------------------------+
|              0  |              ts  |                TIMESTAMP  |           0  |
|              1  |        visMiles  |                   DOUBLE  |           0  |
|              2  |           tempF  |                      INT  |           0  |
|              3  |           dewpF  |                      INT  |           0  |
+-------------------------------------------------------------------------------+
```

#### User-defined schema

To specify the schema of a table, a schema object can be provided:

```shell
curl \
-F schema='[{"name":"dewpF", "type": "STRING"}]' \
-F data=@weather.csv 'http://localhost:9000/imp'
```

```shell title="Response"
+------------------------------------------------------------------------------+
|      Location:  |    weather.csv  |        Pattern  | Locale  |      Errors  |
|   Partition by  |           NONE  |                 |         |              |
|      Timestamp  |           NONE  |                 |         |              |
+------------------------------------------------------------------------------+
|   Rows handled  |          49976  |                 |         |              |
|  Rows imported  |          49976  |                 |         |              |
+------------------------------------------------------------------------------+
|              0  |             ts  |                TIMESTAMP  |           0  |
|              1  |       visMiles  |                   DOUBLE  |           0  |
|              2  |          tempF  |                      INT  |           0  |
|              3  |          dewpF  |                   STRING  |           0  |
+------------------------------------------------------------------------------+
```

**Non-standard timestamp formats**

Given a file `weather.csv` with the following contents which contains a
timestamp with a non-standard format:

| ts                    | visMiles       | tempF | dewpF |
| --------------------- | -------------- | ----- | ----- |
| 2010-01-01 - 00:00:00 | 8.8            | 34    | 30    |
| 2010-01-01 - 00:51:00 | 9.100000000000 | 34    | 30    |
| 2010-01-01 - 01:36:00 | 8.0            | 34    | 30    |
| ...                   | ...            | ...   | ...   |

The file can be imported as usual with the following request:

```shell title="Importing CSV with non-standard timestamp"
curl -F data=@weather.csv 'http://localhost:9000/imp'
```

A HTTP status code of `200` will be returned and the import will be successful,
but the timestamp column is detected as a `STRING` type:

```shell title="Response with timestamp as STRING type"
+-------------------------------------------------------------------------------+
|      Location:  |     weather.csv  |        Pattern  | Locale  |      Errors  |
|   Partition by  |            NONE  |                 |         |              |
|      Timestamp  |            NONE  |                 |         |              |
+-------------------------------------------------------------------------------+
|   Rows handled  |           49976  |                 |         |              |
|  Rows imported  |           49976  |                 |         |              |
+-------------------------------------------------------------------------------+
|              0  |              ts  |                   STRING  |           0  |
|              1  |        visMiles  |                   DOUBLE  |           0  |
|              2  |           tempF  |                      INT  |           0  |
|              3  |           dewpF  |                      INT  |           0  |
+-------------------------------------------------------------------------------+
```

To amend the timestamp column type, this example curl can be used which has a
`schema` JSON object to specify that the `ts` column is of `TIMESTAMP` type with
the pattern `yyyy-MM-dd - HH:mm:ss`

Additionally, URL parameters are provided:

- `overwrite=true` to overwrite the existing table
- `timestamp=ts` to specify that the `ts` column is the designated timestamp
  column for this table
- `partitionBy=MONTH` to set a
  [partitioning strategy](/docs/operations/data-retention/) on the table by
  `MONTH`

```shell title="Providing a user-defined schema"
curl \
-F schema='[{"name":"ts", "type": "TIMESTAMP", "pattern": "yyyy-MM-dd - HH:mm:ss"}]' \
-F data=@weather.csv \
'http://localhost:9000/imp?overwrite=true&timestamp=ts&partitionBy=MONTH'
```

The HTTP status code will be set to `200` and the response will show `0` errors
parsing the timestamp column:

```shell
+------------------------------------------------------------------------------+
|      Location:  |    weather.csv  |        Pattern  | Locale  |      Errors  |
|   Partition by  |          MONTH  |                 |         |              |
|      Timestamp  |             ts  |                 |         |              |
+------------------------------------------------------------------------------+
|   Rows handled  |          49976  |                 |         |              |
|  Rows imported  |          49976  |                 |         |              |
+------------------------------------------------------------------------------+
|              0  |             ts  |                TIMESTAMP  |           0  |
|              1  |       visMiles  |                   DOUBLE  |           0  |
|              2  |          tempF  |                      INT  |           0  |
|              3  |          dewpF  |                      INT  |           0  |
+------------------------------------------------------------------------------+
```

## /exec - Execute queries

`/exec` compiles and executes the SQL query supplied as a parameter and returns
a JSON response.

:::note

The query execution terminates automatically when the socket connection is
closed.

:::

### Overview

`/exec` is expecting an HTTP GET request with following query parameters:

| Parameter | Required | Default | Description                                                                                                                                                                                                              |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `count`   | No       | `false` | `true` or `false`. Counts the number of rows and returns this value.                                                                                                                                                     |
| `limit`   | No       |         | Paging parameter. For example, `limit=10,20` will return row numbers 10 through to 20 inclusive and `limit=20` will return first 20 rows, which is equivalent to `limit=0,20`. `limit=-20` will return the last 20 rows. |
| `nm`      | No       | `false` | `true` or `false`. Skips the metadata section of the response when set to `true`.                                                                                                                                        |
| `query`   | Yes      |         | URL encoded query text. It can be multi-line.                                                                                                                                                                            |
| `timings` | No       | `false` | `true` or `false`. When set to `true`, QuestDB will also include a `timings` property in the response which gives details about the execution.                                                                           |

The parameters must be URL encoded.

### Examples

This endpoint returns responses in the following format:

```json
{
  "query": string,
  "columns": Array<{ "name": string, "type": string }>
  "dataset": Array<Array<Value for Column1, Value for Column2>>,
  "count": Optional<number>,
  "timings": Optional<{ compiler: number, count: number, execute: number}>
}
```

You can find the exact list of types in the
[dedicated page](/docs/reference/sql/datatypes/).

Considering the query:

```shell
curl -G \
  --data-urlencode "query=select timestamp, tempF from weather limit 2;" \
  --data-urlencode "count=true" \
  http://localhost:9000/exec
```

A HTTP status code of `200` is returned with the following response body:

```json
{
  "query": "select timestamp, tempF from weather limit 2;",
  "columns": [
    {
      "name": "timestamp",
      "type": "TIMESTAMP"
    },
    {
      "name": "tempF",
      "type": "INT"
    }
  ],
  "dataset": [
    ["2010-01-01T00:00:00.000000Z", 34],
    ["2010-01-01T00:51:00.000000Z", 34]
  ],
  "count": 2
}
```

## /exp - Export data

This endpoint allows you to pass url-encoded queries but the request body is
returned in a tabular form to be saved and reused as opposed to JSON.

### Overview

`/exp` is expecting an HTTP GET request with following parameters:

| Parameter | Required | Description                                                                                                                                                                                                                  |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`   | No       | Paging opp parameter. For example, `limit=10,20` will return row numbers 10 through to 20 inclusive and `limit=20` will return first 20 rows, which is equivalent to `limit=0,20`. `limit=-20` will return the last 20 rows. |
| `query`   | Yes      | URL encoded query text. It can be multi-line.                                                                                                                                                                                |

The parameters must be URL encoded.

### Examples

Considering the query:

```shell
curl -G \
  --data-urlencode "query=select AccidentIndex2, Date, Time from 'Accidents0514.csv'" \
  --data-urlencode "limit=5" \
  http://localhost:9000/exp
```

A HTTP status code of `200` is returned with the following response body:

```shell
"AccidentIndex","Date","Time"
200501BS00001,"2005-01-04T00:00:00.000Z",17:42
200501BS00002,"2005-01-05T00:00:00.000Z",17:36
200501BS00003,"2005-01-06T00:00:00.000Z",00:15
200501BS00004,"2005-01-07T00:00:00.000Z",10:35
200501BS00005,"2005-01-10T00:00:00.000Z",21:13
```

## Error responses

### Malformed queries

A successful call to `/exec` or `/exp` which also contains a malformed query
will return response bodies with the following format:

```json
{
  "query": string,
  "error": string,
  "position": number
}
```

The `position` field is the character number from the beginning of the string
where the error was found.

Considering the query:

```shell
curl -G \
  --data-urlencode "query=SELECTT * FROM table;" \
  http://localhost:9000/exp
```

A HTTP status code of `200` is returned with the following response body:

```json
{
  "query": "SELECTT * FROM table;",
  "error": "function, literal or constant is expected",
  "position": 8
}
```
