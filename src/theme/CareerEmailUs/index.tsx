import React from "react"

import styles from "./styles.module.css"

type Props = {
  title: string
}

const CareerEmailUs = ({ title }: Props) => {
  return (
    <section className={styles.container}>
      <hr className={styles.separator} />
      <h4 className={styles.title}>Let’s get in touch</h4>
      <p className={styles.content}>
        Email us with &quot;{title}&quot; in the subject line. Attach any
        relevant links to your portfolio (LinkedIn, GitHub, personal website,
        etc.) and a few words about why you are interested in QuestDB.
      </p>
      <a
        className={styles.link}
        href={"mailto:careers@questdb.io?subject=" + title}
      >
        careers@questdb.io
      </a>
    </section>
  )
}

export default CareerEmailUs
