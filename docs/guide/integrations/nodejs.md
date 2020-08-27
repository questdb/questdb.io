---
title: PG wire client in Nodejs
sidebar_label: Nodejs
---

```
{
  "name": "example",
  "version": "1.0.0",
  "license": "Apache-2.0",
  "dependencies": {
    "pg": "^8.2.0"
  }
}
```

```
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
      "select x from long_sequence(2);",
      
    )

    console.log(res.rows[0])

    await client.end()
	  
  } catch (e) {
    console.log(e)
  }
}

start()

```