import type { Content, FrontMatter, Metadata } from "@theme/BlogPostPage"

type FlatTutorial = FrontMatter &
  Readonly<{
    content: string
    date: string
    link: string
    featured?: boolean
  }>

const tutorials: FlatTutorial[] = [
  {
    author: "Gábor Boros",
    date: "2021-01-13",
    content:
      "This detailed tutorial shows how to use QuestDB in a robust application status page and includes a repository with the example code ready to deploy.",
    link:
      "https://gabor-boros.medium.com/monitoring-the-uptime-of-an-application-with-python-nuxt-js-and-questdb-cbe7c050072d",
    title: "Monitoring the uptime of an application with Python, Nuxt.js and QuestDB",
    featured: true,
    image: "/img/tutorial/2021-01-13/banner.jpg",
  },
  {
    author: "Kovid Rathee",
    date: "2021-01-11",
    content:
      "A short hands-on tutorial on how to use SQL extensions built for time-series data in QuestDB.",
    link:
      "https://towardsdatascience.com/sql-extensions-for-time-series-data-in-questdb-f6b53acf3213",
    title: "SQL Extensions for Time-Series Data in QuestDB",
    featured: true,
    image: "/img/tutorial/2021-01-11/banner.jpg",
  },
  {
    author: "Kovid Rathee",
    date: "2020-12-17",
    content:
      "How to ingest schemaless data into QuestDB from Python using QuestDB's InfluxDB line protocol support.",
    link:
      "https://towardsdatascience.com/schemaless-ingestion-in-questdb-using-influxdb-line-protocol-18850e69b453?gi=113183e2c22b",
    title: "Schemaless ingestion in QuestDB using InfluxDB Line Protocol",
    featured: true,
    image: "/img/tutorial/2020-12-17/banner.jpg",
  },
  {
    author: "Chankey Pathak",
    date: "2020-10-20",
    content: "Learn how to create tables in QuestDB, insert data, and plot charts with matplotlib in Python via a Jupyter Notebook.",
    link: "https://tutswiki.com/setup-access-questdb-python-notebook/",
    title: "Setup and access QuestDB in Python using a Jupyter Notebook",
  },
  {
    author: "Suresh Regmi",
    date: "2020-08-31",
    content:
      "An overview of the features of QuestDB with a list of benefits and example use cases describing when it's appropriate to use a time-series database.",
    link: "https://www.turtle-techies.com/checking-out-quest-db/",
    title: "Checking Out QuestDB",
  },
  {
    author: "David G. Simmons",
    date: "2020-08-25",
    content:
      "In this video, David describes why a performant time-series database is critical for IoT use cases and shows how to set up and use QuestDB for ingesting sensor data from Arduino boards.",
    link: "https://www.youtube.com/watch?v=5IsPIpcVCoE",
    title: "Sending IoT Data from Arduino to QuestDB",
  },
  {
    author: "David McKay",
    date: "2020-08-24",
    content:
      "How to setup QuestDB with Kubernetes and write data using the InfluxDB line protocol ingestion feature.",
    link: "https://rawkode.com/articles/questdb-on-kubernetes/",
    title: "QuestDB on Kubernetes",
  },
  {
    author: "David G. Simmons",
    date: "2020-08-13",
    content:
      "How do you get the most out of your IoT data? Listen and watch as David Simmons answers this question and more during this Virtual Lunch & Learn session!",
    link: "https://www.youtube.com/watch?v=RseiLoBRcAg",
    title: "QuestDB virtual lunch and learn",
  },
  {
    author: "David G. Simmons",
    date: "2020-06-26",
    content:
      "It's one thing to send data to your database, but being able to visualize that data is the next logical step. So let's dive right into doing that.",
    link: "https://dev.to/davidgs/a-questdb-dashboard-with-node-red-524h",
    title: "A QuestDB Dashboard with Node-Red",
  },
  {
    author: "David G. Simmons",
    date: "2020-06-20",
    content: "Tutorial for creating tables in QuestDB, generating data, using Pandas to read dataframes, and plotting charts using matplotlib via a Jupyter Notebook.",
    link: "https://dzone.com/articles/questdb-tutorial-for-python",
    title: "QuestDB Tutorial for Python",
  },
  {
    author: "David G. Simmons",
    date: "2020-06-19",
    content:
      "In this video, David shows how to set up QuestDB on a Raspberry Pi and ingest and query IoT sensor data.",
    link: "https://www.youtube.com/watch?v=wjkDbgi_mec",
    title: "Running QuestDB on Raspberry Pi and K8s Networking",
  },
]

export type Tutorial = Readonly<{
  content: Readonly<{
    frontMatter: Omit<FlatTutorial, "link" | "date"> & { description?: string }
    metadata: Omit<Metadata, "title" | "tags"> & { truncated?: string }
    rightToc?: Content["rightToc"]
  }>
  external: true
}>

const normalize = (data: FlatTutorial[]): Tutorial[] =>
  data.map(({ author, content, date, featured, image, link, title }) => ({
    content: {
      frontMatter: {
        author,
        content,
        featured,
        image,
        title,
      },
      metadata: {
        date,
        permalink: link,
        truncated: "true",
      },
    },
    external: true,
  }))

export default normalize(tutorials)
