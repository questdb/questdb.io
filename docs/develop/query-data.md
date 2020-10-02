---
title: Query data
description:
  This page has instructions demonstrating how to query data from QuestDB with
  NodeJS, Java, Go or cURL. The examples show the REST API as well as the
  InfluxDB and Postgres integrations.
---

This page shows how to query data from QuestDB using different programming
languages or tools.

## First things first

Make sure you have QuestDB running and accessible, you can do so from
[Docker](/docs/get-started/docker/), the [binaries](/docs/get-started/binaries/)
or [Homebrew](/docs/get-started/homebrew/) for macOS users.

## REST API

You can query data using the [REST API](/docs/reference/api/rest/), this will
work with a very wide range of libraries and tools. The REST API is accessible
on port `9000`.

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="curl" values={[
  { label: "cURL", value: "curl" },
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
]}>


<TabItem value="curl">


```shell
curl -G \
  --data-urlencode "query=SELECT x FROM long_sequence(5);" \
  http://localhost:9000/exec
```

</TabItem>


<TabItem value="nodejs">


```javascript
const fetch = require("node-fetch")
const qs = require("querystring")

const HOST = "http://localhost:9000"

async function run() {
  try {
    const queryData = {
      query: "SELECT x FROM long_sequence(5);",
    }

    const response = await fetch(`${HOST}/exec?${qs.encode(queryData)}`)
    const json = await response.json()

    console.log(json)
  } catch (error) {
    console.log(error)
  }
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
	"net/http"
	"net/url"
)

func main() {
	u, err := url.Parse("http://localhost:9000")
	checkErr(err)

	u.Path += "exec"
	params := url.Values{}
	params.Add("query", "SELECT x FROM long_sequence(5);")
	u.RawQuery = params.Encode()
	url := fmt.Sprintf("%v", u)

	res, err := http.Get(url)
	checkErr(err)

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	checkErr(err)

	log.Println(string(body))
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
```

</TabItem>


</Tabs>


## Postgres compatibility

You can query data using the [Postgres](/docs/reference/api/postgres/) endpoint
that QuestDB exposes. This is accessible via port `8812`.

<Tabs defaultValue="nodejs" values={[
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
]}>


<TabItem value="nodejs">


```javascript
const { Client } = require("pg")

const start = async () => {
  try {
    const client = new Client({
      database: "qdb",
      host: "127.0.0.1",
      password: "quest",
      port: 8812,
      user: "admin",
    })
    await client.connect()

    const res = await client.query("SELECT x FROM long_sequence(5);")

    console.log(res.rows)

    await client.end()
  } catch (e) {
    console.log(e)
  }
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
	checkErr(err)
	defer db.Close()

	rows, err := db.Query("SELECT x FROM long_sequence(5);")
	checkErr(err)
	defer rows.Close()

	for rows.Next() {
		var num string
		err = rows.Scan(&num)
		checkErr(err)
		fmt.Println(num)
	}

	err = rows.Err()
	checkErr(err)
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
```

</TabItem>


</Tabs>
