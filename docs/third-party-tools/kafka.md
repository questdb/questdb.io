---
title: Kafka Connect
description:
  JDBC driver support in QuestDB allows for ingesting messages from a Kafka
  topic via Kafka Connect.
---

Support for the JDBC driver means that data can easily be exported from a Kafka
topic and ingested directly to QuestDB by means of Kafka Connect.

This article assumes that users have successfully set up an installation of
Kafka using the Confluent platform. Detailed instructions on how to get up and
running can be found on the
[official documentation](https://docs.confluent.io/platform/current/quickstart/index.html).

## Prerequisites

You will need the following:

- PostgreSQL - [install](https://www.postgresql.org/download/)
- Kafka using Confluent Platform -
  [quickstart guide](https://docs.confluent.io/platform/current/quickstart/ce-quickstart.html#ce-quickstart)
- Kafka Connect JDBC binary -
  [install](https://docs.confluent.io/kafka-connect-jdbc/current/index.html)
- PostgreSQL JDBC driver - [install](https://jdbc.postgresql.org/download.html)

## Configure PostgreSQL

Create a new PostgreSQL database:

```shell
initdb -D "/path/to/db/pgdata"
```

Start PostgreSQL:

```shell
pg_ctl -D "/path/to/db/pgdata" start
```

Connect to PostgreSQL:

```shell
psql -d postgres
```

## Configure Kafka

Kafka should be installed with the Confluent Platform according to the
[quickstart guide](https://docs.confluent.io/platform/current/quickstart/ce-quickstart.html#ce-quickstart).
After installation is complete, users can add QuestDB as a
[Sink Connector](https://docs.confluent.io/platform/current/connect/index.html#kafka-connect).
The commands listed in this section must be run in the order listed below and
from the Kafka home directory.

Start the Kafka Zookeeper used to coordinate the server:

```shell
bin/zookeeper-server-start.sh  config/zookeeper.properties
```

Start a Kafka server:

```shell
bin/kafka-server-start.sh  config/server.properties
```

A `connect-jdbc.properties` file should be placed in the folder where Kafka is
installed to pick up the JDBC connection settings. Create a new file in
`./config/` named `connect-jdbc.properties`:

```shell
name=local-jdbc-sink
connector.class=io.confluent.connect.jdbc.JdbcSinkConnector
connection.url=jdbc:postgresql://127.0.0.1:8812/qdb?useSSL=false
connection.user=admin
connection.password=quest

topics=quickstart-events
insert.mode=insert
dialect.name=PostgreSqlDatabaseDialect
pk.mode=none
auto.create=true
```

Start Kafka Connect:

```shell
bin/connect-standalone.sh config/connect-standalone.properties config/connect-jdbc.properties
```

## Publishing messages

If no topics exist, one can be created using the following command:

```shell
bin/kafka-topics.sh --create --topic example-topic --bootstrap-server localhost:9092
```

At this point, a message can be published:

```shell
bin/windows/kafka-console-producer.sh --topic example-topic --bootstrap-server localhost:9092
```

Paste this message (as one line) to create a table. The table name will be the
topic used in the kafka-console-producer topic

<!-- prettier-ignore-start -->
```json
{    "schema": {        "type": "struct",        "fields": [            {                "type": "boolean",                "optional": false,               "field": "flag"            },            {                "type": "int8",                "optional": false,                "field": "id8"           },           {                "type": "int16",                "optional": false,                "field": "id16"            },            {                "type":"int32",                "optional": false,                "field": "id32"            },          {                  "type": "int64",               "optional": false,                "field": "id64"            },            {                "type": "float",                "optional": false,                "field": "idFloat"            },            {                "type": "double",                "optional": false,                "field": "idDouble"            },              {                "type": "string",                "optional": true,                "field": "msg"            }      ],        "optional": false,        "name": "msgschema"    },    "payload": {        "flag": false,        "id8": 222,        "id16": 222,        "id32": 222,        "id64": 222,        "idFloat": 222.0,        "idDouble": 333.0,               "msg": "hi"  }}
```
<!-- prettier-ignore-end -->
