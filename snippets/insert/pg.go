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

	insertSql := `
	  INSERT INTO test
	  VALUES($1, $2);
        `
	_, err = db.Exec(insertSql, "abc", "123")
	checkErr(err)
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
