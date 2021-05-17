---
title: SHOW keyword
sidebar_label: SHOW
description: SHOW SQL keyword reference documentation.
---

This keyword provides column and table information including metadata such as
[hysteresis parameters](/docs/guides/hysteresis/). The `SHOW` keyword is useful
for checking if tables contain a
[designated timestamp](/docs/concept/designated-timestamp) column.

:::info

These commands return the tables and columns as a table. If you would like to
query your tables and columns with filters or to use the results as part of a
function, see [table_columns()](/docs/reference/function/meta/#table_columns)
and [tables()](/docs/reference/function/meta/#all_tables) functions.

:::

## Examples

Show all tables:

```questdb-sql
SHOW TABLES;
```

| table    |
| -------- |
| weather  |
| my_table |
| ...      |

Show all columns for table `my_table`

```questdb-sql
SHOW COLUMNS FROM my_table;
```

| column | type      | indexed | indexBlockCapacity | symbolCached | symbolCapacity | designated |
| ------ | --------- | ------- | ------------------ | ------------ | -------------- | ---------- |
| symb   | SYMBOL    | true    | 1048576            | false        | 256            | false      |
| price  | DOUBLE    | false   | 0                  | false        | 0              | false      |
| ts     | TIMESTAMP | false   | 0                  | false        | 0              | true       |
| s      | STRING    | false   | 0                  | false        | 0              | false      |
