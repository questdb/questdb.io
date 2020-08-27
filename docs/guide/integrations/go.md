---
title: PG wire client in Go
sidebar_label: Go
---


```
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