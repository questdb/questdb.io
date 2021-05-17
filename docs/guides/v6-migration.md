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

## Breaking SQL changes

Release 6.0.1 contains breaking changes relating to SQL syntax to simplify
working with `TIMESTAMP` types and for improved compatibility with ANSI SQL
expectations.

:::info

For more information on these changes, see the 6.0.1 software version
[release notes on GitHub](https://github.com/questdb/questdb/releases/tag/6.0.1).

:::

To illustrate how timestamps are handled, a table `my_table` containing 48
records with timestamps every hour beginning at `00:00:00` on `2020-01-01` will
be used in the following examples:

| timestamp                   |
| --------------------------- |
| 2020-01-01T00:00:00.000000Z |
| 2020-01-01T01:00:00.000000Z |
| 2020-01-01T02:00:00.000000Z |
| ...                         |
| 2020-01-01T23:00:00.000000Z |
| 2020-01-02T00:00:00.000000Z |
| 2020-01-02T01:00:00.000000Z |
| ...                         |
| 2020-01-02T23:00:00.000000Z |

### Timestamp string equality

The following example SQL uses a `WHERE` clause to evaluate if records match
using string equality.

```questdb-sql title="Timestamp string equality"
SELECT * FROM my_table
WHERE timestamp = '2020-01-01'
```

The result will be 1 record with exact match of `2020-01-01T00:00:00.000000Z`.
In other words, the string `2020-01-01` does not represent an interval, but a
single `TIMESTAMP` data point of `2020-01-01T00:00:00.000000Z`

| timestamp                   |
| --------------------------- |
| 2020-01-01T00:00:00.000000Z |

Before software version `6.0.1`, this would result in 24 records of all hours
during date '2020-01-01'

| timestamp                   |
| --------------------------- |
| 2020-01-01T00:00:00.000000Z |
| 2020-01-01T01:00:00.000000Z |
| 2020-01-01T02:00:00.000000Z |
| ...                         |
| 2020-01-01T23:00:00.000000Z |

In order to use the old semantics, the query must use the `IN` keyword instead
of `=`:

```questdb-sql title="Timestamp string equality using IN"
SELECT * FROM my_table
WHERE timestamp IN '2020-01-01'
```

### Timestamp string comparison

Timestamps may also be compared using `>` greater-than and `<` less-than
operators. The following example SQL uses a `>` greater-than operator to
evaluate if records occur later than a timestamp provided as a string:

```questdb-sql title="Timestamp string equality"
SELECT * FROM my_table
WHERE timestamp > '2020-01-01'
```

The results are 47 records which have timestamps strictly greater than
`2020-01-01T00:00:00.000000Z`. The string `2020-01-01` does not represent an
interval, but a single `TIMESTAMP` data point of `2020-01-01T00:00:00.000000Z`:

| timestamp                   |
| --------------------------- |
| 2020-01-01T01:00:00.000000Z |
| ...                         |
| 2020-01-02T23:00:00.000000Z |

Before software version `6.0.1`, this would result in 24 records, one for each
hour during the date `2020-01-02`:

| timestamp                   |
| --------------------------- |
| 2020-01-02T00:00:00.000000Z |
| ...                         |
| 2020-01-02T23:00:00.000000Z |

In order to use the old semantics, the query must use `>=` instead of `>`, and
`<=` instead of `<`:

```questdb-sql title="Greater than or equal to a string timestamp"
SELECT * FROM my_table
WHERE timestamp >= '2020-01-02'
```

### Timestamp IN list

The `IN` keyword is used to check equality with a list of 2 elements:

```questdb-sql title="Timestamp IN string list"
SELECT * FROM my_table
WHERE timestamp IN ('2020-01-01T00:00:00.000000Z', '2020-01-02T00:00:00.000000Z')
```

The result is two records matching exactly `2020-01-01T00:00:00.000000Z` and
`2020-01-02T00:00:00.000000Z`

| timestamp                   |
| --------------------------- |
| 2020-01-02T00:00:00.000000Z |
| 2020-01-02T00:00:00.000000Z |

Before software version `6.0.1`, this would result in 25 records, one for each
hour during the date `2020-01-01` and the `00:00:00` data point on `2020-01-02`:

| timestamp                   |
| --------------------------- |
| 2020-01-02T00:00:00.000000Z |
| ...                         |
| 2020-01-02T00:00:00.000000Z |

In order to use the old semantics, the `BETWEEN` keyword should be used:

```questdb-sql title="Timestamp string equality using BETWEEN"
SELECT * FROM my_table
WHERE timestamp BETWEEN '2020-01-01T00:00:00.000000Z' AND '2020-01-02T00:00:00.000000Z'
```
