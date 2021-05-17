---
title: Conditional functions
sidebar_label: Conditional
description: Conditional functions reference documentation.
---

Conditionally functions allow for conditionally selecting input values. The
`coalesce()` function is useful for handling null data values and providing
replacement values.

## coalesce

`coalesce(value [, ...])` - returns the first non-null argument in a provided
list of arguments in cases where null values should not appear in query results.

This function is an implementation of the `COALESCE` expression in PostgreSQL
and as such, should follow the expected behavior described in the
[coalesce PostgreSQL documentation](https://www.postgresql.org/docs/current/functions-conditional.html#FUNCTIONS-COALESCE-NVL-IFNULL)

**Arguments:**

- `coalesce(value [, ...])` `value` and subsequent comma-separated list of
  arguments which may be of any type except binary. If the provided arguments
  are of different types, one should be `CAST`able to another.

**Return value:**

The return value is the first non-null argument passed

**Examples:**

Given a table with the following records:

| timestamp                   | amount |
| --------------------------- | ------ |
| 2021-02-11T09:39:16.332822Z | 1      |
| 2021-02-11T09:39:16.333481Z | null   |
| 2021-02-11T09:39:16.333511Z | 3      |

The following example demonstrates how to use `coalesce()` to return a default
value of `0` for an expression if the `amount` column contains `null` values.

```questdb-sql
SELECT timestamp,
       coalesce(amount, 0) as amount_not_null
FROM transactions
```

| timestamp                   | amount_not_null |
| --------------------------- | --------------- |
| 2021-02-11T09:39:16.332822Z | 1               |
| 2021-02-11T09:39:16.333481Z | 0               |
| 2021-02-11T09:39:16.333511Z | 3               |
