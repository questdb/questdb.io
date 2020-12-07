let guidelines

if (process.env.NODE_ENV === "development") {
  guidelines = {
    label: "Guidelines (DEV ONLY)",
    type: "category",
    items: [
      {
        type: "category",
        label: "Templates",
        items: [
          "__guidelines/template/guide",
          "__guidelines/template/function",
          "__guidelines/template/sql",
        ],
      },
      "__guidelines/naming-convention",
      "__guidelines/content-hierarchy",
      "__guidelines/lexicon",
      "__guidelines/markdown",
      "__guidelines/sql-code-blocks",
      "__guidelines/influences",
    ],
  }
}

module.exports = {
  docs: [
    guidelines,
    {
      id: "introduction",
      type: "doc",
    },
    {
      label: "Concepts",
      type: "category",
      items: [
        "concept/storage-model",
        "concept/designated-timestamp",
        "concept/sql-extensions",
        "concept/partitions",
        "concept/symbol",
        "concept/indexes",
        "concept/root-directory-structure",
      ],
    },
    {
      label: "Get Started",
      type: "category",
      items: [
        "get-started/docker",
        "get-started/binaries",
        "get-started/homebrew",
        "get-started/first-database",
      ],
    },
    {
      label: "Develop",
      type: "category",
      items: [
        "develop/connect",
        "develop/insert-data",
        "develop/query-data",
        "develop/authenticate",
      ],
    },
    {
      label: "Third-party Tools",
      type: "category",
      items: [
        "third-party-tools/kafka"
      ],
    },
    {
      label: "Operations",
      type: "category",
      items: [
        "operations/deployment",
        "operations/health-monitoring"
      ],
    },
    {
      label: "Reference",
      type: "category",
      items: [
        {
          type: "category",
          label: "API",
          items: [
            "reference/api/rest",
            "reference/api/postgres",
            "reference/api/influxdb",
            "reference/api/java-embedded",
          ],
        },
        {
          type: "category",
          label: "Clients",
          items: ["reference/client/cli", "reference/client/web-console", "reference/client/grafana",],
        },
        {
          id: "reference/configuration",
          type: "doc",
        },
        {
          type: "category",
          label: "Functions",
          items: [
            "reference/function/aggregation",
            "reference/function/date-time",
            "reference/function/meta",
            "reference/function/numeric",
            "reference/function/random-value-generator",
            "reference/function/row-generator",
            "reference/function/text",
            "reference/function/timestamp-generator",
            "reference/function/timestamp",
          ],
        },
        {
          type: "category",
          label: "SQL",
          items: [
            "concept/sql-execution-order",
            "reference/sql/datatypes",
            "reference/sql/alter-table-add-column",
            "reference/sql/alter-table-alter-column-add-index",
            "reference/sql/alter-table-drop-column",
            "reference/sql/alter-table-drop-partition",
            "reference/sql/backup",
            "reference/sql/case",
            "reference/sql/cast",
            "reference/sql/copy",
            "reference/sql/create-table",
            "reference/sql/distinct",
            "reference/sql/except-intersect",
            "reference/sql/fill",
            "reference/sql/drop",
            "reference/sql/group-by",
            "reference/sql/insert",
            "reference/sql/join",
            "reference/sql/latest-by",
            "reference/sql/limit",
            "reference/sql/order-by",
            "reference/sql/rename",
            "reference/sql/sample-by",
            "reference/sql/select",
            "reference/sql/show",
            "reference/sql/truncate",
            "reference/sql/union",
            "reference/sql/where",
            "reference/sql/with",
          ],
        },
      ],
    },
  ].filter(Boolean),
}
