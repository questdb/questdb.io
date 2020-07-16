---
id: cast
title: Cast
sidebar_label: CAST
---

Type conversion. Can be either

- [Explicit](#explicit-conversion) via `cast()`
- [Implicit](#implicit-conversion), in which case it will be automatically
  performed when required by the context.

## Explicit conversion

Types can be converted from one to another using the `cast()` function.

### Syntax

![cast sql syntax](/img/doc/diagrams/cast.svg)

where:

- `expression` can be a constant, a column, or an expression that evaluates to a
  value.
- `type` refers to the desired [data type](datatypes.md).

`cast` can be used a part of arithmetic expression as normal

### Examples

```questdb-sql title="Queries"
SELECT cast(3L + 2L as int), cast FROM long_sequence(1);
SELECT cast(1578506142000000 as timestamp) FROM long_sequence(1);
SELECT cast('10.2' as double) FROM long_sequence(1); --string to double
SELECT cast('行' as int) FROM long_sequence(1);
```

```script title="Results"
| cast                        |
|-----------------------------|
| 5                           |
| 2020-01-08T17:55:42.000000Z |
| 10.2                        |
| 34892                       |
```

> Explicit casting of an expression to a smaller [data type](datatypes.md)
> may result in loss of data when the output data type is smaller than the
> expression.

- Casting a decimal number type (`float` or `double`) to an integer number type
  (`long`, `int`, `short`) will result in decimals drop.
- If the integer part being cast is larger than the resulting data type, it will
  be resized by truncating bits.
- Conversions from `char` to a number type will return the corresponding
  `unicode` number and vice versa.

### Precision loss examples

```questdb-sql title="Queries"
SELECT cast(3.5 + 2 as int), cast FROM long_sequence(1);
SELECT cast(7234623 as short) FROM long_sequence(1);
SELECT cast(2334444.323 as short) FROM long_sequence(1);
```

```script title="Results"
| cast                        |
|-----------------------------|
| 5                           | -- Loss of the decimals
| 25663                       | -- Int truncated to Short*
| -24852                      | -- Loss of decimals and integer part bits are truncated resulting in another number
```

When casting numbers into a smaller data type, QuestDB will truncate the higher
bits of this number.

## Implicit conversion

Type casting may be necessary in certain context such as

- Operations involving various different types
- Inserting values where the originating type is different from the destination
  column type.

QuestDB will attempt to convert to the data type required by the context. This
is called `implicit cast` and does not require using the `cast()` function.

:::note
QuestDB will only perform implicit cast when they would not result in
data being truncated or precision being lost.
:::

The below chart illustrates the explicit and implicit cast available in QuestDB.

![cast map](/img/doc/castmap.jpg)

:::note
Implicit casting prevents data loss. When an operation involves multiple
types, the resulting type will be the smallest possible type so that no data is
lost.
:::

```questdb-sql title="Queries"
SELECT 1234L + 567 FROM long_sequence(1);
SELECT 1234L + 0.567 FROM long_sequence(1);
SELECT to_timestamp('2019-10-17T00:00:00', 'yyyy-MM-ddTHH:mm:ss') + 323 FROM long_sequence(1);
SELECT to_timestamp('2019-10-17T00:00:00', 'yyyy-MM-ddTHH:mm:ss') + 0.323 FROM long_sequence(1);
```

```script title="Results"
| 1801                           | -- Returns a long.
| 1234.567                       | -- Implicit cast to double.
| 2019-10-17T00:00:00.000323Z    | -- Returns a timestamp with an extra 323 microseconds.
| 1571270400000000               | -- Implicit cast to double as timestamp are long integers.
```

> When inserting into a table, QuestDB will cast data implicitly to match the
> type of the destination column.

```questdb-sql title="Example"
-- We create a table with one column of type long
CREATE TABLE my_table(my_number long);

-- We then insert a value into this table. Note that the value is of timestamp type
-- but that we are trying to insert into a long type column:
INSERT INTO my_table values((to_timestamp('2019-10-17T00:00:00', 'yyyy-MM-ddTHH:mm:ss'));

-- As timestamp can be converted to long without loss, QuestDB performs an implicit
-- cast on the value before inserting it. Therefore the value is now stored as a long:
SELECT * FROM my_table;
```

```script title="Result"
| 1571270400000000   | -- Returns a long.
```

The above insert would have been equivalent to running with explicit cast, but
QuestDB took care of this step automatically.

```questdb-sql title="Example"
INSERT INTO my_table values
            (cast(
                to_timestamp('2019-10-17T00:00:00', 'yyyy-MM-ddTHH:mm:ss')
                as long
            ))
```

```script title="Result"
| 1571270400000000   |
```
