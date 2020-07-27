import clsx from "clsx"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React from "react"

import Layout from "@theme/Layout"

import {
  Cards,
  Console,
  Feature,
  Head,
  HomeContextProvider,
  Jumbotron,
  QueryScroller,
  Why,
} from "../components"

const Home = () => {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context

  return (
    <HomeContextProvider value>
      <Layout
        description={siteConfig.tagline}
        title="QuestDB"
        version={siteConfig.customFields.version}
      >
        <Head />
        <Jumbotron />
        <Feature />
        <QueryScroller />
        <Why />
        <Cards />
        <Console />
      </Layout>
    </HomeContextProvider>
  )
}

export default Home
