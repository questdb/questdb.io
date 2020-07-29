import clsx from "clsx"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React from "react"

import sectionStyles from "../Section/styles.module.css"
import consoleStyles from "./styles.module.css"

const Console = () => {
  const context = useDocusaurusContext()
  const { siteConfig } = context

  return (
    <section
      className={clsx(sectionStyles.section, sectionStyles["section--odd"])}
    >
      <div
        className={clsx(sectionStyles["section--inner"], consoleStyles.console)}
      >
        <h1 className={clsx(consoleStyles.console__title, "text--center")}>
          Interactive Console
        </h1>
        <h2 className={clsx(consoleStyles.console__subtitle, "text--center")}>
          Interactive console to import data (drag and drop) and start querying
          right away
        </h2>

        <img
          alt="Artistic view of QuestDB's Web Console split in 3 components: the navigation tree, the SQL code editor and data displayed as a chart"
          className={consoleStyles.console__illustration}
          src="img/pages/index/console.svg"
        />

        <div className={consoleStyles.console__footer}>
          <div
            className={clsx(
              consoleStyles.console__highlight,
              consoleStyles["console__highlight--primary"],
            )}
          >
            <img
              alt="Postgres wire protocol logo"
              src="img/pages/index/pgwire.svg"
            />
            <div className={consoleStyles.console__label}>
              Postgres wire support
            </div>
            <div className={consoleStyles.console__summary}>
              Interact with QuestDB using the Postgres wire and any tool that
              connects to it.
            </div>
          </div>

          <div className={consoleStyles.console__highlight}>
            <img
              alt="Postgres wire protocol logo"
              src="img/pages/index/foss.svg"
            />
            <div className={consoleStyles.console__label}>Open source</div>
            <div className={consoleStyles.console__summary}>
              QuestDB is open source. Follow us on GitHub. Watch the repo to get
              notified of further releases and new features!
            </div>

            <div className={consoleStyles.console__actions}>
              <Link
                className={consoleStyles.console__link}
                href={siteConfig.customFields.githubUrl}
              >
                Go to GitHub&nbsp;&nbsp;&gt;
              </Link>
              <Link
                className={consoleStyles.console__link}
                href={siteConfig.customFields.slackUrl}
              >
                Join Slack&nbsp;&nbsp;&gt;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Console
