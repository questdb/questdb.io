---
title: Web Console
sidebar_label: Web Console
description: Web console reference documentation.
---

This is a reference for the Console. If you want to learn how to use it, we
suggest you follow the [Quickstart Guide](guide/web-console.md).

:::info

We are currently updating the Web Console so part of this page is out of date.
This page will be updated with the next release.

:::

## Import

### Import details

Description of the fields in the import details table

| Column        | Description                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `File name`   | Name of the file imported. If imported from copy & paste, an automatically-generated file name |
| `Size`        | Size of the imported file                                                                      |
| `Total rows`  | Number of rows successfully imported                                                           |
| `Failed rows` | Number of rows that failed to import                                                           |
| `Header row`  | Whether the dataset has been recognised to have a header row or not                            |
| `Status`      | Status of the import. See below                                                                |

### Import statuses

Description of the import statuses

| Status               | Description                                                                                                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `importing`          | data is being imported                                                                                                                                                                        |
| `failed`             | import failed, nothing was imported                                                                                                                                                           |
| `imported in [time]` | import is finished. The completion time will be displayed next to the status                                                                                                                  |
| `exists`             | you are trying to import a file that already exists. To import it anyways, you can either **append** or **override**. See [importing again](#custom-import) for a more exhaustive description |

### Amending the schema

Although the schema is automatically detected, you can amend the type for any
column using the following steps:

- Click on the file you want to amend in the Import screen. The schema will be
  displayed.
- Find and click on the column which type you want to change.
- You will then need to [re-trigger the import](#custom-import).
  ![Change the schema in the Web Console when importing data](/img/docs/console/amendType.jpg)

### Custom import

You can amend the import behaviour with the following options. This will trigger
to import the data again.

| Option | Name                         | Description                                                        |
| ------ | ---------------------------- | ------------------------------------------------------------------ |
| `A`    | Append                       | Uploaded data will be appended at the end of the table             |
| `O`    | Override                     | Uploaded data will override existing data in the table             |
| `LEV`  | Skip lines with extra values | Skips rows that contains dangling values that don't fit the schema |
| `H`    | Header row                   | Flag whether the first row should be considered header             |

**To start the import, click the following button:**

![Upload button from the Web Console](/img/docs/console/uploadButton.png)

## SQL Editor

### Shortcuts

| Shortcut        | Action                                                                      |
| --------------- | --------------------------------------------------------------------------- |
| `Run Query`     | `F9` or `CTRL` + `Enter` or `CMD` + `Enter` (macOS)                         |
| `Locate cursor` | `F2`. Use this to focus the SQL editor on your cursor in order to locate it |

### Behaviour

As you can write numerous SQL commands separated by semicolon, the Web Console
uses the following logic to decide what command to execute.

- If you have highlighted a command or part of it, this will be executed.
- If your cursor is within a SQL statement, this statement will be executed.
- If your cursor is on the same line as an SQL statement and after the
  semicolon, this statement will be executed.
- If your cursor is on a line that contains no SQL statement, the next
  encountered statement will be executed. If there is no statement following the
  cursor, then the previous statement will be executed.

### Examples

- Command highlighted. Note neither the `CREATE TABLE` statement nor the `x*x`
  column have been executed and evaluated.

![Code editor in the Web Console with part of the code highlighted](/img/docs/console/sqlHighlight.png)

- Cursor within a SQL statement
  ![Code editor in the Web Console where the cursor is positioned in the SQL statement in order to run the surrounding expression](/img/docs/console/cursorInSql.png)

- Cursor outside of a statement but on the same line
  ![Code editor in the Web Console where the cursor is positioned at the end of the SQL statement in order to run the surrounding expression](/img/docs/console/cursorOutsideSameLine.png)

- Cursor on another line
  ![Code editor in the Web Console with the cursor positioned on a new empty line](/img/docs/console/cursorOutsideDifferentLine.png)
