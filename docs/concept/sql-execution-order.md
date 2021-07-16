---
title: SQL execution order
sidebar_label: SQL execution order
description:
  Execution order for SQL clauses in QuestDB. This covers the SQL keywords you
  may already be familiar with as well as extensions to the language that are
  unique to QuestDB.
---

QuestDB attempts to implement standard ANSI SQL. We also try to be compatible
with PostgreSQL, although parts of this are a work in progress. QuestDB
implements these clauses which have the following execution order:

1. [FROM](/docs/reference/sql/select/)
2. [ON](/docs/reference/sql/join/)
3. [JOIN](/docs/reference/sql/join/)
4. [WHERE](/docs/reference/sql/where/)
5. [LATEST BY](/docs/reference/sql/latest-by/)
6. [GROUP BY](/docs/reference/sql/group-by/) (optional)
7. [WITH](/docs/reference/sql/with/)
8. [HAVING](/docs/concept/sql-extensions/#implicit-having/) (implicit)
9. [SELECT](/docs/reference/sql/select/)
10. [DISTINCT](/docs/reference/sql/distinct/)
11. [ORDER BY](/docs/reference/sql/order-by/)
12. [LIMIT](/docs/reference/sql/limit/)

We have also implemented sub-queries that users may execute at any part of a
query that mentions a table name. The sub-query implementation adds almost zero
execution cost to SQL. We encourage the use of sub-queries as they add flavors
of functional language features to traditional SQL.

For more information on the SQL extensions in QuestDB which deviate from ANSI
SQL and PostgreSQL, see the
[SQL extensions documentation](/docs/concept/sql-extensions/).
