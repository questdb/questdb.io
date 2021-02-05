---
title: Release 5.0.6 changelog
author: Brian Smith
author_title: QuestDB Team
author_url: https://github.com/bsmth
author_image_url: https://avatars.githubusercontent.com/bsmth
description: We've released version 5.0.6 this week and here are the highlights
keywords:
  - postgres
  - grafana
  - timeseries
  - database
image: /img/blog/2020-12-10/banner.jpg
tags: [postgres, release, grafana]
---

We've just released software version 5.0.6 with plenty of additional features
and functionality, a refactoring of PostgreSQL wire support, and plenty of fixes
to improve the stability of the system. Here's a roundup of recent changes that
have just landed.

<!--truncate-->

## PostgreSQL wire protocol

The complete refactoring of PostgreSQL wire support, including binary support
means there is now improved support for many popular libraries to make use of
prepared statements (bind variables) which allows for better performance on bulk
queries.

The documentation pages have code examples which describe how to
[insert data](/docs/develop/insert-data#postgres-compatibility) and
[query Data](/docs/develop/query-data#postgres-compatibility) using popular
tools and frameworks in Node, Go, Rust, Java and Python.

```rust title="Inserting data using Rust"
use postgres::{Client, NoTls, Error};
use chrono::{Utc};
use std::time::SystemTime;

fn main() -> Result<(), Error> {
    let mut client = Client::connect("postgresql://admin:quest@localhost:8812/qdb", NoTls)?;

    // Basic query
    client.batch_execute("CREATE TABLE IF NOT EXISTS trades (ts TIMESTAMP, date DATE, name STRING, value INT) timestamp(ts);")?;

    // Parameterized query
    let name: &str = "rust example";
    let val: i32 = 123;
    let utc = Utc::now();
    let sys_time = SystemTime::now();
    client.execute(
        "INSERT INTO trades VALUES($1,$2,$3,$4)",
        &[&utc.naive_local(), &sys_time, &name, &val],
    )?;

    // Prepared statement
    let mut txn = client.transaction()?;
    let statement = txn.prepare("insert into trades values ($1,$2,$3,$4)")?;
    for value in 0..10 {
        let utc = Utc::now();
        let sys_time = SystemTime::now();
        txn.execute(&statement, &[&utc.naive_local(), &sys_time, &name, &value])?;
    }
    txn.commit()?;

    println!("import finished");
    Ok(())
}
```

concurrent CSV imports,

preventing data corruption when disk space is full

and multiple SQL fixes.

## Grafana alerts

support enables alerting via Grafana,

![Alerts being triggered in Grafana based on data in QuestDB](/img/blog/2021-02-05/grafana_alerts.png)


## Build function

Ther's now a function built-in provides the current server version number and commit hash for
troubleshooting. It can be run with the following command:

```questdb-sql
SELECT build();
```

![A screenshot of running a function inside the QuestDB Web Console](/img/blog/2021-02-05/build_function.png)



<!-- import Screenshot from "@theme/Screenshot";

<Screenshot
  alt="A screenshot of running a function inside the QuestDB Web Console"
  height={138}
  src="/img/blog/2021-02-05/build_function.png"
  title="Example stack with Google Cloud Platform services"
  width={650}
/>


 -->







## CREATE TABLE IF NOT EXISTS

## Take a look

The release is available to browse
[on GitHub](https://github.com/questdb/questdb/releases/tag/5.0.6) with Our new
network stack ingests time series data from Kafka topics reliably from multiple
TCP connections on a single thread without garbage collection and the QuestDB
source is open to [browse on GitHub]({@githubUrl@}). If you like this content
and our approach to non-blocking and garbage-free IO, or if you know of a better
way to approach what we built, we'd love to know your thoughts! Feel free to
share your feedback [in our Slack Community]({@slackUrl@}).
