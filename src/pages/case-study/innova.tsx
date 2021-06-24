import clsx from "clsx"
import React from "react"

import Button from "@theme/Button"
import PageLayout from "@theme/PageLayout"

import caCss from "../../css/case-study/card.module.css"
import chCss from "../../css/case-study/chart.module.css"
import juCss from "../../css/case-study/jumbotron.module.css"
import ouCss from "../../css/case-study/outcome.module.css"
import seCss from "../../css/section.module.css"

const Innova = () => {
  const title =
    "Innova uses QuestDB for the big data requirements of Telecommunications providers"
  const description =
    "Innova migrated their big data workloads to QuestDB to provide insights on millions of data points to their customers in real-time."

  return (
    <PageLayout
      canonical="/case-study/innova"
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
              href="https://www.innova.com.tr/en?utm_source=questdb"
              variant="plain"
            >
              <img
                alt="Innova logo"
                className={juCss.jumbotron__logo}
                height={30}
                src="/img/pages/customers/logos/innova.svg"
                width={100}
              />
            </Button>
            <span className={juCss.jumbotron__name}>Case study</span>
          </div>
          <h1 className={seCss.section__title}>Innova migrated to QuestDB</h1>
          <p
            className={clsx(
              seCss.section__subtitle,
              juCss.jumbotron__description,
            )}
          >
            Innova chose QuestDB as part of their big data solution, which
            requires writing millions of records while querying a constantly
            changing data set for real-time analytics.
          </p>
        </div>

        <div className={juCss.jumbotron__banner}>
          <img
            alt="Innova background"
            height={400}
            src="/img/pages/case-study/innova/illustration.png"
            width={600}
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
            Lower operational costs
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Workflow icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/workflow.svg"
            />
            Simple setup and maintenance using QuestDB Docker image
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Leaf icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/leaf.svg"
            />
            Integrations with existing tools using the REST API
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Gauge icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/gauge.svg"
            />
            Real-time results despite massive throughput
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Voice icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/voice.svg"
            />
            Reactive support from QuestDB engineering
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Time icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/time.svg"
            />
            Reliable and fast query times for insights
          </p>
        </div>
      </section>

      <section className={clsx(seCss.section, caCss.card)}>
        <p className={caCss.card__title}>
          <span className={caCss.card__quote}>&ldquo;</span>Innova develops big
          data solutions for financial transactions, BI systems, IT
          infrastructure, security, and network operators. Our services include
          real-time analytics of the network infrastructure of the largest
          Telecommunications provider in Turkey.
          <span className={caCss.card__quote}>&rdquo;</span>
        </p>

        <p className={caCss.card__subtitle}>
          In this case study, we summarize why Innova chose QuestDB, their
          migration experience, and the improvements they gained in query speed,
          maintainability, and compatibility.
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
          <h3>Why Innova migrated to QuestDB</h3>
          <p className="font-size--large">
            Innova found QuestDB because of its requirements to store and
            analyze massive amounts of data that needs to be served to their
            customers quickly. The data Innova collects needs to be presented to
            customers so that it’s easy to understand changes over time. The
            search for a database that can display this kind of information in a
            timeline as fast as possible led to QuestDB.
          </p>
          <p className="font-size--large">
            Innova’s client is one of the largest telecommunications providers
            in Turkey, serving internet connections to over 5 million customers.
            Infrastructure at this scale uses massive amounts of resources and
            generates a tremendous volume of data. Innova uses operational data
            from this provider to show their customers information about their
            own internet connections, such as the quality of service, download
            speed, upload speed, bandwidth, and more.
          </p>

          <h3>How Innova collect and analyze big data with QuestDB</h3>
          <p className="font-size--large">
            Innova store the bandwidth data of devices in Fiber To The Home
            (FTTH) topology from collectors, which run on hourly intervals.
            These collector jobs contain time series for each device in JSON
            format and based on this metadata, Innova produce visualizations for
            their customers to have insights into their network quality. For a
            customer, this means that they have access to charts, tables, and
            line graphs so they can see the state of their connectivity for the
            last 30 days.
          </p>
          <img
            alt="Chart showing the average transaction duration for QuestDB on a given day"
            className={chCss.chart}
            height={519}
            src="/img/pages/case-study/innova/chart.png"
            width={842}
          />
          <h3>Why Innova use a time series database for big data</h3>
          <p className="font-size--large">
            The original stack built by Innova relied on MongoDB to store
            connectivity information, which was convenient at first. However, it
            soon became apparent that MongoDB was tightly dependent on physical
            resources and required more powerful hardware that they were happy
            with allocating. Moreover, as data sets grew in MongoDB, query
            speeds degraded below what was acceptable for their customers.
          </p>
          <p className="font-size--large">
            For communicating with QuestDB, Innova uses the QuestDB Docker image
            for running production instances and the REST API to query data for
            charts and insights. On average, Innova is writing hundreds of
            millions of records per day while performing calculations on an
            ever-changing data set. Usually, Innova will keep 30 days of data in
            QuestDB and delete older partitions when they become less useful for
            actionable insights.
          </p>
          <div
            className={clsx(
              "markdown",
              seCss["section--inner"],
              seCss["section--column"],
            )}
          >
            <p className={caCss.card__title}>
              <span className={caCss.card__quote}>&ldquo;</span>QuestDB allows
              us to query data while writing millions of records. It is an
              excellent database for time series analysis and can efficiently
              store our data. QuestDB’s community is constantly growing and its
              popularity is on the rise.
              <span className={caCss.card__quote}>&rdquo;</span>
            </p>
            <p className={caCss.card__title}>
              <b>Erdem Aydemir, Innova</b>
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default Innova
