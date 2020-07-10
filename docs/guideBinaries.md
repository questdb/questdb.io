---
id: guideBinaries
title: How to use QuestDB with the binaries
sidebar_label: Using the binaries
---

This guides shows how to install QuestDB using the binaries and how to start
using the server.

:::info
For complete information on how to use QuestDB's binary, please refer to
the [Binaries reference](binariesReference.md)
:::

## Setup QuestDB

You need Java 11 or above. You can check your installation as follows

```shell script title="Check Java version"
java -version
```

If you do not already have Java installed, download and install the package for
your architecture. You will also need to download QuestDB binaries.

| Asset            | Link                                                                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Java             | <a href="https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html" target="_blank">Go to Oracle download page</a> |
| QuestDB binaries | <a href="https://github.com/questdb/questdb/releases/download/5.0.0/questdb-5.0.0-bin.tar.gz" target="_blank"> Download now (4Mb) </a>        |

The QuestDB binaries come as a tarball which needs to be extracted

```shell script title="Extract the tarball"
tar -xvf questdb-5.0.0-bin.tar.gz
```

## Start QuestDB

Navigate to the directory created in the previous step

```shell script
cd questdb-5.0.0-bin.tar.gz
```

To start the QuestDB server service, simply run the below

```shell script title="Linux & MacOS"
./questdb.sh start
```

```shell script title="Windows"
questdb.exe start
```

This will use the following [root directories](rootDirectoryStructure.md)

```shell script title="Linux"
$HOME/.questdb
```

```shell script title="MacOS"
/usr/local/var/questdb/
```

```shell script title="Windows"
C:\Windows\System32\questdb
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Status

You can use the following to get the status of the QuestDB service.

```shell script title="Check status"
questdb status
```

## Using QuestDB

Here are some guides to get started using the QuestDB service. These will show
you how to import data and run queries

- with the [HTTP API](guideBinaries.md)
- with [psql](guidePSQL.md) over Postgres wire protocol

## Stop QuestDB

Stop the QuestDB service as follows

```shell script title="Linux & MacOS"
./questdb.sh stop
```

```shell script title="Windows"
questdb.exe stop
```
