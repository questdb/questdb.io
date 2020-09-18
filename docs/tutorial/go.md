---
title: Go tutorial
sidebar_label: Go
description: Tutorial showing how to build a Go application with QuestDB.
---

This first part of this tutorial will show you how to write data to QuestDB
using some simple Go commands.

The second part of the tutorial uses the [Go "pq" driver](https://godoc.org/github.com/lib/pq) to
connect to QuestDB. Support for parameterized queries is not implemented yet,
this is on our roadmap and we are currently working on it.

## Writing to QuestDB with Go

There are 2 methods of sending data to QuestDB that we will cover here. The first uses
Influx Line Protocol and the second uses a SQL Query to INSERT data.

Using Influx Line Protocol (ILP) does not require that the specific table you want to
write into exists as the table will be automatically created with the first write. In
addition, if subsequent calls to write to that data contain new fields, those fields
will be added to the table at that time.

### Code snippet

This code simulates pulling data from Docker Hub on the number of stars and pulls for
a Docker Image. It parses a JSON Object and inserts that data into a QuestDB Database.

First, create a `main.go` file with the following content:

```go
package main

import (
	"encoding/json"
	"fmt"
	"net"
	"time"
)

const jsonData string = "{\"results\":[{ \"name\": \"questdb\", \"star_count\": 5, \"pull_count\": 1919,\"last_updated\": \"2020-09-02T13:47:23.804926Z\"}]  }"

type DockerNodes struct {
	DockerNodes []Dock `json:"results"`
}

// Dock is the overall datastructure
type Dock struct {
	Name   string `json:"name"`
	Stars  int    `json:"star_count"`
	Pulls  int    `json:"pull_count"`
	Update string `json:"last_updated"`
}

func main() {
	var data = DockerNodes{}
	_ = json.Unmarshal(jsonData, &data)
	conn, err := net.Dial("tcp", "localhost:9009")
	if err != nil {
		fmt.Errorf("Connection Error: %v", err)
	}
	defer conn.Close()
	for i := 0; i < len(data.DockerNodes); i++ {
		timeObj := time.Now()
		if err != nil {
			fmt.Errorf("Time Format Error: %v", err)
		}
		//format a line of ILP
		output := fmt.Sprintf("docker,name=%s pulls=%d,stars=%d %d",
			data.DockerNodes[i].Name,
			data.DockerNodes[i].Pulls,
			data.DockerNodes[i].Stars,
			timeObj.UnixNano())
		// Write to QuestDB
		fmt.Fprintf(conn, output+"\n")
	}
	conn.Close()
}
```
If you want to try this example with your own Docker Hub repository, you can get the full JSON
for your repository with the command

```shell
curl -X GET https://hub.docker.com/v2/repositories/<your-repo>/
```

And then replace the fields in the above JSON `const`.

You can then run the file with `go run main.go` And see the data inserted into your QuestDB instance.

## Querying data

### Dependency

`go get -u github.com/lib/pq`

### Code snippet

Create a `main.go` file with the following content:

```go
package main

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

func main() {

	db, err := sql.Open("postgres", "host=localhost port=8812 user=admin password=quest dbname=qdb sslmode=disable")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	fmt.Println("Successfully connected!")

	rows, err := db.Query("SELECT x FROM long_sequence(5);")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var num string
		err = rows.Scan(&num)
		if err != nil {
			panic(err)
		}
		fmt.Println(num)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}
}
```

### Run

Use `go run main.go` to run the code.
