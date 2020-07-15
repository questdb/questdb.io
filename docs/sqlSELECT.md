---
id: select
title: SELECT
sidebar_label: SELECT
---

`SELECT` allows you to specify list of columns and expressions to be selected
and evaluated from a table.

## Syntax

![select syntax](/img/doc/diagrams/select-statement.svg)

:::tip
The `TABLE` can either be a in your database (in which case you would
pass the table's name), or the result of a sub query.
:::

## Simple Select

### All columns

QuestDB supports `SELECT * FROM tablename`. When selecting all, you can also
omit most of the statement and simply pass the table name.

The two examples below are equivalent

```questdb-sql title="QuestDB dialect"
ratings;
```

```questdb-sql title="Traditional SQL equivalent"
SELECT * FROM ratings;
```

### Specific columns

To select specific columns, replace \* by the names of the columns you are
interested in.

Example:

```questdb-sql
SELECT movieId, rating FROM ratings;
```

### Arithmetic Expressions

`SELECT` is capable of evaluating multiple expressions and functions. You can
mix comma separated lists of expressions with the column names you are
selecting.

```questdb-sql
SELECT movieId, (100 - rating)*2, rating > 3.5 good
FROM ratings;
```

The result of `rating > 3.5` is a boolean. The column will be named good and
take values true or false.

### Aliases

Using aliases allow you to give expressions or column names of your choice. You
can assign an alias to a column or an expression by writing the alias name you
want after that expression

:::note
Alias names and column names must be unique.
:::

```questdb-sql
SELECT movieId alias1, rating alias2
FROM ratings
```

## Aggregation

:::info
Supported aggregation functions are listed
[here](functionsAggregation.md).
:::

### Aggregation by group

QuestDB evaluates aggregation functions without need for traditional `GROUP BY`.
Simply use a mix of column names and aggregation functions in a `SELECT` clause.
You can have any number of discrete value columns and any number of aggregation
functions.

```questdb-sql title="QuestDB dialect"
SELECT movieId, avg(rating), count()
FROM ratings;
```

```questdb-sql title="Traditional SQL equivalent"
SELECT movieId, avg(rating), count()
FROM ratings
GROUP BY movieId;
```

### Aggregation arithmetic

Aggregation functions can be used in arithmetic expressions. The following
computes `mid` of rating values for every movie.

```questdb-sql
SELECT movieId, (min(rating) + max(rating))/2 mid, count() count
FROM ratings;
```

:::tip
Whenever possible, it is recommended to perform arithmetics `outside` of
aggregation functions as this can have a dramatic impact on performance. For
example, `min(value/2)` is going to execute considerably slower than
`min(value)/2` although both alternative will return the same result
:::

## Supported clauses

QuestDB supports the following standard SQL clauses within SELECT statements.

### CASE

Conditional results based on expressions.

#### Syntax

![case sql syntax](/img/doc/diagrams/case-def.svg)

:::info
For more information, please refer to the [CASE reference](case.md)
:::

### CAST

Convert values and expression between types.

#### Syntax

![cast sql syntax](/img/doc/diagrams/cast.svg)

:::info
For more information, please refer to the [CAST reference](cast.md)
:::

### DISTINCT

Returns distinct values of the specified column(s).

#### Syntax

![distinct syntax](/img/doc/diagrams/distinct.svg)

:::info
For more information, please refer to the
[DISTINCT reference](distinct.md).
:::

### FILL

Defines filling strategy for missing data in aggregation queries. This function
complements [SAMPLE BY](sampleBy.md) queries.

#### Syntax

![fill syntax](/img/doc/diagrams/fill.svg)

:::info
For more information, please refer to the [FILL reference](fill.md).
:::

### JOIN

Join tables based on a key or timestamp.

#### Syntax

![join syntax](/img/doc/diagrams/joins.svg)

:::info
For more information, please refer to the [JOIN reference](joins.md)
:::

### LIMIT

Specify the number and position of records returned by a query.

#### Syntax

![limit syntax](/img/doc/diagrams/limit.svg)

:::info
For more information, please refer to the [LIMIT reference](limit.md).
:::

### ORDER BY

Orders the results of a query by one or several columns.

#### Syntax

![order by syntax](/img/doc/diagrams/orderBy.svg)

:::info
For more information, please refer to the
[ORDER BY reference](orderBy.md)
:::

### UNION

Combine the results of two or more select statements. Can include or ignore
duplicates.

#### Syntax

![union syntax](/img/doc/diagrams/union.svg)

:::info
For more information, please refer to the [UNION reference](sqlUNION.md)
:::

### WHERE

Filters query results

#### Syntax

![filter syntax](/img/doc/diagrams/filtered-statement.svg)

:::info
QuestDB supports complex WHERE clauses along with type-specific
searches. For more information, please refer to the [WHERE reference](where.md).
There are different syntaxes for [text](where.md#symbol-and-string),
[numeric](where.md#numeric), or [timestamp](where.md#timestamp-and-date)
filters.
:::

## Additional time-series clauses

QuestDB augments SQL with the following clauses.

### LATEST BY

Retrieves the latest entry by timestamp for a given key or combination of keys
This function requires a [designated timestamp](designatedTimestamp.md).

#### Syntax

![latest by syntax](/img/doc/diagrams/latestBy.svg)

:::info
For more information, please refer to the
[LATEST BY reference](latestBy.md).
:::

### SAMPLE BY

Aggregates time-series data into homogeneous time-chunks. For example daily
average, monthly maximum etc. This function requires a
[designated timestamp](designatedTimestamp.md).

#### Syntax

![sample by syntax](/img/doc/diagrams/sampleBy.svg)

:::info
For more information, please refer to the
[SAMPLE BY reference](sampleBy.md).
:::

### TIMESTAMP

Dynamically creates a [designated timestamp](designatedTimestamp.md) on the
output of a query. This allows to perform timestamp operations like
[SAMPLE BY](#sample-by) or [LATEST BY](#latest-by) on tables which originally do
not have a designated timestamp.

:::caution
The output query must be ordered by time. `TIMESTAMP()` does not
check for order and using timestamp functions on unordered data may produce
unexpected results.
:::

#### Syntax

![dynamic timestamp syntax](/img/doc/diagrams/dynamicTimestamp.svg)

:::info
For more information, refer to the [TIMESTAMP reference](timestamp.md)
:::
