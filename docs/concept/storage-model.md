---
title: Storage Model
sidebar_label: Storage Model
---

QuestDB uses a **column-based** storage model. Data is stored in tables with
each column stored in its own file and its own native format. New data is
appended to the bottom of each column to allow data to be organically retrieved
in the same order versus ingestion.

## Append Model

QuestDB appends one column at a time and each one is updated using the same
method. The tail of column file is mapped into the memory page in RAM and the
column append is effectively a memory write at an address. Once the memory page
is exhausted it is unmapped (thus writing data to disk) and the new page is
mapped at a new append offset.

**This method ensures minimum resource churn and consistent append latency.**

![column read](/img/doc/concepts/column-read.png)

## Read Model

Table columns are randomly accessible. Columns with fixed size data types are
read by translating the record number into a file offset by a simple bit shift.
The offset in the column file is then translated into an offset in a lazily
mapped memory page, where the required value is read from.

![column update](/img/doc/concepts/column-update.png)

## ACID properties

QuestDB utilizes
[ACID properties](<https://en.wikipedia.org/wiki/Atomicity_(database_systems)>)
(Atomicity, Consistency, Isolation, Durability) to ensure data integrity during
a transaction. **QuestDB’s transaction size is only limited by the available
disk space.**

To guarantee **atomicity**, each table maintains a `last_committed_record_count`
in a separate file. By convention, any table reader will never read more records
than `tx_count`. This enables the property `isolation`: where uncommitted data
cannot be read. Since uncommitted data is appended directly to the table,

Once all data is appended, QuestDB `commit()` ensures that the `tx_count` is
updated atomically both in multi-threaded and multi-process environments. It
does so `lock-free` to ensure minimal impact on concurrent reads.

The **consistency** assurance of the data stored is limited to QuestDB
auto-repairing abnormally terminated transactions. We do not yet support
user-defined constraints, checks and triggers.

Data **durability** can be configured with commit() optionally being able to
invoke msync() with a choice of synchronous or asynchronous IO.

![storage model](/img/doc/concepts/storage-model-2.png)

## Summary

The QuestDB storage model uses memory mapped files and cross-process atomic
transaction updates as a low overhead method of inter-process communication.
Data committed by one process can be instantaneously read by another process
either randomly (via queries) or incrementally (as data queue). QuestDB provides
a variety of reader implementations.

![storage summarized](/img/doc/concepts/storage-summarized.png)
