---
title: FILL keyword
sidebar_label: FILL
description: FILL SQL keyword reference documentation.
---

Specifies fill behavior for missing data as part of a
[SAMPLE BY](/docs/reference/sql/sample-by/) aggregation queries.

## Syntax

![Flow chart showing the syntax of the FILL keyword](/img/docs/diagrams/fill.svg)

### Options

The `FILL` keyword expects a `fillOption` for each aggregate column. The fill
options are applied to aggregates based on order of appearance in the query.

| fillOption | Description                                                                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NONE`     | No fill applied. If there is no data, the time chunk will be skipped in the results. This means your table could potentially be missing intervals.                                                      |
| `NULL`     | Fills with `NULL`                                                                                                                                                                                       |
| `PREV`     | Fills using the previous value                                                                                                                                                                          |
| `LINEAR`   | Fills by linear interpolation of the 2 surrounding points                                                                                                                                               |
| `x`        | Fills with a constant value where `x` is the desired value, e.g., `FILL(100.05)`. May not be used in combination with other fill option keywords. A constant must be provided for each aggregate column |

:::info

- If a keyword is used as a fill option, i.e. any of `NONE`, `NULL`, `PREV`,
  `LINEAR`, only **one fill option** may be provided and this fill strategy will
  be applied to all columns which return null values.

- Several fill options may be passed as constants to specify values returned in
  multiple columns returning null, but constant values may not be used in
  combination with other fill option keywords.

:::

## Examples

Consider an example table named `prices`:

| ts                          | price |
| --------------------------- | ----- |
| 2021-01-01T12:00:00.000000Z | p1    |
| 2021-01-01T13:00:00.000000Z | p2    |
| 2021-01-01T14:00:00.000000Z | p3    |
| ...                         | ...   |
| tsn                         | pn    |

The following query returns the minimum, maximum and average price per hour:

```questdb-sql
SELECT ts, min(price) min, max(price) max, avg(price) avg
FROM PRICES
SAMPLE BY 1h;
```

The returned results look like this:

| ts                          | min  | max  | average |
| --------------------------- | ---- | ---- | ------- |
| 2021-01-01T12:00:00.000000Z | min1 | max1 | avg1    |
| ...                         | ...  | ...  | ...     |
| tsn                         | minn | maxn | avgn    |

In the below example, there is no `price` data during the entire third hour. As
there are missing values, an average aggregate cannot be calculated for this
hour at `2021-01-01T14:00:00.000000Z`:

| ts                          | min    | max    | average |
| --------------------------- | ------ | ------ | ------- |
| 2021-01-01T12:00:00.000000Z | min1   | max1   | avg1    |
| 2021-01-01T13:00:00.000000Z | min2   | max2   | avg2    |
| 2021-01-01T14:00:00.000000Z | `null` | `null` | `null`  |
| 2021-01-01T15:00:00.000000Z | min4   | max4   | avg4    |

Based on this example, the previous aggregate values calculated for each row
will be filled:

```questdb-sql title="Filling missing data across three columns"
SELECT ts, min(price) min, max(price) max, avg(price) avg
FROM PRICES
SAMPLE BY 1h
FILL(PREV);
```

This query returns the following results:

| ts                            | min    | max    | average |
| ----------------------------- | ------ | ------ | ------- |
| 2021-01-01T12:00:00.000000Z   | min1   | max1   | avg1    |
| 2021-01-01T13:00:00.000000Z   | min2   | max2   | avg2    |
| `2021-01-01T14:00:00.000000Z` | `min2` | `max2` | `avg2`  |
| 2021-01-01T15:00:00.000000Z   | min4   | max4   | avg4    |

```questdb-sql title="Linear fill"
SELECT ts, min(price) min, max(price) max, avg(price) avg
FROM PRICES
SAMPLE BY 1h
FILL(LINEAR);
```

This query returns the following results:

| ts                            | min             | max             | average         |
| ----------------------------- | --------------- | --------------- | --------------- |
| 2021-01-01T12:00:00.000000Z   | min1            | max1            | avg1            |
| 2021-01-01T13:00:00.000000Z   | min2            | max2            | avg2            |
| `2021-01-01T14:00:00.000000Z` | `(min2+min4)/2` | `(max2+max4)/2` | `(avg2+avg4)/2` |
| 2021-01-01T15:00:00.000000Z   | min4            | max4            | avg4            |

This query demonstrates specifying two `fillOptions` using constant values:

```questdb-sql
SELECT ts, min(price) min, avg(price) avg
FROM PRICES
SAMPLE BY 1h
FILL(25.5, 30);
```

The results of this query look like the following:

| ts                            | min    | average |
| ----------------------------- | ------ | ------- |
| 2021-01-01T12:00:00.000000Z   | min1   | avg1    |
| 2021-01-01T13:00:00.000000Z   | min2   | avg2    |
| `2021-01-01T14:00:00.000000Z` | `25.5` | `30`    |
| 2021-01-01T15:00:00.000000Z   | min4   | avg4    |
