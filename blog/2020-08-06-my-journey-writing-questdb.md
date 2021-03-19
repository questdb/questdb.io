---
title: My journey making QuestDB
author: Vlad Ilyushchenko
author_title: QuestDB Team
author_url: https://github.com/bluestreak01
author_image_url: https://avatars.githubusercontent.com/bluestreak01
description:
  The detailed story of how the open source time series database QuestDB came to
  life.
keywords:
  - hackernews
  - story
  - startup
  - founder
  - cto
  - timeseries
  - database
  - ycombinator
image: /img/blog/2020-08-06/banner.jpg
tags: [hackernews, story]
---

import Banner from "@theme/Banner"

<Banner
  alt="A path going into the morning mist"
  height={393}
  src="/img/blog/2020-08-06/banner.jpg"
  width={650}
>
  Photo by <a href="https://unsplash.com/photos/ptSJZoEjp3M">Wesley Tingey</a>{" "}
  on <a href="https://unsplash.com">Unsplash</a>
</Banner>

A few weeks ago, I posted
[the story of how I started QuestDB on Hacker News](https://news.ycombinator.com/item?id=23975807).
Several people found the story interesting, so I thought I would post it here
and describe the passage from working at a large energy trading company,
discovering memory-mapping approaches in Java, the beginnings of building the
system as a side-project, and how we got to where we are today with companies
relying on production instances of our time-series database.

<!-- truncate -->

## The setup

It started in 2012 when an energy trading company hired me to rebuild their
real-time vessel tracking system. Management wanted me to use a well-known XML
database that they had just bought a license for. This option would have
required to take down production for about a week just to ingest the data. And a
week downtime was not an option. With no more money to spend on software, I
turned to alternatives such as OpenTSDB but they were not a fit for our data
model. There was no solution in sight to deliver the project.

Then, I stumbled upon
[Peter Lawrey’s Java Chronicle library](https://github.com/peter-lawrey/Java-Chronicle).
It loaded the same data in 2 minutes instead of a week using memory-mapped
files. Besides the performance aspect, I found it fascinating that such a simple
method was solving multiple issues simultaneously: fast write, read can happen
even before data is committed to disk, code interacts with memory rather than IO
functions, no buffers to copy. Incidentally, this was my first exposure to
zero-GC Java.

But there were several issues. First, at the time It didn’t look like the
library was going to be maintained. Second, it used Java NIO instead of using
the OS API directly. This adds overhead since it creates individual objects with
sole purpose to hold a memory address for each memory page. Third, although the
NIO allocation API was well documented, the release API was not. It was really
easy to run out of memory and hard to manage memory page release. I decided to
ditch the XML DB and then started to write a custom storage engine in Java,
similar to what Java Chronicle did. This engine used memory mapped files,
off-heap memory and a custom query system for geospatial time series.
Implementing this was a refreshing experience. I learned more in a few weeks
than in years on the job.

Throughout my career, I mostly worked at large companies where developers are
“managed” via itemized tasks sent as tickets. There was no room for creativity
or initiative. In fact, it was in one’s best interest to follow the ticket's
exact instructions, even if it was complete nonsense. I had just been promoted
to a managerial role and regretted it after a week. After so much time hoping
for a promotion, I immediately wanted to go back to the technical side. I became
obsessed with learning new stuff again, particularly in the high performance
space.

## Taking the plunge

With some money aside, I left my job and started to work on QuestDB solo. I used
Java and a small C layer to interact directly with the OS API without passing
through a selector API. Although existing OS API wrappers would have been easier
to get started with, the overhead increases complexity and hurts performance. I
also wanted the system to be completely GC-free. To do this, I had to build
off-heap memory management myself and I could not use off-the-shelf libraries. I
had to rewrite many of the standard ones over the years to avoid producing any
garbage.

As I had my first kid, I had to take contracting gigs to make ends meet over the
following 6 years. All the stuff I had been learning boosted my confidence and I
started performing well at interviews. This allowed me to get better paying
contracts, I could take fewer jobs and free up more time to work on QuestDB
while looking after my family. I would do research during the day and implement
this into QuestDB at night. I was constantly looking for the next thing, which
would take performance closer to the limits of the hardware.

## Back to the drawing board

A year in, I realised that my initial design was actually flawed and that it had
to be thrown away. It had no concept of separation between readers and writers
and would thus allow dirty reads. Storage was not guaranteed to be contiguous,
and pages could be of various non-64-bit-divisible sizes. It was also very much
cache-unfriendly, forcing the use of slow row-based reads instead of fast
columnar and vectorized ones. Commits were slow, and as individual column files
could be committed independently, they left the data open to corruption.

Although this was a setback, I got back to work. I wrote the new engine to allow
atomic and durable multi-column commits, provide repeatable read isolation, and
for commits to be instantaneous. To do this, I separated transaction files from
the data files. This made it possible to commit multiple columns simultaneously
as a simple update of the last committed row id. I also made storage dense by
removing overlapping memory pages and writing data byte by byte over page edges.

## It's getting real!

This new approach improved query performance. It made it easy to split data
across worker threads and to optimise the CPU pipeline with prefetch. It
unlocked column-based execution and additional virtual parallelism with
[SIMD instruction sets](https://news.ycombinator.com/item?id=22803504) thanks to
[Agner Fog’s Vector Class Library](https://www.agner.org/optimize/vectorclass.pdf).
It made it possible to implement more recent innovations like our
[own version of Google SwissTable](https://github.com/questdb/questdb/blob/master/core/src/main/c/share/rosti.h).
I published more details when we released a demo server a few weeks ago on
[ShowHN](https://news.ycombinator.com/item?id=23616878). This
[demo]({@demoUrl@}) is still available to try online with a pre-loaded dataset
of 1.6 billion rows. Although it was hard and discouraging at first, this
rewrite turned out to be the second best thing that happened to QuestDB.

The best thing was that people started to contribute to the project. I am really
humbled that Tanc and Nic left our previous employer to build QuestDB. A few
months later, former colleagues of mine left their stable low-latency jobs at
banks to join us. I take this as a huge responsibility and I don’t want to let
these guys down. The amount of work ahead gives me headaches and goosebumps at
the same time.
