---
title: ALTER TABLE ATTACH PARTITION keywords
sidebar_label: ATTACH PARTITION
description: ATTACH PARTITION SQL keyword reference documentation.
---

Attaches one or more partitions to a table. Before running an `ATTACH PARTITION`
query, partitions must first be copied to the storage directory of the table to
which they will be attached.

This feature is designed to support attaching partitions from a backup or
copying and attaching partitions across a network between QuestDB instances.

:::caution

This operation is only supported on tables which **do not contain** `SYMBOL`
types

:::

## Syntax

![Flow chart showing the syntax of the ALTER TABLE keyword](/img/docs/diagrams/alterTable.svg)
![Flow chart showing the syntax of ALTER TABLE with ATTACH PARTITION keyword](/img/docs/diagrams/alterTableAttachPartition.svg)


### Examples

```bash title=""


```

```questdb-sql title="ATTACH a partition by name"
--DAY
ALTER TABLE measurements ATTACH PARTITION LIST '2019-05-18';
--MONTH
ALTER TABLE measurements ATTACH PARTITION LIST '2019-05';
--YEAR
ALTER TABLE measurements ATTACH PARTITION LIST '2019';
```

```questdb-sql title="ATTACH multiple partitions"
ALTER TABLE measurements ATTACH PARTITION LIST '2019','2020';
```
