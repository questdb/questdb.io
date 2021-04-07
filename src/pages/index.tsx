import clsx from "clsx"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React, { useCallback, useEffect, useState } from "react"

import Button from "@theme/Button"
import Chevron from "@theme/Chevron"
import CodeBlock from "@theme/CodeBlock"
import PageLayout from "@theme/PageLayout"
import useWindowWidth from "@theme/useWindowWidth"

import doCss from "../css/index/docker.module.css"
import feCss from "../css/index/feature.module.css"
import flCss from "../css/index/flashy.module.css"
import inCss from "../css/index/integration.module.css"
import juCss from "../css/index/jumbotron.module.css"
import meCss from "../css/index/menu.module.css"
import shCss from "../css/index/showcase.module.css"
import usCss from "../css/index/usp.module.css"
import cuCss from "../css/index/customer.module.css"
import prCss from "../css/property.module.css"
import seCss from "../css/section.module.css"

const FeatureTabs = () => {
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
    <section className={clsx(seCss.section, seCss["section--odd"])}>
      <div className={clsx(seCss["section--inner"], seCss["section--center"])}>
        <h2
          className={clsx(
            seCss.section__title,
            seCss["section__title--wide"],
            "text--center",
          )}
        >
          Why QuestDB?
        </h2>

        <div
          className={clsx(
            seCss.section__footer,
            seCss["section__footer--feature-tabs"],
          )}
        >
          <div className={meCss.menu__list}>
            <Button
              className={meCss.menu__button}
              onClick={handleClickIs}
              size="small"
              variant={opened === "digital" ? "primary" : "tertiary"}
            >
              Digital transformation
            </Button>
            <Button
              className={meCss.menu__button}
              onClick={handleClickGoodFor}
              size="small"
              variant={opened === "realtime" ? "primary" : "tertiary"}
            >
              Real-time insights
            </Button>
            <Button
              className={meCss.menu__button}
              onClick={handleClickIsNot}
              size="small"
              variant={opened === "integration" ? "primary" : "tertiary"}
            >
              Enterprise integration
            </Button>
          </div>

          <div className={meCss.menu__content}>
            <div
              className={clsx(meCss.menu__panel, {
                [meCss["menu__panel--active"]]: opened === "digital",
              })}
            >
              <p className={prCss.property}>Reduce hardware costs</p>
              <p className={prCss.property}>Contain operational complexity</p>
              <p className={prCss.property}>Decrease development costs</p>
              <p className={prCss.property}>Cloud native (AWS, Azure, GCP)</p>
              <p className={prCss.property}>On-premises or embedded</p>
            </div>

            <div
              className={clsx(meCss.menu__panel, {
                [meCss["menu__panel--active"]]: opened === "realtime",
              })}
            >
              <p className={prCss.property}>Streaming</p>
              <p className={prCss.property}>Operational analytics / OLAP</p>
              <p className={prCss.property}>Monitoring and observability</p>
              <p className={prCss.property}>Predictive analytics</p>
            </div>

            <div
              className={clsx(meCss.menu__panel, {
                [meCss["menu__panel--active"]]: opened === "integration",
              })}
            >
              <p className={prCss.property}>Active directory</p>
              <p className={prCss.property}>High-performance replication</p>
              <p className={prCss.property}>High-availability</p>
              <p className={prCss.property}>Clustering</p>
              <p className={prCss.property}>Enterprise security</p>
              <p className={prCss.property}>Postgres compatible</p>
            </div>

            <Button className={meCss.menu__cta} to="/enterprise">
              Enterprise &gt;
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

const Integration = () => (
  <section
    className={clsx(
      seCss.section,
      seCss["section--inner"],
      seCss["section--center"],
    )}
  >
    <h2
      className={clsx(
        seCss.section__title,
        seCss["section__title--wide"],
        "text--center",
      )}
    >
      Integration with the tools you love
    </h2>

    <div className={inCss.integration}>
      <p className={inCss.integration__item}>
        <img
          src="/img/pages/index/integrations/pg.svg"
          alt="Postgres logo"
          width={90}
          height={94}
        />
        Postgres
      </p>
      <p className={inCss.integration__item}>
        <img
          src="/img/pages/index/integrations/grafana.svg"
          alt="Grafana logo"
          width={84}
          height={91}
        />
        Grafana
      </p>
      <p className={inCss.integration__item}>
        <img
          src="/img/pages/index/integrations/kafka.svg"
          alt="Kafka logo"
          width={56}
          height={91}
        />
        Kafka
      </p>
      <p className={inCss.integration__item}>
        <img
          src="/img/pages/index/integrations/python.svg"
          alt="Python logo"
          width={90}
          height={89}
        />
        Python
      </p>
      <p className={inCss.integration__item}>
        <img
          src="/img/pages/index/integrations/pandas.svg"
          alt="Pandas logo"
          width={63}
          height={99}
        />
        Pandas
      </p>
      <p className={inCss.integration__item}>
        <img
          src="/img/pages/index/integrations/influxdata.svg"
          alt="Telegraf logo"
          height={100}
          width={99}
        />
        Telegraf
      </p>
      <p className={inCss.integration__item}>
        <img
          src="/img/pages/index/integrations/tableau.svg"
          alt="Tableau logo"
          width={102}
          height={100}
        />
        Tableau
      </p>
    </div>
  </section>
)

const Customers = () => (
  <section className={clsx(seCss["section--slim"])}>
    <div className={cuCss.logo}>
      <div className={cuCss.logo__item}>
        <img
          alt="DATRON logo"
          height={22}
          src="/img/pages/customers/logos/datron.png"
          width={110}
        />
      </div>
      <div className={cuCss.logo__item}>
        <img
          alt="Kepler logo"
          height={34}
          src="/img/pages/customers/logos/kepler.png"
          width={140}
        />
      </div>
      <div className={cuCss.logo__item}>
        <img
          alt="Verizon logo"
          height={25}
          src="/img/pages/customers/logos/verizon.png"
          width={110}
        />
      </div>
      <div className={cuCss.logo__item}>
        <img
          alt="YCombinator logo"
          className={cuCss.logo__img}
          height={34}
          src="/img/pages/customers/logos/yc.png"
          width={34}
        />
      </div>
      <div className={cuCss.logo__item}>
        <img
          alt="Toggle logo"
          height={20}
          src="/img/pages/customers/logos/toggle.svg"
          width={115}
        />
      </div>
      <div className={cuCss.logo__item}>
        <img
          alt="Innova logo"
          height={20}
          src="/img/pages/customers/logos/innova.png"
          width={100}
        />
      </div>
      <div className={cuCss.logo__item}>
        <img
          alt="Ably logo"
          height={28}
          src="/img/pages/customers/logos/ably.svg"
          width={90}
        />
      </div>
      <div className={cuCss.logo__item}>
        <img
          alt="Insurance Information Institute logo"
          height={41}
          src="/img/pages/customers/logos/iii.png"
          width={140}
        />
      </div>
      <div className={cuCss.logo__item}>
        <img
          alt="BIBA logo"
          height={19}
          src="/img/pages/customers/logos/biba.svg"
          width={60}
        />
      </div>
    </div>
  </section>
)

const Top = () => {
  const { siteConfig } = useDocusaurusContext()

  return (
    <section
      className={clsx(seCss["section--inner"], seCss["section--slim--accent"])}
    >
      <div className={juCss.jumbotron}>
        <h1
          className={clsx(
            seCss.section__title,
            seCss["section__title--jumbotron"],
            seCss["section__title--accent"],
          )}
        >
          Fast SQL for time series
        </h1>

        <p
          className={clsx(
            seCss.section__subtitle,
            seCss["section__subtitle--jumbotron"],
            seCss["section__subtitle--accent"],
          )}
        >
          {siteConfig.tagline}
        </p>

        <div className={juCss.jumbotron__cta}>
          <Button
            className={juCss.jumbotron__link}
            href={siteConfig.customFields.demoUrl}
          >
            Live Demo
          </Button>
          <Button
            className={clsx(
              juCss.jumbotron__link,
              juCss["jumbotron__cta--github"],
            )}
            href={siteConfig.customFields.githubUrl}
            icon={
              <img
                alt="GitHub logo"
                height={26}
                src="/img/github.svg"
                title="GitHub"
                width={26}
              />
            }
            variant="secondary"
          >
            GitHub
          </Button>
        </div>
        <p className={juCss.jumbotron__description}>
          Query our demo dataset with 1.6 billion rows in milliseconds
        </p>
      </div>

      <div className={doCss.docker}>
        <pre className={doCss.docker__inner}>
          <code className={doCss.docker__code}>
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
              className={doCss.docker__icon}
              height={60}
              src="/img/pages/index/docker.svg"
              title="Docker"
              width={60}
            />
          </a>
        </pre>
      </div>
    </section>
  )
}

const Usp = () => (
  <section className={clsx(seCss.section, seCss["section--odd"])}>
    <div className={seCss["section--inner"]}>
      <div className={usCss.usp}>
        <div className={usCss.usp__inner}>
          <img
            alt="Speedometer"
            className={usCss.usp__illustration}
            height={113}
            src="/img/pages/index/rawPower.svg"
            width={176}
          />

          <h2 className={usCss.usp__title}>Built for performance</h2>

          <p className={usCss.usp__description}>SIMD-optimized analytics</p>
          <p className={usCss.usp__description}>Row- and column-based access</p>
          <p className={usCss.usp__description}>Vectorized query execution</p>
          <p className={usCss.usp__description}>Tiny memory footprint</p>
          <p className={usCss.usp__description}>C++ and zero-GC Java</p>
        </div>
      </div>

      <div className={clsx(usCss.usp, usCss["usp--wide"])}>
        <div className={usCss.usp__inner}>
          <img
            alt="A code editor with a chart that shows the result of the query"
            className={usCss.usp__illustration}
            height={113}
            src="/img/pages/index/easyToUse.svg"
            width={205}
          />

          <h2 className={usCss.usp__title}>Optimized for time series</h2>

          <p className={usCss.usp__description}>
            Relational model for time series
          </p>
          <p className={usCss.usp__description}>
            Data stored in chronological order
          </p>
          <p className={usCss.usp__description}>Time partitioned</p>
          <p className={usCss.usp__description}>Immediate consistency</p>
          <p className={usCss.usp__description}>Fast InfluxDB line protocol</p>
        </div>
      </div>

      <div className={usCss.usp}>
        <div className={usCss.usp__inner}>
          <img
            alt="A code editor containing a SQL statement"
            className={usCss.usp__illustration}
            height={113}
            src="/img/pages/index/featureRich.svg"
            width={176}
          />

          <h2 className={usCss.usp__title}>Implemented with SQL</h2>

          <p className={usCss.usp__description}>
            Time series and relational joins
          </p>
          <p className={usCss.usp__description}>Postgres compatibility</p>
          <p className={usCss.usp__description}>
            Aggregations and downsampling
          </p>
          <p className={usCss.usp__description}>Unlimited sub-queries</p>
          <p className={usCss.usp__description}>Built-in SQL optimizer</p>
        </div>
      </div>
    </div>
  </section>
)

const Cards = () => (
  <section className={clsx(seCss.section, seCss["section--odd"])}>
    <div className={clsx(seCss["section--inner"], seCss["section--center"])}>
      <h3
        className={clsx(
          seCss.section__title,
          feCss["section__title--wide"],
          "text--center",
        )}
      >
        Why time series?
      </h3>

      <div
        className={clsx(
          seCss.section__footer,
          seCss["section__footer--feature-cards"],
        )}
      >
        <div className={feCss.feature}>
          <h3 className={feCss.feature__header}>DevOps monitoring</h3>
          <p className={feCss.feature__content}>
            Collect metrics and events from your infrastructure (CPU, memory,
            networks, etc.) and get real-time visibility into your entire stack.
          </p>
        </div>

        <div className={feCss.feature}>
          <h3 className={feCss.feature__header}>Financial market data</h3>
          <p className={feCss.feature__content}>
            Store market data to identify historical trends and correlations
            using statistical methods and generate trading signals.
          </p>
        </div>

        <div className={feCss.feature}>
          <h3 className={feCss.feature__header}>Connected devices</h3>
          <p className={feCss.feature__content}>
            Capture, store and respond to data from sensors at any resolution in
            industrial applications.
          </p>
        </div>

        <div className={feCss.feature}>
          <h3 className={feCss.feature__header}>Application metrics</h3>
          <p className={feCss.feature__content}>
            Empower your application users to track and visualize logs, API
            calls, and any application activity in real-time.
          </p>
        </div>

        <div className={feCss.feature}>
          <h3 className={feCss.feature__header}>
            Machine learning with time-series data
          </h3>
          <p className={feCss.feature__content}>
            Use QuestDB with popular Python frameworks and tools for leveraging
            anomaly detection algorithms, machine learning libraries,
            statistical analysis with Pandas, or Jupyter notebooks.
          </p>
        </div>

        <div className={feCss.feature}>
          <h3 className={feCss.feature__header}>Integrated data</h3>
          <p className={feCss.feature__content}>
            Pull together all your application, device, and infrastructure data
            for a complete, 360º view of all aspects of your business.
          </p>
        </div>
      </div>
    </div>
  </section>
)

const Console = () => {
  const { siteConfig } = useDocusaurusContext()

  return (
    <section
      className={clsx(
        seCss.section,
        seCss["section--inner"],
        seCss["section--center"],
      )}
    >
      <h2
        className={clsx(
          seCss.section__title,
          seCss["section__title--wide"],
          "text--center",
        )}
      >
        Interactive Console
      </h2>
      <p
        className={clsx(
          seCss.section__subtitle,
          seCss["section__subtitle--narrow"],
          "text--center",
        )}
      >
        Interactive console to import data (drag and drop) and start querying
        right away. Check our{" "}
        <a href="/docs/reference/client/web-console/">
          Web Console documentation
        </a>{" "}
        to get started.
      </p>

      <img
        alt="Artistic view of QuestDB's Web Console split in 3 components: the navigation tree, the SQL code editor and data displayed as a chart"
        className={seCss.section__illustration}
        height={467}
        src="/img/pages/index/console.svg"
        width={600}
      />

      <div
        className={clsx(
          seCss.section__footer,
          seCss["section__footer--console"],
        )}
      >
        <div className={clsx(flCss.flashy, flCss["flashy--primary"])}>
          <img
            alt="Postgres logo"
            height={76}
            src="/img/pages/index/pgwire.svg"
            title="Postgres"
            width={76}
          />
          <h3 className={flCss.flashy__title}>Postgres compatibility</h3>
          <p className={flCss.flashy__content}>
            Interact with QuestDB using the Postgres layer and any tool that
            connects to it.
          </p>
        </div>

        <div className={flCss.flashy}>
          <img
            alt="Antenna"
            height={76}
            src="/img/pages/index/foss.svg"
            title="Open source"
            width={76}
          />
          <h3 className={flCss.flashy__title}>Open source</h3>
          <p className={flCss.flashy__content}>
            QuestDB is open source. Follow us on GitHub. Watch the repo to get
            notified of further releases and new features!
          </p>

          <div className={flCss.flashy__links}>
            <a
              className={flCss.flashy__link}
              href={siteConfig.customFields.githubUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              Go to GitHub&nbsp;&nbsp;&gt;
            </a>
            <a
              className={flCss.flashy__link}
              href={siteConfig.customFields.slackUrl}
            >
              Join Slack&nbsp;&nbsp;&gt;
            </a>
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
    1: 25 * (m[0] ?? 0),
    2: -25 * (m[1] ?? 0),
    3: -25 * (m[2] ?? 0),
    4: -25 * (m[3] ?? 0),
  }

  return scale[index] ?? 0
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
    if (windowWidth != null && windowWidth < 622) {
      setTop(S)
      return
    }

    if (windowWidth != null && windowWidth < 800) {
      setTop(M)
      return
    }

    setTop(L)
  }, [windowWidth])

  return (
    <section
      className={clsx(
        seCss.section,
        seCss["section--inner"],
        seCss["section--center"],
        seCss["section--showcase"],
      )}
    >
      <h2
        className={clsx(
          seCss.section__title,
          seCss["section__title--wide"],
          "text--center",
        )}
      >
        Augmented SQL for time series
      </h2>

      <p
        className={clsx(
          seCss.section__subtitle,
          seCss["section__subtitle--narrow"],
          "text--center",
        )}
      >
        QuestDB enhances ANSI SQL with time series extensions to manipulate time
        stamped data
      </p>

      <div className={shCss.showcase}>
        <div className={shCss.showcase__inner}>
          <div
            className={clsx(shCss.showcase__chevron)}
            onClick={handleUpClick}
            style={{ visibility: index === 1 ? "hidden" : "visible" }}
          >
            <Chevron />
          </div>
          <div className={clsx(shCss.showcase__left)}>
            <div
              className={clsx(
                shCss.showcase__offset,
                shCss[`showcase__${index}`],
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
              shCss.showcase__chevron,
              shCss["showcase__chevron--bottom"],
            )}
            onClick={handleDownClick}
            style={{ visibility: index === 4 ? "hidden" : "visible" }}
          >
            <Chevron />
          </div>
          <div className={shCss.showcase__right}>
            <div
              className={clsx(shCss.showcase__button, {
                [shCss["showcase__button--active"]]: index === 1,
              })}
              onClick={handleClick1}
            >
              <h3 className={shCss.showcase__header}>
                <img
                  alt="Magnifying glass icon"
                  className={shCss.showcase__icon}
                  height={18}
                  src="/img/pages/index/searchTime.svg"
                  width={19}
                />
                Search Time
              </h3>
              <p className={shCss.showcase__description}>
                Filter and search for specific timestamps with “WHERE”
              </p>
            </div>

            <div
              className={clsx(shCss.showcase__button, {
                [shCss["showcase__button--active"]]: index === 2,
              })}
              onClick={handleClick2}
            >
              <h3 className={shCss.showcase__header}>
                <img
                  alt="Knife icon"
                  className={shCss.showcase__icon}
                  height={22}
                  src="/img/pages/index/sliceTime.svg"
                  width={23}
                />
                Slice Time
              </h3>
              <p className={shCss.showcase__description}>
                Create time buckets and aggregate by intervals with “SAMPLE BY”
              </p>
            </div>

            <div
              className={clsx(shCss.showcase__button, {
                [shCss["showcase__button--active"]]: index === 3,
              })}
              onClick={handleClick3}
            >
              <h3 className={shCss.showcase__header}>
                <img
                  alt="Indication arrow icon"
                  className={shCss.showcase__icon}
                  height={18}
                  src="/img/pages/index/navigateTime.svg"
                  width={19}
                />
                Navigate Time
              </h3>
              <p className={shCss.showcase__description}>
                Search time series from most recent values to oldest with
                “LATEST BY”
              </p>
            </div>
            <div
              className={clsx(shCss.showcase__button, {
                [shCss["showcase__button--active"]]: index === 4,
              })}
              onClick={handleClick4}
            >
              <h3 className={shCss.showcase__header}>
                <img
                  alt="Two overlapping squares"
                  className={shCss.showcase__icon}
                  height={19}
                  src="/img/pages/index/mergeTime.svg"
                  width={19}
                />
                Merge Time
              </h3>
              <p className={shCss.showcase__description}>
                Join two tables based on timestamp where timestamps do not
                exactly match with “ASOF JOIN”
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
    <PageLayout
      canonical=""
      description={siteConfig.customFields.description}
      title={title}
    >
      <Top />
      <Customers />
      <Usp />
      <Integration />
      <FeatureTabs />
      <QueryScroller />
      <Cards />
      <Console />
    </PageLayout>
  )
}

export default Home
