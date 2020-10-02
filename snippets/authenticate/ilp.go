package main

import (
	"bufio"
	"crypto"
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	_ "crypto/sha256"
	"encoding/base64"
	"fmt"
	"math/big"
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
	keyId := "testUser1"

	// Parse and create private key
	keyRaw, err := base64.RawURLEncoding.DecodeString("5UjEMuA0Pj5pjK8a-fa24dyIf-Es5mYny3oE_Wmus48")
	checkErr(err)
	key := new(ecdsa.PrivateKey)
	key.PublicKey.Curve = elliptic.P256()
	key.PublicKey.X, key.PublicKey.Y = key.PublicKey.Curve.ScalarBaseMult(keyRaw)
	key.D = new(big.Int).SetBytes(keyRaw)

	// Create connection and send key ID
	conn, err := net.DialTCP("tcp", nil, tcpAddr)
	checkErr(err)
	defer conn.Close()
	reader := bufio.NewReader(conn)
	_, err = conn.Write([]byte(keyId + "\n"))
	checkErr(err)

	raw, err := reader.ReadBytes('\n')
	// Remove the `\n` is last position
	raw = raw[:len(raw)-1]
	checkErr(err)

	// Hash the challenge with sha256
	hash := crypto.SHA256.New()
	hash.Write(raw)
	hashed := hash.Sum(nil)

	a, b, err := ecdsa.Sign(rand.Reader, key, hashed)
	checkErr(err)
	stdSig := append(a.Bytes(), b.Bytes()...)
	_, err = conn.Write([]byte(base64.StdEncoding.EncodeToString(stdSig) + "\n"))
	checkErr(err)

	// We are now authenticated, we can sed data
	for _, s := range rows {
		_, err := conn.Write([]byte(fmt.Sprintf("%s\n", s)))
		checkErr(err)
	}
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
