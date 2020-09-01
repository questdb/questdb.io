---
title: Go tutorial
sidebar_label: Go
description: Tutorial showing how to build a Go application with QuestDB
---

This tutorial uses the [Go "pq" driver](https://godoc.org/github.com/lib/pq) to
connect to QuestDB. Support for parameterized queries is not implemented yet,
this is on our roadmap and we are currently working on it.

## Dependency

`go get -u github.com/lib/pq`

## Code snippet

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

## Run

Use `go run main.go` to run the code.
