---
title: Markdown
---

This page describes elements and components from
[MDX](https://github.com/mdx-js/mdx) that we use and elements that we avoid.

## Supported elements / components

We use the following elements.

- No more than one block per page

### Note

:::note

This is something important the user should be aware of. But no danger.

:::

### Tip

:::tip

Can be used to highlight nice tricks on a very occasional basis.

:::

### Caution

:::caution

Gives a warning about something dangerous.

:::

### Table

| table | table |
| ----- | ----- |
| value | value |
| value | value |

### "questdb-sql" code block

Title is optional.

```questdb-sql title="title"
SELECT * FROM users;
```

### Multi language code block

import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

<Tabs defaultValue="sql" values={[
  { label: "SQL", value: "sql" },
  { label: "REST", value: "rest" },
  { label: "Java", value: "java" },
]}>

<TabItem value="sql">

```questdb-sql
SELECT * FROM users;
```

</TabItem>
<TabItem value="rest">

```shell
curl -G "http://localhost:13005/exec"
```

</TabItem>
<TabItem value="java">

```java
final CairoEngine engine = new CairoEngine();
```

</TabItem>

</Tabs>

### "Script" code block

Use the `script` language. The title is optional.

```shell
some shell command
```

## Elements / components to avoid

### Info

:::info

Not used because hard to differentiate from note

:::

### Warning

:::warning

Warning

:::

### Quote

> We don't use quotes
