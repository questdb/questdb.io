---
title: SQL execution order
sidebar_label: SQL execution order
description:
  Execution order for SQL clauses in QuestDB. This covers the SQL keywords you
  are used to as well as QuestDB's extensions to the language.
---

QuestDB attempts to implement standard ANSI SQL. We also attempt to be
PostgreSQL compatible, although some of it is work in progress. QuestDB
implements the following clauses in this execution order:

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

We also implemented sub-queries. They can be used anywhere table name is used.
Our sub-query implementation adds virtually zero execution cost to SQL. We
encourage their use as they add flavours of functional language to old-school
SQL.
