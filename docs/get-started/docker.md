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
docker run -p 9000:9000 \
 -p 9009:9009 \
 -p 8812:8812 \
 -p 9003:9003 \
 questdb/questdb
```

### Options

| Argument | Description                 |
| -------- | --------------------------- |
| `-p`     | Port to publish to the host |
| `-v`     | To bind mount a volume      |

#### `-p` parameter

This parameter will publish a port to the host, you can specify:

- `-p 9000:9000` - [REST API](/docs/reference/api/rest/) and
  [Web Console](/docs/reference/web-console/)
- `-p 9009:9009` - [InfluxDB line protocol](/docs/reference/api/influxdb/)
- `-p 8812:8812` - [Postgres wire protocol](/docs/reference/api/postgres/)
- `-p 9003:9003` -
  [Min health server](/docs/reference/configuration/#minimal-http-server)

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
docker run -p 9000:9000 \
 -p 9009:9009 \
 -p 8812:8812 \
 -p 9003:9003 \
 -v "$(pwd):/root/.questdb/" questdb/questdb
```

The current directory will then have data persisted to disk for convenient
migration or backups:

```bash title="Current directory contents"
├── conf
│   └── server.conf
├── db
└── public
```

For details on passing QuestDB server settings to a Docker container, see the
[Docker section](/docs/reference/configuration/#docker) of the server
configuration documentation.

### Writing logs to disk

When mounting a volume to a Docker container, a logging configuration file may
be provided in the container located at `/conf/log.conf`:

```bash title="Current directory contents"
└── conf
    ├── log.conf
    └── server.conf
```

For example, a file with the following contents can be created:

```shell title="./conf/log.conf"
# list of configured writers
writers=file,stdout,http.min

# file writer
w.file.class=io.questdb.log.LogFileWriter
w.file.location=questdb-docker.log
w.file.level=INFO,ERROR,DEBUG

# stdout
w.stdout.class=io.questdb.log.LogConsoleWriter
w.stdout.level=INFO

# min http server, used monitoring
w.http.min.class=io.questdb.log.LogConsoleWriter
w.http.min.level=ERROR
w.http.min.scope=http-min-server
```

The current directory can be mounted:

```shell title="Mounting the current directory to a QuestDB container"
docker run -p 9000:9000 \
 -p 9009:9009 \
 -p 8812:8812 \
 -p 9003:9003 \
 -v "$(pwd):/root/.questdb/" questdb/questdb
```

The container logs will be written to disk using the logging level and file name
provided in the `conf/log.conf` file, in this case in `./questdb-docker.log`:

```shell title="Current directory tree"
├── conf
│  ├── log.conf
│  └── server.conf
├── db
│  ├── table1
│  └── table2
├── public
│  ├── ui / assets
│  ├── ...
│  └── version.txt
└── questdb-docker.log
```

For more information on logging, see the
[configuration reference documentation](/docs/reference/configuration/#logging).

### Restart an existing container

Running the following command will create a new container for the QuestDB image:

```shell
docker run -p 9000:9000 \
 -p 9009:9009 \
 -p 8812:8812 \
 -p 9003:9003 \
 questdb/questdb
```

By giving the container a name with `--name container_name`, we have an easy way
to refer to the container created by run later on:

```shell
docker run -p 9000:9000 \
 -p 9009:9009 \
 -p 8812:8812 \
 -p 9003:9003 \
 --name docker_questdb \
 questdb/questdb
```

If we want to re-use this container and its data after it has been stopped, we
can use the following commands:

```shell
# bring the container up
docker start docker_questdb
# shut the container down
docker stop docker_questdb
```

Alternatively, users can obtain a running container's ID with 'docker ps' and
restart it using the
[UUID short identifier](https://docs.docker.com/engine/reference/run/#name---name):

```shell title="Starting a container by ID"
docker start dd363939f261
```
