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
  SeenOn,
  Why,
} from "../components"

const Home = () => {
  const context = useDocusaurusContext()
  const { siteConfig } = context

  return (
    <HomeContextProvider>
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
        <SeenOn />
      </Layout>
    </HomeContextProvider>
  )
}

export default Home
