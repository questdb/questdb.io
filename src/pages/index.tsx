import clsx from "clsx"
import React from "react"

import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"

import { Console, Feature, GetStarted, Jumbotron, Whatis } from "../components"
import styles from "./styles.module.css"

const Home = () => {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context

  return (
    <Layout
      className={styles.layout}
      description={siteConfig.tagline}
      title="QuestDB"
      version="5.0.1"
    >
      <Jumbotron />
      <Feature />
      <Whatis />
      <Console />
      <GetStarted />
    </Layout>
  )
}

export default Home
