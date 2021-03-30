---
title: SAMPLE BY keyword
sidebar_label: SAMPLE BY
description: SAMPLE BY SQL keyword reference documentation.
---

`SAMPLE BY` is used on time series data to summarize large datasets into
aggregates of homogeneous time chunks as part of a
[SELECT statement](/docs/reference/sql/select/). Users performing `SAMPLE BY`
queries on datasets **with missing data** may make use of the
[FILL](/docs/reference/sql/fill/) keyword to specify a fill behavior.

:::note

To use `SAMPLE BY`, one column needs to be designated as `timestamp`. Find out
more in the [designated timestamp](/docs/concept/designated-timestamp/) section.

:::

## Syntax

![Flow chart showing the syntax of the SAMPLE BY keyword](/img/docs/diagrams/sampleBy.svg)

Where `SAMPLE_SIZE` is the unit of time by which you wish to aggregate your
results, and `n` is the number of time chunks that will be summarized together.

## Sample calculation

The time range of each group sampled by time is an absolute value, in other
words, sampling by one day is a 24 hour range which is not bound to actual
calendar dates.

Considering the following example which samples from a `sensors` table over the
last 24 hours:

```questdb-sql
SELECT ts, count()
FROM sensors
WHERE ts > dateadd('d', -1, now())
SAMPLE BY 1d
```

The `WHERE` clause has narrowed down results to those which have a timestamp
greater than 24 hours from now. If the table has rows for sensor readings
ingested yesterday and today, this query will return two rows. The 24 hour range
for the sampled group starts at the first-returned timestamp:

| ts                          | count |
| --------------------------- | ----- |
| 2021-02-03T00:32:35.000000Z | 1000  |
| 2021-02-04T00:32:35.000000Z | 200   |

## Examples

Assume the following table

| ts  | buysell | quantity | price |
| --- | ------- | -------- | ----- |
| ts1 | B       | q1       | p1    |
| ts2 | S       | q2       | p2    |
| ts3 | S       | q3       | p3    |
| ... | ...     | ...      | ...   |
| tsn | B       | qn       | pn    |

The following will return the number of trades per hour:

```questdb-sql title="trades - hourly interval"
SELECT ts, count()
FROM TRADES
SAMPLE BY 1h;
```

The following will return the trade volume in 30 minute intervals

```questdb-sql title="trades - 30 minute interval"
SELECT ts, sum(quantity*price)
FROM TRADES
SAMPLE BY 30m;
```

The following will return the average trade notional (where notional is = q \*
p) by day:

```questdb-sql title="trades - daily interval"
SELECT ts, avg(quantity*price)
FROM TRADES
SAMPLE BY 1d;
```
