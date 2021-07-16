---
title: QuestDB 6.0.4 July release, Prometheus metrics support
author: Brian Smith
author_title: QuestDB Team
author_url: https://github.com/bsmth
author_image_url: https://avatars.githubusercontent.com/bsmth
description:
  QuestDB 6.0.4 is available now with highlights such as performance
  improvements, increased parallelization of existing code, calendar alignment
  for `SAMPLE BY` queries, and a new Prometheus endpoint.
keywords:
  - postgres
  - prometheus
  - timeseries
  - database
image: /img/blog/2021-07-16/banner.png
tags: [prometheus, postgres, influxdb, telegraf, release]
---

We've published the latest QuestDB release, and it focuses on community-driven
topics raised with us recently by our users. The features included are
performance improvements, increased parallelization of existing code, and
calendar alignment for `SAMPLE BY` queries. Also included is the introduction of
a framework for exposing Prometheus metrics by our community member Piotr
Rżysko. Here's the full roundup of changes that have just landed!

<!--truncate-->

## QuestDB 6.0.4

This release fixes issues raised and prioritized by the developer community, and
includes stability fixes across several subsystems. The addition of a framework
for Prometheus metrics is an exciting feature that we expect will be
continuously developed with more types of counters and gauges added as we get
feedback on its use. The addition of monitoring using Prometheus will simplify
how users gain insights into the performance and activity of deployed instances
of QuestDB.

### SAMPLE BY with calendar alignment

It's now possible to perform `SAMPLE BY` queries where the sampled groups align
strictly to calendar dates with optional time zones and offsets. The default
behavior for sampling is unchanged from previous releases, and calendar
alignment is possible through the use of the following optional keywords:

```questdb-sql
SELECT ts, count() FROM sensors
SAMPLE BY 1d
ALIGN TO CALENDAR
-- additional configuration for offsets and time zones
ALIGN TO CALENDAR WITH OFFSET
ALIGN TO CALENDAR TIME ZONE {tz_id}
ALIGN TO CALENDAR TIME ZONE {tz_id} WITH OFFSET
```

For more information on using calendar alignment with sampled groups, see the
[SAMPLE BY documentation](/docs/reference/sql/sample-by/#align-to-calendar).

### SQL performance improvements

We gathered user feedback on the most critical query types that require faster
execution speed, and we have improved `LATEST BY` handling internally. These
enhancements are possible by massively parallelizing how these operations are
executed and optimizing aggregate calculations within sampled groups. Users will
see these improvements with the following two query types:

```questdb-sql
-- indexed columns
SELECT * FROM my_table LATEST BY indexed_col;
-- indexed columns with filtering using WHERE
SELECT * FROM my_table LATEST BY indexed_col WHERE other_col > 9000;
```

### Prometheus metrics

The new implementation for [Prometheus](https://prometheus.io/) monitoring
allows for adding basic counters and will be improved in upcoming releases. To
activate Prometheus metrics, set the `metrics.enabled` key to `true` in
QuestDB's `server.conf` [configuration file](/docs/reference/configuration/):

```bash title=server.conf
metrics.enabled=true
```

Create a Prometheus configuration file that points to QuestDB's metrics endpoint
on `9003`:

```yaml title="questdb.yml"
global:
  scrape_interval: 15s
  external_labels:
    monitor: "questdb"

scrape_configs:
  - job_name: "questdb"
    scrape_interval: 5s
    static_configs:
      - targets: ["127.0.0.1:9003"]
```

Start Prometheus, passing the configuration file with the QuestDB settings:

```bash
prometheus --config.file=questdb.yml
```

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Prometheus monitoring server metrics from a QuestDB instance"
  height={415}
  src="/img/blog/2021-07-16/prometheus-questdb.png"
  title="Basic counter for number of SQL queries executed"
  width={650}
/>

The initial implementation adds a basic counter for the number of executed SQL
queries which can be charted, or alerts may be configured for this metric. If
you have some suggestions for the types of counters and gauges we should
include,
[let us know on GitHub](https://github.com/questdb/questdb/discussions).

### Breaking changes

The addition of special handling for `null` in
[#1179](https://github.com/questdb/questdb/pull/1179) introduces changes that
enforce timestamps having **only positive values**. This means that timestamps
cannot predate epoch 0 in UTC, disallowing pre-1970 values.

## How to run QuestDB 6.0.4

The release notes including a changelog is
[available on GitHub](https://github.com/questdb/questdb/releases/tag/6.0.4) and
this version has been published to
[Docker Hub](https://hub.docker.com/r/questdb/questdb/tags?page=1&ordering=last_updated):

```bash
docker pull questdb/questdb:6.0.4
```

To start up QuestDB, use `docker run`:

```bash
docker run -p 9000:9000 -p 8812:8812 -p 9009:9009 \
  questdb/questdb:6.0.4
```

## Next up

We are now trying out
[GitHub discussions](https://github.com/questdb/questdb/discussions) as a way to
get the conversation about QuestDB started! We have some great topics already so
far since we activated this feature, and we expect this to be a fun and easy way
to get involved on GitHub with open-ended discussions.

We're eagerly awaiting feedback on this release, so feel free to reach out and
tell us how this version is running. Let us know how we're doing or just come by
and say hello [in our Slack Community]({@slackUrl@}) or browse the repository
[on GitHub]({@githubUrl@}).
