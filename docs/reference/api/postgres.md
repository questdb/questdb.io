---
title: Postgres
description: Postgres compatibility reference documentation.
---

QuestDB supports the Postgres wire protocol. As a result, QuestDB is capable of
running most of Postgres queries. This means that you can use your favorite
Postgres client or driver with QuestDB, at no extra cost.

The storage model used by Postgres is fundamentally different to the one used by
QuestDB. Some features that exists for Postgres do not apply to QuestDB.

## Compatibility

### List of supported features

- Querying (all types expect `BLOB`)
- Prepared statements with bind parameters (check for specific libraries
  [below](/docs/reference/api/postgres/#libraries--programmatic-clients))
- `INSERT` statements with bind parameters (same)
- DDL execution
- Batch inserts with `JDBC`
- Plain authentication

Examples which demonstrate how to use Postgres clients in a number of different
languages can be found on the following pages:

- [Connect](/docs/develop/connect#postgres-compatibility) shows how to create a
  connection to QuestDB using Postgres
- [Insert data](/docs/develop/insert-data#postgres-compatibility) demonstrates
  how to use paramaterized queries and prepared statements to insert data
- [Query data](/docs/develop/query-data#postgres-compatibility) shows how to run
  queries against tables

### List of unsupported features

- SSL
- Remote file upload (`COPY` from `stdin`)
- `UPDATE` and `DELETE` statements
- `BLOB` transfer

## Recommended third party tools

The following list of third party tools includes drivers, clients or utility
CLIs that our team has tested extensively. Picking an item from it will
guarantee that your code will work with QuestDB.

We recognize that our community might value some features more than others. This
is why we encourage you to [open an issue on GitHub]({@githubUrl@}/issues) if
you think we are missing something important for your workflow.

### CLIs

#### [PSQL](https://www.postgresql.org/docs/current/app-psql.html) `12`

Support for `SELECT`, `INSERT`, `CREATE`, `DROP`, `TRUNCATE`.

### Libraries / Programmatic clients

#### [node-postgres](https://node-postgres.com/) (NodeJS) `8.4`

#### [pq](https://github.com/lib/pq) (Go) `1.8`

#### [pq](https://www.postgresql.org/docs/12/libpq.html) (C) `12`

### Drivers

#### [JDBC](https://jdbc.postgresql.org/) `42.2`
