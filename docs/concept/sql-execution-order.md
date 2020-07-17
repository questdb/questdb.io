---
title: SQL execution order
sidebar_label: SQL execution order
---

QuestDB attempts to implement standard ANSI SQL. We also attempt to be
PostgreSQL compatible, although some of it is work in progress. QuestDB
implements the following clauses in this execution order:

1. FROM
2. ON
3. JOIN
4. WHERE
5. LATEST BY
6. GROUP BY (implicit)
7. WITH
8. HAVING (implicit)
9. SELECT
10. DISTINCT
11. ORDER BY
12. LIMIT

We also implemented sub-queries. They can be used anywhere table name is used.
Our sub-query implementation adds virtually zero execution cost to SQL. We
encourage their use to add flavours of functional language to old-school SQL.
