---
title: Boolean functions
sidebar_label: Boolean
description: Boolean function reference documentation.
---

This page describes the available functions to assist with performing boolean
calculations on numeric and timestamp types.

## isOrdered

`isOrdered(column)` return a `boolean` indicating whether the column values are
ordered in a table.

**Arguments:**

- `column` is a column name of numeric or timestamp type.

**Return value:**

Return value type is `boolean`.

**Examples:**

Given a table with the following contents:

| numeric_sequence | ts                          |
| ---------------- | --------------------------- |
| 1                | 2021-05-01T11:00:00.000000Z |
| 2                | 2021-05-01T12:00:00.000000Z |
| 3                | 2021-05-01T13:00:00.000000Z |

```questdb-sql
SELECT isOrdered(numeric_sequence) is_num_ordered,
       isOrdered(ts) is_ts_ordered
FROM my_table
```

| is_num_ordered | is_ts_ordered |
| -------------- | ------------- |
| true           | true          |

Adding an integer and timestamp rows out-of-order

| numeric_sequence | ts                          |
| ---------------- | --------------------------- |
| 1                | 2021-05-01T11:00:00.000000Z |
| 2                | 2021-05-01T12:00:00.000000Z |
| 3                | 2021-05-01T13:00:00.000000Z |
| 2                | 2021-05-01T12:00:00.000000Z |

```questdb-sql
SELECT isOrdered(numeric_sequence) FROM my_table
```

| is_num_ordered | is_ts_ordered |
| -------------- | ------------- |
| false          | false         |
