const copyright = `Copyright © ${new Date().getFullYear()} QuestDB`
const githubUrl = "https://github.com/questdb/questdb"

module.exports = {
  title: "Time series data, faster",
  tagline:
    "QuestDB is an open-source database which makes time-series fast and easy",
  url: "https://questdb.io",
  baseUrl: "/",
  favicon: "img/favicon.png",
  organizationName: "QuestDB",
  projectName: "questdb",
  themeConfig: {
    announcementBar: {
      id: "github-star",
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    image: "img/questdbOg.png",
    gtag: {
      trackingID: "GTM-PVR7M2G",
      anonymizeIP: true,
    },
    prism: {
      defaultLanguage: "questdb-sql",
      theme: require("./src/prism-dracula"),
    },
    algolia: {
      apiKey: "b2a69b4869a2a85284a82fb57519dcda",
      indexName: "questdb",
      algoliaOptions: {},
    },
    navbar: {
      title: "",
      logo: {
        alt: "QuestDB Logo",
        src: "img/questdbLogo.svg",
      },
      links: [
        {
          label: "Install",
          position: "left",
          items: [
            {
              label: "Docker",
              to: "docs/guide/docker",
            },
            {
              label: "Homebrew",
              to: "docs/guide/homebrew",
            },
            {
              label: "From the binaries",
              to: "docs/guide/binaries",
            },
          ],
        },
        {
          label: "Documentation",
          position: "left",
          to: "docs/introduction",
        },
        {
          label: "Blog",
          to: "blog",
          position: "left",
        },
        {
          label: "Github",
          href: githubUrl,
          position: "right",
        },
        {
          label: "Join Slack",
          className: "join-slack",
          href: "https://questdb.slack.com",
          position: "right",
        },
      ],
    },
    footer: {
      links: [
        {
          title: "QuestDB",
          items: [
            {
              label: "Documentation",
              to: "docs/introduction",
            },
            {
              label: "Roadmap",
              href: "https://github.com/questdb/questdb/projects/3",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Slack",
              href: "https://questdb.slack.com",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/questdb",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: githubUrl,
            },
          ],
        },
      ],
      copyright,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          homePageId: "docs/introduction",
          sidebarPath: require.resolve("./sidebars.js"),
        },

        blog: {
          feedOptions: {
            type: "all",
            copyright,
          },
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/global.css"),
        },
      },
    ],
  ],
}
