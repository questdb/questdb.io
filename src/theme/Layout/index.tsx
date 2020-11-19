import clsx from "clsx"
import React, { ReactNode } from "react"
import Head from "@docusaurus/Head"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import useBaseUrl from "@docusaurus/useBaseUrl"

import AnnouncementBar from "@theme/AnnouncementBar"
import Footer from "@theme/Footer"
import LayoutProviders from "@theme/LayoutProviders"
import Navbar from "@theme/Navbar"

import styles from "./styles.module.css"

export type Props = {
  children: ReactNode
  flex: boolean
  title?: string
  noFooter?: boolean
  description: string
  image?: string
  permalink?: string
  wrapperClassName?: string
}

const Layout = ({
  children,
  flex,
  title,
  noFooter,
  description,
  image,
  permalink,
  wrapperClassName,
}: Props) => {
  const { siteConfig } = useDocusaurusContext()
  const {
    title: siteTitle,
    themeConfig: { image: defaultImage },
    url: siteUrl,
  } = siteConfig
  const metaTitle = title != null ? `${title} | ${siteTitle}` : siteTitle
  const metaImage = image ?? defaultImage
  const metaImageUrl = useBaseUrl(metaImage, { absolute: true })

  return (
    <LayoutProviders>
      <Head>
        <title>{metaTitle}</title>
        {permalink != null && (
          <link rel="canonical" href={`${siteUrl}${permalink}/`} />
        )}
        <meta property="og:image" content={metaImageUrl} />
        <meta
          property="og:url"
          content={`${siteUrl}${permalink != null ? permalink + "/" : ""}`}
        />
        <meta property="og:title" content={metaTitle} />
        <meta name="twitter:image" content={metaImageUrl} />
        {description != null && (
          <meta name="description" content={description} />
        )}
        {description != null && (
          <meta name="twitter:description" content={description} />
        )}
        {description != null && (
          <meta property="og:description" content={description} />
        )}
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:image:alt" content={`Image for "${metaTitle}"`} />
      </Head>
      <AnnouncementBar />
      <Navbar />
      <div
        className={clsx(styles.wrapper, wrapperClassName, {
          [styles.flex]: flex,
        })}
      >
        {children}
      </div>
      {noFooter !== true && <Footer />}
    </LayoutProviders>
  )
}

Layout.defaultProps = { flex: false }

export default Layout
