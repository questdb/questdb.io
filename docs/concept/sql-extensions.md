---
title: SQL extensions
description:
  QuestDB attempts to implement standard ANSI SQL and extends it for time series
  needs. This document covers such extensions.
---

QuestDB attempts to implement standard ANSI SQL. We also attempt to be
PostgreSQL compatible, although some of it is work in progress. This page
presents the main extensions we bring to SQL and the main differences that one
might find in SQL but not in QuestDB's dialect.

## SQL extensions

We have extended SQL language to support our data storage model and simplify
semantics of time series queries.

### LATEST BY

[LATEST BY](/docs/reference/sql/latest-by/) is a clause introduced to help
perform `UPDATE` and `DELETE` operations within an append-only framework.

### SAMPLE BY

[SAMPLE BY](/docs/reference/sql/select/#sample-by) for time based
[aggregations](/docs/reference/function/aggregation/) with an efficient syntax.
The short query below will return the simple average balance from a list of
accounts by one month buckets.

```questdb-sql title="Using SAMPLE BY"
select avg(balance) from accounts sample by 1M
```

### Timestamp search

Timestamp search can be performed with regular operators, e.g `>`, `<=` etc.
However, QuestDB provides a
[native notation](/docs/reference/sql/where/#timestamp-and-date) which is faster
and less verbose.

## Differences from standard SQL

### Optionality of SELECT \* FROM

In QuestDB `select * from` is optional. So `SELECT * FROM tab;` achieves the
same effect as `tab;` While `select * from` makes SQL look more complete, there
are examples where its optionality makes things a lot easier to read.

### Optionality of GROUP BY

The `GROUP BY` clause is optional and can be omitted as the QuestDB optimiser
derives group-by implementation from `SELECT` clause.

In standard SQL, users might write a query like the below.

```questdb-sql
SELECT a, b, c, d, sum(e) FROM tab GROUP BY a, b, c, d;
```

However, enumerating subset of `SELECT` columns in the `GROUP BY` clause is
redundant and therefore unnecessary. The same SQL in QuestDB SQL-dialect can be
written as:

```questdb-sql
SELECT a, b, c, d, sum(e) FROM tab;
```

### Implicit HAVING

Let's look at another more complex example using `HAVING` in standard SQL.

```questdb-sql
SELECT a, b, c, d, sum(e)
FROM tab
GROUP BY a, b, c, d
HAVING sum(e) > 100;
```

In QuestDB's dialect, `select * from` optionality and featherweight sub-queries
come to the rescue to create a smaller, more readable query, without unnecessary
repetitive aggregations. `HAVING` functionality can be obtained implicitly as
follows:

```questdb-sql
(SELECT a, b, c, d, sum(e) s FROM tab) WHERE s > 100;
```
