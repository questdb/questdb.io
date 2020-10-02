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
