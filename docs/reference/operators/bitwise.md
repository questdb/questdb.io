---
title: Bitwise operators
sidebar_label: Bitwise
description: Bitwise operators reference documentation.
---

This page describes the available operators to assist with performing bitwise
operations on numeric values.

Precedence of these operators is as follows:

1. `~` NOT
2. `&` AND
3. `^` XOR
4. `|` OR

## ~ NOT

`~` is a unary operation that performs logical negation on each bit. Bits that
are 0 become 1, and those that are 1 become 0. Expects a value of `long` type.

**Examples:**

```questdb-sql
SELECT ~1024
```

| column |
| ------ |
| -1025  |

## & AND

`&` is a binary operation that takes two equal-length binary representations and
performs the logical AND operation on each pair of the corresponding bits.
Expects values of `long` type.

**Examples:**

```questdb-sql
SELECT 5 & 3
```

| column |
| ------ |
| 1      |

## ^ XOR

`^` is a binary operation that takes two bit patterns of equal length and
performs the logical exclusive OR operation on each pair of corresponding bits.
Expects a value of `long` type.

**Examples:**

```questdb-sql
SELECT 5 ^ 3
```

| column |
| ------ |
| 6      |

## | OR

`|` is a binary operation that takes two bit patterns of equal length and
performs the logical inclusive OR operation on each pair of corresponding bits.
Expects a value of `long` type.

**Examples:**

```questdb-sql
SELECT 5 ^ 3
```

| column |
| ------ |
| 6      |
