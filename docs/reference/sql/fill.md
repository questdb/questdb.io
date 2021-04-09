---
title: FILL keyword
sidebar_label: FILL
description: FILL SQL keyword reference documentation.
---

Queries using a [SAMPLE BY](/docs/reference/sql/sample-by/) aggregate on data
which has missing records may return in a discontinuous series of results. This
keyword allows for specifying a fill behavior for query results which have
missing aggregates due to missing rows.

To specify a default handling for `null` values within queries, see the
[coalesce() function](/docs/reference/function/conditional/#coalesce)
documentation.

## Syntax

![Flow chart showing the syntax of the FILL keyword](/img/docs/diagrams/fill.svg)

### Options

The `FILL` keyword expects a single `fillOption` strategy which will be applied
to each aggregate column. The following restrictions apply:

- Keywords denoting fill strategies may not be combined. Only one option from
  `NONE`, `NULL`, `PREV`, `LINEAR` and constants may be used.
- If a constant is selected as a fill option, a constant value must be specified
  for each aggregate column

| fillOption | Description                                                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NONE`     | No fill applied. If there is no data, the time chunk will be skipped in the results. This means your table could potentially be missing intervals. |
| `NULL`     | Fills with `NULL`                                                                                                                                  |
| `PREV`     | Fills using the previous value                                                                                                                     |
| `LINEAR`   | Fills by linear interpolation of the 2 surrounding points                                                                                          |
| `x`        | Fills with a constant value - where `x` is the desired value, for example `FILL(100.05)`                                                           |

## Examples

Consider an example table named `prices` which has no records during the entire
third hour (`2021-01-01T13`):

| ts                          | price |
| --------------------------- | ----- |
| 2021-01-01T10:00:00.000000Z | p1    |
| 2021-01-01T11:00:00.000000Z | p2    |
| 2021-01-01T12:00:00.000000Z | p3    |
| 2021-01-01T14:00:00.000000Z | p4    |
| 2021-01-01T15:00:00.000000Z | p5    |
| ...                         | ...   |

The following query returns the minimum, maximum and average price per hour:

```questdb-sql
SELECT ts, min(price) min, max(price) max, avg(price) avg
FROM PRICES
SAMPLE BY 1h;
```

The returned results look like this:

| ts                          | min  | max  | average |
| --------------------------- | ---- | ---- | ------- |
| 2021-01-01T10:00:00.000000Z | min1 | max1 | avg1    |
| ...                         | ...  | ...  | ...     |

As there are missing values, an average aggregate cannot be calculated for the
missing hour:

| ts                          | min  | max  | average |
| --------------------------- | ---- | ---- | ------- |
| 2021-01-01T10:00:00.000000Z | min1 | max1 | avg1    |
| 2021-01-01T11:00:00.000000Z | min2 | max2 | avg2    |
| 2021-01-01T12:00:00.000000Z | min3 | max3 | avg3    |
| 2021-01-01T14:00:00.000000Z | min5 | max5 | avg5    |

Based on this example, a `FILL` strategy can be employed which fills with the
previous value using `PREV`:

```questdb-sql
SELECT ts, min(price) min, max(price) max, avg(price) avg
FROM PRICES
SAMPLE BY 1h
FILL(PREV);
```

This query returns the following results where the fourth row is created by
using the `FILL` keyword:

| ts                              | min      | max      | average  |
| ------------------------------- | -------- | -------- | -------- |
| 2021-01-01T10:00:00.000000Z     | min1     | max1     | avg1     |
| 2021-01-01T11:00:00.000000Z     | min2     | max2     | avg2     |
| 2021-01-01T12:00:00.000000Z     | min3     | max3     | avg3     |
| **2021-01-01T13:00:00.000000Z** | **min3** | **max3** | **avg3** |
| 2021-01-01T14:00:00.000000Z     | min5     | max5     | avg5     |

This query demonstrates using a `LINEAR` value for interpolation:

```questdb-sql
SELECT ts, min(price) min, avg(price) avg
FROM PRICES`
SAMPLE BY 1h
FILL(LINEAR);
```

The results of this query look like the following:

| ts                              | min               | max               | average           |
| ------------------------------- | ----------------- | ----------------- | ----------------- |
| 2021-01-01T10:00:00.000000Z     | min1              | max1              | avg1              |
| 2021-01-01T11:00:00.000000Z     | min2              | max2              | avg2              |
| 2021-01-01T12:00:00.000000Z     | min3              | max3              | avg3              |
| **2021-01-01T13:00:00.000000Z** | **(min3+min5)/2** | **(max3+max5)/2** | **(avg3+avg5)/2** |
| 2021-01-01T14:00:00.000000Z     | min5              | max5              | avg5              |

This query demonstrates using a constant value as a `fillOption`. If a constant
value is used as a `fillOption`, a value must be specified for each aggregate
column:

```questdb-sql
SELECT ts, min(price) min, avg(price) avg
FROM PRICES`
SAMPLE BY 1h
FILL(100.5, 10, 1);
```

The results of this query look like the following:

| ts                              | min       | max    | average |
| ------------------------------- | --------- | ------ | ------- |
| 2021-01-01T10:00:00.000000Z     | min1      | max1   | avg1    |
| 2021-01-01T11:00:00.000000Z     | min2      | max2   | avg2    |
| 2021-01-01T12:00:00.000000Z     | min3      | max3   | avg3    |
| **2021-01-01T13:00:00.000000Z** | **100.5** | **10** | **1**   |
| 2021-01-01T14:00:00.000000Z     | min5      | max5   | avg5    |

This query demonstrates using `NULL` as a `fillOption`:

```questdb-sql
SELECT ts, min(price) min, avg(price) avg
FROM PRICES`
SAMPLE BY 1h
FILL(NULL);
```

The results of this query look like the following:

| ts                              | min      | max      | average  |
| ------------------------------- | -------- | -------- | -------- |
| 2021-01-01T10:00:00.000000Z     | min1     | max1     | avg1     |
| 2021-01-01T11:00:00.000000Z     | min2     | max2     | avg2     |
| 2021-01-01T12:00:00.000000Z     | min3     | max3     | avg3     |
| **2021-01-01T13:00:00.000000Z** | **null** | **null** | **null** |
| 2021-01-01T14:00:00.000000Z     | min5     | max5     | avg5     |
