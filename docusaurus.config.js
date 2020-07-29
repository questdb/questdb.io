const visit = require("unist-util-visit")

const customFields = {
  copyright: `Copyright © ${new Date().getFullYear()} QuestDB`,
  dockerUrl: "https://hub.docker.com/r/questdb/questdb",
  githubUrl: "https://github.com/questdb/questdb",
  slackUrl:
    "https://questdb.slack.com/join/shared_invite/enQtNzk4Nzg4Mjc2MTE2LTEzZThjMzliMjUzMTBmYzVjYWNmM2UyNWJmNDdkMDYyZmE0ZDliZTQxN2EzNzk5MDE3Zjc1ZmJiZmFiZTIwMGY#/",
  twitterUrl: "https://twitter.com/questdb",
  version: "5.0.2",
}

function variable() {
  const RE_VAR = /{@([\w-_]+)@}/g
  const getVariable = (full, partial) =>
    partial ? customFields[partial] : full

  function textVisitor(node) {
    node.value = node.value.replace(RE_VAR, getVariable)
  }

  function linkVisitor(node) {
    node.url = node.url.replace(RE_VAR, getVariable)

    if (node.title) {
      node.title = node.title.replace(RE_VAR, getVariable)
    }
  }

  function transformer(ast) {
    visit(ast, "text", textVisitor)
    visit(ast, "code", textVisitor)
    visit(ast, "link", linkVisitor)
  }

  return transformer
}

module.exports = {
  title: "Time series data, faster",
  tagline: "QuestDB is the fastest open source time series database",
  url: "https://v2.questdb.io",
  baseUrl: "/",
  favicon: "img/favicon.png",
  organizationName: "QuestDB",
  projectName: "questdb",
  customFields,
  plugins: [
    require.resolve("./plugins/fetch-release"),
    require.resolve("./plugins/lint"),
  ],
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
    },
    navbar: {
      title: " ",
      logo: {
        alt: "QuestDB Logo",
        src: "img/questdbLogo.svg",
      },
      items: [
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
          activeBasePath: "docs",
        },
        {
          label: "Blog",
          to: "blog",
          position: "left",
        },
        {
          label: "Github",
          href: customFields.githubUrl,
          position: "right",
        },
        {
          label: "Join Slack",
          className: "join-slack",
          href: customFields.slackUrl,
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
              href: `${customFields.githubUrl}/projects/3`,
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Slack",
              href: customFields.slackUrl,
            },
            {
              label: "Twitter",
              href: customFields.twitterUrl,
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
              href: customFields.githubUrl,
            },
          ],
        },
      ],
      copyright: customFields.copyright,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          homePageId: "docs/introduction",
          remarkPlugins: [variable],
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: {
          remarkPlugins: [variable],
          feedOptions: {
            type: "all",
            copyright: customFields.copyright,
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
