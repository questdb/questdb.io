---
title: Web Console
description:
  How to use the Web Console in QuestDB for importing, querying, and visualizing
  data
---

The Web Console allows you to interact with QuestDB. It provides you with tools
to query data and visualize it in a table or using graphs.

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Screenshot of the Web Console"
  height={375}
  small
  src="/img/docs/console/overview.png"
  width={500}
/>

## Accessing the Web Console

The Web Console will be available at `http://[server-address]:9000`. When
running locally, this will be [http://localhost:9000](http://localhost:9000).

## Layout

<Screenshot
  alt="Preview of the different sections in the Web Console"
  height={375}
  small
  src="/img/docs/console/layout.png"
  width={500}
/>

## Code editor

By default, the Web Console opens on the code editor.

### Shortcuts

| Command       | Action                                                                      |
| ------------- | --------------------------------------------------------------------------- |
| Run query     | `f9` or `ctrl/cmd + enter`                                                  |
| Locate cursor | `f2`, use this to focus the SQL editor on your cursor in order to locate it |

### Behaviour

As you can write multiple SQL commands separated by a semicolon, the Web Console
uses the following logic to decide which command to execute:

- Check if a query or part of a query is highlighted. If yes, it will be
  executed, otherwise:
- Check if the cursor is within a SQL statement. If yes, the statement will be
  executed, otherwise:
- Check if the cursor is on the same line as a SQL statement and after the
  semicolon. If yes, this statement will be executed, finally:
- If the cursor is on a line that does not contain a SQL statement, the next
  encountered statement will be executed. If there is no statement after the
  cursor, the previous statement will be used.

### Visualizing results

You can run a query and click on the `Chart` button. This will display the chart
editor. You can then choose chart type, for example `line` and then press
`Draw`.

### Downloading results

You can download the query result by clicking the `CSV` button. This file will
be useful to test the import functionality below.

## Import

The import tab can be accessed by clicking this icon on the left-side navigation
menu:

<Screenshot
  alt="Screenshot of the Web Console showing the location of the Import tab"
  height={535}
  small
  src="/img/docs/console/importTab.png"
  width={309}
/>

### Import details

Description of the fields in the import details table

| Column        | Description                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `File name`   | Name of the imported file. If imported from copy & paste, an automatically-generated file name |
| `Size`        | Size of the imported file                                                                      |
| `Total rows`  | Number of rows successfully imported                                                           |
| `Failed rows` | Number of rows that failed to import                                                           |
| `Header row`  | Whether the dataset has been recognized to have a header row or not                            |
| `Status`      | Status of the import. See [import statuses](#import-statuses)                                  |

### Import statuses

Description of the import statuses

| Status               | Description                                                                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `importing`          | Data is currently being imported                                                                                                                                                                 |
| `failed`             | Import failed, no data was imported                                                                                                                                                              |
| `imported in [time]` | Import is finished. The completion time is displayed next to the status                                                                                                                          |
| `exists`             | You are trying to import a file that already exists. To import it regardless, you can either **append** or **override**. See [importing again](#custom-import) for a more exhaustive description |

### Amending the schema

Although the schema is automatically detected, you can amend the type of any
column of an imported dataset using the following steps:

- Click on the file you want to amend in the Import screen. The schema will be
  displayed in a table in the lower-half of the screen.
- Click the column which type you want to change. A drop-down list allows for
  selecting a type for the column.
- You will then need to [re-trigger the import](#custom-import).

<Screenshot
  alt="Change the schema in the Web Console when importing data"
  height={525}
  src="/img/docs/console/amendType.jpg"
  width={745}
/>

### Custom import

You can amend the import behaviour with the following options. This will trigger
to import the data again.

| Option | Name                         | Description                                                        |
| ------ | ---------------------------- | ------------------------------------------------------------------ |
| `A`    | Append                       | Uploaded data will be appended to the end of the table             |
| `O`    | Override                     | Uploaded data will override existing data in the table             |
| `LEV`  | Skip lines with extra values | Skips rows that contain values that don't align with the schema    |
| `H`    | Header row                   | Flag whether the first row should be considered to be a header row |

To start the import, click the following button:

![Upload button from the Web Console](/img/docs/console/uploadButton.png)
