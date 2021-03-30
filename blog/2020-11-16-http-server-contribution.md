---
title: Contribution from Alex Pelagenko on QuestDB's HTTP server
author: Alex Pelagenko
author_title: QuestDB Contributor
author_url: https://github.com/ideoma
author_image_url: https://avatars.githubusercontent.com/ideoma
description:
  One of QuestDB’s major contributors, Alex Pelagenko, shares his experience on
  improving QuestDB’s HTTP server.
image: /img/blog/2020-11-16/banner.jpg
tags: [community-written]
---

import Banner from "@theme/Banner"

<Banner
  alt="Close-up on a dark computer keyboard."
  height={391}
  src="/img/blog/2020-11-26/banner.jpg"
  width={650}
>
  Photo by <a href="https://unsplash.com/photos/1osIUArK5oA">Florian Krumm</a>{" "}
  on <a href="https://unsplash.com">Unsplash</a>
</Banner>

I have recently made a sizable contribution to QuestDB’s code and wanted to
share my experience and feedback while it is still fresh in my head. I am not a
complete outsider for the project and know Vlad personally but other than that
it was voluntary to add a few lines of code to a project I like.

<!--truncate-->

## Introduction of the problem

QuestDB has a custom HTTP stack that uses non-blocking socket IO via a thin
layer of JNI OS abstraction. Non-blocking IO is handled via two state machines.
One for inbound traffic, which includes a series of parsing state machines. The
other for outbound traffic. We focus on the outbound traffic state machine,
which has to deal with two types of interruptions: slow socket on one side and
data availability on the other. While slow socket interruption was already dealt
with, the data availability interruption had been handled in a very trivial
manner. When data was unavailable, the HTTP stack would report an immediate
error and trigger a send-to-socket state machine.

Data availability interruptions are due to QuestDB’s single writer model. A
table will be locked while the HTTP server is dealing with a CSV import request.
A request to alter the locked table will bounce back with an error. Why is this
interesting? It is a difficult problem of coordination amongst threads while at
the same time keeping the whole stack non-blocking.

## What did I do?

The first hurdle was to understand the stack, which is hard to follow at first
glance. Control is passed around via both conditional statements and exception
mechanisms. The thread messaging stack is also unusual. The API is
non-blocking - the thread must find another task if the outbound queue is full
or the inbound queue is empty. Instead of rejecting requests due to data
availability errors, I added a queuing system that catches the state of these
requests in a priority queue. This queue is then processed by idle threads (idle
because of IO interruptions) and retried at exponentially increasing intervals.
For example the first retry will happen in 2ms then in 4ms, 8ms, 16ms … 512ms,
1s, 1s, 1s. The retry interval is a configuration parameter. Following this
addition, operations are queued on the server, meaning that the user does not
have to deal with errors or attempt to do this operation again. This piece of
code processes priority queue:

```java
private boolean sendToOutQueue() {
  boolean useful = false;
   final long now = clock.getTicks();
   while (nextRerun.size() > 0) {
       Retry next = nextRerun.peek();
       if (next.getAttemptDetails().nextRunTimestamp <= now) {
           useful = true;
           Retry retry = nextRerun.poll();
           if (!sendToOutQueue(retry)) {
               nextRerun.add(retry);
               return true;
           }
       }
       else {
           // All reruns are in the future.
           return useful;
       }
   }
   return useful;
}
```

QuestDB’s team was very patient explaining the different bits of the HTTP stack
and guiding me to figure out how best to solve the multi writing problem. They
were also careful not to dampen my enthusiasm with the pull request feedback.
