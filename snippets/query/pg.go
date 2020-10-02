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
