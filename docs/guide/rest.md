---
title: How to use the QuestDB REST API
sidebar_label: REST API
description:
  Tutorial showing how to use QuestDB's REST API. It can be used to run queries
  as well as import/export data.
---

QuestDB comes with an HTTP server which exposes a REST API. This guide will
teach you how to use the REST API to create tables, import data, run queries,
and export results with `curl`. If you prefer a more visual approach, you can
also use the [Web Console](/docs/guide/web-console/).

For more information about our REST API, please consult the
[REST API](/docs/api/rest/)

:::note

This requires a running instance of QuestDB with port `9000` exposed. You can
learn how to do so with [Docker](/docs/guide/docker/)

:::

## Get test data

The first step is to get data into the database. Here are some sample files you
may want to try. You may use only one (we provide example queries for both), but
using the two files will allow you to try asof join.

| Data              | Description                                                                                                                                                 | Download                                                                       | File Size | Number of rows |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------- | -------------- |
| **NYC taxi data** | 10 years of NYC taxi trips. Simplified to 2 trips per hour. Contains ride start and end times, distance, passenger count, fare, tip, and total amount paid. | [Download](https://s3-eu-west-1.amazonaws.com/questdb.io/datasets/trips.csv)   | 16.2 Mb   | 183,000        |
| **NYX weather**   | 10 years of hourly weather data in central NYC. 137,000 rows. Contains timestamp, temperature, wind, snow, and more                                         | [Download](https://s3-eu-west-1.amazonaws.com/questdb.io/datasets/weather.csv) | 6.7 Mb    | 137,000        |

## Create tables

With your container running and port 9000 mapped, you can now send curl requests
to the database server. This guide shows examples of how to interact with it.

First, we create the tables using `/exec`, which allows us to pass SQL
statements. We also specify a designated timestamp column which will be useful
for time based queries and time joins across tables.

```questdb-sql title="Create trips table"
curl -G http://localhost:9000/exec --data-urlencode \
"query=CREATE TABLE trips(pickupDatetime timestamp, \
dropoffDatetime timestamp, passengerCount int, tripDistance double, \
fareAmount double, tipAmount double, taxesAndTolls double, totalAmount double) \
timestamp(pickupDatetime);"
```

```questdb-sql title="Create weather table"
curl -G http://localhost:9000/exec --data-urlencode \
"query=CREATE TABLE weather(timestamp timestamp, windSpeed int, \
skyCover symbol, tempF int, rain1H double, snowDepth int) \
timestamp(timestamp);"
```

Note that the table creation step is optional as QuestDB automatically
recognizes schema. However, creating the table manually allows us to specify a
`dedicated timestamp` column which will be useful for time based queries, and to
specify `symbol` which are more efficient than the automatically `string` type
for skyCover.

## Import data

We import both files using the `/imp` endpoint. Note that I set the flag `name`
so the data flows into the tables we just created. Otherwise, the data would be
inserted in a new table named after the file, for example `weather.csv`. We also
set the `timestamp` flag to mark the designated timestamp column in the csv
file.

```questdb-sql title="Populate trips table"
curl -i -F data=@trips.csv \
"http://localhost:9000/imp?\
name=trips&forceHeaders=true&overwrite=false&timestamp=pickupDatetime"
```

```questdb-sql title="Populate weather table"
curl -i -F data=@weather.csv \
"http://localhost:9000/imp?\
name=weather&forceHeaders=true&overwrite=false&timestamp=timestamp"
```

In addition to the csv import, we can also use `exec` to execute INSERT
statements. You can either send all fields or a subset of the schema like in the
example below. This is useful to send values in a different order from the table
definition. It is also useful to skip values when they are not relevant. Missing
values will be inserted as `null`.

```questdb-sql title="Insert using SQL"
curl -G http://localhost:9000/exec --data-urlencode \
"query=INSERT INTO weather(timestamp,tempF) values(systimestamp(),45);"
```

## Run queries

Just like `CREATE TABLE` and `INSERT INTO` statements, we can use `exec` to pass
SQL queries. `exec` returns results in JSON.

```questdb-sql title="Simple query"
curl -G http://localhost:9000/exec --data-urlencode \
"query=select timestamp, tempF from weather limit 2;"
```

```json title="JSON Response"
{
  "query": "select timestamp, tempF from weather limit 2;",
  "columns": [
    {
      "name": "timestamp",
      "type": "TIMESTAMP"
    },
    {
      "name": "tempF",
      "type": "INT"
    }
  ],
  "dataset": [
    ["2010-01-01T00:00:00.000000Z", 34],
    ["2010-01-01T00:51:00.000000Z", 34]
  ],
  "count": 2
}
```

Here are a few example queries you could run against the dataset.

| table             | description                                                                                                 | query                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| trips             | Average week by week trip distance over time                                                                | `select pickupDatetime, avg(tripDistance) from trips timestamp(pickupDatetime) sample by 7d;`        |
| trips             | Average monthly trip duration in minutes                                                                    | `select pickupDatetime, avg(datediff('m',pickupDatetime, dropoffDatetime)) from trips sample by 1M;` |
| trips             | Average fare per passenger count bucket                                                                     | `select passengerCount, avg(tipAmount/fareAmount)*100 from trips order by passengerCount;`           |
| trips             | Average tip percentage per passenger count bucket                                                           | `select passengerCount, avg(tipAmount/fareAmount)*100 from trips order by passengerCount;`           |
| weather           | Rainy days                                                                                                  | `select timestamp, sum(rain1H)from weathersample by 1d;`                                             |
| weather           | Temperature seasonality                                                                                     | `select timestamp, avg(tempF)from weather sample by 7d;`                                             |
| trips and weather | Joining trips and weather data. This query returns the prevailing weather conditions for every trip in 2017 | `trips where pickupDatetime='2017' asof join weather;`                                               |

## Download results

You can use the `/exp` endpoint to export query results as follows.

```questdb-sql title="Save results as csv"
curl -G http://localhost:9000/exp --data-urlencode \
"query=select * from weather limit 100;" > results.csv
```

If you are querying from the Web Console, then you can download the results
using the `download to csv` button.

![Preview of the export function in the Web Console](/img/docs/console/download.gif)

## Shut down and cleanup

As QuestDB is a persisted database, the data will remain after you shut down the
server. If you would like to remove the data, you can run the following
statements to drop the tables.

```questdb-sql title="Cleanup"
DROP TABLE trips;
DROP TABLE weather;
```
