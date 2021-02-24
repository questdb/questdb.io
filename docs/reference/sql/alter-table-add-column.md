---
title: ALTER TABLE ADD COLUMN
sidebar_label: ADD COLUMN
description: ALTER TABLE ADD COLUMN SQL keyword reference documentation.
---

Adds a new column of a specified type to an existing table.

The new column is not back-populated even if the table contains data. While a
single column is added atomically, adding multiple columns is not an atomic
operation. QuestDB will stop adding the remaining columns on the list on the
first failure. It is therefore possible to add some columns and not others.

:::caution

- New column names may only consist of letters, numbers and underscores `_`

- Adding a new column does not lock the table for reading and does not wait on
  any reads to finish.

:::

## Syntax

![Flow chart showing the syntax of the ALTER TABLE keyword](/img/docs/diagrams/alterTable.svg)
![Flow chart showing the syntax of ALTER TABLE with ADD COLUMN keyword](/img/docs/diagrams/alterTableAddColumn.svg)

## Examples

Add a new column called `comment` of type `STRING` type to the table `ratings`

```questdb-sql title="New column"
ALTER TABLE ratings ADD COLUMN comment STRING;
```

When adding a column of `Symbol` type, optional keywords may be passed which are
unique to this type. These keywords are described in the
[Symbol type](/docs/reference/sql/create-table/#symbol) section of the
`CREATE TABLE` documentation.

The following example shows how to add a new `SYMBOL` column with `NOCACHE` and
`INDEX` keywords:

```questdb-sql title="New symbol column"
ALTER TABLE ratings ADD COLUMN comment SYMBOL NOCACHE INDEX;
```
