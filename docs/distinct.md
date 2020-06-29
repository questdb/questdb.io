---
id: distinct
title: DISTINCT
sidebar_label: DISTINCT
---

`SELECT DISTINCT` is used to return only distinct (i.e different) values from a column as part of a [SELECT statement](sqlSELECT.md).

### Syntax
![distinct syntax](/static/img/distinct.svg)

### Examples
The following query will return a list of all unique ratings in the table.
```sql title="Simple query"
SELECT DISTINCT movieId 
FROM ratings;
```


SELECT DISTINCT can be used in conjunction with more advanced queries and filters.

```sql title="With aggregate"
SELECT DISTINCT movieId, count() 
FROM ratings;
```

```sql title="With filter"
SELECT DISTINCT movieId, count() 
FROM ratings
WHERE score > 3;
```