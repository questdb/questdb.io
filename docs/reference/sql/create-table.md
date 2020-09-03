---
title: CREATE TABLE keyword
sidebar_label: CREATE TABLE
description: CREATE TABLE SQL keyword reference documentation.
---

Creates new table in the database.

## Syntax

![Flow chart showing the syntax of the CREATE TABLE keyword](/img/docs/diagrams/createTable.svg)

## Description

### tableName

`tableName` - name used to reference the table in SQL statements. Internally the
table name is used as directory name on the file system. It can contain both
ASCII and Unicode characters.

:::tip

Table name containing spaces or `.` must be enclosed in _single_ quotes, for
example:

:::

```questdb-sql title="Example"
CREATE TABLE 'example out of.space' (a INT);
```

:::note

`tableName` must be unique

:::

### columnName

`columnName` - name used to reference the columns of table. Just like table
name, column name is used as a part of file name internally. \
Although it does support both ASCII and Unicode characters, character restrictions
specific to the file system still apply.

:::info

Maximum number of columns in a table is 2,147,483,647

:::

:::note

`columnName` must be unique in context of table and must not contain '.'
character

:::

### typeDef

`typeDef` - column [type name](/docs/reference/sql/datatypes/) with additional
options.

![Flow chart showing the syntax of the different column types](/img/docs/diagrams/columnTypeDef.svg)

- `distinctValueEstimate` - optionally you can hint QuestDB how many distinct
  values this column is going to have. QuestDB will use this value to size data
  structures used to support [symbol](/docs/concept/symbol/). These data
  structures will resize themselves when necessary to allow QuestDB to function
  correctly. Under-estimating symbol value count might result in drop of
  performance whereas over-estimating - in higher disk space and memory
  consumption.

:::info

When `distinctValueEstimate` is not specified, a configuration default is used
(`cairo.default.symbol.capacity`).

:::

- `CACHE | NOCACHE` - a flag to tell QuestDB how to cache a
  [symbol](/docs/concept/symbol/). `CACHE` means that QuestDB will use Java Heap
  based Map to resolve symbol values and keys. When column has large number of
  distinct symbol values (over 100,000) heap impact might be significant and
  depending on heap size might cause OutOfMemory error. To avoid Java Heap
  impact, `NOCACHE` will leverage off-heap structure, which can deal with larger
  value count but is slower.

:::info

Default option is `CACHE`.

:::

- `inlineIndexDef` - when present, QuestDB will create and maintain
  [index](/docs/concept/indexes/) for `symbol` column.

  ![Flow chart showing the syntax of the INDEX keyword](/img/docs/diagrams/inlineIndexDef.svg)

- `indexCapacityDef` - storage options for the index

  ![Flow chart showing the syntax of the CAPACITY keyword](/img/docs/diagrams/indexCapacityDef.svg)

- `valueBlockSize` - index storage parameter. This value is optional and will
  default to the value of
  [configuration key](/docs/reference/configuration/server/)
  `cairo.index.value.block.size`. `valueBlockSize` tells QuestDB how many row
  IDs to store in a single storage block on disk. Consider the following
  example. Your table has 200 unique stock symbols and 1,000,000,000 stock
  quotes over time. Index will have to store 1,000,000,000/200 row IDs for each
  symbol, e.g. 5,000,000 per symbol. When `valueBlockSize` is 1,048,576 QuestDB
  will use 5 blocks to store the row IDs, but when `valueBlockSize` is 1,024,
  block count will be 4,883. To attain better performance the fewer blocks are
  used to store row IDs the better. At the same time over-sizing
  `valueBlockSize` will result in higher than necessary disk space usage.

- `castDef` - casts type of cherry-picked column. `columnRef` must reference
  existing column in the `selectSql`

  ![Flow chart showing the syntax of the cast function](/img/docs/diagrams/castDef.svg)

- `indexDef` - instructs QuestDB to create an index for one of table's columns.
  This clause references column name to be indexed. The referenced column muse
  be of type `SYMBOL`

  ![Flow chart showing the syntax of the index function](/img/docs/diagrams/indexDef.svg)

### timestamp

`timestamp` - references a column in new table, which will be the nominated
timestamp. Such column must be of type `timestamp`

:::note

The designated timestamp cannot be changed after table is created. This will be
implemented in a future release.

:::

### partition

`partition by` - the [partitioning strategy](/docs/concept/partitions/) for the
table.

:::note

The partitioning strategy cannot be changed after table is created. A new table
will have to be created.

:::

## Usage

Find below example uses of [CREATE TABLE](#create-table) and of
[CREATE TABLE AS](#create-table-as)

### CREATE TABLE

#### Without [designated timestamp](/docs/concept/designated-timestamp/) and not [partitioned](/docs/concept/partitions/).

```questdb-sql
CREATE TABLE
my_table(symb SYMBOL, price DOUBLE, ts TIMESTAMP, s STRING);
```

:::info

Such table can accept data in any order.

:::

#### With [designated timestamp](/docs/concept/designated-timestamp/)

```questdb-sql
CREATE TABLE
    my_table(symb SYMBOL, price DOUBLE, ts TIMESTAMP, s STRING)
    timestamp(ts);
```

:::info

With this setting, QuestDB enforce chronological order of `ts` values.

:::

#### With [partition](/docs/concept/partitions/)

```questdb-sql
CREATE TABLE
    my_table(symb SYMBOL, price DOUBLE, ts TIMESTAMP, s STRING)
    timestamp(ts)
    PARTITION BY DAY;
```

#### With [symbol](/docs/concept/symbol/)

```questdb-sql
CREATE TABLE my_table(
    symb SYMBOL capacity 256 nocache index capacity 1048576,
    price DOUBLE,
    ts TIMESTAMP, s STRING
) timestamp(ts)  PARTITION BY DAY;
```

### CREATE TABLE AS

#### Cloning existing SQL structure

When SQL is `select * from tab` or any arbitrary SQL result, the table data will
be copied with the corresponding structure.

```questdb-sql title="Create table as select"
CREATE TABLE x AS(
    SELECT
        rnd_int() a,
        rnd_double() b,
        rnd_symbol('ABB', 'CDD') c
    FROM
        long_sequence(100)
    WHERE false;
)
```

:::note

Notice the `where false` condition.

:::

```questdb-sql title="Clone an existing wide table and change type of cherry-picked columns"
CREATE TABLE x AS(SELECT * FROM table WHERE false)
    , cast(price AS LONG)
    , cast(instrument as SYMBOL INDEX);
```

Here we changed type of `price` (assuming it was `INT`) to `LONG` and changed
type of `sym` to [symbol](/docs/concept/symbol/) and created an
[index](/docs/concept/indexes/).

#### Create a new table using SQL structure and data

Let's assume we imported a text file into the table `taxi_trips_unordered` and
now we want to turn this data into time series thru ordering trips by
`pickup_time`, assign dedicated timestamp and partition by month:

```questdb-sql title="Create table as select with data manipulation"
CREATE TABLE taxi_trips AS(
  SELECT * FROM taxi_trips_unordered ORDER BY pickup_time
) timestamp(pickup_time) PARTITION BY MONTH;
```
