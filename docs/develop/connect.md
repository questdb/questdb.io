---
title: Connect
description:
  This page has instructions demonstrating how to connect to QuestDB from
  NodeJS, Java or Go. The examples show the Postgres and InfluxDB integrations.
---

This page shows how to connect to QuestDB using different programming languages
or tools.

## First things first

Make sure you have QuestDB running and accessible, you can do so from
[Docker](/docs/get-started/docker/), the [binaries](/docs/get-started/binaries/)
or [Homebrew](/docs/get-started/homebrew/) for macOS users.

## Postgres compatibility

You can query data using the [Postgres](/docs/reference/api/postgres/) endpoint
that QuestDB exposes. This is accessible via port `8812`.

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="nodejs" values={[
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
  { label: "psql", value: "psql" },
]}>


<TabItem value="nodejs">


```javascript
const { Client } = require("pg")

const start = async () => {
  const client = new Client({
    database: "qdb",
    host: "127.0.0.1",
    password: "quest",
    port: 8812,
    user: "admin",
  })
  await client.connect()
  console.log("Connected")
}

start()
```

</TabItem>


<TabItem value="go">


```go
package main

import (
	"database/sql"
	"fmt"
	"log"
	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 8812
	user     = "admin"
	password = "quest"
	dbname   = "qdb"
)

func main() {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	log.Println("Connected")
}
```

</TabItem>


<TabItem value="psql">


```shell
# With the client already installed locally
psql -h localhost -p 8812 -U admin -d qdb

# OR, with Docker (does not require locally installed client)
docker run -it --rm --network=host -e PGPASSWORD=quest postgres psql -h localhost -p 8812 -U admin -d qdb
```

</TabItem>


</Tabs>


## InfluxDB line protocol

QuestDB implements the [InfluxDB line protocol](/docs/reference/api/influxdb/),
this endpoint is accessible on port `9009`.

<Tabs defaultValue="nodejs" values={[
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
]}>


<TabItem value="nodejs">


```javascript
const net = require("net")

const client = new net.Socket()

const HOST = "localhost"
const PORT = 9009

function run() {
  client.connect(PORT, HOST, () => {
    console.log("Connected")
  })
}

run()
```

</TabItem>


<TabItem value="go">


```go
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net"
	"time"
)

func main() {
	host := "127.0.0.1:9009"
	tcpAddr, err := net.ResolveTCPAddr("tcp4", host)
	checkErr(err)

	conn, err := net.DialTCP("tcp", nil, tcpAddr)
	checkErr(err)
	log.Println("Connected")
	defer conn.Close()
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
```

</TabItem>


</Tabs>
