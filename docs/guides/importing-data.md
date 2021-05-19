---
title: Importing data in bulk via CSV
sidebar_label: Configuring CSV imports
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

```json title="path/to/questdb/conf/text_loader.json"
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

## Examples

Given a CSV file which contains timestamps in the format
`yyyy-MM-dd - HH:mm:ss.SSSUUU`, the following text loader configuration will
provide the correct timestamp parsing:

```json title="path/to/questdb/conf/text_loader.json"
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
