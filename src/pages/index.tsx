import clsx from "clsx"
import DocusaurusHead from "@docusaurus/Head"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React, { useCallback, useEffect, useState } from "react"

import CodeBlock from "@theme/CodeBlock"
import Layout from "@theme/Layout"

import Button from "@theme/Button"
import { MetadataContextProvider } from "@theme/useMetadataContext"
import useWindowWidth from "@theme/useWindowWidth"

import cardsStyles from "../css/cards.module.css"
import consoleStyles from "../css/console.module.css"
import featureStyles from "../css/feature.module.css"
import jumbotronStyles from "../css/jumbotron.module.css"
import queryScrollerStyles from "../css/queryScroller.module.css"
import sectionStyles from "../css/section.module.css"
import seenOnStyles from "../css/seenOn.module.css"
import whyStyles from "../css/why.module.css"

const Why = () => {
  const [opened, setOpened] = useState<"digital" | "realtime" | "integration">(
    "digital",
  )
  const handleClickIs = useCallback(() => {
    setOpened("digital")
  }, [])
  const handleClickGoodFor = useCallback(() => {
    setOpened("realtime")
  }, [])
  const handleClickIsNot = useCallback(() => {
    setOpened("integration")
  }, [])

  return (
    <section
      className={clsx(sectionStyles.section, sectionStyles["section--odd"])}
    >
      <div className={clsx(sectionStyles["section--inner"], whyStyles.why)}>
        <h2
          className={clsx(
            sectionStyles.section__title,
            whyStyles.why__title,
            "text--center",
          )}
        >
          Why QuestDB?
        </h2>

        <div className={whyStyles.why__footer}>
          <div className={whyStyles.why__menu}>
            <Button
              className={whyStyles["why__menu--item"]}
              onClick={handleClickIs}
              size="small"
              variant={opened === "digital" ? "primary" : "tertiary"}
            >
              Digital transformation
            </Button>
            <Button
              className={whyStyles["why__menu--item"]}
              onClick={handleClickGoodFor}
              size="small"
              variant={opened === "realtime" ? "primary" : "tertiary"}
            >
              Real-time insights
            </Button>
            <Button
              className={whyStyles["why__menu--item"]}
              onClick={handleClickIsNot}
              size="small"
              variant={opened === "integration" ? "primary" : "tertiary"}
            >
              Enterprise integration
            </Button>
          </div>

          <div className={whyStyles.why__content}>
            <div
              className={clsx(whyStyles.why__toggle, {
                [whyStyles["why__toggle--active"]]: opened === "digital",
              })}
            >
              <p className={whyStyles.why__item}>Reduce hardware costs</p>
              <p className={whyStyles.why__item}>
                Contain operational complexity
              </p>
              <p className={whyStyles.why__item}>Decrease development costs</p>
              <p className={whyStyles.why__item}>
                Cloud native (AWS, Azure, GCP)
              </p>
              <p className={whyStyles.why__item}>On premises or embedded</p>
            </div>

            <div
              className={clsx(whyStyles.why__toggle, {
                [whyStyles["why__toggle--active"]]: opened === "realtime",
              })}
            >
              <p className={whyStyles.why__item}>Streaming</p>
              <p className={whyStyles.why__item}>
                Operational analytics / OLAP
              </p>
              <p className={whyStyles.why__item}>
                Monitoring and observability
              </p>
              <p className={whyStyles.why__item}>Predictive analytics</p>
            </div>

            <div
              className={clsx(whyStyles.why__toggle, {
                [whyStyles["why__toggle--active"]]: opened === "integration",
              })}
            >
              <p className={whyStyles.why__item}>Active directory</p>
              <p className={whyStyles.why__item}>
                High performance replication
              </p>
              <p className={whyStyles.why__item}>High availability</p>
              <p className={whyStyles.why__item}>Clustering</p>
              <p className={whyStyles.why__item}>Enterprise security</p>
              <p className={whyStyles.why__item}>Postgres compatible/API</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const SeenOn = () => (
  <section
    className={clsx(
      sectionStyles.section,
      sectionStyles["section--inner"],
      seenOnStyles.section,
    )}
  >
    <a
      className={seenOnStyles["product-hunt"]}
      href="https://www.producthunt.com/posts/questdb?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-questdb"
      rel="noopener noreferrer"
      target="_blank"
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=224674&theme=dark&period=daily"
        alt="QuestDB - Fastest open source database for time-series and analytics | Product Hunt Embed"
        width="250px"
        height="54px"
      />
    </a>
  </section>
)

const Jumbotron = () => {
  const { siteConfig } = useDocusaurusContext()

  return (
    <section
      className={clsx(
        sectionStyles["section--inner"],
        jumbotronStyles.jumbotron,
      )}
    >
      <div className={jumbotronStyles.jumbotron__left}>
        <h1 className={clsx("jumbotron", jumbotronStyles.jumbotron__title)}>
          Fast SQL for time series
        </h1>
        <p className={clsx("jumbotron", jumbotronStyles.jumbotron__subtitle)}>
          {siteConfig.tagline}
        </p>
        <div className={jumbotronStyles.jumbotron__cta}>
          <Button
            className={jumbotronStyles.jumbotron__link}
            href={`http://try.${siteConfig.customFields.domain}:9000`}
          >
            Live Demo
          </Button>
          <Button
            className={clsx(
              jumbotronStyles.jumbotron__link,
              jumbotronStyles["jumbotron__cta--github"],
            )}
            href={siteConfig.customFields.githubUrl}
            icon={
              <img
                alt="GitHub logo"
                height="26"
                src="/img/github.svg"
                title="GitHub"
                width="26"
              />
            }
            variant="secondary"
          >
            GitHub
          </Button>
        </div>
        <p className={jumbotronStyles.jumbotron__description}>
          Query our demo dataset with 1.6 billion rows in milliseconds
        </p>
      </div>

      <div className={jumbotronStyles.jumbotron__right}>
        <pre className={jumbotronStyles.jumbotron__docker}>
          <code>
            {`docker pull questdb/questdb
docker run -p 9000:9000 questdb/questdb`}
          </code>
          <a
            href={siteConfig.customFields.dockerUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt="Docker logo"
              className={jumbotronStyles["jumbotron__docker-icon"]}
              src="/img/pages/index/docker.svg"
              title="Docker"
              width="60"
            />
          </a>
        </pre>
      </div>
    </section>
  )
}

const Feature = () => (
  <section
    className={clsx(sectionStyles.section, sectionStyles["section--odd"])}
  >
    <div className={sectionStyles["section--inner"]}>
      <div className={featureStyles.feature}>
        <img
          alt="Speedometer"
          className={featureStyles.feature__illustration}
          src="/img/pages/index/rawPower.svg"
        />

        <h2 className={featureStyles.feature__title}>Built for performance</h2>

        <p className={featureStyles.feature__description}>
          SIMD optimised analytics
        </p>
        <p className={featureStyles.feature__description}>
          Rows and columns based access
        </p>
        <p className={featureStyles.feature__description}>
          Vectorized queries execution
        </p>
        <p className={featureStyles.feature__description}>
          Tiny memory footprint
        </p>
        <p className={featureStyles.feature__description}>
          C++ and zero-GC Java
        </p>
      </div>

      <div className={featureStyles.feature}>
        <img
          alt="A code editor with a chart that shows the result of the query"
          className={featureStyles.feature__illustration}
          src="/img/pages/index/easyToUse.svg"
        />

        <h2 className={featureStyles.feature__title}>
          Optimized for time series
        </h2>

        <p className={featureStyles.feature__description}>
          Relational model for time series
        </p>
        <p className={featureStyles.feature__description}>
          Data stored in chronological order
        </p>
        <p className={featureStyles.feature__description}>Time partitioned</p>
        <p className={featureStyles.feature__description}>Scalable ingestion</p>
        <p className={featureStyles.feature__description}>
          Immediate consistency
        </p>
        <p className={featureStyles.feature__description}>
          Fast InfluxDB line protocol
        </p>
      </div>

      <div className={featureStyles.feature}>
        <img
          alt="A code editor containing a SQL statement"
          className={featureStyles.feature__illustration}
          src="/img/pages/index/featureRich.svg"
        />

        <h2 className={featureStyles.feature__title}>Implemented with SQL</h2>

        <p className={featureStyles.feature__description}>
          Time series and relational joins
        </p>
        <p className={featureStyles.feature__description}>
          Postgres wire support
        </p>
        <p className={featureStyles.feature__description}>
          Aggregations and down sampling
        </p>
        <p className={featureStyles.feature__description}>
          Unlimited sub-queries
        </p>
        <p className={featureStyles.feature__description}>
          Built-in SQL optimizer
        </p>
      </div>
    </div>
  </section>
)

const Cards = () => (
  <section
    className={clsx(
      sectionStyles.section,
      sectionStyles["section--inner"],
      cardsStyles.cards,
    )}
  >
    <h3
      className={clsx(
        sectionStyles.section__title,
        cardsStyles.cards__title,
        "text--center",
      )}
    >
      Why time series?
    </h3>

    <div className={cardsStyles.cards__footer}>
      <div className={cardsStyles.cards__wrapper}>
        <h3 className={cardsStyles.cards__header}>DevOps monitoring</h3>
        <p className={cardsStyles.cards__content}>
          Collect metrics and events from your infrastructure (CPU, memory,
          networks, etc) and get real-time visibility into your entire stack.
        </p>
      </div>

      <div className={cardsStyles.cards__wrapper}>
        <h3 className={cardsStyles.cards__header}>Financial market data</h3>
        <p className={cardsStyles.cards__content}>
          Store market data to identify historical trends and correlations using
          statistical methods and generate trading signals.
        </p>
      </div>

      <div className={cardsStyles.cards__wrapper}>
        <h3 className={cardsStyles.cards__header}>Connected devices</h3>
        <p className={cardsStyles.cards__content}>
          Capture, store and respond to data from sensors at any resolution in
          industrial applications.
        </p>
      </div>

      <div className={cardsStyles.cards__wrapper}>
        <h3 className={cardsStyles.cards__header}>Application metrics</h3>
        <p className={cardsStyles.cards__content}>
          Empower users of your application to track and visualise logs, api
          calls and any application activity in real-time.
        </p>
      </div>

      <div className={cardsStyles.cards__wrapper}>
        <h3 className={cardsStyles.cards__header}>CRUD for time series</h3>
        <p className={cardsStyles.cards__content}>
          Allows easy changes in historical data through fully ACID support for
          CRUD APIs.
        </p>
      </div>

      <div className={cardsStyles.cards__wrapper}>
        <h3 className={cardsStyles.cards__header}>Integrated data</h3>
        <p className={cardsStyles.cards__content}>
          Pull together all your application, device, and infrastructure data
          for a complete, 360º view of all aspects of your business.
        </p>
      </div>
    </div>
  </section>
)

const Console = () => {
  const { siteConfig } = useDocusaurusContext()

  return (
    <section
      className={clsx(sectionStyles.section, sectionStyles["section--odd"])}
    >
      <div
        className={clsx(sectionStyles["section--inner"], consoleStyles.console)}
      >
        <h2
          className={clsx(
            sectionStyles.section__title,
            consoleStyles.console__title,
            "text--center",
          )}
        >
          Interactive Console
        </h2>
        <p
          className={clsx(
            sectionStyles.section__subtitle,
            consoleStyles.console__subtitle,
            "text--center",
          )}
        >
          Interactive console to import data (drag and drop) and start querying
          right away. Check our&nbsp;
          <a href="/docs/guide/web-console/">Web Console guide</a> to get
          started.
        </p>

        <img
          alt="Artistic view of QuestDB's Web Console split in 3 components: the navigation tree, the SQL code editor and data displayed as a chart"
          className={consoleStyles.console__illustration}
          src="/img/pages/index/console.svg"
        />

        <div className={consoleStyles.console__footer}>
          <div
            className={clsx(
              consoleStyles.console__highlight,
              consoleStyles["console__highlight--primary"],
            )}
          >
            <img
              alt="Postgres logo"
              src="/img/pages/index/pgwire.svg"
              title="Postgres"
            />
            <h3 className={consoleStyles.console__label}>
              Postgres wire support
            </h3>
            <p className={consoleStyles.console__summary}>
              Interact with QuestDB using the Postgres wire and any tool that
              connects to it.
            </p>
          </div>

          <div className={consoleStyles.console__highlight}>
            <img
              alt="Antenna"
              src="/img/pages/index/foss.svg"
              title="Open source"
            />
            <h3 className={consoleStyles.console__label}>Open source</h3>
            <p className={consoleStyles.console__summary}>
              QuestDB is open source. Follow us on GitHub. Watch the repo to get
              notified of further releases and new features!
            </p>

            <div className={consoleStyles.console__actions}>
              <a
                className={consoleStyles.console__link}
                href={siteConfig.customFields.githubUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Go to GitHub&nbsp;&nbsp;&gt;
              </a>
              <a
                className={consoleStyles.console__link}
                href={siteConfig.customFields.slackUrl}
              >
                Join Slack&nbsp;&nbsp;&gt;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const S = [3, 1, 6, 10]
const M = [3, 0, 4, 8]
const L = [4, 0, 4, 8]

const getTopByIndex = (m: number[], index: 1 | 2 | 3 | 4): number => {
  const scale = {
    1: 25 * (m[0] || 0),
    2: -25 * (m[1] || 0),
    3: -25 * (m[2] || 0),
    4: -25 * (m[3] || 0),
  }

  return scale[index] || 0
}

const searchQuery = `SELECT timestamp, tempC
FROM sensors
WHERE timestamp = '2020-06-14;1M';`

const sliceQuery = `SELECT timestamp, avg(tempC)
FROM sensors
SAMPLE BY 5m;`

const navigateQuery = `SELECT sensorName, tempC
FROM sensors
LATEST BY sensorName;`

const mergeQuery = `SELECT sensors.timestamp ts, rain1H
FROM sensors
ASOF JOIN weather;`

const Chevron = () => (
  <svg
    fill="currentColor"
    focusable="false"
    role="img"
    viewBox="5.40 7.12 9.23 5.25"
    width="26"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.582 12.141a.695.695 0 01-.978 0 .68.68 0 010-.969l3.908-3.83a.697.697 0 01.979 0l3.908 3.83a.68.68 0 010 .969.697.697 0 01-.979 0L10 9l-3.418 3.141z" />
  </svg>
)

type Index = 1 | 2 | 3 | 4

const QueryScroller = () => {
  const [top, setTop] = useState(S)
  const [index, setIndex] = useState<Index>(2)
  const windowWidth = useWindowWidth()
  const handleClick1 = useCallback(() => {
    setIndex(1)
  }, [])
  const handleClick2 = useCallback(() => {
    setIndex(2)
  }, [])
  const handleClick3 = useCallback(() => {
    setIndex(3)
  }, [])
  const handleClick4 = useCallback(() => {
    setIndex(4)
  }, [])
  const handleUpClick = useCallback(() => {
    setIndex(Math.max(index - 1, 1) as Index)
  }, [index])
  const handleDownClick = useCallback(() => {
    setIndex(Math.min(index + 1, 4) as Index)
  }, [index])

  useEffect(() => {
    if (windowWidth && windowWidth < 622) {
      setTop(S)
      return
    }

    if (windowWidth && windowWidth < 800) {
      setTop(M)
      return
    }

    setTop(L)
  }, [windowWidth])

  return (
    <section
      className={clsx(
        sectionStyles["section--inner"],
        queryScrollerStyles.queryScroller,
      )}
    >
      <h2
        className={clsx(
          sectionStyles.section__title,
          queryScrollerStyles.queryScroller__title,
          "text--center",
        )}
      >
        Augmented SQL for time series
      </h2>

      <p
        className={clsx(
          sectionStyles.section__subtitle,
          queryScrollerStyles.queryScroller__subtitle,
          "text--center",
        )}
      >
        QuestDB enhances ANSI SQL with time series extensions to manipulate time
        stamped data
      </p>

      <div className={queryScrollerStyles.queryScroller__scroller}>
        <div className={queryScrollerStyles.queryScroller__inner}>
          <div
            className={clsx(queryScrollerStyles.queryScroller__chevron)}
            onClick={handleUpClick}
            style={{ visibility: index === 1 ? "hidden" : "visible" }}
          >
            <Chevron />
          </div>
          <div className={clsx(queryScrollerStyles.queryScroller__left)}>
            <div
              className={clsx(
                queryScrollerStyles.queryScroller__offset,
                queryScrollerStyles[`queryScroller__${index}`],
              )}
              style={{ top: getTopByIndex(top, index) }}
            >
              <CodeBlock>{`${searchQuery}`}</CodeBlock>
              <CodeBlock>
                {`-- Search time
${searchQuery}`}
              </CodeBlock>
              <CodeBlock>{`${sliceQuery}`}</CodeBlock>
              <CodeBlock>
                {`-- Slice time
${sliceQuery}`}
              </CodeBlock>
              <CodeBlock>{`${navigateQuery}`}</CodeBlock>
              <CodeBlock>
                {`-- Navigate time
${navigateQuery}`}
              </CodeBlock>
              <CodeBlock>{`${mergeQuery}`}</CodeBlock>
              <CodeBlock>
                {`-- Merge time
${mergeQuery}`}
              </CodeBlock>
            </div>
          </div>
          <div
            className={clsx(
              queryScrollerStyles.queryScroller__chevron,
              queryScrollerStyles["queryScroller__chevron--bottom"],
            )}
            onClick={handleDownClick}
            style={{ visibility: index === 4 ? "hidden" : "visible" }}
          >
            <Chevron />
          </div>
          <div className={queryScrollerStyles.queryScroller__right}>
            <div
              className={clsx(queryScrollerStyles.queryScroller__button, {
                [queryScrollerStyles["queryScroller__button--active"]]:
                  index === 1,
              })}
              onClick={handleClick1}
            >
              <h3 className={queryScrollerStyles.queryScroller__header}>
                <img
                  alt="Magnifying glass icon"
                  className={queryScrollerStyles.queryScroller__icon}
                  src="/img/pages/index/searchTime.svg"
                />
                Search Time
              </h3>
              <p className={queryScrollerStyles.queryScroller__description}>
                Filter and search for specific timestamps with “where”
              </p>
            </div>

            <div
              className={clsx(queryScrollerStyles.queryScroller__button, {
                [queryScrollerStyles["queryScroller__button--active"]]:
                  index === 2,
              })}
              onClick={handleClick2}
            >
              <h3 className={queryScrollerStyles.queryScroller__header}>
                <img
                  alt="Knife icon"
                  className={queryScrollerStyles.queryScroller__icon}
                  src="/img/pages/index/sliceTime.svg"
                />
                Slice Time
              </h3>
              <p className={queryScrollerStyles.queryScroller__description}>
                Create time buckets and aggregate by intervals with “sample by”
              </p>
            </div>

            <div
              className={clsx(queryScrollerStyles.queryScroller__button, {
                [queryScrollerStyles["queryScroller__button--active"]]:
                  index === 3,
              })}
              onClick={handleClick3}
            >
              <h3 className={queryScrollerStyles.queryScroller__header}>
                <img
                  alt="Indication arrow icon"
                  className={queryScrollerStyles.queryScroller__icon}
                  src="/img/pages/index/navigateTime.svg"
                />
                Navigate Time
              </h3>
              <p className={queryScrollerStyles.queryScroller__description}>
                Search time series from most recent values to oldest with
                “latest by”
              </p>
            </div>
            <div
              className={clsx(queryScrollerStyles.queryScroller__button, {
                [queryScrollerStyles["queryScroller__button--active"]]:
                  index === 4,
              })}
              onClick={handleClick4}
            >
              <h3 className={queryScrollerStyles.queryScroller__header}>
                <img
                  alt="Two overlapping squares"
                  className={queryScrollerStyles.queryScroller__icon}
                  src="/img/pages/index/mergeTime.svg"
                />
                Merge Time
              </h3>
              <p className={queryScrollerStyles.queryScroller__description}>
                Join two tables based on timestamp where timestamps do not
                exactly match with “asof join”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Home = () => {
  const { siteConfig } = useDocusaurusContext()
  const title = "QuestDB"

  return (
    <MetadataContextProvider>
      <Layout description={siteConfig.customFields.description} title={title}>
        <DocusaurusHead>
          <link rel="canonical" href={siteConfig.url} />
        </DocusaurusHead>
        <Jumbotron />
        <Feature />
        <QueryScroller />
        <Why />
        <Cards />
        <Console />
        <SeenOn />
      </Layout>
    </MetadataContextProvider>
  )
}

export default Home
