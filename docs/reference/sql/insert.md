---
title: INSERT keyword
sidebar_label: INSERT
description: INSERT SQL keyword reference documentation.
---

Inserts data into a database table.

## Syntax

![Flow chart showing the syntax of the INSERT keyword](/img/docs/diagrams/insert.svg)

### Parameters

Two parameters may be provided to optimize `INSERT AS SELECT` queries when
inserting out-of-order records into an ordered dataset:

- `batch` expects a `batchCount` (integer) value how many records to process at
  any one time
- `commitLag` expects a `lagAmount` with a modifier to specify the unit of time
  for the value (i.e. `20s` for 20 seconds). The following table describes the
  units that may be passed:

  | unit | description  |
  | ---- | ------------ |
  | us   | microseconds |
  | s    | seconds      |
  | m    | minutes      |
  | h    | hours        |
  | d    | days         |

## Examples

```questdb-sql title="Inserting all columns"
INSERT INTO trades
VALUES(
    to_timestamp('2019-10-17T00:00:00', 'yyyy-MM-ddTHH:mm:ss'),
    'AAPL',
    255,
    123.33,
    'B');
```

```questdb-sql title="Specifying schema"
INSERT INTO trades (timestamp, symbol, quantity, price, side)
VALUES(
    to_timestamp('2019-10-17T00:00:00', 'yyyy-MM-ddTHH:mm:ss'),
    'AAPL',
    255,
    123.33,
    'B');
```

:::note

Columns can be omitted during `INSERT` in which case value will be `NULL`

:::

```questdb-sql title="Inserting only specific columns"
INSERT INTO trades (timestamp, symbol, price)
VALUES(to_timestamp('2019-10-17T00:00:00', 'yyyy-MM-ddTHH:mm:ss'),'AAPL','B');
```

### Inserting query results

This method allows you to insert as many rows as your query returns at once.

```questdb-sql title="Insert as select"
INSERT INTO confirmed_trades
    SELECT timestamp, instrument, quantity, price, side
    FROM unconfirmed_trades
    WHERE trade_id = '47219345234';
```

Inserting out-of-order data into an ordered dataset may be optimized using
`batch` and `commitLag` parameters:

```questdb-sql title="Insert as select with lag and batch size"
INSERT batch 100000 commitLag 180s INTO trades
SELECT ts, instrument, quantity, price
FROM unordered_trades
```

:::info

- More details on ingesting out-of-order data with context on _lag_ and
  uncommitted record count see the guide for
  [configuring commit lag of out-of-order data](/docs/guides/out-of-order-commit-lag/)

- Hints and an example workflow using `INSERT AS SELECT` for bulk CSV import of
  out-of-order data can be found on the
  [importing data via CSV](/docs/guides/importing-data/#large-datasets-with-out-of-order-data)
  documentation.

:::
