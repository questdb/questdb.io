const fetch = require("node-fetch")
const FormData = require("form-data")
const fs = require("fs")

const HOST = "http://localhost:9000"

async function run() {
  const form = new FormData()

  form.append("data", fs.readFileSync(__dirname + "/data.csv"), {
    filename: fileMetadata.name,
    contentType: "application/octet-stream",
  })

  try {
    const r = await fetch(`${HOST}/imp`, {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    })

    console.log(r)
  } catch (e) {
    console.error(e)
  }
}

run()
