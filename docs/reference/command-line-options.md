---
title: Command-line options
description: Command-line options reference documentation.
---

QuestDB may be started, stopped and passed several configuration options from
the command line. On Windows, QuestDB can also be
[started interactively](#use-interactively-windows).

## Options

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

`start` - starts a service.

| Option              | Description                                                                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `-d root_directory` | Specify QuestDB's root directory. See [below](#default-root-directory) for the default values.                                                |
| `-t my-tag`         | Specify a service tag. You can use this option to run several services and manage them separately. If omitted, the default will be `questdb`. |
| `-f`                | Force re-deploying the Web Console. Without this option, the Web Console is cached deployed only when missing.                                |
| `-j (Windows only)` | Specify a path to `JAVA_HOME`.                                                                                                                |

<Tabs defaultValue="nix" values={[ { label: "Linux/FreeBSD", value: "nix" }, {
label: "macOS (Homebrew)", value: "macos" }, { label: "Windows", value:
"windows" }, ]}>

<TabItem value="nix">

```shell
./questdb.sh start
```

</TabItem>

<TabItem value="macos">

```shell
questdb start
```

</TabItem>

<TabItem value="windows">

```shell
questdb.exe start
```

</TabItem>

</Tabs>

#### Default root directory

By default, QuestDB's [root directory](/docs/concept/root-directory-structure/)
will be the following:

<Tabs defaultValue="nix" values={[ { label: "Linux/FreeBSD", value: "nix" }, {
label: "macOS", value: "macos" }, { label: "Windows", value: "windows" }, ]}>

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

| Option | Description                                                      |
| ------ | ---------------------------------------------------------------- |
| `-t`   | Specify a service tag, if omitted, the default will be `questdb` |

<Tabs defaultValue="nix" values={[ { label: "Linux/FreeBSD", value: "nix" }, {
label: "macOS", value: "macos" }, { label: "Windows", value: "windows" }, ]}>

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

| Option | Description                                                      |
| ------ | ---------------------------------------------------------------- |
| `-t`   | Specify a service tag, if omitted, the default will be `questdb` |

<Tabs defaultValue="nix" values={[ { label: "Linux/FreeBSD", value: "nix" }, {
label: "macOS", value: "macos" }, { label: "Windows", value: "windows" }, ]}>

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

### Install

`install` - installs the Windows QuestDB service. It will start automatically at
startup. This command is only available on Windows.

```shell
questdb.exe install
```

### Remove

`remove` - removes the Windows QuestDB service. It will no longer start at
startup. This command is only available on Windows.

```shell
questdb.exe remove
```

## Use interactively (Windows)

You can start QuestDB interactively by running `questdb.exe`.

### Behaviour

This will launch QuestDB interactively in the active `Shell` window. QuestDB
will be stopped when the Shell is closed.

### Default root directory

When started interactively, QuestDB's root directory defaults to the `current`
directory.

### Stop

To stop, press <kbd>Ctrl</kbd>+<kbd>C</kbd> in the terminal or close it
directly.
