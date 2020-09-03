---
title: DISTINCT keyword
sidebar_label: DISTINCT
description: DISTINCT SQL keyword reference documentation.
---

`SELECT DISTINCT` is used to return only distinct (i.e different) values from a
column as part of a [SELECT statement](/docs/reference/sql/select/).

## Syntax

![Flow chart showing the syntax of the DISTINCT keyword](/img/docs/diagrams/distinct.svg)

## Examples

The following query will return a list of all unique ratings in the table.

```questdb-sql title="Simple query"
SELECT DISTINCT movieId
FROM ratings;
```

SELECT DISTINCT can be used in conjunction with more advanced queries and
filters.

```questdb-sql title="With aggregate"
SELECT DISTINCT movieId, count()
FROM ratings;
```

```questdb-sql title="With filter"
SELECT DISTINCT movieId, count()
FROM ratings
WHERE score > 3;
```
