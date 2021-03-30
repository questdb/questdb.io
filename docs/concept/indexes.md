---
title: Indexes
sidebar_label: Indexes
description:
  Explanation on how indexes work as well as the pros and cons that you need to
  be aware of when using them.
---

An index stores the row locations for each value of the target column in order
to provide faster read access. It allows you to bypass full table scans by
directly accessing the relevant rows during queries with `WHERE` conditions.

Indexing is available for [symbol](/docs/concept/symbol/) columns. Index support
for other types will be added over time.

There are two ways to create an index:

- At table creation time using
  [CREATE TABLE](/docs/reference/sql/create-table/#index)
- Using [ALTER TABLE](/docs/reference/sql/alter-table-alter-column-add-index/)

## How indexes work

Index creates a table of row locations for each distinct value for the target
[symbol](/docs/concept/symbol/). Once the index is created, inserting data into
the table will update the index. Lookups on indexed values will be performed in
the index table directly which will provide the memory locations of the items,
thus avoiding unnecessary table scans.

Here is an example of a table and its index table.

```shell
Table                                       Index
|Row ID | Symbol    | Value |             | Symbol     | Row IDs       |
| 1     | A         | 1     |             | A          | 1, 2, 4       |
| 2     | A         | 0     |             | B          | 3             |
| 3     | B         | 1     |             | C          | 5             |
| 4     | A         | 1     |
| 5     | C         | 0     |
```

`INSERT INTO Table values(B, 1);` would trigger two updates: one for the Table,
and one for the Index.

```shell
Table                                       Index
|Row ID | Symbol    | Value |             | Symbol     | Row IDs       |
| 1     | A         | 1     |             | A          | 1, 2, 4       |
| 2     | A         | 0     |             | B          | 3, 6          |
| 3     | B         | 1     |             | C          | 5             |
| 4     | A         | 1     |
| 5     | C         | 0     |
| 6     | B         | 1     |
```

### Advantages

Index allows you to greatly reduce the complexity of queries that span a subset
of an indexed column, typically when using `WHERE` clauses.

Consider the following query applied to the above table
`SELECT sum(Value) FROM Table WHERE Symbol='A';`

- **Without Index**, the query engine would scan the whole table in order to
  perform the query. It will need to perform 6 operations (read each of the 6
  rows once).
- **With Index**, the query engine will first scan the index table, which is
  considerably smaller. In our example, it will find A in the first row. Then,
  the query engine would check the values at the specific locations 1, 2, 4 in
  the table to read the corresponding values. As a result, it would only scan
  the relevant rows in the table and leave irrelevant rows untouched.

### Trade-offs

- **Storage space**: The index will maintain a table with each distinct symbol
  value and the locations where these symbols can be found. As a result, there
  is a small cost of storage associated with indexing a symbol field.

- **Ingestion performance**: Each new entry in the table will trigger an entry
  in the Index table. This means that any write will now require two write
  operations, and therefore take twice as long.
