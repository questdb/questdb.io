---
title: Designated timestamp
sidebar_label: Designated timestamp
description:
  How designated timestamps are implemented and why it is an important
  functionality for time-series.
---

QuestDB offers the option to elect a column as a _designated timestamp_. This
allows you to leverage the high-performance time series features of QuestDB, but
introduces a constraint on the timestamp column that will reject out-of-order
inserts.

## Properties

- Only a column of type `timestamp` can be elected as a designated timestamp.
- Only one column can be elected for a given table.
- A designated timestamp is elected either:
  - during table creation
  - within a query using a
    [timestamp function](/docs/reference/function/timestamp/)

## Out-of-order policy

Once a column is elected as a designated timestamp, it will enforce an order
policy on this column, and out-of-order inserts will be rejected. In other
words, new timestamp values need to be greater than or equal to the latest
timestamp in the column. Columns other than the designated timestamp are not
affected by this policy.

## Advantages

Electing a designated timestamp allows you to:

- Partition tables by time range. For more information, see the
  [partitions reference](/docs/concept/partitions/).
- Use time series joins such as `ASOF JOIN`. For more information, see the
  [JOIN reference](/docs/reference/sql/join/).

## Illustration

The following diagrams illustrate the effect of inserting new records when a
table has a designated timestamp. The designated timestamp column only allows
timestamps with greater than or equal values.

Attempting to insert records with out-of-order timestamps will result in the
record being rejected, and QuestDB will log an error for the `INSERT` statement:

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Diagram of an out of order insertion being rejected"
  height={662}
  src="/img/docs/concepts/timestampReject.svg"
  width={745}
/>

Other `timestamp` type columns may have values inserted in any order:

<Screenshot
  alt="Comparison between a designated timestamp and a normal timestamp"
  height={620}
  src="/img/docs/concepts/designatedTimestamp.svg"
  width={745}
/>

## Working with timestamp order constraint

It may be impractical to enforce an ordered constraint on the timestamp column.
There are two approaches that can be used in such cases:

1. Use the database host clock as designated timestamp by using
   `systimestamp()`. For more information about `systimestamp()`, see the
   [date & time functions](/docs/reference/function/date-time/) reference.

  ```questdb-sql title="The db_ts column is specified as designated timestamp"
  CREATE TABLE readings(
      db_ts timestamp,
      device_ts timestamp,
      device_name symbol,
      reading int)
  timestamp(db_ts);
  ```

  ```questdb-sql title="Using system timestamp while retaining the device timestamp"
  INSERT INTO readings VALUES(
      systimestamp(),
      to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'),
      'my_sensor',
      123);
  ```

2. Use a temporary table with out-of-order data:

  ```questdb-sql title="Main table with designated timestamp"
  CREATE TABLE readings(
      db_ts timestamp,
      device_ts timestamp,
      device_name symbol,
      reading int)
      timestamp(db_ts)
  PARTITION BY DAY;
  ```

  ```questdb-sql title="Temporary table which may have out-of-order data"
  CREATE TABLE readings_temp(
      db_ts timestamp,
      device_ts timestamp,
      device_name symbol,
      reading int);
  ```

  Data in the temporary table can then be ordered and inserted into the main
  table. This can be a scheduled task run at the interval that the table is
  partitioned by:

  ```questdb-sql title="Order and insert data"
  INSERT INTO readings
      SELECT * FROM (readings_temp ORDER BY db_ts) timestamp(db_ts);
  ```
