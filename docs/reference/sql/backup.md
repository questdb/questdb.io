---
title: BACKUP keyword
sidebar_label: BACKUP
description: BACKUP SQL keyword reference documentation.
---

## Syntax

![Flow chart showing the syntax of the BACKUP keyword](/img/docs/diagrams/backup.svg)

## Description

Creates a backup for one, several, or all database tables.

## Backup directory

:::tip

`BACKUP TABLE` requires a `backup directory` which is set using the
[configuration key](/docs/reference/configuration/server/)
`cairo.sql.backup.root` in the
[server.conf](/docs/reference/configuration/root-directory-structure/#serverconf)
file.

:::

```shell title="Example configuration key"
cairo.sql.backup.root=/Users/UserName/Desktop
```

The `backup directory` can be on a local disk to the server, on a remote disk,
or a remote filesystem. QuestDB will enforce that the backup are only written in
a location relative to the `backup directory`. This is a security feature to
disallow random file access by QuestDB.

The tables will be written in a directory with today's date. By default, the
format is `yyyy-MM-dd`, for example `2020-04-20`.

:::tip

You can define a custom format using the `cairo.sql.backup.dir.datetime.format`
[configuration key](/docs/reference/configuration/server/) like the example
below

:::

```shell title="Example user-defined directory format"
cairo.sql.backup.dir.datetime.format=yyyy-dd-MM
```

The data and meta files will be written following the
[db directory structure](/docs/reference/configuration/root-directory-structure/#db)

```filestructure title="Directory structure (single backup)"
'backup directory/'
2020-04-20
├── table1
├── table2
└── ...
```

If a user performs several backups on the same date, each backup will be written
a new directory. Subsequent backups on the same date will look as follows:

```filestructure title="Directory structure (multiple backups)"
'backup directory/'
├── 2020-04-20      'first'
├── 2020-04-20.1    'second'
├── 2020-04-20.2    'third'
├── 2020-04-21      'first new date'
├── 2020-04-21.1    'first new date'
└── ...
```

## Examples

```questdb-sql title="Single table"
BACKUP TABLE table1;
```

```questdb-sql title="Multiple tables"
BACKUP TABLE table1, table2, table3;
```

```questdb-sql title="All tables"
BACKUP DATABASE;
```
