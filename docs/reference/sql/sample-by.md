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

The default time calculation of sampled groups is an absolute value, in other
words, sampling by one day is a 24 hour range which is not bound to calendar
dates. To align sampled groups to calendar dates, the `ALIGN TO` keywords can be
used and are described in the [ALIGN TO CALENDAR](#align-to-calendar) section
below.

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

The following query can be used to sample the table by day. Note that the
default sample calculation can be made explicit in a query using
`ALIGN TO FIRST OBSERVATION`:

```questdb-sql
SELECT ts, count() FROM sensors
SAMPLE BY 1d

-- Equivalent to
SELECT ts, count() FROM sensors
SAMPLE BY 1d
ALIGN TO FIRST OBSERVATION
```

This query will return two rows:

| ts                          | count |
| --------------------------- | ----- |
| 2021-05-31T23:10:00.000000Z | 5     |
| 2021-06-01T23:10:00.000000Z | 2     |

The timestamp value for the 24 hour groups start at the first-observed
timestamp.

### ALIGN TO CALENDAR

Sample calculation may also be aligned to calendar dates using
`ALIGN TO CALENDAR` keywords:

```questdb-sql
SELECT ts, count() FROM sensors
SAMPLE BY 1d
ALIGN TO CALENDAR
```

In this case, given the example table above and sampling by 1 day, the 24 hour
samples begin at `2021-05-31T00:00:00.000000Z`:

| ts                          | count |
| --------------------------- | ----- |
| 2021-05-31T00:00:00.000000Z | 1     |
| 2021-06-01T00:00:00.000000Z | 4     |
| 2021-06-02T00:00:00.000000Z | 2     |

### ALIGN TO CALENDAR TIME ZONE

A time zone may be provided for sampling with calendar alignment. Details on the
options for specifying time zones with available formats are provided in the
guide for
[working with timestamps and time zones](/docs/guides/working-with-timestamps-timezones/).

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

#### Local timezone output

The timestamp values output from `SAMPLE BY` queries is in UTC. To have UTC
values converted to specific timezones the
[to_timezone() function](/docs/reference/function/date-time/#to_timezone) should
be used.

```questdb-sql
SELECT to_timezone(ts, 'PST') ts, count
FROM (select ts, count()
      FROM sensors SAMPLE BY 2h
      ALIGN TO CALENDAR TIME ZONE 'PST')
```

#### Time zone transitions

Calendar dates may contain historical time zone transitions or may vary in the
total number of hours due to daylight savings time. Considering the 31st October
2021, in the `Europe/London` calendar day which consists of 25 hours:

> - Sunday, 31 October 2021, 02:00:00 clocks are turned backward 1 hour to
> - Sunday, 31 October 2021, 01:00:00 local standard time

When a `SAMPLE BY` operation crosses time zone transitions in cases such as
this, the first sampled group which spans a transition will include aggregates
by full calendar range. Consider a table `sensors` with one data point per hour
spanning three calendar hours:

| ts                          | val |
| --------------------------- | --- |
| 2021-10-31T00:10:00.000000Z | 10  |
| 2021-10-31T01:10:00.000000Z | 20  |
| 2021-10-31T02:10:00.000000Z | 30  |
| 2021-10-31T03:10:00.000000Z | 40  |
| 2021-10-31T04:10:00.000000Z | 50  |

The following query will sample by hour with the `Europe/London` time zone and
align to calendar ranges:

```questdb-sql
SELECT ts, count() FROM sensors
SAMPLE BY 1h
ALIGN TO CALENDAR TIME ZONE 'Europe/London'
```

The record count for the hour which encounters a time zone transition will
contain two records for both hours at the time zone transition:

| ts                          | count |
| --------------------------- | ----- |
| 2021-10-31T00:00:00.000000Z | 2     |
| 2021-10-31T01:00:00.000000Z | 1     |
| 2021-10-31T02:00:00.000000Z | 1     |
| 2021-10-31T03:00:00.000000Z | 1     |

Similarly, given one data point per hour on this table, running `SAMPLE BY 1d`
will have a count of `25` for this day when aligned to calendar time zone
'Europe/London'.

### ALIGN TO CALENDAR WITH OFFSET

Aligning sampling calculation can be provided an arbitrary offset in the format
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
