import clsx from "clsx"
import React from "react"

import Button from "@theme/Button"
import PageLayout from "@theme/PageLayout"

import caCss from "../../css/customers/card.module.css"
import loCss from "../../css/customers/logo.module.css"
import juCss from "../../css/customers/jumbotron.module.css"
import quCss from "../../css/customers/quote.module.css"
import seCss from "../../css/section.module.css"

const Customers = () => {
  const title = "Customers"
  const description =
    "Discover how QuestDB is powering the core infrastructure of companies dealing with time-series data"

  return (
    <PageLayout canonical="/customers" description={description} title={title}>
      <section className={clsx(seCss.section, seCss["section--odd"])}>
        <div className={juCss.jumbotron}>
          <div className={juCss.jumbotron__left}>
            <h1 className={seCss.section__title}>Success Stories</h1>
            <p
              className={clsx(
                seCss.section__subtitle,
                juCss.jumbotron__subtitle,
              )}
            >
              Here we bring you a collection of stories highlighting how QuestDB
              is powering the core infrastructure of companies dealing with
              time-series data.
            </p>
          </div>
          <div className={juCss.jumbotron__illustration}>
            <img
              alt="People co-working on a dashboard"
              height={274}
              src="/img/pages/customers/top.svg"
              width={250}
            />
          </div>
        </div>
      </section>

      <section className={clsx(seCss["section--inner"], loCss.logo)}>
        <Button
          className={loCss.logo__wrapper}
          href="https://toggle.global/?utm_source=questdb"
          variant="plain"
        >
          <img
            alt="Toggle.global logo"
            className="responsive-image"
            height={16}
            src="/img/pages/customers/logos/toggle.svg"
            width={110}
          />
        </Button>
        <Button
          className={loCss.logo__wrapper}
          href="https://www.datron.com"
          variant="plain"
        >
          <img
            alt="Datron logo"
            className="responsive-image"
            height={24}
            src="/img/pages/customers/logos/datron.png"
            width={124}
          />
        </Button>
        <Button
          className={loCss.logo__wrapper}
          href="https://www.ycombinator.com/"
          variant="plain"
        >
          <img
            alt="YCombinator logo"
            className="responsive-image"
            height={34}
            src="/img/pages/customers/logos/yc.png"
            width={34}
          />
        </Button>
        <Button
          className={loCss.logo__wrapper}
          href="https://www.innova.com.tr/en"
          variant="plain"
        >
          <img
            alt="Innova logo"
            className="responsive-image"
            height={30}
            src="/img/pages/customers/logos/innova.png"
            width={90}
          />
        </Button>
        <Button
          className={loCss.logo__wrapper}
          href="https://seedcamp.com/"
          variant="plain"
        >
          <img
            alt="Seedcamp logo"
            className="responsive-image"
            height={34}
            src="/img/pages/customers/logos/seedcamp.png"
            width={117}
          />
        </Button>
        <Button
          className={loCss.logo__wrapper}
          href="https://trysavvy.com/"
          variant="plain"
        >
          <img
            alt="Savvy logo"
            className="responsive-image"
            height={30}
            src="/img/pages/customers/logos/savvy.png"
            width={94}
          />
        </Button>
        <Button
          className={loCss.logo__wrapper}
          href="https://chainslayer.io/"
          variant="plain"
        >
          <img
            alt="Chainslayer logo"
            className="responsive-image"
            height={30}
            src="/img/pages/customers/logos/chainslayer.png"
            width={144}
          />
        </Button>
        <Button
          className={loCss.logo__wrapper}
          href="https://www.kimaventures.com/"
          variant="plain"
        >
          <img
            alt="Kima logo"
            className="responsive-image"
            height={38}
            src="/img/pages/customers/logos/kima.png"
            width={63}
          />
        </Button>
      </section>

      <section className={clsx(seCss.section, seCss["section--inner"])}>
        <div className={caCss.card}>
          <p className={caCss.card__summary}>
            <img
              alt="Toggle.global logo"
              className={caCss.card__logo}
              height={20}
              src="/img/pages/customers/logos/toggle.svg"
              width={137.5}
            />
            “We switched from InfluxDB to QuestDB to get queries that are on
            average 300x faster utilizing 1/4 of the hardware, without ever
            overtaxing our servers.”
            <em className={caCss.card__author}>
              - <strong>Armenak Mayalian</strong>, CTO
            </em>
            <Button className={caCss.card__cta} to="/case-study/toggle/">
              View full case study
            </Button>
          </p>
          <div className={caCss.card__illustration}>
            <img
              alt="Comparison of AI and chess to investing"
              height={453}
              src="/img/pages/case-study/toggle/summary.png"
              width={600}
            />
          </div>
        </div>
      </section>

      <section
        className={clsx(
          seCss.section,
          seCss["section--inner"],
          seCss["section--center"],
        )}
      >
        <div className={quCss.quote}>
          <Button
            className={quCss.quote__company}
            href="https://www.datron.com/"
            variant="plain"
          >
            <img
              alt="Datron logo"
              className={loCss.logo__image}
              height={19}
              src="/img/pages/customers/logos/datron.png"
              width={100}
            />
          </Button>
          <p className={quCss.quote__text}>
            At DATRON, we record features of our industry machine components
            (such as spindle RPM and temperature) at a very high frequency under
            lab conditions. With QuestDB’s turnkey solution via Docker, we have
            been able to quickly build a solid foundation for billions of
            measurements per day.
          </p>
          <p>
            <strong>Tim Borowski</strong>
            <br />
            Software Engineer
            <span className={quCss.quote__separator} />
            <strong>DATRON AG</strong>
          </p>
        </div>

        <div className={quCss.quote}>
          <Button
            className={quCss.quote__company}
            href="https://www.innova.com.tr/en"
            variant="plain"
          >
            <img
              alt="Innova logo"
              height={18}
              className={quCss.quote__logo}
              src="/img/pages/customers/logos/innova.png"
              width={88}
            />
          </Button>
          <p className={quCss.quote__text}>
            QuestDB allows us to query data while writing millions of data
            points every few minutes. It is an excellent database for time-based
            calculation of records with static columns and can store the data
            very efficiently. QuestDB’s community is constantly growing and its
            popularity is on the rise.
          </p>
          <p>
            <strong>Erdem Aydemir</strong>
            <br />
            Software Engineer
            <span className={quCss.quote__separator} />
            <strong>Innova</strong>
          </p>
        </div>

        <div className={quCss.quote}>
          <Button
            className={quCss.quote__company}
            href="https://www.samtec.com/"
            variant="plain"
          >
            <img
              alt="Samtec logo"
              className={quCss.quote__logo}
              height={24}
              src="/img/pages/customers/logos/samtec.png"
              width={81}
            />
          </Button>
          <p className={quCss.quote__text}>
            QuestDB is the most promising open source platform for time series
            analytics. It&apos;s thoughtfully designed to be both wicked fast
            and easy to use.
          </p>
          <p>
            <strong>Nick Scolum</strong>
            <br />
            Senior Software Engineer
            <span className={quCss.quote__separator} />
            <strong>Samtec</strong>
          </p>
        </div>

        <div className={quCss.quote}>
          <Button
            className={quCss.quote__company}
            href="https://razorpay.com/"
            variant="plain"
          >
            <img
              alt="Razorpay logo"
              className={quCss.quote__logo}
              height={24}
              src="/img/pages/customers/logos/razorpay.svg"
              width={113}
            />
          </Button>
          <p className={quCss.quote__text}>
            I am honestly impressed by the database’s performance and simplicity
            - we are thinking of moving some of our real time workloads to
            QuestDB.
          </p>
          <p>
            <strong>Venkatesan Vaidhyanathan</strong>
            <br />
            Senior Technical Architect
            <span className={quCss.quote__separator} />
            <strong>Razorpay</strong>
          </p>
        </div>

        <div className={quCss.quote}>
          <Button
            className={quCss.quote__company}
            href="https://chainslayer.io/"
            variant="plain"
          >
            <img
              alt="ChainSlayer logo"
              className={quCss.quote__logo}
              height={24}
              src="/img/pages/customers/logos/chainslayer.png"
              width={116}
            />
          </Button>
          <p className={quCss.quote__text}>
            QuestDB is the cornerstone of our offering. The SQL interface with
            timeseries functions like ASOF join is brilliant. It’s speed and
            small footprint make it perfect for containerized environments. And
            the UI looks absolutely amazing.
          </p>
          <p>
            <strong>Tjerk Stroband</strong>
            <br />
            CTO
            <span className={quCss.quote__separator} />
            <strong>ChainSlayer</strong>
          </p>
        </div>

        <div className={quCss.quote}>
          <Button
            className={quCss.quote__company}
            href="https://www.forrs.de/"
            variant="plain"
          >
            <img
              alt="FORRS logo"
              className={quCss.quote__logo}
              height={16}
              src="/img/pages/customers/logos/forrs.svg"
              width={70}
            />
          </Button>
          <p className={quCss.quote__text}>
            Working with QuestDB is a breeze. This innovative time-series
            database excels with integration into existing environments.
            Supporting multiple open interfaces, such REST and the PG wire
            protocol, while not relying on any client driver, makes it easy to
            work with the OS and language of choice.
          </p>
          <p>
            <strong>Marc Recht</strong>
            <br />
            CTO
            <span className={quCss.quote__separator} />
            <strong>FORRS Partners</strong>
          </p>
        </div>
      </section>
    </PageLayout>
  )
}

export default Customers
