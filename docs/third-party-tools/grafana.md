---
title: Grafana
description: Grafana with QuestDB reference documentation.
---

[Grafana](https://grafana.com/) is widely used to visualize data via an
extensive ecosystem of widgets and plugins. QuestDB connects to Grafana using
its [Postgres](/docs/reference/api/postgres/) endpoint.

## Prerequisites

[Install](https://grafana.com/grafana/download) Grafana for your platform. You
will need QuestDB to be running and accessible, you can do so from
[Docker](/docs/get-started/docker/), the [binaries](/docs/get-started/binaries/)
or [Homebrew](/docs/get-started/homebrew/) for macOS users.

## Add a data source

1. Open Grafana's UI (by default available at `http://localhost:3000`)
2. Go to the `Configuration` section and click on `Data sources`
3. Click `Add data source`
4. Choose the `PostgreSQL` plugin and configure it with the following settings:

```bash
host: localhost:8812
database: qdb
user: admin
password: quest
SSL mode: disable
```

5. When adding a panel, use the “text edit mode” by clicking on the pencil icon
   and add your query

## Macros

To simplify syntax and to allow for dynamic parts, like date range filters, the
query can contain macros.

### `$__timeFilter(timestamp)`

This macro tells Grafana to send the start-time and end-time defined in the
dashboard to the QuestDB server. It translates to:

```
timestamp BETWEEN
    '2018-02-01T00:00:00Z' AND '2018-02-28T23:59:59Z'
```

### `$__interval`

This macro calculates a dynamic interval based on the time range applied to the
dashboard. By using this function, the sampling interval changes automatically
as the user zooms in and out of the panel.

## Example query

```
SELECT
  pickup_datetime AS time,
  avg(trip_distance) AS distance
FROM taxi_trips
WHERE $__timeFilter(pickup_datetime)
SAMPLE BY $__interval;
```
