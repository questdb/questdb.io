---
title: COPY
sidebar_label: COPY
---

## Syntax

![copy syntax](/img/doc/diagrams/copy.svg)

## Description

Copies data from a delimited text file into a table. Column delimiter detection
is automatic.

- If the target table exists, then the data is appended provided the file
  structure matches the table.
- If the target table does not exist, then it is created using metadata derived
  from the file data.

## Options

- `with headers true` - QuestDB will automatically assume the first row is a
  header.
- `with headers false` - QuestDB will use schema recognition to determine
  whether the first rows should be used as header.

:::note
`COPY` requires a `copy root directory` which is set using the
[configuration key](reference/server-configuration.md) `cairo.sql.copy.root` in the
[server.conf](reference/root-directory-structure.md#serverconf) file.

```script title="Example"
cairo.sql.copy.root=/Users/UserName/Desktop
```

:::

The `copy directory` can be on a local disk to the server, on a remote disk, or
a remote filesystem. QuestDB will enforce that the tables are only written from
files located in a directory relative to the `copy directory`. This is a
security feature to disallow random file access by QuestDB.

## Examples

```questdb-sql title="COPY"
COPY trades20191223 FROM 'C:\archive\trades\20191223.csv'
```

```questdb-sql title="COPY with headers true"
COPY trades20191223 FROM 'C:\archive\trades\20191223.csv' with headers true
```
