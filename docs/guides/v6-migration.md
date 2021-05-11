---
title: Version 6.0 migration
description:
  This document describes details about automatic upgrades with QuestDB version
  6.0 and instructions for manually reverting tables for compatibility with
  earlier QuestDB versions.
---

Release 6.0 introduces breaking changes in table transaction files. An automated
conversion process has been included in the release which will migrate table
transaction files to use the new format. The following sections describe the
automated upgrade process with notes for manually downgrading tables for
compatibility with older versions.

## Upgrading QuestDB

When QuestDB v6.0 starts up, and tables from older QuestDB versions are
detected, a migration to the new transaction file format will run automatically.
The migration scans for the existence of tables within the QuestDB storage
directory and upgrades transaction (`_txn`) files for each table. All other
table data is untouched by the upgrade.

If the migration fails for a table, an error message will be printed in the
QuestDB logs on startup. QuestDB will not terminate, but tables which have not
been successfully upgraded cannot be used for querying or writing.

Starting QuestDB again will trigger another attempt to migrate tables using an
older transaction file format.

## Reverting transaction files

During the upgrade process, `_txn` files are backed up and renamed using the
format `_txn.v417`. Users who wish to revert the table migration can downgrade
tables by following these steps:

1. delete the folder `/path/to/questdb/db/_upgrade.d`
2. for each table, rename `_txn.v417` to `_txn`

### Table downgrade example

This section illustrates how to revert transaction files to a format used by
QuestDB versions earlier than 6.0. Given storage directories for two table
`example_table` and `sensors`:

```bash title="path/to/qdb"
├── conf
├── db
│   ├── _tab_index.d
│   ├── _upgrade.d
│   ├── example_table
│   │   ├── 2021
│   │   │   ├── tempF.d
│   │   │   ├── ...
│   │   │   └── visMiles.d
│   │   ├── _meta
│   │   ├── _txn
│   │   └── _txn.v417
│   └── sensors
│       ├── 2021
│       │   ├── device_id.d
│       │   ├── ...
│       │   └── temperature.d
│       ├── _meta
│       ├── _txn
│       └── _txn.v417
└── public
```

The tables may be downgraded in the following manner:

```bash
rm db/_upgrade.d
mv db/example_table/_txn.v417 db/example_table/_txn
mv db/sensors/_txn.v417 db/sensors/_txn
```

After these steps have been completed, QuestDB v5.x may be started and the table
data will be loaded as usual.
