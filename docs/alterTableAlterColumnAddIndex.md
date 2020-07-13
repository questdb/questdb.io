---
id: alterTableAlterColumnAddIndex
title: ALTER TABLE COLUMN ADD INDEX
sidebar_label: ALTER TABLE COLUMN ADD INDEX
---

## Synopsis

Adds an index to an existing column

## Syntax

![alter table syntax](/img/doc/diagrams/alter-table.svg)
![add index syntax](/img/doc/diagrams/alter-table-add-index.svg)

## Description

Adds new index to column of type `symbol`. Adding index is an atomic,
non-blocking and non-waiting operation. Once complete optimiser will start using
new index for SQL executions.

## Example

```sql title="Adding an index"
ALTER TABLE trades ALTER COLUMN symbol ADD INDEX
```

:::info
For more information about indexes please refer to the
[INDEX section](indexes.md).
:::
