---
title: SHOW
sidebar_label: SHOW
---

Displays tables and columns available in the database.

:::info

These commands return the tables and columns as a table. If you would like to
query your tables and columns with filters or to use the results as part of a
function, see [table_columns()](reference/function/meta.md#table_columns) and
[all_tables()](reference/function/meta.md#all_tables) functions.

:::

### Examples

Show all tables:

```questdb-sql
SHOW TABLES;
```

| tableName |
| --------- |
| table1    |
| table2    |
| ...       |

Show all columns for table `weather`

```questdb-sql
SHOW COLUMNS FROM myTable;
```

| columnName | type      |
| ---------- | --------- |
| column1    | timestamp |
| column2    | int       |
| column3    | SYMBOL    |
| ...        | ...       |
