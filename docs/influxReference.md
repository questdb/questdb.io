---
id: influxReference
title: Influx Line Protocol Reference
---

Influx Line Protocol ingestion makes it easy for existing InfluxDB users to try
QuestDB by only changing the address they send data to.

It is not necessary to create a table schema beforehand: the table will be
created on the fly. If new columns are added, the table is automatically updated
to reflect the new structure.

QuestDB can listen for Line protocol packets both over [TCP](#tcp-receiver) and
[UDP](#udp-receiver)

### Using line protocol

#### Syntax

```shell script title="ILP syntax"
table_name,tagset valueset  timestamp
```

| Element      | Definition                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `table_name` | Name of the table where QuestDB will write data.                                                                                |
| `tagset`     | Array of string key-value pairs separated by commas that represent the reading's associated metadata                            |
| `values`     | Array of key-value pairs separated by commas that represent the readings. The keys are string, values can be numeric or boolean |
| `timestamp`  | UNIX timestamp. By default in microseconds. Can be changed in the configuration                                                 |

#### Behaviour

- When the `table_name` does not correspond to an existing table, QuestDB will
  create the table on the fly using the name provided. Column types will be
  automatically recognized and assigned based on the data.
- The `timestamp` column is automatically created as
  [designated timestamp](designatedTimestamp.md) with the
  [partition strategy](partitions.md) set to `NONE`. If you would like to define
  a partition stragey, you should [CREATE](createTable.md) the table beforehand.
- When the timestamp is empty, QuestDB will use the server timestamp.

#### Examples

Let's assume the following data:

| timestamp           | city    | temperature | humidity | make      |
| ------------------- | ------- | ----------- | -------- | --------- |
| 1465839830100400000 | London  | 23.5        | 0.343    | Omron     |
| 1465839830100600000 | Bristol | 23.2        | 0.443    | Honeywell |
| 1465839830100700000 | London  | 23.6        | 0.358    | Omron     |

Line protocol to insert this data in the `readings` table would look like this:

```shell script
readings,city=London,make=Omron temperature=23.5,humidity=0.343 1465839830100400000
readings,city=Bristol,make=Honeywell temperature=23.2,humidity=0.443 1465839830100600000
readings,city=London,make=Omron temperature=23.6,humidity=0.348 1465839830100700000
```

:::note
There are only 2 spaces in each line. First between the `tagset` and
`values`. Second between `values` and `timestamp`.
:::

#### Dealing with irregularly-structured data

:::info
QuestDB can support on-the-fly data structure changes with minimal
overhead. Should users decide to send varying quantities of readings or metadata
tags for different entries, QuestDB will adapt on the fly.
:::

Influx line protocol makes it possible to send data under different shapes. Each
new entry may contain certain metadata tags or readings, and others not. Whilst
the example just above highlights structured data, it is possible for Influx
line protocol users to send data as follows.

```shell script
readings,city=London temperature=23.2 1465839830100400000
readings,city=London temperature=23.6 1465839830100700000
readings,make=Honeywell temperature=23.2,humidity=0.443 1465839830100800000
```

Note that on the third line,

- a new `tag` is added: "make"
- a new `field` is added: "humidity"

After writing two entries, the data would look like this

| timestamp           | city   | temperature |
| ------------------- | ------ | ----------- |
| 1465839830100400000 | London | 23.5        |
| 1465839830100700000 | London | 23.6        |

The third entry would result in the following table

| timestamp           | city   | temperature | humidity | make      |
| ------------------- | ------ | ----------- | -------- | --------- |
| 1465839830100400000 | London | 23.5        | NULL     | NULL      |
| 1465839830100700000 | London | 23.6        | NULL     | NULL      |
| 1465839830100800000 | NULL   | 23.2        | 0.358    | Honeywell |

:::tip
Adding columns on the fly is no issue for QuestDB. New columns will be
created in the affected partitions, and only populated if they contain values.
Whilst we offer this function for flexibility. However, we recommend that users
try to minimise structural changes to maintain operational simplicity.
:::

### TCP receiver

The TCP receiver can handle both single and multi-row write requests. It is
fully multi-threaded and customizable. It can work from the common worker pool
or out of dedicated threads. A load balancing mechanism dynamically assigns work
between the threads.

#### Overview

By default, QuestDB listens to line protocol packets over TCP on `0.0.0.0:9009`.
If you are running QuestDB with Docker, you will need to map port 9009 using
`-p 9009:9009 --net=host`. This port can be customised.

The TCP receiver uses two types of threads.

- **Worker threads** - write data to the different tables. Each worker is
  writing to designated tables. The worker-table repartition is modified over
  time by the load balancing jobs.
- **Network IO thread** - receives messages from the network and adds them in a
  queue for the writers. The network IO thread does not have a dedicated thread.
  Instead, it shares a common thread with the least busy worker.

The workflow is as follows.

![influx line protocol structure diagram](/static/img/doc/diagrams/influxLineProtocolTCPStructure.svg)

The network IO thread receives write requests and sets up a queue for the
workers. Workers pick up write requests for their assigned tables and insert the
data.

#### Load balancing

A load balancing job reassigns work between threads in order to relieve the
busiest threads and maintain high ingestion speed. It can be triggered in two
ways.

- After a certain number of updates per table
- After a certain amount of time has passed

Once either is met, QuestDB will calculate a load ratio as the number of writes
by the busiest thread divided by the number of writes in the least busy thread.
If this ratio is above the threshold, the table with the least writes in the
busiest worker thread will be reassigned to the least busy worker thread.

![influx line protocol load balancing diagram](/static/img/doc/diagrams/influxLineProtocolTCPLoadBalancing.svg)

#### Commit strategy

Uncommitted rows are committed either

- after `line.tcp.maintenance.job.hysterisis.in.ms` milliseconds have passed
- once reaching `line.tcp.max.uncommitted.rows` uncommitted rows.

#### Configuration

The TCP receiver configuration can be completely customised using
[configuration keys](serverConf.md#influx-line-protocol-config-tcp). You can use
this to configure the tread pool, buffer and queue sizes, receiver IP address
and port, load balancing etc.

### UDP receiver

The UDP receiver can handle both single and multi row write requests. It is
currently single-threaded, and performs both network IO and write jobs out of
one thread. The UDP worker thread can work either on its own thread or use the
common thread pool. It supports both multicast and unicast.

Find an example of how to use this [here](influxSenderLibrary.md)

#### Overview

By default, QuestDB listens for `multicast` line protocol packets over UDP on
`232.1.2.3:9009`. If you are running QuestDB with Docker, you will need to map
port 9009 using `-p 9009:9009 --net=host` and publish multicast packets with TTL
of at least 2. This port can be customised, and you can also configure QuestDB
to listen for `unicast`.

#### Commit strategy

Uncommitted rows are committed either

- after receiving a number of continuous messages equal to
  `line.udp.commit.rate`
- when messages are no longer being received

#### Configuration

The UDP receiver configuration can be completely customised using
[configuration keys](serverConf.md#influx-line-protocol-config-udp). You can use
this to configure the IP address and port the receiver binds to, commit rates,
buffer size, whether it should run on a separate thread etc.
