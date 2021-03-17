---
title: ALTER TABLE ATTACH PARTITION
sidebar_label: ATTACH PARTITION
description: ATTACH PARTITION SQL keyword reference documentation.
---

Attaches one or more partitions to a table. This feature is designed to support
attaching partitions from a backup or copying and attaching partitions across a
network between QuestDB instances.

Before running an `ATTACH PARTITION` query, partitions must first be copied in
the format `<partition_name>.detached` to the storage directory of the table to
which they will be attached. Given a partition named `2020`, it must be copied
to the destination table as `2020.detached`. Details of the naming format for
detached partitions along with example commands for copying and attaching
partitions can be found in the [examples section below](#examples).

:::caution

This operation is only supported on tables which **do not contain** `SYMBOL`
types

:::

## Syntax

![Flow chart showing the syntax of the ALTER TABLE keyword](/img/docs/diagrams/alterTable.svg)
![Flow chart showing the syntax of ALTER TABLE with ATTACH PARTITION keyword](/img/docs/diagrams/alterTableAttachPartition.svg)

## Examples

Assuming a backup directory `~/backup/` exists for a table `sensor_data` which
was partitioned by `YEAR`, the following example demonstrates how to attach the
2020 partition to a table named `sensor_data`:

```bash
cp -r ~/backup/2021-01-01/sensor_data/2020 /path/to/questdb/db/sensor_data/2020.detached
```

The directory structure of the `sensor_data` table should look like the
following:

```bash
db
└── sensor_data
    ├── 2020.detached
    │   ├── device_version.d
    │   ├── driver.d
    │   └── ...
    └── 2021
        ├── device_version.d
        ├── driver.d
        └── ...
```

The following SQL query will attach the `2020` partition to the `sensor_data`
table:

```questdb-sql
ALTER TABLE sensor_data ATTACH PARTITION LIST '2020';
```

The structure of the `sensor_data` table will then reflect that the `2020`
partition has been successfully attached:

```bash
db
└── sensor_data
    ├── 2020
    │   └── ...
    └── 2021
        └── ...
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
cp -r ~/backup/2021-01-01/sensor_data/2020 /path/to/questdb/db/sensor_data/2020.detached
cp -r ~/backup/2021-01-01/sensor_data/2019 /path/to/questdb/db/sensor_data/2019.detached
```

The partitions are attached by providing a comma-separated list of partitions:

```questdb-sql title="Attach multiple partitions"
ALTER TABLE sensor_data ATTACH PARTITION LIST '2019','2020';
```
