import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

const usePrismTheme = () => {
  const { siteConfig } = useDocusaurusContext()

  return siteConfig.themeConfig.prism.theme
}

export default usePrismTheme
