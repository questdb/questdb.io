---
title: Conditional functions
sidebar_label: Conditional
description: Conditional functions reference documentation.
---

## coalesce

`coalesce(value [, ...])` - returns the first non-null argument in a provided
list of arguments. This function is an implementation of the `COALESCE`
expression in PostgreSQL and as such, should follow the expected behavior
described in the
[coalesce PostgreSQL documentation](https://www.postgresql.org/docs/13/functions-conditional.html#FUNCTIONS-COALESCE-NVL-IFNULL)

**Arguments:**

- `coalesce(value [, ...])` `value` and subsequent comma-separated list of
  arguments which may be of any type except binary.

**Return value:**

The return value is the first non-null argument passed

**Examples:**

The following example demonstrates how to use `coalesce()` to return a default
value of `1` from an aggregate query if the `amount` column contains `null`
values:

```questdb-sql
SELECT avg(coalesce(amount, 1))
FROM transactions
```
