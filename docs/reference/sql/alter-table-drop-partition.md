---
title: ALTER TABLE DROP PARTITION keywords
sidebar_label: ALTER TABLE DROP PARTITION
description: DROP PARTITION SQL keyword reference documentation.
---

Drops a partition from an existing table.

:::caution

This action irremediably deletes the data contained in the dropped partition

:::

## Syntax

![Flow chart showing the syntax of the ALTER TABLE keyword](/img/docs/diagrams/alterTable.svg)
![Flow chart showing the syntax of ALTER TABLE with DROP PARTITION keyword](/img/docs/diagrams/alterTableDropPartition.svg)

## Description

Drops one or more table partitions. Partition name must match the name of the
directory for the given partition.

Just like with columns dropping of partitions is a non-blocking and non-waiting
operation. While being atomic for a single partitions, dropping of multiple
partitions is in itself non-atomic. Drop partition will bail on the first
failure and will not continue with the list.

:::note

The last partition (active partition) cannot be removed. This will be
implemented in a future release.

:::

Naming convention for partition directories is as follows:

| Table Partition | Partition format |
| --------------- | ---------------- |
| `DAY`           | `YYYY-MM-DD`     |
| `MONTH`         | `YYYY-MM`        |
| `YEAR`          | `YYYY`           |

## Examples

```questdb-sql title="Drop a single partition"
--DAY
ALTER TABLE measurements DROP PARTITION '2019-05-18';
--MONTH
ALTER TABLE measurements DROP PARTITION '2019-05';
--YEAR
ALTER TABLE measurements DROP PARTITION '2019';
```

```questdb-sql title="Drop multiple partitions"
ALTER TABLE measurements DROP PARTITION '2018','2019';
```
