---
title: Kafka Connect
description:
  JDBC driver support in QuestDB allows for ingesting messages from a Kafka
  topic via Kafka Connect.
---

Support for the JDBC driver means that data can easily be exported from a Kafka
topic and ingested directly to QuestDB by means of Kafka Connect.

This article assumes that users have successfully set up an installation of
Kafka and are ready to start exporting messages to QuestDB.

## Prerequisites

You will need the following:

- Kafka
- A running QuestDB instance

## Configure Kafka

The following binaries must be available to Kafka:

- Kafka Connect JDBC binary
- PostgreSQL JDBC driver

To download these files, visit the
[Kafka Connect JDBC](https://www.confluent.io/hub/confluentinc/kafka-connect-jdbc)
page which provides CLI installation and a direct download of the required
`.jar` files. Select the ZIP file for download, unzip the contents of the
archive and copy the required `.jar` files to the Kafka `libs` directory:

```shell
unzip confluentinc-kafka-connect-jdbc-10.0.1.zip
cd confluentinc-kafka-connect-jdbc-10.0.1
cp kafka-connect-jdbc-10.0.1.jar /path/to/kafka_2.13-2.6.0/libs
cp postgresql-42.2.10.jar /path/to/kafka_2.13-2.6.0/libs
```

A configuration file `/path/to/kafka/config/connect-jdbc.properties` must be
created for Kafka Connect in standalone mode. The Postgres connection URL must
match the destination QuestDB instance and a topic can be specified under the
`topics={mytopic}` key. This example guide uses a topic `example-topic` and the
Postgres server is running on the default port `8812`.

Create a file `config/connect-jdbc.properties` with the following contents:

```shell
name=local-jdbc-sink
connector.class=io.confluent.connect.jdbc.JdbcSinkConnector
connection.url=jdbc:postgresql://127.0.0.1:8812/qdb?useSSL=false
connection.user=admin
connection.password=quest

topics=example-topic
insert.mode=insert
dialect.name=PostgreSqlDatabaseDialect
pk.mode=none
auto.create=true
```

## Start Kafka

The commands listed in this section must be run from the Kafka home directory
and in the order shown below.

Start the Kafka Zookeeper used to coordinate the server:

```shell
bin/zookeeper-server-start.sh  config/zookeeper.properties
```

Start a Kafka server:

```shell
bin/kafka-server-start.sh  config/server.properties
```

Start Kafka Connect:

```shell
bin/connect-standalone.sh config/connect-standalone.properties config/connect-jdbc.properties
```

## Publish messages

Messages can be published via the console producer script:

```shell
bin/kafka-console-producer.sh --topic example-topic --bootstrap-server localhost:9092
```

A `>` greater-than symbol indicates that a messages can be published to the
example topic from the interactive session. Paste the following minified JSON as
a single line to publish messages and create the table `example-topic` in the
QuestDB instance:

<!-- prettier-ignore-start -->
```json
{"schema":{"type":"struct","fields":[{"type":"boolean","optional":false,"field":"flag"},{"type":"int8","optional":false,"field":"id8"},{"type":"int16","optional":false,"field":"id16"},{"type":"int32","optional":false,"field":"id32"},{"type":"int64","optional":false,"field":"id64"},{"type":"float","optional":false,"field":"idFloat"},{"type":"double","optional":false,"field":"idDouble"},{"type":"string","optional":true,"field":"msg"}],"optional":false,"name":"msgschema"},"payload":{"flag":false,"id8":222,"id16":222,"id32":222,"id64":222,"idFloat":222,"idDouble":333,"msg":"hi"}}
```
<!-- prettier-ignore-end -->

## Verify the integration

To verify that the data has been ingested into the `example-topic` table, the
following request to QuestDB's `/exp` REST endpoint can be made to export the
table contents via CURL:

```shell
curl -G \
  --data-urlencode "query=select * from 'example-topic'" \
  http://localhost:9000/exp
```

The expected response based on the example JSON message published above will be
the following:

```csv
"flag","id8","id16","id32","id64","idFloat","idDouble","msg"
false,-34,-34,222,222,222.0000,333.0,"hi"
```

## JSON format

The JSON object sent in the example above has the following structure containing
`schema` and `payload` objects:

```json
{
  "schema": {
    "type": "struct",
    "fields": [
      {
        "type": "boolean",
        "optional": false,
        "field": "flag"
      },
      {
        "type": "int8",
        "optional": false,
        "field": "id8"
      },
      {
        "type": "int16",
        "optional": false,
        "field": "id16"
      },
      {
        "type": "int32",
        "optional": false,
        "field": "id32"
      },
      {
        "type": "int64",
        "optional": false,
        "field": "id64"
      },
      {
        "type": "float",
        "optional": false,
        "field": "idFloat"
      },
      {
        "type": "double",
        "optional": false,
        "field": "idDouble"
      },
      {
        "type": "string",
        "optional": true,
        "field": "msg"
      }
    ],
    "optional": false,
    "name": "msgschema"
  },
  "payload": {
    "flag": false,
    "id8": 222,
    "id16": 222,
    "id32": 222,
    "id64": 222,
    "idFloat": 222,
    "idDouble": 333,
    "msg": "hi"
  }
}
```
