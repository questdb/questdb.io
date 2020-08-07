---
title: SQL extensions
description: SQL syntax extensions for time-series.
---

QuestDB attempts to implement standard ANSI SQL. We also attempt to be
PostgreSQL compatible, although some of it is work in progress. This page
presents the main extensions we bring to SQL and the main differences that one
might find in SQL but not in QuestDB's dialect.

## SQL extensions

We have extended SQL language to support our data storage model and simplify
semantics of time series queries.

### LATEST BY

[LATEST BY](../guide/crud.md) is a clause introduced to help perform UPDATE and
DELETE operations within an append-only framework.

### SAMPLE BY

[SAMPLE BY](../reference/sql/select.md#sample-by) for time based
[aggregations](../reference/function/aggregation.md) with an efficient syntax.
The short query below will return the simple average balance from a list of
accounts by one month buckets.

```questdb-sql title="Using SAMPLE BY"
select avg(balance) from accounts sample by 1M
```

### Timestamp search

Timestamp search can be performed with regular operators, e.g `>`, `<=` etc.
However, QuestDB provides a
[native notation](../reference/sql/where.md#timestamp-and-date) which is faster
and less verbose.

## Important differences from standard SQL

### Optionality of SELECT \* FROM

In QuestDB `select * from` is optional. So `SELECT * FROM tab;` achieves the
same effect as `tab;` While `select * from` makes SQL look more complete, there
are examples where its optionality makes things a lot easier to read.

### Optionality of GROUP BY

The `GROUP BY` clause is optional and can be ommitted as the QuestDB optimiser
derives group-by implementation from `SELECT` clause.

In standard SQL, users might write a query like the below.

```questdb-sql
SELECT a, b, c, d, sum(e) FROM tab GROUP BY a, b, c, d;
```

However, enumerating subset of `SELECT` columns in the `GROUP BY` clause
redundant and therefore unnecessary. The same SQL in QuestDB SQL-dialect can be
written as:

```questdb-sql
SELECT a, b, c, d, sum(e) FROM tab;
```

Let's look at another more complex example using HAVING in standard SQL.

```questdb-sql
SELECT a, b, c, d, sum(e)
FROM tab
GROUP BY a, b, c, d
HAVING sum(e) > 100;
```

In QuestDB's dialect, `select * from` optionality and featherweight sub-queries
come to the rescue to create a smaller, more readable query, without unnecessary
repetitive aggregations.

```questdb-sql
(SELECT a, b, c, d, sum(e) s FROM tab) WHERE s > 100;
```
