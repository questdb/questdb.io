---
title: Get started with QuestDB via Homebrew (macOS)
sidebar_label: Homebrew
description:
  A short guide for getting started with installing and running QuestDB via
  Homebrew on macOS.
---

Each software release of QuestDB is distributed via the
[Homebrew](https://brew.sh/) package manager.

## Install Homebrew

Users who already have Homebrew installed may skip this section and proceed to
[Install QuestDB](#install-questdb). Otherwise, Homebrew can be installed by
running the official
[installation script](https://github.com/Homebrew/install/blob/master/install.sh)
via bash:

```shell
/bin/bash -c \
"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## Install QuestDB

To install QuestDB via Homebrew, run the following command:

```shell
brew install questdb
```

On macOS, the root directory of QuestDB including
[server configuration](/docs/reference/configuration) files are located in the
following directory:

```bash
/usr/local/var/questdb
├── conf
├── db
├── log
└── public
```

## Uninstall QuestDB

To remove QuestDB, use Homebrew's `uninstall` command:

```shell
questdb uninstall
```

## Troubleshooting Homebrew issues

It's recommended to first run `update` before trying to install packages or
diagnose errors:

```shell
brew update
```

Homebrew comes with a basic diagnostic command which can help find
inconsistencies with system settings and permissions. This command will exit
with a non-zero status if any potential problems are found:

```shell
brew doctor
```

## Next steps

Once you installed the QuestDB with Homebrew, you can navigate to our
[command-line options](/docs/reference/command-line-options/) page to learn more
about its usage.
