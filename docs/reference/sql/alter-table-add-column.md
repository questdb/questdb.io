---
title: ALTER TABLE ADD COLUMN
sidebar_label: ALTER TABLE ADD COLUMN
---

Adds a new column to an existing table

## Syntax

![alter table syntax](/img/doc/diagrams/alter-table.svg)

![add column syntax](/img/doc/diagrams/alter-table-add-column.svg)

## Description

Adds a new single column of the specified type. The new column is not
back-populated even if the table contains data.

While a single column is added atomically, adding multiple columns is not an
atomic operation. QuestDB will stop adding the remaining columns on the list on
the first failure. It is therefore possible to add some columns and not others.

:::info
Adding a new column does not lock the table for reading and does not
wait on any reads to finish.
:::

## Examples

Add a new column called `comment` of type `STRING` type to the table `ratings`

```questdb-sql title="New column"
ALTER TABLE ratings ADD COLUMN comment STRING
```

When adding a `symbol` column, you can also specify symbol related options, for
example:

```questdb-sql title="New symbol column"
ALTER TABLE ratings ADD COLUMN comment SYMBOL NOCACHE INDEX
```

:::tip
For `symbol`, both `nocache` and `index` keywords are optional.
:::

:::note
For more information on symbol options, please refer to the
[symbol documentation](concept/symbol.md)
:::
