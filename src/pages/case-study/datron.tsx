import clsx from "clsx"
import React from "react"

import Button from "@theme/Button"
import PageLayout from "@theme/PageLayout"

import caCss from "../../css/case-study/card.module.css"
import chCss from "../../css/case-study/chart.module.css"
import juCss from "../../css/case-study/jumbotron.module.css"
import ouCss from "../../css/case-study/outcome.module.css"
import seCss from "../../css/section.module.css"

const DATRON = () => {
  const title = "DATRON - high-volume time series for industrial sensor data"
  const description =
    "DATRON migrated from InfluxDB to QuestDB for high-throughput time series data workloads and benefited from reliability and massive performance improvements."

  return (
    <PageLayout
      canonical="/case-study/datron"
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
              href="https://datron.com/?utm_source=questdb"
              variant="plain"
            >
              <img
                alt="A CNC machine built by DATRON milling aluminium"
                className={juCss.jumbotron__logo}
                height={24}
                src="/img/pages/customers/logos/datron.png"
                width={124}
              />
            </Button>
            <span className={juCss.jumbotron__name}>Case study</span>
          </div>
          <h1 className={seCss.section__title}>DATRON migration to QuestDB</h1>
          <p
            className={clsx(
              seCss.section__subtitle,
              juCss.jumbotron__description,
            )}
          >
            DATRON migrated from InfluxDB to QuestDB to handle their data
            ingestion requirements and reduce costs.
          </p>
        </div>

        <div className={juCss.jumbotron__banner}>
          <img
            alt="DATRON.global background"
            height={251}
            src="/img/pages/case-study/datron/banner.jpg"
            width={1200}
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
            Low integration costs
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Workflow icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/workflow.svg"
            />
            Wide compatibility and simple configuration
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Leaf icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/leaf.svg"
            />
            Vibrant developer community
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Gauge icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/gauge.svg"
            />
            High ingestion rates - billions of measurements per day
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Voice icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/voice.svg"
            />
            Proactive support from the QuestDB team
          </p>
          <p className={ouCss.outcome}>
            <img
              alt="Time icon"
              className={ouCss.outcome__icon}
              src="/img/pages/case-study/icons/time.svg"
            />
            Quick migration from InfluxDB
          </p>
        </div>
      </section>

      <section className={clsx(seCss.section, caCss.card)}>
        <p className={caCss.card__title}>
          <span className={caCss.card__quote}>&ldquo;</span>DATRON builds
          high-speed industrial CNC machines which output high-frequency sensor
          data requiring massive ingestion rates at the data layer.
          <span className={caCss.card__quote}>&rdquo;</span>
        </p>

        <p className={caCss.card__subtitle}>
          In this case study, we summarize the experience of DATRON evaluating a
          database that can handle high-ingestion rates for operational
          integrity and showcase the improvements they saw.
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
          <h3>Why DATRON migrated from InfluxDB to QuestDB</h3>
          <p className="font-size--large">
            The CNC milling machines that DATRON builds must function reliably
            and continuously for decades. Medical applications and the aerospace
            sector require that the mechanical components are manufactured
            precisely each time with exceptionally low tolerances.
          </p>
          <p className="font-size--large">
            DATRON rigorously tests their installed assemblies in long-term
            studies over several months, which detect unusual vibrations, wear,
            and temperature deviations. The metrics collected are the
            environmental temperature alongside the machine&apos;s spindle RPM,
            while an accelerometer measures the spindle position in three axes.
            An Arduino polls the spindle sensors at a frequency in the two-digit
            kHz range, meaning that the testing phase generates multiple
            terabytes of data. Storing these measurements requires a stable,
            high-performance database that can write and query time series data
            efficiently.
          </p>
          <p className="font-size--large">
            Initially, DATRON was experimenting with InfluxDB as a datastore but
            immediately encountered problems ingesting high-throughput
            workloads. A recurring issue that surfaced was InfluxDB consuming
            too much system RAM and an inability to keep up with ingestion
            rates, causing frequent memory cache flushing. QuestDB was a capable
            drop-in replacement in this scenario and allowed DATRON to do more
            with less hardware.
          </p>

          <h3>Simplifying the integration</h3>
          <p className="font-size--large">
            DATRON use the QuestDB Docker image, which is a turnkey,
            out-of-the-box solution. Using ILP (InfluxDB line protocol), the
            data is inserted and read out via REST API to other software for
            analysis. Inserting and reading the information is possible with
            popular high-level protocols and little programming effort, a
            definite advantage over hand-crafted or bespoke solutions.
            <img
              alt="A diagram showing the architecture of how DATRON ingest and query sensor data."
              className={chCss.chart}
              height={347}
              src="/img/pages/case-study/datron/chart.png"
              width={500}
            />
          </p>

          <h3>Feedback from a thriving community</h3>
          <p className="font-size--large">
            The developer and community support means that questions get
            answered quicker, leading to faster integration and troubleshooting
            through shorter feedback loops. Using Slack as a communication tool
            is an additional convenience that bridges the gap between ideas and
            implementation and adds to the agility of the project to deliver a
            feature addition or bug fix.
          </p>
          <div
            className={clsx(
              "markdown",
              seCss["section--inner"],
              seCss["section--column"],
            )}
          >
            <p className={caCss.card__title}>
              <span className={caCss.card__quote}>&ldquo;</span>QuestDB offers
              new possibilities while reducing costs and simplifying data
              analysis at DATRON.
              <span className={caCss.card__quote}>&rdquo;</span>
            </p>
            <p className={caCss.card__title}>
              <b>Tim Borowski</b>
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default DATRON
