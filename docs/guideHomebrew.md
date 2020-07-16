---
id: guideHomebrew
title: How to use QuestDB with Homebrew
sidebar_label: Homebrew
---

This guide shows how to use Homebrew to install and start QuestDB. This is a
quick guide. For more reference, please refer to our
[Homebrew reference](homebrewReference.md)

## Installing Homebrew

If you already have homebrew installed, you can skip this part.

To install Homebrew, run the following.

```script title="Install Homebrew"
/bin/bash -c \
"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## Installing QuestDB

The below will install the `questdb` service.

```script title="Install QuestDB"
brew install questdb
```

## Starting QuestDB

Run the below to start the QuestDB service. The service will run in the
background.

```script title="Start QuestDB"
questdb start
```

This service will create the default `root directory` in
`/usr/local/var/questdb/`. For a reference of startup options, please refer to
our [Homebrew reference](homebrewReference.md).

:::note
QuestDB will start and run in the background and continue running even if you close the session. You will need to actively [stop it](#stop).
:::

## Status

You can use the following to get the status of the QuestDB service.

```script title="Get status"
questdb status
```

## Using QuestDB

Here are some guides to get started using the QuestDB service. These will show
you how to import data and run queries

- with the [HTTP API](guidePSQL.md)
- with [psql](guidePSQL.md) over Postgres wire protocol

## Stopping QuestDB

To stop the QuestDB service, simply run the following.

```script title="Stop QuestDB"
questdb stop
```

## Uninstalling QuestDB

To Uninstall the QuestDB service, run

```script title="Uninstall QuestDB"
questdb uninstall
```
