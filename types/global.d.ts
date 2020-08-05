interface Context {}

declare module "@generated/client-modules" {
  const clientModules: readonly any[]
  export default clientModules
}

declare module "@generated/docusaurus.config" {
  const config: any
  export default config
}

declare module "@generated/site-metadata" {
  const siteMetadata: any
  export default siteMetadata
}

declare module "@generated/registry" {
  const registry: {
    readonly [key: string]: [() => Promise<any>, string, string]
  }
  export default registry
}

declare module "@generated/routes" {
  type Route = {
    readonly path: string
    readonly component: any
    readonly exact?: boolean
  }
  const routes: Route[]
  export default routes
}

declare module "@generated/routesChunkNames" {
  const routesChunkNames: any
  export default routesChunkNames
}

declare module "@generated/globalData" {
  const globalData: any
  export default globalData
}

declare module "@theme/*"

declare module "@docusaurus/Head" {
  import lib from "@docusaurus/core/lib/client/exports/Head"
  const out: typeof lib
  export default out
}

declare module "@docusaurus/Link" {
  import lib from "@docusaurus/core/lib/client/exports/Link"
  import { ComponentProps } from "react"
  const out: (
    props: ComponentProps<typeof lib> & {
      className?: string
      onClick?: (event: MouseEvent<HTMLElement>) => void
    },
  ) => JSX.Element
  export default out
}

declare module "@docusaurus/renderRoutes" {
  import lib from "@docusaurus/core/lib/client/exports/renderRoutes"
  const out: typeof lib
  export default out
}

declare module "@docusaurus/router" {
  import lib, { matchPath } from "@docusaurus/core/lib/client/exports/router"
  const out: typeof lib
  export default out
  export { matchPath }
}

declare module "@docusaurus/useBaseUrl" {
  import lib from "@docusaurus/core/lib/client/exports/useBaseUrl"
  const out: typeof lib
  export default out
}

declare module "@docusaurus/useDocusaurusContext" {
  import { DocusaurusConfig, DocusaurusSiteMetadata } from "@docusaurus/types"

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
        copyright: string
        description: string
        dockerUrl: string
        githubUrl: string
        slackUrl: string
        twitterUrl: string
        version: string
      }
      themeConfig: {
        colorMode: { disableSwitch: boolean }
        footer: { copyright: string; title: string; links: Item[] }
        navbar: { title: string; hideOnScroll: boolean; items: string[] }
        sidebarCollapsible: boolean
      }
    }
    siteMetadata: DocusaurusSiteMetadata
    globalData: Record<string, any>
    isClient: boolean
  }
  const out: () => Ctx
  export default out
}

declare module "@docusaurus/useGlobalData" {
  import lib, {
    usePluginData,
  } from "@docusaurus/core/lib/client/exports/useGlobalData"
  const out: typeof lib
  export default out
  export { usePluginData }
}

declare module "@theme/hooks/useUserPreferencesContext" {
  import lib from "@docusaurus/theme-classic/src/theme/hooks/useUserPreferencesContext"
  const out: typeof lib
  export default out
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string }
  export default classes
}
