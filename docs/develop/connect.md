---
title: Connect
description:
  This page has instructions demonstrating how to connect to QuestDB from
  NodeJS, Java or Go. The examples show the Postgres and InfluxDB integrations.
---

This page shows how to connect to QuestDB using different programming languages
or tools.

## Prerequisites

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
  { label: "Java", value: "java" },
  { label: "C#", value: "csharp" },
  { label: "C", value: "c" },
  { label: "Python", value: "python" },
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

<TabItem value="java">

```java
package com.myco;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class ConnectExample {
    public static void main(String[] args) throws SQLException {
        Properties properties = new Properties();
        properties.setProperty("user", "admin");
        properties.setProperty("password", "quest");
        properties.setProperty("sslmode", "disable");

        final Connection connection = DriverManager.getConnection("jdbc:postgresql://localhost:8812/qdb", properties);
        System.out.println("Connected");
        connection.close();
    }
}
```

</TabItem>

<TabItem value="c">

```c
// compile with
// g++ libpq_example.c -o libpq_example.exe  -I pgsql\include -L dev\pgsql\lib -std=c++17  -lpthread -lpq
#include <stdio.h>
#include <stdlib.h>
#include <libpq-fe.h>
void do_exit(PGconn *conn) {
    PQfinish(conn);
    exit(1);
}
int main() {
    PGconn *conn = PQconnectdb("host=localhost user=admin password=quest port=8812 dbname=testdb");
    if (PQstatus(conn) == CONNECTION_BAD) {
        fprintf(stderr, "Connection to database failed: %s\n",
            PQerrorMessage(conn));
        do_exit(conn);
    }
    PQfinish(conn);
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
    # Print PostgreSQL Connection properties
    print(connection.get_dsn_parameters(), "\n")

    # Print PostgreSQL version
    cursor.execute("SELECT version();")
    record = cursor.fetchone()
    print("You are connected to - ", record, "\n")

except (Exception, psycopg2.Error) as error:
    print("Error while connecting to PostgreSQL", error)
finally:
    #closing database connection.
    if (connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
```

</TabItem>

<TabItem value="csharp">

```csharp
using Npgsql;
string username = "admin";
string password = "quest";
string database = "qdb";
int port = 8812;
var connectionString = $"host=localhost;port={port};username={username};password={password};
database={database};ServerCompatibilityMode=NoTypeLoading;";

await using NpgsqlConnection connection = new(connectionString);
await connection.OpenAsync();
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
