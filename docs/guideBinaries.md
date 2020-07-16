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

```script title="Check Java version"
java -version
```

If you do not already have Java installed, download and install the package for
your architecture. You will also need to download QuestDB binaries.

| Asset            | Link                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| Java             | [Oracle download page](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)        |
| QuestDB binaries | [Download now](https://github.com/questdb/questdb/releases/download/5.0.0/questdb-5.0.0-bin.tar.gz) |

The QuestDB binaries come as a tarball which needs to be extracted

```script title="Extract the tarball"
tar -xvf questdb-5.0.0-bin.tar.gz
```

## Start QuestDB

Navigate to the directory created in the previous step

```script
cd questdb-5.0.0-bin.tar.gz
```

To start the QuestDB server service, simply run the below

```script title="Linux & MacOS"
./questdb.sh start
```

```script title="Windows"
questdb.exe start
```

This will use the following [root directories](rootDirectoryStructure.md)

```script title="Linux"
$HOME/.questdb
```

```script title="MacOS"
/usr/local/var/questdb/
```

```script title="Windows"
C:\Windows\System32\questdb
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Status

You can use the following to get the status of the QuestDB service.

```script title="Check status"
questdb status
```

## Using QuestDB

Here are some guides to get started using the QuestDB service. These will show
you how to import data and run queries

- with the [HTTP API](guideBinaries.md)
- with [psql](guidePSQL.md) over Postgres wire protocol

## Stop QuestDB

Stop the QuestDB service as follows

```script title="Linux & MacOS"
./questdb.sh stop
```

```script title="Windows"
questdb.exe stop
```
