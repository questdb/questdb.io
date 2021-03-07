---
title: Designated timestamp
sidebar_label: Designated timestamp
description:
  How designated timestamps are implemented and why it is an important
  functionality for time-series.
---

QuestDB offers the option to elect a column as *designated timestamp*. This
allows you to leverage the high-performance time series functions of QuestDB,
but introduces a constraint on the column in question that will reject
out-of-order inserts.

## Properties

- Only a `timestamp` column can be designated timestamp.
- Only one column can be elected for a given table.
- Designated timestamp can be elected either:
  - during table creation.
  - on the fly on sub-tables created within a query.

:::tip

To elect a timestamp column on the fly, please refer to the
[dynamic timestamp](/docs/reference/function/timestamp/) documentation.

:::

## Out-of-order policy

Once a column is elected as designated timestamp, it will enforce an order
policy on this column. Inserts in designated timestamp need to be incrementing
and out-of-order timestamps inserts will be rejected. This does not affect the
behaviour of other columns.

:::tip

New timestamps need to be greater or equal to the latest timestamp in the
column.

:::

## Advantages

Electing a designated timestamp allows you to:

- Leverage timestamp partitions. For more information, refer to the
  [partitions section](/docs/concept/partitions/).
- Use time series joins such as `ASOF JOIN`. For more information refer to the
  [JOIN reference](/docs/reference/sql/join/).

## Examples

Representation of designated timestamp as a special column alongside other
existing timestamp columns. Note that:

- The designated timestamp column only allows ordered timestamps.
- Any other `timestamp` column tolerates out-of-order timestamps.

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Comparison between a designated timestamp and a normal timestamp"
  height={620}
  src="/img/docs/concepts/designatedTimestamp.svg"
  width={745}
/>

Attempts to insert out-of-order timestamps will be rejected:

<Screenshot
  alt="Diagram of an out of order insertion being rejected"
  height={662}
  src="/img/docs/concepts/timestampReject.svg"
  width={745}
/>

## Working with timestamp order constraint

The constraint provides many benefits for both insert and query speed. However,
it may be impractical in certain cases, for example when inserting values from
multiple devices with slightly different clocks or network conditions. Luckily,
there are ways to circumvent this with little overhead.

:::note

This is a temporary workaround. We are working on a table implementation which
supports out-of-order insertion.

:::

- Use the database host clock as designated timestamp by using
  `systimestamp()`:

```questdb-sql
CREATE TABLE readings(
    db_ts timestamp,
    device_ts timestamp,
    device_name symbol,
    reading int)
timestamp(db_ts);
```

```questdb-sql
INSERT INTO readings VALUES(
systimestamp(),
to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'),
'ig-1579JS09H',
133
);
```

:::info

For more information about `systimestamp()` and related functions, check the
[date & time functions section](/docs/reference/function/date-time/).

:::

- Use a temporary table for the latest partition. Data can be out-of-order in
  this table.

```questdb-sql title="Main table"
CREATE TABLE readings(
    db_ts timestamp,
    device_ts timestamp,
    device_name symbol,
    reading int)
    timestamp(db_ts)
PARTITION BY DAY;
```

```questdb-sql title="Temporary table"
CREATE TABLE readings_temp(
    db_ts timestamp,
    device_ts timestamp,
    device_name symbol,
    reading int);
```

When switching over to a new day, order the data in the temporary partition as
it is inserted into the main table.

fashion:

```questdb-sql title="Insert ordered data"
INSERT INTO readings
    SELECT * FROM (readings_temp ORDER BY db_ts) timestamp(db_ts);
```
