---
title: ALTER TABLE DROP PARTITION
sidebar_label: DROP PARTITION
description: DROP PARTITION SQL keyword reference documentation.
---

Drops one or more partitions from an existing table.

Similar to dropping columns, dropping of partitions is a non-blocking and
non-waiting operation. While atomic for single partitions, dropping multiple
partitions is in itself non-atomic. The operation will exit on the first failure
and will not continue through a list of partitions if one fails to be dropped.

:::info

The most recent (i.e. currently active) partition cannot be removed

:::

:::caution

Use `DROP PARTITION` with care as QuestDB **cannot recover data from dropped
partitions**!

:::

## Syntax

![Flow chart showing the syntax of the ALTER TABLE keyword](/img/docs/diagrams/alterTable.svg)
![Flow chart showing the syntax of ALTER TABLE with DROP PARTITION keyword](/img/docs/diagrams/alterTableDropPartition.svg)

## Drop partition by name

The partition name must match the name of the directory for the given partition.
The naming convention for partition directories is as follows:

| Table Partition | Partition format |
| --------------- | ---------------- |
| `DAY`           | `YYYY-MM-DD`     |
| `MONTH`         | `YYYY-MM`        |
| `YEAR`          | `YYYY`           |

### Examples

```questdb-sql title="Drop a single partition"
--DAY
ALTER TABLE measurements DROP PARTITION LIST '2019-05-18';
--MONTH
ALTER TABLE measurements DROP PARTITION LIST '2019-05';
--YEAR
ALTER TABLE measurements DROP PARTITION LIST '2019';
```

```questdb-sql title="Drop multiple partitions"
ALTER TABLE measurements DROP PARTITION LIST '2018','2019';
```

## Drop partitions using boolean expression

Drops partitions based on a boolean expression on the designated timestamp
column.

### Examples

```questdb-sql title="Drop one partition"
ALTER TABLE measurements
DROP PARTITION
WHERE timestamp = to_timestamp('2019-01-01:00:00:00', 'yyyy-MM-dd:HH:mm:ss');
```

```questdb-sql title="Drop all partitions older than 2018"
ALTER TABLE measurements
DROP PARTITION
WHERE timestamp < to_timestamp('2018-01-01:00:00:00', 'yyyy-MM-dd:HH:mm:ss');
```
