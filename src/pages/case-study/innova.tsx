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
                height={15}
                src="/img/pages/customers/logos/innova.png"
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
            requires writing millions of records every few minutes while
            querying a constantly changing data set for real-time analytics.
          </p>
        </div>

        <div className={juCss.jumbotron__banner}>
          <img
            alt="Innova background"
            height={370}
            src="/img/pages/case-study/innova/social.jpg"
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
          infrastructure, security, and network operators. Their services
          include real-time analytics of network information for the largest
          Telecommunications provider in Turkey.
          <span className={caCss.card__quote}>&rdquo;</span>
        </p>

        <p className={caCss.card__subtitle}>
          In this case study, we summarize Innova’s migration experience from
          and the improvements the migration brought.
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
          <h3>Why we migrated to QuestDB</h3>
          <p className="font-size--large">
            We found QuestDB because we have requirements to store and analyze
            massive amounts of data, and our customers need to have this
            available quickly. The data we collect makes sense when our
            customers see changes over time, so we looked for a database that
            can display this information in a timeline as fast as possible, and
            we found QuestDB.
          </p>
          <p className="font-size--large">
            Our client is one of the largest telecommunications providers in
            Turkey, serving internet connections to over 5 million customers.
            Infrastructure at this scale uses massive amounts of resources and
            generates a tremendous volume of data. We use operational data from
            this provider to show our customers information about their own
            internet connections, such as the quality of service, download
            speed, upload speed, bandwidth, and more.
          </p>

          <h3>How we collect and analyze big data with QuestDB</h3>
          <p className="font-size--large">
            We store the bandwidth data of devices in Fiber To The Home (FTTH)
            topology from collectors which run on hourly intervals. These
            collector jobs contain time series for each device in JSON format
            and based on this metadata, we produce visualizations for our
            customers to have insights into their network quality. For a
            customer, this means that they have access to charts, tables, and
            line graphs so they can see the state of their connectivity for the
            last 30 days.
          </p>
          <img
            alt="Chart showing the average transaction duration for QuestDB on a given day"
            className={chCss.chart}
            height={433}
            src="/img/pages/case-study/innova/chart.png"
            width={791}
          />
          <h3>Why we use a time series database for big data</h3>
          <p className="font-size--large">
            Our original stack relied on MongoDB to store connectivity
            information, which was convenient, but in practice, it was very
            dependent on physical resources and required larger hardware that we
            were happy with. Moreover, as data sets grew in MongoDB, query
            speeds degraded below what we saw as acceptable for our customers.
          </p>
          <p className="font-size--large">
            For communicating with QuestDB, we use the Docker deploy for running
            instances, and we query data via REST API to generate charts and
            insights. On average, we are writing about 40 million records per
            day while performing calculations on this changing data set.
            Usually, we will keep 30 days of data in QuestDB and delete older
            partitions when they become less useful for actionable insights.
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
              us to query data while writing millions of data points every few
              minutes. It is an excellent database for time-based calculation of
              records with static columns and can store the data very
              efficiently. QuestDB’s community is constantly growing and its
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
