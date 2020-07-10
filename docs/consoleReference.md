---
id: consoleReference
title: Console Reference
sidebar_label: Console Reference
---

This is a reference for the Console. If you want to learn how to use it, we
suggest you follow the [Quickstart Guide](consoleGuide.md)

:::info
We are currently updating the web console so part of this page is out of
date. This page will be updated with the next release.
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
  ![amend type](/static/img/doc/console/amendtype.jpg)

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

![upload button](/static/img/doc/console/upload-button.png)

## SQL Editor

### Shortcuts

| Shortcut        | Action                                                                      |
| --------------- | --------------------------------------------------------------------------- |
| `Run Query`     | `F9` or `CTRL` + `Enter` or `CMD` + `Enter` (MacOS)                         |
| `Locate cursor` | `F2`. Use this to focus the SQL editor on your cursor in order to locate it |

### Behaviour

As you can write numerous SQL commands separated by semicolon, the web console
uses the following logic to decide what command to execute.

- If you have highlighted a command or part of it, this will be executed.
- If your cursor is within a SQL statement, this statement will be executed.
- If your cursor is on the same line as an SQL statement and after the
  semicolon, this statement will be executed.
- If your cursor is on a line that contains no SQL statement, the next
  encountered statement will be executed. If there is no statement following the
  cursor, then the previous statement will be executed.

#### Examples

- Command highlighted. Note neither the `CREATE TABLE` statement nor the `x*x`
  column have been executed and evaluated.

![highlight](/static/img/doc/console/sql-highlight.png)

- Cursor within a SQL statement
  ![cursor](/static/img/doc/console/cursor-in-sql.png)

- Cursor outside of a statement but on the same line
  ![cursor2](/static/img/doc/console/cursor-outside-same-line.png)

- Cursor on another line
  ![cursor other line](/static/img/doc/console/cursor-outside-different-line.png)
