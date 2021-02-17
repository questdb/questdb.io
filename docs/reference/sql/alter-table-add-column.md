---
title: ALTER TABLE ADD COLUMN keywords
sidebar_label: ALTER TABLE ADD COLUMN
description: ALTER TABLE ADD COLUMN SQL keyword reference documentation.
---

Adds a new column to an existing table.

## Syntax

![Flow chart showing the syntax of the ALTER TABLE keyword](/img/docs/diagrams/alterTable.svg)
![Flow chart showing the syntax of ALTER TABLE with ADD COLUMN keyword](/img/docs/diagrams/alterTableAddColumn.svg)

## Description

Adds a new single column of the specified type. The new column is not
back-populated even if the table contains data.

While a single column is added atomically, adding multiple columns is not an
atomic operation. QuestDB will stop adding the remaining columns on the list on
the first failure. It is therefore possible to add some columns and not others.

:::info

Adding a new column does not lock the table for reading and does not wait on any
reads to finish.

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
[symbol documentation](/docs/concept/symbol/)

:::
