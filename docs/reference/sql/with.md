---
title: WITH keyword
sidebar_label: WITH
description: WITH SQL keyword reference documentation.
---

Name one or several sub-queries to be used within the main query.

This clause makes it easy to simplify large or complex statements which involve
sub-queries, particularly when such sub-queries are used several times.

## Syntax

![Flow chart showing the syntax of the WITH clause](/img/docs/diagrams/with.svg)

Where:

- `subQueryName` is the alias for the sub-query
- `subQuery` is a SQL query (e.g `SELECT * FROM table`)
- `mainQuery` is the main SQL query which involves the `subQuery` using its
  alias.

## Examples

```questdb-sql title="Single alias"
WITH first_10_users AS (SELECT * FROM users limit 10)
SELECT user_name FROM first_10_users;
```

```questdb-sql title="Using recursively"
WITH first_10_users AS (SELECT * FROM users limit 10),
first_5_users AS (SELECT * FROM first_10_users limit 5)
SELECT user_name FROM first_5_users;
```

```questdb-sql title="Flag whether individual trips are longer or shorter than average"
WITH avg_distance AS (select avg(trip_distance) average FROM trips)
SELECT pickup_datetime, trips.trip_distance > avg_distance.average longer_than_average
FROM trips CROSS JOIN avg_distance;
```
