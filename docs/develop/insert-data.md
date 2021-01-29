---
title: Insert data
description:
  This page demonstrates how to insert data into QuestDB from NodeJS, Java, Go
  and cURL. The examples show how to use the REST API as well as the InfluxDB
  integration.
---

This page shows how to insert data into QuestDB using different programming
languages and tools.

## Prerequisites

This page assumes that QuestDB is running and accessible. To get started, follow
one of the guides to get up and running using either
[Docker](/docs/get-started/docker/), the [binaries](/docs/get-started/binaries/)
or [Homebrew](/docs/get-started/homebrew/) for macOS users.

## Web Console

By default, QuestDB has an embedded Web Console running at
http://[server-address]:9000. When running locally, this is accessible at
[http://localhost:9000](http://localhost:9000).

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Screenshot of the Web Console"
  height={375}
  small
  src="/img/docs/console/exampleQuery.png"
  width={500}
/>

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

For details on importing from CSV and using these components, refer to the
[Web Console reference](/docs/reference/client/web-console/) page.

## REST API

QuestDB exposes a REST API for compatibility with a wide range of libraries and
tools. The REST API is accessible on port `9000` and has the following
entrypoints:

- `/imp` - import data
- `/exec` - execute an SQL statement

More details on the use of these entrypoints can be found on the
[REST API reference](/docs/reference/api/rest/) page.

### `/imp` endpoint

The `/imp` endpoint allows for importing a CSV file directly.

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

### `/exec` endpoint

Alternatively, the `/exec` endpoint can be used to create a table and the
`INSERT` statement can be used to populate it with values:

<!-- prettier-ignore-start -->

<Tabs defaultValue="curl" values={[
  { label: "cURL", value: "curl" },
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
]}>

<!-- prettier-ignore-end -->

<TabItem value="curl">

```shell
# Create Table
curl -G \
  --data-urlencode "query=CREATE TABLE IF NOT EXISTS trades(name STRING, value INT)" \
  http://localhost:9000/exec

# Insert a row
curl -G \
  --data-urlencode "query=INSERT INTO trades VALUES('abc', 123456);" \
  http://localhost:9000/exec
```

Note that these two queries can be combined into a single curl request:

```shell
curl -G \
  --data-urlencode "query=CREATE TABLE IF NOT EXISTS trades(name STRING, value INT);\
  INSERT INTO trades VALUES('abc', 123456);" \
  http://localhost:9000/exec
```

</TabItem>

<TabItem value="nodejs">

The `node-fetch` package can be installed using `npm i node-fetch`.

```javascript
const fetch = require("node-fetch")
const qs = require("querystring")

const HOST = "http://localhost:9000"

async function createTable() {
  try {
    const queryData = {
      query: "CREATE TABLE IF NOT EXISTS trades (name STRING, value INT);",
    }

    const response = await fetch(`${HOST}/exec?${qs.encode(queryData)}`)
    const json = await response.json()

    console.log(json)
  } catch (error) {
    console.log(error)
  }
}

async function insertData() {
  try {
    const queryData = {
      query: "INSERT INTO trades VALUES('abc', 123456);",
    }

    const response = await fetch(`${HOST}/exec?${qs.encode(queryData)}`)
    const json = await response.json()

    console.log(json)
  } catch (error) {
    console.log(error)
  }
}

createTable()
insertData()
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
    CREATE TABLE IF NOT EXISTS
      trades (name STRING, value INT);
    INSERT INTO
      trades
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
this endpoint is accessible on port `9009`. These examples assume the `trades`
table created in the section above exists already.

<!-- prettier-ignore-start -->

<Tabs defaultValue="nodejs" values={[
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
]}>

<!-- prettier-ignore-end -->

<TabItem value="nodejs">

```javascript
const net = require("net")

const client = new net.Socket()

const HOST = "localhost"
const PORT = 9009

function run() {
  client.connect(PORT, HOST, () => {
    const rows = [
      `trades,name=test_ilp1 value=12.4 ${Date.now() * 1e6}`,
      `trades,name=test_ilp2 value=11.4 ${Date.now() * 1e6}`,
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
    fmt.Sprintf("trades,name=test_ilp1 value=12.4 %d", time.Now().UnixNano()),
    fmt.Sprintf("trades,name=test_ilp2 value=11.4 %d", time.Now().UnixNano()),
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

<!-- prettier-ignore-start -->

<Tabs defaultValue="nodejs" values={[
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "Java", value: "java" },
  { label: "C", value: "c" },
  { label: "Python", value: "python" },
]}>

<!-- prettier-ignore-end -->

<TabItem value="nodejs">

This example uses the [`pg` package](https://www.npmjs.com/package/pg) which
allows for quickly building queries using PostgreSQL wire protocol. Details on
the use of this package can be found on the
[node-postgres documentation](https://node-postgres.com/).

```javascript title="Basic client connection"
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

    const createTable = await client.query(
      "CREATE TABLE IF NOT EXISTS trades (ts TIMESTAMP, date DATE, name STRING, value INT) timestamp(ts);",
    )
    console.log(createTable)

    const insertData = await client.query(
      "INSERT INTO trades VALUES($1, $2, $3, $4);",
      [Date.now() * 1000, Date.now(), "node pg example", 123],
    )
    await client.query("COMMIT")

    console.log(insertData)

    for (let rows = 0; rows < 10; rows++) {
      // Providing a 'name' field allows for prepared statements / bind variables
      const query = {
        name: "insert-values",
        text: "INSERT INTO trades VALUES($1, $2, $3, $4);",
        values: [Date.now() * 1000, Date.now(), "node pg prep statement", rows],
      }
      const preparedStatement = await client.query(query)
    }

    await client.query("COMMIT")

    const readAll = await client.query("SELECT * FROM trades")
    console.log(readAll.rows)

    await client.end()
  } catch (e) {
    console.log(e)
  }
}

start()
```

</TabItem>

<TabItem value="go">

This example uses the [pgx](https://github.com/jackc/pgx) driver and toolkit for
postgres in Go. More details on the use of this toolkit can be found on the
[GitHub repository for pgx](https://github.com/jackc/pgx/wiki/Getting-started-with-pgx).

```go
package main

import (
  "context"
  "fmt"
  "log"
  "time"

  "github.com/jackc/pgx/v4"
)

var conn *pgx.Conn
var err error

func main() {
  ctx := context.Background()
  conn, _ = pgx.Connect(ctx, "postgresql://admin:quest@localhost:8812/qdb")
  defer conn.Close(ctx)

  // text-based query
  _, err := conn.Exec(ctx, "CREATE TABLE IF NOT EXISTS trades (ts TIMESTAMP, date DATE, name STRING, value INT) timestamp(ts);")
  if err != nil {
    log.Fatalln(err)
  }

  // Prepared statement given the name 'ps1'
  _, err = conn.Prepare(ctx, "ps1", "INSERT INTO trades VALUES($1,$2,$3,$4)")
  if err != nil {
    log.Fatalln(err)
  }
  for i := 0; i < 10; i++ {
    // Execute 'ps1' statement with a string and the loop iterator value
    _, err = conn.Exec(ctx, "ps1", time.Now(), time.Now(), "go prepared statement", i+1)
    if err != nil {
      log.Fatalln(err)
    }
  }

  // Read all rows from table
  rows, err := conn.Query(ctx, "SELECT * FROM trades")
  fmt.Println("Reading from trades table:")
  for rows.Next() {
    var name string
    var value int64
    var ts time.Time
    var date time.Time
    err = rows.Scan(&ts, &date, &name, &value)
    fmt.Println(ts, date, name, value)
  }

  err = conn.Close(ctx)
}
```

</TabItem>

<TabItem value="rust">

The following example shows how to use parameterized queries and prepared
statements:

```rust
use postgres::{Client, NoTls, Error};
use chrono::{Utc};
use std::time::SystemTime;

fn main() -> Result<(), Error> {
    let mut client = Client::connect("postgresql://admin:quest@localhost:8812/qdb", NoTls)?;

    // Basic query
    client.batch_execute("CREATE TABLE IF NOT EXISTS trades (ts TIMESTAMP, date DATE, name STRING, value INT) timestamp(ts);")?;

    // Parameterized query
    let name: &str = "rust example";
    let val: i32 = 123;
    let utc = Utc::now();
    let sys_time = SystemTime::now();
    client.execute(
        "INSERT INTO trades VALUES($1,$2,$3,$4)",
        &[&utc.naive_local(), &sys_time, &name, &val],
    )?;

    // Prepared statement
    let mut txn = client.transaction()?;
    let statement = txn.prepare("insert into trades values ($1,$2,$3,$4)")?;
    for value in 0..10 {
        let utc = Utc::now();
        let sys_time = SystemTime::now();
        txn.execute(&statement, &[&utc.naive_local(), &sys_time, &name, &value])?;
    }
    txn.commit()?;

    println!("import finished");
    Ok(())
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
    try (PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO TRADES (id, ref) VALUES (?, ?)")) {
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
#include <libpq-fe.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/time.h>
#include <string.h>

void do_exit(PGconn* conn)
{
    PQfinish(conn);
    exit(1);
}
int main()
{
    PGconn* conn = PQconnectdb(
        "host=localhost user=admin password=quest port=8812 dbname=qdb");
    if (PQstatus(conn) == CONNECTION_BAD) {
        fprintf(stderr, "Connection to database failed: %s\n",
            PQerrorMessage(conn));
        do_exit(conn);
    }
    // Simple query
    PGresult* res = PQexec(conn,
        "CREATE TABLE IF NOT EXISTS trades (ts TIMESTAMP, name STRING, value INT) timestamp(ts);");
    PQclear(res);

    int i;
    for (i = 0; i < 5; ++i) {
        char timestamp[30];
        char milis[7];
        struct timeval tv;
        time_t curtime;
        gettimeofday(&tv, NULL);
        strftime(timestamp, 30, "%Y-%m-%dT%H:%M:%S.", localtime(&tv.tv_sec));
        snprintf(milis, 7, "%d", tv.tv_usec);
        strcat(timestamp, milis);

        const char* values[1] = { timestamp };
        int lengths[1] = { strlen(timestamp) };
        int binary[1] = { 0 };

        res = PQexecParams(conn,
            "INSERT INTO trades VALUES (to_timestamp($1, 'yyyy-MM-ddTHH:mm:ss.SSSUUU'), 'timestamp', 123);",
            1, NULL, values, lengths, binary, 0);
    }
    res = PQexec(conn, "COMMIT");
    printf("Done\n");
    PQclear(res);
    do_exit(conn);
    return 0;
}
```

```shell title="Compiling the example"
# g++ on win
g++ libpq_example.c -o run_example.exe -I pgsql\include -L dev\pgsql\lib -std=c++17 -lpthread -lpq

# gcc on MacOS with homebrew postgres install
gcc libpq_example.c -o run_example.c -I pgsql/include -L /usr/local/Cellar/postgresql/13.1/lib/postgresql -lpthread -lpq
```

</TabItem>

<TabItem value="python">

This example uses the [psychopg2](https://github.com/psycopg/psycopg2) database
adapter which does not support prepared statements (bind variables). This
functionality is on the roadmap for the antecedent
[psychopg3](https://github.com/psycopg/psycopg3/projects/1) adapter.

```python
import psycopg2 as pg
import datetime as dt

try:
    connection = pg.connect(user="admin",
                            password="quest",
                            host="127.0.0.1",
                            port="8812",
                            database="qdb")
    cursor = connection.cursor()

    # text-only query
    cursor.execute("CREATE TABLE IF NOT EXISTS trades (ts TIMESTAMP, date DATE, name STRING, value INT) timestamp(ts);")

    # insert 10 records
    for x in range(10):
      now = dt.datetime.utcnow()
      date = dt.datetime.now().date()
      cursor.execute("""
        INSERT INTO trades
        VALUES (%s, %s, %s, %s);
        """, (now, date, "python example", x))
    # commit records
    connection.commit()

    cursor.execute("SELECT * FROM trades;")
    records = cursor.fetchall()
    for row in records:
        print(row)

finally:
    if (connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
```

</TabItem>

</Tabs>

