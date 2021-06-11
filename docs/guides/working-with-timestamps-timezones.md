---
title: Timestamps and time zones
description:
  This document describes how to work with time zones in QuestDB, including
  hints how to convert timestamps to UTC, to a specific time zone or by a UTC
  offset value.
---

When working with timestamped data, it may be necessary to convert timestamp
values to or from UTC, or to offset timestamp values by a fixed duration. The
following sections describe how QuestDB handles timestamps natively, how to use
built-in functions for working with time zone conversions, and general hints for
working with time zones in QuestDB.

## Timestamps in QuestDB

The native timestamp format used by QuestDB is a Unix timestamp in microsecond
resolution. QuestDB does not store time zone information alongside timestamp
values and therefore it should be assumed that all timestamps are in UTC. The
following example shows how a Unix timestamp in microseconds may be passed into
a timestamp column directly:

```questdb-sql
CREATE TABLE my_table (ts timestamp, col1 int) timestamp(ts)
INSERT INTO my_table VALUES(1623167145123456, 12)
my_table
```

| ts                          | col1 |
| --------------------------- | ---- |
| 2021-06-08T15:45:45.123456Z | 12   |

Timestamps may also inserted as strings in the following way:

```questdb-sql
INSERT INTO my_table VALUES('2021-06-08T16:45:45.123456Z', 13)
my_table
```

| ts                          | col1 |
| --------------------------- | ---- |
| 2021-06-08T15:45:45.123456Z | 12   |
| 2021-06-08T16:45:45.123456Z | 13   |

## QuestDB's internal time zone database

In order to simplify working with time zones, QuestDB uses
[the tz time zone database](https://en.wikipedia.org/wiki/Tz_database) which is
standard in the Java ecosystem. This time zone database is used internally in
time zone lookup and in operations relating to timestamp value conversion to and
from time zones.

For this reason, a time zone may be referenced by abbreviated name, by full time
zone name or by UTC offset:

| Abbreviation | Time zone name   | UTC offset |
| ------------ | ---------------- | ---------- |
| EST          | America/New_York | -05:00     |

### Referring to time zones

It's strongly advised **not to use the three-letter ID** or abbreviation for
time zones for the following reason:

> The same abbreviation is often used for multiple time zones (for example,
> "CST" could be U.S. "Central Standard Time" and "China Standard Time"), and
> the Java platform can then only recognize one of them

Therefore choosing a geographic region which observes a time zone
(`"America/New_York"`, `"Europe/Prague"`) or a UTC offset value (`"+02:00"`) is
more reliable when referring to time zones. Instructions for converting to and
from time zones are described in the
[Converting timestamps to and from time zones](#converting-timestamps-to-and-from-time-zones)
section below.

The current QuestDB time zone database uses the **English locale** but support
for additional locales may be added in future. Referring to time zones which are
outdated or not recognized results in a `invalid timezone name` error. The
following resources may be used for hints how to refer to time zones by ID or
offset:

- The [official list maintained by IANA](https://www.iana.org/time-zones)
- Java's
  [getAvailableZoneIds](https://docs.oracle.com/javase/8/docs/api/java/time/ZoneId.html#getAvailableZoneIds--)
  method
- [Wiki entry on tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
  (this is a convenient reference, but may not be 100% accurate)

:::info

Users should be aware that the time zone database contains both **current and
historic transitions** for various time zones. Therefore time zone conversions
must take the historic time zone transitions into account based on the timestamp
values.

:::

### Updates to the time zone database

The upstream project updates past time zones as new information becomes
available. These changes are typically related to daylight saving time (DST)
start and end date transitions and, on rare occasions, time zone name changes.

The tz database version used by QuestDB is determined by the JDK version used at
build time and therefore updates to the time zone database are directly
influenced by this JDK version. To find the JDK version used by a QuestDB build,
run the following SQL:

```questdb-sql
select build()
```

| build                                                                                              |
| -------------------------------------------------------------------------------------------------- |
| Build Information: QuestDB 6.0.3, JDK 11.0.7, Commit Hash a6afbadb9b9419d47cca1bf86fa13fdadf08bda4 |

## Converting timestamps to and from time zones

For convenience, QuestDB includes two functions for time zone conversions on
timestamp values.

- [to_timezone()](/docs/reference/function/date-time/#to_timezone)
- [to_utc()](/docs/reference/function/date-time#to_utc)

These functions are used to convert a Unix timestamp, or a string equivalent
cast to timestamp as follows:

```questdb-sql
select to_timezone(1623167145000000, 'Europe/Berlin')
```

| to_timezone                 |
| --------------------------- |
| 2021-06-08T17:45:45.000000Z |

```questdb-sql
select to_utc(1623167145000000, 'Europe/Berlin')
```

| to_utc                      |
| --------------------------- |
| 2021-06-08T13:45:45.000000Z |

### Using UTC offset for conversions

The [to_timezone()](/docs/reference/function/date-time/#to_timezone) and
[to_utc()](/docs/reference/function/date-time#to_utc) functions may use UTC
offset for converting timestamp values. In some cases, this can be more reliable
than string or time zone ID conversion given historic changes to time zone names
or transitions. The following example takes a Unix timestamp in microseconds and
converts it to a time zone `+2` hours offset from UTC:

```questdb-sql
select to_timezone(1213086329000000, '+02:00')
```

| to_timezone                 |
| --------------------------- |
| 2008-06-10T10:25:29.000000Z |

```questdb-sql
select to_utc('2008-06-10T10:25:29.000000Z', '+02:00')
```

| to_timezone                 |
| --------------------------- |
| 2008-06-10T08:25:29.000000Z |
