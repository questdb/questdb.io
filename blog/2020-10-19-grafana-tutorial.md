---
title: Build a monitoring dashboard with QuestDB and Grafana
author: Joan
author_title: QuestDB Team
author_url: https://github.com/jaugsburger
author_image_url: https://avatars.githubusercontent.com/jaugsburger
tags: [tutorial]
description: How to use Grafana and QuestDB to build a monitoring dashboard.
---

In this tutorial you will learn how to use QuestDB as a data source for your
Grafana dashboards and create visualizations using aggregate functions and
sampling

<!-- truncate -->

## What is Grafana?

Grafana is an open-source visualization tool. It consists of a server that
connects to one or more data-sources to retrieve data, which is then visualized
by the user in a browser.

## Grafana's concepts

Before going ahead, let’s review 3 essential Grafana concepts that we will use
in this tutorial:

1. **Data source** - this is how you tell Grafana where your data is stored and
   how you want to access it. For the purposes of our tutorial, we will have a
   QuestDB server running and we will access it via Postgres Wire using the
   PostgreSQL data source plugin.
2. **Dashboard** - A group of widgets that are displayed together on the same
   screen.
3. **Panel** - A single visualization. Think of it as a graph/table.

## Setup

### Running Grafana

```shell
docker run -p 3000:3000 grafana/grafana
```

Once the Grafana server has started, you can access it via port 3000
(http://locahost:3000).

### Running QuestDB

```shell
docker run -p 8812:8812 questdb/questdb
```

### Downloading the dataset

On our live [demo](http://try.questdb.io:9000/), you can find 10+ years of taxi
data. For this tutorial, we have a subset of that data, the data for the whole
of February 2018. You can download the compressed dataset
[from Amazon S3](https://s3-eu-west-1.amazonaws.com/questdb.io/datasets/grafana_tutorial_dataset.tar.gz).

### Importing the dataset

Now that we have the dataset, you can import the data by following our
[documentation](https://questdb.io/docs/develop/insert-data).

## Creating your first visualization

### Create a data source

Choose PostgreSQL plugin and configure it with the following settings

```
host:localhost:8812
database:qdb
user:admin
password:quest
SSL mode:disable
```

Note: Grafana does not validate that queries are read-only, therefore a Grafana
user could run:

`drop table x`

To protect against this, you might want to run a dedicated QuestDB instance set
to read-only mode. You can do this by `http.security.readonly=true` in your
`server.conf`. Please check the
[configuration page](https://questdb.io/docs/reference/configuration).

### Create a new dashboard and add a panel

Now that we have a data source and a dashboard, we can go ahead and add our
first panel.

<img
  alt="Screenshot of a new dashboard with a 'Add new panel' button"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-19/add-new-panel.png"
/>

The new panel will look like this:

<img
  alt="Screenshot of a blank panel after being created"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-19/blank-panel.png"
/>

Toggle the query edit box to “text edit mode” by clicking on the pencil icon.
Your edit box should look like this:

<img
  alt="Screenshot showing how to toggle text edit mode"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-19/toggle-text-edit.png"
/>

For our first panel, we will show the fare of each taxi ride in the time filter
applied.

```
SELECT pickup_datetime AS time,
       avg(trip_distance) AS cash
FROM taxi_trips
WHERE
$__timeFilter(pickup_datetime)
SAMPLE BY $__interval
```

And here we have our first panel!

<img
  alt="Screenshot of our first panel, showing the average distance travelled."
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-19/first-panel.png"
/>

You can add multiple queries to the same panel and show multiple lines in the
same panel.

Let’s separate the taxi trips into 2 series, one for cash payments and one for
card payments:

```
--Cash
SELECT pickup_datetime AS time,
       avg(trip_distance) AS cash
FROM taxi_trips
WHERE
$__timeFilter(pickup_datetime)
AND
payment_type IN ('Cash')
SAMPLE BY $__interval
```

```
--Card
SELECT pickup_datetime AS time,
       avg(trip_distance) AS card
FROM taxi_trips
WHERE
$__timeFilter(pickup_datetime)
AND
payment_type IN ('Card')
SAMPLE BY $__interval
```

And this is what the panel now looks like:

<img
  alt="A panel showing the average distance travelled, filtered by taxi type and with dynamic sampling."
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-19/panel-filtering-by-taxi-type.png"
/>

## Aggregations with sampling

You might have noticed that we are using avg() function to calculate the average
distance. The avg() function is an aggregate function, in this case, aggregating
data over the specified sampling interval. This means that if the sampling
interval is 1-hour, then we are in effect calculating the average distance
traveled during each 1-hour interval.

You can find more information on
[aggregate functions on our documentation](https://questdb.io/docs/reference/function/aggregation).

There are also 2 key grafana functions used in the query above:

`$__timeFilter(pickup_datetime)` This handy function tells Grafana to send the
from and to time defined in the Dashboard to the QuestDB server. Grafana
translates this to:
`pickup_datetime BETWEEN '2018-02-01T00:00:00Z' AND '2018-02-28T23:59:59Z'`.

`$__interval` This function calculates a dynamic interval based on the time
range applied to the dashboard. By using this function, the sampling interval
changes automatically as the user zooms in and out of panel.

Let’s add a new panel using these functions:

```
SELECT
pickup_datetime AS "time",
count()
FROM taxi_trips
WHERE $__timeFilter(pickup_datetime)
SAMPLE BY $__interval;
```

This is what it looks like when viewing it over a time range of 28 days:

<img
  alt="A panel showing the number of trips over a month using dynamic sampling."
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-19/panel-count-of-taxi-trips-in-whole-month.png"
/>

If we zoom in and choose a single day as the time range, it looks like this:

<img
  alt="A panel showing the number of trips in a day using dynamic sampling."
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-19/panel-count-of-taxi-trips-in-a-day.png"
/>

## ASOF JOIN

`ASOF` joins allow us to join 2 tables based on timestamp where timestamps do
not exactly match.

Here we are joining the taxi trips data with weather data:

```
SELECT
    pickup_datetime as "time",
    sum(fare_amount) as sumOfFares,
    avg(rain1H) as rain1H
FROM (taxi_trips WHERE $__timeFilter(pickup_datetime))
ASOF JOIN weather
SAMPLE BY $__interval;
```

This is what it looks like for the whole month of February 2018:

<img
  alt="A panel showing taxi fares plotted against rain fall"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-19/panel-taxi-fares-and-rain.png"
/>

If we zooming on a rainy day:

<img
  alt="A panel showing taxi fares plotted against rain fall, zooming in on a rainy day"
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-19/panel-taxi-fares-and-rain-on-a-rainy-day.png"
/>

Note that the graphs above have 2 Y-axis. To enable the right Y-axis, do this,
click on the yellow line next to the rainH label:

<img
  alt="Showing how to enable 2nd Y-axis by clicking on the line next to the series name."
  className="screenshot--shadow screenshot--docs"
  src="/img/blog/2020-10-19/enabling-2nd-y-axis.png"
/>

In the pop-up, click on the Y-axis tab and enable use of the right axis for this
series.

## Conclusion

In summary, we have showed you how to visualize your data by harnessing the
power of Grafana and QuestDB. For more information on QuestDB, please go to our
[documentation page](https://questdb.io/docs/introduction/).
