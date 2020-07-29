import ReactHelmetHead from "@docusaurus/Head"
import React from "react"

const Head = () => (
  <ReactHelmetHead>
    <link href="https://www.googletagmanager.com" rel="preconnect" />
    <link href="https://www.googletagmanager.com" rel="dns-prefetch" />

    <link href="https://www.google-analytics.com" rel="preconnect" />
    <link href="https://www.google-analytics.com" rel="dns-prefetch" />

    <link href="https://ajax.googleapis.com" rel="preconnect" />
    <link href="https://ajax.googleapis.com" rel="dns-prefetch" />
  </ReactHelmetHead>
)

export default Head
