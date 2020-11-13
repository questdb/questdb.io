import clsx from "clsx"
import DocusaurusHead from "@docusaurus/Head"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React, { useCallback, useRef } from "react"

import Button from "@theme/Button"
import Layout from "@theme/Layout"
import { MetadataContextProvider } from "@theme/useMetadataContext"

import caCss from "../../css/careers/card.module.css"
import joCss from "../../css/careers/job.module.css"
import liCss from "../../css/careers/list.module.css"
import seCss from "../../css/section.module.css"

const CareersPage = () => {
  const title = "Careers at QuestDB"
  const description =
    "Join us at QuestDB to build breakthrough technology that will power the infrastructure of tomorrow."
  const { siteConfig } = useDocusaurusContext()
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const handleClick = useCallback(() => {
    titleRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [titleRef])

  return (
    <MetadataContextProvider>
      <Layout description={description} title={title}>
        <DocusaurusHead>
          <link rel="canonical" href={`${siteConfig.url}/careers/`} />
          <meta
            name="description"
            content="An open source time series SQL database for fast ingestion and queries"
          />
        </DocusaurusHead>
        <section
          className={clsx(seCss["section--inner"], seCss["section--center"])}
        >
          <div className={caCss.card}>
            <div className={caCss.card__side}>
              <h1 className={caCss["card__title--important"]}>Careers</h1>
              <p className={caCss.card__content}>
                We help developers handle explosive amounts of data while
                getting them started in just a few minutes with the simplest and
                most accessible time series database.
              </p>
              <Button className={caCss.card__cta} onClick={handleClick}>
                Current openings
              </Button>
            </div>
            <div
              className={clsx(
                caCss.card__side,
                caCss["card__side--illustration"],
              )}
            >
              <img
                alt="A code editor containing a SQL statement"
                className={caCss.card__illustration}
                src="/img/pages/careers/teamCollaboration.svg"
              />
            </div>
          </div>
          <div className={clsx(caCss.card, caCss["card--reverse"])}>
            <div
              className={clsx(
                caCss.card__side,
                caCss["card__side--illustration"],
                caCss["card__side--baseline"],
              )}
            >
              <img
                alt="A code editor containing a SQL statement"
                className={caCss.card__illustration}
                src="/img/pages/careers/teamSpirit.svg"
              />
            </div>
            <div className={caCss.card__side}>
              <h2 className={caCss.card__title}>Working at QuestDB</h2>
              <p className={caCss.card__content}>
                We hire talented and passionate people who share our mission to
                empower developers to solve their problems with data. We are
                building breakthrough technology to power the infrastructure of
                tomorrow.
              </p>
              <ul className={liCss.list}>
                <li className={liCss.list__item}>
                  We are a company with thousands of users; our mission is to
                  empower them.
                </li>
                <li className={liCss.list__item}>
                  We invest in a culture that promotes ownership, autonomy and
                  independent thinking.
                </li>
                <li className={liCss.list__item}>
                  We have transparent leadership and value employees’ strategic
                  inputs.
                </li>
                <li className={liCss.list__item}>
                  Our team is ambitious and tackles the most difficult problems
                  at the deepest data infrastructure layer.
                </li>
              </ul>
            </div>
          </div>
          <div className={caCss.card}>
            <div className={caCss.card__side}>
              <h2 className={caCss.card__title} ref={titleRef}>
                Current openings
              </h2>
              <p className={caCss.card__content}>
                We are always interested in hiring new talent, so if you are
                looking for a role that does is not listed, you can contact us
                anyway! Send your CV with any relevant links (GitHub, LinkedIn,
                personal website, etc.) to{" "}
                <a href="mailto:careers@questdb.io">careers@questdb.io</a>, we
                will review your application and be in touch.
              </p>
            </div>
            <div
              className={clsx(caCss.card__side, caCss["card__side--center"])}
            >
              <a className={joCss.job} href="backend-software-engineer">
                <h3 className={joCss.job__title}>Software Engineer, Backend</h3>
                <p className={joCss.job__location}>Remote</p>
                <span className={joCss.job__cta}>
                  Details&nbsp;
                  <img
                    alt="Right arrow"
                    src="/img/pages/careers/arrowRight.svg"
                    width="20px"
                  />
                </span>
              </a>
              <a className={joCss.job} href="technical-content-writer">
                <h3 className={joCss.job__title}>Technical Content Writer</h3>
                <p className={joCss.job__location}>Remote</p>
                <span className={joCss.job__cta}>
                  Details&nbsp;
                  <img
                    alt="Right arrow"
                    src="/img/pages/careers/arrowRight.svg"
                    width="20px"
                  />
                </span>
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </MetadataContextProvider>
  )
}

export default CareersPage
