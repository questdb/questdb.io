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
  const { permalinkToSidebar, docsSidebars } = versionMetadata ?? {}
  const docRoutes = (routes as unknown) as Routes[]
  const currentDocRoute = routes.find((docRoute) =>
    matchPath(location.pathname, docRoute),
  )

  if (currentDocRoute == null) {
    return <NotFound location={location} {...rest} />
  }

  const sidebarName = permalinkToSidebar[currentDocRoute.path] as
    | string
    | undefined

  return (
    <MetadataContextProvider>
      <Layout
        description={siteConfig.customFields.description}
        key={isClient.toString()}
        title="Introduction"
      >
        <div className={styles.doc}>
          <div
            className={clsx("docs-sidebar", styles.doc__sidebar)}
            role="complementary"
          >
            {sidebarName != null && docsSidebars[sidebarName] != null && (
              <DocSidebar
                key={
                  // Reset sidebar state on sidebar changes
                  // See https://github.com/facebook/docusaurus/issues/3414
                  sidebarName
                }
                path={currentDocRoute.path}
                sidebar={docsSidebars[sidebarName]}
                sidebarCollapsible={
                  siteConfig.themeConfig?.sidebarCollapsible ?? true
                }
              />
            )}
          </div>
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
