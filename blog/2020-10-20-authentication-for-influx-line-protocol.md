---
title: Authentication for InfluxDB line protocol
author: Patrick Mackinlay
author_title: QuestDB Team
author_url: https://github.com/patrickSpaceSurfer
description:
  QuestDB has added authentication for InfluxDB line protocol over TCP
image: /img/blog/2020-10-20/banner.jpg
tags: [influxdb line protocol, story]
---

import Banner from "@theme/Banner"

<Banner
  alt="An open lock with its key attached to it."
  height={365}
  src="/img/blog/2020-10-20/banner.jpg"
  width={650}
>
  Photo by <a href="https://unsplash.com/photos/hRXIKdxoaPo">Vanna Phon</a> on{" "}
  <a href="https://unsplash.com">Unsplash</a>
</Banner>

QuestDB supports ingesting records using InfluxDB line protocol. This means that
you can benefit from a simple, lightweight, and convenient message format to add
data points to tables. We've further improved support for this feature by adding
authentication, so your endpoint is more secure. This post describes how we
added this functionality and how to enable it via QuestDB configuration.

<!--truncate-->

[InfluxDB line protocol](/docs/reference/api/influxdb) is popular because it is
a simple text based format, you simply open a socket and send data points line
by line. Implementation is easy because encoding is trivial and there is no
response to parse. The protocol can be used over UDP or TCP with minimal
overhead.

This is all great as long as your endpoint can not be accessed by unauthorised
actors that could send junk to your database. If your endpoint is public, then
you could secure it by encapsulating it in a secure transport layer such as
[TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security), adding complexity
to your infrastructure that needs to be managed. This is something we sought to
avoid. Our goals when implementing authentication were:

- Use a secure, future proof, authentication method.
- Minimise protocol complexity and transport overhead.
- Configuration solely in QuestDB without the need for storing secret data.

To these ends we decided to provide authentication for the InfluxDB line
protocol over TCP with a simple
[challenge/response](https://en.wikipedia.org/wiki/Challenge%E2%80%93response_authentication)
mechanism, where the challenge is a
[nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) and the response a
signature.
[Elliptic curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography)
(ECC curve P-256) with [SHA-256](https://en.wikipedia.org/wiki/SHA-2) was chosen
for the signature algorithm, this ensures strong authentication that is
hopefully future proof. The elliptic curve cryptographic keys have a public and
secret component, it is possible to configure QuestDB with just the public part,
thereby mitigating any risks of storing secret information on the server.
Languages such as
[JavaScript and Go](/docs/develop/insert-data/#influxdb-line-protocol) have
standard libraries that implement ECC, the
[JSON Web Key](https://tools.ietf.org/html/rfc7517) standard can be used to
store and distribute the keys in a clear and ubiquitous manner.

The authentication challenge/response mechanism was chosen to minimise the
impact on the protocol, it works as follows:

1. When the client connects it sends its key id to the server.
2. The server responds with a
   [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) in printable
   characters.
3. The client responds with the [base64](https://en.wikipedia.org/wiki/Base64)
   encoded signature of the nonce.
4. If authentication fails the server will disconnect, if not then the client
   can revert to sending standard InfluxDB line protocol data points.

We developed this form of authentication in response to users who have QuestDB
deployments where a simple form of authentication is required without the
overheads of full encryption.
