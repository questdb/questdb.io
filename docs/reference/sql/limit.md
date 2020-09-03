---
title: LIMIT keyword
sidebar_label: LIMIT
description: LIMIT SQL keyword reference documentation.
---

Specify the number and position of records returned by a
[SELECT statement](/docs/reference/sql/select/).

In other implementations of SQL, this is sometimes replaced by statements such
as `OFFSET` or `ROWNUM` Our implementation of `LIMIT` encompasses both in one
statement.

## Syntax

![Flow chart showing the syntax of the LIMIT keyword](/img/docs/diagrams/limit.svg)

- `numberOfRecords` is the number of records to return.
- `upperBound` and `lowerBound` is the return range. `lowerBound` is
  **exclusive** and `upperBound` is **inclusive**.

A `positive` number will return the `first` n records. A `negative` number will
return the `last` n records.

## Examples

```questdb-sql title="First 5 results"
SELECT * FROM ratings LIMIT 5;
```

```questdb-sql title="Last 5 results"
SELECT * FROM ratings LIMIT -5;
```

```questdb-sql title="Range results - this will return records 3, 4 and 5"
SELECT * FROM ratings LIMIT 2,5;
```

`negative` range parameters will return results from the bottom of the table.
Assuming a table with `n` records, the following will return records between n-7
(exclusive) and n-3 (inclusive), i.e {n-6, n-5, n-4, n-3}

```questdb-sql title="Range results (negative)"
SELECT * FROM ratings LIMIT -7, -3;
```
