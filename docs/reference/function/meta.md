---
title: Meta functions
sidebar_label: Meta
description: Table and database metadata function reference documentation.
---

## tables

`tables()` returns all tables in the database including table metadata.

**Arguments:**

- `tables()` does not require arguments.

**Return value:**

Returns a `table`.

**Examples:**

```questdb-sql title="List all tables"
tables();
```

```txt
| id  | name        | designatedTimestamp | partitionBy | maxUncommittedRows | o3CommitHysteresisMicros |
| --- | ----------- | ------------------- | ----------- | ------------------ | ------------------------ |
| 1   | my_table    | ts                  | DAY         | 500000             | 300000000                |
| 2   | device_data | null                | NONE        | 10000              | 30000000                 |
```

```questdb-sql title="All tables in reverse alphabetical order"
tables() ORDER BY name DESC;
```

```txt
| id  | name        | designatedTimestamp | partitionBy | maxUncommittedRows | o3CommitHysteresisMicros |
| --- | ----------- | ------------------- | ----------- | ------------------ | ------------------------ |
| 2   | device_data | null                | NONE        | 10000              | 30000000                 |
| 1   | my_table    | ts                  | DAY         | 500000             | 300000000                |
```

```questdb-sql title="All tables with a daily partitioning strategy"
tables() WHERE partitionBy = 'DAY'
```

```txt
| id  | name        | designatedTimestamp | partitionBy | maxUncommittedRows | o3CommitHysteresisMicros |
| --- | ----------- | ------------------- | ----------- | ------------------ | ------------------------ |
| 1   | my_table    | ts                  | DAY         | 500000             | 300000000                |
```

## table_columns

`table_columns('tableName')` returns the schema of a table

**Arguments:**

- `tableName` is the name of an existing table as a string

**Return value:**

Returns a `table` with two columns:

- `column` - name of the available columns in the table
- `type` - type of the column
- `indexed` - if indexing is applied to this column
- `indexBlockCapacity` - how many row IDs to store in a single storage block on
  disk
- `symbolCached` - whether or not this `symbol` column is cached
- `symbolCapacity` - how many distinct values this column of `symbol` type is
  expected to have
- `designated` - if this is set as the designated timestamp column for this
  table

For more details on the meaning and use of these values, see the
[CREATE TABLE](/docs/reference/sql/create-table/) documentation.

**Examples:**

```questdb-sql title="Get all columns in a table"
table_columns('my_table')
```

```txt
| column | type      | indexed | indexBlockCapacity | symbolCached | symbolCapacity | designated |
| ------ | --------- | ------- | ------------------ | ------------ | -------------- | ---------- |
| symb   | SYMBOL    | true    | 1048576            | false        | 256            | false      |
| price  | DOUBLE    | false   | 0                  | false        | 0              | false      |
| ts     | TIMESTAMP | false   | 0                  | false        | 0              | true       |
| s      | STRING    | false   | 0                  | false        | 0              | false      |
```

```questdb-sql title="Get designated timestamp column"
SELECT column, type, designated FROM table_columns('my_table') WHERE designated
```

```txt
| column | type      | designated |
| ------ | --------- | ---------- |
| ts     | TIMESTAMP | true       |
```

```questdb-sql title="Get the count of column types"
SELECT type, count() FROM table_columns('my_table');
```

```txt
| type      | count |
| --------- | ----- |
| SYMBOL    | 1     |
| DOUBLE    | 1     |
| TIMESTAMP | 1     |
| STRING    | 1     |
```
