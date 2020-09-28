/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/theme-classic" />
/// <reference types="@docusaurus/plugin-content-blog" />
/// <reference types="@docusaurus/plugin-content-docs" />
/// <reference types="@docusaurus/plugin-content-pages" />

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

  interface Ctx {
    siteConfig: Omit<DocusaurusConfig, "customFields" | "themeConfig"> & {
      customFields: {
        artifactHubUrl: string
        copyright: string
        crunchbaseUrl: string
        description: string
        dockerUrl: string
        domain: string
        githubOrgUrl: string
        githubUrl: string
        helmVersion: string
        oneLiner: string
        slackUrl: string
        twitterUrl: string
        version: string
      }
      themeConfig: {
        colorMode: { disableSwitch: boolean }
        footer: { copyright: string; title: string; links: Item[] }
        image: string
        navbar: {
          hideOnScroll: boolean
          items: ComponentProps<typeof NavbarItem>[]
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

declare module "@theme/IdealImage" {
  const out: (props: {
    alt: string
    className?: string
    img: string
  }) => JSX.Element
  export default out
}

declare module "*.png" {
  const img: string
  export default img
}
