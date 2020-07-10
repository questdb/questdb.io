module.exports = {
  title: 'Time series data, faster',
  tagline: 'QuestDB is an open-source database which makes time-series fast and easy',
  url: 'https://questdb.io',
  baseUrl: '/',
  favicon: 'img/favicon.png',
  organizationName: 'questdb', // Usually your GitHub org/user name.
  projectName: 'questdb', // Usually your repo name.
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-145747842-1',
      // Optional fields.
      anonymizeIP: true, // Should IPs be anonymized?
    },
    prism: {
      defaultLanguage: 'sql',
      theme: require('prism-react-renderer/themes/dracula'),
    },
    announcementBar: {
      id: 'support_us', // Any value that will identify this message.
      content:
          '<b> If you like QuestDB <br/> <emoji>⭐ </emoji> <a href="https://github.com/questdb/questdb" target="_blank">  Give us a star on GitHub </a> <emoji>⭐</emoji></b>',
      backgroundColor: '#0090c2', // Defaults to `#fff`.
      textColor: '#fefeff', // Defaults to `#000`.
    },
    algolia: {
      apiKey: 'b2a69b4869a2a85284a82fb57519dcda',
      indexName: 'questdb',
      algoliaOptions: {}, // Optional, if provided by Algolia
    },
    navbar: {
      title: 'QuestDB',
      logo: {
        alt: 'questdb Logo',
        src: 'img/favicon.png',
      },
      links: [
        {
          label: 'Install',
          position: 'left', // or 'right'
          items: [
            {
              label: 'Docker',
              href: '/docs/guideDocker',
            },
            {
              label: 'With the binaries',
              href: '/docs/guideBinaries',
            },
            {
              label: 'Homebrew',
              href: '/docs/guideHomebrew',
            },
          ]
        },
        {
          label: 'Concepts',
          position: 'left', // or 'right'
          items: [
            {
              label: 'Storage Model',
              href: '/docs/storageModel',
            },
            {
              label: 'SQL Extensions',
              href: '/docs/sqlExtensions',
            },
            {
              label: 'Designated Timestamp',
              href: '/docs/designatedTimestamp',
            },
            {
              label: 'Symbol',
              href: '/docs/symbol',
            },
            {
              label: 'Partitions',
              href: '/docs/partitions',
            },
            {
              label: 'Indexes',
              href: '/docs/indexes',
            }
          ]
        },
        {
          label: 'Use',
          position: 'left', // or 'right'
          items: [
            {
              label: 'Web Console',
              href: '/docs/consoleGuide',
            },
            {
              label: 'Postgres Wire protocol (alpha)',
              href: '/docs/guidePSQL',
            },
            {
              label: 'HTTP REST API',
              href: '/docs/guideREST',
            },
            {
              label: 'Java API',
              href: '/docs/embeddedJavaAPI',
            },
            {
              label: 'Influx Line protocol',
              href: '/docs/influxReference',
            },
          ]
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {to: 'docs/documentationOverview', label: 'Docs', position: 'right'},
        {to: 'https://github.com/questdb/questdb', label: 'Github', position: 'right'},
        {to: 'https://questdb.slack.com', label: 'Join Slack', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Style Guide',
              to: 'docs/',
            },
            {
              label: 'Second Doc',
              to: 'docs/doc2/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Slack',
              href: 'https://questdb.slack.com',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/questdb',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/questdb/questdb',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} QuestDB.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'doc1',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/questdb/questdb.io/edit/master/',
        },

        blog: {
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
          },
            showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
