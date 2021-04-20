---
title: Deploying QuestDB
description:
  Details and resources which describe how to deploy QuestDB using various
  platforms and tools.
---

## Docker

The most flexible way of deploying QuestDB is using the official Docker image
which is updated with the latest GitHub release:

```bash
docker run -p 9000:9000 questdb/questdb
```

A guide for deploying QuestDB using Docker is provided in the
[getting started with Docker](/docs/get-started/docker/) documentation page.

## Deployment guides

The following guides describe how to deploy QuestDB to various cloud platforms
using a variety of tools:

- [AWS AMI with Packer](/docs/guides/aws-packer/) guide describes how to build
  the AWS AMI using Packer, with configuration for monitoring and logging via
  CloudWatch
- [Kubernetes guide](/docs/guides/kubernetes/) describes how to fetch the
  official QuestDB Helm chart and shows how to run and query the running QuestDB
  instance.
