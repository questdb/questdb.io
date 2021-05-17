---
title: Java (embedded)
description: Java embedded API reference documentation.
---

QuestDB is written in Java and can be used as any other Java library. Moreover,
it is a single JAR with no additional dependencies.

To include QuestDB in your project, use the following:

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="maven" values={[
  { label: "Maven", value: "maven" },
  { label: "Gradle", value: "gradle" },
]}>

<TabItem value="maven">

```xml title="JDK11"
<dependency>
    <groupId>org.questdb</groupId>
    <artifactId>questdb</artifactId>
    <version>{@version@}</version>
</dependency>
```

```xml title="JDK8"
<dependency>
    <groupId>org.questdb</groupId>
    <artifactId>questdb-jdk8</artifactId>
    <version>{@version@}</version>
</dependency>
```

</TabItem>

<TabItem value="gradle">

```shell
implementation 'org.questdb:questdb:{@version@}'
```

</TabItem>

</Tabs>

## Writing data

The `TableWriter` facilitates table writes. To successfully create an instance
of `TableWriter`, the table must:

- Already exist
- Have no other open writers against it as the `TableWriter` constructor will
  attempt to obtain an exclusive cross-process lock on the table.

```java title="Example table writer"
final CairoConfiguration configuration = new DefaultCairoConfiguration("data_dir");
try (CairoEngine engine = new CairoEngine(configuration)) {
    final SqlExecutionContextImpl ctx = new SqlExecutionContextImpl(engine, 1);
    try (SqlCompiler compiler = new SqlCompiler(engine)) {

        compiler.compile("create table abc (a int, b byte, c short, d long, e float, g double, h date, i symbol, j string, k boolean, ts timestamp) timestamp(ts)", ctx);

        try (TableWriter writer = engine.getWriter(ctx.getCairoSecurityContext(), "abc")) {
            for (int i = 0; i < 10; i++) {
                TableWriter.Row row = writer.newRow(Os.currentTimeMicros());
                row.putInt(0, 123);
                row.putByte(1, (byte) 1111);
                row.putShort(2, (short) 222);
                row.putLong(3, 333);
                row.putFloat(4, 4.44f);
                row.putDouble(5, 5.55);
                row.putDate(6, System.currentTimeMillis());
                row.putSym(7, "xyz");
                row.putStr(8, "abc");
                row.putBool(9, true);
                row.append();
            }
            writer.commit();
        }
    }
}
```

### Detailed steps

#### Configure Cairo engine

CairoEngine is a resource manager for the embedded QuestDB. Its main function is
to facilitate concurrent access to pools of `TableReader` and `TableWriter`
instances.

```java title="New CairoEngine instance"
final CairoConfiguration configuration = new DefaultCairoConfiguration("data_dir");
try (CairoEngine engine = new CairoEngine(configuration)) {
```

A typical application will need only one instance of `CairoEngine`. This
instance will start when application starts and shuts down when application
closes. You will need to close `CairoEngine` gracefully when the application
stops.

QuestDB provides a default configuration which only requires the
`data directory` to be specified. For a more advanced usage, the whole
`CairoConfiguration` interface can be overridden.

#### Create an instance of SqlExecutionContext

Execution context is a conduit for passing SQL execution artefacts to the
execution site. This instance is not thread-safe and it must not be shared
between threads.

```java title="Example of execution context"
final SqlExecutionContextImpl ctx = new SqlExecutionContextImpl(engine, 1);
```

The second argument is the number of threads that will be helping to execute SQL
statements. Unless you are building another QuestDB server, this value should
always be 1.

#### New SqlCompiler instance and blank table

Before we start writing data using `TableWriter`, the target table has to exist.
There are several ways to create new table ; using `SqlCompiler` is the easiest.

```java title="Example of creating new table"
try (SqlCompiler compiler = new SqlCompiler(engine)) {
    compiler.compile("create table abc (a int, b byte, c short, d long, e float, g double, h date, i symbol, j string, k boolean, ts timestamp) timestamp(ts)", ctx);
```

As you will be able to see below, the table field types and indexes must match
the code that is populating the table.

#### New instance of TableWriter

We use engine to create instance of `TableWriter`. This will enable reusing this
`TableWriter` instance later, when we use the same method of creating table
writer again.

```java title="New table writer instance"
try (TableWriter writer = engine.getWriter(ctx.getCairoSecurityContext(), "abc")) {
```

The writer will hold exclusive lock on table `abc` until it is closed. This lock
is both intra and inter-process. If you have two Java applications accessing the
same table only one will succeed at one time.

#### Create a new row

```java title="Example of creating new table row with timestamp"
TableWriter.Row row = writer.newRow(Os.currentTimeMicros());
```

Although this operation semantically looks like a new object creation, the row
instance is actually being re-used under the hood. A Timestamp is necessary to
determine a partition for the new row. Its value has to be either increment or
stay the same as the last row. When the table is not partitioned and does not
have a designated timestamp column, timestamp value can be omitted.

```java title="Example of creating new table row without timestamp"
TableWriter.Row row = writer.newRow();
```

#### Populate columns

There are put\* methods for every supported data type. Columns are updated by an
index as opposed to by name.

```java title="Example of populating table column"
row.putLong(3, 333);
```

Column update order is not important and update can be sparse. All unset columns
will default to NULL values.

#### Append a row

Following method call:

```java title="Example of appending a new row"
row.append();
```

Appended rows are not visible to readers until they are committed. An unneeded
row can also be canceled if required.

```java title="Example of cancelling half-populated row"
row.cancel();
```

A pending row is automatically cancelled when `writer.newRow()` is called.
Consider the following scenario:

```java
TableWriter.Row row = writer.newRow(Os.currentTimeMicros());
row.putInt(0, 123);
row.putByte(1, (byte) 1111);
row.putShort(2, (short) 222);
row.putLong(3, 333);
row = writer.newRow(Os.currentTimeMicros());
...
```

Second `newRow()` call would cancel all the updates to the row since the last
`append()`.

#### Commit changes

To make changes visible to readers, writer has to commit. `writer.commit` does
this job. Unlike traditional SQL databases, the size of the transaction does not
matter. You can commit anything between 1 and 1 trillion rows. We also spent
considerable effort to ensure `commit()` is lightweight. You can drip one row at
a time in applications that require such behaviour.

## Writing columns in blocks

QuestDB supports writing blocks of columnar data at once via the use of the
`TableBlockWriter`. The `TableBlockWriter` instance is obtained from a
`TableWriter` and can then be used to write in memory frames of columnar data. A
frame of columnar data is just a piece of contiguous memory with each column
value stored in it one after another. The `TableBlockWriter` will allow any
number of such frames of columnar data to be written with an invocation of the
`appendPageFrameColumn` method, before the block is either committed or
cancelled (rolled back). Use of the `TableBlockWriter` requires that all columns
have the same number of rows written to them and within each column the frames
need to be added in append order.

A `PageFrame` instance can optionally be used as a convenient interface to hold
the columnar frames and a `PageFrameCursor` instance can be used as an interface
to provide a sequence of frames to be committed. Many of QuestDB's
`RecordCursorFactory` implementations provide a `PageFrameCursor`.

```java title="Example table block writer"
final CairoConfiguration configuration = new DefaultCairoConfiguration("data_dir");
try (CairoEngine engine = new CairoEngine(configuration)) {
    final SqlExecutionContextImpl ctx = new SqlExecutionContextImpl(engine, 1);
    try (SqlCompiler compiler = new SqlCompiler(engine)) {

        PageFrameCursor cursor = ...; // Setup PageFrameCursor instance
        compiler.compile("create table abc (a int, b byte, c short, d long, e float, g double, h date, i symbol, j string, k boolean, ts timestamp) timestamp(ts)", ctx);

        try (TableWriter writer = engine.getWriter(ctx.getCairoSecurityContext(), "abc")) {
            int columnCount = writer.getMetadata().getColumnCount();
            TableBlockWriter blockWriter = writer.newBlock();

            PageFrame frame;
            while ((frame = cursor.next()) != null) {
                for (int columnIndex = 0; columnIndex < columnCount; columnIndex++) {
                    blockWriter.appendPageFrameColumn(
                            columnIndex,
                            frame.getPageSize(columnIndex),
                            frame.getPageAddress(columnIndex));
                }
            }
            blockWriter.commit();
        }
    }
}
```

## Executing queries

We provide a single API for executing all kinds of SQL queries. The example
below focuses on `SELECT` and how to fetch data from a cursor.

```java title="Compiling SQL"
final CairoConfiguration configuration = new DefaultCairoConfiguration(temp.getRoot().getAbsolutePath());
try (CairoEngine engine = new CairoEngine(configuration)) {
    final SqlExecutionContextImpl ctx = new SqlExecutionContextImpl(engine, 1);
    try (SqlCompiler compiler = new SqlCompiler(engine)) {
        try (RecordCursorFactory factory = compiler.compile("abc", ctx).getRecordCursorFactory()) {
            try (RecordCursor cursor = factory.getCursor(ctx)) {
                final Record record = cursor.getRecord();
                while (cursor.hasNext()) {
                    // access 'record' instance for field values
                }
            }
        }
    }
}
```

### Detailed steps

The steps to setup CairoEngine, execution context and SqlCompiler are the same
as those we explained in [writing data](#writing-data) section. We will skip
them here and focus on fetching data.

#### RecordCursorFactory

You can think of `RecordCursorFactory` as PreparedStatement. This is the entity
that holds SQL execution plan with all of the execution artefacts. Factories are
designed to be reused and we strongly encourage caching them. You also need to
make sure that you close factories explicitly when you no longer need them.
Failing to do so can cause memory and/or other resources leak.

#### RecordCursor

This instance allows iterating over the dataset produced by SQL. Cursors are
relatively short-lived and do not imply fetching all the data. Note that you
have to close a cursor as soon as enough data is fetched ; the closing process
can happen at any time.

Cursors are not thread safe and cannot be shared between threads.

#### Record

This is cursor's data access API. Record instance is obtained from the cursor
outside of the fetch loop.

```java title="Example of fetching data from cursor"
final Record record = cursor.getRecord();
while (cursor.hasNext()) {
    // access 'record' instance for field values
}
```

Record does not hold the data. Instead, it is an API to pull data when data is
needed. Record instance remains the same while cursor goes over the data, making
caching of records pointless.

## InfluxDB sender library

QuestDB library provides fast and efficient way of sending line protocol
messages. Sender implementation entry point is
`io.questdb.cutlass.line.udp.LineProtoSender`, it is fully zero-GC and has
latency in a region of 200ns per message.

### Get started

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

### Full example

This example sends multicast messages to `232.1.2.3:9009`. In this mode multiple
QuestDB instances can receive the same message.

```java title="Sending InfluxDB line protocol"
LineProtoSender sender = new LineProtoSender(0, Net.parseIPv4("232.1.2.3"), 9009, 1024, 2);
sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).$(Os.currentTimeMicros());
sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).$(Os.currentTimeMicros());
sender.metric("readings").tag("city", "London").tag("by", "quest").field("temp", 3400).$(Os.currentTimeMicros());
sender.flush();
```
