/* eslint-disable */
import clsx from "clsx"
import renderRoutes from "@docusaurus/renderRoutes"
import { matchPath } from "@docusaurus/router"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React from "react"
import { MDXProvider } from "@mdx-js/react"

import DocSidebar from "@theme/DocSidebar"
import Head from "@theme/Head"
import Layout from "@theme/Layout"
import MDXComponents from "@theme/MDXComponents"
import NotFound from "@theme/NotFound"
import { MetadataContextProvider } from "@theme/useMetadataContext"

import styles from "./styles.module.css"

const DocPage = (props) => {
  const {
    docsMetadata,
    location,
    route: { routes: docRoutes },
  } = props
  const { permalinkToSidebar, docsSidebars, version } = docsMetadata
  const currentDocRoute = docRoutes.find((docRoute) =>
    matchPath(location.pathname, docRoute),
  )
  const { siteConfig, isClient } = useDocusaurusContext()
  const sidebarName = permalinkToSidebar[currentDocRoute.path]
  const sidebar = docsSidebars[sidebarName]

  if (!currentDocRoute) {
    return <NotFound {...props} />
  }

  return (
    <MetadataContextProvider>
      <Layout
        description={siteConfig.customFields.description}
        key={isClient}
        version={version}
      >
        <Head title="Introduction" />
        <div className={styles.doc}>
          {sidebar && (
            <div
              className={clsx("docs-sidebar", styles.doc__sidebar)}
              role="complementary"
            >
              <DocSidebar
                path={currentDocRoute.path}
                sidebar={sidebar}
                sidebarCollapsible={
                  siteConfig.themeConfig?.sidebarCollapsible ?? true
                }
              />
            </div>
          )}
          <main className={styles.doc__main}>
            <MDXProvider components={MDXComponents}>
              {renderRoutes(docRoutes)}
            </MDXProvider>
          </main>
        </div>
      </Layout>
    </MetadataContextProvider>
  )
}

export default DocPage
/* eslint-enable */
