const fetch = require("node-fetch")
const qs = require("querystring")

const HOST = "http://localhost:9000"

async function run() {
  try {
    const queryData = {
      query: `
        INSERT INTO
          trades
        VALUES(
          to_timestamp('2020-10-09T00:00:00', 'yyyy-MM-ddTHH:mm:ss'),
          123456
        );
      `,
    }

    const response = await fetch(`${HOST}/exec?${qs.encode(queryData)}`)
    const json = await response.json()

    console.log(json)
  } catch (error) {
    console.log(error)
  }
}

run()
