---
title: Get started with QuestDB from the binaries
sidebar_label: Binaries
description:
  How to use the binaries to install and launch QuestDB. The binaries for the
  latest version can be download from the Get QuestDB page.
---

This guide shows how to install and use QuestDB from the binaries.

QuestDB comes with a script `questdb.sh` for Linux/FreeBSD and an executable
`questdb.exe` for Windows. If you are looking for macOS, please check our
[Homebrew](/docs/get-started/homebrew/) section.

## Download

You can find binaries for the latest version ({@version@}) on the
[Get QuestDB](/get-questdb/) page, and release notes are included on the
[GitHub release]({@githubUrl@}/releases) page.

## Prerequisites

### "Any (no JVM)" version

The file is named:

```shell
questdb-{@version@}-no-jre-bin.tar.gz
```

This binary is around or less than 4MB.

#### Java 11

When using this binary you will need to have Java 11 installed locally. You can
check which version is already installed on your system with:

```shell
java -version
```

If you do not already have Java installed, download and install the package for
your operating system. We support:

- AdoptOpenJDK
- Amazon Corretto
- OpenJDK
- Oracle Java

Other Java distributions are most likely working but we are not running tests on
them.

#### `JAVA_HOME`

The environment variable `JAVA_HOME` needs to be set to your JDK's installation
folder.

### Your operating system version

The file is named:

<!-- prettier-ignore-start -->

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="linux" values={[
  { label: "Linux", value: "linux" },
  { label: "FreeBSD", value: "bsd" },
  { label: "Windows", value: "windows" },
]}>

<!-- prettier-ignore-end -->

<TabItem value="linux">

```shell
questdb-{@version@}-rt-linux-amd64.tar.gz
```

</TabItem>

<TabItem value="bsd">

```shell
questdb-{@version@}-rt-freebsd-amd64.tar.gz
```

</TabItem>

<TabItem value="windows">

```shell
questdb-{@version@}-rt-windows-amd64.tar.gz
```

</TabItem>

</Tabs>

This binary size is around 20MB, depending on the operating system.

When using this binary, you do not need any other dependencies on your machine,
as a Java runtime is packaged directly with QuestDB.

## Extract the tarball

<!-- prettier-ignore-start -->

<Tabs defaultValue="any" values={[
  { label: "Any (no JVM)", value: "any" },
  { label: "Linux", value: "linux" },
  { label: "FreeBSD", value: "bsd" },
  { label: "Windows", value: "windows" },
]}>

<!-- prettier-ignore-end -->

<TabItem value="any">

```shell
tar -xvf questdb-{@version@}-no-jre-bin.tar.gz
```

</TabItem>

<TabItem value="linux">

```shell
tar -xvf questdb-{@version@}-rt-linux-amd64.tar.gz
```

</TabItem>

<TabItem value="bsd">

```shell
tar -xvf questdb-{@version@}-rt-freebsd-amd64.tar.gz
```

</TabItem>

<TabItem value="windows">

```shell
tar -xvf questdb-{@version@}-rt-windows-amd64.tar.gz
```

</TabItem>

</Tabs>

## Next steps

Once you extracted the tarball, you are ready to use QuestDB. Navigate to our
[command-line options](/docs/reference/command-line-options/) page to learn more
about its usage.
