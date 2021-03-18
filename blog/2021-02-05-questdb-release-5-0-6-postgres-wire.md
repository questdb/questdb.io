---
title: QuestDB release January 2021
author: Brian Smith
author_title: QuestDB Team
author_url: https://github.com/bsmth
author_image_url: https://avatars.githubusercontent.com/bsmth
description:
  We've released version 5.0.6 and here's the highlights including PostgreSQL
  wire improvements, SQL additions and new functions for troubleshooting
keywords:
  - postgres
  - grafana
  - timeseries
  - database
image: /img/blog/2021-02-05/og.png
tags: [postgres, release, grafana]
---

We've just released software version 5.0.6 and it comes with plenty of
additional features and functionality, a full refactoring of PostgreSQL wire
support, and multiple fixes to improve the stability of the system. Here's a
roundup of recent changes that have just landed.

<!--truncate-->

## PostgreSQL wire protocol

The complete refactoring of PostgreSQL wire protocol, including binary support,
means improved usability for many popular libraries and languages.

```python title="Parameterized queries in Python"
# insert 10 records
for x in range(10):
  now = dt.datetime.utcnow()
  date = dt.datetime.now().date()
  cursor.execute("""
    INSERT INTO trades
    VALUES (%s, %s, %s, %s);
    """, (now, date, "python example", x))
# commit records
connection.commit()
```

Users can now use prepared statements (bind variables), which allows for better
efficiency on repeated queries:

```rust title="Prepared statement in Rust"
    // Prepared statement
    let mut txn = client.transaction()?;
    let statement = txn.prepare("insert into trades values ($1,$2,$3,$4)")?;
    for value in 0..10 {
        let utc = Utc::now();
        let sys_time = SystemTime::now();
        txn.execute(&statement, &[&utc.naive_local(), &sys_time, &name, &value])?;
    }
    txn.commit()?;

```

The documentation pages have more complete code examples which show how to
[insert data](/docs/develop/insert-data#postgres-compatibility) and
[query Data](/docs/develop/query-data#postgres-compatibility) using popular
tools and frameworks in Node, Go, Rust, Java and Python.

## Grafana alerts

Support for the RFC339Nano timestamp format enables the use of alerting via
Grafana. This helps identify unintended changes, minimize disruptions and stay
on top of your system or infrastructure:

![Alerts being triggered in Grafana based on data in QuestDB](/img/blog/2021-02-05/grafana-alerts.png)

## Build function

There's now a function built-in that provides the current server version number
and commit hash for troubleshooting. It can be run with the following command:

```questdb-sql
SELECT build();
```

![A screenshot of running a function inside the QuestDB Web Console](/img/blog/2021-02-05/build-function.png)

## CREATE TABLE IF NOT EXISTS

This language feature adds more flexibility in cases where `CREATE TABLE`
queries are run and tables already exist:

```questdb-sql
CREATE TABLE IF NOT EXISTS my_table (ts TIMESTAMP, value INT) timestamp(ts);
```

Full examples using this statement in multiple languages can be found on the
[Insert data](/docs/develop/insert-data#postgres-compatibility) page.

## Error prevention when disk full

Even better than good error reporting is error prevention! This fix enhances the
resilience of the system by preventing data loss in QuestDB instances if disk
space unexpectedly runs out.

## See the full release

These have been our top picks from the 5.0.6 release which cover what our users
have been most excited about recently but there are a lot more changes that have
been omitted here. For a full list of the fixes, features and improvements that
we've added, take a look
[at the GitHub Release](https://github.com/questdb/questdb/releases/tag/5.0.6).

If you like our new additions or have a burning suggestion for upcoming changes,
we'd love to know your thoughts! Feel free to share your feedback
[in our Slack Community]({@slackUrl@}) and don't forget to drop us a star
[on GitHub]({@githubUrl@}).
