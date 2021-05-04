---
title: Get started with QuestDB via Docker
sidebar_label: Docker
description:
  Guide showing how to use QuestDB with Docker. This also covers how to import
  data as well as persistence.
---

QuestDB has images for both Linux/macOS and Windows on
[Docker Hub]({@dockerUrl@}).

## Install Docker

Before we start, you will need to install Docker. You can find guides for your
platform on the [official documentation](https://docs.docker.com/get-docker/).

## QuestDB image

Once Docker is installed, you will need to pull QuestDB's image from
[Docker Hub]({@dockerUrl@}) and create a container. You can do both in one
command using `docker run`:

```shell
docker run -p 9000:9000 -p 8812:8812 questdb/questdb
```

### Options

| Argument | Description                 |
| -------- | --------------------------- |
| `-p`     | Port to publish to the host |
| `-v`     | To bind mount a volume      |

#### `-p` parameter

This parameter will publish a port to the host, you can specify:

- `-p 9000:9000`: [REST API](/docs/reference/api/rest/) and
  [Web Console](/docs/reference/web-console/)
- `-p 8812:8812`: [Postgres](/docs/reference/api/postgres/)
- `-p 9009:9009`: [InfluxDB line protocol](/docs/reference/api/influxdb/)

#### -v volumes

The QuestDB [root_directory](/docs/concept/root-directory-structure/) will be in
the following location:

<!-- prettier-ignore-start -->

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="linux" values={[
  { label: "Linux", value: "linux" },
  { label: "Windows", value: "windows" },
]}>

<!-- prettier-ignore-end -->

<TabItem value="linux">

```shell
/root/.questdb
```

</TabItem>

<TabItem value="windows">

```shell
C:\questdb
```

</TabItem>

</Tabs>

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

Now that QuestDB is running, you can start interacting with it:

- If you published the port `9000`, you can follow our
  [REST](/docs/reference/api/rest/) page
- If you published the port `8812`, follow our
  [Postgres](/docs/reference/api/postgres/) page
- If you published the port `9009`, follow our
  [InfluxDB](/docs/reference/api/influxdb/) page

## Data persistence

### Mounting a volume

Volumes can be mounted to the QuestDB Docker container so that data may be
persisted or server configuration settings may be passed to an instance. The
following example demonstrated how to mount the current directory to a QuestDB
container using the `-v` flag in a Docker `run` command:

```bash
docker run -p 9000:9000 -p 8812:8812 -v "$(pwd):/root/.questdb/" questdb/questdb
```

The current directory will then have data persisted to disk for convenient
migration or backups:

```bash title="Current directory contents"
├── conf
│   └── server.conf
├── db
└── public
```

For details on passing QuestDB server settings to a Docker container, see the
[Docker section](/docs/reference/configuration/#docker) of the server
configuration documentation.

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
