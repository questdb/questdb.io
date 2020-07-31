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

        <h2 className={featureStyles.feature__title}>Built for performance</h2>

        <span className={featureStyles.feature__description}>
          SIMD optimised analytics
        </span>
        <span className={featureStyles.feature__description}>
          Rows and columns based access
        </span>
        <span className={featureStyles.feature__description}>
          Vectorized queries execution
        </span>
        <span className={featureStyles.feature__description}>
          Tiny memory footprint
        </span>
        <span className={featureStyles.feature__description}>
          C++ and zero-GC Java
        </span>
      </div>

      <div className={featureStyles.feature}>
        <img
          alt="Illustration"
          className={featureStyles.feature__illustration}
          src="img/pages/index/easyToUse.svg"
        />

        <h2 className={featureStyles.feature__title}>
          Optimized for time series
        </h2>

        <span className={featureStyles.feature__description}>
          Relational model for time series
        </span>
        <span className={featureStyles.feature__description}>
          Data stored in chronological order
        </span>
        <span className={featureStyles.feature__description}>
          Time partitioned
        </span>
        <span className={featureStyles.feature__description}>
          Scalable ingestion
        </span>
        <span className={featureStyles.feature__description}>
          Immediate consistency
        </span>
        <span className={featureStyles.feature__description}>
          Fast InfluxDB line protocol
        </span>
      </div>

      <div className={featureStyles.feature}>
        <img
          alt="Illustration"
          className={featureStyles.feature__illustration}
          src="img/pages/index/featureRich.svg"
        />

        <h2 className={featureStyles.feature__title}>Implemented with SQL</h2>

        <span className={featureStyles.feature__description}>
          Time series and relational joins
        </span>
        <span className={featureStyles.feature__description}>
          Postgres wire support
        </span>
        <span className={featureStyles.feature__description}>
          Aggregations and down sampling
        </span>
        <span className={featureStyles.feature__description}>
          Unlimited sub-queries
        </span>

        <span className={featureStyles.feature__description}>
          Built-in SQL optimizer
        </span>
      </div>
    </div>
  </section>
)

export default Feature
