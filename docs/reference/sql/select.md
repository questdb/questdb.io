---
title: SELECT keyword
sidebar_label: SELECT
description: SELECT SQL keyword reference documentation.
---

`SELECT` allows you to specify list of columns and expressions to be selected
and evaluated from a table.

## Syntax

![Flow chart showing the syntax of the SELECT keyword](/img/docs/diagrams/select.svg)

:::tip

The `TABLE` can either be a in your database (in which case you would pass the
table's name), or the result of a sub query.

:::

## Simple select

### All columns

QuestDB supports `SELECT * FROM tablename`. When selecting all, you can also
omit most of the statement and pass the table name.

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

### Arithmetic expressions

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

Supported aggregation functions are listed on the
[aggregation reference](/docs/reference/function/aggregation/).

:::

### Aggregation by group

QuestDB evaluates aggregation functions without need for traditional `GROUP BY`.
Use a mix of column names and aggregation functions in a `SELECT` clause. You
can have any number of discrete value columns and any number of aggregation
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

Whenever possible, it is recommended to perform arithmetic `outside` of
aggregation functions as this can have a dramatic impact on performance. For
example, `min(value/2)` is going to execute considerably slower than
`min(value)/2` although both alternative will return the same result

:::

## Supported clauses

QuestDB supports the following standard SQL clauses within SELECT statements.

### CASE

Conditional results based on expressions.

#### Syntax

![Flow chart showing the syntax of CASE](/img/docs/diagrams/case.svg)

:::info

For more information, please refer to the
[CASE reference](/docs/reference/sql/case/)

:::

### CAST

Convert values and expression between types.

#### Syntax

![Flow chart showing the syntax of the CAST keyword](/img/docs/diagrams/cast.svg)

:::info

For more information, please refer to the
[CAST reference](/docs/reference/sql/cast/)

:::

### DISTINCT

Returns distinct values of the specified column(s).

#### Syntax

![Flow chart showing the syntax of the DISTINCT keyword](/img/docs/diagrams/distinct.svg)

:::info

For more information, please refer to the
[DISTINCT reference](/docs/reference/sql/distinct/).

:::

### FILL

Defines filling strategy for missing data in aggregation queries. This function
complements [SAMPLE BY](/docs/reference/sql/sample-by/) queries.

#### Syntax

![Flow chart showing the syntax of the FILL keyword](/img/docs/diagrams/fill.svg)

:::info

For more information, please refer to the
[FILL reference](/docs/reference/sql/fill/).

:::

### JOIN

Join tables based on a key or timestamp.

#### Syntax

![Flow chart showing the syntax of the JOIN keyword](/img/docs/diagrams/join.svg)

:::info

For more information, please refer to the
[JOIN reference](/docs/reference/sql/join/)

:::

### LIMIT

Specify the number and position of records returned by a query.

#### Syntax

![Flow chart showing the syntax of the LIMIT keyword](/img/docs/diagrams/limit.svg)

:::info

For more information, please refer to the
[LIMIT reference](/docs/reference/sql/limit/).

:::

### ORDER BY

Orders the results of a query by one or several columns.

#### Syntax

![Flow chart showing the syntax of the ORDER BY keyword](/img/docs/diagrams/orderBy.svg)

:::info

For more information, please refer to the
[ORDER BY reference](/docs/reference/sql/order-by/)

:::

### UNION

Combine the results of two or more select statements. Can include or ignore
duplicates.

#### Syntax

![Flow chart showing the syntax of the UNION keyword](/img/docs/diagrams/union.svg)

:::info

For more information, please refer to the
[UNION reference](/docs/reference/sql/union/)

:::

### WHERE

Filters query results

#### Syntax

![Flow chart showing the syntax of the WHERE clause](/img/docs/diagrams/where.svg)

:::info

QuestDB supports complex WHERE clauses along with type-specific searches. For
more information, please refer to the
[WHERE reference](/docs/reference/sql/where/). There are different syntaxes for
[text](/docs/reference/sql/where/#symbol-and-string),
[numeric](/docs/reference/sql/where/#numeric), or
[timestamp](/docs/reference/sql/where/#timestamp-and-date) filters.

:::

## Additional time series clauses

QuestDB augments SQL with the following clauses.

### LATEST BY

Retrieves the latest entry by timestamp for a given key or combination of keys
This function requires a
[designated timestamp](/docs/concept/designated-timestamp/).

#### Syntax

![Flow chart showing the syntax of the LATEST BY keyword](/img/docs/diagrams/latestBy.svg)

:::info

For more information, please refer to the
[LATEST BY reference](/docs/reference/sql/latest-by/).

:::

### SAMPLE BY

Aggregates time series data into homogeneous time chunks. For example daily
average, monthly maximum etc. This function requires a
[designated timestamp](/docs/concept/designated-timestamp/).

#### Syntax

![Flow chart showing the syntax of the SAMPLE BY keyword](/img/docs/diagrams/sampleBy.svg)

:::info

For more information, please refer to the
[SAMPLE BY reference](/docs/reference/sql/sample-by/).

:::

### TIMESTAMP

Dynamically creates a
[designated timestamp](/docs/concept/designated-timestamp/) on the output of a
query. This allows to perform timestamp operations like [SAMPLE BY](#sample-by)
or [LATEST BY](#latest-by) on tables which originally do not have a designated
timestamp.

:::caution

The output query must be ordered by time. `TIMESTAMP()` does not check for order
and using timestamp functions on unordered data may produce unexpected results.

:::

#### Syntax

![Flow chart showing the syntax of the timestamp function](/img/docs/diagrams/dynamicTimestamp.svg)

:::info

For more information, refer to the
[TIMESTAMP reference](/docs/reference/function/timestamp/)

:::
