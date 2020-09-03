---
title: How to use the Web Console
sidebar_label: Web Console
description:
  Tutorial showing how to use QuestDB's Web Console. It provides you with tools
  to query data and visualize it in a table or using graphs.
image: /img/docs/console/overview.png
---

The Web Console allows you to interact with QuestDB. It provides you with tools
to query data and visualize it in a table or using graphs. In this guide, we
will show you how to use it.

<img
  alt="Screenshot of the Web Console"
  className="screenshot--shadow screenshot--docs screenshot--small"
  src="/img/docs/console/overview.png"
/>

:::note

This assumes you have QuestDB running with port `9000` accessible. You can get
QuestDB running by following our guides for [Docker](/docs/guide/docker/),
[Homebrew](/docs/guide/homebrew/) or with the [binaries](/docs/guide/binaries/).

:::

## Accessing the Web Console

The Web Console will be available at `http://[server-address]:9000`. When
running locally, this will be http://localhost:9000.

If you are running QuestDB from Docker, make sure you publish the port `9000`
(`-p 9000:9000`).

## Layout

<img
  alt="Preview of the different sections in the Web Console"
  className="screenshot--shadow screenshot--docs screenshot--small"
  src="/img/docs/console/layout.png"
/>

## Code editor

By default, the Web Console opens on the code editor.

### Create a table

Re-use the following SQL statement in the editor and then press the `Run`
button:

```questdb-sql
CREATE TABLE temp(
    ts timestamp,
    location symbol,
    tempC double
) timestamp(ts);
```

The editor will send the query to QuestDB and provide feedback as soon as the
result is ready. The status (success/failure) as well as query timings (when
relevant) will be shown in a toast notification.

:::tip

To execute the query, you can also use the keyboard shortcuts `f9` or
`ctrl/cmd + enter`

:::

### Execution behaviour

You can insert/type multiple statements in the code editor. When you press "Run"
(or use a shorcut), only one statement will be executed at a time. The Console
uses the cursor position to determine which statement to run. To run a
particular statement, click within this statement or highlight it.

### Insert data

Let's insert random temperatures of 4 different places from a list. This will
simulate 4 sensors sending data. Note we have to cast the row generator cursor
to `int` as it is of type `long` while `dateadd()` requires an `int`:

```questdb-sql
INSERT INTO temp
    SELECT
        dateadd('s', 30 * cast(x AS INT), systimestamp()) ts,
        rnd_symbol('kitchen', 'bedroom', 'bathroom', 'garage') location,
        round(rnd_int(10,15,0) + rnd_double(),1) tempC
    FROM long_sequence(1000000);
```

### Query data

Let's now run a query. You can copy annd paste the following into the editor:

```questdb-sql
SELECT ts, avg(tempC)
    FROM temp
    WHERE location = 'kitchen'
    SAMPLE BY 7d;
```

:::tip

You can use the mouse selection to run a subset of a query.

For example, you can highlight `SELECT ts, avg(tempC) FROM temp` in the above
query and try to run it.

:::

### Building queries with the table explorer

Now that you have created a table, it will appear in the table explorer on the
left-hand side. You can use this tool to explore your tables, columns, and
respective types.

:::tip

Add tables or columns to your query by clicking on the `add` button next to the
name.

:::

### Visualising results

You can run the above query again and now click on the `Chart` button. This will
display the chart editor. You can then choose chart type, for example `line` and
press `Draw`.

### Downloading results

You can download the query result by clicking the `CSV` button. This file will
be useful to test the import functionality below.

## Import tab

Let's now take a look at the import tab. It can be accessed by clicking this
icon on the left-side navigation menu:

<img
  alt="Screenshot of the Web Console showing the location of the Import tab"
  className="screenshot--shadow screenshot--docs screenshot--small"
  src="/img/docs/console/importTab.png"
/>

### Loading data

QuestDB will automatically recognize the schema by analyzing a sample of the
data you upload.

Locate the file you just downloaded in the previous step, and import it:

- Drag and drop a `csv` or `txt` file into the import screen
- Use the browse file function

:::tip

Alternatively, you can open the file in Excel, copy the data, and paste it in
the import window.

:::

:::info

The Web Console comes with more features such as schema editing. To find out
more, consult our [Web Console reference](/docs/reference/web-console/)

:::
