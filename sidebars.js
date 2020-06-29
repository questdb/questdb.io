module.exports = {
    "docs": {
        "Guides": [
            "documentationOverview",
            {
                type: "category",
                label: "Setting up QuestDB",
                items: [
                    "guideDocker",
                    "guideHomebrew",
                    "guideBinaries"
                ]
            },
            {
                type: "category",
                label: "Using QuestDB",
                items: [
                    "usingWebConsole",
                    "guidePSQL",
                    "guideREST",
                    "crudOperations",
                    "myFirstDatabase"
                ]
            }
        ],
        "Concepts": [
            "storageModel",
            "designatedTimestamp",
            "sqlExtensions",
            "partitions",
            "symbol",
            "indexes",
            "sqlExecutionOrder"
        ],
        "Reference": [
            {
                type: "category",
                label: "Configuration",
                items: [
                    "datatypes",
                    "rootDirectoryStructure",
                    "serverConf"
                ]
            },
            {
                type: "category",
                label: "Interfaces",
                items: [
                    "dockerReference",
                    "homebrewReference",
                    "installFromBinary",
                    "consoleReference",
                    "influxReference"
                ]
            },
            {
                type: "category",
                label: "APIs",
                items: [
                    "restAPI",
                    "embeddedJavaAPI",
                    "influxSenderLibrary"
                ]
            },
            {
                type: "category",
                label: "Functions",
                items: [
                    "functionsAggregation",
                    "functionsNumeric",
                    "functionsDateAndTime",
                    "functionsRandomValueGenerators",
                    "functionsRowGenerator",
                    "functionsTimestampGenerator",
                    "functionsText",
                    "functionsMeta"
                ]
            },
            {
                type: "category",
                label: "SQL Reference",
                items: [
                    "sqlExecutionOrder",
                    "alterTableAddColumn",
                    "alterTableDropColumn",
                    "alterTableAlterColumnAddIndex",
                    "alterTableDropPartition",
                    "backup",
                    "case",
                    "cast",
                    "copy",
                    "createTable",
                    "distinct",
                    "fill",
                    "rename",
                    "drop",
                    "insert",
                    "joins",
                    "latestBy",
                    "limit",
                    "orderBy",
                    "sampleBy",
                    "select",
                    "show",
                    "timestamp",
                    "truncate",
                    "union",
                    "where"
                ]
            },
            {
                type: "category",
                label: "Java API Reference",
                items: [
                    "javaAPIOverview",
                    "influxSenderLibrary"
                ]
            }
        ]
    }
};


