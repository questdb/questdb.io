---
title: Health monitoring
description:
  How to configure health monitoring for querying the status of a QuestDB
  instance
---

## Overview

REST APIs will often be situated behind a load balancer that uses a monitor URL
for its configuration. Having a load balancer query the QuestDB REST endpoints
(on port `9000` by default) will cause internal logs to become excessively
noisy. Additionally, configuring per-URL logging would increase server latency.

To provide a dedicated health check feature that would have no performance knock
on other system components, we opted to decouple health checks from the REST
endpoints used for querying and ingesting data. For this purpose, a `min` HTTP
server runs embedded in a QuestDB instance and has a separate log and thread
pool configuration.

## Usage

The `min` server is enabled by default and will reply to any `HTTP GET` request
to port `9003`:

```shell title="GET health status of local instance"
curl -v http://127.0.0.1:9003
```

The server will respond with a HTTP status code of `200`, indicating that the
system is operational:

```shell title="200 'OK' response"
*   Trying 127.0.0.1...
* TCP_NODELAY set
* Connected to 127.0.0.1 (127.0.0.1) port 9003 (#0)
> GET / HTTP/1.1
> Host: 127.0.0.1:9003
> User-Agent: curl/7.64.1
> Accept: */*
>
< HTTP/1.1 200 OK
< Server: questDB/1.0
< Date: Tue, 26 Jan 2021 12:31:03 GMT
< Transfer-Encoding: chunked
< Content-Type: text/plain
<
* Connection #0 to host 127.0.0.1 left intact
```

Path segments are ignored which means that optional paths may be used in the URL
and the server will respond with identical results, e.g.:

```shell title="GET health status with arbitraty path"
curl -v http://127.0.0.1:9003/status
```

## Configuration

The configuration section for the `min` HTTP server is available in the
[minimal HTTP server reference](/docs/reference/configuration#minimal-http-server).
