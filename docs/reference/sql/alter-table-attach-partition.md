---
title: ALTER TABLE ATTACH PARTITION
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

Assuming a backup exists for a table `measurements` which was partitioned by
`YEAR`, the following example demonstrates how to attach the 2020 partition to a
new table named `sensor_data`:

```bash title="Copying the 2020 partition to the sensor_data table"
cp -r ~/Desktop/2021-01-01/measurements/2020 /path/to/questdb/db/sensor_data/
```

The following SQL query will attach the partition to the `sensor_data` table:

```questdb-sql
ALTER TABLE sensor_data ATTACH PARTITION LIST '2020';
```

:::info

Details of creating backups can be found on the
[BACKUP syntax](/docs/reference/sql/backup/) reference page.

:::

Partitions may be referred to by `YEAR`, `MONTH` or `DAY`:

```questdb-sql title="Attach a partition by name"
--DAY
ALTER TABLE sensor_data ATTACH PARTITION LIST '2019-05-18';
--MONTH
ALTER TABLE sensor_data ATTACH PARTITION LIST '2019-05';
--YEAR
ALTER TABLE sensor_data ATTACH PARTITION LIST '2019';
```

Multiple partitions may be copied and attached to a table:

```bash title="Copying multiple partitions to the sensor_data table"
cp -r ~/Desktop/2021-01-01/measurements/2020 /path/to/questdb/db/sensor_data/
cp -r ~/Desktop/2021-01-01/measurements/2019 /path/to/questdb/db/sensor_data/
```

The partitions are attached by providing a comma-separated list of partitions:

```questdb-sql title="Attach multiple partitions"
ALTER TABLE sensor_data ATTACH PARTITION LIST '2019','2020';
```
