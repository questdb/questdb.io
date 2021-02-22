/* eslint-disable */
/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/theme-classic" />
/// <reference types="@docusaurus/plugin-content-blog" />
/// <reference types="@docusaurus/plugin-content-docs" />
/// <reference types="@docusaurus/plugin-content-pages" />
/* eslint-enable */

declare module "@docusaurus/useDocusaurusContext" {
  import { DocusaurusConfig, DocusaurusSiteMetadata } from "@docusaurus/types"
  import NavbarItem from "@theme/NavbarItem"
  import { ComponentProps } from "react"

  type Item = {
    href: string
    label: string
    title: string
    to: string
    items: Item[]
  }

  type Ctx = {
    siteConfig: Omit<DocusaurusConfig, "customFields" | "themeConfig"> & {
      customFields: {
        artifactHubUrl: string
        copyright: string
        crunchbaseUrl: string
        demoUrl: string
        description: string
        dockerUrl: string
        domain: string
        githubOrgUrl: string
        githubUrl: string
        helmVersion: string
        linkedInUrl: string
        oneLiner: string
        slackUrl: string
        stackoverflowUrl: string
        twitterUrl: string
        version: string
        videosUrl: string
      }
      themeConfig: {
        colorMode: { disableSwitch: boolean }
        footer: { copyright: string; title: string; links: Item[] }
        image: string
        navbar: {
          hideOnScroll: boolean
          items: Array<ComponentProps<typeof NavbarItem>>
          logo: { alt: string; src: string }
          title: string
        }
        prism: { theme: string }
        sidebarCollapsible: boolean
      }
    }
    siteMetadata: DocusaurusSiteMetadata
    globalData: Record<string, any>
    isClient: boolean
  }
  export default function (): Ctx
}

declare module "@docusaurus/useGlobalData" {
  import lib, {
    usePluginData,
  } from "@docusaurus/core/lib/client/exports/useGlobalData"
  const out: typeof lib
  export default out
  export { usePluginData }
}
