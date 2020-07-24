---
title: Introduction
---

QuestDB is a relational column-oriented database designed for real-time
analytics on time series and event data. It uses the SQL language with a few
extensions for time series. The below will help you get familiar with QuestDB
and get started.

## Concepts

This section describes the architecture of QuestDB, how it stores and queries
data, and introduces features and capabilities specific to QuestDB.

As a start, we suggest you read about the
[storage model](concept/storage-model.md) and about the
[designated timestamp](concept/designated-timestamp.md). To make the most of
QuestDB, you should also get familiar with our
[SQL extensions](concept/sql-extensions.md) which allow to make the most of time
series capabilities with an efficient non-verbose syntax. You will also find the
[symbol](concept/symbol.md) concept interesting to store and retrieve repetitive
strings efficiently.

## Guides

Setup guides are available for [Docker](guide/docker.md), the
[binaries](guide/binaries.md) or [Homebrew](guide/homebrew.md).

There are guides to get started with the [Web Console](guide/web-console.md),
with the [Postgres wire protocol (alpha)](guide/postgres-wire.md), the
[REST API](guide/rest.md) or the [Java API](api/java.md).

## Reference

This section contains reference about configuration, functions and SQL language.

## Support

We are happy to help with any question you may have, particularly to help you
optimise the performance of your application. Feel free to reach out using the
following channels:

- [Ask a question on Slack](https://join.slack.com/t/questdb/shared_invite/enQtNzk4Nzg4Mjc2MTE2LTEzZThjMzliMjUzMTBmYzVjYWNmM2UyNWJmNDdkMDYyZmE0ZDliZTQxN2EzNzk5MDE3Zjc1ZmJiZmFiZTIwMGY>)
- [Raise an issue on Github]({@githubUrl@}/issues)
- or send us an email at [hello@questdb.io](mailto:hello@questdb.io)
