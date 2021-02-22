---
title: ALTER TABLE COLUMN ADD INDEX keywords
sidebar_label: ALTER TABLE COLUMN ADD INDEX
description: ADD INDEX SQL keyword reference documentation.
---

Adds an index to an existing column.

## Syntax

![Flow chart showing the syntax of the ALTER TABLE keyword](/img/docs/diagrams/alterTable.svg)
![Flow chart showing the syntax of the ALTER TABLE with ADD INDEX keyword](/img/docs/diagrams/alterTableAddIndex.svg)

## Description

Adds new index to column of type `symbol`. Adding index is an atomic,
non-blocking and non-waiting operation. Once complete optimiser will start using
new index for SQL executions.

## Example

```questdb-sql title="Adding an index"
ALTER TABLE trades ALTER COLUMN instrument ADD INDEX;
```

:::info

For more information about indexes please refer to the
[INDEX section](/docs/concept/indexes/).

:::
