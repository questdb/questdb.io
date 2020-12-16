import clsx from "clsx"
import React, { useCallback, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import Chevron from "@theme/Chevron"
import PageLayout from "@theme/PageLayout"
import useResizeObserver from "@theme/useResizeObserver"

import clCss from "../css/enterprise/cloud.module.css"
import caCss from "../css/enterprise/card.module.css"
import ilCss from "../css/enterprise/illustration.module.css"
import peCss from "../css/enterprise/performance.module.css"
import quCss from "../css/enterprise/quote.module.css"
import prCss from "../css/property.module.css"
import seCss from "../css/section.module.css"
import _quotes from "../lang/quotes"

const quotes = _quotes.map(({ author, company, logo, role, text }) => {
  const Quote = () => (
    <div key={company} className={quCss.quote}>
      <div className={quCss.quote__symbol} />

      <div className={quCss.quote__logo}>
        <img
          alt={logo.alt}
          className="responsive-image"
          height={logo.height}
          src={logo.src}
          width={logo.width}
        />
      </div>

      <p className={quCss.quote__content}>{text}</p>

      <p className={quCss.quote__author}>
        <span className={quCss.quote__chevron}>&gt;</span>
        {author}
        <br />
        {role}
        ,&nbsp;
        {company}
      </p>
    </div>
  )

  return Quote
})

type BulletProps = {
  index: number
  onClick: (index: number) => void
  page: number
  viewportSize: number
}

const Bullet = ({ index, onClick, page, viewportSize }: BulletProps) => {
  const handleClick = useCallback(() => {
    onClick(index * viewportSize)
  }, [index, onClick, viewportSize])

  return (
    <span
      className={clsx(quCss.controls__pin, {
        [quCss["controls__pin--selected"]]: page === index,
      })}
      onClick={handleClick}
    />
  )
}

const QUOTE_WIDTH = 350

const Enterprise = () => {
  const title = "QuestDB Enterprise"
  const description =
    "The fastest open source time-series database for organizations, on premise or on the cloud."
  const { ref, width } = useResizeObserver<HTMLDivElement>()
  // An "item" is a quote
  // Index in the array of quotes of the item that is "focused"
  const [index, setIndex] = useState(0)
  // How many items we can show on the screen
  const viewportSize = Math.max(1, Math.floor((width ?? 0) / QUOTE_WIDTH))
  // How many items will actually be displayed (can be smaller than viewportSize)
  const viewportCount =
    viewportSize === 0 ? 0 : Math.ceil(quotes.length / viewportSize)
  // Page number
  const page = Math.floor(index / viewportSize)
  // The quotes to show
  const viewportQuotes = quotes.slice(
    page * viewportSize,
    (page + 1) * viewportSize,
  )
  const increaseIndex = useCallback(() => {
    setIndex((index) => Math.min(index + viewportSize, quotes.length - 1))
  }, [viewportSize])
  const decreaseIndex = useCallback(() => {
    setIndex((index) => Math.max(index - viewportSize, 0))
  }, [viewportSize])

  return (
    <PageLayout canonical="/enterprise" description={description} title={title}>
      <section className={seCss["section--inner"]}>
        <div className={seCss.section__header}>
          <h1
            className={clsx(
              seCss.section__title,
              seCss["section__title--accent"],
            )}
          >
            QuestDB Enterprise
          </h1>

          <p
            className={clsx(
              seCss.section__subtitle,
              seCss["section__subtitle--accent"],
              "text--center",
            )}
          >
            The fastest open source time-series database for organizations, on
            premise or on the cloud.
          </p>

          <img
            alt="Artistic view of the console with sub-queries"
            className={ilCss.illustration}
            height={394}
            src="/img/pages/enterprise/banner.svg"
            width={900}
          />

          <p
            className={clsx(
              seCss.section__subtitle,
              seCss["section__subtitle--accent"],
              "text--center",
            )}
          >
            QuestDB Enterprise is the best way to run QuestDB on your own
            infrastructure at any scale. The software can be deployed on-premise
            or in the cloud on AWS, GCP or Azure.
          </p>

          <div className={clsx(clCss.cloud)}>
            <img
              alt="AWS logo"
              height={44}
              src="/img/pages/enterprise/aws.png"
              width={73}
            />

            <img
              alt="Google Cloud Platform logo"
              height={34}
              src="/img/pages/enterprise/gcp.png"
              width={219}
            />

            <img
              alt="Microsoft Azure logo"
              src="/img/pages/enterprise/azure.png"
              height={34}
              width={116}
            />
          </div>
        </div>
      </section>

      <section className={seCss["section--flex-wrap"]}>
        <div className={caCss.card}>
          <div className={caCss.card__image}>
            <img
              alt="Chat icon"
              height={52}
              src="/img/pages/enterprise/chat.svg"
              width={62}
            />
          </div>
          <h2 className={caCss.card__title}>Support</h2>
          <ul className={caCss.card__list}>
            <li className={clsx(prCss.property, caCss.card__item)}>
              Enterprise support: 24x7 technical support from high-quality
              engineers via phone, chat, and email
            </li>
            <li className={clsx(prCss.property, caCss.card__item)}>
              On demand training
            </li>
          </ul>
        </div>

        <div className={caCss.card}>
          <div className={caCss.card__image}>
            <img
              alt="Lock icon"
              height={58}
              src="/img/pages/enterprise/lock.svg"
              width={42}
            />
          </div>
          <h2 className={caCss.card__title}>Security and authentication</h2>
          <ul className={caCss.card__list}>
            <li className={clsx(prCss.property, caCss.card__item)}>
              Advanced security
            </li>
            <li className={clsx(prCss.property, caCss.card__item)}>
              Access control
            </li>
            <li className={clsx(prCss.property, caCss.card__item)}>
              Authentication
            </li>
          </ul>
        </div>

        <div className={caCss.card}>
          <div className={caCss.card__image}>
            <img
              alt="Cog icon"
              height={48}
              src="/img/pages/enterprise/cog.svg"
              width={45}
            />
          </div>
          <h2 className={caCss.card__title}>Management</h2>
          <ul className={caCss.card__list}>
            <li className={clsx(prCss.property, caCss.card__item)}>
              Automation
            </li>
            <li className={clsx(prCss.property, caCss.card__item)}>
              Database monitoring
            </li>
            <li className={clsx(prCss.property, caCss.card__item)}>
              Analytics and visualization
            </li>
          </ul>
        </div>

        <div className={caCss.card}>
          <div className={caCss.card__image}>
            <img
              alt="Rocket icon"
              height={56}
              src="/img/pages/enterprise/rocket.svg"
              width={56}
            />
          </div>
          <h2 className={caCss.card__title}>Unlimited scale</h2>
          <ul className={caCss.card__list}>
            <li className={clsx(prCss.property, caCss.card__item)}>
              High performance UDP replication
            </li>
            <li className={clsx(prCss.property, caCss.card__item)}>
              Horizontal scalability (sharding)
            </li>
          </ul>
        </div>
      </section>

      <section className={seCss["section--inner"]}>
        <div className={peCss.left}>
          <h2 className={peCss.title}>Superior performance</h2>
          <p className={peCss.item}>
            <span className={peCss.bullet} />
            Fast ingestion - O(1) complexity, heavy parallelization, out of
            order inserts
          </p>
          <p className={clsx(peCss.item, peCss["item--important"])}>
            Downsize your instance, reduce hardware costs
          </p>
          <p className={peCss.item}>
            <span className={peCss.bullet} />
            SIMD accelerated SQL queries for lightning fast data retrieval
          </p>
          <p className={clsx(peCss.item, peCss["item--important"])}>
            Real-time analytics, correlate events over time
          </p>
        </div>
        <div className={peCss.right}>
          <img
            alt="Charts showing the performance improvments when using QuestDB"
            height={411}
            src="/img/pages/enterprise/performance.svg"
            width={661}
          />
        </div>
      </section>

      <section
        className={clsx(seCss["section--inner"], seCss["section--column"])}
      >
        <h2 className={quCss.title}>The word on QuestDB</h2>

        <div className={quCss.carousel} ref={ref}>
          <TransitionGroup component={null}>
            <CSSTransition key={page} timeout={200} classNames="item">
              <div className={quCss.carousel__group}>
                {viewportQuotes.map((Quote) => (
                  <Quote key={quotes.indexOf(Quote)} />
                ))}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>

        <div className={quCss.controls}>
          <div
            className={clsx(
              quCss["controls__chevron-wrapper"],
              quCss["controls__chevron-wrapper--left"],
              {
                [quCss["controls__chevron-wrapper--hidden"]]: page === 0,
              },
            )}
            onClick={decreaseIndex}
          >
            <Chevron className={quCss.controls__chevron} side="left" />
          </div>

          <div className={quCss.controls__middle}>
            {Array(viewportCount)
              .fill(0)
              .map((_, idx) => (
                <Bullet
                  index={idx}
                  key={idx}
                  onClick={setIndex}
                  page={page}
                  viewportSize={viewportSize}
                />
              ))}
          </div>

          <div
            className={clsx(
              quCss["controls__chevron-wrapper"],
              quCss["controls__chevron-wrapper--right"],
              {
                [quCss["controls__chevron-wrapper--hidden"]]:
                  page === viewportCount - 1,
              },
            )}
            onClick={increaseIndex}
          >
            <Chevron className={quCss.controls__chevron} side="right" />
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default Enterprise
