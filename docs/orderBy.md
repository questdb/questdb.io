---
id: orderBy
title: ORDER BY
sidebar_label: ORDER BY
---

Sort the results of a query in ascending or descending order.

### Syntax

![order by syntax](/img/doc/diagrams/orderBy.svg)

Default order is `ASC`. You can omit to order in ascending order.

### Examples

```sql title="Omitting ASC will default to ascending order"
ratings ORDER BY userId;
```

```sql title="Ordering in descending order"
ratings ORDER BY userId DESC;
```

```sql title="Multi-level ordering"
ratings ORDER BY userId, rating DESC;
```

### Ressources management

:::caution
Ordering data requires holding it in RAM. For large operations, we
suggest you check you have sufficient memory to perform the operation.
:::
