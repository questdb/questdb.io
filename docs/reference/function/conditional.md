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
  arguments may be
  - 

**Return value:**

The return value is the first non-null argument passed

**Examples:**

```questdb-sql
SELECT coalesce(CAST(NULL as INT), 1, 2);
```

| coalesce |
| -------- |
| 1        |
