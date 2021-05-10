---
title: CREATE TABLE keyword
sidebar_label: CREATE TABLE
description: CREATE TABLE SQL keyword reference documentation.
---

Creates new table in the database.

## Syntax

![Flow chart showing the syntax of the CREATE TABLE keyword](/img/docs/diagrams/createTable.svg)

The following sections describe the keywords and definitions illustrated in this
diagram.

### tableName

`tableName` - name is used to reference the table in SQL statements. Internally
the table name is used as a directory name on the file system. It can contain
both ASCII and Unicode characters.

:::note

- `tableName` must be a unique name. An error is returned if a table already
  exists with the requested name.

- Table names containing spaces or period `.` character must be enclosed in
  **double quotes**, for example:

  ```questdb-sql
  CREATE TABLE "example out of.space" (a INT);
  INSERT INTO "example out of.space" values (1);
  ```

:::

### columnName

`columnName` - name used to reference a column of a table. As with table names,
the column name is used for file names internally. Although it does support both
ASCII and Unicode characters, character restrictions specific to the file system
still apply.

:::note

- `columnName` must be unique within each table and **must not** contain a
  period `.` character.

- The maximum number of columns in a table is **2,147,483,647**

:::

### typeDef

`typeDef` - column [type definition](/docs/reference/sql/datatypes/) with
additional options for `symbol` type.

![Flow chart showing the syntax of the different column types](/img/docs/diagrams/columnTypeDef.svg)

#### Symbol

Optional keywords and parameters may follow the `symbol` type which allow for
further optimization on the handling of this type. For more information on the
benefits of using this type, see the [symbol](/docs/concept/symbol/) overview.

**Capacity:**

- `CAPACITY` - an optional keyword used when specifying a symbol type on table
  creation used to indicate how many distinct values this column is expected to
  have. When `distinctValueEstimate` is not explicitly specified, a default
  value of `cairo.default.symbol.capacity` is used.

- `distinctValueEstimate` - the value used to size data structures for
  [symbols](/docs/concept/symbol/). These data structures will resize themselves
  when necessary to allow QuestDB to function correctly. Underestimating the
  symbol value count may result in drop of performance whereas over-estimating
  may result in higher disk space and memory consumption.

**Caching:**

- `CACHE | NOCACHE` - a flag to tell QuestDB how to cache a
  [symbol](/docs/concept/symbol/). `CACHE` means that QuestDB will use Java Heap
  based Map to resolve symbol values and keys. When a column has a large number
  of distinct symbol values (over 100,000, for example), the heap impact might
  be significant and may cause OutOfMemory errors, depending on the heap size.
  To avoid Java Heap impact, `NOCACHE` leverages an off-heap structure which can
  deal with larger value counts but is slower.

  The default option for `symbol` types is `CACHE`.

**Index:**

- `inlineIndexDef` - when present, QuestDB will create and maintain an
  [index](/docs/concept/indexes/) for a `symbol` column. An index capacity
  definition may be provided (`indexCapacityDef`) for storage configuration.

  ![Flow chart showing the syntax of the INDEX keyword](/img/docs/diagrams/inlineIndexDef.svg)

- `indexCapacityDef` - storage options for the index using a `valueBlockSize`

  ![Flow chart showing the syntax of the CAPACITY keyword](/img/docs/diagrams/indexCapacityDef.svg)

- `valueBlockSize` - index storage parameter that specifies how many row IDs to
  store in a single storage block on disk. This value is optional and will
  default to the value of the `cairo.index.value.block.size`
  [configuration key](/docs/reference/configuration/). Fewer blocks used to
  store row IDs achieves better performance. At the same time over-sizing
  `valueBlockSize` will result in higher than necessary disk space usage.

  Consider an example table with 200 unique stock symbols and 1,000,000,000
  records over time. The index will have to store 1,000,000,000 / 200 row IDs
  for each symbol, i.e. 5,000,000 per symbol.

  - If `valueBlockSize` is 1,048,576 in this case, QuestDB will use 5 blocks to
    store the row IDs
  - If `valueBlockSize` is 1,024 in this case, the block count will be 4,883

### castDef

- `castDef` - casts type of cherry-picked column. `columnRef` must reference
  existing column in the `selectSql`

![Flow chart showing the syntax of the cast function](/img/docs/diagrams/castDef.svg)

### indexDef

- `indexDef` - instructs QuestDB to create an index for one of table's columns.
  This clause references column name to be indexed. The referenced column must
  be of type `SYMBOL`

![Flow chart showing the syntax of the index function](/img/docs/diagrams/indexDef.svg)

### timestamp

`timestamp` - references a column in new table, which will be the designated
timestamp. Such column must be of type `timestamp`. For more information on
designated timestamps, see the
[designated timestamp](/docs/concept/designated-timestamp) reference.

:::caution

The designated timestamp column **cannot be changed** after the table has been
created.

:::

### partition

`partition by` - the [partitioning strategy](/docs/concept/partitions/) for the
table. The default partitioning strategy of table is `NONE` and tables can be
partitioned by one of the following:

- `DAY`
- `MONTH`
- `YEAR`

:::caution

The partitioning strategy **cannot be changed** after the table has been
created.

:::

## Examples

This section demonstrates how to use the [CREATE TABLE](#create-table) and
[CREATE TABLE AS](#create-table-as) syntax.

### CREATE TABLE

The following examples demonstrate creating tables from basic statements, and
introduce features such as partitioning and designated timestamps. For more
information on the concepts introduced to below, see

- [designated timestamp](/docs/concept/designated-timestamp/) reference on
  electing a timestamp column
- [partition](/docs/concept/partitions/) documentation which describes how
  partitions work in QuestDB
- [symbol](/docs/concept/symbol/) reference for using the `symbol` data type

This example will create a table without a designated timestamp and does not
have a partitioning strategy applied.

```questdb-sql title="Basic example"
CREATE TABLE
my_table(symb SYMBOL, price DOUBLE, ts TIMESTAMP, s STRING);
```

The same table can be created and a designated timestamp may be specified. New
records with timestamps which are out-of-order (O3) chronologically will be
ordered at the point of ingestion. Configuring how the system handles ingestion
of O3 records is done via [O3 hysteresis](/docs/guides/hysteresis/)
configuration.

```questdb-sql title="Adding a designated timestamp"
CREATE TABLE
    my_table(symb SYMBOL, price DOUBLE, ts TIMESTAMP, s STRING)
    timestamp(ts);
```

To partition this table by day, the following query may be used:

```questdb-sql title="Adding a partitioning strategy"
CREATE TABLE
    my_table(symb SYMBOL, price DOUBLE, ts TIMESTAMP, s STRING)
    timestamp(ts)
    PARTITION BY DAY;
```

The following example shows how to create the same table with a designated
timestamp, a partitioning strategy and providing parameters for handling the
symbol type:

```questdb-sql title="Adding parameters for symbol type"
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
now we want to turn this data into time series through ordering trips by
`pickup_time`, assign dedicated timestamp and partition by month:

```questdb-sql title="Create table as select with data manipulation"
CREATE TABLE taxi_trips AS(
  SELECT * FROM taxi_trips_unordered ORDER BY pickup_time
) timestamp(pickup_time) PARTITION BY MONTH;
```
