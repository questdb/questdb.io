---
title: Build a monitoring dashboard with QuestDB and Grafana
author: Joan
author_title: QuestDB Team
author_url: https://github.com/jaugsburger
author_image_url: https://avatars.githubusercontent.com/jaugsburger
description:
  "Use Grafana with QuestDB to build a monitoring dashboard for visualization of
  time series data."
tags: [tutorial, grafana, postgres]
---

In this tutorial you will learn how to use QuestDB as a data source for your
Grafana dashboards and create visualizations using aggregate functions and
sampling.

<!-- truncate -->

## What is Grafana?

Grafana is an open-source visualization tool consisting of a server that
connects to one or more data-sources to retrieve data, which is then visualized
by the user in a browser.

The following three Grafana features will be used in this tutorial:

1. **Data source** - this is how you tell Grafana where your data is stored and
   how you want to access it. For this tutorial, we will have a QuestDB server
   running which we will access via Postgres Wire using the PostgreSQL data
   source plugin.
2. **Dashboard** - A group of widgets that are displayed together on the same
   screen.
3. **Panel** - A single visualization which can be a graph or table.

## Setup

### Start Grafana

```shell
docker run -p 3000:3000 grafana/grafana
```

Once the Grafana server has started, you can access it via port 3000
([http://locahost:3000](http://locahost:3000)). The default login credentials
are as follows:

```shell
user:admin
password:admin
```

### Start QuestDB

The Docker version for QuestDB can be run exposing the port `8812` for the
PostgreSQL connection and port `9000` for the web and REST interface:

```shell
docker run -p 8812:8812 -p 9000:9000 questdb/questdb
```

### Loading the dataset

On our [live demo](http://try.questdb.io:9000/), uses 10+ years of taxi data.
For this tutorial, we have a subset of that data, the data for the whole of
February 2018. You can download the compressed dataset
[from Amazon S3](https://s3-eu-west-1.amazonaws.com/questdb.io/datasets/grafana_tutorial_dataset.tar.gz):

```shell
curl https://s3-eu-west-1.amazonaws.com/questdb.io/datasets/grafana_tutorial_dataset.tar.gz > grafana_data.tar.gz
tar -xvf grafana_data.tar.gz
```

There should be two datasets available as `.CSV` files:

- `weather.csv`
- `taxi_trips_feb_2018.csv`

These can be imported via curl using the `/imp` REST entrypoint:

```shell
curl -F data=@taxi_trips_feb_2018.csv http://localhost:9000/imp
curl -F data=@weather.csv http://localhost:9000/imp
```

## Creating your first visualization

### Create a data source

In Grafana, select to the cog icon to expand the **Configuration** menu, select
**Data Sources** and click the **Add data source** button. Choose PostgreSQL
plugin and configure it with the following settings:

```
host:localhost:8812
database:qdb
user:admin
password:quest
SSL mode:disable
```

If `localhost` cannot be resolved by the Grafana docker image, the local IP
address of your machine should be used for the **host** field, e.g.
`192.168.0.3:8812`.

Note that Grafana does not validate that queries are read-only. This means it's
possible to run queries such as `drop table x` in Grafana which would be
destructive to a dataset.

To protect against this, set a dedicated QuestDB instance **read-only mode** by
setting the property `http.security.readonly=true` in your `server.conf`.
Details of setting this configuration can be found on Grafana's
[configuration page](https://questdb.io/docs/reference/configuration).

### Create a dashboard and a panel

Now that we have a data source and a dashboard, we can add a panel. Navigate to
**+ Create** and select **Dashboard**:

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Screenshot of a new dashboard with a 'Add new panel' button"
  src="/img/blog/2020-10-19/add-new-panel.png"
/>

The new panel has a graphing area on the top and a query builder in the bottom:

<Screenshot
  alt="Screenshot of a blank panel after being created"
  src="/img/blog/2020-10-19/blank-panel.png"
/>

Toggle the query editor to **text edit mode** by clicking the pencil icon. The
query editor will now accept SQL statements that we can input:

<Screenshot
  alt="Screenshot showing how to toggle text edit mode"
  src="/img/blog/2020-10-19/toggle-text-edit.png"
/>

Paste the following query into the editor:

```
SELECT pickupDatetime AS time,
       avg(tripDistance) AS distance
FROM ('taxi_trips_feb_2018.csv' timestamp(pickupDatetime))
WHERE $__timeFilter(pickupDatetime)
SAMPLE BY $__interval
```

We have built our first panel with aggregations:

<Screenshot
  alt="A panel showing the average distance traveled, filtered by taxi type and with dynamic sampling."
  src="/img/blog/2020-10-19/first-panel.png"
/>

#### Query functions explained

To graph the average trip distance, we use the `avg()` function on the
`tripDistance` column. This function aggregates data over the specified sampling
interval. If the sampling interval is **1-hour**, we are calculating the average
distance traveled during each 1-hour interval. You can find more information on
QuestDB
[aggregate functions on our documentation](/docs/reference/function/aggregation/).

There are also 2 key Grafana-specific functions used which can be identified by
the `$__` prefix:

`$__timeFilter(pickupDatetime)` tells Grafana to send the start-time and
end-time defined in the dashboard to the QuestDB server. Grafana translates this
to: `pickupDatetime BETWEEN '2018-02-01T00:00:00Z' AND '2018-02-28T23:59:59Z'`.

`$__interval` This function calculates a dynamic interval based on the time
range applied to the dashboard. By using this function, the sampling interval
changes automatically as the user zooms in and out of the panel.

### Adding multiple queries

You can add multiple queries to the same panel which will display multiple lines
on a graph. To demonstrate this, separate the taxi data into two series, one for
cash payments and one for card payments. The first query will have a default
name of `A`

```
--Cash
SELECT pickupDatetime AS time,
       avg(tripDistance) AS cash
FROM ('taxi_trips_feb_2018.csv' timestamp(pickupDatetime))
WHERE $__timeFilter(pickupDatetime)
AND paymentType IN ('Cash')
SAMPLE BY $__interval
```

Click **+ Query** to add a second query (automatically labeled `B`) and paste
the following in text mode:

```
--Card
SELECT pickupDatetime AS time,
       avg(tripDistance) AS card
FROM ('taxi_trips_feb_2018.csv' timestamp(pickupDatetime))
WHERE $__timeFilter(pickupDatetime)
AND paymentType IN ('Card')
SAMPLE BY $__interval
```

Both queries are now layered on the same panel with a green line for cash and a
yellow line for card payments:

<Screenshot
  alt="A panel showing the average distance travelled, filtered by taxi type and with dynamic sampling."
  src="/img/blog/2020-10-19/panel-filtering-by-taxi-type.png"
/>

We can see in this graph that the distance traveled by those paying with cards
is longer than for those paying with cash. This could be due to the fact that
users usually carry less cash than the balance in their card.

Let’s add another panel:

```
SELECT
pickupDatetime AS "time",
count()
FROM ('taxi_trips_feb_2018.csv' timestamp(pickupDatetime))
WHERE $__timeFilter(pickupDatetime)
SAMPLE BY $__interval;
```

This is what our query looks like when viewing a time range of 28 days:

<Screenshot
  alt="A panel showing the number of trips over a month using dynamic sampling."
  src="/img/blog/2020-10-19/panel-count-of-taxi-trips-in-whole-month.png"
/>

Zooming in to a single day shows more detailed data points as we are sampling by
Grafana's `$__interval` property:

<Screenshot
  alt="A panel showing the number of trips in a day using dynamic sampling."
  src="/img/blog/2020-10-19/panel-count-of-taxi-trips-in-a-day.png"
/>

The daily cycle of activity is visible, with rides peaking in the early evening
and reaching a low in the middle of the night.

## ASOF JOIN

`ASOF` joins allow us to join 2 tables based on timestamp where timestamps do
not exactly match.

Here we are joining the taxi trips data with weather data:

```
SELECT
    pickupDatetime as "time",
    avg(tripDistance) as tripDistance,
    avg(rain24H) as rain24H
FROM (('taxi_trips_feb_2018.csv' timestamp(pickupDatetime)) WHERE $__timeFilter(pickupDatetime))
ASOF JOIN (weather.csv timestamp(timestamp))
SAMPLE BY $__interval;
```

This is what it looks like for the whole month of February 2018:

<Screenshot
  alt="A panel showing taxi fares plotted against rain fall"
  src="/img/blog/2020-10-19/panel-taxi-fares-and-rain.png"
/>

In this graph, we have 2 series, in green we have the fare amount sampled
dynamically, and in yellow we have the precipitation over the last hour in
millimeters. From the graph, it’s hard to say whether there is a correlation
between rain and the amount spent on taxi rides.

If we zoom in on a rainy day:

<Screenshot
  alt="A panel showing taxi fares plotted against rain fall, zooming in on a rainy day"
  src="/img/blog/2020-10-19/panel-taxi-fares-and-rain-on-a-rainy-day.png"
/>

Again, we see no obvious increase in the amount spent in taxi rides during the
rainiest period of the day.

Note that the graphs above have 2 Y-axis. To enable the right Y-axis, do this,
click on the yellow line next to the rainH label:

<Screenshot
  alt="Showing how to enable 2nd Y-axis by clicking on the line next to the series name."
  src="/img/blog/2020-10-19/enabling-2nd-y-axis.png"
/>

In the pop-up, click on the Y-axis tab and enable use of the right axis for this
series.

## Conclusion

We have learned how to import time series data into QuestDB and build a
dashboard with multiple queries in Grafana. If you like this content and want to
see more tutorials about third-party integrations, let us know
[in our Slack Community]({@slackUrl@}) or drop us a
[star on GitHub]({@githubUrl@}).
