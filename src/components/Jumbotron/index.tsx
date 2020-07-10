import clsx from "clsx"
import React from "react"

import Button from "../Button"
import sectionStyles from "../Section/styles.module.css"
import jumbotronStyles from "./styles.module.css"

const Jumbotron = () => (
  <section
    className={clsx(sectionStyles["section--inner"], jumbotronStyles.jumbotron)}
  >
    <div className={jumbotronStyles.jumbotron__left}>
      <h1 className={jumbotronStyles.jumbotron__title}>
        Time Series Data, Faster
      </h1>
      <h2 className={jumbotronStyles.jumbotron__subtitle}>
        QuestDB is an open-source database which makes time-series fast and easy
      </h2>
      <div className={jumbotronStyles.jumbotron__cta}>
        <Button
          className={jumbotronStyles["jumbotron__cta--link"]}
          href="https://github.com/questdb/questdb"
        >
          Get Started
        </Button>
        <Button
          className={clsx(
            jumbotronStyles["jumbotron__cta--link"],
            jumbotronStyles["jumbotron__cta--github"],
          )}
          icon={
            <img
              alt="GitHub icon"
              src="img/githubIcon.svg"
              height="26"
              width="26"
            />
          }
          style="secondary"
          to="docs/documentationOverview"
        >
          GitHub
        </Button>
      </div>
    </div>

    <div className={jumbotronStyles.jumbotron__right}>
      <pre className={jumbotronStyles.jumbotron__docker}>
        <code>
          {`docker pull questdb/questdb
docker run -p 9000:9000 questdb/questdb`}
        </code>
        <a
          href="https://hub.docker.com/r/questdb/questdb"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="Docker icon"
            className={jumbotronStyles["jumbotron__docker-icon"]}
            src="img/pages/index/dockerIcon.svg"
            width="60"
          />
        </a>
      </pre>
    </div>
  </section>
)

export default Jumbotron
