---
title: Docker
---

QuestDB has images for both Linux/macOS and Windows on
[Docker Hub]({@dockerUrl@}).

## Install Docker

Please follow the [official documentation](https://docs.docker.com/get-docker/).

## Using the image

If you never fetched QuestDB's image, you can run:

```shell
docker run -p 9000:9000 -p 8812:8812 questdb/questdb
```

If you want to make sure that you are running the latest version:

```shell
docker run -p 9000:9000 -p 8812:8812 questdb/questdb:latest
```

### Options

| Argument | Description                 |
| -------- | --------------------------- |
| `-p`     | Port to publish to the host |
| `-v`     | To bind mount a volume      |

#### -p ports

- `-p 9000:9000` for the REST API and the Web Console. The web console is
  available on [http://localhost:9000](http://localhost:9000)
- `-p 8812:8812` for the Postgres wire protocol
- `-p 9009:9009` InfluxDB line protocol

#### -v volumes

The QuestDB
[root_directory](reference/configuration/root-directory-structure.md) will be in
the following location:

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="nix" values={[
  { label: "Linux & macOS", value: "nix" },
  { label: "Windows", value: "windows" },
]}>

<TabItem value="nix">

```shell
/root/.questdb/db
```

</TabItem>

<TabItem value="windows">

```shell
C:\questdb\db
```

</TabItem>

</Tabs>
