---
title: How to use QuestDB with Homebrew
sidebar_label: Homebrew
description: Tutorial showing how to use QuestDB with Homebrew on macOS.
---

This guide shows how to use Homebrew to install and start QuestDB. This is a
quick guide. For more reference, please refer to our
[Homebrew package](/docs/packages/homebrew/).

## Installing Homebrew

If you already have Homebrew installed, you can skip this part.

To install Homebrew, run the following.

```shell title="Install Homebrew"
/bin/bash -c \
"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## Installing QuestDB

The command below will install the `questdb` service.

```shell
brew install questdb
```

## Starting QuestDB

Run the below to start the QuestDB service. The service will run in the
background.

```shell
questdb start
```

This service will create the default `root directory` in
`/usr/local/var/questdb/`. For a reference of startup options, please refer to
our [Homebrew package](/docs/packages/homebrew/).

:::note

QuestDB will start and run in the background and continue running even if you
close the session. You will need to actively [stop it](#stopping-questdb).

:::

## Status

You can use the following to get the status of the QuestDB service:

```shell
questdb status
```

## Using QuestDB

Here are some guides to get started using the QuestDB service. These will show
you how to import data and run queries:

- with [REST](/docs/guide/rest/)
- with [Postgres wire](/docs/guide/postgres-wire/)

## Stopping QuestDB

To stop the QuestDB service, run the following:

```shell
questdb stop
```

## Uninstalling QuestDB

To uninstall the QuestDB service, run:

```shell
questdb uninstall
```
