---
title: Numeric functions
sidebar_label: Numeric
description: Numeric function reference documentation.
---

This page describes the available functions to assist with performing numeric
calculations.

## abs

`abs(value)` return the absolute value. The behavior of `abs` is as follows:

- When the input `value` is positive, `abs` returns `value`
- When the input `value` is negative, `abs` returns `- value`
- When the input `value` is `0`, `abs` returns `0`

**Arguments:**

- `value` is any numeric value.

**Return value:**

Return value type is `double`.

**Examples:**

```questdb-sql
SELECT
    x - 2 a,
    abs(x -2)
FROM long_sequence(3);
```

| a   | abs |
| --- | --- |
| -1  | 1   |
| 0   | 0   |
| 1   | 1   |

## round

`round(value, scale)` returns the **closest** value in the specified scale. It
uses the "half up" tie-breaking method when the value is exactly halfway between
the `round_up` and `round_down` values.

**Arguments:**

- `value` is any numeric value.
- `scale` is the number of decimal points returned. A negative scale means the
  rounding will occur to a digit to the left of the decimal point. For example,
  -1 means the number will be rounded to the nearest tens and +1 to the nearest
  tenths.

**Return value:**

Return value type is `double`.

**Examples:**

```questdb-sql
SELECT
    d,
    round(d, -2),
    round(d, -1),
    round(d,0),
    round(d,1),
    round(d,2)
FROM dbl;
```

| d            | round-2 | round-1 | round0 | round1 | round2  |
| ------------ | ------- | ------- | ------ | ------ | ------- |
| -0.811905406 | 0       | 0       | -1     | -0.8   | -0.81   |
| -5.002768547 | 0       | -10     | -5     | -5     | -5      |
| -64.75487334 | -100    | -60     | -65    | -64.8  | -64.75  |
| -926.531695  | -900    | -930    | -927   | -926.5 | -926.53 |
| 0.069361448  | 0       | 0       | 0      | 0.1    | 0.07    |
| 4.003627053  | 0       | 0       | 4      | 4      | 4       |
| 86.91359825  | 100     | 90      | 87     | 86.9   | 86.91   |
| 376.3807766  | 400     | 380     | 376    | 376.4  | 376.38  |

## round_down

`round_down(value, scale)` - rounds a value down to the specified scale

**Arguments:**

- `value` is any numeric value.
- `scale` is the number of decimal points returned. A negative scale means the
  rounding will occur to a digit to the left of the decimal point. For example,
  -1 means the number will be rounded to the nearest tens and +1 to the nearest
  tenths.

**Return value:**

Return value type is `double`.

**Examples:**

```questdb-sql
SELECT
    d,
    round_down(d, -2),
    round_down(d, -1),
    round_down(d,0),
    round_down(d,1),
    round_down(d,2)
FROM dbl;
```

| d            | r_down-2 | r_down-1 | r_down0 | r_down1 | r_down2 |
| ------------ | -------- | -------- | ------- | ------- | ------- |
| -0.811905406 | 0        | 0        | 0       | -0.8    | -0.81   |
| -5.002768547 | 0        | 0        | -5      | -5      | -5      |
| -64.75487334 | 0        | -60      | -64     | -64.7   | -64.75  |
| -926.531695  | -900     | -920     | -926    | -926.5  | -926.53 |
| 0.069361448  | 0        | 0        | 0       | 0       | 0.06    |
| 4.003627053  | 0        | 0        | 4       | 4       | 4       |
| 86.91359825  | 0        | 80       | 86      | 86.9    | 86.91   |
| 376.3807766  | 400      | 370      | 376     | 376.3   | 376.38  |

## round_half_even

`round_half_even(value, scale)` - returns the **closest** value in the specified
scale. It uses the "half up" tie-breaking method when the value is exactly
halfway between the `round_up` and `round_down` values.

**Arguments:**

- `value` is any numeric value.
- `scale` is the number of decimal points returned. A negative scale means the
  rounding will occur to a digit to the left of the decimal point. For example,
  -1 means the number will be rounded to the nearest tens and +1 to the nearest
  tenths.

**Return value:**

Return value type is `double`.

**Examples:**

```questdb-sql title="Tie-breaker behavior"
SELECT
    round_half_even(5.55, 1),
    round_half_even(5.65, 1)
FROM long_sequence(1);
```

| round_half_even | round_half_even |
| --------------- | --------------- |
| 5.6             | 5.6             |

```questdb-sql title="More examples"
SELECT
    d,
    round_half_even(d, -2),
    round_half_even(d, -1),
    round_half_even(d,0),
    round_half_even(d,1),
    round_half_even(d,2)
FROM dbl;
```

| d            | r_h_e-2 | r_h_e-1 | r_h_e0 | r_h_e1 | r_h_e2  |
| ------------ | ------- | ------- | ------ | ------ | ------- |
| -0.811905406 | 0       | 0       | -1     | -0.8   | -0.81   |
| -5.002768547 | 0       | 0       | -5     | -5     | -5      |
| -64.75487334 | -100    | -60     | -65    | -64.8  | -64.75  |
| -926.531695  | -900    | -930    | -927   | -926.5 | -926.53 |
| 0.069361448  | 0       | 0       | 0      | 0.1    | 0.07    |
| 4.003627053  | 0       | 0       | 4      | 4      | 4       |
| 86.91359825  | 100     | 90      | 87     | 86.9   | 86.91   |
| 376.3807766  | 400     | 380     | 376    | 376.4  | 376.38  |

## round_up

`round_up(value, scale)` - rounds a value up to the specified scale

**Arguments:**

- `value` is any numeric value.
- `scale` is the number of decimal points returned. A negative scale means the
  rounding will occur to a digit to the left of the decimal point. For example,
  -1 means the number will be rounded to the nearest tens and +1 to the nearest
  tenths.

**Return value:**

Return value type is `double`.

**Examples:**

```questdb-sql
SELECT
    d,
    round_up(d, -2),
    round_up(d, -1),
    round_up(d,0),
    round_up(d,1),
    round_up(d,2)
FROM dbl;
```

| d            | r_up-2 | r_up-1 | r_up0 | r_up1  | r_up2   |
| ------------ | ------ | ------ | ----- | ------ | ------- |
| -0.811905406 | -100   | -10    | -1    | -0.9   | -0.82   |
| -5.002768547 | -100   | -10    | -6    | -5.1   | -5.01   |
| -64.75487334 | -100   | -70    | -65   | -64.8  | -64.76  |
| -926.531695  | -1000  | -930   | -927  | -926.6 | -926.54 |
| 0.069361448  | 100    | 10     | 1     | 0.1    | 0.07    |
| 4.003627053  | 100    | 10     | 5     | 4.1    | 4.01    |
| 86.91359825  | 100    | 90     | 87    | 87     | 86.92   |
| 376.3807766  | 400    | 380    | 377   | 376.4  | 376.39  |
