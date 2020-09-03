---
title: ORDER BY keyword
sidebar_label: ORDER BY
description: ORDER BY SQL keyword reference documentation.
---

Sort the results of a query in ascending or descending order.

## Syntax

![Flow chart showing the syntax of the ORDER BY keyword](/img/docs/diagrams/orderBy.svg)

Default order is `ASC`. You can omit to order in ascending order.

## Examples

```questdb-sql title="Omitting ASC will default to ascending order"
ratings ORDER BY userId;
```

```questdb-sql title="Ordering in descending order"
ratings ORDER BY userId DESC;
```

```questdb-sql title="Multi-level ordering"
ratings ORDER BY userId, rating DESC;
```

## Ressources management

:::caution

Ordering data requires holding it in RAM. For large operations, we suggest you
check you have sufficient memory to perform the operation.

:::
