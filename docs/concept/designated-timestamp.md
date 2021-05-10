---
title: Designated timestamp
sidebar_label: Designated timestamp
description:
  How designated timestamps are implemented and why it is an important
  functionality for time series.
---

QuestDB offers the option to elect a column as a _designated timestamp_. This
allows you to specify which column the tables will be indexed by in order to
leverage time-oriented language features and high-performance functionalities.

## Properties

- Only a column of type `timestamp` can be elected as a designated timestamp.
- Only one column can be elected for a given table.
- A designated timestamp is elected either:
  - during table creation
  - within a query using a
    [timestamp function](/docs/reference/function/timestamp/)

## Out-of-order policy

As of version 6.0.0, QuestDB supports ingestion of records which are
out-of-order (O3) by time. Configuring how the system handles ingestion of O3
records is done via [O3 hysteresis](/docs/guides/hysteresis/) configuration.

:::tip

In versions prior to 6.0.0, once a column is elected as a designated timestamp,
it will enforce an order policy on this column, and O3 inserts will be rejected.
In other words, new timestamp values need to be greater than or equal to the
latest timestamp in the column.

:::

## Advantages

Electing a designated timestamp allows you to:

- Partition tables by time range. For more information, see the
  [partitions reference](/docs/concept/partitions/).
- Use time series joins such as `ASOF JOIN`. For more information, see the
  [JOIN reference](/docs/reference/sql/join/).
