---
title: Binaries
---

QuestDB comes with an executable `questdb.exe` for Windows, and script
`questdb.sh` for MacOS and Linux which can be used to control QuestDB as a
service. On Windows, QuestDB can also be
[started interactively](#use-interactively-windows).

## Available commands

```questdb-sql title="Linux & MacOS"
./questdb.sh [start|stop|status] [-d dir] [-f] [-t tag]
```

```questdb-sql title="Windows"
questdb.exe [start|stop|status|install|remove] \
  [-d dir] [-f] [-j JAVA_HOME] [-t tag]
```

| Command             | Description                                                                                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [start](#start)     | Starts Windows service. Default service name is `QuestDB`                                                                                                                     |
| [stop](#stop)       | Stops Windows service                                                                                                                                                         |
| [status](#status)   | Shows service status. This command is useful for troubleshooting problems with the service. It prints `RUNNING` or `INACTIVE` if the service is start or stopped respectively |
| [install](#install) | Install the Windows service                                                                                                                                                   |
| [remove](#remove)   | Remove the Windows service                                                                                                                                                    |

### Start

`start` - starts the QuestDB service.

```questdb-sql title="Linux & MacOS"
./questdb.sh start
```

```questdb-sql title="Windows"
questdb.exe start
```

:::info

QuestDB will start and run in the background and continue running even if you
close the session. You will need to actively [stop it](#stop).

:::

#### Default directories

By default, QuestDB [root directory](reference/root-directory-structure.md) will
be the following

```script title="Linux"
$HOME/.questdb
```

```script title="MacOS"
/usr/local/var/questdb/
```

```script title="Windows"
C:\Windows\System32\questdb
```

#### Options

- `-d` - specify QuestDB's `root_directory`.
- `-f` - force reload the Web Console. The Web Console is cached otherwise and
  the HTML page will not be reloaded automatically in case it has been changed.
- `-j (Windows only)` - path to JAVA_HOME
- `-t` - specify a service tag. You can use this option to run several services
  and administer them separately.

:::tip

The tag option, `-t`, can be used to start and manipulate independent QuestDB
services. Each can be started, stopped etc using its own service tag name.

:::

#### Examples

```questdb-sql title="Linux & MacOS - custom root_directory"
./questdb.sh start -d '/home/user/my_new_root_directory'
```

```questdb-sql title="Windows - custom root_directory"
questdb.exe start -d 'C:\Users\user\my_new_root_directory'
```

```questdb-sql title="Windows - custom JAVA_HOME"
questdb.exe start -j 'C:\Program Files\Java\jdk1.8.0_141'
```

### Stop

`stop` - stops the default `questdb` service, or the service specified with the
`-t` option.

#### Examples

```questdb-sql title="Windows"
questdb.exe stop
```

```questdb-sql title="Linux & MacOS - specific tag"
./questdb.sh stop -t 'my-questdb-service'
```

### Status

`status` shows service status. This command is useful for troubleshooting
problems with the service. It prints `Running` or `Not running` if the service
is start or stopped respectively. On Unix systems, it also prints the `PID`

#### Examples

```questdb-sql title="Linux & MacOS"
./questdb.sh status
```

```questdb-sql title="Windows - specific tag"
questdb.exe status -t 'my-questdb-service'
```

### Install

`install` - installs the Windows QuestDB service. It will start automatically at
startup.

:::note

`install` is only available on Windows.

:::

#### Examples

```questdb-sql title="Default service"
questdb.exe install
```

```questdb-sql title="Specific tag"
questdb.exe install -t 'my-questdb-service'
```

### Remove

`remove` - removes the Windows QuestDB service. It will no longer start at
startup.

:::note

`remove` is only available on Windows.

:::

#### Examples

```questdb-sql title="Default service"
questdb.exe remove
```

```questdb-sql title="Specific tag"
questdb.exe remove -t 'my-questdb-service'
```

## Use interactively (Windows)

You can start QuestDB interactively by running `questdb.exe`.

#### Behaviour

This will launch QuestDB interactively in the active `Shell` window. QuestDB
will be stopped when the Shell is closed.

#### Default directory

When started interactively, QuestDB's root directory defaults to the `current`
directory.

#### Start

To start, run the following.

```questdb-sql title="Start"
questdb.exe
```

#### Stop

To stop, simply press <kbd>Ctrl</kbd>+<kbd>C</kbd> in the Shell window or close
it.
