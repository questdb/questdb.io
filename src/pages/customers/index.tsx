import clsx from "clsx"
import DocusaurusHead from "@docusaurus/Head"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React from "react"

import Button from "@theme/Button"
import Layout from "@theme/Layout"
import { MetadataContextProvider } from "@theme/useMetadataContext"

import caCss from "../../css/customers/card.module.css"
import loCss from "../../css/customers/logo.module.css"
import juCss from "../../css/customers/jumbotron.module.css"
import quCss from "../../css/customers/quote.module.css"
import seCss from "../../css/section.module.css"

const Customers = () => {
  const title = "Customers"
  const description =
    "Discover how QuestDB is powering the core infrastructure of companies dealing with time-series data"
  const { siteConfig } = useDocusaurusContext()

  return (
    <MetadataContextProvider>
      <Layout description={description} title={title}>
        <DocusaurusHead>
          <link rel="canonical" href={`${siteConfig.url}get-questdb/`} />
          <meta name="description" content={description} />
        </DocusaurusHead>

        <section className={clsx(seCss.section, seCss["section--odd"])}>
          <div className={juCss.jumbotron}>
            <div className={juCss.jumbotron__left}>
              <h1 className={seCss.section__title}>Success Stories</h1>
              <p
                className={clsx(
                  seCss.section__subtitle,
                  juCss.jumbotron__subtitle,
                )}
              >
                Here we bring you a collection of stories highlighting how
                QuestDB is powering the core infrastructure of companies dealing
                with time-series data.
              </p>
            </div>
            <div className={juCss.jumbotron__illustration}>
              <img alt="Docker logo" src="/img/pages/customers/top.svg" />
            </div>
          </div>
        </section>

        <section className={clsx(seCss["section--inner"], loCss.logo)}>
          <Button
            className={loCss.logo__wrapper}
            href="https://toggle.global/?utm_source=questdb"
            variant="plain"
          >
            <img
              alt="Toggle.global logo"
              className={clsx(loCss.logo__image, loCss["logo__image--small"])}
              src="/img/pages/customers/logos/toggle.svg"
            />
          </Button>
          <Button
            className={loCss.logo__wrapper}
            href="https://www.ycombinator.com/"
            variant="plain"
          >
            <img
              alt="YCombinator logo"
              className={loCss.logo__image}
              src="/img/pages/customers/logos/yc.png"
            />
          </Button>
          <Button
            className={loCss.logo__wrapper}
            href="https://trysavvy.com/"
            variant="plain"
          >
            <img
              alt="Savvy logo"
              className={loCss.logo__image}
              src="/img/pages/customers/logos/savvy.png"
            />
          </Button>
          <Button
            className={loCss.logo__wrapper}
            href="http://7pc.co/"
            variant="plain"
          >
            <img
              alt="7pc logo"
              className={loCss.logo__image}
              src="/img/pages/customers/logos/7pc.png"
            />
          </Button>
          <Button
            className={loCss.logo__wrapper}
            href="https://www.episode1.com/"
            variant="plain"
          >
            <img
              alt="Episode 1 logo"
              className={loCss.logo__image}
              src="/img/pages/customers/logos/episode1.png"
            />
          </Button>
          <Button
            className={loCss.logo__wrapper}
            href="https://chainslayer.io/"
            variant="plain"
          >
            <img
              alt="Chainslayer logo"
              className={loCss.logo__image}
              src="/img/pages/customers/logos/chainslayer.png"
            />
          </Button>
          <Button
            className={loCss.logo__wrapper}
            href="https://www.kimaventures.com/"
            variant="plain"
          >
            <img
              alt="Kima logo"
              className={loCss.logo__image}
              src="/img/pages/customers/logos/kima.png"
            />
          </Button>
          <Button
            className={loCss.logo__wrapper}
            href="https://seedcamp.com/"
            variant="plain"
          >
            <img
              alt="Seedcamp logo"
              className={loCss.logo__image}
              src="/img/pages/customers/logos/seedcamp.png"
            />
          </Button>
        </section>

        <section className={clsx(seCss.section, seCss["section--inner"])}>
          <div className={caCss.card}>
            <p className={caCss.card__summary}>
              <img
                alt="Toggle.global logo"
                className={clsx(caCss.card__logo, caCss["card__logo--toggle"])}
                src="/img/pages/customers/logos/toggle.svg"
              />
              “We switched from InfluxDB to QuestDB to get queries that are on
              average 300x faster utilizing 1/4 of the hardware, without ever
              overtaxing our servers.”
              <em className={caCss.card__author}>
                - <strong>Armenak Mayalian</strong>, CTO
              </em>
              <Button className={caCss.card__cta} to="/case-study/toggle/">
                View full case study
              </Button>
            </p>
            <div className={caCss.card__illustration}>
              <img
                alt="Comparison of AI and chess to investing"
                src="/img/pages/case-study/toggle/summary.png"
              />
            </div>
          </div>
        </section>

        <section
          className={clsx(
            seCss.section,
            seCss["section--inner"],
            seCss["section--center"],
          )}
        >
          <div className={quCss.quote}>
            <Button
              className={quCss.quote__company}
              href="https://www.innova.com.tr/en"
              variant="plain"
            >
              <img
                alt="Innova logo"
                className={clsx(quCss.quote__logo, quCss["quote__logo--small"])}
                src="/img/pages/customers/logos/innova.png"
              />
            </Button>
            <p className={quCss.quote__text}>
              QuestDB allows us to query data while writing one million data
              points every 15 mins. It is an excellent database for time-based
              calculation of records with static columns and can store the data
              very efficiently. QuestDB’s community is constantly growing and
              the its popularity is on the rise.
            </p>
            <p>
              <strong>Erdem Aydemir</strong>
              <br />
              Software Engineer |<strong> Innova</strong>
            </p>
          </div>

          <div className={quCss.quote}>
            <Button
              className={quCss.quote__company}
              href="https://www.samtec.com/"
              variant="plain"
            >
              <img
                alt="Samtec logo"
                className={quCss.quote__logo}
                src="/img/pages/customers/logos/samtec.png"
              />
            </Button>
            <p className={quCss.quote__text}>
              QuestDB is the most promising open source platform for time series
              analytics. It&apos;s thoughtfully designed to be both wicked fast
              and easy to use.
            </p>
            <p>
              <strong>Nick Scolum</strong>
              <br />
              Senior Software Engineer |<strong>Samtec</strong>
            </p>
          </div>

          <div className={quCss.quote}>
            <Button
              className={quCss.quote__company}
              href="https://razorpay.com/"
              variant="plain"
            >
              <img
                alt="Razorpay logo"
                className={quCss.quote__logo}
                src="/img/pages/customers/logos/razorpay.svg"
              />
            </Button>
            <p className={quCss.quote__text}>
              I am honestly impressed by the database’s performance and
              simplicity - we are thinking of moving some of our real time
              workloads to QuestDB.
            </p>
            <p>
              <strong>Venkatesan Vaidhyanathan</strong>
              <br />
              Senior Technical Architect |<strong>Razorpay</strong>
            </p>
          </div>

          <div className={quCss.quote}>
            <Button
              className={quCss.quote__company}
              href="https://chainslayer.io/"
              variant="plain"
            >
              <img
                alt="ChainSlayer logo"
                className={quCss.quote__logo}
                src="/img/pages/customers/logos/chainslayer.png"
              />
            </Button>
            <p className={quCss.quote__text}>
              QuestDB is the cornerstone of our offering. The SQL interface with
              timeseries functions like ASOF join is brilliant. It’s speed and
              small footprint make it perfect for containerized environments.
              And the UI looks absolutely amazing.
            </p>
            <p>
              <strong>Tjerk Stroband</strong>
              <br />
              CTO |<strong>ChainSlayer</strong>
            </p>
          </div>

          <div className={quCss.quote}>
            <Button
              className={quCss.quote__company}
              href="https://www.forrs.de/"
              variant="plain"
            >
              <img
                alt="FORRS logo"
                className={clsx(loCss.logo__image, loCss["logo__image--small"])}
                src="/img/pages/customers/logos/forrs.svg"
              />
            </Button>
            <p className={quCss.quote__text}>
              Working with QuestDB is a breeze. This innovative time-series
              database excels with integration into existing environments.
              Supporting multiple open interfaces, such REST and the PG wire
              protocol, while not relying on any client driver, makes it easy to
              work with the OS and language of choice.
            </p>
            <p>
              <strong>Marc Recht</strong>
              <br />
              CTO |<strong>FORRS Partners</strong>
            </p>
          </div>
        </section>
      </Layout>
    </MetadataContextProvider>
  )
}

export default Customers
