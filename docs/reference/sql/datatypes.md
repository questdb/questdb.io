---
title: Data types
sidebar_label: Data types
description: Data types reference documentation.
---

The type system is derived from Java types.

| Type Name   | Storage bits | Description                                                                                                                                                                                                                                                         |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `boolean`   | `1`          | boolean `true` or `false`                                                                                                                                                                                                                                           |
| `byte`      | `8`          | signed integer `-128` to `127`                                                                                                                                                                                                                                      |
| `short`     | `16`         | signed integer `-32768` to `32767`                                                                                                                                                                                                                                  |
| `char`      | `16`         | `unicode` character                                                                                                                                                                                                                                                 |
| `int`       | `32`         | signed integer `0x80000000` to `0x7fffffff`                                                                                                                                                                                                                         |
| `float`     | `32`         | single precision IEEE 754 floating point value                                                                                                                                                                                                                      |
| `symbol`    | `32`         | Symbols are stored as 32-bit signed indexes from symbol table. Each index will have a corresponding `string` value. Translation from index to string value is done automatically when data is being written or read. Symbol table is stored separately from column. |
| `string`    | `32+n*16`    | Length-prefixed sequence of UTF-16 encoded characters whose length is stored as signed 32-bit integer with maximum value of `0x7fffffff`.                                                                                                                           |
| `long`      | `64`         | signed integer `0x8000000000000000L` to `0x7fffffffffffffffL`                                                                                                                                                                                                       |
| `date`      | `64`         | signed offset in **milliseconds** from [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time)                                                                                                                                                                        |
| `timestamp` | `64`         | signed offset in **microseconds** from [Unix Epoch](https://en.wikipedia.org/wiki/Unix_time)                                                                                                                                                                        |
| `double`    | `64`         | double precision IEEE 754 floating point value                                                                                                                                                                                                                      |
| `binary`    | `64+n*8`     | Length-prefixed sequence of bytes whose length is stored as signed 64-bit integer with maximum value of `0x7fffffffffffffffL`.                                                                                                                                      |
| `long256`   | `256`        | unsigned 256-bit integer                                                                                                                                                                                                                                            |

:::info

`BINARY` field size is limited either by 64-Bit signed int (8388608 peta bytes)
or disk size, whichever is smaller.

:::

:::info

`STRING` field size is limited by either 32-bit signed int (1073741824
characters) or disk size, whichever is smaller.

:::
