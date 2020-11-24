import clsx from "clsx"
import { matchPath } from "@docusaurus/router"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React, { TransitionEvent, useCallback, useState } from "react"
import { renderRoutes } from "react-router-config"
import { MDXProvider } from "@mdx-js/react"

import type { Props } from "@theme/DocPage"
import DocSidebar from "@theme/DocSidebar"
import MDXComponents from "@theme/MDXComponents"
import NotFound from "@theme/NotFound"
import PageLayout from "@theme/PageLayout"

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

  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false)
  const [hiddenSidebar, setHiddenSidebar] = useState(false)
  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false)
    }

    setHiddenSidebarContainer(!hiddenSidebarContainer)

    if (
      !hiddenSidebar &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setHiddenSidebar(true)
    }
  }, [
    hiddenSidebar,
    hiddenSidebarContainer,
    setHiddenSidebar,
    setHiddenSidebarContainer,
  ])

  const handleTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (!event.currentTarget.classList.contains(styles.docSidebarContainer)) {
        return
      }

      if (hiddenSidebarContainer) {
        setHiddenSidebar(true)
      }
    },
    [hiddenSidebarContainer, setHiddenSidebar],
  )

  if (currentDocRoute == null) {
    return <NotFound location={location} {...rest} />
  }

  const sidebarName = permalinkToSidebar[currentDocRoute.path] as
    | string
    | undefined
  const sidebar = sidebarName != null ? docsSidebars[sidebarName] : []

  return (
    <PageLayout
      description={siteConfig.customFields.description}
      key={isClient.toString()}
      title="Introduction"
    >
      <div className={styles.doc}>
        {sidebarName != null && (
          <div
            className={clsx(styles.doc__sidebar, {
              [styles["doc__sidebar--hidden"]]: hiddenSidebarContainer,
            })}
            onTransitionEnd={handleTransitionEnd}
            role="complementary"
          >
            <DocSidebar
              key={
                // Reset sidebar state on sidebar changes
                // See https://github.com/facebook/docusaurus/issues/3414
                sidebarName
              }
              sidebar={sidebar}
              path={currentDocRoute.path}
              sidebarCollapsible={
                siteConfig.themeConfig?.sidebarCollapsible ?? true
              }
              onCollapse={toggleSidebar}
              isHidden={hiddenSidebar}
            />

            {hiddenSidebar && (
              <div
                className={styles.doc__expand}
                title="Expand sidebar"
                aria-label="Expand sidebar"
                tabIndex={0}
                role="button"
                onKeyDown={toggleSidebar}
                onClick={toggleSidebar}
              />
            )}
          </div>
        )}

        <main className={styles.doc__main}>
          <div
            className={clsx(
              "padding-vert--lg",
              "container",
              styles["doc__item-wrapper"],
              {
                [styles["doc__item-wrapper--enhanced"]]: hiddenSidebarContainer,
              },
            )}
          >
            <MDXProvider components={MDXComponents}>
              {renderRoutes(docRoutes)}
            </MDXProvider>
          </div>
        </main>
      </div>
    </PageLayout>
  )
}

export default DocPage
