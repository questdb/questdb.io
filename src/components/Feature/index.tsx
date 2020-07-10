import clsx from "clsx"
import React from "react"

import sectionStyles from "../Section/styles.module.css"
import featureStyles from "./styles.module.css"

const Feature = () => (
  <section
    className={clsx(sectionStyles.section, sectionStyles["section--odd"])}
  >
    <div className={sectionStyles["section--inner"]}>
      <div className={featureStyles.feature}>
        <img
          alt="Illustration"
          className={featureStyles.feature__illustration}
          src="img/pages/index/rawPower.svg"
        />

        <h2 className={featureStyles.feature__title}>Raw Power</h2>

        <span className={featureStyles.feature__description}>
          Millions of writes per second / thread
        </span>
        <span className={featureStyles.feature__description}>
          SIMD boosted aggregrations
        </span>
        <span className={featureStyles.feature__description}>
          Non-blocking threading model
        </span>
      </div>

      <div className={featureStyles.feature}>
        <img
          alt="Illustration"
          className={featureStyles.feature__illustration}
          src="img/pages/index/easyToUse.svg"
        />

        <h2 className={featureStyles.feature__title}>Easy to use</h2>

        <span className={featureStyles.feature__description}>
          SQL language, augmented for time-series
        </span>
        <span className={featureStyles.feature__description}>
          Postgres wire (beta)
        </span>
        <span className={featureStyles.feature__description}>
          Influx line protocol
        </span>
      </div>

      <div className={featureStyles.feature}>
        <img
          alt="Illustration"
          className={featureStyles.feature__illustration}
          src="img/pages/index/featureRich.svg"
        />

        <h2 className={featureStyles.feature__title}>Feature Rich</h2>

        <span className={featureStyles.feature__description}>
          Relational and time based joins
        </span>
        <span className={featureStyles.feature__description}>
          Unlimited transactions size
        </span>
        <span className={featureStyles.feature__description}>Blob support</span>
      </div>
    </div>
  </section>
)

export default Feature
