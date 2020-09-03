---
title: UNION keyword
sidebar_label: UNION
description: UNION SQL keyword reference documentation.
---

## Overview

`UNION` is used to combine the results of two or more `SELECT` statements. To
work properly:

- Each select statement should return the same number of column
- Each column should have the same type
- Columns should be in the same order

## Syntax

![Flow chart showing the syntax of the UNION keyword](/img/docs/diagrams/union.svg)

- `UNION` will return distinct results.
- `UNION ALL` will return all results including duplicates.

## Examples

Let's assume the following two tables listA

| Description | ID  |
| ----------- | --- |
| Red Pen     | 1   |
| Blue Pen    | 2   |
| Green Pen   | 3   |

listB

| Description | ID  |
| ----------- | --- |
| Pink Pen    | 1   |
| Black Pen   | 2   |
| Green Pen   | 3   |

```questdb-sql
liastA UNION listB
```

will return

| Description | ID  |
| ----------- | --- |
| Red Pen     | 1   |
| Blue Pen    | 2   |
| Green Pen   | 3   |
| Pink Pen    | 1   |
| Black Pen   | 2   |

```questdb-sql
liastA UNION ALL listB
```

will return

| Description | ID  |
| ----------- | --- |
| Red Pen     | 1   |
| Blue Pen    | 2   |
| Green Pen   | 3   |
| Pink Pen    | 1   |
| Black Pen   | 2   |
| Green Pen   | 3   |
