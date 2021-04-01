---
title: Authenticate
description:
  This page shows how to setup authentication for the InfluxDB line protocol TCP
  endpoint.
---

This page shows how to authenticate to QuestDB using different programming
languages or tools over [InfluxDB line protocol](/docs/reference/api/influxdb/)
for the TCP endpoint.

## Prerequisites

Make sure you have QuestDB running and accessible, you can do so from
[Docker](/docs/get-started/docker/), the [binaries](/docs/get-started/binaries/)
or [Homebrew](/docs/get-started/homebrew/) for macOS users.

## InfluxDB line protocol

QuestDB implements the [InfluxDB line protocol](/docs/reference/api/influxdb/),
this endpoint is accessible on port `9009`.

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="nodejs" values={[
  { label: "NodeJS", value: "nodejs" },
  { label: "Go", value: "go" },
]}>

<TabItem value="nodejs">

```javascript
const { Socket } = require("net")
const { Crypto } = require("node-webcrypto-ossl")

const crypto = new Crypto()

const PORT = 9009
const HOST = "localhost"

const PRIVATE_KEY = "5UjEMuA0Pj5pjK8a-fa24dyIf-Es5mYny3oE_Wmus48"
const PUBLIC_KEY = {
  x: "fLKYEaoEb9lrn3nkwLDA-M_xnuFOdSt9y0Z7_vWSHLU",
  y: "Dt5tbS1dEDMSYfym3fgMv0B99szno-dFc1rYF9t0aac",
}
const JWK = {
  ...PUBLIC_KEY,
  kid: "testUser1",
  kty: "EC",
  d: PRIVATE_KEY,
  crv: "P-256",
}

const client = new Socket()

async function write(data) {
  return new Promise((resolve) => {
    client.write(data, () => {
      resolve()
    })
  })
}

async function authenticate(challenge) {
  // Check for trailing \n which ends the challenge
  if (challenge.slice(-1).readInt8() === 10) {
    const apiKey = await crypto.subtle.importKey(
      "jwk",
      JWK,
      { name: "ECDSA", namedCurve: "P-256" },
      true,
      ["sign"],
    )

    const signature = await crypto.subtle.sign(
      { name: "ECDSA", hash: "SHA-256" },
      apiKey,
      challenge.slice(0, challenge.length - 1),
    )

    await write(`${Buffer.from(signature).toString("base64")}\n`)

    return true
  }

  return false
}

async function sendData() {
  const rows = [
    `test,location=us temperature=22.4 ${Date.now() * 1e6}`,
    `test,location=us temperature=21.4 ${Date.now() * 1e6}`,
  ]

  for (row of rows) {
    await write(`${row}\n`)
  }
}

async function run() {
  let authenticated = false
  let data

  client.on("data", async function (raw) {
    data = !data ? raw : Buffer.concat([data, raw])

    if (!authenticated) {
      authenticated = await authenticate(data)
      await sendData()
      setTimeout(() => {
        client.destroy()
      }, 0)
    }
  })

  client.on("ready", async function () {
    await write(`${JWK.kid}\n`)
  })

  client.connect(PORT, HOST)
}

run()
```

</TabItem>

<TabItem value="go">

```go
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
```

</TabItem>

</Tabs>
