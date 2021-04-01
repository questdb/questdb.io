---
title: The art of thread messaging
author: Vlad Ilyushchenko
author_title: QuestDB Team
author_url: https://github.com/bluestreak01
author_image_url: https://avatars.githubusercontent.com/bluestreak01
description:
  Detailed explanation of QuestDB's thread messaging system. A benchmark also
  shows the capabilities of this system.
keywords:
  - deep-dive
  - inter-thread messaging
  - questdb
  - database
  - infrastructure
tags: [deep-dive]
---

import Banner from "@theme/Banner"

<Banner
  alt="Flock of birds flying in a harmonised way"
  height={360}
  src="/img/blog/2020-03-15/header.png"
  width={650}
/>

Inter-thread messaging is a fundamental part of any asynchronous system. It is
the component responsible for the transportation of data between threads.
Messaging forms the infrastructure, scaffolding multi-threaded applications, and
just like real-world transport infrastructure, we want it to be inexpensive,
fast, reliable, and clean. For QuestDB, we wrote our own messaging system, and
this post is about how it works and how fast it is.

<!--truncate-->

## Architecture

Borrowing heavily from world-famous Disruptor our messaging revolves around
multiple threads accessing shared circular data structure. We call it RingQueue.
Semantically RingQueue provides unbounded, index-based, random access to its
elements. It does not coordinate concurrent access nor does it provide
guarantees on thread safety. Coordination and thread-safety is a concern of
Sequences. Sequences are responsible for providing indices that can be used to
access RingQueue concurrently and safely.

To help sequences do their magic they have to be shaped into a graph. We start
with syntax to chain sequences together:

`a.then(b).then(c).then(d)`

The result is a trivial sequence graph:

`a -> b -> c -> d`

To branch we use helper class FanOut:

`a.then(FanOut.to(b).and(c)).then(d)`

The result is this sequence graph:

```shell
     +--> B -->+
A -->|         |--> D
     +--> C -->+
```

These two pieces of syntax are flexible enough to create any desired flow. This
example shows that FanOut can have chain of sequences and other FanOuts:

`a.then(FanOut.to(FanOut.to(b).and(c)).and(d.then(e)).then(f)`

It is quite a mouthful but it creates this nice little graph:

```shell
        +--> B -->+
    +-> |         |
    |   +--> C -->+
A-->|             |--> F
    |             |
    +-> D -> E -->+
```

FanOut can also be used as a placeholder in a chain to allow threads to
subscribe/unsubscribe on the fly. Dynamic subscription is then simply adding a
new sequence to FanOut:

```java
// You can add as many sequences into fan out as you like.
// Sequences can be added either up front or subscribe/unsubscribe on the fly.
FanOut fanOut = new FanOut();

// ordinary producer sequence
Sequence seqProducer = new SPSequence(queue.getCapacity());
// daisy chain producer and fan out and loop back producer
seqProducer.then(fanOut).then(seqProducer);

// meanwhile in another thread ....
...

// Add individual consumer sequences later as needed.
// This is thread safe non-blocking operation that can be performed from any thread.
// It is important to use current producer position as consumer starting point when subscribing on the fly.
Sequence consumer1 = fanOut.addAndGet(new SCSequence(seqProducer.current()));

// do something useful with consumer1 sequence
...

// remove sequence from fanOut to unsubscribe
fanOut.remove(consumer1);
```

Typical graph must contain single producer sequence and one or more consumer
sequences. It will also have to be circular, e.g. to start and end with producer
sequence. Graph has to be circular because we use circular underlying data
structure, RingQueue. Without loop-back producer would be liable to overwrite
queue elements before consumers had a chance to read them. Worse still, queue
elements can be written to and read from concurrently. We don't want that to
happen, right?

To help create practical sequence graph we implemented 4 types of sequences we
can play with. These sequences are better understood as combination of their
types and properties. SP - single producer, MP - multiple producer, SC - single
consumer and MC - multiple consumer. Multi- sequences allow concurrent access
and they guarantee that no two threads can retrieve same index. It is this
property adds extra fun dimension to sequence graphs. Consider this graph:

`A -> B -> A`

or in Java notations:

`A.then(B).then(A)`

When "B" is an instance of MCSequence() we have a self-balancing worker pool.
When "A" is MPSequence(), we have many-to-many pub-sub system. Cool, eh?

Single- sequences are faster but they are not thread-safe. They should be
preferred for single-threaded consumer models.

Lets take a look at how threads interact with sequences. This is a typical
example of publisher:

```java
// loop until there is work to do
// consumer thread may be able to rely on producer to
// publish "special" message to indicate end of stream.
while (true) {

  // Non-blocking call. Method returns immediately either with zero-based
  // ring queue index or negative long indicating one of following:
  // -1 = queue is empty
  // -2 = there was a contest for queue index and this thread has lost
  long cursor = sequence.next();
  if (cursor < 0) {
    // negative cursor is an error
    // thread has a choice of things to do:
    // - busy spin
    // - yield/park
    // - work on something else
    LockSupport.parkNanos(1);
    continue;
  }

  // write to queue
  try {
    queue.get(cursor).value;
  } finally {
    // releasing cursor promptly is important
    sequence.done(cursor);
  }
}

```

`Sequence.next()` return values are:

-1 Queue is unavailable. It is either full or empty, depending on whether it is
producer or consumer sequence

-2 Temporary race condition. Sequence failed CAS and delegated decision to your
application.

Consumer sequence interaction is almost identical. The only difference would be
consumer reading queue item instead of writing it.

Performance of single-threaded sequences can benefit further from batching.
Batching relies on receiving range of indices from sequence and calling done()
at end of batch rather than for every queue item. This is what consumer code
might look like (producer code is the same):

```java
while (running) {
  long cursor = sequence.next();

  if (cursor < 0) {
    LockSupport.parkNanos(1);
    continue;
  }

  // get max index sequence can reach
  long available = sequence.available();

  // look thru queue elements without using sequence
  while (cursor < available) {
    queue.get(cursor++);
  }

  // calling done() only once per batch can yield significant performance benefit
  sequence.done(available - 1);
}
```

Multi-threaded sequence do not support batches.

## Performance

I used Shipilev's project that already had Disruptor benchmark and I added
QuestDB implementation of the same pipeline.

Benchmark source on [GitHub](https://github.com/bluestreak01/disrupting-fjp)

**2 CPU MBP 2015**

```shell
Benchmark          (slicesK)  (threads)  (workMult)  Mode  Cnt    Score    Error  Units
Disruptor.run            500          2          10    ss   50   10.043 ±  0.158  ms/op
Disruptor.run           1000          2          10    ss   50   19.944 ±  0.285  ms/op
Disruptor.run           5000          2          10    ss   50  133.082 ±  6.032  ms/op
QuestdbFanOut.run        500          2          10    ss   50   13.027 ±  0.180  ms/op
QuestdbFanOut.run       1000          2          10    ss   50   26.329 ±  0.327  ms/op
QuestdbFanOut.run       5000          2          10    ss   50  141.686 ±  4.129  ms/op
QuestdbWorker.run        500          2          10    ss   50   29.470 ±  0.976  ms/op
QuestdbWorker.run       1000          2          10    ss   50   62.205 ±  3.278  ms/op
QuestdbWorker.run       5000          2          10    ss   50  321.697 ± 12.031  ms/op
```

**4 CPU x5960 @ 4.2Ghz**

```shell
Benchmark          (slicesK)  (threads)  (workMult)  Mode  Cnt    Score    Error  Units
Disruptor.run            500          4          10    ss   50    6.892 ±  0.654  ms/op
Disruptor.run           1000          4          10    ss   50   10.143 ±  0.623  ms/op
Disruptor.run           5000          4          10    ss   50   54.084 ±  4.164  ms/op
QuestdbFanOut.run        500          4          10    ss   50    6.364 ±  0.197  ms/op
QuestdbFanOut.run       1000          4          10    ss   50   11.454 ±  0.754  ms/op
QuestdbFanOut.run       5000          4          10    ss   50   50.928 ±  3.264  ms/op
QuestdbWorker.run        500          4          10    ss   50   14.240 ±  1.341  ms/op
QuestdbWorker.run       1000          4          10    ss   50   27.246 ±  2.777  ms/op
QuestdbWorker.run       5000          4          10    ss   50  142.207 ± 15.157  ms/op
```

Disruptor and QuestDB perform essentially the same.

## How to get it

Our messaging system is on Maven central as a part of QuestDB. Don't worry about
package size though, QuestDB jar is around 3.6MB and has no dependencies. Jump
to the [GitHub release page]({@githubUrl@}/releases) for version reference.
