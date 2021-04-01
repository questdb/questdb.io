---
title: Create my first database
description:
  Guide showing how to insert, query and delete rows in the context of time
  series data.
---

The goal of this guide is to explore QuestDB's features to interact with time
series data. This assumes you have an instance running. You can find guides to
setup QuestDB on the [introduction page](/docs/introduction/).

In this tutorial, you will learn how to

- [Create tables](#creating-a-table)
- [Populate tables with sample data](#inserting-data)
- [Run simple and advanced queries](#running-queries)
- [Delete tables](#deleting-tables)

As an example, we will look at hypothetical temperature readings from a variety
of sensors.

:::info

All commands are run through the [Web Console](/docs/reference/web-console/)
accessible at http://localhost:9000.

You can also run the same SQL via the
[Postgres endpoint](/docs/reference/api/postgres/) or the
[REST API](/docs/reference/api/rest/).

:::

## Creating a table

The first step is to create tables. One will contain the metadata of our
sensors, the other will contain the readings from these sensors.

Let's start by creating the `sensors` table:

```questdb-sql
CREATE TABLE sensors (ID LONG, make STRING, city STRING);
```

For more information about this statement, please refer to the
[CREATE TABLE](/docs/reference/sql/create-table/) reference documentation.

## Inserting data

Let's populate our `sensors` table with procedurally-generated data:

```questdb-sql title="Insert as select"
INSERT INTO sensors
    SELECT
        x ID, --increasing integer
        rnd_str('Eberle', 'Honeywell', 'Omron', 'United Automation', 'RS Pro') make,
        rnd_str('New York', 'Miami', 'Boston', 'Chicago', 'San Francisco') city
    FROM long_sequence(10000) x
;
```

For more information about this statement, please refer to the
[INSERT](/docs/reference/sql/insert/) reference documentation. About the
functions, please refer to the
[random generator](/docs/reference/function/random-value-generator/) and the
[row generator](/docs/reference/function/row-generator/) pages.

Our `sensors` table now contains 10,000 randomly generated sensor values of
different makes and in various cities. It should look like the table below:

| ID  | make              | city     |
| --- | ----------------- | -------- |
| 1   | RS Pro            | New York |
| 2   | Honeywell         | Chicago  |
| 3   | United Automation | Miami    |
| 4   | Honeywell         | Chicago  |
| ... | ...               | ...      |

Let's now create some sensor readings. In this case, we will create the table
and generate the data at the same time:

```questdb-sql title="Create table as"
CREATE TABLE readings
AS(
    SELECT
        x ID,
        timestamp_sequence(to_timestamp('2019-10-17T00:00:00', 'yyyy-MM-ddTHH:mm:ss'), rnd_long(1,10,2) * 100000L) ts,
        rnd_double(0)*8 + 15 temp,
        rnd_long(0, 10000, 0) sensorId
    FROM long_sequence(10000000) x)
TIMESTAMP(ts)
PARTITION BY MONTH;
```

The query above demonstrates how to use the following features:

- `TIMESTAMP(ts)` elects the `ts` column as a
  [designated timestamp](/docs/concept/designated-timestamp/). This enables
  partitioning tables by time.
- `PARTITION BY MONTH` creates a monthly partitioning strategy where the stored
  data is effectively sharded by month.

The generated data will look like the following:

| ID  | ts                          | temp        | sensorId |
| --- | --------------------------- | ----------- | -------- |
| 1   | 2019-10-17T00:00:00.000000Z | 19.37373911 | 9160     |
| 2   | 2019-10-17T00:00:00.600000Z | 21.91184617 | 9671     |
| 3   | 2019-10-17T00:00:01.400000Z | 16.58367834 | 8731     |
| 4   | 2019-10-17T00:00:01.500000Z | 16.69308815 | 3447     |
| 5   | 2019-10-17T00:00:01.600000Z | 19.67991569 | 7985     |
| ... | ...                         | ...         | ...      |

## Running queries

Let's select all records from the `readings` table (note that `SELECT * FROM` is
optional in QuestDB):

```questdb-sql
readings;
```

Let's also select the `count` of records from `readings`:

```questdb-sql
SELECT count() FROM readings;
```

| count      |
| ---------- |
| 10,000,000 |

and the average reading:

```questdb-sql
SELECT avg(temp) FROM readings;
```

| average         |
| --------------- |
| 18.999217780895 |

We can now leverage our `sensors` table to get more interesting data:

```questdb-sql
SELECT *
FROM readings
JOIN(
    SELECT ID sensId, make, city
    FROM sensors)
ON readings.sensorId = sensId;
```

The results should look like the table below:

| ID  | ts                          | temp            | sensorId | sensId | make      | city          |
| --- | --------------------------- | --------------- | -------- | ------ | --------- | ------------- |
| 1   | 2019-10-17T00:00:00.000000Z | 16.472200460982 | 3211     | 3211   | Omron     | New York      |
| 2   | 2019-10-17T00:00:00.100000Z | 16.598432033599 | 2319     | 2319   | Honeywell | San Francisco |
| 3   | 2019-10-17T00:00:00.100000Z | 20.293681747009 | 8723     | 8723   | Honeywell | New York      |
| 4   | 2019-10-17T00:00:00.100000Z | 20.939263119843 | 885      | 885    | RS Pro    | San Francisco |
| 5   | 2019-10-17T00:00:00.200000Z | 19.336660059029 | 3200     | 3200   | Honeywell | San Francisco |
| 6   | 2019-10-17T00:00:01.100000Z | 20.946643576954 | 4053     | 4053   | Honeywell | Miami         |

```questdb-sql title="Aggregation keyed by city"
SELECT city, max(temp)
FROM readings
JOIN(
    SELECT ID sensId, city
    FROM sensors) a
ON readings.sensorId = a.sensId;
```

The results should look like the table below:

| city          | max             |
| ------------- | --------------- |
| New York      | 22.999998786398 |
| San Francisco | 22.999998138348 |
| Miami         | 22.99999994818  |
| Chicago       | 22.999991705861 |
| Boston        | 22.999999233377 |

```questdb-sql title="Aggregation by hourly time buckets"
SELECT ts, city, make, avg(temp)
FROM readings timestamp(ts)
JOIN
    (SELECT ID sensId, city, make
    FROM sensors
    WHERE city='Miami' AND make='Omron') a
ON readings.sensorId = a.sensId
WHERE ts ='2019-10-21;1d' -- this is an interval between 21-10 and 1 day later
```

The results should look like the table below:

| ts                          | city  | make  | average         |
| --------------------------- | ----- | ----- | --------------- |
| 2019-10-21T00:00:44.600000Z | Miami | Omron | 20.004285872098 |
| 2019-10-21T00:00:52.400000Z | Miami | Omron | 16.68436714013  |
| 2019-10-21T00:01:05.400000Z | Miami | Omron | 15.243684089291 |
| 2019-10-21T00:01:06.100000Z | Miami | Omron | 17.193984104315 |
| 2019-10-21T00:01:07.100000Z | Miami | Omron | 20.778686822666 |
| ...                         | ...   | ...   | ...             |

For more information about these statements, please refer to the
[SELECT](/docs/reference/sql/select/) and [JOIN](/docs/reference/sql/join/)
pages.

## Deleting tables

Upon dropping the table, all data is deleted:

```questdb-sql
DROP TABLE readings;
DROP TABLE sensors;
```
