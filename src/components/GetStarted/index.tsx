import clsx from "clsx"
import { differenceInDays, format, formatDistanceToNowStrict } from "date-fns"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { usePluginData } from "@docusaurus/useGlobalData"
import React, { useEffect, useState } from "react"

import { getAssets, getOs, Os, Release } from "../../utils"
import Button from "../Button"
import sectionStyles from "../Section/styles.module.css"
import getStartedStyles from "./styles.module.css"

const GetStarted = () => {
  const context = useDocusaurusContext()
  const { release } = usePluginData<{ release: Release }>("fetch-release")
  const [os, setOs] = useState<Os>()
  const [releaseDate, setReleaseDate] = useState(
    format(new Date(release.published_at), "MMMM M, yyyy"),
  )
  const { siteConfig } = context
  const assets = getAssets(release)

  useEffect(() => {
    const isClient = typeof window !== "undefined"

    if (!isClient) {
      return
    }

    if (differenceInDays(new Date(), new Date(release.published_at)) < 31) {
      setReleaseDate(
        `${formatDistanceToNowStrict(new Date(release.published_at))} ago`,
      )
    }
    setOs(getOs())
  }, [release.published_at])

  return (
    <section
      className={clsx(
        sectionStyles["section--inner"],
        getStartedStyles.getStarted,
      )}
    >
      <div className={getStartedStyles.getStarted__top}>
        <h1 className={clsx("getStarted", getStartedStyles.getStarted__title)}>
          Get started with QuestDB
        </h1>
        <h2
          className={clsx("getStarted", getStartedStyles.getStarted__subtitle)}
        >
          You can find below download links for the latest version of QuestDB (
          {siteConfig.customFields.version}).
        </h2>

        <div className={getStartedStyles.getStarted__cta}>
          <div
            className={clsx(getStartedStyles.getStarted__details, {
              [getStartedStyles["getStarted__details--download"]]:
                os !== "macos",
            })}
          >
            Latest Release:&nbsp;
            <span className="color--pink">
              {siteConfig.customFields.version}
            </span>
            &nbsp;({releaseDate})
          </div>
          {os && os !== "macos" && assets[os] && (
            <Button href={assets[os].href}>{os}&nbsp;Download</Button>
          )}
        </div>

        <div className={getStartedStyles.getStarted__links}>
          <Link
            className={getStartedStyles.getStarted__link}
            href={release.html_url}
          >
            View the changelog
          </Link>
          <Link
            className={getStartedStyles.getStarted__link}
            href={`${siteConfig.customFields.githubUrl}/tags`}
          >
            View previous releases
          </Link>
        </div>
      </div>
    </section>
  )
}

export default GetStarted
