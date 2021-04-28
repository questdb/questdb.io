---
title: Run QuestDB on Kubernetes
sidebar_label: Kubernetes
description:
  This document describes how to deploy QuestDB using a Kubernetes cluster by
  means of official Helm charts maintained by the QuestDB project
---

You can deploy QuestDB in a [Kubernetes](https://kubernetes.io) cluster using a
[StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
and a
[persistent volume](https://kubernetes.io/docs/concepts/storage/persistent-volumes/).
We distribute QuestDB via [Helm](https://helm.sh) on
[ArtifactHub](https://artifacthub.io/packages/helm/questdb/questdb).

## Prerequisites

- [Helm](https://helm.sh/docs/intro/install/)
- [Kubernetes CLI](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [minikube](https://minikube.sigs.k8s.io/docs/start/)

## Get the QuestDB Helm chart

Using the Helm client, add the official Helm chart repository:

```shell
helm repo add questdb https://helm.questdb.io/
```

Update the Helm index:

```shell
helm repo update
```

## Run QuestDB

Start a local cluster using `minikube`:

```shell
minikube start
```

Then install the chart:

```shell
helm install my-questdb questdb/questdb
```

Finally, use the Kubernetes CLI to get the pod name:

```shell
kubectl get pods
```

Result:

| NAME         | READY | STATUS  | RESTARTS | AGE   |
| ------------ | ----- | ------- | -------- | ----- |
| my-questdb-0 | 1/1   | Running | 1        | 9m59s |

## Querying QuestDB locally

In order to run queries against your local instance of QuestDB, you can use port
forwarding:

```shell
kubectl port-forward my-questdb-0 9000
```

The following ports may also be used:

- 9000: [REST API](/docs/reference/api/rest/) and
  [Web Console](/docs/reference/web-console/)
- 8812: [Postgres](/docs/reference/api/postgres/)
- 9009: [InfluxDB line protocol](/docs/reference/api/influxdb/)
