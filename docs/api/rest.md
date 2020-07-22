---
title: REST API
sidebar_label: REST
---

The QuestDB REST API is based around standard HTTP features and is understood by
off-the-shelf HTTP clients. It provides a simple way to interact with QuestDB
and is compatible with most programming languages. API functions are fully keyed
on the URL and they use query parameters as their arguments.

Responses are function specific, for example you can download query results as
CSV files, directly from the API. You can also get JSON responses.

The REST API can be accessed interactively using Web Console that is a part of
QuestDB distribution. Find out more in the section
[using the Web Console](guide/web-console.md).

:::tip

Other machines on your network can access the console and the REST API on
`http://IP_OF_THE_HOST_MACHINE:9000`

:::

:::note

All strings need to be passed as url-encoded, for example by using
`--data-urlencode`

:::

## Available methods

- [`/imp` to load data](#imp---loading-data)
- [`/exec` to query data](#exec---querying-data)
- [`/exp` to export data](#exp---export-data)
- `/chk`

## /imp - Loading data

The function `/imp` streams tabular text data directly into a table. It supports
CSV, TAB and Pipe (`|`) delimited inputs and optional headers. There are no
restrictions on data size. Data type and structure is detected automatically and
usually without additional configuration. However in some cases additional
configuration can be provided to augment automatic detection results.

:::note

The structure detection algorithm analyses the chunk in the beginning and relies
on relative uniformity of data. When the first chunk is non-representative of
the rest of the data, automatic imports can yield errors.

:::

`/imp` column names from header row as table columns. The following characters
are removed from column names:

```java
     [space] _  ?  .  ,  \  \  \\  /  \0  :  )  (  +  -  *  %  ~
```

When a header row is missing, column names are generated automatically.

### ACID Compliance

`/imp` is fully ACID compliant, although Atomicity and Durability can be relaxed
to meet convenience and performance demands.

**Atomicity** is fully insured against any connection problems. If server
detects closed socket the entire request is rolled back instantly and
transparently for any existing readers. The only time data can be partially
imported is when atomicity is in <code>relaxed</code> mode and data cannot be
converted to column type. In this scenario "defective" row of data is discarded
and <code>/imp</code> continues to stream request data into table.

**Consistency** is guaranteed by consistency of append transactions against
QuestDB storage engine.

**Isolation** Data is committed to QuestDB storage engine at end of request.
Uncommitted transactions are not visible to readers.

**Durability** `/imp` streams data from network socket buffer directly into
memory mapped files. At this point data is handed over to the OS and is
resilient against QuestDB internal errors and unlikely but hypothetically
possible crashes. This is default method of appending data and it is chosen for
its performance characteristics. In cases where transaction has to be resilient
against OS errors or power losses physical durability can be enforced. At a cost
of append performance QuestDB storage engine will also guarantee that each
memory block is flushed to physical device.

### Examples

The following examples upload ratings.csv, which can be found
[here](https://grouplens.org/datasets/movielens/) Response shows table name,
columns, types, error count in each column and total rows. When column types are
correct error count must be zero.

```script title="Import from file, automatic schema detection"
curl -i -F data=@ratings.csv http://localhost:9000/imp
```

```script title="Response"
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

JSON response for the same request would be:

```json title="JSON response"
{
  "status": "OK",
  "location": "ratings.csv",
  "rowsRejected": 0,
  "rowsImported": 22884377,
  "columns": [
    {
      "name": "userId",
      "type": "INT",
      "size": 4,
      "errors": 0
    },
    {
      "name": "movieId",
      "type": "INT",
      "size": 4,
      "errors": 0
    },
    {
      "name": "rating",
      "type": "DOUBLE",
      "size": 8,
      "errors": 0
    },
    {
      "name": "timestamp",
      "type": "INT",
      "size": 4,
      "errors": 0
    }
  ]
}
```

### Import with user-defined schema

This example overrides types of `userId` and `movieId` by including `schema`
parameter. Schema is passed as a `JSON object`.

```script title="Import with custom schema"
curl -i \
-F schema='[{"name":"userId", "type": "STRING"},{"name":"movieId", "type":"STRING"}]' \
-F data=@ratings.csv \
http://localhost:9000/imp
```

```script title="Response"
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

### Import with multiple options

This example shows the concatenation of several import parameters

```script title="Using multiple options"
curl -i \
-F data=@ratings.csv \
'http://localhost:9000/imp?forceHeaders=true&overwrite=true'
```

## /exec - Querying Data

`/exec` compiles and executes the SQL query supplied as an argument and returns
a JSON object with either data or an error. The **error object** contains
message and position in query text. Position is a number of characters from
beginning of query where error occurred.

The result of a successful execution is a **JSON object** containing an array of
data rows. Each data row is array of column values. The dataset metadata is
returned in `columns` field - list of column names and their types.

Query execution terminates automatically when the socket connection is closed.

### Syntax

`/exec` is HTTP GET request with following query arguments:

| Argument                    | Remarks                                                                                                                                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `query` (required)          | `URL-encoded` query text. It can be multi-line                                                                                                                                                                       |
| `limit` (optional)          | Paging argument. For example, `limit=10,20` will return row numbers 10 thru to 20 inclusive.and `limit=20` will return first 20 rows, which is equivalent to `limit=0,20`. `limit=-20` will return the last 20 rows. |
| `count` (optional, boolean) | Counts the number of rows and returns this value in the message header. Default value is `false`.                                                                                                                    |
| `nm` (optional, boolean)    | Skips the metadata section of the response when set to `true`. Default value is `false`                                                                                                                              |

The following will use `curl` to send a query over http. The result will be sent
back over HTTP.

:::note

The `query` text must be URL-encoded.

:::

```script
curl -v \
-G http://localhost:9000/exp \
--data-urlencode "query=select * from mydb;" -d limit=5
```

### Success Response

This is an example of successful query execution response. HTTP status code
`200`.

```json title="JSON response - success"
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

Example of error response. HTTP status code `400` is used for query errors and
`500` for internal server errors, which should not normally occur.

```json title="JSON response - error"
{
  "query": "\nselect AccidentIndex, Date, Time2 from 'Accidents0514.csv' limit 10",
  "error": "Invalid column: Time2",
  "position": 29
}
```

## /exp - Export Data

Just like `/exec`, `/exp` allows you to pass url-encoded queries. Instead of a
json, the results are returned in tabular form to be saved into a file such as
`.csv`

Server responds with HTTP `200` when query execution is successful and `400`
when there is error and returns error text.

### Syntax

`/exp` is HTTP GET request with following query arguments: |Argument | Remarks |
|---|---| |`query` (required) |`URL-encoded` query text. It can be multi-line |
| `limit` (optional) | Paging argument. For example, `limit=10,20` will return
row numbers 10 thru to 20 inclusive.and `limit=20` will return first 20 rows,
which is equivalent to `limit=0,20`. `limit=-20` will return the last 20 rows.|

### Success response

Below is example of exporting data from command line using `curl`

```script
curl -v -G http://localhost:9000/exp \
    --data-urlencode "query=select AccidentIndex2, Date, Time from 'Accidents0514.csv'" \
    -d limit=5
```

```script title="Success response"
*   Trying ::1...
* connect to ::1 port 9000 failed: Connection refused
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

When query contains syntax errors `/exp` attempts to return as much diagnostic
information as possible. Example erroneous request:

```script title="Error response"
curl -v -G http://localhost:9000/exp \
    --data-urlencode "query=select AccidentIndex2, Date, Time from 'Accidents0514.csv'" \
    -d limit=5
```

Response:

```script
*   Trying ::1...
* connect to ::1 port 9000 failed: Connection refused
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
