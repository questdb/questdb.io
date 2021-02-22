---
title: ALTER TABLE DROP COLUMN keywords
sidebar_label: ALTER TABLE DROP COLUMN
description: DROP COLUMN SQL keyword reference documentation.
---

Drops a column from an existing table.

## Syntax

![Flow chart showing the syntax of the ALTER TABLE keyword](/img/docs/diagrams/alterTable.svg)
![Flow chart showing the syntax of ALTER TABLE with DROP COLUMN keyword](/img/docs/diagrams/alterTableDropColumn.svg)

## Description

Drops (removes) a column from an existing table.

Before the operation can proceed it commits any current transaction. Hence
transaction is committed regardless of the success or failure of the drop.

Dropping a column does not lock the table for reading and does not wait on any
reads to finish. Drop column will also attempt to remove column files from all
partitions, thus freeing up disk space right away. On Windows OS that may not be
possible and file remove operation is postponed until files are released by all
threads. However logical drop column will succeed on Windows in presence of
active readers.

## Example

The following example deletes the column called `comment` from the table
`ratings`

```questdb-sql title="Dropping a column"
ALTER TABLE ratings DROP COLUMN movieId;
```
