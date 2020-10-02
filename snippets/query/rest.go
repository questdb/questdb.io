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
