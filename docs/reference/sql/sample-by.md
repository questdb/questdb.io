---
title: SAMPLE BY keyword
sidebar_label: SAMPLE BY
description: SAMPLE BY SQL keyword reference documentation.
---

`SAMPLE BY` is used on time series data to summarise large datasets into
aggregates of homogeneous time chunks as part of a
[SELECT statement](/docs/reference/sql/select/).

Users performing `SAMPLE BY` queries on datasets __with missing data__ may make use
of the [FILL](/docs/reference/sql/fill/) keyword to specify a fill behavior.

:::note

To use `SAMPLE BY`, one column needs to be designated as `timestamp`. Find out
more in the [designated timestamp](/docs/concept/designated-timestamp/) section.

:::

## Syntax

![Flow chart showing the syntax of the SAMPLE BY keyword](/img/docs/diagrams/sampleBy.svg)

Where `SAMPLE_SIZE` is the unit of time by which you wish to aggregate your
results, and `n` is the number of time chunks that will be summarised together.

## Examples

Assume the following table

| timestamp | buysell | quantity | price |
| --------- | ------- | -------- | ----- |
| ts1       | B       | q1       | p1    |
| ts2       | S       | q2       | p2    |
| ts3       | S       | q3       | p3    |
| ...       | ...     | ...      | ...   |
| tsn       | B       | qn       | pn    |

The following will return the number of trades per hour:

```questdb-sql title="trades - hourly interval"
SELECT timestamp, count()
FROM TRADES
SAMPLE BY 1h;
```

The following will return the trade volume in 30 minute intervals

```questdb-sql title="trades - 30 minute interval"
SELECT timestamp, sum(quantity*price)
FROM TRADES
SAMPLE BY 30m;
```

The following will return the average trade notional (where notional is = q \*
p) by day:

```questdb-sql title="trades - daily interval"
SELECT timestamp, avg(quantity*price)
FROM TRADES
SAMPLE BY 1d;
```
