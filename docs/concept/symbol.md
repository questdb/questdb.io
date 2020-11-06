---
title: Symbol
sidebar_label: Symbol
description:
  Description of the symbol data type. This QuestDB specific type is used to
  store repetitive strings in order to enable certain optimizations.
---

QuestDB introduces a specific data type called `symbol`. It is a data structure
used to store repetitive strings as a table of integers and corresponding string
values.

## Advantages

- Reduced complexity of database schemas by removing the need for explicit extra
  tables and joins.
- Transparent to the user: exact same behaviour as if the table was storing
  string values, without the burden of actually doing so.
- Greatly improved query performance (comparing and writing `int` instead of
  `string`).
- Greatly improved storage efficiency (storing `int` instead of `string`).

## Usage

To declare a column as `SYMBOL` please refer to the
[CREATE TABLE](/docs/reference/sql/create-table/) section. To create an `INDEX`
on `SYMBOL`, please refer to the [index](/docs/concept/indexes/) section.

## Properties

- Symbol tables are stored separately from column data.
- Q conversion from `string` to `int` and vice-versa when reading or writing
  data.
- `symbol` supports indexes.
- For greater speed, `symbol` can be stored in the heap.
