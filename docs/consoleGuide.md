---
id: usingWebConsole
title: How to use the web-console
sidebar_label: Web Console
---

The web-console allows you to quickly interact with your data. In this guide, we
will show you how to import data,

![console overview](/img/doc/console/console-overview.png)

:::note
This guide assumes you have QuestDB running with port `9000` open. You
can get QuestDB running by following our quick start guides for
[Docker](guideDocker.md), [Homebrew](guideHomebrew.md), and how to use QuestDB's
[binaries](binariesReference.md).
:::

## Accessing the Web Console

The web console will be available on `http://[server-address]:9000` If running
locally, the console is available on
[http://localhost:9000/index.html](http://localhost:9000/index.html) If you are
running QuestDB from Docker, make sure you mapped port `9000`. If running from
binaries or Homebrew, the port is open by default.

## SQL editor

By default, the web console opens on the SQL editor.

#### Layout

![console sections](/img/doc/console/console-sections.gif)

#### Using the editor

You can run queries directly in the editor. Let's create a simple table using
the [row generation](functionsRowGenerator.md) and
[random generator](functionsRandomValueGenerators.md) functions.

:::tip
You can also insert data using the Import screen.
:::

#### Create a table

Type the following SQL into the editor then click the `RUN` button.

```questdb-sql title="Create table"
CREATE TABLE temp(
    ts timestamp,
    location symbol,
    tempC double)
timestamp(ts);
```

The editor will perform the query and perform feedback (success/failure,
execution time).

:::tip
You can also use : `F9` or `CTRL` + `Enter` / `CMD` + `Enter` instead of
clicking the `RUN` button
:::

#### Execution behaviour

As you have noticed, you can insert multiple statements into the editor.
However, only one will be run at a time. It uses the cursor position to
determine which statement to run. To run a particular statement, click within
this statement or highlight it.

#### Insert data

We can now insert data. Let's insert some random temperatures from 4 different
places chosen at random in a list to simulate 4 sensors sending data. Note we
have to cast the row generator cursor to `int` as it is of default type `long`
but `dateadd()` requires an `int`.

```questdb-sql title="Insert"
INSERT INTO temp
    SELECT
        dateadd('s', 30 * cast(x as INT), systimestamp()) ts,
        rnd_symbol('kitchen', 'bedroom', 'bathroom', 'garage') location,
        round(rnd_int(10,15,0) + rnd_double(),1) tempC
    FROM long_sequence(1000000);
```

#### Query data

Let's now run a query. Copy/paste the following into the editor.

```questdb-sql title="Query"
SELECT ts, avg(tempC)
FROM temp
WHERE location = 'kitchen'
SAMPLE BY 7d;
```

:::tip
You can use the mouse selection to run subsets of a query. If part of a
statement is selected, the selected part will be executed. You can try by
highlighting `SELECT ts, avg(tempC) FROM temp` in the above query and running
it.
:::

#### Building queries with the table explorer

Now that you have created a table, it will appear in the table explorer on the
left-hand side. You can use this tool to explore your tables, their columns, and
respective types.

:::tip
Add tables or columns to your query by clicking on the `add` button next
to the name.
:::

#### Visualising results

You can run the above query again and now click on the `Chart` button. This will
display the chart editor. You can then choose chart type, for example `line` and
click `draw`. This will draw a chart for the series.

#### Downloading results

You can download your query results by clicking the `CSV` button. This file will
be useful to test the import functionality below.

## Import screen

Let's now take a look at the import screen. It can be accessed by clicking this
icon on the left-side navigation menu.

![upload button](/img/doc/console/upload-button.png)

#### Loading data

The Import screen allows you to instantly load data. QuestDB will automatically
recognise the schema by analysing a sample of the data.

Locate the file you just downloaded in the previous step, and import it using
either of the following methods:

- Drag and drop a `csv` or `txt` file into the import screen
- Use the browse file function

:::tip
Alternatively, you can open the file in excel, copy the data, and paste
it in the import window.
:::

:::info
The web console comes with more features such as schema editing. To find
out more, consult our [web console reference](consoleReference.md)
:::
