---
title: Symbol
sidebar_label: Symbol
description:
  Documentation for usage of the symbol data type in QuestDB. This type is used
  to store repetitive strings in order to enable optimizations on storage and
  search.
---

QuestDB introduces a data type called `SYMBOL`; a data structure used to store
repetitive strings. Internally, `SYMBOL` types are stored as a table of integers
and their corresponding string values.

## Advantages of symbol types

- Greatly improved query performance as string operations compare and write
  `int` types instead of `string`.
- Greatly improved storage efficiency as `int` maps to `string` types.
- Unobtrusive to the user because SQL execution has the same result as handling
  string values.
- Reduced complexity of database schemas by removing the need for explicit
  additional tables or joins.

## Usage of symbols

Columns can be specified as `SYMBOL` during table creation similar to other
types:

```questdb-sql title="Create table with a SYMBOL type"
CREATE TABLE my_table(symb SYMBOL, price DOUBLE, ts TIMESTAMP)
  timestamp(ts);
```

Symbols may also be indexed for faster query execution:

```questdb-sql
CREATE TABLE my_table(symb SYMBOL index, price DOUBLE, ts TIMESTAMP)
  timestamp(ts)
```

Additional options may be provided for greater control over indexing which is
described on the [CREATE TABLE](/docs/reference/sql/create-table/)
documentation. Further details on indexes are described on the
[index documentation](/docs/concept/indexes/).

## Properties

- Symbol tables are stored separately from column data.
- Q conversion from `string` to `int` and vice-versa when reading or writing
  data.
- Columns defined as `symbol` types support indexing.
- Users may elect that QuestDB stores `symbol` types in the heap for improved
  query speed.
