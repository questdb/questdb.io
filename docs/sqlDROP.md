---
id: drop
title: DROP TABLE
sidebar_label: DROP TABLE
---

## DROP TABLE

`DROP TABLE` is used to permanently delete a table and its contents.

:::caution
This command irremediably deletes the data in the target table. In
doubt, make sure you have created [backups](backup.md) of your data.
:::

### Syntax

```sql
DROP TABLE 'TABLE_NAME';
```

### Example

```sql
DROP TABLE ratings;
```

:::tip
To delete the data inside a table but keep the table and its structure,
use **[TRUNCATE](sqlTRUNCATE.md)**.
:::
