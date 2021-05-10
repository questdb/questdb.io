---
title: BACKUP keyword
sidebar_label: BACKUP
description: BACKUP SQL keyword reference documentation.
---

Creates a backup for one, several, or all database tables.

## Syntax

![Flow chart showing the syntax of the BACKUP keyword](/img/docs/diagrams/backup.svg)

## Backup directory

Backing up a database or tables requires a **backup directory** which is set
using the `cairo.sql.backup.root`
[configuration key](/docs/reference/configuration/) in a
[server.conf](/docs/concept/root-directory-structure/#serverconf) file:

```shell title="server.conf"
cairo.sql.backup.root=/Users/UserName/Desktop
```

The **backup directory** can be on a disk local to the server, a remote disk or
a remote filesystem. QuestDB will enforce that the backup is only written in a
location relative to the `backup directory`. This is a security feature to
disallow random file access by QuestDB.

The tables will be written in a directory with today's date with the default
format `yyyy-MM-dd` (e.g., `2020-04-20`). A custom date format can be specified
using the `cairo.sql.backup.dir.datetime.format`
[configuration key](/docs/reference/configuration/):

```shell title="server.conf"
cairo.sql.backup.dir.datetime.format=yyyy-dd-MM
```

Given a `BACKUP` query run on `2021-02-25`, the data and metadata files will be
written following the
[db directory structure](/docs/concept/root-directory-structure/#db)

```filestructure title="/path/to/backup_directory"
├── 2021-02-25
│   ├── table1
│   │   ├── ...
│   ├── table2
│   │   ├── ...
│   ├── table3
│   ...
```

If a user performs several backups on the same date, each backup will be written
a new directory. Subsequent backups on the same date will look as follows:

```filestructure title="/path/to/backup_directory"
├── 2021-02-22    'first'
├── 2021-02-22.1  'second'
├── 2021-02-22.2  'third'
├── 2021-02-24    'first new date'
├── 2021-02-24.1  'first new date'
│   ...
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
