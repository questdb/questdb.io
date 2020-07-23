---
title: Homebrew
sidebar_label: Homebrew
---

QuestDB is distributed via Homebrew for macOS users.

## Setup

Follow the steps below to install and uninstall QuestDB:

```shell
brew install questdb
```

```shell
brew uninstall questdb
```

## Root directory

By default, QuestDB's [root directory](reference/root-directory-structure.md)
will be the following:

```shell
/usr/local/var/questdb/
```

## Using QuestDB

```shell
questdb [start|stop|status] [-d dir] [-f] [-t tag]
```

| Command           | Description                                                                                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [start](#start)   | Starts the service. Default service name is `QuestDB`                                                                                                                         |
| [stop](#stop)     | Stops the service                                                                                                                                                             |
| [status](#status) | Shows service status. This command is useful for troubleshooting problems with the service. It prints `RUNNING` or `INACTIVE` if the service is start or stopped respectively |

### Start

`start` - starts the QuestDB service.

```shell
questdb start
```

QuestDB will start and run in the background and continue running even if you
close the session. You will need to actively [stop it](#stop).

#### Options

- `-d` - specify QuestDB's `root_directory`.
- `-f` - force reload the Web Console. The Web Console is cached otherwise and
  the HTML page will not be reloaded automatically in case it has been changed.
- `-t` - specify a service tag. You can use this option to run several services
  and administer them separately.

```shell title="Example with -d and -t"
questdb start -d '/home/user/my_new_root_directory' -t 'mytag'
```

### Stop

`stop` - stops the default `questdb` service, or the service specified with the
`-t` option.

### Examples

```shell title="Stop the default service"
questdb stop
```

```shell title="Stop a specific service"
questdb stop -t 'my-questdb-service'
```

### Status

`status` shows service status. This command is useful for troubleshooting
problems with the service. It prints `Running` or `Not running` if the service
is start or stopped respectively. On \*nix operating systems, it also prints the
`PID`.

### Examples

```shell title="Default service"
questdb status
```

```shell title="Specific service"
questdb status -t 'my-questdb-service'
```
