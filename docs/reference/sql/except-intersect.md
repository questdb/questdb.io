---
title: EXCEPT & INTERSECT keywords
sidebar_label: EXCEPT & INTERSECT
description: EXCEPT and INTERSECT SQL keyword reference documentation.
---

Returns distinct rows by comparing the results of two queries.

## Syntax

![Flow chart showing the syntax of EXCEPT and INTERSECT](/img/docs/diagrams/exceptIntersect.svg)

- `EXCEPT` returns distinct rows from the left input query that aren't output by
  the right input query.
- `INTERSECT` returns rows that are returned by both input queries.

## Examples

The below examples use
[long_sequence(n)](/docs/reference/function/row-generator/#long_sequence) to
generate a list of integers from 1 to n.

### EXCEPT

```questdb-sql title="Returns rows unique to the left query. In this case, integers from 6 to 10"
long_sequence(10) EXCEPT long_sequence(5);
```

### INTERSECT

```questdb-sql title="Returns rows output by both queries. In this case, integers from 1 to 5"
long_sequence(10) INTERSECT long_sequence(5);
```
