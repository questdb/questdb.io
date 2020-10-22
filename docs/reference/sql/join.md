---
title: JOIN keyword
sidebar_label: JOIN
description: JOIN SQL keyword reference documentation.
---

QuestDB supports the following types of joins: `INNER`, `OUTER`, `CROSS`, `ASOF`
and `SPLICE`. `FULL` joins are not yet implemented and are on our roadmap. All
supported join types can be combined in a single SQL statement; QuestDB SQL's
optimiser determines the best execution order and algorithms.

There are no known limitations on size of tables or sub-queries participating in
joins and there are no limitations on number of joins either.

## Join syntax

![Flow chart showing the syntax of the JOIN keyword](/img/docs/diagrams/join.svg)

Following data join columns from joined tables are combined in single row. Same
name columns originating from different tables will be automatically aliased to
create unique column namespace of the result set.

Though it is a best practice to diligently specify join conditions, QuestDB will
also analyse `WHERE` clause for implicit join condition and will derive
transient join conditions where necessary.

:::tip

When tables are joined on column that has the same name in both tables you can
use shorthand `ON (column)` clause

:::

## Implicit joins

It is possible to join two tables using the following syntax:

```questdb-sql
SELECT *
FROM a, b
WHERE a.id = b.id;
```

The type of join as well as the column will be inferred from the where clause,
and may end up being either `INNER` or `CROSS` join. For the example above, the
equivalent explicit statement would be:

```questdb-sql
SELECT *
FROM a
JOIN b ON (id);
```

## (INNER) JOIN

### Overview

`(INNER) JOIN` is used to return rows from 2 tables where the records on the
compared column have matching values in both tables

### Examples

The following query will return the movieId and the average rating from table
`ratings`. It will also add a column for the `title` from table `movies`. The
corresponding title will be identified based on the `movieId` in the `ratings`
table matching an `id` in the `movies` table.

```questdb-sql title="INNER JOIN ON"
SELECT movieId a, title, avg(rating)
FROM ratings
INNER JOIN (select movieId id, title from movies)
ON ratings.movieId = id;
```

By default `JOIN` is interpreted as `INNER JOIN`. Therefore `INNER` does not
need to be specified.

```questdb-sql title="Dropping INNER"
SELECT movieId a, title, avg(rating)
FROM ratings
JOIN (select movieId id, title from movies)
ON ratings.movieId = id;
```

## OUTER JOIN

### Overview

`OUTER JOIN` will return **all** records from the LEFT table, and if matched,
the records of the RIGHT table. When there is no match for the RIGHT table, it
will return `NULL` values in right table fields

### Examples

General syntax is as follows:

```questdb-sql
SELECT tab1.colA, tab2.colB
FROM table1 tab1
OUTER JOIN table2 tab2
ON tab1.colA = tab2.colB;
```

`OUTER JOIN` query can also be used to select all rows in left table that do not
exist in right table.

```questdb-sql
SELECT tab1.colA, tab2.colB
FROM table1 tab1
OUTER JOIN table2 tab2
ON tab1.colA = tab2.colB
WHERE tab2.colB = NULL;
```

## CROSS JOIN

### Overview

`CROSS JOIN` will return the cartesian product of the two tables being joined.
It can be used to a table with all possible combinations.

:::note

`CROSS JOIN` does not have `ON` clause.

:::

### Example

The following will return all possible combinations of starters and deserts

```questdb-sql
SELECT *
FROM starters
CROSS JOIN deserts;
```

## ASOF JOIN

### Overview

`ASOF` joins are used on time series data to join two tables based on timestamp
where timestamps do not exactly match. For a given record at a given timestamp,
it will return the corresponding record in the other table at the closest
timestamp **prior to** the timestamp in the first table.

:::note

To be able to leverage `ASOF JOIN`, both joined table must have a designated
`timestamp` column. To designate a column as `timestamp`, please refer to the
[CREATE TABLE](/docs/reference/sql/create-table/) section.

:::

`ASOF` join is performed on tables or result sets that are ordered by time. When
table is created as ordered by time order of records is enforced and timestamp
column name is in table metadata. `ASOF` join will use timestamp column from
metadata.

### Example

Consider the following tables.

| ts                          | ask |
| --------------------------- | --- |
| 2019-10-17T00:00:00.000000Z | 100 |
| 2019-10-17T00:00:00.200000Z | 101 |
| 2019-10-17T00:00:00.400000Z | 102 |

| ts                          | bid |
| --------------------------- | --- |
| 2019-10-17T00:00:00.100000Z | 101 |
| 2019-10-17T00:00:00.300000Z | 102 |
| 2019-10-17T00:00:00.500000Z | 103 |

Therefore the following query:

```questdb-sql
SELECT bids.ts timebid, bid, ask
FROM bids
ASOF JOIN asks;
```

Will return the following:

| timebid                     | bid | ask |
| --------------------------- | --- | --- |
| 2019-10-17T00:00:00.100000Z | 101 | 100 |
| 2019-10-17T00:00:00.300000Z | 102 | 101 |
| 2019-10-17T00:00:00.500000Z | 103 | 102 |

:::note

There is no `ASKS` at timestamp `2019-10-17T00:00:00.100000Z`. The `ASOF JOIN`
will look for the value in the `BIDS` table that has the closest timestamp
inferior or equal to the target timestamp.

:::

In case tables do not have designated timestamp column, but data is in
chronological order, timestamp columns can be specified at runtime:

```questdb-sql
SELECT bids.ts timebid, bid, ask
FROM (bids timestamp(ts))
ASOF JOIN (asks timestamp (ts));
```

:::caution

`ASOF` join does not check timestamp order, if data is not in chronological
order join result is non-deterministic

:::

Above query assumes that there is only one instrument in `BIDS` and `ASKS`
tables and therefore does not use the optional `ON` clause.

If both tables store data for multiple instruments `ON` clause will allow you to
find bids for asks with matching instrument value.

```questdb-sql
SELECT *
FROM asks
ASOF JOIN bids ON (instrument);
```

## SPLICE JOIN

### Overview

`SPLICE JOIN` is a full `ASOF JOIN`. It will return all the records from both
tables. For each record from left table splice join will find prevailing record
from right table and for each record from right table - prevailing record from
left table.

### Examples

Considering the following tables.

| ts                          | ask |
| --------------------------- | --- |
| 2019-10-17T00:00:00.000000Z | 100 |
| 2019-10-17T00:00:00.200000Z | 101 |
| 2019-10-17T00:00:00.400000Z | 102 |

| ts                          | bid |
| --------------------------- | --- |
| 2019-10-17T00:00:00.100000Z | 101 |
| 2019-10-17T00:00:00.300000Z | 102 |
| 2019-10-17T00:00:00.500000Z | 103 |

This query:

```questdb-sql
SELECT bids.ts timebid, bid, ask
FROM bids
SPLICE JOIN asks;
```

Will return the following results

| timebid                     | bid  | ask |
| --------------------------- | ---- | --- |
| null                        | null | 100 |
| 2019-10-17T00:00:00.100000Z | 101  | 100 |
| 2019-10-17T00:00:00.100000Z | 101  | 101 |
| 2019-10-17T00:00:00.300000Z | 102  | 101 |
| 2019-10-17T00:00:00.300000Z | 102  | 102 |
| 2019-10-17T00:00:00.500000Z | 103  | 102 |

Note that the above query does not use the optional `ON` clause. In case you
need additional filtering on the two tables, you can use the `ON` clause as
follows:

```questdb-sql
SELECT ts timebid, instrument bidInstrument, bid, ask
FROM bids
SPLICE JOIN
    (
    SELECT ts timesask, instrument askInstrument, ask ask
    FROM asks
    )
    ON bidInstrument=askInstrument;
```
