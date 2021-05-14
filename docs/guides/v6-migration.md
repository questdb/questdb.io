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

### Breaking SQL changes

Release 6.0.1 has few breaking SQL syntax changes in order to simplify working with TIMESTAMP type in queries and make SQL syntax more in line with ANSI SQL expectations.

Below examples show the difference in query results for talbe `my_table` containing 48 records with timestamp every hour beginning from 00:00:00 on 2020-01-01

| timestamp                   | 
| --------------------------- |
| 2020-01-01T00:00:00.000000Z |
| 2020-01-01T01:00:00.000000Z |
| 2020-01-01T02:00:00.000000Z |
| 2020-01-01T03:00:00.000000Z |
| ...                         |
| 2020-01-01T23:00:00.000000Z |
| 2020-01-02T00:00:00.000000Z |
| 2020-01-02T01:00:00.000000Z |
| ...                         |
| 2020-01-02T23:00:00.000000Z |

#### Timestamp String equality

Example query

```questdb-sql title="timestamp string equality"
SELECT * FROM my_table
WHERE timestamp = '2020-01-01'
```
Before 6.0.1 this would result in 24 records of all hours during date '2020-01-01'

| timestamp                   | 
| --------------------------- |
| 2020-01-01T00:00:00.000000Z |
| 2020-01-01T01:00:00.000000Z |
| 2020-01-01T02:00:00.000000Z |
| 2020-01-01T03:00:00.000000Z |
| ...                         |
| 2020-01-01T23:00:00.000000Z |

After 6.0.1 the result will be 1 record with exact match of `2020-01-01T00:00:00.000000Z`. 
In other words string `2020-01-01` represents not an interval but a single TIMESTAMP data point of `2020-01-01T00:00:00.000000Z`

| timestamp                   | 
| --------------------------- |
| 2020-01-01T00:00:00.000000Z |

In order to use old sematics the query has to be re-written with `IN` instead of `=`

```questdb-sql title="timestamp string equality old equivalent"
SELECT * FROM my_table
WHERE timestamp IN '2020-01-01'
```

#### Timestamp String comparision

Example query

```questdb-sql title="timestamp string equality"
SELECT * FROM my_table
WHERE timestamp > '2020-01-01'
```
Before 6.0.1 this would result in 24 records of all hours during date '2020-01-02'

| timestamp                   | 
| --------------------------- |
| 2020-01-02T00:00:00.000000Z |
| ...                         |
| 2020-01-02T23:00:00.000000Z |

After 6.0.1 the result will be 47 record with strictly greter of `2020-01-01T00:00:00.000000Z`.

| timestamp                   | 
| --------------------------- |
| 2020-01-01T01:00:00.000000Z |
| ...                         |
| 2020-01-02T23:00:00.000000Z |


In other words string `2020-01-01` represents not an interval but a single TIMESTAMP data point of `2020-01-01T00:00:00.000000Z`. 
The equivalient to the old syntax is

```questdb-sql title="timestamp string equality old equivalent"
SELECT * FROM my_table
WHERE timestamp >= '2020-01-02'
```

#### Timestamp IN list 

Example query of timestamp used with `IN` operator with list of 2 elements

```questdb-sql title="timestamp IN string list"
SELECT * FROM my_table
WHERE timestamp IN ('2020-01-01T00:00:00.000000Z', '2020-01-02T00:00:00.000000Z')
```

Before 6.0.1 this would result in 25 records of all hours during date `2020-01-01` and `00:00:00` time on `2020-01-02`

| timestamp                   | 
| --------------------------- |
| 2020-01-02T00:00:00.000000Z |
| ...                         |
| 2020-01-02T00:00:00.000000Z |

After 6.0.2 result will 2 records matching exactly '2020-01-01T00:00:00.000000Z' and '2020-01-02T00:00:00.000000Z'

| timestamp                   | 
| --------------------------- |
| 2020-01-02T00:00:00.000000Z |
| 2020-01-02T00:00:00.000000Z |

The equivalient to the old syntax is operator BETWEEN

```questdb-sql title="timestamp string equality old equivalent"
SELECT * FROM my_table
WHERE timestamp BETWEEN '2020-01-01T00:00:00.000000Z' AND '2020-01-02T00:00:00.000000Z'
```
