---
title: How to use QuestDB with Docker
sidebar_label: Docker
description:
  Tutorial showing how to use QuestDB with Docker. This also covers how to
  import data as well as persistence.
---

Docker is great to get started in minutes with just a few commands. Follow this
guide to set up and start QuestDB. By the end, you will be able to send and
query data using the REST API and/or Postgres wire protocol.

## Install Docker

Before we start, you will need to install Docker. You can find guides for your
platform [on the official documentation](https://docs.docker.com/get-docker/).

## QuestDB image

With Docker installed, you will need to pull QuestDB's image and create a
container. You can do both in one command using `docker run`:

```shell
docker run -p 9000:9000 -p 8812:8812 questdb/questdb
```

### `-p` parameter

This parameter will publish a port to the host, you can specify:

- `-p 9000:9000` for the REST API and the Web Console. The web console is
  available on http://localhost:9000
- `-p 8812:8812` for the Postgres wire protocol
- `-p 9009:9009` InfluxDB line protocol

## Container status

You can check the status of your container with **docker ps**. It also lists the
ports we published:

```shell
docker ps
```

```shell title="Result"
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
dd363939f261        questdb/questdb     "/app/bin/java -m io…"   3 seconds ago       Up 2 seconds        8812/tcp, 9000/tcp   frosty_gauss
```

## Importing data and sending queries

🎉 Congratulations, you have a running QuestDB server. You can now start to
interact with it:

- If you published the port `9000`, you can follow our [REST guide](rest.md)
- If you published the port `8812`, follow our
  [Postgres wire guide](/docs/guide/postgres-wire/)

## Data persistence

### Restart an existing container

When you stop the container, it will not be removed by Docker. This means that
you can restart it anytime and your data will be accessible:

```shell title="Start container from the  ID obtained with 'docker ps'"
docker start dd363939f261
```

### Re-run `docker run`

If you re-run the command:

```shell
docker run -p 9000:9000 -p 8812:8812 questdb/questdb
```

A new container will be created for the QuestDB image. This means that the
container will be fresh, any data you may have created previously won't be
accessible.
