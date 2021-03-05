---
title: Command-line options
description: Command-line options reference documentation.
---

QuestDB may be started, stopped and passed configuration options from the
command line. On Windows, the QuestDB server can also start an
[interactive session](#interactive-session-windows).

## Options

The following sections describe the options that may be passed to QuestDB when
starting the server from the command line.

<!-- prettier-ignore-start -->

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="nix" 
values={[ 
  { label: "Linux/FreeBSD", value: "nix" }, 
  { label: "macOS (Homebrew)", value: "macos" }, 
  { label: "Windows", value: "windows" },
]}>

<!-- prettier-ignore-end -->

<TabItem value="nix">

```shell
./questdb.sh [start|stop|status] [-d dir] [-f] [-t tag]
```

</TabItem>

<TabItem value="macos">

```shell
questdb [start|stop|status] [-d dir] [-f] [-t tag]
```

</TabItem>

<TabItem value="windows">

```shell
questdb.exe [start|stop|status|install|remove] \
  [-d dir] [-f] [-j JAVA_HOME] [-t tag]
```

</TabItem>

</Tabs>

### Start

`start` - starts QuestDB as a service.

| Option | Description                                                                                                                                                                                                          |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-d`   | Expects a `dir` directory value which is a folder that will be used as QuestDB's root directory. For more information and the default values, see the [default root](#default-root-directory) section below.         |
| `-t`   | Expects a `tag` string value which will be as a tag for the service. This option allows users to run several QuestDB services and manage them separately. If this option omitted, the default tag will be `questdb`. |
| `-f`   | Force re-deploying the Web Console. Without this option, the Web Console is cached and deployed only when missing.                                                                                                   |
| `-j`   | **Windows only!** This option allows to specify a path to `JAVA_HOME`.                                                                                                                                               |

<!-- prettier-ignore-start -->


<Tabs defaultValue="nix" 
values={[ 
  { label: "Linux/FreeBSD", value: "nix" }, 
  { label: "macOS (Homebrew)", value: "macos" }, 
  { label: "Windows", value: "windows" },
]}>

<!-- prettier-ignore-end -->

<TabItem value="nix">

```shell
./questdb.sh start [-d dir] [-f] [-t tag]
```

</TabItem>

<TabItem value="macos">

```shell
questdb start [-d dir] [-f] [-t tag]
```

</TabItem>

<TabItem value="windows">

```shell
questdb.exe start [-d dir] [-f] [-j JAVA_HOME] [-t tag]
```

</TabItem>

</Tabs>

#### Default root directory

By default, QuestDB's [root directory](/docs/concept/root-directory-structure/)
will be the following:

<!-- prettier-ignore-start -->

<Tabs defaultValue="nix" values={[
  { label: "Linux/FreeBSD", value: "nix" },
  { label: "macOS (Homebrew)", value: "macos" },
  { label: "Windows", value: "windows" },
]}>

<!-- prettier-ignore-end -->

<TabItem value="nix">

```shell
$HOME/.questdb
```

</TabItem>

<TabItem value="macos">

```shell
/usr/local/var/questdb
```

</TabItem>

<TabItem value="windows">

```shell
C:\Windows\System32\questdb
```

</TabItem>

</Tabs>

### Stop

`stop` - stops a service.

| Option | Description                                                                                                        |
| ------ | ------------------------------------------------------------------------------------------------------------------ |
| `-t`   | Expects a `tag` string value which to stop a service by tag. If this is omitted, the default tag will be `questdb` |

<!-- prettier-ignore-start -->

<Tabs defaultValue="nix" values={[
  { label: "Linux/FreeBSD", value: "nix" },
  { label: "macOS (Homebrew)", value: "macos" },
  { label: "Windows", value: "windows" },
]}>

<!-- prettier-ignore-end -->

<TabItem value="nix">

```shell
./questdb.sh stop
```

</TabItem>

<TabItem value="macos">

```shell
questdb stop
```

</TabItem>

<TabItem value="windows">

```shell
questdb.exe stop
```

</TabItem>

</Tabs>

### Status

`status` - shows the status for a service.

| Option | Description                                                                                                    |
| ------ | -------------------------------------------------------------------------------------------------------------- |
| `-t`   | Expects a `tag` string value which to stop a service by tag. If this is omitted, the default will be `questdb` |

<!-- prettier-ignore-start -->

<Tabs defaultValue="nix" values={[
  { label: "Linux/FreeBSD", value: "nix" },
  { label: "macOS (Homebrew)", value: "macos" },
  { label: "Windows", value: "windows" },
]}>

<!-- prettier-ignore-end -->

<TabItem value="nix">

```shell
./questdb.sh status
```

</TabItem>

<TabItem value="macos">

```shell
questdb status
```

</TabItem>

<TabItem value="windows">

```shell
questdb.exe status
```

</TabItem>

</Tabs>

### Install (Windows)

`install` - installs the Windows QuestDB service. The service will start
automatically at startup.

```shell
questdb.exe install
```

### Remove (Windows)

`remove` - removes the Windows QuestDB service. It will no longer start at
startup.

```shell
questdb.exe remove
```

## Interactive session (Windows)

You can start QuestDB interactively by running `questdb.exe`. This will launch
QuestDB interactively in the active `Shell` window. QuestDB will be stopped when
the Shell is closed.

### Default root directory

When started interactively, QuestDB's root directory defaults to the `current`
directory.

### Stop

To stop, press <kbd>Ctrl</kbd>+<kbd>C</kbd> in the terminal or close it
directly.
