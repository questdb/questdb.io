---
title: Storage model
sidebar_label: Storage model
description:
  Overview of QuestDB's column-based storage model. It ensures table level
  atomicity and durability while keeping low overhead for maximum performance.
---

QuestDB uses a **column-based** storage model. Data is stored in tables with
each column stored in its own file and its own native format. New data is
appended to the bottom of each column to allow data to be organically retrieved
in the same order that it was ingested.

## Append model

QuestDB appends one column at a time and each one is updated using the same
method. The tail of column file is mapped into the memory page in RAM and the
column append is effectively a memory write at an address. Once the memory page
is exhausted it is unmapped (thus writing data to disk) and a new page is
mapped.

**This method ensures minimum resource churn and consistent append latency.**

import Screenshot from "@theme/Screenshot"

<Screenshot
  alt="Architecture of the file storing a column"
  height={435}
  src="/img/docs/concepts/columnUpdate.svg"
  width={745}
/>

## Read model

Table columns are randomly accessible. Columns with fixed size data types are
read by translating the record number into a file offset by a simple bit shift.
The offset in the column file is then translated into an offset in a lazily
mapped memory page, where the required value is read from.

<Screenshot
  alt="Diagram showing how the data from a column file is mapped to the memory"
  height={447}
  src="/img/docs/concepts/columnRead.svg"
  width={745}
/>

## Consistency and durability

QuestDB ensures table level **isolation** and **consistency** by applying table
updates **atomically**. Updates to a table are applied in the context of a table
transaction which is either committed or rolled back in an atomic operation.
Queries that are concurrent with table updates are consistent in the sense that
they will return data either as it was before or after the table transaction was
committed — no intermediate uncommitted data will be show in a query result.

To guarantee **atomicity**, each table maintains a `last_committed_record_count`
in a separate file. By convention, any table reader will never read more records
than `tx_count`. This enables the **isolation** property: where uncommitted data
cannot be read. Since uncommitted data is appended directly to the table, the
transaction size is only limited by the available disk space.

Once all data is appended, QuestDB `commit()` ensures that the `tx_count` is
updated atomically both in multi-threaded and multi-process environments. It
does so lock-free to ensure minimal impact on concurrent reads.

The **consistency** assurance of the data stored is limited to QuestDB
auto-repairing abnormally terminated transactions. We do not yet support
user-defined constraints, checks and triggers.

Data **durability** can be configured with `commit()` optionally being able to
invoke `msync()` with a choice of synchronous or asynchronous IO.

<Screenshot
  alt="Diagram of a commit across several column files"
  height={426}
  src="/img/docs/concepts/commitModel.svg"
  width={745}
/>

## Summary

The QuestDB storage model uses memory mapped files and cross-process atomic
transaction updates as a low overhead method of inter-process communication.
Data committed by one process can be instantaneously read by another process
either randomly (via queries) or incrementally (as data queue). QuestDB provides
a variety of reader implementations.

<Screenshot
  alt="Architecture of the storage model with column files, readers/writers and the mapped memory"
  height={596}
  src="/img/docs/concepts/storageSummarized.svg"
  width={745}
/>

<span />
