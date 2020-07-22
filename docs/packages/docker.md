---
title: Docker
---

Docker is a convenient method to have QuestDB running very quickly via simple
commands. QuestDB has images for Windows and Linux along with a manifest to
automatically download correct image for your target architecture.

:::info

You can find our docker repository
[here](https://hub.docker.com/r/questdb/questdb).

:::

## Supported platforms

- Linux
- Windows

## Pulling the image

### Latest

```script
docker pull questdb/questdb
```

### Specific tag

```script
docker pull questdb/questdb:5.0.0
```

## Using the image

You can use the Docker image in two ways:

- [Run as a container](#run-as-a-container)
- [Run as an interactive sandbox](#run-as-an-interactive-sandbox)

:::caution

The interactive sandbox will create a container on the fly and start it. Once
stopped, the container will be removed and the data deleted.

:::

## Run as a container

### Create a container

```script
docker create --name questdb -p 9000:9000 -p 8812:8812 questdb/questdb
```

If you would like to use a specific release tag, you can specify it as follows
when creating the container:

```script
docker create --name questdb -p 9000:9000 -p 8812:8812 questdb/questdb:5.0.0
```

### Options

| Option   | Comments                                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------------------------- |
| `--name` | Name of the container. e.g `--name myContainer`                                                                  |
| `-p`     | Allows Docker to map a port. e.g. `-p 9000:9000`.                                                                |
| `-v`     | Specify a path where QuestDB will save data, directly on the host machine. e.g `-v /local/dir:/root/.questdb/db` |

### -p ports

- `-p 9000:9000` for the REST API and the Web Console. The web console is
  available on [http://localhost:9000](http://localhost:9000)
- `-p 8812:8812` for the PostgreSQL wire protocol
- `-p 9009:9009` InfluxDB line protocol

### -v volumes

The QuestDB [root_directory](reference/root-directory-structure.md) will be in
the following locations.

| Container OS       | Volume              |
| ------------------ | ------------------- |
| Linux containers   | `/root/.questdb/db` |
| Windows containers | `c:\questdb\db`     |

### Start the container

```script
docker start questdb
```

### Stop the container

```script
docker stop questdb
```

### Display logs

```script
docker logs questdb
```

### Remove a container

```script
docker rm questdb
```

## Run as an interactive sandbox

You can run the container as an interactive sandbox with the `-it` option.

### Differences compared to running a container

- You do not need to create the container beforehand: it will be created on the
  fly.
- Logs will be displayed in the shell window.
- The container and all the data will be deleted when the container stops.

### Start the sandbox

```script
docker run --rm -it -p 9000:9000 -p 8812:8812 questdb/questdb
```

### Stop the sandbox

As the process will be running in shell, you can `CTRL + C` to stop it.

## Log into the container

You can log into the container and interact using `cmd` (if your container is
windows-based) or `bash` (if your container is Linux based). If you are using a
MacOS or Linux machine, this will also be `bash`. If you are using a Windows
machine, it could be either `cmd` or `bash` depending on what type of container
you are running.

**On Linux containers**

```script
docker exec -i questdb bash
```

**On Windows containers**

```script
docker exec -i questdb cmd
```

Once logged in, you can run commands into the container's VM.
