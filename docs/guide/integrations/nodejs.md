---
title: Postgres wire client in Nodejs
sidebar_label: Nodejs
description: Tutorial on how to connect to QuestDB from nodejs using Postgres wire
---

This example shows how to connect to QuestDB from nodejs using Postgres wire protocol

## Create package file

`package.json`

```json
{
  "name": "example",
  "version": "1.0.0",
  "license": "Apache-2.0",
  "dependencies": {
    "pg": "^8.2.0"
  }
}
```

## Create js file

`pg-client.js`

```javascript
const { Client } = require("pg")

const start = async () => {
  try {
    const client = new Client({
      database: "qdb",
      host: "127.0.0.1",
      password: "quest",
      port: 8812,
      user: "admin",
    })
    await client.connect()

    const res = await client.query(
      "select x,  $1, $2, $3, $4, $5 from long_sequence(2);",
      ["a", "3", "5000000000", "2.33333", "false"],
    )


    console.log(res.rows[0])

    await client.end()
	  
  } catch (e) {
    console.log(e)
  }
}

start()

```

## Run:

- `npm i` to install the dependencies
- `node pg-client.js` to run the code