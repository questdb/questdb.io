import clsx from "clsx"
import { matchPath } from "@docusaurus/router"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React from "react"
import { renderRoutes } from "react-router-config"
import { MDXProvider } from "@mdx-js/react"

import type { Props } from "@theme/DocPage"
import DocSidebar from "@theme/DocSidebar"
import Layout from "@theme/Layout"
import MDXComponents from "@theme/MDXComponents"
import NotFound from "@theme/NotFound"
import { MetadataContextProvider } from "@theme/useMetadataContext"

import styles from "./styles.module.css"

type Routes = Props["route"]["routes"]

const DocPage = ({
  location,
  route: { routes },
  versionMetadata,
  ...rest
}: Props) => {
  const { siteConfig, isClient } = useDocusaurusContext()
  const { permalinkToSidebar, docsSidebars } = versionMetadata || {}
  const docRoutes = (routes as unknown) as Routes[]
  const currentDocRoute = routes.find((docRoute) =>
    matchPath(location.pathname, docRoute),
  )

  if (!currentDocRoute) {
    return <NotFound location={location} {...rest} />
  }

  const sidebar = docsSidebars[permalinkToSidebar[currentDocRoute.path]]

  return (
    <MetadataContextProvider>
      <Layout
        description={siteConfig.customFields.description}
        key={isClient.toString()}
        title="Introduction"
      >
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
