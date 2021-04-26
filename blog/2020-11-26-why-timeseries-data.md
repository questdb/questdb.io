---
title:
  What is time-series data, and why are we building a time-series database
  (TSDB)?
author: Nicolas Hourcard
author_title: QuestDB Team
author_url: https://github.com/tris0laris
author_image_url: https://avatars.githubusercontent.com/tris0laris
description:
  A primer on time-series data and time-series databases (TSDB), and why we
  decided to build QuestDB
image: /img/blog/2020-11-26/banner.jpg
tags: [story]
---

import Banner from "@theme/Banner"

<Banner
  alt="An open lock with its key attached to it."
  height={433}
  src="/img/blog/2020-11-26/banner.jpg"
  width={650}
>
  Photo by <a href="https://unsplash.com/photos/uCMKx2H1Y38">AbsolutVision</a>{" "}
  on <a href="https://unsplash.com">Unsplash</a>
</Banner>

Like all good superheroes, every company has its own origin story explaining why
they were created and how they grew over time. This article covers the origin
story of QuestDB and frames it with an introduction to time series databases to
show where we sit in that landscape today.

<!--truncate-->

## Part I: Time series data and characteristics of TSDBs

### Time-series data explained

Time series is a succession of data points ordered by time. These data points
could be a succession of events from an application’s users, the state of CPU
and memory usage over time, financial trades recorded every microsecond, or
sensors from a car emitting data about the vehicle acceleration and velocity.

For that reason, time-series is synonymous with large amounts of data. Unlike
traditional databases in which older data entries are typically updated with the
most recent data point to show the latest state, time-series databases (“TSDB”)
continuously accumulate data points over time. This way, one can draw insights
from the evolution of metrics over time to conclude meaningful insights from the
data. Better yet is to predict future events through machine learning models
based on historical time-series analysis.

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="AAPL stock price over the last 5 years"
  height={284}
  src="/img/blog/2020-11-26/apple.png"
  title="Apple’s share price (daily) over the last 5 years: time-series data!"
  width={650}
/>

Time series databases were successfully adopted for use in financial
applications (the world QuestDB’s team comes from) where storing and querying
changes in stock, price, quantities and transactions over time is
business-critical. With the rise in the number of connected devices, application
monitoring and observability, time series data is proving to be critical in
nearly all fields.

<Screenshot
  alt="Example of time-series data use cases"
  height={327}
  src="/img/blog/2020-11-26/useCases.png"
  title="Time-series data use cases"
  width={650}
/>

As a result, time series has been the fastest growing database category for the
past two years according to
[DB-engines](https://db-engines.com/de/ranking/time+series+dbms).

<Screenshot
  alt="Chart showing the popularity of time-series databases over the last 2 years - the data is from db-engines.com"
  height={290}
  src="/img/blog/2020-11-26/popularity.png"
  title="Popularity by database category"
  width={650}
/>

### Performance is the pillar of a time-series database

As use cases which generate data suitable for time series analysis are
increasing exponentially, so is the amount of raw data itself. This means that
TSDBs must be designed to handle exceptionally large volumes, specifically,
performant ingestion (WRITE operations) is a cornerstone feature.

Time-series data is typically found in very demanding enterprise use cases where
requirements for ingesting data are usually around a million data points per
second. The ability to deal with multiple sources of data is also paramount.

For example, stock market events occurring on a microsecond (and nanosecond)
frequency, or thousands of IoT sensors sending atmospheric data continuously
from an offshore oil & gas rig. Most importantly, enterprises expect databases
to handle bursts of data which are high volumes of data incoming at irregular
intervals. This is very common in financial markets, with spikes of trading
volume occurring after events which are difficult to predict.

Once all of the data is stored into a database, most use cases require to query
(READ operations) this data in real-time. Operations teams will need to see
relevant metrics that show the state of application servers as soon as an
anomaly is found. E-commerce websites need to analyze immense datasets of
buyers’ behavior over time to gather new insights and optimize their stock in
consequence. A fintech company will want to detect fraud as transactions occur.

### TSDBs most important features and trade-offs

TSDBs are not optimized for OLTP workloads that typically include lots of
regular updates and delete operations. Those are better handled by relational
databases such as PostgreSQL, MySQL, SQL Server or Oracle.

In contrast, time-series data is mostly an append-only workload with delete
operations performed in batches on less recent data. Typically, users are
concerned the most about the recent data coming in that is being analyzed on the
fly. We list some of the most interesting features of a time-series database.
Further, we summarise how QuestDB addresses those needs.

- **Downsampling**

  Representing the data with a lower frequency. For example, shifting from a
  daily view to a monthly view. This is typically done on the fly on a dashboard
  and requires very fast aggregation functions to be computed live. In order to
  facilitate such queries, QuestDB built a native extension to ANSI SQL with the
  function [SAMPLE BY](/docs/reference/sql/sample-by/#examples). Note: our
  [Grafana tutorial](/tutorial/2020/10/19/grafana) shows downsampling examples.

- **Interval search**

  Fast retrieving data over arbitrary intervals. For example, zooming into a
  specific timeframe preceding a monitoring alert to better understand the
  underlying cause in real-time. QuestDB’s
  [WHERE](/docs/reference/sql/where#symbol-and-string) clause for timestamp
  search is fast and efficient but requires a designated timestamp.

- **Time series joins**

  Align join time-series data from two different tables, which do not have
  exactly matching timestamps. QuestDB supports
  [ASOF](/docs/reference/sql/join/#asof-join) joins. QuestDB’s SQL query to
  match two tables (“bid” and “asks”) with unequal timestamps would look like:

  <Screenshot
    alt="Example of an ASOF join query"
    height={85}
    src="/img/blog/2020-11-26/asof.png"
    title="Example of ASOF join query between the tables Bid and Ask"
    width={620}
  />

- **Automated partitioning management**

  Time partitions created automatically as data arrives. In QuestDB, data is
  stored in columns and partitioned by time. This makes it possible to access
  one specific column for a given time partition instead of lifting the entire
  table in memory, which is a computationally very intensive operation. We see
  this as a prerequisite for fast and efficient READS.

- **Time-series ingestion protocols**

  Being able to ingest unstructured time-series data succinctly is a must.
  QuestDB supports the
  [InfluxDB line protocol](/tutorial/2020/07/22/influxdb-lp-on-tcp) that is the
  industry standard for observability use cases, with the ability to create new
  columns on the fly without specifying a schema ahead of time.

- **Most recent first**

  With time-series data, the most recent data is often more likely to be
  analyzed. Databases should be able to pull the latest record very fast,
  easily. QuestDB’s SQL language extension includes
  [LATEST BY](/docs/reference/sql/latest-by/#examples) to get the most recent
  view of a record instantly. As data is ingested in chronological order,
  QuestDB starts scanning from the bottom and can thus retrieve the data point
  very quickly.

## Part 2: Why we set out to build QuestDB

### When it all started 7 years ago

Our CTO worked in electronic trading, building systems for more than 10 years.
In 2013, his boss would not allow him to use the only high-performance database
suited to deal with time-series data because of its proprietary nature and
price.

QuestDB was built with the intention of democratizing the performance that was
only available for high-end enterprise applications, and to make the tooling
available for every developer around the world leveraging an open source
distribution model. Instead of writing a new querying language from scratch,
QuestDB would facilitate adoption and accessibility via SQL rather than a new
complex proprietary language.

We have heard a large number of companies complaining about the performance
limitations of open source time-series databases. Most of those re-use existing
libraries or are an extension of a well-known database which was not designed to
process time-series data efficiently in the first place.

Instead, we chose an alternative route which took more than 7 years of R&D. Our
vision from day 1 was to challenge the norm and build software that uses new
approaches and leverages the techniques learned in low-latency trading floors.
An important aspect was to study and understand the evolution of hardware to
build database software that could extract more performance from CPUs, memory,
and modern hard disks.

### QuestDB design and performance

QuestDB is built-in zero-GC Java and C++, and every single algorithm in the code
base has been written from scratch with the goal of maximizing performance.

QuestDB’s data model (time-based arrays) differs from the LSM trees or B-trees
based storage engines found in InfluxDB or TimescaleDB. It requires less
overhead and data duplication while maintaining immediate consistency and
persisting data on disk.

This linear data model structure massively optimises ingestion as it allows the
database to slice data extremely efficiently in small chunks and process it all
in parallel. QuestDB also saturates the network cards to process messages from
several senders in parallel. Our ingestion is append only, with an order of
complexity O(1); QuestDB does not rely on computively intense indices to reorder
data as it hits the database. Out of order ingests are dealt with and re-ordered
in memory before being persisted to disk.

QuestDB’s data layout enables CPUs to access data faster. With respect to
queries, our codebase leverages modern CPU architecture with SIMD instructions
to request that the same operation be performed on multiple data elements in
parallel. We store data in columns and partition it by time in order to lift the
minimal amount of data from disk for a given query.

<Screenshot
  alt="Architecture of the storage model with column files and time partitions"
  height={323}
  src="/img/blog/2020-11-26/model.png"
  title="Data stored in columns and partitioned by time"
  width={650}
/>

In order to showcase the capabilities of our database, we decided to put
together an [online demo]({@demoUrl@}), which features a 1.6 billion rows
dataset with more than 10 years of NYC taxi and weather data (350GB). The
hardware powering the demo is a c5.metal instance (AWS) with 24 physical cores
and 192 GB of memory. The data is stored and accessed from disk, none of the
results are cached or pre-calculated. The postmortem of QuestDB’s ShowHN on
HackerNews can be found
[on DZone](https://dzone.com/articles/we-put-a-sql-database-on-the-internet).

### QuestDB and its growing community

Pushing database performance higher and higher still while making it easy for
developers to get started with our product is what motivates us every day. This
is why we are focused on building a strong community of developers who can
participate and improve the product through our open source distribution model.
We hope to see you on our [Slack](https://slack.questdb.io/) channel.
