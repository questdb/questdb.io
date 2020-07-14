import clsx from "clsx"
import React from "react"

import Head from "@docusaurus/Head"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"

import { Console, Feature, GetStarted, Jumbotron, Whatis } from "../components"

const Home = () => {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context

  return (
    <Layout description={siteConfig.tagline} title="QuestDB" version="5.0.1">
      <Head>
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
      </Head>
      <Jumbotron />
      <Feature />
      <Whatis />
      <Console />
      <GetStarted />
    </Layout>
  )
}

export default Home
