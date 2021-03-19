---
title: Grafana
description: Guide for time series data visualization with QuestDB and Grafana
---

[Grafana](https://grafana.com/) is a popular observability and monitoring
application used to visualize data and has an extensive ecosystem of widgets and
plugins. QuestDB supports connecting to Grafana via the
[Postgres](/docs/reference/api/postgres/) endpoint.

## Prerequisites

- [Grafana](https://grafana.com/grafana/download) should be installed and
  running.
- QuestDB should be installed and running via
  [Docker](/docs/get-started/docker/), the
  [binaries](/docs/get-started/binaries/) or
  [Homebrew](/docs/get-started/homebrew/) for macOS users.

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

5. When adding a panel, use the "text edit mode" by clicking the pencil icon and
   adding a query

## Global variables

To simplify queries which have dynamic elements such as date range filters, the
query can contain global variables which are documented in the
[Grafana reference documentation](https://grafana.com/docs/grafana/latest/variables/variable-types/global-variables/#global-variables).

### `$__timeFilter(timestamp)`

This variable allows filtering results by sending a start-time and end-time to
QuestDB. This expression evaluates to:

```questdb-sql
timestamp BETWEEN
    '2018-02-01T00:00:00Z' AND '2018-02-28T23:59:59Z'
```

### `$__interval`

This variable calculates a dynamic interval based on the time range applied to
the dashboard. By using this function, the sampling interval changes
automatically as the user zooms in and out of the panel.

## Example query

```
SELECT
  pickup_datetime AS time,
  avg(trip_distance) AS distance
FROM taxi_trips
WHERE $__timeFilter(pickup_datetime)
SAMPLE BY $__interval;
```
