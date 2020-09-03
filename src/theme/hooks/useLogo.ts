import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import useBaseUrl from "@docusaurus/useBaseUrl"
import type { useLogoReturns } from "@theme/hooks/useLogo"

const useLogo = (): useLogoReturns => {
  const {
    siteConfig: {
      themeConfig: {
        navbar: { logo },
      },
    },
  } = useDocusaurusContext()
  const logoLink = useBaseUrl("/")
  const logoImageUrl = useBaseUrl(logo.src)

  return {
    logoLink,
    logoLinkProps: {},
    logoImageUrl,
    logoAlt: logo.alt,
  }
}

export default useLogo
