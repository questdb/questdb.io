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
		fmt.Sprintf("test,location=uk temperature=12.4 %d", time.Now().UnixNano()),
		fmt.Sprintf("test,location=uk temperature=11.4 %d", time.Now().UnixNano()),
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
