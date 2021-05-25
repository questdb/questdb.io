---
title: Importing data in bulk via CSV
sidebar_label: Bulk CSV imports
description:
  This document describes how to load CSV data and specify text loader
  configuration for timestamp and date parsing
---

The REST API provides an `/imp` endpoint exposed on port `9000` by default. This
endpoint streams tabular text data directly into a table, supporting CSV, TAB
and pipe (`|`) delimited inputs with optional headers. Data types and structures
are detected automatically, but additional configuration can be provided to
improve automatic detection.

## Text loader configuration

QuestDB uses a `text_loader.json` configuration file which can be placed in the
server's `conf` directory. This file does not exist by default, but has the
following implicit settings:

```json title="conf/text_loader.json"
{
  "date": [
    {
      "format": "dd/MM/y"
    },
    {
      "format": "yyyy-MM-dd HH:mm:ss"
    },
    {
      "format": "yyyy-MM-ddTHH:mm:ss.SSSz",
      "locale": "en-US",
      "utf8": false
    },
    {
      "format": "MM/dd/y"
    }
  ],
  "timestamp": [
    {
      "format": "yyyy-MM-ddTHH:mm:ss.SSSUUUz",
      "utf8": false
    }
  ]
}
```

### Example

Given a CSV file which contains timestamps in the format
`yyyy-MM-dd - HH:mm:ss.SSSUUU`, the following text loader configuration will
provide the correct timestamp parsing:

```json title="conf/text_loader.json"
{
  "date": [
    {
      "format": "dd/MM/y"
    },
    {
      "format": "yyyy-MM-dd HH:mm:ss"
    },
    {
      "format": "yyyy-MM-ddTHH:mm:ss.SSSz",
      "locale": "en-US",
      "utf8": false
    },
    {
      "format": "MM/dd/y"
    }
  ],
  "timestamp": [
    {
      "format": "yyyy-MM-ddTHH:mm:ss.SSSUUUz",
      "utf8": false
    },
    {
      "format": "yyyy-MM-dd - HH:mm:ss.SSSUUU",
      "utf8": false
    }
  ]
}
```

The CSV data can then be loaded via POST request, for example, using cURL:

```curl
curl -F data=@weather.csv 'http://localhost:9000/imp'
```

For more information on the `/imp` entry point, refer to the
[REST API documentation](/docs/reference/api/rest/#imp---import-data).

## Large datasets with out-of-order data

Using the `lag` and `batch` size parameters during `INSERT AS SELECT` statements
is a convenient strategy to load and order large datasets from CSV in bulk when
they contain out-of-order data.

The batch size specifies how many records to attempt to bulk insert at one time
and the **lag** allows for specifying the expected lateness of out-of-order
timestamp values (in microseconds):

```questdb-sql
INSERT batch 100000 lag 180000000 INTO my_table
SELECT * FROM unordered_table
```

### Example

Given a large dataset `weather-unordered.csv` with out-of-order records, an
ordered table may be created using the following steps:

1. Import the unordered dataset
   [via the Web Console](/docs/reference/web-console/#import). The REST API may
   also be used for the same operation:

   ```shell title="Importing unordered CSV data via curl"
   curl -F data=@weather-unordered.csv 'http://localhost:9000/imp'
   ```

2. Create a table with the schema of the imported data and apply a partitioning
   strategy. Records are not yet inserted due to the use of `WHERE 1 != 1`. The
   `timestamp` column may be cast as a `timestamp` if the import did not
   automatically detect the correct format:

   ```questdb-sql
   CREATE TABLE weather AS (
   SELECT
     cast(timestamp AS timestamp) timestamp,
     windDir,
     windSpeed,
     windGust,
     rain1H,
     rain6H,
     rain24H
   FROM 'weather-unordered.csv' WHERE 1 != 1
   ) timestamp(timestamp) PARTITION BY DAY;
   ```

3. Insert the unordered records into the partitioned table and provide a `lag`
   and `batch` size:

   ```questdb-sql
   INSERT batch 100000 lag 180000000 INTO weather
   SELECT
     cast(timestamp AS timestamp) timestamp,
     windDir,
     windSpeed,
     windGust,
     rain1H,
     rain6H,
     rain24H
   FROM 'weather-unordered.csv';
   ```

To confirm that the table is ordered, the `isOrdered()` function may be used:

```questdb-sql
select isOrdered(timestamp) from weather
```

| isOrdered |
| --------- |
| true      |

More information about the use of `isOrdered()` can be found on the
[boolean functions documentation](/docs/reference/function/boolean/).
