---
title: Configuring ingestion and commits of out-of-order data
sidebar_label: Out-of-order data
description:
  This document describes server configuration parameters for ingestion
  hysteresis along with details when and why these settings should be applied
image: /img/guides/hysteresis/o3-data.jpeg
---

Server configuration may be applied when ingesting data over InfluxDB Line
Protocol (ILP) to allow user control on how the system processes and commits
late-arriving data for optimum throughput.

## Background

As of software version 6.0, QuestDB adds support for out-of-order (O3) data
ingestion. The skew and latency of out-of-order data are likely to be relatively
constant, so users may configure ingestion based on the characteristics of the
data.

Most real-time out-of-order data patterns are caused by the delivery mechanism
and hardware jitter, and therefore the timestamp distribution will be contained
by some boundary.

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="A diagram showing how data may arrive with random timings from clients due to network jitter or latency"
  height={334}
  src="/img/guides/hysteresis/o3-data.jpeg"
  title="Records with various network-induced delays"
  width={650}
/>

If any new timestamp value has a high probability to arrive within 10 seconds of
the previously received value, the boundary for this data is `10 seconds` and we
name this boundary **O3 hysteresis**.

When the order of timestamp values follow this pattern, it will be recognized by
our out-of-order algorithm and prioritized using an optimized processing path. A
commit of this data re-orders uncommitted rows and then commits all rows up to
the boundary; the remaining rows stay in memory to be committed later.

## Out-of-order (O3) commit parameters

Commit parameters allow for specifying that commits of out-of-order data should
occur when:

- they are outside a window of time for which they are expected to be
  out-of-order or
- when the row-count passes a certain threshold.

:::info

Commit parameters are user-configurable for ingestion using **InfluxDB line
protocol only**. This is the case as commits over Postgres wire protocol are
invoked client-side and commits via REST API occur either row-by-row or after a
CSV import is complete.

:::

The following server configuration parameters are user-configurable:

```bash
# the maximum number of uncommitted o3 rows
cairo.o3.max.uncommitted.rows=X
# the maximum time between jobs that commit uncommitted o3 rows
cairo.o3.commit.hysteresis.in.ms=X
# the maximum time between ILP jobs that commit uncommitted rows
line.tcp.maintenance.job.hysteresis.in.ms=X
```

These parameters are enforced so that commits occur **if any one of these
conditions are met**, therefore out-of-order commits occur based on the age of
out-of-order records or by record count.

An out-of-order commit will occur:

- every `cairo.o3.max.uncommitted.rows` **or**
- if records haven't been committed for
  `line.tcp.maintenance.job.hysteresis.in.ms`

If a commit occurs due to `cairo.o3.max.uncommitted.rows` being reached, then
`cairo.o3.commit.hysteresis.in.ms` will be applied.

## When to change out-of-order commit configuration

The defaults for the out-of-order algorithm are optimized for real-world usage
and should cover most patterns for timestamp arrival. The default configuration
is as follows:

```txt title="Defaults"
cairo.o3.commit.hysteresis.in.ms=300000
cairo.o3.max.uncommitted.rows=500000
line.tcp.maintenance.job.hysteresis.in.ms=30000
```

Users should modify out-of-order parameters if there is a known or expected
pattern for:

1. The length of time by which most records are late
2. The frequency of incoming records and the expected throughput

For optimal ingestion performance, the number of commits of out-of-order data
should be minimized. For this reason, if throughput is low and timestamps are
expected to be consistently delayed up to thirty seconds, the following
configuration settings can be applied

```txt title="server.conf"
cairo.o3.commit.hysteresis.in.ms=30000
cairo.o3.max.uncommitted.rows=500
```

For high-throughput scenarios, lower commit timer and larger number of
uncommitted rows may be more appropriate. The following settings would assume a
throughput of ten thousand records per second with a likely maximum of 1 second
lateness for timestamp values:

```txt title="server.conf"
cairo.o3.commit.hysteresis.in.ms=1000
cairo.o3.max.uncommitted.rows=10000
```

## How to configure out-of-order ingestion

These settings may be applied via
[server configuration file](/docs/reference/configuration/):

```txt title="server.conf"
cairo.o3.max.uncommitted.rows=500
cairo.o3.commit.hysteresis.in.ms=10000
line.tcp.maintenance.job.hysteresis.in.ms=1000
```

As with other server configuration parameters, these settings may be passed as
environment variables:

- `QDB_LINE_TCP_MAINTENANCE_JOB_HYSTERESIS_IN_MS`
- `QDB_CAIRO_O3_MAX_UNCOMMITTED_ROWS`
- `QDB_CAIRO_O3_COMMIT_HYSTERESIS_IN_MS`

To set this configuration for the current shell:

```bash title="Setting environment variables"
export QDB_CAIRO_O3_MAX_UNCOMMITTED_ROWS=1000
export QDB_CAIRO_O3_COMMIT_HYSTERESIS_IN_MS=20000
questdb start
```

Passing the environment variables via Docker is done using the `-e` flag:

```bash
docker run -p 8812:8812 -p 9000:9000 -p 9009:9009 \
  -e QDB_CAIRO_O3_MAX_UNCOMMITTED_ROWS=1000 \
  -e QDB_CAIRO_O3_COMMIT_HYSTERESIS_IN_MS=20000 \
  questdb/questdb
```

### Configuring out-of-order values per-table

Aside from 'global' server out-of-order settings, it's possible to set
out-of-order values during table creation as part of the `PARTITION BY` clause.
When passed in this way using the `WITH` keyword, the following two parameters
may be applied:

- `o3MaxUncommittedRows` - equivalent to `cairo.o3.max.uncommitted.rows`
- `o3CommitHysteresis` - equivalent to `cairo.o3.commit.hysteresis.in.ms`

```questdb-sql title="Setting out-of-order table parameters via SQL"
CREATE TABLE my_table (timestamp TIMESTAMP) timestamp(timestamp)
PARTITION BY DAY WITH o3MaxUncommittedRows=250000, o3CommitHysteresis=240s
```

Checking the values per-table may be done using the `tables()` function:

```questdb-sql title="List all tables"
select id, name, o3MaxUncommittedRows, o3CommitHysteresisMicros from tables();
```

| id  | name        | o3MaxUncommittedRows | o3CommitHysteresisMicros |
| --- | ----------- | -------------------- | ------------------------ |
| 1   | my_table    | 250000               | 240000000                |
| 2   | device_data | 10000                | 30000000                 |

The values can changed per each table with:

```questdb-sql title="Altering hysteresis o3MaxUncommittedRows parameter via SQL"
ALTER TABLE my_table SET PARAM o3MaxUncommittedRows = 10000
```

and

```questdb-sql title="Altering hysteresis o3CommitHysteresis parameter via SQL"
ALTER TABLE my_table SET PARAM o3CommitHysteresis = 20s
```

For more information on checking table metadata, see the
[meta functions](/docs/reference/function/meta/) documentation page.
