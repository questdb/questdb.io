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
  const title = "Toggle AI - time series data for machine learning in FinTech"
  const description =
    "Toggle switched from InfluxDB to QuestDB and benefited from faster queries, massive cost reduction, and performance improvements on ingestion."

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
          <h1 className={seCss.section__title}>Toggle migration to QuestDB</h1>
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
          In this case study, we summarize Toggle’s migration experience from
          InfluxDB to QuestDB and the improvements the migration brought.
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
            negative for AAPL; historically, this led to outperformance of the
            stock.” As you can imagine, this sort of system requires a
            tremendous amount of timeseries data — prices, fundamentals,
            sentiment, etc. All of this data is stored as a series and needs to
            be easily accessible for analysis by our models. It is critical that
            every step in the process is optimized.
          </p>

          <h3>Improvements over InfluxDB</h3>
          <p className="font-size--large">
            Toggle utilized many databases, including Mongo, Cassandra, and
            TimescaleDB. After much testing, they settled on InfluxDB, as it had
            the best performance. As the company was growing, performance
            started to degrade, and it became expensive to run. They had a small
            cluster of 4 x m4.2xlarge machines, and memory on all 4 was often at
            least 80%, hitting 100% a few times per week. Modeling out the
            future infrastructure spend based on this baseline, InfluxDB wasn’t
            a viable option as the company scaled.
          </p>

          <h3>The process to migrate data from InfluxDB to QuestDB</h3>
          <p className="font-size--large">
            When evaluating a new solution, Toggle knew that they had to answer
            the following questions:
          </p>

          <ul className="font-size--large">
            <li>Can we move the data seamlessly and promptly?</li>
            <li>
              Can we query a sample of our data with at least the response times
              of InfluxDB?
            </li>
            <li>Can we ingest new data seamlessly?</li>
            <li>Can we create time series on the fly?</li>
            <li>
              Can we maintain the performance that we have today after we’ve
              imported all of our data?
            </li>
          </ul>
          <p className="font-size--large">
            Of all the possible solutions evaluated, QuestDB was the only one
            that met all of our criteria.
          </p>

          <h3>A side by side comparison of QuestDB vs. InfluxDB</h3>
          <ul className="font-size--large">
            <li>
              InfluxDB on a cluster of 4 machines (m4.2xlarge with 128GiB of
              RAM) was averaging a response time of over 5 seconds.
            </li>
            <li>
              After a few weeks with QuestDB in production (still with a single
              machine), the performance averaged 15 milliseconds, i.e., more
              than 300x faster queries.
              <img
                alt="Chart showing the average transaction duration for QuestDB on a given day"
                className={chCss.chart}
                height={433}
                src="/img/pages/case-study/toggle/chart.png"
                width={791}
              />
            </li>
            <li>
              The virtual machine’s stats indicated that the servers were never
              overtaxed (user: 17%, system: 4%).
            </li>
            <li>
              Direct cost reduction (¼ of the machines) and performance
              improvements meant that Toggle could do much more for less.
            </li>
          </ul>

          <p className="font-size--large">
            The actual data migration was easy with a script to read from one
            side & ingest in the other. Toggle imported over 600 million data
            points in a few minutes.
          </p>
          <div
            className={clsx(
              "markdown",
              seCss["section--inner"],
              seCss["section--column"],
            )}
          >
            <p className={caCss.card__title}>
              <span className={caCss.card__quote}>&ldquo;</span>The QuestDB team
              assisted us in all steps along the way. They were proactive in
              supporting our changeover, helping to debug issues as they arose,
              and optimize our deployment as we moved things into production.
              <span className={caCss.card__quote}>&rdquo;</span>
            </p>
            <p className={caCss.card__title}>
              <b>Armenak, Toggle&apos;s CTO</b>
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default Toggle
