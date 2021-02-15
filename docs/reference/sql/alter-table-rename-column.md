---
title: ALTER TABLE RENAME COLUMN keywords
sidebar_label: ALTER TABLE RENAME COLUMN
description: RENAME COLUMN SQL keyword reference documentation.
---

Rename a column in an existing table.

## Syntax

![Flow chart showing the syntax of the ALTER TABLE RENAME COLUMN keywords](/img/docs/diagrams/alterTableRenameColumn.svg)

## Description

Renames a column in an existing table.


## Example

The following example renames an existing column called `rating` to `movie_rating` from the table
`ratings`.

```questdb-sql title="Renaming a column"
ALTER TABLE ratings RENAME COLUMN rating TO movie_rating;
```
