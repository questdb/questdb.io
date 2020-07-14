import clsx from "clsx"
import React from "react"

import Link from "@docusaurus/Link"

import sectionStyles from "../Section/styles.module.css"
import consoleStyles from "./styles.module.css"

const Console = () => (
  <section
    className={clsx(sectionStyles.section, sectionStyles["section--odd"])}
  >
    <div
      className={clsx(consoleStyles.console, sectionStyles["section--inner"])}
    >
      <h1 className={clsx(consoleStyles.console__title, "text--center")}>
        Interactive Console
      </h1>
      <h2 className={clsx(consoleStyles.console__subtitle, "text--center")}>
        QuestDB ships with an interactive web console which allows your to
        import data with a simple drag and drop, and to start querying right
        away.
      </h2>

      <img alt="Illustration" src="img/pages/index/console.svg" />

      <div className={consoleStyles.console__footer}>
        <div
          className={clsx(
            consoleStyles.console__highlight,
            consoleStyles["console__highlight--primary"],
          )}
        >
          <img
            alt="Postres Wire protocol logo"
            src="img/pages/index/pgwire.svg"
          />
          <div className={consoleStyles.console__label}>
            Postgres Wire Support
          </div>
          <div className={consoleStyles.console__summary}>
            Interact with QuestDB using the postgres wire and any tool that
            connects to it.
          </div>
        </div>

        <div className={consoleStyles.console__highlight}>
          <img
            alt="Postres Wire protocol logo"
            src="img/pages/index/foss.svg"
          />
          <div className={consoleStyles.console__label}>Open Source</div>
          <div className={consoleStyles.console__summary}>
            QuestDB is open source. Follow us on Github. Watch the repo to get
            notified of further releases and new features!
          </div>

          <div className={consoleStyles.console__actions}>
            <Link
              className={consoleStyles.console__link}
              href="https://github.com/questdb/questdb"
            >
              Go to GitHub&nbsp;&nbsp;>
            </Link>
            <Link
              className={consoleStyles.console__link}
              href="https://questdb.slack.com"
            >
              Join Slack&nbsp;&nbsp;>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Console
