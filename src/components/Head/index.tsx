import ReactHelmetHead from "@docusaurus/Head"
import React from "react"

type Props = Readonly<{
  fonts?: boolean
}>

const Head = ({ fonts }: Props) => {
  if (fonts) {
    return (
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
  }

  return (
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
    </ReactHelmetHead>
  )
}

export default Head
