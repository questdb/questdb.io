import ReactHelmetHead from "@docusaurus/Head"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React from "react"

type Props = {
  title?: string
}

const Head = ({ title }: Props) => {
  const { siteConfig } = useDocusaurusContext()
  const metaTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title

  return (
    <ReactHelmetHead>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteConfig.url} />
      <meta name="twitter:creator" content="@questdb" />
      <meta
        name="twitter:image"
        content={`${siteConfig.url}${siteConfig.themeConfig.image}`}
      />
      <meta name="twitter:site" content={siteConfig.url} />
      <meta name="twitter:title" content={metaTitle} />
      <meta
        name="twitter:description"
        content={siteConfig.customFields.description}
      />

      <link href="https://www.googletagmanager.com" rel="dns-prefetch" />
      <link href="https://www.google-analytics.com" rel="dns-prefetch" />

      <link
        rel="apple-touch-icon"
        sizes="48x48"
        href="/img/icons/icon-48x48.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/img/icons/icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="96x96"
        href="/img/icons/icon-96x96.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/img/icons/icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="192x192"
        href="/img/icons/icon-192x192.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="256x256"
        href="/img/icons/icon-256x256.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="384x384"
        href="/img/icons/icon-384x384.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="512x512"
        href="/img/icons/icon-512x512.png"
      />

      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </ReactHelmetHead>
  )
}

export default Head
