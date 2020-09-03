---
title: GROUP BY keyword
sidebar_label: GROUP BY
description: GROUP BY SQL keyword reference documentation.
---

Groups aggregation calculations by one or several keys. In QuestDB, this clause
is [optional](/docs/concept/sql-extensions/#optionality-of-group-by/).

## Syntax

![Flow chart showing the syntax of the GROUP BY keyword](/img/docs/diagrams/groupBy.svg)

:::note

QuestDB groups aggregation results implicitly and does not require the GROUP BY
keyword. It is only supported for convenience. Using the GROUP BY clause
explicitly will return the same results as if the clause was omitted.

:::

## Examples

The below queries perform aggregations on a single key. Using `GROUP BY`
explicitly or implicitly yields the same results:

```questdb-sql title="Single key aggregation, explicit GROUP BY"
SELECT sensorId, avg(temp)
FROM readings
GROUP BY sensorId;
```

```questdb-sql title="Single key aggregation, implicit GROUP BY"
SELECT sensorId, avg(temp)
FROM readings;
```

The below queries perform aggregations on multiple keys. Using `GROUP BY`
explicitly or implicitly yields the same results:

```questdb-sql title="Multiple key aggregation, explicit GROUP BY"
SELECT sensorId, sensorType, avg(temp)
FROM readings
GROUP BY sensorId,sensorType;
```

```questdb-sql title="Multiple key aggregation, implicit GROUP BY"
SELECT sensorId, sensorType, avg(temp)
FROM readings;
```

When used explicitly, the list of keys in the `GROUP BY` clause must match the
list of keys in the `SELECT` clause, otherwise an error will be returned:

```questdb-sql title="Error - Column b is missing in the GROUP BY clause"
SELECT a, b, avg(temp)
FROM tab
GROUP BY a;
```

```questdb-sql title="Error - Column b is missing in the SELECT clause"
SELECT a, avg(temp)
FROM tab
GROUP BY a, b;
```

```questdb-sql title="Success - Columns match"
SELECT a, b, avg(temp)
FROM tab
GROUP BY a, b;
```
