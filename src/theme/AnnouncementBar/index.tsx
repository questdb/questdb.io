import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React from "react"

import useUserPreferencesContext from "@theme/hooks/useUserPreferencesContext"

import styles from "./styles.module.css"

const AnnouncementBar = () => {
  const {
    isAnnouncementBarClosed,
    closeAnnouncementBar,
  } = useUserPreferencesContext()

  if (isAnnouncementBarClosed) {
    return null
  }

  return (
    <div className={styles.announcement} role="banner">
      <div className={styles.announcement__content}>
        If you like QuestDB,&nbsp;
        <a
          className={styles.announcement__link}
          href="https://github.com/questdb/questdb"
          rel="noopener noreferrer"
          target="_blank"
        >
          give us a star on GitHub
        </a>
        &nbsp;⭐
      </div>

      <button
        aria-label="Close"
        type="button"
        className={styles.announcement__close}
        onClick={closeAnnouncementBar}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default AnnouncementBar
