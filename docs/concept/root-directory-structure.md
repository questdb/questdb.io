---
title: Root directory structure
sidebar_label: Root directory
description: Contents of the <root_directory> folder explained.
---

QuestDB creates the following file structure in its `root_directory`:

```filestructure
questdb
├── conf
├── db
├── log
└── public
```

## `conf` directory

Contains configuration files for QuestDB:

```filestructure
├── conf
│   ├── date.formats
│   ├── mime.types
│   └── server.conf
```

| file           | description                                                                                                     |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| `date.formats` | A list of date formats in plain text.                                                                           |
| `mime.types`   | Mapping file used by the HTTP server to map file extension to response type when an user downloads a file.      |
| `server.conf`  | Server configuration file. Find out more in the [server configuration](/docs/reference/configuration/) section. |

## `db` directory

This directory contains all the files related to database tables. It is
organised as follows:

- Each table has its own `table_directory` under `root_directory/db/table_name`
- Within a `table_directory`, each [partition](/docs/concept/partitions/) has
  its own `partition_directory`.
- Within each `partition directory`, each column has its own `column_file`, for
  example `mycolumn.d`
- If a given column has an [index](/docs/concept/indexes/), then there will also
  be an `index_file`, for example `mycolumn.k`

The table also stores metadata in `_meta` files:

```filestructure
├── db
│   ├── Table
│   │   │  
│   │   ├── Partition 1
│   │   │   ├── _archive
│   │   │   ├── column1.d
│   │   │   ├── column2.d
│   │   │   ├── column2.k
│   │   │   └── ...
│   │   ├── Partition 2
│   │   │   ├── _archive
│   │   │   ├── column1.d
│   │   │   ├── column2.d
│   │   │   ├── column2.k
│   │   │   └── ...
│   │   │  
│   │   ├── _meta
│   │   └── _txn
│   └──  table_1.lock
```

If the table is not partitioned, data is stored in a directory called `default`:

```filestructure
├── db
│   ├── Table
│   │   │  
│   │   ├── default
│   │   │   ├── _archive
│   │   │   ├── column1.d
│   │   │   ├── column2.d
│   │   │   ├── column2.k
│   │   │   └── ...
│   │   ├── _meta
│   │   └── _txn
│   └──  table_1.lock
```

:::caution

As tempting as it may be to delete partitions by manually removing the
directories from the file system, we really discourage this. The partitions are
organised with metadata and deleting them directly could corrupt the table. We
recommend you use
[ALTER TABLE DROP PARTITION](/docs/reference/sql/alter-table-drop-partition/)
for this effect.

:::

## `log` directory

Contains the log files for QuestDB:

```filestructure
├── log
│   ├── stdout-2020-04-15T11-59-59.txt
│   └── stdout-2020-04-12T13-31-22.txt
```

Log files look like this:

```shell
2020-04-15T16:42:32.879970Z I i.q.c.TableReader new transaction [txn=2, transientRowCount=1, fixedRowCount=1, maxTimestamp=1585755801000000, attempts=0]
2020-04-15T16:42:32.880051Z I i.q.g.FunctionParser call to_timestamp('2020-05-01:15:43:21','yyyy-MM-dd:HH:mm:ss') -> to_timestamp(Ss)
2020-04-15T16:42:32.880657Z I i.q.c.p.WriterPool >> [table=`table_1`, thread=12]
2020-04-15T16:42:32.881330Z I i.q.c.AppendMemory truncated and closed [fd=32]
2020-04-15T16:42:32.881448Z I i.q.c.AppendMemory open /usr/local/var/questdb/db/table_1/2020-05/timestamp.d [fd=32, pageSize=16777216]
2020-04-15T16:42:32.881708Z I i.q.c.AppendMemory truncated and closed [fd=33]
2020-04-15T16:42:32.881830Z I i.q.c.AppendMemory open /usr/local/var/questdb/db/table_1/2020-05/temperature.d [fd=33, pageSize=16777216]
2020-04-15T16:42:32.882092Z I i.q.c.AppendMemory truncated and closed [fd=34]
2020-04-15T16:42:32.882210Z I i.q.c.AppendMemory open /usr/local/var/questdb/db/table_1/2020-05/humidity.d [fd=34, pageSize=16777216]
2020-04-15T16:42:32.882248Z I i.q.c.TableWriter switched partition to '/usr/local/var/questdb/db/table_1/2020-05'
2020-04-15T16:42:32.882571Z I i.q.c.p.WriterPool << [table=`table_1`, thread=12]
2020-04-15T16:44:33.245144Z I i.q.c.AppendMemory truncated and closed [fd=32]
2020-04-15T16:44:33.245418Z I i.q.c.AppendMemory truncated and closed [fd=33]
2020-04-15T16:44:33.245712Z I i.q.c.AppendMemory truncated and closed [fd=34]
2020-04-15T16:44:33.246096Z I i.q.c.ReadWriteMemory truncated and closed [fd=30]
2020-04-15T16:44:33.246217Z I i.q.c.ReadOnlyMemory closed [fd=31]
2020-04-15T16:44:33.246461Z I i.q.c.TableWriter closed 'table_1'
2020-04-15T16:44:33.246492Z I i.q.c.p.WriterPool closed [table=`table_1`, reason=IDLE, by=12]
2020-04-15T16:44:33.247184Z I i.q.c.OnePageMemory closed [fd=28]
2020-04-15T16:44:33.247239Z I i.q.c.ReadOnlyMemory closed [fd=27]
2020-04-15T16:44:33.247267Z I i.q.c.TableReader closed 'table_1'
2020-04-15T16:44:33.247287Z I i.q.c.p.ReaderPool closed 'table_1' [at=0:0, reason=IDLE]
2020-04-15T16:44:39.763406Z I http-server disconnected [ip=127.0.0.1, fd=24]
2020-04-15T16:44:39.763729Z I i.q.c.h.HttpServer pushed
```

## `public` directory

Contains the web files for the Web Console:

```filestructure
└── public
    ├── assets
    │   ├── console-configuration.json
    │   └── favicon.png
    ├── index.html
    ├── qdb.js
    ├── qdb.css
    └── ...
```
