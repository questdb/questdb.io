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
      defaultLanguage: "sql",
      theme: require("prism-react-renderer/themes/dracula"),
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
              to: "docs/guideDocker",
            },
            {
              label: "With the binaries",
              to: "docs/guideBinaries",
            },
            {
              label: "Homebrew",
              to: "docs/guideHomebrew",
            },
          ],
        },
        {
          label: "Concepts",
          position: "left",
          items: [
            {
              label: "Storage Model",
              to: "docs/storageModel",
            },
            {
              label: "SQL Extensions",
              to: "docs/sqlExtensions",
            },
            {
              label: "Designated Timestamp",
              to: "docs/designatedTimestamp",
            },
            {
              label: "Symbol",
              to: "docs/symbol",
            },
            {
              label: "Partitions",
              to: "docs/partitions",
            },
            {
              label: "Indexes",
              to: "docs/indexes",
            },
          ],
        },
        {
          label: "Use",
          position: "left",
          items: [
            {
              label: "Web Console",
              to: "docs/usingWebConsole",
            },
            {
              label: "Postgres Wire protocol (alpha)",
              to: "docs/guidePSQL",
            },
            {
              label: "HTTP REST API",
              to: "docs/guideREST",
            },
            {
              label: "Java API",
              to: "docs/embeddedJavaAPI",
            },
            {
              label: "Influx Line protocol",
              to: "docs/influxReference",
            },
          ],
        },
        {
          label: "Blog",
          to: "blog",
          position: "left",
        },
        {
          label: "Docs",
          to: "docs/documentationOverview",
          position: "right",
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
              to: "docs",
            },
            // {
            //   label: "Download",
            //   to: "getstarted",
            // },
            {
              label: "Roadmap",
              href: "https://github.com/questdb/questdb/projects/3",
            },
            // {
            //   label: "About",
            //   to: "about",
            // },
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
          homePageId: "docs",
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
