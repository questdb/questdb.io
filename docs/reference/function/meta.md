---
title: Meta functions
sidebar_label: Meta
description: Table and database metadata function reference documentation.
---

## all_tables

`all_tables()` returns all tables in the database.

**Parameters:**

- `all_tables()` does not require arguments.

**Return value:**

Returns a `table`.

**Examples:**

- Get all tables in the database

```questdb-sql
all_tables();
```

| tableName |
| --------- |
| table1    |
| table2    |
| ...       |

- Get all tables in the database that match 'sales'

```questdb-sql
all_tables() WHERE tableName ~= 'sales';
```

| tableName   |
| ----------- |
| sales-north |
| sales-west  |
| sales-east  |
| sales-south |

- Get all tables in reverse alphabetical order

```questdb-sql
all_tables() ORDER BY tableName DESC;
```

| tableName |
| --------- |
| table_n   |
| table_n-1 |
| table_n-2 |
| ...       |

## table_columns

`table_columns('tableName')` returns the schema of a table

**Parameters:**

- `tableName` is the name of an existing table as a string

**Return value:**

Returns a `table` with two columns:

- `columnName` - name of the available columns in the table
- `columnType` - type of the column

**Examples:**

- Get all columns in the table

```questdb-sql
table_columns('myTable')
```

| columnName | columnType |
| ---------- | ---------- |
| TS         | TIMESTAMP  |
| Name       | STRING     |
| Age        | INT        |
| Sex        | SYMBOL     |
| Grade      | DOUBLE     |
| ...        | ...        |

- Get all columns in the database that match the name 'sales'

```questdb-sql
SELECT columnName FROM table_columns('myTable') WHERE columnName ~= 'sales';
```

| columnName  |
| ----------- |
| sales-north |
| sales-west  |
| sales-east  |
| sales-south |

- Get the count of column types

```questdb-sql
SELECT columnType, count() FROM table_columns('wthr');
```

| columnType | count |
| ---------- | ----- |
| INT        | 4     |
| DOUBLE     | 8     |
| SYMBOL     | 2     |
