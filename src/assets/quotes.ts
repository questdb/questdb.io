type Quote = {
  website: string
  logo: {
    alt: string
    src: string
    height: number
    width: number
  }
  text: string
  author: string
  role: string
  company: string
}

const quotes: Quote[] = [
  {
    website: "https://www.verizon.com/",
    logo: {
      alt: "Verizon logo",
      src: "/img/pages/customers/logos/verizon.png",
      height: 22,
      width: 100,
    },
    text:
      "Verizon Media serves close to a billion users at a rate of 500k queries per second. We use QuestDB to monitor metrics for autoscaling decisions within our Vespa engine that provides search, recommendation, and personalization via ML models and aggregations on continuously-changing data.",
    author: "Jon Bratseth",
    role: "VP Architect",
    company: "Verizon Media",
  },
  {
    website: "https://www.keplercheuvreux.com/en/",
    logo: {
      alt: "Kepler logo",
      src: "/img/pages/customers/logos/kepler.png",
      height: 34,
      width: 140,
    },
    text:
      "When we set out to design the next generation of our execution platform, one of our requirements was large-scale model calibration based on real-time market data streams. QuestDB allows us to derive quick insights on live and historical data that would not be achievable with other open source time series databases.",
    author: "Jean-Francois Perreton",
    role: "Head of Algo Quant",
    company: "Kepler Cheuvreux",
  },
  {
    website: "https://www.datron.com/",
    logo: {
      alt: "Datron logo",
      src: "/img/pages/customers/logos/datron.png",
      height: 19,
      width: 100,
    },
    text:
      "With QuestDB's turnkey solution in Docker, we quickly built a solid foundation for a data acquisition pipeline with billions of measurements.",
    author: "Andreas Landmann",
    role: "Director, Research & Technology",
    company: "DATRON",
  },
  {
    website: "https://www.ably.io/",
    logo: {
      alt: "Ably logo",
      src: "/img/pages/customers/logos/ably.svg",
      height: 28,
      width: 100,
    },
    text:
      "QuestDB allows me to build tools and systems without having to learn proprietary query languages while maintaining industry-leading performance and a straightforward setup.",
    author: "Ben Gamble",
    role: "Head of Dev Rel",
    company: "Ably",
  },
  {
    website: "https://toggle.ai/",
    logo: {
      alt: "Toggle logo",
      src: "/img/pages/customers/logos/toggle.svg",
      height: 18,
      width: 88,
    },
    text:
      "We switched from InfluxDB to QuestDB to get queries that are on average 300x faster utilizing 1/4 of the hardware, without ever overtaxing our servers.",
    author: "Armenak Mayalian",
    role: "CTO",
    company: "Toggle",
  },
  {
    website: "https://www.innova.com.tr/en/about-us/about-innova",
    logo: {
      alt: "Innova logo",
      src: "/img/pages/customers/logos/innova.png",
      height: 18,
      width: 88,
    },
    text:
      "QuestDB allows us to query data while writing millions of data points every few minutes. It is an excellent database for time-based calculation of records with static columns and can store the data very efficiently. QuestDB’s community is constantly growing and its popularity is on the rise.",
    author: "Erdem Aydemir",
    role: "Software Engineer",
    company: "Türk Telekom",
  },
  {
    website: "https://www.samtec.com/",
    logo: {
      alt: "Samtec logo",
      src: "/img/pages/customers/logos/samtec.png",
      height: 24,
      width: 81,
    },
    text:
      "QuestDB is the most promising open source platform for time series analytics. It's thoughtfully designed to be both wicked fast and easy to use.",
    author: "Nick Scolum",
    role: "Senior Software Engineer",
    company: "Samtec",
  },
  {
    website: "https://www.chainslayer.io/",
    logo: {
      alt: "ChainSlayer logo",
      src: "/img/pages/customers/logos/chainslayer.png",
      height: 24,
      width: 116,
    },
    text:
      "QuestDB is the cornerstone of our offering. The SQL interface with time series functions like ASOF join is brilliant. It’s speed and small footprint make it perfect for containerized environments. And the UI looks absolutely amazing.",
    author: "Tjerk Stroband",
    role: "CTO",
    company: "ChainSlayer",
  },
  {
    website: "https://www.counterflow.ai/",
    logo: {
      alt: "Counterflow AI logo",
      src: "/img/pages/customers/logos/counterflow.png",
      height: 34,
      width: 140,
    },
    text:
      "QuestDB is impressive and stands out as a superior option. Our intent is to integrate it with our SaaS offering and contribute to the project.",
    author: "Randy Caldejon",
    role: "CEO",
    company: "Counterflow AI",
  },
]

export default quotes
