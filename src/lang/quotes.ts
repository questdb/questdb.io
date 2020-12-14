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
    website: "https://www.datron.com/",
    logo: {
      alt: "Datron logo",
      src: "/img/pages/customers/logos/datron.png",
      height: 19,
      width: 100,
    },
    text:
      "At DATRON, we record features of our industry machine components (such as spindle RPM and temperature) at a very high frequency under lab conditions. With QuestDB’s turnkey solution via Docker, we have been able to quickly build a solid foundation for billions of measurements per day.",
    author: "Tim Borowski",
    role: "Software Engineer",
    company: "DATRON AG",
  },
  {
    website: "https://www.innova.com.tr/en",
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
    company: "Innova",
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
      "QuestDB is the most promising open source platform for time series analytics. It&apos;s thoughtfully designed to be both wicked fast and easy to use.",
    author: "Nick Scolum",
    role: "Senior Software Engineer",
    company: "Samtec",
  },
  {
    website: "https://razorpay.com/",
    logo: {
      alt: "Razorpay logo",
      src: "/img/pages/customers/logos/razorpay.svg",
      height: 24,
      width: 113,
    },
    text:
      "I am honestly impressed by the database’s performance and simplicity - we are thinking of moving some of our real time workloads to QuestDB.",
    author: "Venkatesan Vaidhyanathan",
    role: "Senior Technical Architect",
    company: "Razorpay",
  },
  {
    website: "https://chainslayer.io/",
    logo: {
      alt: "ChainSlayer logo",
      src: "/img/pages/customers/logos/chainslayer.png",
      height: 24,
      width: 116,
    },
    text:
      "QuestDB is the cornerstone of our offering. The SQL interface with timeseries functions like ASOF join is brilliant. It’s speed and small footprint make it perfect for containerized environments. And the UI looks absolutely amazing.",
    author: "Tjerk Stroband",
    role: "CTO",
    company: "ChainSlayer",
  },
  {
    website: "https://www.forrs.de/",
    logo: {
      alt: "FORRS logo",
      src: "/img/pages/customers/logos/forrs.svg",
      height: 16,
      width: 70,
    },
    text:
      "Working with QuestDB is a breeze. This innovative time-series database excels with integration into existing environments. Supporting multiple open interfaces, such REST and the PG wire protocol, while not relying on any client driver, makes it easy to work with the OS and language of choice.",
    author: "Marc Recht",
    role: "CTO",
    company: "FORRS Partners",
  },
]

export default quotes
