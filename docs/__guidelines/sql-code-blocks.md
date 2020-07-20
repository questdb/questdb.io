---
title: SQL code blocks
---

### Checklist

- [ ] Use the `questdb-sql` language
- [ ] Keywords are uppercase
- [ ] Types are uppercase
- [ ] Column names are camelCase
- [ ] Table names are camelCase
- [ ] Function names are lowercase
- [ ] Statements finish with `;`

### Formatting

- Always write explicit `SELECT * FROM table` instead of `table` with the
  exception of pages describing the shorthand expression.
- `timestamp` is not a valid column name. Neither are any type or function
  names.
- Char returns are allowed either (1) after a `,` (2) after a `SQL keyword` (3)
  after opening or closing a bracket `(`,`)`

### Examples

```questdb-sql
SELECT * FROM tableName;
```

```questdb-sql
SELECT columnName, min(columnName) FROM tableName;
```

```questdb-sql
CREATE TABLE tableName(columnName TYPE, columnName TYPE) timestamp(columnName) PARTITION BY DAY;
```

```questdb-sql
SELECT cast(columnName AS INT) FROM tableName;
```

```questdb-sql
SELECT columnName, min(columnName)
FROM tableName
WHERE columnName > 3;
```

```questdb-sql
SELECT
columnName,
min(columnName),
max(columnName)
FROM table WHERE columnName > 3;
```

```questdb-sql
CREATE TABLE tableName AS(
...
);
```
