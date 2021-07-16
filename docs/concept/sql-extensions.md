---
title: SQL extensions
description:
  QuestDB attempts to implement standard ANSI SQL with time-based extensions for
  convenience. This document describes SQL extensions in QuestDB and how users
  can benefit from them.
---

QuestDB attempts to implement standard ANSI SQL. We also try to be compatible
with PostgreSQL, although parts of this are a work in progress. This page
presents the main extensions we bring to SQL and the main differences that one
might find in SQL but not in QuestDB's dialect.

## SQL extensions

We have extended SQL to support our data storage model and simplify semantics of
time series analytics.

### LATEST BY

[LATEST BY](/docs/reference/sql/latest-by/) is a clause introduced to help find
the latest entry by timestamp for a given key or combination of keys as part of
a `SELECT` statement.

```questdb-sql title="LATEST BY customer ID and currency"
SELECT * FROM balances LATEST BY customer_id, currency
WHERE balance > 800;
```

### SAMPLE BY

[SAMPLE BY](/docs/reference/sql/select/#sample-by) is used for time-based
[aggregations](/docs/reference/function/aggregation/) with an efficient syntax.
The short query below will return the simple average balance from a list of
accounts by one month buckets.

```questdb-sql title="SAMPLE BY one month buckets"
SELECT avg(balance) FROM accounts SAMPLE BY 1M
```

### Timestamp search

Timestamp search can be performed with regular operators, e.g `>`, `<=` etc.
However, QuestDB provides a
[native notation](/docs/reference/sql/where/#timestamp-and-date) which is faster
and less verbose.

```questdb-sql title="Results in a given year"
SELECT * FROM scores WHERE ts IN '2018';
```

## Differences from standard SQL

### SELECT \* FROM is optional

In QuestDB, using `SELECT * FROM` is optional, so `SELECT * FROM my_table;` will
return the same result as `my_table;`. While adding `SELECT * FROM` makes SQL
look more complete, there are examples where omitting these keywords makes
queries a lot easier to read.

```questdb-sql title="Optional use of SELECT * FROM"
my_table;
-- equivalent to:
SELECT * FROM my_table;
```

### GROUP BY is optional

The `GROUP BY` clause is optional and can be omitted as the QuestDB optimizer
derives group-by implementation from the `SELECT` clause. In standard SQL, users
might write a query like the following:

```questdb-sql
SELECT a, b, c, d, sum(e) FROM tab GROUP BY a, b, c, d;
```

However, enumerating a subset of `SELECT` columns in the `GROUP BY` clause is
redundant and therefore unnecessary. The same SQL in QuestDB SQL-dialect can be
written as:

```questdb-sql
SELECT a, b, c, d, sum(e) FROM tab;
```

### Implicit HAVING

Let's look at another more complex example using `HAVING` in standard SQL:

```questdb-sql
SELECT a, b, c, d, sum(e)
FROM tab
GROUP BY a, b, c, d
HAVING sum(e) > 100;
```

In QuestDB's dialect, featherweight sub-queries come to the rescue to create a
smaller, more readable query, without unnecessary repetitive aggregations.
`HAVING` functionality can be obtained implicitly as follows:

```questdb-sql
(SELECT a, b, c, d, sum(e) s FROM tab) WHERE s > 100;
```
