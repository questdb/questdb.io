const fetch = require("node-fetch")
const qs = require("querystring")

const HOST = "http://localhost:9000"

async function run() {
  try {
    const queryData = {
      query: insertInto([Date.now() * 1000, 100]),
    }

    const response = await fetch(`${HOST}/exec?${qs.encode(queryData)}`)
    const json = await response.json()

    console.log(json)
  } catch (error) {
    console.log(error)
  }
}

run()
