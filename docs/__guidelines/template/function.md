---
title: FUNCTION
sidebar_label: Function
---

Function reference pages list one or several (when closely related to each
other) functions. For this reason, it the section should start with a short
paragraph describing the class of functions described in this page and what they
are used for. They should also be listed at the top so users can find them
easily.

| Function                            | One liner description                      |
| ----------------------------------- | ------------------------------------------ |
| [function_name](#function_name)     | This function only has one syntax.         |
| [function_name_2](#function_name_2) | This function has various possible syntax. |
| ...                                 | ...                                        |

## function_name

| Syntax                       | Return value | Description            |
| ---------------------------- | ------------ | ---------------------- |
| function_name(`arg1`,`arg2`) | `BOOLEAN`    | What the function does |

### Arguments

| Argument | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `arg1`   | `DOUBLE` | Sets the argument for the function.                                                                        |
| `arg1`   | `STRING` | Sets the other argument for the function. Possible values are `value1` to do this, and `value2` to do that |

### Description

`function_name` requires a longer explanation of the logic because it is a bit
complex. In this case, it is good to describe it with some text. It should start
by a plain-text explanation. Then branches should be expressed as bullet points.
For example a given `argument` might have various behaviors depending on value

- `true` makes it do this. It means that this happens and that might happen.
- `false` makes the function do that. So `function_name` may have this behavior.

### Examples

#### Basic usage

```questdb-sql title="Example description - Scalar result"
SELECT function_name(arg1,arg2) FROM table;
```

| function_name |
| ------------- |
| true          |

#### With optional arguments

```questdb-sql title="Example description - Table result"
SELECT function_name(arg1,arg2,opt1) FROM table;
```

| a     | b   | function_name | function_name |
| ----- | --- | ------------- | ------------- |
| true  | 47  | true          | 47            |
| false | 53  | false         | 53            |

#### With null

```questdb-sql title="Example description - Series result"
SELECT function_name(arg1,arg2) FROM table;
```

| a     | b   | function_name | function_name |
| ----- | --- | ------------- | ------------- |
| true  | 47  | true          | 47            |
| ...   | ... | ...           | ...           |
| false | 53  | false         | 53            |

## function_name_2

| Syntax                       | Return value | Description                                                                                                                                                                                       |
| ---------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function_name()              | `INT`        | What the function does                                                                                                                                                                            |
| function_name(`arg1`,`arg2`) | `LONG`       | A much longer description of what the function does because in this case it turns out that this particular function is slightly more complicated than other functions which are less complicated. |

### Arguments

| Argument | Type     | Description                                                                                                |
| -------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `arg1`   | `DOUBLE` | Sets the argument for the function.                                                                        |
| `arg1`   | `STRING` | Sets the other argument for the function. Possible values are `value1` to do this, and `value2` to do that |

### Description

`function_name` requires a longer explanation of the logic because it is a bit
complex. In this case, it is good to describe it with some text. It should start
by a plain-text explanation. Then branches should be expressed as bullet points.
For example a given `argument` might have various behaviors depending on value

- `true` makes it do this. It means that this happens and that might happen.
- `false` makes the function do that. So `function_name` may have this behavior.

### Examples

At minimum, examples need a descriptive title. An optional description can be
used to.

#### Basic usage

```questdb-sql title="Example description - Scalar result"
SELECT function_name(arg1,arg2) FROM table;
```

| function_name |
| ------------- |
| true          |

#### With optional arguments

```questdb-sql title="Example description - Table result"
SELECT function_name(arg1,arg2) FROM table;
```

| a     | b   | function_name | function_name |
| ----- | --- | ------------- | ------------- |
| true  | 47  | true          | 47            |
| false | 53  | false         | 53            |

#### With null

```questdb-sql title="Example description - Series result"
SELECT function_name(arg1,arg2) FROM table;
```

| a     | b   | function_name | function_name |
| ----- | --- | ------------- | ------------- |
| true  | 47  | true          | 47            |
| ...   | ... | ...           | ...           |
| false | 53  | false         | 53            |
