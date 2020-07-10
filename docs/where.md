---
id: where
title: WHERE
sidebar_label: WHERE
---

`WHERE` clause filters data. Filter expressions are required to return boolean
result.

## Syntax

The general syntax is as follows. Specific filters have distinct syntaxes
detailed thereafter.

![filter syntax](/static/img/doc/diagrams/filtered-statement.svg)

### Logical Operators

QuestDB supports `AND`, `OR`, `NOT` as logical operators and can assemble
conditions using brackets `()`.

![complex where syntax](/static/img/doc/diagrams/complexWhere.svg)

```sql title="Example"
SELECT * FROM table WHERE
a = 1 AND (b = 2 OR c = 3 and not d)
```

## Symbol and string

QuestDB can filter strings and symbols based on equality, inequality, and
regular expression patterns.

### Exact match

Evaluates match of a string or symbol.

![where syntax exact string](/static/img/doc/diagrams/whereExactString.svg)

```sql title="Example"
SELECT * FROM tab WHERE name = 'John'
```

| name | age |
| ---- | --- |
| John | 31  |
| John | 45  |
| ...  | ... |

### Does NOT match

Evaluates mismatch of a string or symbol.

![where syntax string not match](/static/img/doc/diagrams/whereStringNotMatch.svg)

```sql title="Example"
SELECT * FROM tab WHERE name != 'John'
```

| name | age |
| ---- | --- |
| Tim  | 31  |
| Tom  | 45  |
| ...  | ... |

### Regular expression match

Evaluates match against a regular expression defined using
[java.util.regex](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)
patterns.

![where syntax regex match](/static/img/doc/diagrams/whereRegexMatch.svg)

```sql title="Example"
SELECT * FROM tab WHERE ~=(name, 'Jo')
```

| name     | age |
| -------- | --- |
| Joe      | 31  |
| Jonathan | 45  |
| ...      | ... |

### Regular expression does NOT match

Evaluates mismatch against a regular expression defined using
[java.util.regex](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html)
patterns.

![where syntax regex not match](/static/img/doc/diagrams/whereRegexNotMatch.svg)

```sql title="Example"
SELECT * FROM tab WHERE !~(name, 'Jo')
```

| name | age |
| ---- | --- |
| Tim  | 31  |
| Tom  | 45  |
| ...  | ... |

### List search

Evaluates match or mismatch against a list of elements.
![where syntax list match](/static/img/doc/diagrams/listMatch.svg)

```sql title="List match"
SELECT * FROM tab WHERE name in('Tim', 'Tom')
```

| name | age |
| ---- | --- |
| Tim  | 31  |
| Tom  | 45  |
| ...  | ... |

```sql title="List mismatch"
SELECT * FROM tab WHERE NOT name in('Tim', 'Tom')
```

| name   | age |
| ------ | --- |
| Aaron  | 31  |
| Amelie | 45  |
| ...    | ... |

## Numeric

QuestDB can filter numeric values based on equality, inequality, comparison, and
proximity

:::note
For timestamp filters, we recommend the
[timestamp search notation](#timestamp-and-date) which is faster and less
verbose.
:::

### Equality, Inequality and comparison

![syntax numeric comparison](/static/img/doc/diagrams/whereNumericValue.svg)

```sql title="Superior or equal to 23"
SELECT * FROM tab WHERE age >= 23
```

```sql title="Equal to 23"
SELECT * FROM tab WHERE age = 23
```

```sql title="NOT Equal to 23"
SELECT * FROM tab WHERE age != 23
```

### Proximity

Evaluates whether the column value is within a range of the target value. This
is useful to simulate equality on `double` and `float` values.

![syntax eq comparison doulbe](/static/img/doc/diagrams/whereEqDoublePrecision.svg)

```sql title="Equal to 23 with 0.00001 precision"
SELECT * FROM tab WHERE eq(age, 23, 0.00001)
```

:::tip
When performing multiple equality checks of double values against integer
constants, it may be preferable to store double values as long integers with a
scaling factor.
:::

## Boolean

![syntax boolean where](/static/img/doc/diagrams/booleanWhere.svg)

Using the columnName will return `true` values. To return `false` values,
precede the column name with the `NOT` operator.

```sql title="Example - true"
SELECT * FROM table WHERE isActive
```

| customerId | isActive |
| ---------- | -------- |
| 12532      | true     |
| 38572      | true     |
| ...        | ...      |

```sql title="Example - false"
SELECT * FROM table WHERE NOT isActive
```

| customerId | isActive |
| ---------- | -------- |
| 876534     | false    |
| 43234      | false    |
| ...        | ...      |

## Timestamp and date

QuestDB supports both its own timestamp search notation and standard search
based on inequality. This section describes the use of the
`timestamp search notation` which is efficient and fast but requires a
[designated timestamp](designatedTimestamp.md). Remember, designated timestamp
can be applied [dynamically](timestamp.md#during-a-select-operation).

### Exact timestamp

#### Syntax

![syntax timestamp exacth where](/static/img/doc/diagrams/timestampExact.svg)

```sql title="Example - Date"
SELECT scores WHERE ts = '2010-01-12T00:02:26.000Z'
```

| timestamp                | score |
| ------------------------ | ----- |
| 2010-01-12T00:02:26.000Z | 2.4   |
| 2010-01-12T00:02:26.000Z | 3.1   |
| ...                      | ...   |

```sql title="Example - Timestamp"
SELECT scores WHERE ts = '2010-01-12T00:02:26.000000Z'
```

| timestamp                   | score |
| --------------------------- | ----- |
| 2010-01-12T00:02:26.000000Z | 2.4   |
| 2010-01-12T00:02:26.000000Z | 3.1   |
| ...                         | ...   |

### Time range

Return results within a defined range

#### Syntax

![syntax timestamp partial where](/static/img/doc/diagrams/timestampPartial.svg)

```sql title="Results in a given year"
SELECT * FROM tab WHERE ts = '2018'
```

| timestamp                   | value |
| --------------------------- | ----- |
| 2018-01-01T00:0000.000000Z  | 123.4 |
| ...                         | ...   |
| 2018-12-31T23:59:59.999999Z | 115.8 |

```sql title="Results in a given minute"
SELECT * FROM tab WHERE ts = '2018-05-23T12:15'
```

| timestamp                   | value |
| --------------------------- | ----- |
| 2018-05-23T12:15:00.000000Z | 123.4 |
| ...                         | ...   |
| 2018-05-23T12:15:59.999999Z | 115.8 |

### Time Range with modifier

You can apply a modifier to further customise the range. The algorithm will
calculate the resulting range by modifying the upper bound of the original range
by the modifier parameter.

#### Syntax

![syntax timestamp partial modifier where](/static/img/doc/diagrams/timestampPartialModifier.svg)

`multiplier` is a signed integer.

- A `positive` value extends the interval.
- A `negative` value reduces the interval.

```sql title="Results in a given year and the first month of the next year"
SELECT * FROM tab WHERE ts = '2018;1M'
```

The range is 2018. The modifier extends the upper bound (originally 31 Dec 2018)
by one month.

| timestamp                   | value |
| --------------------------- | ----- |
| 2018-01-01T00:00:00.000000Z | 123.4 |
| ...                         | ...   |
| 2019-01-31T23:59:59.999999Z | 115.8 |

```sql title="Results in a given month excluding the last 3 days"
SELECT * FROM tab WHERE ts = '2018-01;-3d'
```

The range is Jan 2018. The modifier reduces the upper bound (originally 31
Dec 2018) by 3 days.

| timestamp                   | value |
| --------------------------- | ----- |
| 2018-01-01T00:00:00.000000Z | 123.4 |
| ...                         | ...   |
| 2019-01-28T23:59:59.999999Z | 115.8 |

### Explicit range

#### Syntax

For non-standard ranges, users can explicitly specify the target range using the
`in` operator.

![syntax timestamp explicit range where](/static/img/doc/diagrams/timestampExplicitRange.svg)

`lower_bound` and `upper_bound` must be valid timestamps or dates and are
`inclusive`.

```sql title="Explicit range"
SELECT * FROM tab
WHERE ts in('2018-01-01T00:00:23.000000Z' , '2018-01-01T00:00:23.500000Z')
```

| timestamp                   | value |
| --------------------------- | ----- |
| 2018-01-01T00:00:23.000000Z | 123.4 |
| ...                         | ...   |
| 2018-01-01T00:00:23.500000Z | 131.5 |
