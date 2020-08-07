---
title: How to use QuestDB from the binaries
sidebar_label: From the binaries
description: Tutorial on how to use the binaries to install and launch QuestDB.
---

This guides shows how to install QuestDB using the binaries and how to start
using the server.

:::info

For complete information on how to use QuestDB's binary, please refer to the
[Binaries](packages/binaries.md)

:::

## Setup QuestDB

You need Java 11 or above. You can check your installation as follows:

```shell
java -version
```

If you do not already have Java installed, download and install the package for
your architecture. You will also need to download QuestDB binaries.

| Asset            | Link                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| OpenJDK          | [OpenJDK download page](https://openjdk.java.net/install/)                                                |
| Oracle Java      | [Oracle download page](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)              |
| QuestDB binaries | [Download from GitHub]({@githubUrl@}/releases/download/{@version@}/questdb-{@version@}-no-jre-bin.tar.gz) |

The QuestDB binaries come as a tarball which needs to be extracted:

```shell title="Extract the tarball"
tar -xvf questdb-{@version@}-no-jre-bin.tar.gz
```

## Start QuestDB

Navigate to the directory created in the previous step:

```shell
cd questdb-{@version@}-no-jre-bin.tar.gz
```

To start the QuestDB server service, run the following:

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="nix" groupId="operating-systems" values={[
  { label: "Linux & macOS", value: "nix" },
  { label: "Windows", value: "windows" },
]}>

<TabItem value="nix">

```shell
./questdb.sh start
```

</TabItem>

<TabItem value="windows">

```shell
questdb.exe start
```

</TabItem>

</Tabs>

This will run QuestDB with the following
[root directory](reference/configuration/root-directory-structure.md):

<Tabs defaultValue="linux" values={[
  { label: "Linux", value: "linux" },
  { label: "macOS", value: "macos" },
  { label: "Windows", value: "windows" },
]}>

<TabItem value="linux">

```shell
$HOME/.questdb
```

</TabItem>

<TabItem value="macos">

```shell
/usr/local/var/questdb/
```

</TabItem>

<TabItem value="windows">

```shell
.\qdbroot
```

</TabItem>

</Tabs>

## Status

You can use the following to get the status of the QuestDB service.

```shell
questdb status
```

## Using QuestDB

Here are some guides to get started using the QuestDB service. These will show
you how to import data and run queries

- with the [REST API](guide/rest.md)
- with the [Postgres wire protocol](guide/postgres-wire.md)

## Stop QuestDB

Stop the QuestDB service as follows:

<Tabs defaultValue="nix" groupId="operating-systems" values={[
  { label: "Linux & macOS", value: "nix" },
  { label: "Windows", value: "windows" },
]}>

<TabItem value="nix">

```shell
./questdb.sh stop
```

</TabItem>

<TabItem value="windows">

```shell
questdb.exe stop
```

</TabItem>

</Tabs>
