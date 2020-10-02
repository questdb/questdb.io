const net = require("net")

const client = new net.Socket()

const HOST = "localhost"
const PORT = 9009

function run() {
  client.connect(PORT, HOST, () => {
    const rows = [
      `test,location=uk temperature=12.4 ${Date.now() * 1e6}`,
      `test,location=uk temperature=11.4 ${Date.now() * 1e6}`,
    ]

    rows.forEach((row) => {
      client.write(`${row}\n`)
    })

    client.destroy()
  })

  client.on("data", function (data) {
    console.log("Received: " + data)
  })

  client.on("close", function () {
    console.log("Connection closed")
  })
}

run()
