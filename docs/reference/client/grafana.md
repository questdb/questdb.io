---
title: Grafana
description: Grafana/QuestDB setup reference documentation.
---

Grafana allows to visualize QuestDB data

1. Open Grafana's UI by visiting http://localhost:3000
2. Go to the Configuration section and click on Data Sources.
3. Click Add data source
4. Choose PostgreSQL plugin and configure it with the following settings
```
host:localhost:8812
database:qdb
user:admin
password:quest
SSL mode:disable
```
5. When adding a panel, use the “text edit mode” by clicking on the pencil icon and add your query.

### Grafana functions
`$__timeFilter(timestamp)` This function tells Grafana to send the
start-time and end-time defined in the dashboard to the QuestDB server. Grafana 
translates this to: timestamp BETWEEN '2018-02-01T00:00:00Z' AND '2018-02-28T23:59:59Z'.

`$__interval` This function calculates a dynamic interval based on the time range applied 
to the dashboard. By using this function, the sampling interval changes automatically
as the user zooms in and out of the panel.

### Example query

```
SELECT pickup_datetime AS time,
       avg(trip_distance) AS distance
FROM taxi_trips
WHERE
$__timeFilter(pickup_datetime)
SAMPLE BY $__interval
```
