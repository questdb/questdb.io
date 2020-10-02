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
