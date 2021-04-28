---
title: QuestDB version 6.0 alpha
author: Brian Smith
author_title: QuestDB Team
author_url: https://github.com/bsmth
author_image_url: https://avatars.githubusercontent.com/bsmth
description:
  An alpha version for QuestDB version 6.0 is available now to test with
  highlights such as out-of-order support, improved InfluxDB Line Protocol
  ingestion and multiple fixes and improvements
keywords:
  - postgres
  - grafana
  - timeseries
  - database
image: /img/blog/2021-04-20/og.png
tags: [influxdb, postgres, out-of-order, release]
---

<!-- prettier-ignore-start -->

import Banner from "@theme/Banner"

<Banner
  alt="Announcement for QuestDB 6.0 alpha with out-of-order inserts and compatibility with the Time Series Benchmarking Suite"
  height={362}
  src="/img/blog/2021-04-20/og.png"
  width={650}
>
</Banner>

<!-- prettier-ignore-end -->

We've just published an alpha version for the upcoming 6.0 major release and it
includes long-awaited support for ingesting out-of-order records on-the-fly, a
complete overhaul of the InfluxDB Line Protocol subsystem, and multiple fixes
which provide stability improvements. Here's a roundup of changes that have just
landed in the latest and greatest version!

<!--truncate-->

## QuestDB 6.0 alpha

QuestDB relies on an append-only model and in versions prior to 6.0, we reject
records that appear (chronologically) out-of-order by timestamp at the database.
In real-world applications, data doesn’t follow this rule because of network
jitter, latency or even clock synchronization issues. Out-of-order (O3) support
adds flexibility to the system and provides compatibility with the
[Time Series Benchmark Suite](https://github.com/timescale/tsbs) (TSBS) which is
used to reliably measure and compare the performance of time series databases.

Also included with this version is a massive internal revision of InfluxDB Line
Protocol (ILP) ingestion which brings significant performance improvements,
alongside multiple UI fixes for the Web Console and SQL features.

## Features

- **O3 support** for ingestion of records which are out-of-order by timestamp
- **ARM64 support**
- `fileName` parameter can be specified for the `/exp` endpoint for CSV exports
- PostgreSQL JDBC driver now supports `getSQLKeywords` method
- UI improvements for results with only one column
- Notification element does not obscure returned rows

## Fixes

- `LIMIT -1` returns last row as expected
- Epoch timestamps supported in CSV imports
- Behavior of `ORDER BY` query returns correct values on non-cached symbol types
- Column names allow the use of minus `-` and underscore `_` characters for
  compatibility with InfluxDB Line Protocol messages

## How do I run it?

The alpha release has been published to
[Docker Hub](https://hub.docker.com/r/questdb/questdb/tags?page=1&ordering=last_updated)
and can be pulled with the following command:

```bash
docker pull questdb/questdb:6.0.0-alpha-linux-amd64
```

The image can then be run with the following command:

```bash
docker run -p 9000:9000 -p 8812:8812 -p 9009:9009 \
  questdb/questdb:6.0.0-alpha-linux-amd64
```

## Notes on O3 functionality

This feature is **enabled by default** for ingestion over InfluxDB Line
Protocol, PostgreSQL wire protocol and bulk imports via REST API. One
requirement for the use of this feature is that tables must have a partitioning
strategy employed. New tables created over ILP have a partitioning strategy per
`DAY` applied by default. For more information with SQL examples showing how to
employ a partitioning strategy, see the
[CREATE TABLE documentation](/docs/reference/sql/create-table/#create-table).

Additional server configuration parameters may be applied for optimizing
out-of-order ingestion over InfluxDB Line Protocol. For more details on these
values, see the
[server.conf description](https://github.com/questdb/questdb/blob/ooo_cont/core/src/main/resources/io/questdb/site/conf/server.conf#L341-L350),
or reach out with any questions in the meantime. A supplementary guide will
follow soon which describes why and when to apply these settings to help with
fine-tuning for your use case.

## Benchmarking version 6.0

Following the release of this alpha version, we will be running the TSBS
benchmark suite which allows us to compare the performance of QuestDB on
ingestion rates for high-throughput scenarios. We are in the process of
contributing a pull request into the official TSBS repository so users may
directly clone the suite and run the benchmark against QuestDB and other systems
for comparison.

We’re eagerly awaiting feedback on performance or any issues in this release,
feel free to reach out and let us know how the alpha is running if you end up
testing. You can let us know how we're doing or just come by and say hello
[in our Slack Community]({@slackUrl@}) or browse the repository
[on GitHub]({@githubUrl@}).
