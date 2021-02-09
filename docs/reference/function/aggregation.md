---
title: Aggregation functions
sidebar_label: Aggregation
description: Aggregation functions reference documentation.
---

## avg

`avg(value)` calculates simple average of values ignoring missing data (e.g
`null` values).

**Arguments:**

- `value` is any numeric value.

**Return value:**

Return value type is `double`.

**Examples:**

```questdb-sql title="Average transaction amount"
SELECT avg(amount) FROM transactions;
```

| avg  |
| ---- |
| 22.4 |

```questdb-sql title="Average transaction amount by payment_type"
SELECT payment_type, avg(amount) FROM transactions;
```

| cash_or_card | avg   |
| ------------ | ----- |
| cash         | 22.1  |
| card         | 27.4  |
| null         | 18.02 |

## count

`count()` or `count(*)` - counts rows irrespective of underlying data.

**Arguments:**

- `count` does not require arguments.

**Return value:**

Return value type is `long`.

**Examples:**

- Count of rows in the transactions table.

```questdb-sql
SELECT count() FROM transactions;
```

| count |
| ----- |
| 100   |

- Count of rows in the transactions table aggregated by `payment_type` value.

```questdb-sql
SELECT payment_type, count() FROM transactions;
```

| cash_or_card | count |
| ------------ | ----- |
| cash         | 25    |
| card         | 70    |
| null         | 5     |

:::note

`null` values are aggregated with `count()`.

:::

## haversine_dist_deg

`haversine_dist_deg(lat, lon, ts)` - calculates the traveled distance for a
series of latitude and longitude points.

**Arguments:**

- `lat` is the latitude expressed as degrees in decimal format (`double`)
- `lon` is the longitude expressed as degrees in decimal format (`double`)
- `ts` is the `timestamp` for the data point

**Return value:**

Return value type is `double`.

**Examples:**

```questdb-sql title="Calculate the aggregate traveled distance for each car_id"
SELECT car_id, haversine_dist_deg(lat, lon, k)
  FROM table rides
```

## ksum

`ksum(value)` - adds values ignoring missing data (e.g `null` values). Values
are added using the

[Kahan compensated sum algorithm](https://en.wikipedia.org/wiki/Kahan_summation_algorithm).
This is only beneficial for floating-point values such as `float` or `double`.

**Arguments:**

- `value` is any numeric value.

**Return value:**

Return value type is the same as the type of the argument.

**Examples:**

```questdb-sql
SELECT ksum(a)
FROM (SELECT rnd_double() a FROM long_sequence(100));
```

| ksum              |
| ----------------- |
| 52.79143968514029 |

## max

`max(value)` - returns the highest value ignoring missing data (e.g `null`
values).

**Arguments:**

- `value` is any numeric value

**Return value:**

Return value type is the same as the type of the argument.

**Examples:**

```questdb-sql title="Highest transaction amount"
SELECT max(amount) FROM transactions;
```

| min  |
| ---- |
| 55.3 |

```questdb-sql title="Highest transaction amount by payment_type"
SELECT payment_type, max(amount) FROM transactions;
```

| cash_or_card | amount |
| ------------ | ------ |
| cash         | 31.5   |
| card         | 55.3   |
| null         | 29.2   |

## min

`min(value)` - returns the lowest value ignoring missing data (e.g `null`
values).

**Arguments:**

- `value` is any numeric value

**Return value:**

Return value type is the same as the type of the argument.

**Examples:**

```questdb-sql title="Lowest transaction amount"
SELECT min(amount) FROM transactions;
```

| min  |
| ---- |
| 12.5 |

```questdb-sql title="Lowest transaction amount, by payment_type"
SELECT payment_type, min(amount) FROM transactions;
```

| cash_or_card | min  |
| ------------ | ---- |
| cash         | 12.5 |
| card         | 15.3 |
| null         | 22.2 |

## nsum

`nsum(value)` - adds values ignoring missing data (e.g `null` values). Values
are added using the
[Neumaier sum algorithm](https://en.wikipedia.org/wiki/Kahan_summation_algorithm#Further_enhancements).
This is only beneficial for floating-point values such as `float` or `double`.

**Arguments:**

- `value` is any numeric value.

**Return value:**

Return value type is the same as the type of the argument.

**Examples:**

```questdb-sql
SELECT nsum(a)
FROM (SELECT rnd_double() a FROM long_sequence(100));
```

| nsum             |
| ---------------- |
| 49.5442334742831 |

## sum

`sum(value)` - adds values ignoring missing data (e.g `null` values).

**Arguments:**

- `value` is any numeric value.

**Return value:**

Return value type is the same as the type of the argument.

**Examples:**

```questdb-sql title="Sum all quantities in the transactions table"
SELECT sum(quantity) FROM transactions;
```

| sum |
| --- |
| 100 |

```questdb-sql title="Sum all quantities in the transactions table, aggregated by item"
SELECT item, sum(quantity) FROM transactions;
```

| item   | count |
| ------ | ----- |
| apple  | 53    |
| orange | 47    |

### Overflow

`sum` does not perform overflow check. To avoid overflow, you can cast the
argument to wider type.

```questdb-sql title="Cast as long to avoid overflow"
SELECT sum(cast(a AS LONG)) FROM table;
```
