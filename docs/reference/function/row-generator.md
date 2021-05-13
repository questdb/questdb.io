---
title: Row generator
sidebar_label: Row generator
description: Row generator function reference documentation.
---

The `long_sequence()` function may be used as a row generator to create table
data for testing. Basic usage of this function involves providing the number of
iterations required. Deterministic pseudo-random behavior can be achieved by
providing seed values when calling the function.

This function is commonly used in combination with
[random generator functions](/docs/reference/function/random-value-generator/)
to produce mock data.

## long_sequence

- `long_sequence(iterations)` - generates rows
- `long_sequence(iterations, seed1, seed2)` - generates rows deterministically

**Arguments:**

-`iterations`: is a `long` representing the number of rows to generate. -`seed1`
and `seed2` are `long64` representing both parts of a `long128` seed.

### Row generation

The `long_sequence()` function can be used to generate very large datasets for
testing e.g. billions of rows.

`long_sequence(iterations)` is used to:

- Generate a number of rows defined by `iterations`.
- Generate a column `x:long` of monotonically increasing long integers starting
  from 1, which can be accessed for queries.

### Random number seed

When `long_sequence` is used conjointly with
[random generators](/docs/reference/function/random-value-generator/), these
values are usually generated at random. The function supports a seed to be
passed in order to produce deterministic results.

:::info

Deterministic procedural generation makes it easy to test on vasts amounts of
data without actually moving large files around across machines. Using the same
seed on any machine at any time will consistently produce the same results for
all random functions.

:::

**Examples:**

```questdb-sql title="Generating multiple rows"
SELECT x, rnd_double()
FROM long_sequence(5);
```

| x   | rnd_double   |
| --- | ------------ |
| 1   | 0.3279246687 |
| 2   | 0.8341038236 |
| 3   | 0.1023834675 |
| 4   | 0.9130602021 |
| 5   | 0.718276777  |

```questdb-sql title="Accessing row_number using the x column"
SELECT x, x*x
FROM long_sequence(5);
```

| x   | x\*x |
| --- | ---- |
| 1   | 1    |
| 2   | 4    |
| 3   | 9    |
| 4   | 16   |
| 5   | 25   |

```questdb-sql title="Using with a seed"
SELECT rnd_double()
FROM long_sequence(2,128349234,4327897);
```

:::note

The results below will be the same on any machine at any time as long as they
use the same seed in long_sequence.

:::

| rnd_double         |
| ------------------ |
| 0.8251337821991485 |
| 0.2714941145110299 |
