---
id: serverConf
title: Server Configuration Properties
sidebar_label: Configuration Properties
---


QuestDB server configuration can be set in the `server.conf` configuration file.
When a key is absent from the configuration file, the default value is used.

### Customising the configuration

To override a default value with a custom value, add the key in the configuration file as follows
```shell script
aaa.bbb.ccc.ddd=myValue
```

For example 
```shell script
shared.worker.count=5
```

:::note
A restart of QuestDB is required to pickup the new configuration
:::

### Available keys and default values

### Worker config
|Property|Default value|Description|
|---|---|---|
|shared.worker.count|2|Number of worker threads shared across the application. Increasing this number will increase parallelism in the application at the expense of cpu resources.|
|shared.worker.affinity||comma-delimted list of cpus ids, one per thread specified in "shared.worker.count". By default, threads have no cpu affinity.|
|shared.worker.haltOnError|false|Toggle whether worker should stop on error.|

### HTTP server config
|Property|Default value|Description|
|---|---|---|
|http.enabled|true|Enable HTTP server.|
|http.connection.pool.initial.capacity|16|Initial size of the connection pool.|
|http.connection.string.pool.capacity|128|Initial size of the string pool shared by HttpHeaderParser and HttpMultipartContentParser|
|http.multipart.header.buffer.size|512|HeaderParser buffer size in bytes.|
|http.multipart.idle.spin.count|10_000|How long the code accumulates incoming data chunks for column and delimiter analysis.|
|http.receive.buffer.size|1m|Size of receive buffer|
|http.request.header.buffer.size|64k||
|http.response.header.buffer.size|32k||
|http.worker.count|0||
|http.worker.affinity|httpWorkerCount||
|http.worker.haltOnError|false||
|http.send.buffer.size|2m|Size of send data buffer.|
|http.static.index.file.name|index.html|Name of index file for the web console|
|http.frozen.clock|false|Sets the clock to always return zero.|
|http.allow.deflate.before.send|false||
|http.keep-alive.timeout|5||
|http.keep-alive.max|10_000||
|http.static.pubic.directory|public||
|http.net.active.connection.limit|256||
|http.net.event.capacity|1024||
|http.net.io.queue.capacity|1024||
|http.net.idle.connection.timeout|300000||
|http.net.interest.queue.capacity|1024||
|http.net.listen.backlog|256||
|http.net.snd.buf.size|2m||
|http.net.rcv.buf.size|2m||
|http.text.date.adapter.pool.capacity|16||
|http.text.json.cache.limit|16384||
|http.text.json.cache.size|8192||
|http.text.max.required.delimiter.stddev|0.1222d||
|http.text.max.required.line.length.stddev|0.8||
|http.text.metadata.string.pool.capacity|128||
|http.text.roll.buffer.limit|4m||
|http.text.roll.buffer.size|1024||
|http.text.analysis.max.lines|1000||
|http.text.lexer.string.pool.capacity|64||
|http.text.timestamp.adapter.pool.capacity|64||
|http.text.utf8.sink.size|4096||
|http.json.query.connection.check.frequency|1_000_000||
|http.json.query.float.scale|10||
|http.bind.to|0.0.0.0:9000|IP address and port of HTTP server.|
|http.security.readonly|false|Forces HTTP read only mode when `true`, which disables commands which modify the data or data structure.|
|http.security.max.response.rows|Long.MAX_VALUE| Limit the number of response rows over HTTP.|
|http.security.interrupt.on.closed.connection|true|Switch to turn on terminating SQL processing if the HTTP connection is closed, the mechanism affects performance so the connection is only checked after http.security.interruptor.iterations.per.check calls are made to the check method. The mechanism also reads from the input stream and discards it since some HTTP clients send this as a keep alive in between requests, http.security.interruptor.buffer.size denotes the size of the buffer for this.|
|http.security.interruptor.iterations.per.check|2000000||
|http.security.interruptor.buffer.size|32|

### Cairo config
|Property|Default value|Description|
|---|---|---|
|cairo.sql.copy.root|null|Input root directory for backups.|
|cairo.sql.backup.root|null|Output root directory for backups.|
|cairo.sql.backup.dir.datetime.format|null|Date format for backup directory.|
|cairo.sql.backup.dir.tmp.name|tmp|Name of tmp directory used during backup.|
|cairo.sql.backup.mkdir.mode|509|Permission used when creating backup directories.|
|cairo.root|db|Directory for storing db tables and metadata. This directory is inside the server root directory provided at startup.|
|cairo.commit.mode|nosync|How changes to table are flushed to disk upon commit. Choices: `nosync`, `async` (flush call schedules update, returns immediately), `sync` (waits for flush to complete).|
|cairo.create.as.select.retry.count|5|Number of types table creation or insertion will be attempted.|
|cairo.default.map.type|fast|Type of map usedd. Options: `fast` (speed at the expense of storage), `compact`|
|cairo.default.symbol.cache.flag|false|When `true`, symbol values will be cached on Java heap.|
|cairo.default.symbol.capacity|256|Specifies approximate capacity for `SYMBOL` columns. It should be equal to number of unique symbol values stored in the table and getting this value badly wrong will cause performance degradation. Must be power of 2.|
|cairo.file.operation.retry.count|30|Number of attempts to open files.|
|cairo.idle.check.interval|300000|Frequency of writer maintenance job in milliseconds.|
|cairo.inactive.reader.ttl|-120000|Frequency of reader pool checks for inactive readers in milliseconds.|
|cairo.inactive.writer.ttl|-600000|Frequency of writer pool checks for inactive writers in milliseconds.|
|cairo.index.value.block.size|256|Approximation of number of rows for a single index key, must be power of 2.|
|cairo.max.swap.file.count|30|Number of attempts to open swap files.|
|cairo.mkdir.mode|509|File permission mode for new directories.|
|cairo.parallel.index.threshold|100000|Minimum number of rows before allowing use of parallel indexation.|
|cairo.reader.pool.max.segments|5|Number of attempts to get TableReader.|
|cairo.spin.lock.timeout|1_000_000|Timeout when attempting to get BitmapIndexReaders in microseconds.|
|cairo.cache.rows|16|Number of rows for the query cache.|
|cairo.cache.blocks|4|Number of blocks for the query cache.|
|cairo.character.store.capacity|1024|Size of the CharacterStore.|
|cairo.character.store.sequence.pool.capacity|64|Size of the CharacterSequence pool.|
|cairo.column.pool.capacity|4096|Size of the Column pool in the SqlCompiler.|
|cairo.compact.map.load.factor|0.7| Load factor for CompactMaps.|
|cairo.expression.pool.capacity|8192|Size of the ExpressionNode pool in SqlCompiler.|
|cairo.fast.map.load.factor|0.5|Load factor for all FastMaps.|
|cairo.sql.join.context.pool.capacity|64|Size of the JoinContext pool in SqlCompiler.|
|cairo.lexer.pool.capacity|2048|Size of FloatingSequence pool in GenericLexer.|
|cairo.sql.map.key.capacity|2m|Key capacity in FastMap and CompactMap.|
|cairo.sql.map.max.resizes|2^31|Number of map resizes in FastMap and CompactMap before a resource limit exception is thrown, each resize doubles the previous size.|
|cairo.sql.map.page.size|4m| Memory page size for FastMap and CompactMap.|
|cairo.sql.map.max.pages|2^31|Memory max pages for CompactMap.|
|cairo.model.pool.capacity|1024|Size of the QueryModel pool in the SqlCompiler.|
|cairo.sql.sort.key.page.size|4m|Memory page size for storing keys in LongTreeChain.|
|cairo.sql.sort.key.max.pages|2^31|Max number of pages for storing keys in LongTreeChain before a resource limit exception is thrown.|
|cairo.sql.sort.light.value.page.size|1048576|Memory page size for storing values in LongTreeChain.|
|cairo.sql.sort.light.value.max.pages|2^31|Max pages for storing values in LongTreeChain.|
|cairo.sql.hash.join.value.page.size|16777216|Memory page size of the slave chain in full hash joins.|
|cairo.sql.hash.join.value.max.pages|2^31|Max pages of the slave chain in full hash joins.|
|cairo.sql.latest.by.row.count|1000|Number of rows for LATEST BY.|
|cairo.sql.hash.join.light.value.page.size|1048576|Memory page size of the slave chain in light hash joins.|
|cairo.sql.hash.join.light.value.max.pages|2^31|Max pages of the slave chain in light hash joins.|
|cairo.sql.sort.value.page.size|16777216|Memory page size of file storing values in SortedRecordCursorFactory.|
|cairo.sql.sort.value.max.pages|2^31|Max pages of file storing values in SortedRecordCursorFactory.|
|cairo.work.steal.timeout.nanos|10_000|Latch await timeout in nanos for stealing indexing work from other threads.|
|cairo.parallel.indexing.enabled|true| Allows parallel indexation. Works in conjunction with cairo.parallel.index.threshold.|
|cairo.sql.join.metadata.page.size|16384|Memory page size for JoinMetadata file.|
|cairo.sql.join.metadata.max.resizes|2^31|Number of map resizes in JoinMetadata before a resource limit exception is thrown, each resize doubles the previous size.|
|cairo.sql.analytic.column.pool.capacity|64|Size of AnalyticColumn pool in SqlParser.|
|cairo.sql.create.table.model.pool.capacity|16|Size of CreateTableModel pool in SqlParser.|
|cairo.sql.column.cast.model.pool.capacity|16|Size of CreateTableModel pool in SqlParser.|
|cairo.sql.rename.table.model.pool.capacity|16|Size of RenameTableModel pool in SqlParser.|
|cairo.sql.with.clause.model.pool.capacity|128|Size of WithClauseModel pool in SqlParser.|
|cairo.sql.insert.model.pool.capacity|64|Size of InsertModel pool in SqlParser.|
|cairo.sql.copy.model.pool.capacity|32|Size of CopyModel pool in SqlParser.|
|cairo.sql.copy.buffer.size|2m|Size of buffer used when copying tables.|
|cairo.sql.double.cast.scale|12||
|cairo.sql.float.cast.scale|4|
|cairo.sql.copy.formats.file|/text_loader.json|Name of file with user's set of date and timestamp formats.|
|cairo.date.locale|en||
|cairo.timestamp.locale|en||


### PG Wire config
|Property|Default value|Description|
|---|---|---|
|pg.enabled|true||
|pg.net.active.connection.limit|10||
|pg.net.bind.to|0.0.0.0:8812||
|pg.net.event.capacity|1024||
|pg.net.io.queue.capacity|1024||
|pg.net.idle.timeout|300000||
|pg.net.interest.queue.capacity|1024||
|pg.net.listen.backlog|50000||
|pg.net.recv.buf.size|-1||
|pg.net.send.buf.size|-1||
|pg.character.store.capacity|4096||
|pg.character.store.pool.capacity|64||
|pg.connection.pool.capacity|64||
|pg.password|quest||
|pg.user|admin||
|pg.factory.cache.column.count|16||
|pg.factory.cache.row.count|16||
|pg.idle.recv.count.before.giving.up|10000||
|pg.idle.send.count.before.giving.up|10000||
|pg.max.blob.size.on.query|512k||
|pg.recv.buffer.size|1M||
|pg.send.buffer.size|1M||
|pg.date.locale|en||
|pg.timestamp.locale|en||
|pg.worker.count|2||
|pg.worker.affinity|-1,-1||
|pg.halt.on.error|false||
|pg.daemon.pool|true||

### Influx Line Protocol config
| Property                     | Default value  | Description                                         |
|--------------------------------|----------------|-----------------------------------------------------|
|line.udp.join               |"232.1.2.3"   | Multicast address receiver joins. This values is ignored when receiver is in "unicast" mode   |
|line.udp.bind.to            |"0.0.0.0:9009" | IP address of the network interface to bind listener to and port. By default UDP receiver listens on all network interfaces|
|line.udp.commit.rate       |1000000        | For packet bursts the number of continuously received messages after which receiver will force commit. Receiver will commit irrespective of this parameter when there are no messages.                 |
|line.udp.msg.buffer.size     |2048          | Buffer used to receive single message. This value should be roughly equal to your MTU size.                |
|line.udp.msg.count              |10000        | Only for Linux. On Linix QuestDB will use recvmmsg(). This is the max number of messages to receive at once.                                                    |
|line.udp.receive.buffer.size  |8388608       | UDP socket buffer size. Larger size of the buffer will help reduce message loss during bursts.                                                    |
|line.udp.enabled               |true          | Flag to enable or disable UDP receiver                                                    |
|line.udp.own.thread          |false         | When "true" UDP receiver will use its own thread and busy spin that for performance reasons. "false" makes receiver use worker threads that do everything else in QuestDB.                                                    |
|line.udp.own.thread.affinity     |-1    |  -1 does not set thread affinity. OS will schedule thread and it will be liable to run on random cores and jump between the. 0 or higher pins thread to give core. This propertly is only valid when UDP receiver uses own thread. |
|line.udp.unicast            |false         | When true, UDP will me unicast. Otherwise multicast |
|line.udp.timestamp          | n | Input timestamp resolution. Possible values are `n`, `u`, `ms`, `s` and `h`. |
|line.udp.commit.mode     | "nosync" | Commit durability. Available values are "nosync", "sync" and "async"   |

