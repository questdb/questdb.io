---
title: SQL extensions
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

### Timestamp Search

Timestamp search can be performed with regular operators, e.g `>`, `<=` etc.
However, QuestDB provides a
[native notation](../reference/sql/where.md#timestamp-and-date) which is faster
and less verbose.

## Important differences from standard SQL

### `SELECT * FROM` Optionality

In QuestDB `select * from` is optional. So `SELECT * FROM tab;` achieves the
same effect as `tab;` While `select * from` makes SQL look more complete, there are examples where its optionality makes things a lot easier
to read.

