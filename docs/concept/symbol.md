---
title: Symbol
sidebar_label: Symbol
---

QuestDB introduces a specific data type called `symbol`. It is a data structure
used to store repetitive strings as a table of integers and corresponding string
values.

#### Advantages

- reduced complexity of database schemas by removing the need for explicit extra
  tables and joins.
- transparent to the user: exact same behaviour as if the table was storing
  string values, without the burden of actually doing so.
- greatly improved query performance (comparing and writing `int` instead of
  `string`)
- greatly improved storage efficiency (storing `int` instead of `string`)

:::note
`symbol` comparison across tables is not directly supported.
:::

#### Usage

To declare a column as `SYMBOL` please refer to the
[CREATE TABLE](reference/sql/create-table.md) section. To create an `INDEX` on `SYMBOL`, please
refer to the [index](concept/indexes.md) section.

#### Properties

- Symbol tables are stored separately from column data.
- Q conversion from `string` to `int` and vice-versa when reading or writing
  data.
- `symbol` supports indexes.
- For greater speed, `symbol` can be stored in the heap.
