---
title: WHERE keyword
sidebar_label: WHERE
description: WHERE SQL keyword reference documentation.
---

`WHERE` clause filters data. Filter expressions are required to return boolean
result.

## Syntax

The general syntax is as follows. Specific filters have distinct syntaxes
detailed thereafter.

![Flow chart showing the syntax of the WHERE clause](/img/docs/diagrams/where.svg)

### Logical operators

QuestDB supports `AND`, `OR`, `NOT` as logical operators and can assemble
conditions using brackets `()`.

![Flow chart showing the detailed syntax of the WHERE clause](/img/docs/diagrams/whereComplex.svg)

```questdb-sql title="Example"
SELECT * FROM table
WHERE
a = 1 AND (b = 2 OR c = 3 AND NOT d);
```

## Symbol and string

QuestDB can filter strings and symbols based on equality, inequality, and
regular expression patterns.

### Exact match

Evaluates match of a string or symbol.

![Flow chart showing the syntax of the WHERE clause with a string comparison](/img/docs/diagrams/whereExactString.svg)

```questdb-sql title="Example"
SELECT * FROM users
WHERE name = 'John';
```

| name | age |
| ---- | --- |
| John | 31  |
| John | 45  |
| ...  | ... |

### Does NOT match

Evaluates mismatch of a string or symbol.

![Flow chart showing the syntax of the WHERE clause with a string comparison](/img/docs/diagrams/whereStringNotMatch.svg)

```questdb-sql title="Example"
SELECT * FROM users
WHERE name != 'John';
```

| name | age |
| ---- | --- |
| Tim  | 31  |
| Tom  | 45  |
| ...  | ... |

### Regular expression match

Evaluates match against a regular expression defined using
[java.util.regex](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Pattern.html)
patterns.

![Flow chart showing the syntax of the WHERE clause with a regex comparison](/img/docs/diagrams/whereRegexMatch.svg)


```questdb-sql title="Regex example"
SELECT * FROM users WHERE name ~ 'Jo';
```

| name     | age |
| -------- | --- |
| Joe      | 31  |
| Jonathan | 45  |
| ...      | ... |

### Regular expression does NOT match

Evaluates mismatch against a regular expression defined using
[java.util.regex](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/util/regex/Pattern.html)
patterns.

![Flow chart showing the syntax of the WHERE clause with a regex comparison](/img/docs/diagrams/whereRegexNotMatch.svg)

```questdb-sql title="Example"
SELECT * FROM users WHERE name !~ 'Jo';
```

| name | age |
| ---- | --- |
| Tim  | 31  |
| Tom  | 45  |
| ...  | ... |

### List search

Evaluates match or mismatch against a list of elements.

![Flow chart showing the syntax of the WHERE clause with a list comparison](/img/docs/diagrams/whereListIn.svg)

```questdb-sql title="List match"
SELECT * FROM users WHERE name in('Tim', 'Tom');
```

| name | age |
| ---- | --- |
| Tim  | 31  |
| Tom  | 45  |
| ...  | ... |

```questdb-sql title="List mismatch"
SELECT * FROM users WHERE NOT name in('Tim', 'Tom');
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

### Equality, inequality and comparison

![Flow chart showing the syntax of the WHERE clause with a numeric comparison](/img/docs/diagrams/whereNumericValue.svg)

```questdb-sql title="Superior or equal to 23"
SELECT * FROM users WHERE age >= 23;
```

```questdb-sql title="Equal to 23"
SELECT * FROM users WHERE age = 23;
```

```questdb-sql title="NOT Equal to 23"
SELECT * FROM users WHERE age != 23;
```

### Proximity

Evaluates whether the column value is within a range of the target value. This
is useful to simulate equality on `double` and `float` values.

![Flow chart showing the syntax of the WHERE clause with an EQ comparison](/img/docs/diagrams/whereEqDoublePrecision.svg)

```questdb-sql title="Equal to 23 with 0.00001 precision"
SELECT * FROM users WHERE eq(age, 23, 0.00001);
```

:::tip

When performing multiple equality checks of double values against integer
constants, it may be preferable to store double values as long integers with a
scaling factor.

:::

## Boolean

![Flow chart showing the syntax of the WHERE clause with a boolean comparison](/img/docs/diagrams/whereBoolean.svg)

Using the columnName will return `true` values. To return `false` values,
precede the column name with the `NOT` operator.

```questdb-sql title="Example - true"
SELECT * FROM users WHERE isActive;
```

| userId | isActive |
| ------ | -------- |
| 12532  | true     |
| 38572  | true     |
| ...    | ...      |

```questdb-sql title="Example - false"
SELECT * FROM users WHERE NOT isActive;
```

| userId | isActive |
| ------ | -------- |
| 876534 | false    |
| 43234  | false    |
| ...    | ...      |

## Timestamp and date

QuestDB supports both its own timestamp search notation and standard search
based on inequality. This section describes the use of the **timestamp search
notation** which is efficient and fast but requires a
[designated timestamp](/docs/concept/designated-timestamp/).

If a table does not have a designated timestamp applied during table creation,
one may be applied dynamically
[during a select operation](/docs/reference/function/timestamp/#during-a-select-operation).

### Native timestamp format

QuestDB automatically recognizes strings formatted as ISO timestamp as a
`timestamp` type. The following are valid examples of strings parsed as
`timestamp` types:

| Valid STRING Format              | Resulting Timestamp         |
| -------------------------------- | --------------------------- |
| 2010-01-12T12:35:26.123456+01:30 | 2010-01-12T14:05:26.123456Z |
| 2010-01-12T12:35:26.123456+01    | 2010-01-12T13:35:26.123456Z |
| 2010-01-12T12:35:26.123456Z      | 2010-01-12T12:35:26.123456Z |
| 2010-01-12T12:35:26.12345        | 2010-01-12T12:35:26.123450Z |
| 2010-01-12T12:35:26.1234         | 2010-01-12T12:35:26.123400Z |
| 2010-01-12T12:35:26.123          | 2010-01-12T12:35:26.123000Z |
| 2010-01-12T12:35:26.12           | 2010-01-12T12:35:26.120000Z |
| 2010-01-12T12:35:26.1            | 2010-01-12T12:35:26.100000Z |
| 2010-01-12T12:35:26              | 2010-01-12T12:35:26.000000Z |
| 2010-01-12T12:35                 | 2010-01-12T12:35:00.000000Z |
| 2010-01-12T12                    | 2010-01-12T12:00:00.000000Z |
| 2010-01-12                       | 2010-01-12T00:00:00.000000Z |
| 2010-01                          | 2010-01-01T00:00:00.000000Z |
| 2010                             | 2010-01-01T00:00:00.000000Z |
| 2010-01-12 12:35:26.123456-02:00 | 2010-01-12T10:35:26.123456Z |
| 2010-01-12 12:35:26.123456Z      | 2010-01-12T14:05:26.123456Z |
| 2010-01-12 12:35:26.123          | 2010-01-12T12:35:26.123000Z |
| 2010-01-12 12:35:26.12           | 2010-01-12T12:35:26.120000Z |
| 2010-01-12 12:35:26.1            | 2010-01-12T12:35:26.100000Z |
| 2010-01-12 12:35:26              | 2010-01-12T12:35:26.000000Z |
| 2010-01-12 12:35                 | 2010-01-12T12:35:00.000000Z |

### Exact timestamp

#### Syntax

![Flow chart showing the syntax of the WHERE clause with a timestamp comparison](/img/docs/diagrams/whereTimestampExact.svg)

```questdb-sql title="Timestamp equals date"
SELECT scores WHERE ts = '2010-01-12T00:02:26.000Z';
```

| ts                       | score |
| ------------------------ | ----- |
| 2010-01-12T00:02:26.000Z | 2.4   |
| 2010-01-12T00:02:26.000Z | 3.1   |
| ...                      | ...   |

```questdb-sql title="Timestamp equals timestamp"
SELECT scores WHERE ts = '2010-01-12T00:02:26.000000Z';
```

| ts                          | score |
| --------------------------- | ----- |
| 2010-01-12T00:02:26.000000Z | 2.4   |
| 2010-01-12T00:02:26.000000Z | 3.1   |
| ...                         | ...   |

### Time range

Return results within a defined range

#### Syntax

![Flow chart showing the syntax of the WHERE clause with a partial timestamp comparison](/img/docs/diagrams/whereTimestampPartial.svg)

```questdb-sql title="Results in a given year"
SELECT * FROM scores WHERE ts IN '2018';
```

| ts                          | score |
| --------------------------- | ----- |
| 2018-01-01T00:0000.000000Z  | 123.4 |
| ...                         | ...   |
| 2018-12-31T23:59:59.999999Z | 115.8 |

```questdb-sql title="Results in a given minute"
SELECT * FROM scores WHERE ts IN '2018-05-23T12:15';
```

| ts                          | score |
| --------------------------- | ----- |
| 2018-05-23T12:15:00.000000Z | 123.4 |
| ...                         | ...   |
| 2018-05-23T12:15:59.999999Z | 115.8 |

### Time range with modifier

You can apply a modifier to further customize the range. The algorithm will
calculate the resulting range by modifying the upper bound of the original range
by the modifier parameter.

#### Syntax

![Flow chart showing the syntax of the WHERE clause with a timestamp/modifier comparison](/img/docs/diagrams/whereTimestampPartialModifier.svg)

`multiplier` is a signed integer.

- A `positive` value extends the interval.
- A `negative` value reduces the interval.

```questdb-sql title="Results in a given year and the first month of the next year"
SELECT * FROM scores WHERE ts IN '2018;1M';
```

The range is 2018. The modifier extends the upper bound (originally 31 Dec 2018)
by one month.

| ts                          | score |
| --------------------------- | ----- |
| 2018-01-01T00:00:00.000000Z | 123.4 |
| ...                         | ...   |
| 2019-01-31T23:59:59.999999Z | 115.8 |

```questdb-sql title="Results in a given month excluding the last 3 days"
SELECT * FROM scores WHERE ts IN '2018-01;-3d';
```

The range is Jan 2018. The modifier reduces the upper bound (originally 31
Dec 2018) by 3 days.

| ts                          | score |
| --------------------------- | ----- |
| 2018-01-01T00:00:00.000000Z | 123.4 |
| ...                         | ...   |
| 2019-01-28T23:59:59.999999Z | 115.8 |

### IN with multiple arguments

#### Syntax

`IN` with more than 1 argument is treated as standard SQL `IN`. It is a
shorthand of multiple `OR` conditions, i.e. the following query:

```questdb-sql title="IN list"
SELECT * FROM scores
WHERE ts IN ('2018-01-01', '2018-01-01T12:00', '2018-01-02');
```

is equivalent to:

```questdb-sql title="IN list equivalent OR"
SELECT * FROM scores
WHERE ts = '2018-01-01' or ts = '2018-01-01T12:00' or ts = '2018-01-02');
```

| ts                          | value |
| --------------------------- | ----- |
| 2018-01-01T00:00:00.000000Z | 123.4 |
| 2018-01-01T12:00:00.000000Z | 589.1 |
| 2018-01-02T00:00:00.000000Z | 131.5 |

### BETWEEN

#### Syntax

For non-standard ranges, users can explicitly specify the target range using the
`BETWEEN` operator. As with standard SQL, both upper and lower bounds of
`BETWEEN` are inclusive, and the order of lower and upper bounds is not
important so that `BETWEEN X AND Y` is equivalent to `BETWEEN Y AND X`.

```questdb-sql title="Explicit range"
SELECT * FROM scores
WHERE ts BETWEEN '2018-01-01T00:00:23.000000Z' AND '2018-01-01T00:00:23.500000Z';
```

| ts                          | value |
| --------------------------- | ----- |
| 2018-01-01T00:00:23.000000Z | 123.4 |
| ...                         | ...   |
| 2018-01-01T00:00:23.500000Z | 131.5 |

`BETWEEN` can accept non-constant bounds, for example, the following query will
return all records older than one year before the current date:

```questdb-sql title="One year before current date"
SELECT * FROM scores
WHERE ts BETWEEN to_str(now(), 'yyyy-MM-dd')
AND dateadd('y', -1, to_str(now(), 'yyyy-MM-dd'));
```
