import clsx from "clsx"
import React from "react"

import Button from "@theme/Button"
import PageLayout from "@theme/PageLayout"

import caCss from "../../css/case-study/card.module.css"
import chCss from "../../css/case-study/chart.module.css"
import juCss from "../../css/case-study/jumbotron.module.css"
import ouCss from "../../css/case-study/outcome.module.css"
import seCss from "../../css/section.module.css"

const Toggle = () => {
  const title = "Case Study: Toggle AI"
  const description =
    "How Toggle switched from InfluxDB to QuestDB and benefited from massive cost reduction + performance improvements"

  return (
    <PageLayout
      canonical="/case-study/toggle"
      description={description}
      title={title}
    >
      <section
        className={clsx(
          seCss.section,
          seCss["section--center"],
          juCss.jumbotron,
        )}
      >
        <div className={juCss.jumbotron__summary}>
          <div className={juCss.jumbotron__header}>
            <Button
              href="https://toggle.global/?utm_source=questdb"
              variant="plain"
            >
              <img
                alt="Toggle.global logo"
                className={juCss.jumbotron__logo}
                height={15}
                src="/img/pages/customers/logos/toggle.svg"
                width={100}
              />
            </Button>
            <span className={juCss.jumbotron__name}>Case study</span>
          </div>
          <h1 className={seCss.section__title}>Migrating to QuestDB</h1>
          <p
            className={clsx(
              seCss.section__subtitle,
              juCss.jumbotron__description,
            )}
          >
            Toggle switched from InfluxDB to QuestDB, leading to massive cost
            reduction and performance improvements.
          </p>
        </div>

        <div className={juCss.jumbotron__banner}>
          <img
            alt="Toggle.global background"
            height={370}
            src="/img/pages/case-study/toggle/banner.png"
            width={1110}
          />
        </div>
      </section>

      <section className={clsx(seCss.section, seCss["section--odd"])}>
        <div className={clsx(seCss["section--inner"], ouCss.outcome__wrapper)}>
          <p className={ouCss.outcome}>
            <img
              alt="Dollar icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/dollar.svg"
            />
            Direct cost reduction (¼ of the machines)
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Workflow icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/workflow.svg"
            />
            Script to read from one side & ingest in the other
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Leaf icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/leaf.svg"
            />
            Machines never overtaxed
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Gauge icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/gauge.svg"
            />
            Queries are &gt;300x faster
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Voice icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/voice.svg"
            />
            Proactive customer support
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Time icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/time.svg"
            />
            Imported 600 million data points in a few minutes
          </p>
        </div>
      </section>

      <section className={clsx(seCss.section, caCss.card)}>
        <p className={caCss.card__title}>
          <span className={caCss.card__quote}>&ldquo;</span>TOGGLE is a SaaS
          company building state-of-the-art AI technology to help investors turn
          Big Data into investment insights.
          <span className={caCss.card__quote}>&rdquo;</span>
        </p>

        <p className={caCss.card__subtitle}>
          In this case study, Toggle’s CTO, Armenak, summarises the migration
          experience and goes through the improvements they saw.
        </p>
      </section>

      <section className={seCss.section}>
        <div
          className={clsx(
            "markdown",
            seCss["section--inner"],
            seCss["section--column"],
          )}
        >
          <h3>Description of Toggle use case with QuestDB</h3>
          <p className="font-size--large">
            Toggle uses AI & Machine Learning to help investors extract insights
            on their portfolio & investments. The system distills billions of
            data points into alerts like “Analyst expectations are turning
            negative for AAPL, historically this led to stock’s outperformance.”
            As you can imagine, this sort of system requires a tremendous amount
            of timeseries data — prices, fundamentals, sentiment, etc. All of
            this data is stored as series and needs to be easily accessible for
            analysis by our models. It is critical that every step in the
            process is optimized.
          </p>

          <h3>Improvements versus InfluxDB</h3>
          <p className="font-size--large">
            Toggle utilized many databases, including Mongo, Cassandra, and
            TimescaleDB. After much testing, they settled on InfluxDB, as it had
            the best performance. That said, as the company was growing,
            performance started to degrade and it became expensive to run. After
            a short time, they had a small cluster of 4 x m4.2xlarge machines,
            and memory on all 4 was often at least 80%, hitting 100% a few times
            per week. Modeling out the future infrastructure spend based on this
            baseline, InfluxDB wasn’t a viable option as the company scaled.
          </p>

          <h3>Process to migrate data from InfluxDB to QuestDB</h3>
          <p className="font-size--large">
            When evaluating a new solution, Toggle knew that they had to answer
            the following questions:
          </p>

          <ul className="font-size--large">
            <li>Can we move the data seamlessly and in a timely manner?</li>
            <li>
              Can we query a sample of our data in at least the same response
              times of influx?
            </li>
            <li>Can we ingest new data seamlessly?</li>
            <li>Can we create time series on the fly?</li>
            <li>
              Can we maintain the performance that we have today after we’ve
              imported all of our data?
            </li>
          </ul>
          <p className="font-size--large">
            Of all the possible solutions evaluated, QuestDB was the only that
            met all of our criteria.
          </p>

          <h3>A side by side comparison of QuestDB vs InfluxDB</h3>
          <ul className="font-size--large">
            <li>
              InfluxDB on a cluster of 4 x m4.2xlarge with 128GiB of RAM was
              averaging a response time of over 5s
              <img
                alt="Chart showing the average transaction duration for InfluxDB over 2 days"
                className={chCss.chart}
                height={338}
                src="/img/pages/case-study/toggle/influxdb.png"
                width={792}
              />
            </li>
            <li>
              After a few weeks with QuestDB in production (still with a single
              machine), the performance averaged 15ms
              <img
                alt="Chart showing the average transaction duration for QuestDB over 2 days"
                className={chCss.chart}
                height={338}
                src="/img/pages/case-study/toggle/questdb.png"
                width={791}
              />
            </li>
            <li>
              When looking at the virtual machine’s statistics, it never seems
              to be overtaxed (User: 17%, system: 4%)
            </li>
          </ul>

          <p className="font-size--large">
            Direct cost reduction (¼ of the machines) and performance
            improvements means that Toggle can do much more for less.
          </p>
          <p className="font-size--large">
            The actual data migration was easy with a script to read from one
            side & ingest in the other. Toggle imported over 600 million data
            points in a few minutes.
          </p>

          <h3>
            Customer support experience from QuestDB’s team during the process
          </h3>
          <p className="font-size--large">
            Armenak, Toggle&apos;s CTO: The QuestDB team assisted us in all
            steps along the way. They were proactive in supporting our
            changeover, helping to debug issues as they arose and optimize our
            deployment as we moved things into production.
          </p>
        </div>
      </section>
    </PageLayout>
  )
}

export default Toggle
