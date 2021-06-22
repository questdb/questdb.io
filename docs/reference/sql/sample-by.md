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

![Flow chart showing the syntax of the SAMPLE BY keywords](/img/docs/diagrams/sampleBy.svg)
![Flow chart showing the syntax of the ALIGN TO keywords](/img/docs/diagrams/alignToCalTimeZone.svg)

## Sample calculation

The default time range of each group sampled by time is an absolute value, in
other words, sampling by one day is a 24 hour range which is not bound to
calendar dates.

Consider a table `sensors` with the following data spanning three calendar days:

| ts                          | val |
| --------------------------- | --- |
| 2021-05-31T23:10:00.000000Z | 10  |
| 2021-06-01T01:10:00.000000Z | 80  |
| 2021-06-01T07:20:00.000000Z | 15  |
| 2021-06-01T13:20:00.000000Z | 10  |
| 2021-06-01T19:20:00.000000Z | 40  |
| 2021-06-02T01:10:00.000000Z | 90  |
| 2021-06-02T07:20:00.000000Z | 30  |

To sample the table by day:

```questdb-sql
SELECT ts, count() FROM sensors
SAMPLE BY 1d
```

This query will return two rows and the 24 hour groups starts at the
first-observed timestamp:

| ts                          | count |
| --------------------------- | ----- |
| 2021-05-31T23:10:00.000000Z | 5     |
| 2021-06-01T23:10:00.000000Z | 2     |

### ALIGN TO FIRST OBSERVATION

To make the **default sample calculation** explicit in a query,
`ALIGN TO FIRST OBSERVATION` keywords can be used:

```questdb-sql
SELECT ts, count() FROM sensors
SAMPLE BY 1d

-- Equivalent to
SELECT ts, count() FROM sensors
SAMPLE BY 1d
ALIGN TO FIRST OBSERVATION
```

| ts                          | count |
| --------------------------- | ----- |
| 2021-05-31T23:10:00.000000Z | 5     |
| 2021-06-01T23:10:00.000000Z | 2     |

### ALIGN TO CALENDAR

It may be desirable to align the sample calculation to calendar dates. For this
reason, `ALIGN TO CALENDAR` may be used:

```questdb-sql
SELECT ts, count() FROM sensors
SAMPLE BY 1d
ALIGN TO CALENDAR
```

In this case, the 24 hour samples begin at `2021-05-31T00:00:00.000000Z`:

| ts                          | count |
| --------------------------- | ----- |
| 2021-05-31T00:00:00.000000Z | 1     |
| 2021-06-01T00:00:00.000000Z | 4     |
| 2021-06-02T00:00:00.000000Z | 2     |

### ALIGN TO CALENDAR WITH OFFSET

Arbitrary offset may be applied for the sample calculation in the format
`'+/-HH:mm'`, for example:

- `'00:30'` plus thirty minutes
- `'+00:30'` plus thirty minutes
- `'-00:15'` minus 15 minutes

```questdb-sql
SELECT ts, count() FROM sensors
SAMPLE BY 1d
ALIGN TO CALENDAR WITH OFFSET '02:00'
```

In this case, the 24 hour samples begin at `2021-05-31T02:00:00.000000Z`:

| ts                          | count |
| --------------------------- | ----- |
| 2021-05-31T02:00:00.000000Z | 2     |
| 2021-06-01T02:00:00.000000Z | 4     |
| 2021-06-02T02:00:00.000000Z | 1     |

### ALIGN TO CALENDAR TIME ZONE

```questdb-sql
SELECT ts, count() FROM sensors
SAMPLE BY 1d
ALIGN TO CALENDAR TIME ZONE 'Europe/Berlin'
```

In this case, the 24 hour samples begin at `2021-05-31T01:00:00.000000Z`:

| ts                          | count |
| --------------------------- | ----- |
| 2021-05-31T01:00:00.000000Z | 1     |
| 2021-06-01T01:00:00.000000Z | 4     |
| 2021-06-02T01:00:00.000000Z | 2     |

Additionally, an offset may be applied when aligning sample calculation to
calendar

```questdb-sql
SELECT ts, count() FROM sensors
SAMPLE BY 1d
ALIGN TO CALENDAR TIME ZONE 'Europe/Berlin' WITH OFFSET '00:45'
```

In this case, the 24 hour samples begin at `2021-05-31T01:45:00.000000Z`:

| ts                          | count |
| --------------------------- | ----- |
| 2021-05-31T01:45:00.000000Z | 2     |
| 2021-06-01T01:45:00.000000Z | 4     |
| 2021-06-02T01:45:00.000000Z | 1     |

:::info

For details on the options for specifying time zone formats, see the guide for
[working with timestamps and time zones](/docs/guides/working-with-timestamps-timezones/).

:::

## Examples

Assume the following table `trades`:

| ts                          | quantity | price  |
| --------------------------- | -------- | ------ |
| 2021-05-31T23:45:10.000000Z | 10       | 100.05 |
| 2021-06-01T00:01:33.000000Z | 5        | 100.05 |
| 2021-06-01T00:15:14.000000Z | 200      | 100.15 |
| 2021-06-01T00:30:40.000000Z | 300      | 100.15 |
| 2021-06-01T00:45:20.000000Z | 10       | 100    |
| 2021-06-01T01:00:50.000000Z | 50       | 100.15 |

This query will return the number of trades per hour:

```questdb-sql title="trades - hourly interval"
SELECT ts, count() FROM trades
SAMPLE BY 1h
```

| ts                          | count |
| --------------------------- | ----- |
| 2021-05-31T23:45:10.000000Z | 3     |
| 2021-06-01T00:45:10.000000Z | 1     |
| 2021-05-31T23:45:10.000000Z | 1     |
| 2021-06-01T00:45:10.000000Z | 1     |

The following will return the trade volume in 30 minute intervals

```questdb-sql title="trades - 30 minute interval"
SELECT ts, sum(quantity*price) FROM trades
SAMPLE BY 30m
```

| ts                          | sum    |
| --------------------------- | ------ |
| 2021-05-31T23:45:10.000000Z | 1000.5 |
| 2021-06-01T00:15:10.000000Z | 16024  |
| 2021-06-01T00:45:10.000000Z | 8000   |
| 2021-06-01T00:15:10.000000Z | 8012   |
| 2021-06-01T00:45:10.000000Z | 8000   |

The following will return the average trade notional (where notional is = q \*
p) by day:

```questdb-sql title="trades - daily interval"
SELECT ts, avg(quantity*price) FROM trades
SAMPLE BY 1d
```

| ts                          | avg               |
| --------------------------- | ----------------- |
| 2021-05-31T23:45:10.000000Z | 6839.416666666667 |

To make this sample align to calendar dates:

```questdb-sql
SELECT ts, avg(quantity*price) FROM trades
SAMPLE BY 1d ALIGN TO CALENDAR
```

| ts                          | avg    |
| --------------------------- | ------ |
| 2021-05-31T00:00:00.000000Z | 1000.5 |
| 2021-06-01T00:00:00.000000Z | 8007.2 |
