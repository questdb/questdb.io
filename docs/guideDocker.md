---
id: guideDocker
title: How to use QuestDB with Docker
sidebar_label: Docker
---

Docker is great to try new stuff and get started in minutes with just a few
commands. Follow this guide to set up and start using QuestDB from scratch. By
the end, you will be able to set up containers and be ready to send and query
data using the HTTP API and Postgres Wire protocol.

## Install Docker

Before we start, you will need to install Docker. You can find guides for your
platform [here](https://docs.docker.com/get-docker/). The linux page points to
several guides depending on your distribution (Fedora, Debian, Ubuntu, etc). For
Unix machines, this requires sudo rights.

## Pull the QuestDB image

With Docker installed, you need to pull the QuestDB image. The below command
will pull the latest image from our repository, which is updated with every
release.

```sql title="Pull the latest image"
docker pull questdb/questdb
```

## Create a container

`docker create` lets you create a container. In this guide, we mostly look at
the following two arguments. For a complete list, please refer to our
[Docker reference](dockerReference.md).

| argument | description                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------- |
| `--name` | name for your container                                                                                       |
| `-p`     | port to map. For the HTTP API and web console, open `9000:9000`. For Postgres wire protocol, open `8812:8812` |

The below will use the image you just pulled to create a container called
**questdb** with local port 9000 mapped to the container. This will open up the
HTTP API.

```sql title="Create a container"
docker create --name questdb -p 9000:9000 questdb/questdb
```

## Start the container

Now that you have created a container.

```sql title="Start the container"
docker start questdb
```

Here is what it looks like to start QuestDB on docker in just 3 commands

![docker gif](/img/doc/dockerCinema.gif)

You can check the status of your container with **docker ps**. It also lists the
ports we have mapped.

```sql title="Check existing containers"
docker ps
```

```shell script
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                              NAMES
2cc042a64a73        questdb/questdb     "/app/jre/bin/java -…"   14 seconds ago      Up 3 seconds        8892/tcp, 0.0.0.0:9000->9000/tcp   questdb
```

## Importing data and sending queries

Congratulations, you have a running QuestDB server. You can now start to
interact with it.

- If you opened port 9000, you can follow our [HTTP REST API](guidePSQL.md)
- If you mapped port `8812`, follow our [psql Guide](guidePSQL.md)

## Shut down and cleanup

As QuestDB is a persisted database, the data will remain after you shut down the
container. If you would like to remove the data, you can run the following to
drop the tables.

```sql title="Remove tables"
DROP TABLE trips;
DROP TABLE weather;
```

:::info
You can run QuestDB in Sandbox mode which will delete all data when the
container is stopped. Find out more in our
[Docker reference](dockerReference.md)
:::

You can then shut down and remove the container.

```sql title="Stop and remove the container"
docker stop questdb
docker rm questdb
```
