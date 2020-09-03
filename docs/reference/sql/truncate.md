---
title: TRUNCATE TABLE keyword
sidebar_label: TRUNCATE TABLE
description: TRUNCATE SQL keyword reference documentation.
---

`TRUNCATE TABLE` is used to permanently delete the contents of a table without
deleting the table itself.

:::caution

This command irremediably deletes the data in the target table. In doubt, make
sure you have created [backups](/docs/reference/sql/backup/) of your data.

:::

## Syntax

```questdb-sql
TRUNCATE TABLE 'table_name';
```

## Examples

```questdb-sql
TRUNCATE TABLE ratings;
```

:::note

To delete both the data and the table structure, use
[DROP](/docs/reference/sql/drop/).

:::
