---
title: Web Console
sidebar_label: Web Console
description: Web console reference documentation.
---

This is a reference for the Console. If you want to learn how to use it, we
suggest you follow the [Guide](guide/web-console.md).

## SQL Editor

### Shortcuts

| Command       | Action                                                                      |
| ------------- | --------------------------------------------------------------------------- |
| Run query     | `f9` or `ctrl/cmd + enter`                                                  |
| Locate cursor | `f2`, use this to focus the SQL editor on your cursor in order to locate it |

### Behaviour

As you can write numerous SQL commands separated by semicolon, the Web Console
uses the following logic to decide what command to execute:

- Check if you highlighted a query or part of it, if yes then it will be
  executed, otherwise:
- Verify if the cursor is within a SQL statement, if yes, the wrapping statement
  will be executed, otherwise:
- Find out if the cursor is on the same line as a SQL statement and after the
  semicolon, if yes, this statement will be executed, finally:
- If the cursor is on a line that does not contain a SQL statement, the next
  encountered statement will be executed. If there is no statement following the
  cursor, the previous statement will be used.

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

| Status               | Description                                                                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `importing`          | Data is currently being imported                                                                                                                                                                 |
| `failed`             | Import failed, nothing was imported                                                                                                                                                              |
| `imported in [time]` | Import is finished. The completion time will be displayed next to the status                                                                                                                     |
| `exists`             | You are trying to import a file that already exists. To import it regardless, you can either **append** or **override**. See [importing again](#custom-import) for a more exhaustive description |

### Amending the schema

Although the schema is automatically detected, you can amend the type for any
column using the following steps:

- Click on the file you want to amend in the Import screen. The schema will be
  displayed.
- Find and click on the column which type you want to change.
- You will then need to [re-trigger the import](#custom-import).

<img
  alt=" Change the schema in the Web Console when importing data"
  className="screenshot--shadow screenshot--docs"
  src="/img/docs/console/amendType.jpg"
/>

### Custom import

You can amend the import behaviour with the following options. This will trigger
to import the data again.

| Option | Name                         | Description                                                        |
| ------ | ---------------------------- | ------------------------------------------------------------------ |
| `A`    | Append                       | Uploaded data will be appended at the end of the table             |
| `O`    | Override                     | Uploaded data will override existing data in the table             |
| `LEV`  | Skip lines with extra values | Skips rows that contains dangling values that don't fit the schema |
| `H`    | Header row                   | Flag whether the first row should be considered header             |

To start the import, click the following button:

![Upload button from the Web Console](/img/docs/console/uploadButton.png)
