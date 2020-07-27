import clsx from "clsx"
import React, { useCallback, useState } from "react"

import Button from "../Button"
import sectionStyles from "../Section/styles.module.css"
import whyStyles from "./styles.module.css"

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
        <h1 className={clsx(whyStyles.why__title, "text--center")}>
          Why QuestDB?
        </h1>

        <div className={whyStyles.why__footer}>
          <div className={whyStyles.why__menu}>
            <Button
              className={whyStyles["why__menu--item"]}
              onClick={handleClickIs}
              size="small"
              style={opened === "digital" ? "primary" : "tertiary"}
            >
              Digital transformation
            </Button>
            <Button
              className={whyStyles["why__menu--item"]}
              onClick={handleClickGoodFor}
              size="small"
              style={opened === "realtime" ? "primary" : "tertiary"}
            >
              Real-time insights
            </Button>
            <Button
              className={whyStyles["why__menu--item"]}
              onClick={handleClickIsNot}
              size="small"
              style={opened === "integration" ? "primary" : "tertiary"}
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
              <div className={whyStyles.why__item}>Reduce hardware costs</div>
              <div className={whyStyles.why__item}>
                Contain operational complexity
              </div>
              <div className={whyStyles.why__item}>
                Decrease development costs
              </div>
              <div className={whyStyles.why__item}>
                Cloud native (AWS, Azure, GCP)
              </div>
              <div className={whyStyles.why__item}>On premises or embedded</div>
            </div>

            <div
              className={clsx(whyStyles.why__toggle, {
                [whyStyles["why__toggle--active"]]: opened === "realtime",
              })}
            >
              <div className={whyStyles.why__item}>Streaming</div>
              <div className={whyStyles.why__item}>
                Operational analytics / OLAP
              </div>
              <div className={whyStyles.why__item}>
                Monitoring and observability
              </div>
              <div className={whyStyles.why__item}>Predictive analytics</div>
            </div>

            <div
              className={clsx(whyStyles.why__toggle, {
                [whyStyles["why__toggle--active"]]: opened === "integration",
              })}
            >
              <div className={whyStyles.why__item}>Active directory</div>
              <div className={whyStyles.why__item}>
                High performance replication
              </div>
              <div className={whyStyles.why__item}>High availability</div>
              <div className={whyStyles.why__item}>Clustering</div>
              <div className={whyStyles.why__item}>Enterprise security</div>
              <div className={whyStyles.why__item}>Postgres compatible/API</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Why
