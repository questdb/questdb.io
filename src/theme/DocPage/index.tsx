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

import { Head, HomeContextProvider } from "../../components"
import styles from "./styles.module.css"

const DocPage = ({ docsMetadata, location, route: { routes: docRoutes } }) => {
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
    <HomeContextProvider value={false}>
      <Layout version={version} key={isClient}>
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
    </HomeContextProvider>
  )
}

export default DocPage
