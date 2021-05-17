---
title: ALTER TABLE SET PARAM
sidebar_label: SET PARAM
description: SET PARAM SQL keyword reference documentation.
---

The following keywords allow for setting table parameters via SQL. This is
useful for applying configuration for how the system handles out-of-order data
ingestion on a per-table basis. For more information on these values including
details on why these settings should be applied, see the documentation for
[out-of-order data ingestion](/docs/guides/hysteresis/).

## Syntax

![Flow chart showing the syntax of the ALTER TABLE keyword](/img/docs/diagrams/alterTable.svg)
![Flow chart showing the syntax of the ALTER TABLE RENAME COLUMN keywords](/img/docs/diagrams/alterTableSetParam.svg)

## Example

The values for **maximum uncommitted rows** and a time range for **out-of-order
commit hysteresis** can changed per each table with the following SQL:

```questdb-sql title="Altering out-of-order parameters via SQL"
ALTER TABLE my_table SET PARAM o3MaxUncommittedRows = 10000
ALTER TABLE my_table SET PARAM o3CommitHysteresis = 20s
```

Checking the values per-table may be done using the `tables()` function:

```questdb-sql title="List table metadata"
select id, name, o3MaxUncommittedRows, o3CommitHysteresisMicros from tables();
```

| id  | name     | o3MaxUncommittedRows | o3CommitHysteresisMicros |
| --- | -------- | -------------------- | ------------------------ |
| 1   | my_table | 10000                | 20000000                 |

For more details on retrieving table and column information, see the
[meta functions documentation](/docs/reference/function/meta/).
