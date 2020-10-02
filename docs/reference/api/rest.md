---
title: REST API
sidebar_label: REST
description: REST API reference documentation.
---

The QuestDB REST API is based on standard HTTP features and is understood by
off-the-shelf HTTP clients. It provides a simple way to interact with QuestDB
and is compatible with most programming languages. API functions are fully keyed
on the URL and they use query parameters as their arguments.

The Web Console is the official Web client relying on the REST API. Find out
more in the section
[using the Web Console](/docs/reference/client/web-console/).

## Available methods

- [`/imp` to import data](#imp---import-data)
- [`/exec` to execute a SQL statement](#exec---execute-queries)
- [`/exp` to export data](#exp---export-data)

## /imp - Import data

`/imp` streams tabular text data directly into a table. It supports CSV, TAB and
pipe (`|`) delimited inputs with optional headers. There are no restrictions on
data size. Data types and structures are detected automatically , without
additional configuration. In some cases, additional configuration can be
provided to improve the automatic detection.

:::note

The structure detection algorithm analyses the chunk in the beginning and relies
on relative uniformity of data. When the first chunk is non-representative of
the rest of the data, automatic imports can yield errors.

:::

### Overview

`/imp` is expecting an HTTP POST request using the Content-Type
multipart/form-data with following query parameters:

| Parameter     | Required | Default          | Description                                                                                                                                                                                                          |
| ------------- | -------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `atomicity`   | No       | `2`              | `0`, `1` or `2`. Behaviour when an error is detected in the data. `0`: the entire file will be skipped. `1`: the row is skipped. `2`: the column is skipped.                                                         |
| `durable`     | No       | `false`          | `true` or `false`. When set to `true`, import will be resilient against OS errors or power losses by forcing the data to be fully persisted before sending a response back to the user.                              |
| `fmt`         | No       | `tabular`        | Can be set to `json` to get the response formatted as such.                                                                                                                                                          |
| `forceHeader` | No       | `false`          | `true` or `false`. When `false`, QuestDB will try to infer if the first line of the file is the header line. When set to `true`, QuestDB will expect that line to be the header line.                                |
| `name`        | No       | Name of the file | Name of the table to create, [see below](/docs/reference/api/rest/#names).                                                                                                                                           |
| `overwrite`   | No       | `false`          | `true` or `false`. When set to true, any existing data or structure will be overwritten.                                                                                                                             |
| `partitionBy` | No       | `NONE`           | See [partitions](/docs/concept/partitions/#properties).                                                                                                                                                              |
| `skipLev`     | No       | `false`          | `true` or `false`. Skip “Line Extra Values”, when set to true, the parser will ignore those extra values rather than ignoring entire line. An extra value is something in addition to what is defined by the header. |
| `timestamp`   | No       |                  | Name of the column that will be used as a [designated timestamp](/docs/concept/designated-timestamp/).                                                                                                               |

The parameters must be URL encoded.

### Names

Table and column names are subject to restrictions, the following list of
characters are automatically removed:

```plain
[space]
.
?
,
:
\
/
\\
\0
)
(
_
+
-
*
~
%
```

When the header row is missing, column names are generated automatically.

### ACID compliance

`/imp` is fully ACID compliant, although Atomicity and Durability can be relaxed
to meet convenience and performance demands.

#### Atomicity

QuestDB is fully insured against any connection problems. If the server detects
closed socket(s), the entire request is rolled back instantly and transparently
for any existing readers. The only time data can be partially imported is when
atomicity is in `relaxed` mode and data cannot be converted to column type. In
this scenario, any "defective" row of data is discarded and `/imp` continues to
stream request data into table.

#### Consistency

This property is guaranteed by consistency of append transactions against
QuestDB storage engine.

#### Isolation

Data is committed to QuestDB storage engine at end of request. Uncommitted
transactions are not visible to readers.

#### Durability

`/imp` streams data from network socket buffer directly into memory mapped
files. At this point data is handed over to the OS and is resilient against
QuestDB internal errors and unlikely but hypothetically possible crashes. This
is default method of appending data and it is chosen for its performance
characteristics. In cases where transaction has to be resilient against OS
errors or power losses physical durability can be enforced. At a cost of append
performance QuestDB storage engine will also guarantee that each memory block is
flushed to physical device.

### Examples

#### Automatic schema detection

The following examples upload `ratings.csv`. This file can be found at
[grouplens.org](https://grouplens.org/datasets/movielens). When column types are
correct, error count will be `0`.

Considering the query:

```shell
curl -F data=@ratings.csv http://localhost:9000/imp
```

The HTTP status code will be set to `200` and the response will be:

```shell
HTTP/1.1 200 OK
Server: questDB/1.0
Date: Fri, 28 Oct 2016 17:58:31 GMT
Transfer-Encoding: chunked
Content-Type: text/plain; charset=utf-8

+-----------------------------------------------------------------------------------+
|      Location:  |               /Users/info/dev/data/db/ratings.csv  |    Errors  |
|   Partition by  |                                              NONE  |            |
+-----------------------------------------------------------------------------------+
|   Rows handled  |                                          22884377  |            |
|  Rows imported  |                                          22884377  |            |
+-----------------------------------------------------------------------------------+
|              0  |                                     userId INT(4)  |         0  |
|              1  |                                    movieId INT(4)  |         0  |
|              2  |                                  rating DOUBLE(8)  |         0  |
|              3  |                                  timestamp INT(4)  |         0  |
+-----------------------------------------------------------------------------------+
```

#### User-defined schema

This example overrides the types of `userId` and `movieId` by including a
`schema` parameter. The schema is passed as a JSON.

Considering the query:

```shell
curl \
  -F schema='[{"name":"userId", "type": "STRING"},{"name":"movieId", "type":"STRING"}]' \
  -F data=@ratings.csv \
  --data-urlencode "overwrite=true" \
  http://localhost:9000/imp
```

The HTTP status code will be set to `200` and the response will be:

```shell
HTTP/1.1 200 OK
Server: questDB/1.0
Date: Sun, 30 Oct 2016 1:20:7 GMT
Transfer-Encoding: chunked
Content-Type: text/plain; charset=utf-8

+-----------------------------------------------------------------------------------+
|      Location:  |               /Users/info/dev/data/db/ratings.csv  |    Errors  |
|   Partition by  |                                              NONE  |            |
+-----------------------------------------------------------------------------------+
|   Rows handled  |                                          22884377  |            |
|  Rows imported  |                                          22884377  |            |
+-----------------------------------------------------------------------------------+
|              0  |                                 userId STRING(16)  |         0  |
|              1  |                                movieId STRING(16)  |         0  |
|              2  |                                  rating DOUBLE(8)  |         0  |
|              3  |                                  timestamp INT(4)  |         0  |
+-----------------------------------------------------------------------------------+
```

## /exec - Execute queries

`/exec` compiles and executes the SQL query supplied as a paratmeter and returns
a JSON response.

:::note

The query execution terminates automatically when the socket connection is
closed.

:::

### Overview

`/exec` is expecting an HTTP GET request with following query parameters:

| Parameter | Required | Default | Description                                                                                                                                                                                                           |
| --------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `count`   | No       | `false` | `true` or `false`. Counts the number of rows and returns this value.                                                                                                                                                  |
| `limit`   | No       |         | Paging parameter. For example, `limit=10,20` will return row numbers 10 thru to 20 inclusive and `limit=20` will return first 20 rows, which is equivalent to `limit=0,20`. `limit=-20` will return the last 20 rows. |
| `nm`      | No       | `false` | `true` or `false`. Skips the metadata section of the response when set to `true`.                                                                                                                                     |
| `query`   | Yes      |         | URL encoded query text. It can be multi-line.                                                                                                                                                                         |
| `timings` | No       | `false` | `true` or `false`. When set to `true`, QuestDB will also include a `timings` property in the response which gives details about the execution.                                                                        |

The parameters must be URL encoded.

### Success response

When successful, the response will be:

```json
{
  "query": string,
  "columns": Array<{ "name": string, "type": string }>
  "dataset": Array<Array<Value for Column1, Value for Column2>>,
  "count": Optional<number>,
  "timings": Optional<{ compiler: number, count: number, execute: number}>
}
```

You can find the exact list of types in the
[dedicated page](/docs/reference/sql/datatypes/).

Considering the query:

```shell
curl -G \
  --data-urlencode "select timestamp, tempF from weather limit 2;" \
  --data-urlencode "count=true" \
  --data-urlencode "limit=5" \
  http://localhost:9000/exp
```

The HTTP status code will be set to `200` and the response will be:

```json
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

### Error response

When there is an error with the query, the response will be:

```json
{
  "query": string,
  "error": string,
  "position": number
}
```

The position is a number of characters from the beginning of query where error
was found.

Considering the query:

```shell
curl -G \
  --data-urlencode "query=select AccidentIndex, Date, Time2 from 'Accidents0514.csv' limit 1" \
  --data-urlencode "limit=5" \
  http://localhost:9000/exp
```

The HTTP status code will be set to `400` and the response will be:

```json
{
  "query": "\nselect AccidentIndex, Date, Time2 from 'Accidents0514.csv' limit 10",
  "error": "Invalid column: Time2",
  "position": 29
}
```

## /exp - Export data

Just like `/exec`, `/exp` allows you to pass url-encoded queries. Instead of
JSON, the results are returned in a tabular form to be saved and reused.

### Overview

`/exp` is expecting an HTTP GET request with following parameters:

| Parameter | Required | Description                                                                                                                                                                                                               |
| --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `limit`   | No       | Paging opp parameter. For example, `limit=10,20` will return row numbers 10 thru to 20 inclusive and `limit=20` will return first 20 rows, which is equivalent to `limit=0,20`. `limit=-20` will return the last 20 rows. |
| `query`   | Yes      | URL encoded query text. It can be multi-line.                                                                                                                                                                             |

The parameters must be URL encoded.

### Success response

Considering the query:

```shell
curl -G \
  --data-urlencode "query=select AccidentIndex2, Date, Time from 'Accidents0514.csv'" \
  --data-urlencode "limit=5" \
  http://localhost:9000/exp
```

The HTTP status code will be set to `200` and the response will be:

```shell
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 9000 (#0)
> GET /exp?query=select%20AccidentIndex%2C%20Date%2C%20Time%20from%20%27Accidents0514.csv%27&limit=5 HTTP/1.1
> Host: localhost:9000
> User-Agent: curl/7.49.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Server: questDB/1.0
< Date: Wed, 9 Nov 2016 17:58:54 GMT
< Transfer-Encoding: chunked
< Content-Type: text/csv; charset=utf-8
< Content-Disposition: attachment; filename="questdb-query-1478714334308.csv"
<
"AccidentIndex","Date","Time"
200501BS00001,"2005-01-04T00:00:00.000Z",17:42
200501BS00002,"2005-01-05T00:00:00.000Z",17:36
200501BS00003,"2005-01-06T00:00:00.000Z",00:15
200501BS00004,"2005-01-07T00:00:00.000Z",10:35
200501BS00005,"2005-01-10T00:00:00.000Z",21:13
* Connection #0 to host localhost left intact
```

### Error response

When a query contains syntax errors, QuestDB will attempt to return as much
diagnostic information as possible.

Considering the query:

```shell
curl -G \
  --data-urlencode "query=select AccidentIndex2, Date, Time from 'Accidents0514.csv'" \
  --data-urlencode "limit=5" \
  http://localhost:9000/exp
```

The HTTP status code will be set to `400` and the response will be:

```shell
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 9000 (#0)
> GET /exp?query=select%20AccidentIndex2%2C%20Date%2C%20Time%20from%20%27Accidents0514.csv%27&limit=5 HTTP/1.1
> Host: localhost:9000
> User-Agent: curl/7.49.1
> Accept: */*
>
< HTTP/1.1 400 Bad request
< Server: questDB/1.0
< Date: Wed, 9 Nov 2016 18:3:55 GMT
< Transfer-Encoding: chunked
< Content-Type: text/csv; charset=utf-8
< Content-Disposition: attachment; filename="questdb-query-1478714635400.csv"
<
<em>Error at(7): Invalid column: AccidentIndex2</em>
* Connection #0 to host localhost left intact
```
