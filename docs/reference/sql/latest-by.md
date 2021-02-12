---
title: LATEST BY keyword
sidebar_label: LATEST BY
description: LATEST BY SQL keyword reference documentation.
---

`LATEST BY` finds the latest entry by timestamp for a given key or combination
of keys as part of a [SELECT statement](/docs/reference/sql/select/).

To find the latest values, QuestDB will search time series from the newest
values to the oldest.

- For single SYMBOL columns, QuestDB will know all distinct values upfront and
  stop once the latest entry has been found for each symbol value.
- For other field types, or multiple fields, QuestDB will scan the entire time
  series. Although scan is very fast this means the performance will degrade on
  hundreds of millions of records for non-symbol keys.

:::note

To use `LATEST BY`, one column needs to be designated as `timestamp`. Find out
more in the [designated timestamp](/docs/concept/designated-timestamp/) section.

:::

## Syntax

![Flow chart showing the syntax of the LATEST BY keyword](/img/docs/diagrams/latestBy.svg)

:::note

By default, QuestDB executes `where` clauses before `latest by`. To execute
`where` after `latest by`, you need to use sub-queries using brackets. You can
learn how to do this in the [examples](#execution-order).

:::

## Examples

### Single column

LATEST BY can be used with single columns. When this column is of type SYMBOL,
the query will end as soon as all distinct symbol values have been found.

```questdb-sql title="Latest temperature by city"
SELECT city, temperature
FROM weather
LATEST BY city;
```

### Multiple columns

LATEST BY can also reference multiple columns although this can be slower.

```questdb-sql title="Latest balance by customer and currency"
SELECT cust_id, balance_ccy, balance
FROM balances
LATEST BY cust_id, balance_ccy;
```

### Execution order

The below queries illustrate how to change the execution order in a query by
using brackets. Assume the following table

| cust_id | balance_ccy | balance | inactive | ts                          |
| ------- | ----------- | ------- | -------- | --------------------------- |
| 1       | USD         | 1500    | FALSE    | 2020-04-22T16:11:22.704665Z |
| 1       | EUR         | 650.5   | FALSE    | 2020-04-22T16:11:32.904234Z |
| 2       | USD         | 900.75  | FALSE    | 2020-04-22T16:12:43.504432Z |
| 2       | EUR         | 880.2   | FALSE    | 2020-04-22T16:18:34.404665Z |
| 1       | USD         | 330.5   | FALSE    | 2020-04-22T16:20:14.404997Z |

### WHERE first

```questdb-sql
SELECT * FROM balances LATEST BY cust_id, balance_ccy
WHERE balance > 800;
```

This query executes `WHERE` before `LATEST BY`. It will return the latest
balance which is above 800. The steps are:

- Filter out all balances below 800.
- Finds the latest balance for each combination of cust_id and balance_ccy.

Since the latest USD balance for customer 1 is equal to 330.5, it is filtered
out in the first step. Therefore, the returned balance is 1500, which is the
latest possible balance above 800.

| cust_id | balance_ccy | balance | inactive | ts                          |
| ------- | ----------- | ------- | -------- | --------------------------- |
| 1       | USD         | 1500    | FALSE    | 2020-04-22T16:11:22.704665Z |
| 2       | USD         | 900.75  | FALSE    | 2020-04-22T16:12:43.504432Z |
| 2       | EUR         | 880.2   | FALSE    | 2020-04-22T16:18:34.404665Z |

### LATEST BY first

```questdb-sql
(SELECT * FROM balances LATEST BY cust_id, balance_ccy) --note the brackets
WHERE balance > 800;
```

This query executes `LATEST BY` before `WHERE`. It returns the latest balances,
then filters out those below 800. The steps are

- Find the latest balances, regardless of value
- Filter out balances below 800. Since the latest balance for customer 1 is
  equal to 330.5, it is filtered out in the second step.

| cust_id | balance_ccy | balance | inactive | ts                          |
| ------- | ----------- | ------- | -------- | --------------------------- |
| 2       | USD         | 900.75  | FALSE    | 2020-04-22T16:12:43.504432Z |
| 2       | EUR         | 880.2   | FALSE    | 2020-04-22T16:18:34.404665Z |
