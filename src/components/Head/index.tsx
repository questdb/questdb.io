import ReactHelmetHead from "@docusaurus/Head"
import React from "react"

const Head = () => (
  <ReactHelmetHead>
    <link
      crossorigin
      href="https://www.googletagmanager.com"
      rel="preconnect"
    />
    <link href="https://www.googletagmanager.com" rel="dns-prefetch" />

    <link
      crossorigin
      href="https://www.google-analytics.com"
      rel="preconnect"
    />
    <link href="https://www.google-analytics.com" rel="dns-prefetch" />

    <link crossorigin href="https://ajax.googleapis.com" rel="preconnect" />
    <link href="https://ajax.googleapis.com" rel="dns-prefetch" />

    <link
      as="font"
      crossorigin
      href="/fonts/inter-latin-300.woff2"
      rel="preload"
    />
    <link
      as="font"
      crossorigin
      href="/fonts/inter-latin-400.woff2"
      rel="preload"
    />
    <link
      as="font"
      crossorigin
      href="/fonts/inter-latin-500.woff2"
      rel="preload"
    />
    <link
      as="font"
      crossorigin
      href="/fonts/inter-latin-700.woff2"
      rel="preload"
    />
  </ReactHelmetHead>
)

export default Head
