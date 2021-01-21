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

Assuming that this table has records which span over multiple days, partitions
older than 24 hours can be dropped in the following way:

```
ALTER TABLE my_table DROP PARTITION
WHERE ts < dateadd('d', -1, now());
```

For more information on partitioning, refer to the
[partitioning strategy](/docs/concept/partitions/) page.

<!-- What not to do / dangers -->
