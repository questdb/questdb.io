---
title: Insert data
description:
  This page has instructions demonstrating how to insert into QuestDB from
  NodeJS, Java, Go or cURL. The examples show the REST API as well as the
  InfluxDB integration.
---

This page shows how to insert data into QuestDB using different programming
languages or tools.

## First things first

Make sure you have QuestDB running and accessible, you can do so from
[Docker](/docs/get-started/docker/), the [binaries](/docs/get-started/binaries/)
or [Homebrew](/docs/get-started/homebrew/) for macOS users.

## REST API

You can query data using the [REST API](/docs/reference/api/rest/), this will
work with a very wide range of libraries and tools. The REST API is accessible
on port `9000`.

### `/imp` endpoint

Using the `/imp` endpoint will allow you to import a CSV file directly.

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="curl" values={[
  { label: "cURL", value: "curl" },
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
]}>


<TabItem value="curl">


```shell
curl -F data=@data.csv http://localhost:9000/imp
```

</TabItem>


<TabItem value="nodejs">


```javascript
const fetch = require("node-fetch")
const FormData = require("form-data")
const fs = require("fs")
const qs = require("querystring")

const HOST = "http://localhost:9000"

async function run() {
  const form = new FormData()

  form.append("data", fs.readFileSync(__dirname + "/data.csv"), {
    filename: fileMetadata.name,
    contentType: "application/octet-stream",
  })

  try {
    const r = await fetch(`${HOST}/imp`, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    })

    console.log(r)
  } catch (e) {
    console.error(e)
  }
}

run()
```

</TabItem>


<TabItem value="go">


```go
package main

import (
	"bytes"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"net/url"
	"os"
)

func main() {
	u, err := url.Parse("http://localhost:9000")
	checkErr(err)
	u.Path += "imp"
	url := fmt.Sprintf("%v", u)
	fileName := "/path/to/data.csv"
	file, err := os.Open(fileName)
	checkErr(err)

	defer file.Close()

	buf := new(bytes.Buffer)
	writer := multipart.NewWriter(buf)
	uploadFile, _ := writer.CreateFormFile("data", "data.csv")
	_, err = io.Copy(uploadFile, file)
	checkErr(err)
	writer.Close()

	req, err := http.NewRequest(http.MethodPut, url, buf)
	checkErr(err)
	req.Header.Add("Content-Type", writer.FormDataContentType())

	client := &http.Client{}
	res, err := client.Do(req)
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


### `/query` endpoint

Otherwise you can use `/query` and execute an `INSERT` statement.

<Tabs defaultValue="curl" values={[
  { label: "cURL", value: "curl" },
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
]}>


<TabItem value="curl">


```shell
curl -G \
  --data-urlencode "query=INSERT INTO trades VALUES('abc', 123456);" \
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
      query: `
        INSERT INTO
          trades
        VALUES(
          "abc",
          123456
        );
      `,
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
	params.Add("query", `
	  INSERT INTO
	    test
	  VALUES(
	    "abc",
	    123456
	  );
	`)
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
    const rows = [
      `test,location=uk temperature=12.4 ${Date.now() * 1e6}`,
      `test,location=uk temperature=11.4 ${Date.now() * 1e6}`,
    ]

    rows.forEach((row) => {
      client.write(`${row}\n`)
    })

    client.destroy()
  })

  client.on("data", function (data) {
    console.log("Received: " + data)
  })

  client.on("close", function () {
    console.log("Connection closed")
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
	"net"
	"time"
)

func main() {
	host := "127.0.0.1:9009"
	tcpAddr, err := net.ResolveTCPAddr("tcp4", host)
	checkErr(err)
	rows := [2]string{
		fmt.Sprintf("test,location=uk temperature=12.4 %d", time.Now().UnixNano()),
		fmt.Sprintf("test,location=uk temperature=11.4 %d", time.Now().UnixNano()),
	}

	conn, err := net.DialTCP("tcp", nil, tcpAddr)
	checkErr(err)
	defer conn.Close()

	for _, s := range rows {
		_, err = conn.Write([]byte(fmt.Sprintf("%s\n", s)))
		checkErr(err)
	}

	result, err := ioutil.ReadAll(conn)
	checkErr(err)

	fmt.Println(string(result))
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
  { label: "Java", value: "java" },
  { label: "C", value: "c" },
  { label: "Python", value: "python" },
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

    const res = await client.query("INSERT INTO test VALUES($1, $2);", [
      "abc",
      "123",
    ])

    console.log(res)

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
        if err != nil {
                panic(err)
        }
        defer db.Close()

        rows, err := db.Query("insert into x values ('abc', 123)")
        checkErr(err)
        defer rows.Close()
        fmt.Println("Done")
}

func checkErr(err error) {
        if err != nil {
                panic(err)
        }
}

```

</TabItem>

<TabItem value="java">

```java
package com.myco;

import java.sql.*;
import java.util.Properties;

class App {
  public static void main(String[] args) throws SQLException {
    Properties properties = new Properties();
    properties.setProperty("user", "admin");
    properties.setProperty("password", "quest");
    properties.setProperty("sslmode", "disable");

    final Connection connection = DriverManager.getConnection("jdbc:postgresql://localhost:8812/qdb", properties);
    try (PreparedStatement preparedStatement = connection.prepareStatement("insert into x (id, ref) values (?, ?)")) {
      preparedStatement.setString(1, "abc");
      preparedStatement.setInt(2, 123);
      preparedStatement.execute();
    }
    System.out.println("Done");
    connection.close();
  }
}

```

</TabItem>


<TabItem value="c">

```c
// compile with
// g++ libpq_example.c -o libpq_example.exe  -I pgsql\include -L dev\pgsql\lib
// -std=c++17  -lpthread -lpq
#include <libpq-fe.h>
#include <stdio.h>
#include <stdlib.h>
void do_exit(PGconn *conn) {
    PQfinish(conn);
    exit(1);
}
int main() {
    PGconn *conn = PQconnectdb(
            "host=localhost user=admin password=quest port=8812 dbname=testdb");
    if (PQstatus(conn) == CONNECTION_BAD) {
        fprintf(stderr, "Connection to database failed: %s\n",
                PQerrorMessage(conn));
        do_exit(conn);
    }
    PGresult *res = PQexec(conn, "INSERT INTO x VALUES ('abc', 123);");
    PQclear(res);
    PQfinish(conn);
    printf("Done\n");
    return 0;
}
```

</TabItem>


<TabItem value="python">

```python
import psycopg2
try:
    connection = psycopg2.connect(user="admin",
                                  password="quest",
                                  host="127.0.0.1",
                                  port="8812",
                                  database="qdb")
    cursor = connection.cursor()
    postgreSQL_select_Query = "INSERT INTO x VALUES ('abc', 123)"
    cursor.execute(postgreSQL_select_Query)
    print("Inserted row")
finally:
    #closing database connection.
    if (connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")

```

</TabItem>

</Tabs>


## Web Console

Our Web Console has an import function. You can find out more about this on the
[dedicated page](/docs/reference/client/web-console/#import).
