---
title: NodeJS tutorial
sidebar_label: NodeJS
description: Tutorial showing how to connect to QuestDB from NodeJS
---

This tutorial shows how to build a NodeJS application with QuestDB. This is
based on the [Node "pg" driver](https://github.com/brianc/node-postgres) (also
called `node-postgres`).

## Dependency

```
npm i pg
```

## Code snippet

Create a `main.js` file with the following content:

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
      "select x, $1, $2, $3, $4, $5 from long_sequence(2);",
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

## Run

Use `node main.js` to run the code.
