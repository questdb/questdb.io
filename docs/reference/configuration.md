---
title: Configuration
description: Server configuration keys reference documentation.
---

This page describes methods for configuring QuestDB server settings.
Configuration can be set either:

- In the `server.conf` configuration file available in the
  [root directory](/docs/concept/root-directory-structure/)
- Using environment variables

When a key is absent from both the configuration file and the environment
variables, the default value is used. Configuration of logging is handled
separately and details of configuring this behavior can be found at the
[logging section](#logging) below.

## Environment variables

All settings in the configuration file can be set or overridden using
environment variables. If a key is set in both the `server.conf` file and via an
environment variable, the environment variable will take precedence and the
value in the server configuration file will be ignored.

To make these configuration settings available to QuestDB via environment
variables, they must be in the following format:

```shell
QDB_<KEY_OF_THE_PROPERTY>
```

Where `<KEY_OF_THE_PROPERTY>` is equal to the configuration key name. To
properly format a `server.conf` key as an environment variable it must have:

1. `QDB_` prefix
2. uppercase characters
3. all `.` period characters replaced with `_` underscore

For example, the server configuration key for shared workers must be passed as
described below:

| `server.conf` key     | env var                   |
| --------------------- | ------------------------- |
| `shared.worker.count` | `QDB_SHARED_WORKER_COUNT` |

:::note

QuestDB applies these configuration changes on startup and a running instance
must be restarted in order for configuration changes to take effect

:::

### Examples

The following configuration property customizes the number of worker threads
shared across the application:

```shell title="conf/server.conf"
shared.worker.count=5
```

```shell title="Customizing the worker count via environment variable"
export QBD_SHARED_WORKER_COUNT=5
```

## Docker

This section describes how configure QuestDB server settings when running
QuestDB in a Docker container. The examples change the default HTTP and REST API
port from `9000` to `4000` for illustrative purposes, and demonstrate how to
expose this port.

### Environment variables

Server configuration can be passed to QuestDB running in Docker by using the
`-e` flag to pass an environment variable to a container:

```bash
docker run -p 4000:4000 -e QBD_HTTP_BIND_TO=0.0.0.0:4000 questdb/questdb
```

### Mounting a volume

A server configuration file can be provided by mounting a local directory in a
QuestDB container. Given the following configuration file which overrides the
default HTTP bind property:

```shell title="./server.conf"
http.bind.to=0.0.0.0:4000
```

Running the container with the `-v` flag allows for mounting the current
directory to QuestDB's `conf` directory in the container. With the server
configuration above, HTTP ports for the web console and REST API will be
available on `localhost:4000`:

```bash
docker run -v "$(pwd):/root/.questdb/conf" -p 4000:4000 questdb/questdb
```

To mount the full root directory of QuestDB when running in a Docker container,
provide a the configuration in a `conf` directory:

```shell title="./conf/server.conf"
http.bind.to=0.0.0.0:4000
```

Mount the current directory using the `-v` flag:

```bash
docker run -v "$(pwd):/root/.questdb/" -p 4000:4000 questdb/questdb
```

The current directory will then have data persisted to disk:

```bash title="Current directory contents"
├── conf
│   └── server.conf
├── db
└── public
```

## Keys and default values

This section lists the configuration keys available to QuestDB by topic or
subsystem.

### Shared worker

Shared worker threads service SQL execution subsystems and (in the default
configuration) every other subsystem.

| Property                  | Default | Description                                                                                                                                                  |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| shared.worker.count       | 2       | Number of worker threads shared across the application. Increasing this number will increase parallelism in the application at the expense of CPU resources. |
| shared.worker.affinity    |         | Comma-delimited list of CPU ids, one per thread specified in `shared.worker.count`. By default, threads have no CPU affinity.                                |
| shared.worker.haltOnError | false   | Toggle whether worker should stop on error.                                                                                                                  |

#### Load balancing

This section describes configuration settings for the distribution of work by
writer threads in a QuestDB instance.

| Property                                  | Default | Description                                                                                                                                              |
| ----------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| line.tcp.n.updates.per.load.balance       | 10000   | Maximum number of updates in a given table since the last load balancing before triggering a new load balancing job.                                     |
| line.tcp.max.load.ratio                   | 1.9     | Maximum load ratio (max loaded worker/min loaded worker) before QuestDB will attempt to rebalance the load between the writer workers.                   |
| line.tcp.max.uncommitted.rows             | 1000    | Maximum number of uncommitted rows, note that rows will always be committed if they have been received line.tcp.maintenance.job.hysteresis.in.ms ms ago. |
| line.tcp.maintenance.job.hysteresis.in.ms | 1000    | Maximum amount of time in between maintenance jobs, these will commit any uncommited data.                                                               |

### Minimal HTTP server

This server runs embedded in a QuestDB instance by default and enables health
checks of an instance via HTTP. It responds to all requests with a HTTP status
code of `200` unless the QuestDB process dies.

Examples of how to use this server, along with expected responses, can be found
on the [health monitoring page](/docs/operations/health-monitoring/).

| Property         | Default      | Description                                                                                                                                            |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| http.min.enabled | true         | Enable Minimal HTTP server.                                                                                                                            |
| http.min.bind.to | 0.0.0.0:9003 | IPv4 address and port of the server. 0 means it will bind to all network interfaces. Otherwise IP address must by one of the existing network adaptors |

### HTTP server

This section describes configuration settings for the Web Console available by
default on port `9000`. For details on the use of this component, refer to the
[web console documentation](/docs/reference/web-console/) page.

| Property                                       | Default        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| http.enabled                                   | true           | Enable HTTP server.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| http.connection.pool.initial.capacity          | 16             | Initial size of pool of reusable objects that hold connection state. The pool should be configured to maximum realistic load so that it does not resize at runtime.                                                                                                                                                                                                                                                                                                |
| http.connection.string.pool.capacity           | 128            | Initial size of the string pool shared by HttpHeaderParser and HttpMultipartContentParser.                                                                                                                                                                                                                                                                                                                                                                         |
| http.multipart.header.buffer.size              | 512            | HeaderParser buffer size in bytes.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| http.multipart.idle.spin.count                 | 10_000         | How long the code accumulates incoming data chunks for column and delimiter analysis.                                                                                                                                                                                                                                                                                                                                                                              |
| http.receive.buffer.size                       | 1m             | Size of receive buffer.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| http.request.header.buffer.size                | 64k            | Size of internal buffer allocated for HTTP request headers. The value is rounded up to the nearest power of 2. When HTTP request contains headers that exceed the buffer size server will disconnect the client with HTTP error in server log.                                                                                                                                                                                                                     |
| http.response.header.buffer.size               | 32k            | Size of the internal response buffer. The value will be rounded up to the nearest power of 2. The buffer size should be large enough to accommodate max size of server response headers.                                                                                                                                                                                                                                                                           |
| http.worker.count                              | 0              | Number of threads in private worker pool. When value is 0, HTTP server will be using shared worker pool of the server. Values above 0 switch on private pool.                                                                                                                                                                                                                                                                                                      |
| http.worker.affinity                           |                | comma separated list of CPU core indexes. The number of items of this list must be equal to the worker count.                                                                                                                                                                                                                                                                                                                                                      |
| http.worker.haltOnError                        | false          | Flag that indicates if worker thread must shutdown on unhandled error. We strongly recommend not to change default value.                                                                                                                                                                                                                                                                                                                                          |
| http.send.buffer.size                          | 2m             | Size of the internal send buffer. The larger than buffer size the fewer IO interruptions server is making at expense of memory usage per connection. There is a limit of send buffer size after which increasing it stops being useful in terms of performance. 2MB seems to be optimal value.                                                                                                                                                                     |
| http.static.index.file.name                    | index.html     | Name of index file for the Web Console.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| http.frozen.clock                              | false          | Sets the clock to always return zero. This configuration parameter is used for internal testing.                                                                                                                                                                                                                                                                                                                                                                   |
| http.allow.deflate.before.send                 | false          | Enable / disable Gzip compression of outgoing data.                                                                                                                                                                                                                                                                                                                                                                                                                |
| http.keep-alive.timeout                        | 5              | Used together with `http.keep-alive.max` to set the value of HTTP `Keep-Alive` response header. This instructs browser to keep TCP connection open. Has to be `0` when `http.version` is set to `HTTP/1.0`.                                                                                                                                                                                                                                                        |
| http.keep-alive.max                            | 10_000         | See `http.keep-alive.timeout`. Has to be `0` when `http.version` is set to `HTTP/1.0`.                                                                                                                                                                                                                                                                                                                                                                             |
| http.static.public.directory                   | public         | The name of directory for public web site.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| http.net.active.connection.limit               | 256            | The number of simultaneous TCP connection to the HTTP server. The rationale of the value is to control server memory consumption.                                                                                                                                                                                                                                                                                                                                  |
| http.net.event.capacity                        | 1024           | Internal IO event queue capacity (EPoll, KQqueu, Select). Size of these queues must be larger than `http.net.active.connection.limit`.                                                                                                                                                                                                                                                                                                                             |
| http.net.io.queue.capacity                     | 1024           | Internal IO queue of HTTP server. Size of this queue must be larger than `http.net.active.connection.limit`. Queue size smaller than active connection max will substantially slow down the server by increasing wait times. Queue larger than connection max reduces wait time to 0.                                                                                                                                                                              |
| http.net.idle.connection.timeout               | 300000         | TCP connection idle timeout in milliseconds. Connection is closed by HTTP server when this timeout lapses.                                                                                                                                                                                                                                                                                                                                                         |
| http.net.interest.queue.capacity               | 1024           | Internal queue size. This is also related to `http.net.active.connection.limit` in a way that sizes larger than connection max remove any waiting.                                                                                                                                                                                                                                                                                                                 |
| http.net.listen.backlog                        | 256            | Backlog argument value for [listen()](https://man7.org/linux/man-pages/man2/listen.2.html) call.                                                                                                                                                                                                                                                                                                                                                                   |
| http.net.snd.buf.size                          | 2m             | Maximum send buffer size on each TCP socket. If value is -1 socket send buffer remains unchanged from OS default.                                                                                                                                                                                                                                                                                                                                                  |
| http.net.rcv.buf.size                          | 2m             | Maximum receive buffer size on each TCP socket. If value is -1 socket receive buffer remains unchanged from OS default.                                                                                                                                                                                                                                                                                                                                            |
| http.text.date.adapter.pool.capacity           | 16             | Size of date adaptor pool. This should be set to the anticipated maximum number of `DATE` fields a text input can have. The pool is assigned to connection state and is reused alongside of connection state object.                                                                                                                                                                                                                                               |
| http.text.json.cache.limit                     | 16384          | JSON parser cache limit. Cache is used to compose JSON elements that have been broken up by TCP protocol. This value limits the maximum length of individual tag or tag value.                                                                                                                                                                                                                                                                                     |
| http.text.json.cache.size                      | 8192           | Initial size of JSON parser cache. The value must not exceed `http.text.json.cache.limit` and should be set to avoid cache resizes at runtime.                                                                                                                                                                                                                                                                                                                     |
| http.text.max.required.delimiter.stddev        | 0.1222d        | The maximum standard deviation value for the algorithm that calculates text file delimiter. Usually when text parser cannot recognise the delimiter it will log the calculated and maximum standard deviation for the delimiter candidate.                                                                                                                                                                                                                         |
| http.text.max.required.line.length.stddev      | 0.8            | Maximum standard deviation value for the algorithm that classifies input as text or binary. For the values above configured stddev input will be considered binary.                                                                                                                                                                                                                                                                                                |
| http.text.metadata.string.pool.capacity        | 128            | The initial size of pool for objects that wrap individual elements of metadata JSON, such as column names, date pattern strings and locale values.                                                                                                                                                                                                                                                                                                                 |
| http.text.roll.buffer.limit                    | 4m             | The limit of text roll buffer. See `http.text.roll.buffer.size` for description.                                                                                                                                                                                                                                                                                                                                                                                   |
| http.text.roll.buffer.size                     | 1024           | Roll buffer is a structure in text parser that holds a copy of a line that has been broken up by TCP. The size should be set to the maximum length of text line in text input.                                                                                                                                                                                                                                                                                     |
| http.text.analysis.max.lines                   | 1000           | Number of lines to read on CSV import for heuristics which determine column names & types. Lower line numbers may detect CSV schemas quicker, but possibly with less accuracy. 1000 lines is the maximum for this value.                                                                                                                                                                                                                                           |
| http.text.lexer.string.pool.capacity           | 64             | The initial capacity of string fool, which wraps `STRING` column types in text input. The value should correspond to the maximum anticipated number of STRING columns in text input.                                                                                                                                                                                                                                                                               |
| http.text.timestamp.adapter.pool.capacity      | 64             | Size of timestamp adaptor pool. This should be set to the anticipated maximum number of `TIMESTAMP` fields a text input can have. The pool is assigned to connection state and is reused alongside of connection state object                                                                                                                                                                                                                                      |
| http.text.utf8.sink.size                       | 4096           | Initial size of UTF-8 adaptor sink. The value should correspond the maximum individual field value length in text input                                                                                                                                                                                                                                                                                                                                            |
| http.json.query.connection.check.frequency     | 1_000_000      | The value to throttle check if client socket has been disconnected. It is not recommended to change this value                                                                                                                                                                                                                                                                                                                                                     |
| http.json.query.float.scale                    | 10             | The scale value of string representation of `FLOAT` values                                                                                                                                                                                                                                                                                                                                                                                                         |
| http.json.query.double.scale                   | 12             | The scale value of string representation of `DOUBLE` values                                                                                                                                                                                                                                                                                                                                                                                                        |
| http.bind.to                                   | 0.0.0.0:9000   | IP address and port of HTTP server. 0 means that http server will bind to all network interfaces. You can specify IP address of any individual network interface on your system                                                                                                                                                                                                                                                                                    |
| http.security.readonly                         | false          | Forces HTTP read only mode when `true`, which disables commands which modify the data or data structure.                                                                                                                                                                                                                                                                                                                                                           |
| http.security.max.response.rows                | Long.MAX_VALUE | Limit the number of response rows over HTTP.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| http.security.interrupt.on.closed.connection   | true           | Switch to enable termination of SQL processing if the HTTP connection is closed. The mechanism affects performance so the connection is only checked after http.security.interruptor.iterations.per.check calls are made to the check method. The mechanism also reads from the input stream and discards it since some HTTP clients send this as a keep alive in between requests, http.security.interruptor.buffer.size denotes the size of the buffer for this. |
| http.security.interruptor.iterations.per.check | 2000000        | Number of internal iterations such as loops over data before checking if the HTTP connection is still open                                                                                                                                                                                                                                                                                                                                                         |
| http.security.interruptor.buffer.size          | 32             | Size of buffer to read from HTTP connection. If this buffer returns zero and the HTTP client is no longer sending data, SQL processing will be terminated.                                                                                                                                                                                                                                                                                                         |
| http.server.keep.alive                         | true           | If set to `false`, the server will disconnect the client after completion of each request.                                                                                                                                                                                                                                                                                                                                                                         |
| http.version                                   | HTTP/1.1       | Protocol version, other supported value is `HTTP/1.0`.                                                                                                                                                                                                                                                                                                                                                                                                             |

### Cairo engine

This section describes configuration settings for the Cairo SQL engine in
QuestDB.

| Property                                     | Default           | Description                                                                                                                                                                                                              |
| -------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| cairo.sql.copy.root                          | null              | Input root directory for backups.                                                                                                                                                                                        |
| cairo.sql.backup.root                        | null              | Output root directory for backups.                                                                                                                                                                                       |
| cairo.sql.backup.dir.datetime.format         | null              | Date format for backup directory.                                                                                                                                                                                        |
| cairo.sql.backup.dir.tmp.name                | tmp               | Name of tmp directory used during backup.                                                                                                                                                                                |
| cairo.sql.backup.mkdir.mode                  | 509               | Permission used when creating backup directories.                                                                                                                                                                        |
| cairo.root                                   | db                | Directory for storing db tables and metadata. This directory is inside the server root directory provided at startup.                                                                                                    |
| cairo.commit.mode                            | nosync            | How changes to table are flushed to disk upon commit. Choices: `nosync`, `async` (flush call schedules update, returns immediately), `sync` (waits for flush to complete).                                               |
| cairo.create.as.select.retry.count           | 5                 | Number of types table creation or insertion will be attempted.                                                                                                                                                           |
| cairo.default.map.type                       | fast              | Type of map used. Options: `fast` (speed at the expense of storage), `compact`.                                                                                                                                          |
| cairo.default.symbol.cache.flag              | false             | When `true`, symbol values will be cached on Java heap.                                                                                                                                                                  |
| cairo.default.symbol.capacity                | 256               | Specifies approximate capacity for `SYMBOL` columns. It should be equal to number of unique symbol values stored in the table and getting this value badly wrong will cause performance degradation. Must be power of 2. |
| cairo.file.operation.retry.count             | 30                | Number of attempts to open files.                                                                                                                                                                                        |
| cairo.idle.check.interval                    | 300000            | Frequency of writer maintenance job in milliseconds.                                                                                                                                                                     |
| cairo.inactive.reader.ttl                    | -120000           | Frequency of reader pool checks for inactive readers in milliseconds.                                                                                                                                                    |
| cairo.inactive.writer.ttl                    | -600000           | Frequency of writer pool checks for inactive writers in milliseconds.                                                                                                                                                    |
| cairo.index.value.block.size                 | 256               | Approximation of number of rows for a single index key, must be power of 2.                                                                                                                                              |
| cairo.max.swap.file.count                    | 30                | Number of attempts to open swap files.                                                                                                                                                                                   |
| cairo.mkdir.mode                             | 509               | File permission mode for new directories.                                                                                                                                                                                |
| cairo.parallel.index.threshold               | 100000            | Minimum number of rows before allowing use of parallel indexation.                                                                                                                                                       |
| cairo.reader.pool.max.segments               | 5                 | Number of attempts to get TableReader.                                                                                                                                                                                   |
| cairo.spin.lock.timeout                      | 1_000_000         | Timeout when attempting to get BitmapIndexReaders in microseconds.                                                                                                                                                       |
| cairo.cache.rows                             | 16                | Number of rows for the query cache.                                                                                                                                                                                      |
| cairo.cache.blocks                           | 4                 | Number of blocks for the query cache.                                                                                                                                                                                    |
| cairo.character.store.capacity               | 1024              | Size of the CharacterStore.                                                                                                                                                                                              |
| cairo.character.store.sequence.pool.capacity | 64                | Size of the CharacterSequence pool.                                                                                                                                                                                      |
| cairo.column.pool.capacity                   | 4096              | Size of the Column pool in the SqlCompiler.                                                                                                                                                                              |
| cairo.compact.map.load.factor                | 0.7               | Load factor for CompactMaps.                                                                                                                                                                                             |
| cairo.expression.pool.capacity               | 8192              | Size of the ExpressionNode pool in SqlCompiler.                                                                                                                                                                          |
| cairo.fast.map.load.factor                   | 0.5               | Load factor for all FastMaps.                                                                                                                                                                                            |
| cairo.sql.join.context.pool.capacity         | 64                | Size of the JoinContext pool in SqlCompiler.                                                                                                                                                                             |
| cairo.lexer.pool.capacity                    | 2048              | Size of FloatingSequence pool in GenericLexer.                                                                                                                                                                           |
| cairo.sql.map.key.capacity                   | 2m                | Key capacity in FastMap and CompactMap.                                                                                                                                                                                  |
| cairo.sql.map.max.resizes                    | 2^31              | Number of map resizes in FastMap and CompactMap before a resource limit exception is thrown, each resize doubles the previous size.                                                                                      |
| cairo.sql.map.page.size                      | 4m                | Memory page size for FastMap and CompactMap.                                                                                                                                                                             |
| cairo.sql.map.max.pages                      | 2^31              | Memory max pages for CompactMap.                                                                                                                                                                                         |
| cairo.model.pool.capacity                    | 1024              | Size of the QueryModel pool in the SqlCompiler.                                                                                                                                                                          |
| cairo.sql.sort.key.page.size                 | 4m                | Memory page size for storing keys in LongTreeChain.                                                                                                                                                                      |
| cairo.sql.sort.key.max.pages                 | 2^31              | Max number of pages for storing keys in LongTreeChain before a resource limit exception is thrown.                                                                                                                       |
| cairo.sql.sort.light.value.page.size         | 1048576           | Memory page size for storing values in LongTreeChain.                                                                                                                                                                    |
| cairo.sql.sort.light.value.max.pages         | 2^31              | Max pages for storing values in LongTreeChain.                                                                                                                                                                           |
| cairo.sql.hash.join.value.page.size          | 16777216          | Memory page size of the slave chain in full hash joins.                                                                                                                                                                  |
| cairo.sql.hash.join.value.max.pages          | 2^31              | Max pages of the slave chain in full hash joins.                                                                                                                                                                         |
| cairo.sql.latest.by.row.count                | 1000              | Number of rows for LATEST BY.                                                                                                                                                                                            |
| cairo.sql.hash.join.light.value.page.size    | 1048576           | Memory page size of the slave chain in light hash joins.                                                                                                                                                                 |
| cairo.sql.hash.join.light.value.max.pages    | 2^31              | Max pages of the slave chain in light hash joins.                                                                                                                                                                        |
| cairo.sql.sort.value.page.size               | 16777216          | Memory page size of file storing values in SortedRecordCursorFactory.                                                                                                                                                    |
| cairo.sql.sort.value.max.pages               | 2^31              | Max pages of file storing values in SortedRecordCursorFactory.                                                                                                                                                           |
| cairo.work.steal.timeout.nanos               | 10_000            | Latch await timeout in nanos for stealing indexing work from other threads.                                                                                                                                              |
| cairo.parallel.indexing.enabled              | true              | Allows parallel indexation. Works in conjunction with cairo.parallel.index.threshold.                                                                                                                                    |
| cairo.sql.join.metadata.page.size            | 16384             | Memory page size for JoinMetadata file.                                                                                                                                                                                  |
| cairo.sql.join.metadata.max.resizes          | 2^31              | Number of map resizes in JoinMetadata before a resource limit exception is thrown, each resize doubles the previous size.                                                                                                |
| cairo.sql.analytic.column.pool.capacity      | 64                | Size of AnalyticColumn pool in SqlParser.                                                                                                                                                                                |
| cairo.sql.create.table.model.pool.capacity   | 16                | Size of CreateTableModel pool in SqlParser.                                                                                                                                                                              |
| cairo.sql.column.cast.model.pool.capacity    | 16                | Size of CreateTableModel pool in SqlParser.                                                                                                                                                                              |
| cairo.sql.rename.table.model.pool.capacity   | 16                | Size of RenameTableModel pool in SqlParser.                                                                                                                                                                              |
| cairo.sql.with.clause.model.pool.capacity    | 128               | Size of WithClauseModel pool in SqlParser.                                                                                                                                                                               |
| cairo.sql.insert.model.pool.capacity         | 64                | Size of InsertModel pool in SqlParser.                                                                                                                                                                                   |
| cairo.sql.copy.model.pool.capacity           | 32                | Size of CopyModel pool in SqlParser.                                                                                                                                                                                     |
| cairo.sql.copy.buffer.size                   | 2m                | Size of buffer used when copying tables.                                                                                                                                                                                 |
| cairo.sql.double.cast.scale                  | 12                | Maximum number of decimal places that types cast as doubles have                                                                                                                                                         |
| cairo.sql.float.cast.scale                   | 4                 | Maximum number of decimal places that types cast as floats have                                                                                                                                                          |
| cairo.sql.copy.formats.file                  | /text_loader.json | Name of file with user's set of date and timestamp formats.                                                                                                                                                              |
| cairo.date.locale                            | en                | The locale to handle date types                                                                                                                                                                                          |
| cairo.timestamp.locale                       | en                | The locale to handle timestamp types                                                                                                                                                                                     |

### Postgres wire protocol

This section describes configuration settings for client connections using
PostreSQL wire protocol.

| Property                            | Default      | Description                                                                                                                                                                                                                                                                                 |
| ----------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pg.enabled                          | true         | Configuration for enabling or diabling the Postres interface                                                                                                                                                                                                                                |
| pg.net.active.connection.limit      | 10           | The number of simultaneous PostgreSQL connections to the server. This value is intended to control server memory consumption.                                                                                                                                                               |
| pg.net.bind.to                      | 0.0.0.0:8812 | IP address and port of PostgreSQL server. 0 means that the server will bind to all network interfaces. You can specify IP address of any individual network interface on your system                                                                                                        |
| pg.net.event.capacity               | 1024         | Internal IO event queue capacity (EPoll, KQqueu, Select). Size of these queues **must be larger than** `active.connection.limit`                                                                                                                                                            |
| pg.net.io.queue.capacity            | 1024         | Internal IO queue of the server. The size of this queue **must be larger than** the `active.connection.limit`. A queue size smaller than active connection max will substantially slow down the server by increasing wait times. A queue larger than connection max reduces wait time to 0. |
| pg.net.idle.timeout                 | 300000       | Connection idle timeout in milliseconds. Connections are closed by the server when this timeout lapses.                                                                                                                                                                                     |
| pg.net.interest.queue.capacity      | 1024         | Internal queue size. This is also related to `active.connection.limit` in a way that sizes larger than connection max remove any waiting.                                                                                                                                                   |
| pg.net.listen.backlog               | 50000        | Backlog argument value for [listen()](https://man7.org/linux/man-pages/man2/listen.2.html) call.                                                                                                                                                                                            |
| pg.net.recv.buf.size                | -1           | Maximum send buffer size on each TCP socket. If value is -1 socket send buffer remains unchanged from OS default.                                                                                                                                                                           |
| pg.net.send.buf.size                | -1           | Maximum receive buffer size on each TCP socket. If value is -1, the socket receive buffer remains unchanged from OS default.                                                                                                                                                                |
| pg.character.store.capacity         | 4096         | Size of the CharacterStore                                                                                                                                                                                                                                                                  |
| pg.character.store.pool.capacity    | 64           | Size of the CharacterStore pool capacity                                                                                                                                                                                                                                                    |
| pg.connection.pool.capacity         | 64           | The maximum amount of pooled connections this interface may have                                                                                                                                                                                                                            |
| pg.password                         | quest        | Postgres database password                                                                                                                                                                                                                                                                  |
| pg.user                             | admin        | Postgres database username                                                                                                                                                                                                                                                                  |
| pg.factory.cache.column.count       | 16           | Number of columns to cache SQL execution plan against text to speed up execution. This value must be 2n (power of two).                                                                                                                                                                     |
| pg.factory.cache.row.count          | 16           | Number of rows to cache for SQL execution plan against text to speed up execution. This value must be 2n (power of two)                                                                                                                                                                     |
| pg.idle.recv.count.before.giving.up | 10000        | Number of times to poll receive method that returns zero data before deciding what to do next with the connection                                                                                                                                                                           |
| pg.idle.send.count.before.giving.up | 10000        | Number of times to poll send method that returns zero data before deciding what to do next with the connection                                                                                                                                                                              |
| pg.max.blob.size.on.query           | 512k         | For binary values, clients will receive an error when requesting blob sizes above this value                                                                                                                                                                                                |
| pg.recv.buffer.size                 | 1M           | Size of the buffer for receiving data                                                                                                                                                                                                                                                       |
| pg.send.buffer.size                 | 1M           | Size of the buffer for sending data                                                                                                                                                                                                                                                         |
| pg.date.locale                      | en           | The locale to handle date types                                                                                                                                                                                                                                                             |
| pg.timestamp.locale                 | en           | The locale to handle timestamp types                                                                                                                                                                                                                                                        |
| pg.worker.count                     | 2            | Number of dedicated worker threads assigned to write data. When `0`, the writer jobs will use the shared pool.                                                                                                                                                                              |
| pg.worker.affinity                  | -1,-1        | Comma-separated list of thread numbers which should be pinned for Postgres ingestion. Example `line.tcp.worker.affinity=1,2,3`.                                                                                                                                                             |
| pg.halt.on.error                    | false        | Whether ingestion should stop upon internal error                                                                                                                                                                                                                                           |

### InfluxDB line protocol (TCP)

This section describes ingestion settings for incoming messages using InfluxDB
line protocol over TCP.

| Property                             | Default      | Description                                                                                                                                                                                                                                                                                 |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| line.tcp.auth.db.path                |              | Path which points to the authentication db file.                                                                                                                                                                                                                                            |
| line.tcp.default.partition.by        | DAY          | The default partitioning strategy applied to new tables dynamically created by sending records via ILP created                                                                                                                                                                              |
| line.tcp.enabled                     | true         | Enable or disable line protocol over TCP.                                                                                                                                                                                                                                                   |
| line.tcp.net.active.connection.limit | 10           | The number of simultaneous connections to the server. This value is intended to control server memory consumption.                                                                                                                                                                          |
| line.tcp.net.bind.to                 | 0.0.0.0:9009 | Internal IO event queue capacity (EPoll, KQqueu, Select). Size of these queues **must be larger than** `active.connection.limit`.                                                                                                                                                           |
| line.tcp.net.event.capacity          | 1024         | Internal IO queue of the server. The size of this queue **must be larger than** the `active.connection.limit`. A queue size smaller than active connection max will substantially slow down the server by increasing wait times. A queue larger than connection max reduces wait time to 0. |
| line.tcp.net.io.queue.capacity       | 1024         | Connection idle timeout in milliseconds. Connections are closed by the server when this timeout lapses.                                                                                                                                                                                     |
| line.tcp.net.idle.timeout            | 300000       | Internal queue size. This is also related to `active.connection.limit` in a way that sizes larger than connection max remove any waiting.                                                                                                                                                   |
| line.tcp.net.interest.queue.capacity | 1024         | Backlog argument value for [listen()](https://man7.org/linux/man-pages/man2/listen.2.html) call.                                                                                                                                                                                            |
| line.tcp.net.listen.backlog          | 50000        | Maximum send buffer size on each TCP socket. If value is -1 socket send buffer remains unchanged from OS default.                                                                                                                                                                           |
| line.tcp.net.recv.buf.size           | -1           | Maximum receive buffer size on each TCP socket. If value is -1, the socket receive buffer remains unchanged from OS default.                                                                                                                                                                |
| line.tcp.connection.pool.capacity    | 64           | The maximum amount of pooled connections this interface may have                                                                                                                                                                                                                            |
| line.tcp.timestamp                   | n            | Input timestamp resolution. Possible values are `n`, `u`, `ms`, `s` and `h`.                                                                                                                                                                                                                |
| line.tcp.msg.buffer.size             | 2048         | Size of the buffer read from queue. Maximum size of write request, regardless of the number of measurements.                                                                                                                                                                                |
| line.tcp.max.measurement.size        | 2048         | Maximum size of any measurement.                                                                                                                                                                                                                                                            |
| line.tcp.writer.queue.size           | 128          | Size of the queue between network IO and writer jobs. Each queue entry represents a measurement.                                                                                                                                                                                            |
| line.tcp.worker.count                | 0            | Number of dedicated worker threads assigned to write data. When `0`, the writer jobs will use the shared pool.                                                                                                                                                                              |
| line.tcp.worker.affinity             | 0            | Comma-separated list of thread numbers which should be pinned for line protocol ingestion over TCP. Example `line.tcp.worker.affinity=1,3,4`.                                                                                                                                               |
| line.tcp.halt.on.error               | false        | Whether ingestion should stop upon internal error                                                                                                                                                                                                                                           |

### InfluxDB line protocol (UDP)

This section describes ingestion settings for incoming messages using InfluxDB
line protocol over UDP.

| Property                     | Default      | Description                                                                                                                                                                                                                      |
| ---------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| line.udp.join                | 232.1.2.3    | Multicast address receiver joins. This values is ignored when receiver is in "unicast" mode.                                                                                                                                     |
| line.udp.bind.to             | 0.0.0.0:9009 | IP address of the network interface to bind listener to and port. By default UDP receiver listens on all network interfaces.                                                                                                     |
| line.udp.commit.rate         | 1000000      | For packet bursts the number of continuously received messages after which receiver will force commit. Receiver will commit irrespective of this parameter when there are no messages.                                           |
| line.udp.msg.buffer.size     | 2048         | Buffer used to receive single message. This value should be roughly equal to your MTU size.                                                                                                                                      |
| line.udp.msg.count           | 10000        | Only for Linux. On Linix QuestDB will use recvmmsg(). This is the max number of messages to receive at once.                                                                                                                     |
| line.udp.receive.buffer.size | 8388608      | UDP socket buffer size. Larger size of the buffer will help reduce message loss during bursts.                                                                                                                                   |
| line.udp.enabled             | true         | Flag to enable or disable UDP receiver.                                                                                                                                                                                          |
| line.udp.own.thread          | false        | When "true" UDP receiver will use its own thread and busy spin that for performance reasons. "false" makes receiver use worker threads that do everything else in QuestDB.                                                       |
| line.udp.own.thread.affinity | -1           | -1 does not set thread affinity. OS will schedule thread and it will be liable to run on random cores and jump between the. 0 or higher pins thread to give core. This property is only valid when UDP receiver uses own thread. |
| line.udp.unicast             | false        | When true, UDP will me unicast. Otherwise multicast.                                                                                                                                                                             |
| line.udp.timestamp           | n            | Input timestamp resolution. Possible values are `n`, `u`, `ms`, `s` and `h`.                                                                                                                                                     |
| line.udp.commit.mode         | nosync       | Commit durability. Available values are `nosync`, `sync` and `async`.                                                                                                                                                            |

### Telemetry

QuestDB sends anonymized telemetry data with information about usage which helps
us improve the product over time. We do not collect any personally-identifying
information, and we do not share any of this data with third parties.

| Property          | Default | Description                                          |
| ----------------- | ------- | ---------------------------------------------------- |
| telemetry.enabled | true    | Enable / disable anonymous usage metrics collection. |

## Logging

The logging behavior of QuestDB may be set in dedicated configuration files or
by environment variables. This section describes how to configure logging using
these methods.

### Configuration file

Logs may be configured via a dedicated file named `qlog.conf`.

```shell title="qlog.conf"
# list of configured writers
writers=file,stdout

# file writer
#w.file.class=io.questdb.log.LogFileWriter
#w.file.location=questdb-debug.log
#w.file.level=INFO,ERROR

# stdout
w.stdout.class=io.questdb.log.LogConsoleWriter
w.stdout.level=INFO,ERROR
```

QuestDB will look for `/qlog.conf` on the classpath unless this name is
overridden via a "system" property: `-Dout=/something_else.conf`.

### Environment variables

Values in the `qlog.conf` file can be overridden with environment variables. All
configuration keys must be formatted as described in the
[environment variables](#environment-variables) section above.

For example, to set logging on `ERROR` level only:

```shell title="Setting log level to ERROR in qlog.conf"
w.stdout.level=ERROR
```

```shell title="Setting log level to ERROR via environment variable"
export QDB_LOG_W_STDOUT_LEVEL=ERROR
```

### Debug

QuestDB logging can be quickly forced globally to `DEBUG` via either providing
the java option `-Debug` or setting the environment variable `QDB_DEBUG=true`.
