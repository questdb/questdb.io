---
title: Configuring O3 commit hysteresis
sidebar_label: O3 hysteresis
description:
  This document describes server configuration parameters for ingestion
  hysteresis along with details when and why these settings should be applied
image: /img/guides/hysteresis/o3-data.jpeg
---

Server configuration may be applied when ingesting data over InfluxDB Line
Protocol (ILP) to allow user control on how the system processes and commits
data for optimized performance.

## Background

As of software version 6.0, QuestDB adds support for out-of-order (O3) data
ingestion. The skew and latency of O3 data are likely to be relatively constant,
so users may configure ingestion based on the characteristics of the data.

For O3 data, most real-time data patterns are caused by the delivery mechanism
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
our hysteresis algorithm and prioritized using an optimized processing path. A
commit of O3 data re-orders uncommitted rows and then commits all rows up to the
hysteresis boundary; the remaining rows stay in memory to be committed later.

## O3 commit hysteresis parameters

Commit hysteresis parameters are available for specifying that rows may only be
committed when they are outside a window of time for which they are expected to
be out-of-order. The following server configuration parameters are
user-configurable which help with applying hysteresis practically:

```bash
# the maximum number of uncommitted o3 rows
cairo.o3.max.uncommitted.rows=X

# the maximum time between jobs that commit uncommitted o3 rows
cairo.o3.commit.hysteresis.in.ms=X

# the maximum time between ILP jobs that commit uncommitted rows
line.tcp.maintenance.job.hysteresis.in.ms=X
```

These parameters are enforced so that commits occur **if any one of these
conditions are met**, therefore hysteresis is applied based on the age of O3
records or by record count.

An O3 commit will occur:

- every `cairo.o3.max.uncommitted.rows` **or**
- if records haven't been committed for
  `line.tcp.maintenance.job.hysteresis.in.ms`

If a commit occurs due to `cairo.o3.max.uncommitted.rows` being reached, then
`cairo.o3.commit.hysteresis.in.ms` will be applied.

## When to change hysteresis configuration

The defaults for the hysteresis algorithm are optimized for real-world usage and
should cover most O3 patterns for timestamp values. The default configuration is
as follows:

```txt title="Defaults"
cairo.o3.commit.hysteresis.in.ms=1000
cairo.o3.max.uncommitted.rows=1000
line.tcp.maintenance.job.hysteresis.in.ms=1000
```

Users should modify hysteresis parameters if there is a known or expected
pattern for:

1. The length of time by which most records are late
2. The frequency of incoming records and the expected throughput

For optimal ingestion performance, the number of commits of O3 data should be
minimized. For this reason, if throughput is low and timestamps are expected to
be consistently delayed up to thirty seconds, the following configuration
settings may be applied

```txt title="server.conf"
cairo.o3.commit.hysteresis.in.ms=30000
cairo.o3.max.uncommitted.rows=500
```

For high-throughput scenarios, lower commit hysteresis and larger number of
uncommitted rows may be more appropriate. The following settings would assume a
throughput of ten thousand records per second with a likely maximum of 1 second
lateness for timestamp values:

```txt title="server.conf"
cairo.o3.commit.hysteresis.in.ms=1000
cairo.o3.max.uncommitted.rows=10000
```

## How to apply hysteresis parameters

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

O3 hysteresis parameters may also be set during table creation as part of the
`PARTITION BY` clause. When passed in this way using the `WITH` keyword, the
following two parameters may be applied:

- `o3MaxUncommittedRows` - equivalent to `cairo.o3.max.uncommitted.rows`
- `o3CommitHysteresis` - equivalent to `cairo.o3.commit.hysteresis.in.ms`

```questdb-sql title="Setting hysteresis parameters via SQL"
CREATE TABLE my_table (timestamp TIMESTAMP) timestamp(timestamp)
PARTITION BY DAY WITH o3MaxUncommittedRows=250000, o3CommitHysteresis=240s
```
