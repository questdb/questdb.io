---
title: Influx Sender Library
sidebar_label: Influx Sender Library
---

QuestDB library provides fast and efficient way of sending line protocol
messages. Sender implementation entry point is
`io.questdb.cutlass.line.udp.LineProtoSender`, it is fully zero-GC and has
latency in a region of 200ns per message.

## Get started

- **Step 1:** Create an instance of `LineProtoSender`.

| Arguments              | Description                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `interfaceIPv4Address` | Network interface to use to send messages.                                                                                   |
| `sendToIPv4Address`    | Destination IP address                                                                                                       |
| `bufferCapacity`       | Send buffer capacity to batch messages. Do not configure this buffer over the MTU size                                       |
| `ttl`                  | UDP packet TTL. Set this number appropriate to how many VLANs your messages have to traverse before reaching the destination |

```java title="Example"
LineProtoSender sender = new LineProtoSender(0, Net.parseIPv4("232.1.2.3"), 9009, 110, 2);
```

- **Step 2:** Create `entries` by building each entry's tagset and fieldset.

```java title="Syntax"
sender.metric("table_name").tag("key","value").field("key", value).$(timestamp);
```

where

| Element                | Description                                        | Can be repeated |
| ---------------------- | -------------------------------------------------- | --------------- |
| `metric(tableName)`    | Specify which table the data is to be written into | no              |
| `tag("key","value")`   | Use to add a new key-value entry as metadata       | yes             |
| `field("key","value")` | Use to add a new key-value entry as reading        | yes             |
| `$(timestamp)`         | Specify the timestamp for the reading              | no              |

:::tip
You can chain several tags and fields, e.g
`tag("a","x").tag("b","y").tag("c","z")` etc.
:::

```java title="Example"

    sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).field("humid", 0.434).$(Os.currentTimeNanos());
```

Sender will send message as soon as send buffer is full. To send messages before
buffer fills up you can use `sender.flush()`

## Full Example

This example sends multicast messages to `232.1.2.3:9009`. In this mode multiple
QuestDB instances can receive the same message.

```java title="Sending Influx line protocol"
    LineProtoSender sender = new LineProtoSender(0, Net.parseIPv4("232.1.2.3"), 9009, 1024, 2);
    sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).$(Os.currentTimeMicros());
    sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).$(Os.currentTimeMicros());
    sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).$(Os.currentTimeMicros());
    sender.flush();
```
