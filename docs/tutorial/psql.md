---
title: PSQL tutorial
sidebar_label: PSQL
description: Tutorial showing how to connect to QuestDB using the psql CLI
---

This tutorial shows how to interact with QuestDB using the
[psql CLI](https://www.postgresql.org/docs/12/app-psql.html).

## Dependency

Make sure psql is installed locally. Alternatively, you can
[use Docker](https://hub.docker.com/_/postgres).

## Run

### Local

```shell
psql -h localhost -p 8812 -U admin -d qdb
```

When prompted, the password is `quest`.

### Docker

In 1 line, without installing Postgres locally:

```shell
docker run -it --rm --network=host -e PGPASSWORD=quest postgres psql -h localhost -p 8812 -U admin -d qdb
```
