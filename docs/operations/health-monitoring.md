---
title: Health monitoring
description:
  Instructions and guides on how to setup health monitoring for QuestDB instance
---

## Overview

Often REST API will be situated behind a loadbalancer, which will require a
monitor URL for its configuration. Having loadbalancer monitor actual REST end
point, typically running on port 9000, will cause logsto become excessively
noisy on one hand. On the other, configuring per-URL logging in QuestDB would
have negative impact on server's latency. Instead we opted to create `min` HTTP
server. It runs embedded and has its own log and thread pool configuration.

## Usage

Out of box QuestDB will reply to any `HTTP GET` request to port `9003` with
`HTTP 200`.

```shell
curl -v http://127.0.0.1:9003/hello
```

```shell
*   Trying 127.0.0.1:9003...
* TCP_NODELAY set
* Connected to 127.0.0.1 (127.0.0.1) port 9003 (#0)
> GET /hello HTTP/1.1
> Host: 127.0.0.1:9003
> User-Agent: curl/7.68.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Server: questDB/1.0
< Date: Tue, 1 Dec 2020 17:27:13 GMT
< Transfer-Encoding: chunked
< Content-Type: text/plain
<
* Connection #0 to host 127.0.0.1 left intact
```

`/hello` can be anything, the server will ignore the path

## Configuration

The `min` HTTP server
[configuration is documented](reference/configuration.md#minimal-http-server) in
the reference section
