/* eslint-disable */
import clsx from "clsx"
import React from "react"
import { MDXProvider } from "@mdx-js/react"

import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import renderRoutes from "@docusaurus/renderRoutes"
import Layout from "@theme/Layout"
import DocSidebar from "@theme/DocSidebar"
import MDXComponents from "@theme/MDXComponents"
import NotFound from "@theme/NotFound"
import { matchPath } from "@docusaurus/router"

import { Head, MetadataContextProvider } from "../../components"
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
        <Head />
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
