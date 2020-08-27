---
title: Postgres wire client using PSQL
sidebar_label: PSQL
description: Tutorial on how to connect to QuestDB using PSQL
---

From the command line, navigate to your postgres installation directory and run:

```shell
./psql -h localhost -p 8812 -U admin -W -d qdb
```