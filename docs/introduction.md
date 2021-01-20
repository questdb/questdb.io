---
title: Introduction
description:
  QuestDB is a relational column-oriented database designed for real-time
  analytics on time series data.
---

QuestDB is a relational column-oriented database designed for real-time
analytics on time series and event data. It uses the SQL language with some
extensions for time series. This documentation will help you to get familiar
with QuestDB.

## Concepts

This section describes the architecture of QuestDB, how it stores and queries
data, and introduces features and capabilities specific to QuestDB.

As a start, we suggest you read about the
[storage model](/docs/concept/storage-model/) and about the
[designated timestamp](/docs/concept/designated-timestamp/). To make the most of
QuestDB, you should also get familiar with our
[SQL extensions](/docs/concept/sql-extensions/) which allow to make the most of
time series capabilities with an efficient non-verbose syntax. You will also
find the [symbol](/docs/concept/symbol/) concept interesting to store and
retrieve repetitive strings efficiently.

## Get started

This section explains how to install and run QuestDB. There are dedicated pages
for [Docker](/docs/get-started/docker/), the
[binaries](/docs/get-started/binaries/) or
[Homebrew](/docs/get-started/homebrew/). Once QuestDB is running you can follow
the guide to [create your first database](/docs/get-started/first-database/).

## Develop

In this section you will learn how to [connect](/docs/develop/connect/) to
QuestDB using popular tools and languages. Importing and/or inserting data are
both covered in the [insert data](/docs/develop/insert-data/) page. Finally, you
can check the [query data](/docs/develop/query-data/) page in order to run your
queries.

## Operations

In this section you will find resources regarding the
[deployment](/docs/operations/deployment/) of QuestDB.

## Reference

This section contains the reference documentation for the following categories:

### APIs

- [REST](/docs/reference/api/rest/)
- [Postgres](/docs/reference/api/postgres/)
- [InfluxDB](/docs/reference/api/influxdb/)
- [Java (embedded)](/docs/reference/api/java-embedded/)

### Clients

- [CLI](/docs/reference/client/cli/)
- [Web Console](/docs/reference/client/web-console/)

### Third-party tools

- [Grafana](/docs/third-party-tools/grafana/)
- [Kafka](/docs/third-party-tools/kafka/)

### Configuration

The [configuration](/docs/reference/configuration/) page shows all the
properties that can be used to customize QuestDB.

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

- [Datatypes](/docs/reference/sql/datatypes/)
- [ALTER TABLE ADD COLUMN](/docs/reference/sql/alter-table-add-column/)
- [ALTER TABLE ALTER COLUMN ADD INDEX](/docs/reference/sql/alter-table-alter-column-add-index/)
- [ALTER TABLE DROP COLUMN](/docs/reference/sql/alter-table-drop-column/)
- [ALTER TABLE DROP PARTITION](/docs/reference/sql/alter-table-drop-partition/)
- [BACKUP](/docs/reference/sql/backup/)
- [CASE](/docs/reference/sql/case/)
- [CAST](/docs/reference/sql/cast/)
- [COPY](/docs/reference/sql/copy/)
- [CREATE TABLE](/docs/reference/sql/create-table/)
- [DISTINCT](/docs/reference/sql/distinct/)
- [EXCEPT INTERSECT](/docs/reference/sql/except-intersect/)
- [FILL](/docs/reference/sql/fill/)
- [DROP](/docs/reference/sql/drop/)
- [GROUP BY](/docs/reference/sql/group-by/)
- [INSERT](/docs/reference/sql/insert/)
- [JOIN](/docs/reference/sql/join/)
- [LATEST BY](/docs/reference/sql/latest-by/)
- [LIMIT](/docs/reference/sql/limit/)
- [ORDER BY](/docs/reference/sql/order-by/)
- [RENAME](/docs/reference/sql/rename/)
- [SAMPLE BY](/docs/reference/sql/sample-by/)
- [SELECT](/docs/reference/sql/select/)
- [SHOW](/docs/reference/sql/show/)
- [TRUNCATE](/docs/reference/sql/truncate/)
- [UNION](/docs/reference/sql/union/)
- [WHERE](/docs/reference/sql/where/)
- [WITH](/docs/reference/sql/with/)

## Support

We are happy to help with any question you may have, particularly to help you
optimize the performance of your application. Feel free to reach out using the
following channels:

- [Raise an issue on GitHub]({@githubUrl@}/issues)
- [Join the Community Slack]({@slackUrl@})
- [QuestDB on Stack Overflow]({@stackoverflowUrl@})
- or send us an email at [hello@questdb.io](mailto:hello@questdb.io)
