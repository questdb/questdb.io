---
title: Telemetry
sidebar_label: Telemetry
description: What data QuestDB collects and how to disable telemetry collection.
---
QuestDB sends telemetry data with information about usage 
which helps us improve the product over time. We do not collect any personally-identifying information, and we do not share any of this data 
with third parties.

This page describes what data is collected and how to disable the telemetry reporting function.

## Disabling telemetry
To disable telemetry, add the following configuration key in [server.conf](server.md)
```shell title="Disabling telemetry"
telemetry.enabled=false
```

## Data collected
QuestDB collects the following usage data

| Field | Type | Description |
|---|---|---|
|id| `long256` | A unique identifier generated once at runtime as the concatenation of microseconds timestamp with a nanosecond timestamp. |
|created | `date`| Event timestamp |
| event | `short` | Event type ID. For example `1` for `SELECT`, `2` for `INSERT`, etc) |
| origin | `short` | Event origin ID, `1` for `INTERNAL`, `2` for `HTTP`, `3` for PG_WIRE, etc.)| 
