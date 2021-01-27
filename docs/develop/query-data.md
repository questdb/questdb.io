---
title: Query data
description:
  This page describes how to query data from QuestDB with NodeJS, Java, Go, and
  cURL. The examples show the Web Console, REST API, and Postgres wire protocol.
---

This page describes how to query data from QuestDB using the embedded Web
Console, make requests towards the REST API endpoints that QuestDB exposes, and
Postgres wire protocol via multiple programming languages.

## Prerequisites

QuestDB must be running and accessible, you can do so from
[Docker](/docs/get-started/docker/), the [binaries](/docs/get-started/binaries/)
or [Homebrew](/docs/get-started/homebrew/) for macOS users.

## Web Console

QuestDB has an embedded Web Console available at http://[server-address]:9000.
When running locally, this is accessible at
[http://localhost:9000](http://localhost:9000). To query data from the web
console, SQL statements can be written in the code editor and executed by
clicking **RUN**.

To generate some data and query the results to demonstrate the functionality of
the code editor, the following example SQL can be used:

```questdb-sql title="Creating and querying a table partitioned by day"
CREATE TABLE my_table (timestamp TIMESTAMP, x LONG) timestamp(timestamp) PARTITION BY DAY;

INSERT INTO my_table
SELECT timestamp_sequence(
    to_timestamp('2021-01-01T00:00:00', 'yyyy-MM-ddTHH:mm:ss'),100000L * 36000), x
FROM long_sequence(120);

--`SELECT * FROM` is optional syntax
my_table;
```

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Screenshot of the Web Console"
  height={375}
  small
  src="/img/docs/console/exampleQuery.png"
  width={500}
/>

:::info

The new table has a designated timestamp and is partitioned by day so that stale
data can be deleted to save disk space. More details on this approach can be
found on the [Data retention](/docs/operations/data-retention/) page.

:::

Aside from the Code Editor for writing and executing SQL queries, the Web
Console has the following additional components:

- A Schema Explorer which displays tables and their schemas
- A Visualization panel for viewing query results as tables or graphs
- An Import tab for uploading datasets as CSV files

For more details on these components and general use of the console, see the
[Web Console reference](/docs/reference/client/web-console/) page.

## REST API

You can query data using the [REST API](/docs/reference/api/rest/), this will
work with a very wide range of libraries and tools. The REST API is accessible
on port `9000`.

<!-- prettier-ignore-start -->

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="curl" values={[
  { label: "cURL", value: "curl" },
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
]}>

<!-- prettier-ignore-end -->

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

<!-- prettier-ignore-start -->

<Tabs defaultValue="nodejs" values={[
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
  { label: "Java", value: "java" },
  { label: "C", value: "c" },
  { label: "Python", value: "python" },
]}>

<!-- prettier-ignore-end -->

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
	host		 = "localhost"
	port		 = 8812
	user		 = "admin"
	password = "quest"
	dbname	 = "qdb"
)

func main() {
	connStr := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", connStr)
	checkErr(err)
	defer db.Close()

	// Currently, we do not support queries with bind parameters in Go
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
  PGresult *res = PQexec(conn, "SELECT x FROM long_sequence(5);");
  if (PQresultStatus(res) != PGRES_TUPLES_OK) {
    printf("No data retrieved\n");
    PQclear(res);
    do_exit(conn);
  }
  int rows = PQntuples(res);
  for (int i = 0; i < rows; i++) {
    printf("%s\n", PQgetvalue(res, i, 0));
  }
  PQclear(res);
  PQfinish(conn);
  return 0;
}
```

</TabItem>

<TabItem value="java">

```java
package com.myco;

import java.sql.*;
import java.util.Properties;

public class App {
    public static void main(String[] args) throws SQLException {
        Properties properties = new Properties();
        properties.setProperty("user", "admin");
        properties.setProperty("password", "quest");
        properties.setProperty("sslmode", "disable");

        final Connection connection = DriverManager.getConnection("jdbc:postgresql://localhost:8812/qdb", properties);
        try (PreparedStatement preparedStatement = connection.prepareStatement("SELECT x FROM long_sequence(5);")) {
            try (ResultSet rs = preparedStatement.executeQuery()) {
                while (rs.next()) {
                    System.out.println(rs.getLong(1));
                }
            }
        }
        connection.close();
    }
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
    postgreSQL_select_Query = "SELECT x FROM long_sequence(5);"
    cursor.execute(postgreSQL_select_Query)
    print("Selecting rows from test table using cursor.fetchall")
    mobile_records = cursor.fetchall()

    print("Print each row and it's columns values")
    for row in mobile_records:
        print("y = ", row[0], "\n")
except (Exception, psycopg2.Error) as error:
    print("Error while fetching data from PostgreSQL", error)
finally:
    #closing database connection.
    if (connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
```

</TabItem>

</Tabs>
