---
title: Why performance matters in time-series data
author: Nicolas Hourcard
author_title: QuestDB Team
author_url: https://github.com/tris0laris
author_image_url: https://avatars.githubusercontent.com/tris0laris
description:
  Thoughts on why speed and performance are crucial to time-series databases
  ingestion and analysis.
tags: [story]
---

Good data from the past helps us make better decisions in the present. Most of
today's data were created within the past ten years, and human data output will
only grow exponentially from here on. This sudden pervasiveness of data means
that we need new ways to store and process information focusing on efficiency
and sustainability. This article describes why speed and performance in a
time-series database is the key to staying afloat in a sea of data.

<!--truncate-->

The
[International Data Corporation predicts](https://www.seagate.com/files/www-content/our-story/trends/files/idc-seagate-dataage-whitepaper.pdf)
that the total collected sum of human data will reach 175 zettabytes by 2025.
One zettabyte is a billion terabytes of course, or a trillion gigabytes,
depending on which mind-bending measurement you prefer.

While we have no issue storing and collecting this data, the real trick lies in
how we process it. Forrester data says as much as
[73% of the data](https://go.forrester.com/blogs/hadoop-is-datas-darling-for-a-reason/)
within an enterprise goes unused for analytics, a huge missed opportunity to
capture and process data effectively. That’s why a number of teams are working
on competitive products to make data more useful.

QuestDB is concerned with capturing time-series data in particular, which lets
us represent and understand change over time. Time-series data might pertain to
changes to the weather, changes in a machine’s performance, or even changes in
your own weight. But quite unlike weighing yourself once a day and storing those
standalone states in a database, time-series data calls for capturing every
single tiny fluctuation in your weight, up or down, whenever you sweat, get
sick, eat a meal, or use the bathroom.

Processing this category of data calls for a high-performance system that can
quickly manipulate lots of individual data points to turn that data into a
decision-making aid. Performance is uniquely important to time-series data for
the following reasons.

## Time series data is explosive

It’s at the heart of connected devices, the Internet of Things, autonomous cars,
financial services, and even server farm monitoring. Rather than capture a
single data point, time-series data calls for capturing tens of thousands of
data points. But it doesn’t even stop there — not only does time-series data
keep growing and never stopping, but it can grow in bursts, generating lots of
readings in a short amount of time.

A weather station capturing time-series data about wind speed might record zero
for a long time. But as soon as it gets windy, you’ll get thousands of
measurements per second because the measurement is changing a lot. It takes a
high-performing system to capture and record it effectively.

Time-series data is everywhere a modern technologist looks, and the tools for
managing it effectively are a little specialized. Otherwise, the exploding need
for processing power and the simultaneously reduced availability of it becomes a
supply and demand problem.

## The end of Moore’s law is in sight

Improvements in processor power are going to slow down while data continues to
propagate exponentially. We’re facing a big problem in our quest to process and
analyze all of this data, and throwing more server racks of improved CPUs at the
problem will no longer cut it. The lack of performance improvements on the
hardware side coupled with exploding costs for companies doesn’t help anything
either. Hardware is tapped out.

That’s why it’s time to focus on the other side of this equation: the software.
The solution is to write leaner code that’s more hardware-efficient and extracts
performance gains from having the software tuned so effectively. This kind of
software is less reliant on the hardware side for its capabilities, opens up new
possibilities for harnessing data, and operates in real time without any lag.

Moore’s law is approaching its physical limit because it’s only possible to fit
so many transistors into an integrated circuit — most of the performance to data
has come from hardware, indirectly giving developers permission to write lazy,
bloated code. But there is much less room for optimizing hardware these days.
Chip manufacturers are approaching a time when they’d need a new physics to
improve on today’s modern processors. That means it’s time to focus on improving
the software.

## It reduces your cloud bills

However much data you store and process today, you’re only going to have more
data tomorrow. If you want to process increased volumes of information in the
same amount of time, then you need more computing resources, going from one to
two or more servers as your needs increase. But not only will you pay more to
your cloud service for this, you’ll also pay your database provider for
additional software licenses.

The question becomes: how much value do you actually get out of each machine? If
one can handle a billion data points, then you know you’ll need a new machine
for each additional billion. But if you can get 100 billion data points for each
new machine by using higher-performance software, then you have a really reduced
cost for each machine. You furthermore end up needing fewer of them.

Performance in time-series data is about helping you reach the best decision as
effectively as possible. That’s why QuestDB is glad to be building
high-performance time-series data solutions that are significantly faster than
the competition.
