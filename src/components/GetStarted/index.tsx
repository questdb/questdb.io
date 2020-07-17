import clsx from "clsx"
import React from "react"

import Link from "@docusaurus/Link"

import sectionStyles from "../Section/styles.module.css"
import getStartedStyles from "./styles.module.css"

const GetStarted = () => (
  <section
    className={clsx(sectionStyles.section, sectionStyles["section--inner"])}
  >
    <div
      className={clsx(
        getStartedStyles.getStarted__column,
        getStartedStyles["getStarted__column--left"],
      )}
    >
      <h1 className={getStartedStyles.getStarted__title}>
        Get started with QuestDB
      </h1>
      <h2 className={getStartedStyles.getStarted__subtitle}>
        QuestDB is a relational column-oriented database which can handle
        transactions and real-time analytics. It uses the SQL language with a
        few extensions for time-series.
      </h2>
    </div>
    <div
      className={clsx(
        getStartedStyles.getStarted__column,
        getStartedStyles["getStarted__column--right"],
      )}
    >
      <h4 className={getStartedStyles.getStarted__type}>Docker</h4>
      <p className={getStartedStyles.getStarted__text}>
        Docker manifest to pull image for your target platform
      </p>
      <pre className={getStartedStyles.getStarted__snippet}>
        <code>docker run -p 9000:9000 questdb/questdb</code>
      </pre>
      <p className={getStartedStyles.getStarted__text}>
        Learn how to use it with our&nbsp;
        <Link to="docs/guide/docker">Docker guide</Link>.
      </p>

      <h4 className={getStartedStyles.getStarted__type}>
        Cross-platform binaries (requires JRE11+)
      </h4>
      <p className={getStartedStyles.getStarted__text}>
        Supported Platforms: FreeBSD 64-bit, Linux 64-bit, Windows 64-bit and
        macOS.
      </p>
      <pre className={getStartedStyles.getStarted__snippet}>
        https://github.com/questdb/questdb/releases
      </pre>
      <p className={getStartedStyles.getStarted__text}>
        Follow our&nbsp;
        <Link to="docs/guide/binaries">installation steps</Link>
        &nbsp;to get started.
      </p>

      <h4 className={getStartedStyles.getStarted__type}>Homebrew</h4>
      <pre className={getStartedStyles.getStarted__snippet}>
        <code>brew install questdb</code>
      </pre>
      <p className={getStartedStyles.getStarted__text}>
        Learn how to use QuestDB with Homebrew&nbsp;
        <Link to="docs/guide/homebrew">in our documentation</Link>.
      </p>

      <h4 className={getStartedStyles.getStarted__type}>Java library</h4>
      <p className={getStartedStyles.getStarted__text}>
        Embedded Java database as Maven dependency
      </p>
      <pre>
        <code>{`<dependency>
  <groupId>org.questdb</groupId>
  <artifactId>core</artifactId>
  <version>5.0.1</version>
</dependency>`}</code>
      </pre>

      <p className={getStartedStyles.getStarted__text}>
        Find out more in the&nbsp;
        <Link to="docs/reference/embedded-java-api">
          embedded JAVA API documentation
        </Link>
        .
      </p>
    </div>
  </section>
)

export default GetStarted
