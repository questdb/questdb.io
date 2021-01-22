---
title: Data retention
description:
  How manage data retention of a QuestDB instance for saving disk space
---

## Background

The nature of time-series data is that the relevance of information diminishes
over time. If stale data is no longer required, users can delete old data from
QuestDB to either save disk space or adhere to a data retention policy. This is
achieved in QuestDB by removing data partitions from a table.

## Strategy for data retention

A simple approach to removing stale data is to drop data which has been
partitioned by time. The caveat is that this can only be achieved if a table has
been partitioned during a `CREATE TABLE` operation.

Tables can be partitioned by either:

- Day
- Month
- Year

```
CREATE TABLE my_table(ts TIMESTAMP, symb SYMBOL, price DOUBLE) timestamp(ts)
PARTITION BY DAY;
```

:::note

The partitioning strategy cannot be changed after table is created!

:::

### Example

The following example demonstrates creating tables with partitioning and
dropping partitions based on time. To have example data for illustration
purposes, this example produces 5 days' worth of data with one incrementing
`LONG` value inserted per hour.

```questdb-sql title="Creating a table and generating data"
CREATE TABLE my_table (timestamp TIMESTAMP, x LONG) timestamp(timestamp)
PARTITION BY DAY;

INSERT INTO my_table
SELECT timestamp_sequence(
    to_timestamp('2021-01-01T00:00:00', 'yyyy-MM-ddTHH:mm:ss'),100000L * 36000), x
FROM long_sequence(120);
```

For reference, the following functions are used to generate the example data:

- [timestamp sequence](/docs/reference/function/timestamp-generator/#timestamp_sequence) with 1 hour stepping
- [row generator](/docs/reference/function/row-generator/#long_sequence) with `long_sequence()` function which creates a `x:long` column

The result of partitioning is visible when listing as directories on disk:

```bash title="path/to/<QuestDB-root>/db"
my_table
├── 2021-01-01
├── 2021-01-02
├── 2021-01-03
├── 2021-01-04
└── 2021-01-05
```

Partitions can then be dropped using the following queries:

```
--Delete a specific DAY partition
ALTER TABLE my_table DROP PARTITION LIST '2021-01-01';

--Drop days before 2021-01-04
ALTER TABLE my_table
DROP PARTITION
WHERE timestamp < to_timestamp('2021-01-04', 'yyyy-MM-dd');
```

For more information on partitioning, refer to the
[partitioning strategy](/docs/concept/partitions/) page.

<!-- What not to do / dangers -->
