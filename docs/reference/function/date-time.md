---
title: Date and time functions
sidebar_label: Date and time
description: Date and time functions reference documentation.
---

This page describes the available functions to assist with performing time-based
calculations.

:::info

Checking if tables contain a designated timestamp column can be done via the
`tables()` and `table_columns()` functions which are described in the
[meta functions](/docs/reference/function/meta/) documentation page.

:::

## systimestamp

`systimestamp()` - offset from UTC Epoch in microseconds. Calculates
`UTC timestamp` using system's real time clock. The value is affected by
discontinuous jumps in the system time (e.g., if the system administrator
manually changes the system time).

**Arguments:**

- `systimestamp()` does not accept arguments.

**Return value:**

Return value type is `timestamp`.

**Examples:**

```questdb-sql title="Insert current system timestamp"
INSERT INTO readings
VALUES(systimestamp(), 123.5);
```

| ts                          | reading |
| --------------------------- | ------- |
| 2020-01-02T19:28:48.727516Z | 123.5   |

## sysdate

`sysdate()` - returns the timestamp of the host system as a `date` with
`millisecond` precision.

Calculates `UTC date` with millisecond precision using system's real time clock.
The value is affected by discontinuous jumps in the system time (e.g., if the
system administrator manually changes the system time).

**Arguments:**

- `sysdate()` does not accept arguments.

**Return value:**

Return value type is `date`.

**Examples:**

```questdb-sql title="Insert current system date along with a value"
INSERT INTO readings
VALUES(sysdate(), 123.5);
```

| sysdate                     | reading |
| --------------------------- | ------- |
| 2020-01-02T19:28:48.727516Z | 123.5   |

```questdb-sql title="Query based on last minute"
SELECT * FROM readings
WHERE date_time > sysdate() - 60000000L;
```

## now

`now()` - offset from UTC Epoch in microseconds.

Calculates `UTC timestamp` using system's real time clock. Unlike
`sysdatetime()`, it does not change within the query execution timeframe and
should be used in WHERE clause to filter designated timestamp column relative to
current time, i.e.:

- `SELECT now() FROM long_sequence(200)` will return the same timestamp for all
  rows
- `SELECT systimestamp() FROM long_sequence(200)` will have new timestamp values
  for each row

**Arguments:**

- `now()` does not accept arguments.

**Return value:**

Return value type is `timestamp`.

**Examples:**

```questdb-sql title="Filter records to created within last day"
SELECT created, origin FROM telemetry
WHERE created > dateadd('d', -1, now());
```

| created                     | origin |
| --------------------------- | ------ |
| 2021-02-01T21:51:34.443726Z | 1      |

```questdb-sql title="Query returns same timestamp in every row"
SELECT now() FROM long_sequence(3)
```

| now                         |
| --------------------------- |
| 2021-02-01T21:51:34.443726Z |
| 2021-02-01T21:51:34.443726Z |
| 2021-02-01T21:51:34.443726Z |

```questdb-sql title="Query based on last minute"
SELECT * FROM readings
WHERE date_time > now() - 60000000L;
```

## to_timestamp

`to_timestamp(string, format)` - converts string to `timestamp` by using the
supplied `format` to extract the value.

Will convert a `string` to `timestamp` using the format definition passed as an
argument. When the `format` definition does not match the `string` input, the
result will be `null`.

For more information about recognized timestamp formats, see the
[date and timestamp format section](#date-and-timestamp-format).

**Arguments:**

- `string` is any string that represents a date and/or time.
- `format` is a string that describes the `timestamp format` in which `string`
  is expressed.

**Return value:**

Return value type is `timestamp`

**Examples:**

```questdb-sql title="string matches format"
SELECT to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss')
FROM long_sequence(1);
```

| to_timestamp                |
| --------------------------- |
| 2020-03-01T15:43:21.000000Z |

```questdb-sql title="string does not match format"
SELECT to_timestamp('2020-03-01:15:43:21', 'yyyy')
FROM long_sequence(1);
```

| to_timestamp |
| ------------ |
| null         |

```questdb-sql title="Using with INSERT"
INSERT INTO measurements
values(to_timestamp('2019-12-12T12:15', 'yyyy-MM-ddTHH:mm'), 123.5);
```

| timestamp                   | value |
| --------------------------- | ----- |
| 2019-12-12T12:15:00.000000Z | 123.5 |

Note that conversion of ISO timestamp format is optional. QuestDB automatically
converts `STRING` to `TIMESTAMP` if it is partial or full form of
`yyyy-MM-ddTHH:mm:ss.SSSUUU` or `yyyy-MM-dd HH:mm:ss.SSSUUU` with valid time
offset `+01:00` or `Z`. See more examples at
[Native timestamp format](/docs/reference/sql/where#native-timestamp-format)

## to_date

`to_date(string, format)` - converts string to `date` by using the supplied
`format` to extract the value.

Will convert a `string` to `date` using the format definition passed as an
argument. When the `format` definition does not match the `string` input, the
result will be `null`.

For more information about recognized timestamp formats, see the
[date and timestamp format section](#date-and-timestamp-format).

**Arguments:**

- `string` is any string that represents a date and/or time.
- `format` is a string that describes the `date format` in which `string` is
  expressed.

**Return value:**

Return value type is `date`

**Examples:**

```questdb-sql title="string matches format"
SELECT to_date('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss')
FROM long_sequence(1);
```

| to_date                  |
| ------------------------ |
| 2020-03-01T15:43:21.000Z |

```questdb-sql title="string does not match format"
SELECT to_date('2020-03-01:15:43:21', 'yyyy')
FROM long_sequence(1);
```

| to_date |
| ------- |
| null    |

```questdb-sql title="Using with INSERT"
INSERT INTO measurements
values(to_date('2019-12-12T12:15', 'yyyy-MM-ddTHH:mm'), 123.5);
```

| date                     | value |
| ------------------------ | ----- |
| 2019-12-12T12:15:00.000Z | 123.5 |

## to_str

`to_str(value, format)` - converts date or timestamp value to a string in the
specified format

Will convert a date or timestamp value to a string using the format definition
passed as an argument. When elements in the `format` definition are
unrecognized, they will be passed-through as string.

For more information about recognized timestamp formats, see the
[date and timestamp format section](#date-and-timestamp-format).

**Arguments:**

- `value` is any `date` or `timestamp`
- `format` is a timestamp format.

**Return value:**

Return value type is `string`

**Examples:**

- Basic example

```questdb-sql
SELECT to_str(systimestamp(), 'yyyy-MM-dd') FROM long_sequence(1);
```

| to_str     |
| ---------- |
| 2020-03-04 |

- With unrecognized timestamp definition

```questdb-sql
SELECT to_str(systimestamp(), 'yyyy-MM-dd gooD DAY 123') FROM long_sequence(1);
```

| to_str                  |
| ----------------------- |
| 2020-03-04 gooD DAY 123 |

## dateadd

`dateadd(period, n, startDate)` - adds `n` `period` to `startDate`.

**Arguments:**

- `period` is a char. Period to be added. Available periods are `s`, `m`, `h`,
  `d`, `M`, `y`.
- `n` is an int. Number of periods to add.
- `startDate` is a timestamp or date. Timestamp to add the periods to.

**Return value:**

Return value type is `timestamp`

**Examples:**

```questdb-sql title="Adding hours"
SELECT systimestamp(), dateadd('h', 2, systimestamp())
FROM long_sequence(1);
```

| systimestamp                | dateadd                     |
| --------------------------- | --------------------------- |
| 2020-04-17T00:30:51.380499Z | 2020-04-17T02:30:51.380499Z |

```questdb-sql title="Adding days"
SELECT systimestamp(), dateadd('d', 2, systimestamp())
FROM long_sequence(1);
```

| systimestamp                | dateadd                     |
| --------------------------- | --------------------------- |
| 2020-04-17T00:30:51.380499Z | 2020-04-19T00:30:51.380499Z |

```questdb-sql title="Adding months"
SELECT systimestamp(), dateadd('M', 2, systimestamp())
FROM long_sequence(1);
```

| systimestamp                | dateadd                     |
| --------------------------- | --------------------------- |
| 2020-04-17T00:30:51.380499Z | 2020-06-17T00:30:51.380499Z |

## datediff

`datediff(period, date1, date2)` - returns the absolute number of `period`
between `date1` and `date2`.

**Arguments:**

- `period` is a char. Period to be added. Available periods are `s`, `m`, `h`,
  `d`, `M`, `y`.
- `date1` and `date2` are date or timestamp. Dates to compare

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Difference in days"
select datediff(
    'd',
    to_timestamp('2020-01-23','yyyy-MM-dd'),
    to_timestamp('2020-01-27','yyyy-MM-dd'))
from long_sequence(1);
```

| datediff |
| -------- |
| 4        |

```questdb-sql title="Difference in months"
select datediff(
    'M',
    to_timestamp('2020-01-23','yyyy-MM-dd'),
    to_timestamp('2020-02-24','yyyy-MM-dd'))
from long_sequence(1);
```

| datediff |
| -------- |
| 1        |

## millis

`millis(value)` - returns the `millis` of the second for a given date or
timestamp from `0` to `999`

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Millis of the second"
SELECT millis(
    to_timestamp('2020-03-01:15:43:21.123456', 'yyyy-MM-dd:HH:mm:ss.SSSUUU'))
FROM long_sequence(1);
```

| millis |
| ------ |
| 123    |

```questdb-sql title="Using in an aggregation"
select millis(ts), count() from transactions;
```

| second | count |
| ------ | ----- |
| 0      | 2323  |
| 1      | 6548  |
| ...    | ...   |
| 998    | 9876  |
| 999    | 2567  |

## micros

`micros(value)` - returns the `micros` of the millisecond for a given date or
timestamp from `0` to `999`

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Micros of the second"
SELECT micros(to_timestamp('2020-03-01:15:43:21.123456', 'yyyy-MM-dd:HH:mm:ss.SSSUUU'))
FROM long_sequence(1);
```

| millis |
| ------ |
| 456    |

```questdb-sql title="Using in an aggregation"
select micros(ts), count() from transactions;
```

| second | count |
| ------ | ----- |
| 0      | 2323  |
| 1      | 6548  |
| ...    | ...   |
| 998    | 9876  |
| 999    | 2567  |

## second

`second(value)` - returns the `second` of the minute for a given date or
timestamp from `0` to `59`

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Second of the minute"
SELECT second(to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'))
FROM long_sequence(1);
```

| second |
| ------ |
| 43     |

```questdb-sql title="Using in an aggregation"
select second(ts), count() from transactions;
```

| second | count |
| ------ | ----- |
| 0      | 2323  |
| 1      | 6548  |
| ...    | ...   |
| 58     | 9876  |
| 59     | 2567  |

## minute

`minute(value)` - returns the `minute` of the hour for a given date or timestamp
from `0` to `59`

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Minute of the hour"
SELECT minute(to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'))
FROM long_sequence(1);
```

| minute |
| ------ |
| 43     |

```questdb-sql title="Using in an aggregation"
select minute(ts), count() from transactions;
```

| minute | count |
| ------ | ----- |
| 0      | 2323  |
| 1      | 6548  |
| ...    | ...   |
| 58     | 9876  |
| 59     | 2567  |

## hour

`hour(value)` - returns the `hour` of day for a given date or timestamp from `0`
to `23`

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Hour of the day"
SELECT hour(to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'))
FROM long_sequence(1);
```

| hour |
| ---- |
| 12   |

```questdb-sql title="Using in an aggregation"
select hour(ts), count() from transactions;
```

| hour | count |
| ---- | ----- |
| 0    | 2323  |
| 1    | 6548  |
| ...  | ...   |
| 22   | 9876  |
| 23   | 2567  |

## day

`day(value)` - returns the `day` of month for a given date or timestamp from `0`
to `23`

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Day of the month"
SELECT day(to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'))
FROM long_sequence(1);
```

| day |
| --- |
| 01  |

```questdb-sql title="Using in an aggregation"
select day(ts), count() from transactions;
```

| day | count |
| --- | ----- |
| 1   | 2323  |
| 2   | 6548  |
| ... | ...   |
| 30  | 9876  |
| 31  | 2567  |

## month

`month(value)` - returns the `month` of year for a given date or timestamp from
`1` to `12`

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Month of the year"
SELECT month(to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'))
FROM long_sequence(1);
```

| month |
| ----- |
| 03    |

```questdb-sql title="Using in an aggregation"
select month(ts), count() from transactions;
```

| month | count |
| ----- | ----- |
| 1     | 2323  |
| 2     | 6548  |
| ...   | ...   |
| 11    | 9876  |
| 12    | 2567  |

## year

`year(value)` - returns the `year` for a given date or timestamp

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql title="Year"
SELECT year(to_timestamp('2020-03-01:15:43:21', 'yyyy-MM-dd:HH:mm:ss'))
FROM long_sequence(1);
```

| year |
| ---- |
| 2020 |

```questdb-sql title="Using in an aggregation"
select month(ts), count() from transactions;
```

| year | count |
| ---- | ----- |
| 2015 | 2323  |
| 2016 | 9876  |
| 2017 | 2567  |

## is_leap_year

`is_leap_year(value)` - returns `true` if the `year` of `value` is a leap year,
`false` otherwise.

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `boolean`

**Examples:**

```questdb-sql
select year(ts), is_leap_year(ts) from myTable;
```

| year | is_leap_year |
| ---- | ------------ |
| 2020 | true         |
| 2021 | false        |
| 2022 | false        |
| 2023 | false        |
| 2024 | true         |
| 2025 | false        |

## days_in_month

`days_in_month(value)` - returns the number of days in a month from a provided
timestamp or date.

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql
select month(ts), days_in_month(ts) from myTable;
```

| month | days_in_month |
| ----- | ------------- |
| 4     | 30            |
| 5     | 31            |
| 6     | 30            |
| 7     | 31            |
| 8     | 31            |

## day_of_week

`day_of_week(value)` - returns the day number in a week from `1` (Monday) to `7`
(Sunday)

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql
select to_str(ts,'EE'),day_of_week(ts) from myTable;
```

| day       | day_of_week |
| --------- | ----------- |
| Monday    | 1           |
| Tuesday   | 2           |
| Wednesday | 3           |
| Thursday  | 4           |
| Friday    | 5           |
| Saturday  | 6           |
| Sunday    | 7           |

## day_of_week_sunday_first

`day_of_week_sunday_first(value)` - returns the day number in a week from `1`
(Sunday) to `7` (Saturday)

**Arguments:**

- `value` is any `timestamp` or `date`

**Return value:**

Return value type is `int`

**Examples:**

```questdb-sql
select to_str(ts,'EE'),day_of_week_sunday_first(ts) from myTable;
```

| day       | day_of_week_sunday_first |
| --------- | ------------------------ |
| Monday    | 2                        |
| Tuesday   | 3                        |
| Wednesday | 4                        |
| Thursday  | 5                        |
| Friday    | 6                        |
| Saturday  | 7                        |
| Sunday    | 1                        |

## Date and Timestamp format

Format is a combination of letters from table below combined with arbitrary
text. Format letters are case-sensitive and are used as is (e.g. without any
prefix)

| Letter | Date or Time Component                           | Presentation       | Examples                              |
| ------ | ------------------------------------------------ | ------------------ | ------------------------------------- |
| `G`    | Era designator                                   | Text               | AD                                    |
| `y`    | Year                                             | Year               | 1996; 96                              |
| `Y`    | Week year                                        | Year               | 2009; 09                              |
| `M`    | Month in year                                    | Month              | July; Jul; 07                         |
| `w`    | Week in year                                     | Number             | 27                                    |
| `W`    | Week in month                                    | Number             | 2                                     |
| `D`    | Day in year                                      | Number             | 189                                   |
| `d`    | Day in month                                     | Number             | 10                                    |
| `F`    | Day of week in month                             | Number             | 2                                     |
| `E`    | Day name in week                                 | Text               | Tuesday; Tue                          |
| `u`    | Day number of week (1 = Monday, ..., 7 = Sunday) | Number             | 1                                     |
| `a`    | Am/pm marker                                     | Text               | PM                                    |
| `H`    | Hour in day (0-23)                               | Number             | 0                                     |
| `k`    | Hour in day (1-24)                               | Number             | 24                                    |
| `K`    | Hour in am/pm (0-11)                             | Number             | 0                                     |
| `h`    | Hour in am/pm (1-12)                             | Number             | 12                                    |
| `m`    | Minute in hour                                   | Number             | 30                                    |
| `s`    | Second in minute                                 | Number             | 55                                    |
| `S`    | Millisecond                                      | Number             | 978                                   |
| `z`    | Time zone                                        | General time zone  | Pacific Standard Time; PST; GMT-08:00 |
| `Z`    | Time zone                                        | RFC 822 time zone  | -0800                                 |
| `X`    | Time zone                                        | ISO 8601 time zone | -08; -0800; -08:00                    |
| `U`    | Microsecond                                      | Number             | 698                                   |

### See also

- [to_timestamp](#to_timestamp)
- [to_date](#to_date)
- [to_str](#to_str)
