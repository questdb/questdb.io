import clsx from "clsx"
import Link from "@docusaurus/Link"
import React from "react"

import sectionStyles from "../Section/styles.module.css"
import cardsStyles from "./styles.module.css"

const Cards = () => (
  <section
    className={clsx(
      sectionStyles.section,
      sectionStyles["section--inner"],
      cardsStyles.cards,
    )}
  >
    <h1 className={clsx(cardsStyles.cards__title, "text--center")}>
      Why time series?
    </h1>

    <div className={cardsStyles.cards__footer}>
      <div className={cardsStyles.cards__wrapper}>
        <div className={cardsStyles.cards__header}>DevOps monitoring</div>
        <div className={cardsStyles.cards__content}>
          Collect metrics and events from your infrastructure (CPU, memory,
          networks, etc) and get real-time visibility into your entire stack.
        </div>
      </div>

      <div className={cardsStyles.cards__wrapper}>
        <div className={cardsStyles.cards__header}>Financial market data</div>
        <div className={cardsStyles.cards__content}>
          Store market data to identify historical trends and correlations using
          statistical methods and generate trading signals.
        </div>
      </div>

      <div className={cardsStyles.cards__wrapper}>
        <div className={cardsStyles.cards__header}>Connected devices</div>
        <div className={cardsStyles.cards__content}>
          Capture, store and respond to data from sensors at any resolution in
          industrial applications.
        </div>
      </div>

      <div className={cardsStyles.cards__wrapper}>
        <div className={cardsStyles.cards__header}>Application metrics</div>
        <div className={cardsStyles.cards__content}>
          Empower users of your application to track and visualise logs, api
          calls and any application activity in real-time.
        </div>
      </div>

      <div className={cardsStyles.cards__wrapper}>
        <div className={cardsStyles.cards__header}>CRUD for time series</div>
        <div className={cardsStyles.cards__content}>
          Allows easy changes in historical data through fully ACID support for
          CRUD APIs
        </div>
      </div>

      <div className={cardsStyles.cards__wrapper}>
        <div className={cardsStyles.cards__header}>Integrated data</div>
        <div className={cardsStyles.cards__content}>
          Pull together all your application, device, and infrastructure data
          for a complete, 360º view of all aspects of your business
        </div>
      </div>
    </div>
  </section>
)

export default Cards
