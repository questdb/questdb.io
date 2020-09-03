---
title: How to perform CRUD operations
sidebar_label: CRUD operations
description:
  Tutorial showing how to perform CRUD operations with QuestDB. This will help
  you understand QuestDB's data model.
---

QuestDB's data store is mostly meant to be immutable. While we plan to support
out-of-order inserts from 4.3, the most efficient way to use QuestDB is as
`append only`.

We propose an efficient model to perform CRUD operations revolving around the
use of `LATEST BY`. This page describes each of CRUD operations
([create](#create), [read](#read), [update](#update), [delete](#delete)) and how
to implement them in an append-only scenario at high efficiency.

## (C)reate

The Create operation in QuestDB appends records to bottom of a table. If the
table has a [designated timestamp](/docs/concept/designated-timestamp/), new
record timestamps must be superior or equal to the latest timestamp. Attempts to
add a timestamp in middle of a table will result in a `timestamp out of order`
error.

If the table is [partitioned](/docs/concept/partitions/), then the `timestamp`
value determines which partition the record is appended to. In this case, only
the last partition can be appended to.

When a table does not have a `designated timestamp`, records can be added in any
timestamp order and the table will only have one partition.

Let's first create table that holds bank balances for customers.

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="sql" values={[
  { label: "SQL", value: "sql" },
  { label: "REST", value: "rest" },
  { label: "Java", value: "java" },
  { label: "JDBC", value: "jdbc" }
]}>


<TabItem value="sql">


```questdb-sql
CREATE TABLE balances (
	cust_id INT,
	balance_ccy SYMBOL,
	balance DOUBLE,
	inactive BOOLEAN,
	ts TIMESTAMP
);
}
```

</TabItem>
<TabItem value="rest">


```shell
curl -G "http://localhost:13005/exec" --data-urlencode "query=
create table balances (
    cust_id int,
    balance_ccy symbol,
    balance double,
    inactive boolean,
    timestamp timestamp
)"
```

</TabItem>
<TabItem value="java">


```java
final String cairoDatabaseRoot = "/tmp";
try (CairoEngine engine = new CairoEngine(
    new DefaultCairoConfiguration(cairoDatabaseRoot))
) {
    try (SqlCompiler compiler = new SqlCompiler(engine)) {
        compiler.compile("create table balances (\n" +
                "    cust_id int, \n" +
                "    balance_ccy symbol, \n" +
                "    balance double, \n" +
                "    inactive boolean, \n" +
                "    timestamp timestamp\n" +
                ")");
    }
}
```

</TabItem>
<TabItem value="jdbc">


```java
Properties properties = new Properties();
properties.setProperty("user", "admin");
properties.setProperty("password", "quest");
properties.setProperty("sslmode", "disable");

final Connection connection =
    DriverManager.getConnection("jdbc:postgresql://localhost:9120/qdb", properties);
PreparedStatement statement = connection.prepareStatement(
    "create table balances (" +
    "    cust_id int," +
    "    balance_ccy symbol," +
    "    balance double," +
    "    inactive boolean," +
    "    timestamp timestamp" +
    ")"
);
statement.execute();
connection.close();
```

</TabItem>
</Tabs>


- `cust_id` is the customer identifier. It uniquely identifies customer.
- `balance_ccy` balance currency. We use `SYMBOL` here to avoid storing text
  against each record to save space and increase database performance.
- `balance` is the current balance for customer and currency tuple.
- `inactive` is used to flag deleted records.
- `timestamp` timestamp in microseconds of the record. Note that if you receive
  the timestamp data as a string, it could also be inserted using
  [to_timestamp](/docs/reference/function/date-time/#to_timestamp).

Let's now insert a few records:

<Tabs defaultValue="sql" values={[
  { label: "SQL", value: "sql" },
  { label: "REST", value: "rest" },
  { label: "Java", value: "java", },
  { label: "JDBC", value: "jdbc", }
]}>
<TabItem value="sql">


```questdb-sql
INSERT INTO balances (cust_id, balance_ccy, balance, timestamp)
VALUES (1, 'USD', 1500.00, 1587571882704665);

INSERT INTO balances (cust_id, balance_ccy, balance, timestamp)
VALUES (1, 'EUR', 650.50, 1587571892904234);

INSERT INTO balances (cust_id, balance_ccy, balance, timestamp)
VALUES (2, 'USD', 900.75, 1587571963504432);

INSERT INTO balances (cust_id, balance_ccy, balance, timestamp)
VALUES (2, 'EUR', 880.20, 1587572314404665);
}
```

</TabItem>
<TabItem value="rest">


```shell
curl -G "http://localhost:13005/exec" --data-urlencode "query=
insert into balances (cust_id, balance_ccy, balance, timestamp)
	values (1, 'USD', 1500.00, 1587571882704665)
```

</TabItem>
<TabItem value="java">


```java
CairoConfiguration configuration = new DefaultCairoConfiguration(".");
try (CairoEngine engine = new CairoEngine(configuration)) {
    try (TableWriter writer = engine.getWriter(AllowAllCairoSecurityContext.INSTANCE, "balances")) {
        TableWriter.Row r;

        r = writer.newRow(1587571882704665); // timestamp
        r.putInt(0, 1); // cust_id
        r.putSym(1, "USD"); // symbol
        r.putDouble(2, 1500.00); // balance
        r.append();

        r = writer.newRow(1587571892904234); // timestamp
        r.putInt(0, 1); // cust_id
        r.putSym(1, "EUR"); // symbol
        r.putDouble(2, 650.5); // balance
        r.append();

        r = writer.newRow(1587571963504432); // timestamp
        r.putInt(0, 2); // cust_id
        r.putSym(1, "USD"); // symbol
        r.putDouble(2, 900.75); // balance
        r.append();

        r = writer.newRow(1587572314404665); // timestamp
        r.putInt(0, 2); // cust_id
        r.putSym(1, "USD"); // symbol
        r.putDouble(2, 880.2); // balance
        r.append();

        writer.commit();
    }
}
```

</TabItem>
<TabItem value="jdbc">


```java
Properties properties = new Properties();
properties.setProperty("user", "admin");
properties.setProperty("password", "quest");
properties.setProperty("sslmode", "disable");

final Connection connection =
    DriverManager.getConnection("jdbc:postgresql://localhost:9120/qdb", properties);
PreparedStatement insert = connection.prepareStatement(
    "insert into balances (cust_id, balance_ccy, balance, timestamp)"+
     	"values (?, ?, ?, ?)";

)
insert.setInt(1, 1);
insert.setString(2, "USD");
insert.setDouble(3, 1500);
insert.setLong(4, 1587571882704665);

insert.execute();
connection.close();

```

</TabItem>
</Tabs>


Our resulting table looks like the following.

| cust_id | balance_ccy | balance | inactive | timestamp                   |
| ------- | ----------- | ------- | -------- | --------------------------- |
| 1       | USD         | 1500    | FALSE    | 2020-04-22T16:11:22.704665Z |
| 1       | EUR         | 650.5   | FALSE    | 2020-04-22T16:11:32.904234Z |
| 2       | USD         | 900.75  | FALSE    | 2020-04-22T16:12:43.504432Z |
| 2       | EUR         | 880.2   | FALSE    | 2020-04-22T16:18:34.404665Z |

## (R)ead

Reading records can be done using `SELECT` or by reading a table directly via
the Java API. Reading via the [Java API](/docs/api/java/) (see tab `Java Raw`)
iterates over a table and can therefore only access one table at a time. If you
would like to query various tables via the Java API, you can pass SQL to Java
and read the resulting table (see tab `Java SQL`).

<Tabs defaultValue="sql" values={[
  { label: "SQL", value: "sql" },
  { label: "REST", value: "rest" },
  { label: "Java with SQL", value: "javasql" },
  { label: "Java RAW", value: "javaraw" },
  { label: "JDBC", value: "jdbc" }
]}>
<TabItem value="sql">


```questdb-sql
balances;
```

</TabItem>
<TabItem value="rest">


```shell
curl -G "http://localhost:9000/exec" \
--data-urlencode "query=select * from balances"
```

</TabItem>
<TabItem value="javasql">


```java
final String cairoDatabaseRoot = "/tmp";
CairoConfiguration configuration = new DefaultCairoConfiguration(cairoDatabaseRoot);
try (CairoEngine engine = new CairoEngine(configuration)) {
    try (SqlCompiler compiler = new SqlCompiler(engine)) {
        try (RecordCursorFactory factory = compiler.compile("select * from balances").getRecordCursorFactory()) {

            try (RecordCursor cursor = factory.getCursor()) {
                final Record record = cursor.getRecord();
                while (cursor.hasNext()) {
                    record.getInt(0); // cust_id
                    record.getSym(1); // symbol
                    record.getDouble(2); // balance
                    record.getByte(3); // status
                    record.getTimestamp(4); // timestamp
                }
            }
        }
    }
}
```

</TabItem>
<TabItem value="javaraw">


```java
CairoConfiguration configuration = new DefaultCairoConfiguration(".");
try (CairoEngine engine = new CairoEngine(configuration)) {
    try (TableReader reader = engine.getReader(AllowAllCairoSecurityContext.INSTANCE, "balances")) {
        // closing this cursor will close reader too
        // lets close reader explicitly
        final TableReaderRecordCursor cursor = reader.getCursor();
        final Record record = cursor.getRecord();
        while (cursor.hasNext()) {
            record.getInt(0); // cust_id
            record.getSym(1); // symbol
            record.getDouble(2); // balance
            record.getByte(3); // status
            record.getTimestamp(4); // timestamp
        }
    }
}
```

</TabItem>
<TabItem value="jdbc">


```java
Properties properties = new Properties();
properties.setProperty("user", "admin");
properties.setProperty("password", "quest");
properties.setProperty("sslmode", "disable");

final Connection connection =
        DriverManager.getConnection("jdbc:postgresql://localhost:8812/qdb", properties);
PreparedStatement statement = connection.prepareStatement("select * from balances");

ResultSet resultSet = statement.executeQuery();

while (resultSet.next()) {
    System.out.println(resultSet.getInt(1)); // cust_id
    System.out.println(resultSet.getString(2)); // symbol
    System.out.println(resultSet.getDouble(3)); // balance
    System.out.println(resultSet.getByte(4)); // status
    System.out.println(resultSet.getTimestamp(5)); // timestamp
}
connection.close();
```

</TabItem>
</Tabs>


The results are shown below

| cust_id | balance_ccy | balance | inactive | timestamp                   |
| ------- | ----------- | ------- | -------- | --------------------------- |
| 1       | USD         | 1500    | FALSE    | 2020-04-22T16:11:22.704665Z |
| 1       | EUR         | 650.5   | FALSE    | 2020-04-22T16:11:32.904234Z |
| 2       | USD         | 900.75  | FALSE    | 2020-04-22T16:12:43.504432Z |
| 2       | EUR         | 880.2   | FALSE    | 2020-04-22T16:18:34.404665Z |

You can use [aggregation functions](/docs/reference/function/aggregation/) to
derive information like the average balance per currency (note the
[voluntary omission of redundant GROUP BY](/docs/concept/sql-extensions/#absence-of-group-by)
below).

```questdb-sql
SELECT balance_ccy, avg(balance) FROM balances;
```

| balance_ccy | avg      |
| ----------- | -------- |
| USD         | 1200.375 |
| EUR         | 765.35   |

If we had more data we could get deeper and use
[SAMPLE BY](/docs/reference/sql/select/#sample-by) clauses to easily generate
aggregates based on time intervals. For example, to get the average hourly
balance per currency, all we need is to add `SAMPLE BY 1h` to the above query!

## (U)pdate

Lets update balance of customer `1` in the `balances` table:

```questdb-sql
INSERT INTO balances (cust_id, balance_ccy, balance, timestamp)
VALUES (1, 'USD', 330.50, 1587572414404997);
```

After this step, our table looks like this

| cust_id | balance_ccy | balance   | inactive  | timestamp                       |
| ------- | ----------- | --------- | --------- | ------------------------------- |
| 1       | USD         | 1500      | FALSE     | 2020-04-22T16:11:22.704665Z     |
| 1       | EUR         | 650.5     | FALSE     | 2020-04-22T16:11:32.904234Z     |
| 2       | USD         | 900.75    | FALSE     | 2020-04-22T16:12:43.504432Z     |
| 2       | EUR         | 880.2     | FALSE     | 2020-04-22T16:18:34.404665Z     |
| **1**   | **USD**     | **330.5** | **FALSE** | **2020-04-22T16:20:14.404997Z** |

You might expect an `UPDATE`. QuestDB uses `INSERT` which means each table keeps
change history. In order to select only the latest value, our `SELECT` statement
will have to change. We use `LATEST BY` to only select last row for the
`(1,USD)` tuple for customer 1 and find the updated USD balance.

```questdb-sql
SELECT * FROM balances
LATEST BY cust_id, balance_ccy
WHERE cust_id = 1;
```

| cust_id | balance_ccy | balance | inactive | timestamp                   |
| ------- | ----------- | ------- | -------- | --------------------------- |
| 1       | EUR         | 650.5   | FALSE    | 2020-04-22T16:11:32.904234Z |
| 1       | USD         | 330.5   | FALSE    | 2020-04-22T16:20:14.404997Z |

In the above example QuestDB will execute the `where` clause _before_
`latest by`. To execute `where` _after_ `latest by` we have to rely on
sub-queries. To find out more, check out our
[SQL execution order](/docs/concept/sql-execution-order/) Here is an example of
how to select the latest account information, only for balances over 800.

```questdb-sql
(SELECT * FROM balances
LATEST BY cust_id, balance_ccy)
WHERE balance > 800;
```

| cust_id | balance_ccy | balance | inactive | timestamp                   |
| ------- | ----------- | ------- | -------- | --------------------------- |
| 1       | USD         | 1500    | FALSE    | 2020-04-22T16:11:22.704665Z |
| 2       | USD         | 900.75  | FALSE    | 2020-04-22T16:12:43.504432Z |
| 2       | EUR         | 880.2   | FALSE    | 2020-04-22T16:18:34.404665Z |

:::note

With `latest by`, QuestDB will search time series from most recent values to
oldest. For single `SYMBOL` columns, QuestDB will know all distinct values
upfront. Time series scan will end as soon as all values are matched. For all
other field types, or multiple fields QuestDB will scan entire time series.
Although scan is very fast you should be aware that in certain setups,
performance will degrade on hundreds of millions of records.

:::

## (D)elete

Let's assume that `customer 1` closes their `USD` account but keeps their `EUR`
account. This can be reflected in the database as follows.

```questdb-sql
INSERT INTO balances
(cust_id, balance_ccy, inactive, timestamp)
VALUES (1, 'USD', true, 1587572423312698));
```

Notice that this sets tue `inactive` boolean flag to `true` for this balance. At
this point, the `balances` table looks like the below

| cust_id | balance_ccy | balance  | inactive | timestamp                       |
| ------- | ----------- | -------- | -------- | ------------------------------- |
| 1       | USD         | 1500     | FALSE    | 2020-04-22T16:11:22.704665Z     |
| 1       | EUR         | 650.5    | FALSE    | 2020-04-22T16:11:32.904234Z     |
| 2       | USD         | 900.75   | FALSE    | 2020-04-22T16:12:43.504432Z     |
| 2       | EUR         | 880.2    | FALSE    | 2020-04-22T16:18:34.404665Z     |
| 1       | USD         | 330.5    | FALSE    | 2020-04-22T16:20:14.404997Z     |
| **1**   | **USD**     | **null** | **TRUE** | **2020-04-22T16:20:23.312698Z** |

If we now want to look at the active account balances for `customer 1` we can do
so as follows:

```questdb-sql
(SELECT * FROM balances
LATEST BY balance_ccy
WHERE cust_id=1)
WHERE NOT inactive;
```

The results will exclude deleted records (the USD balance) and only show the
latest EUR balance for this customer.

| cust_id | balance_ccy | balance | inactive | timestamp                   |
| ------- | ----------- | ------- | -------- | --------------------------- |
| 1       | EUR         | 650.5   | FALSE    | 2020-04-22T16:11:32.904234Z |

:::note

The above SQL example uses brackets. This is because our
[SQL execution order](/docs/concept/sql-execution-order/) will execute WHERE
clauses before LATEST BY. By encapsulating the query and applying
`where not inactive` to the whole result set, we are able to easily remove the
inactive accounts.

:::

In other words, the brackets allow us to get "the latest balance excluding
inactive". If we were to remove the brackets and use the following query, we
would get "the latest non inactive balance" which is slightly different.

```questdb-sql
SELECT * FROM balances
LATEST BY balance_ccy
WHERE cust_id=1
AND NOT inactive;
```

and returns different results (not what we are looking for!). See below.

| cust_id | balance_ccy | balance | inactive | timestamp                   |
| ------- | ----------- | ------- | -------- | --------------------------- |
| 1       | USD         | 1500    | FALSE    | 2020-04-22T16:11:22.704665Z |
| 1       | EUR         | 650.5   | FALSE    | 2020-04-22T16:11:32.904234Z |

## Traveling through time

This approach to CRUD operations may be unusual for traditional database users.
A major advantage of this approach is a superior write and seek speed over
traditional relational models along with contiguous storage. Moreover, it
removes the need to maintain separated master and audit tables.

There is another nice advantage. By keeping all change history and leveraging
QuestDB's seek speed, you can trivially travel through time at incredible speed
and reproduce the state of the database at any point in time. You can use this
to restore a previous state, or to produce snapshots. Welcome to the world of
fast time travel!

![Cartoon reproduction of the film Back to the Future Part II](/img/docs/bttf.jpg)

For example the below query can be used to know the state of all balances at a
`15:00:00` snapshot.

```questdb-sql
SELECT * FROM balances
LATEST BY balance_ccy, cust_id
WHERE timestamp <= '2020-04-22T16:15:00.000Z'
AND NOT inactive;
```

| cust_id | balance_ccy | balance | inactive | timestamp                   |
| ------- | ----------- | ------- | -------- | --------------------------- |
| 1       | USD         | 1500    | FALSE    | 2020-04-22T16:11:22.704665Z |
| 1       | EUR         | 650.5   | FALSE    | 2020-04-22T16:11:32.904234Z |
| 2       | USD         | 900.75  | FALSE    | 2020-04-22T16:12:43.504432Z |

What's great about this is that instead of scanning the whole table, QuestDB is
capable of very efficiently locating the point in time requested and pull the
relevant data. It can perform just as efficiently for any timestamp, from a few
hundred to billions of rows!
