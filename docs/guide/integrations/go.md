---
title: Postgres wire client in Go
sidebar_label: Go
description: Tutorial on how to connect to QuestDB from Go using Postgres wire
---

This example uses the `lib/pg` library to connect to QuestDB. Currently, we support queries without parameters when connecting via the Go client. We are working on supporting parameterized queries. 

## Install lib/pg package
`go get -u github.com/lib/pq`

## Create file `questdb.go`


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
  password = ""
  dbname   = "qdb"
)

func main() {

    db, err := sql.Open("postgres", "host=localhost port=5432 user=joan  dbname=test sslmode=disable")
  if err != nil {
    panic(err)
  }
  defer db.Close()

  rows, err := db.Query("SELECT city, temp_hi FROM weather where temp_lo = ?", 2)
  if err != nil {
    // handle this error better than this
    panic(err)
  }
  defer rows.Close()
  for rows.Next() {
    var city string
    var temp_hi int
    err = rows.Scan(&city, &temp_hi)
    if err != nil {
      // handle this error
      panic(err)
    }
    fmt.Println(city, temp_hi)
  }
  // get any error encountered during iteration
  err = rows.Err()
  if err != nil {
    panic(err)
  }


  err = db.Ping()
  if err != nil {
    panic(err)
  }

  fmt.Println("Successfully connected!")
}

```

### Run the following
` go run questdb.go`