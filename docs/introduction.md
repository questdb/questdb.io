---
title: Introduction
description:
  QuestDB is a relational column-oriented database designed for real-time
  analytics on time series data.
---

QuestDB is a relational column-oriented database designed for time series and
event data. It uses SQL with extensions for time series to assist with real-time
analytics. These pages cover core concepts of QuestDB, including setup steps,
usage guides, and reference documentation for syntax, APIs and configuration.

## Concepts

This section describes the architecture of QuestDB, how it stores and queries
data, and introduces features and capabilities unique to the system.

- [Designated timestamp](/docs/concept/designated-timestamp/) is a core feature
  that enables time-oriented language capabilities and partitioning
- [Symbol](/docs/concept/symbol/) type makes storing and retrieving repetitive
  strings efficient
- [Storage model](/docs/concept/storage-model/) describes how QuestDB stores
  records and partitions within tables
- [Indexes](/docs/concept/indexes/) can be used for faster read access on
  specific columns
- [Partitions](/docs/concept/partitions/) can be used for significant
  performance benefits on calculations and queries
- [SQL extensions](/docs/concept/sql-extensions/) allow performant time series
  analysis with a concise syntax
- [Root directory](/docs/concept/root-directory-structure/) describes the
  directory contents of QuestDB for storage and configuration

## Get started

This section explains how to install and run QuestDB using one of the following
methods:

- [Docker](/docs/get-started/docker/) for repeatable, portable and scalable
  installations
- [Binaries](/docs/get-started/binaries/) for direct downloads to run on Linux,
  macOS or Windows
- [Homebrew](/docs/get-started/homebrew/) for running QuestDB on macOS

Once QuestDB is running, a guide is provided to
[create your first database](/docs/get-started/first-database/).

## Develop

This section describes how to connect to QuestDB using a variety of tools and
programming languages.

- [Connect](/docs/develop/connect/) using Postgres or InfluxDB clients in a
  variety of languages
- [Insert data](/docs/develop/insert-data/) from popular languages using
  Postgres clients or InfluxDB line protocol, or in bulk via REST API
- [Query data](/docs/develop/query-data/) using Postgres clients, REST API, or
  the Web Console
- [Authenticate](/docs/develop/authenticate/) via an additional step before
  inserting records using InfluxDB line protocol

## Third-party tools

This section describes how to integrate QuestDB with third-party tools and
utilities for collecting metrics and visualizing data:

- [Grafana](/docs/third-party-tools/grafana/) instructions for connecting
  QuestDB as a datasource for building visualizations and dashboards
- [Kafka](/docs/third-party-tools/kafka/) guide for ingesting data from topics
  into QuestDB by means of Kafka Connect
- [Telegraf](/docs/third-party-tools/telegraf/) guide for collecting system
  metrics, specifying QuestDB as an output and visualizing the results

## Operations

This section contains resources for managing QuestDB instances and has dedicated
pages for the following topics:

- [Capacity planning](/docs/operations/capacity-planning/) for configuring
  server settings and system resources for common scenarios and edge cases
- [Deployment](/docs/operations/deployment/) details with information for
  running locally, on Kubernetes or the AWS AMI
- [Data retention](/docs/operations/data-retention/) strategy to delete old data
  and save disk space
- [Health monitoring](/docs/operations/health-monitoring/) endpoint for
  determining the status of the instance

## Reference

This section contains the reference documentation for the following categories:

### APIs

- [REST](/docs/reference/api/rest/)
- [Postgres](/docs/reference/api/postgres/)
- [InfluxDB](/docs/reference/api/influxdb/)
- [Java (embedded)](/docs/reference/api/java-embedded/)

### Configuration

The [configuration](/docs/reference/configuration/) page shows all the
properties that can be used to customize QuestDB.

### Command-line options

The following resource provides info on options that may be passed to QuestDB
when starting services:

- [Command-line options](/docs/reference/command-line-options/) for starting and
  running QuestDB from an executable

### Functions

- [Aggregation](/docs/reference/function/aggregation/)
- [Date time](/docs/reference/function/date-time/)
- [Meta](/docs/reference/function/meta/)
- [Numeric](/docs/reference/function/numeric/)
- [Random value generator](/docs/reference/function/random-value-generator/)
- [Row generator](/docs/reference/function/row-generator/)
- [Text](/docs/reference/function/text/)
- [Timestamp generator](/docs/reference/function/timestamp-generator/)
- [Timestamp](/docs/reference/function/timestamp/)

### SQL

- [SQL Execution order](/docs/reference/sql/datatypes/)
- [Data types](/docs/reference/sql/datatypes/)
- [ALTER TABLE ADD COLUMN](/docs/reference/sql/alter-table-add-column/)
- [ALTER TABLE ALTER COLUMN ADD INDEX](/docs/reference/sql/alter-table-alter-column-add-index/)
- [ALTER TABLE DROP COLUMN](/docs/reference/sql/alter-table-drop-column/)
- [ALTER TABLE ATTACH PARTITION](/docs/reference/sql/alter-table-attach-partition/)
- [ALTER TABLE DROP PARTITION](/docs/reference/sql/alter-table-drop-partition/)
- [BACKUP](/docs/reference/sql/backup/)
- [CASE](/docs/reference/sql/case/)
- [CAST](/docs/reference/sql/cast/)
- [COPY](/docs/reference/sql/copy/)
- [CREATE TABLE](/docs/reference/sql/create-table/)
- [DISTINCT](/docs/reference/sql/distinct/)
- [EXCEPT INTERSECT](/docs/reference/sql/except-intersect/)
- [FILL](/docs/reference/sql/fill/)
- [DROP TABLE](/docs/reference/sql/drop/)
- [GROUP BY](/docs/reference/sql/group-by/)
- [INSERT](/docs/reference/sql/insert/)
- [JOIN](/docs/reference/sql/join/)
- [LATEST BY](/docs/reference/sql/latest-by/)
- [LIMIT](/docs/reference/sql/limit/)
- [ORDER BY](/docs/reference/sql/order-by/)
- [RENAME TABLE](/docs/reference/sql/rename/)
- [SAMPLE BY](/docs/reference/sql/sample-by/)
- [SELECT](/docs/reference/sql/select/)
- [SHOW](/docs/reference/sql/show/)
- [TRUNCATE TABLE](/docs/reference/sql/truncate/)
- [UNION](/docs/reference/sql/union/)
- [WHERE](/docs/reference/sql/where/)
- [WITH](/docs/reference/sql/with/)

### Web console

QuestDB is bundled with a user interface which runs by default on port 9000. The
following is reference documentation which describes how to use this UI:

- [Web console](/docs/reference/web-console/) reference for using the bundled UI

## Support

We are happy to help with any question you may have, particularly to help you
optimize the performance of your application. Feel free to reach out using the
following channels:

- [Raise an issue on GitHub]({@githubUrl@}/issues)
- [Join the Community Slack]({@slackUrl@})
- [QuestDB on Stack Overflow]({@stackoverflowUrl@})
- or send us an email at [hello@questdb.io](mailto:hello@questdb.io)
