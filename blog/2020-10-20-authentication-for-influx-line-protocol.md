---
title: Authentication for line protocol
author: Patrick Mackinlay
author_title: QuestDB Team
author_url: https://github.com/patrickSpaceSurfer
description:
  QuestDB has added authentication for line protocol over TCP
tags: [story]
---

Line protocol is a simple and convenient way to add data points to QuestDB. Now with [autentication](/docs/reference/api/influxdb/#authentication) your end point is more secure.

<!--truncate-->

[Line protocol](/docs/reference/api/influxdb) is popular becuase its a simple text based format, you just open a socket and send data points line by line. Implementation is easy because encoding is trivial and there is no response to parse. The protocol can be used over UDP or TCP with minimal overhead.

This is all great as long as your end point can not be accessed by unauthorised actors that could send your database junk. If your end point is not secure then you can secure it by encapsulating it in a secure transport layer such as [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security), adding complexity to your infrastructure that needs to be managed. This is something we sought to avoid. Our goals when implementing authentication were:

* Use a secure, future proof, authentication method.
* Minimise protocol complexity and transport overhead.
* Configuration soley in QuestDB without the need for storing secret data.

To these ends we decided to provide authentication for line protocol over TCP with a simple [challenge/response](https://en.wikipedia.org/wiki/Challenge%E2%80%93response_authentication) mechanism, where the challenge is a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) and a signature the response. [Elliptic curve cryptography](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) (curve P-256) with [SHA-256](https://en.wikipedia.org/wiki/SHA-2) was chosen for the signature algorithm, this ensures strong authentication that is hopefully future proof. The elliptic curve cryptographic keys have a public and secret component, so its possible to configure the QuestDB server with just the public component, thereby mitigating any risks of storing secret information on the server. Languages such as [javascript and Go](/docs/develop/insert-data/#influxdb-line-protocol) have standard libraries that implement ECC, the [JSON Web Key](https://tools.ietf.org/html/rfc7517) standard can be used to store and distribute the keys in a clear and ubiquitous manner.

The authentication challenge/response mechanism was chosen to minimise the impact on the line protocol, it works as follows:
1. When the client connects it sends its key id to the server.
2. The server responds with a [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) in printable characters.
3. The client responds with the [base64](https://en.wikipedia.org/wiki/Base64) encoded signature of the nonce.
4. If authentication fails the server will disconnect, if not then the client can revert to sending standard line protocol data points.

We developed this form of authentication in response to users who have QuestDB deployments where a simple form of authentication is required without the overheads of full encryption.
