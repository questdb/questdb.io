import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React from "react"

import useUserPreferencesContext from "@theme/hooks/useUserPreferencesContext"

import styles from "./styles.module.css"

const AnnouncementBar = () => {
  const {
    isAnnouncementBarClosed,
    closeAnnouncementBar,
  } = useUserPreferencesContext()
  const { siteConfig } = useDocusaurusContext()

  if (isAnnouncementBarClosed) {
    return null
  }

  return (
    <div className={styles.announcement} role="banner">
      <p className={styles.announcement__content}>
        If you like QuestDB,&nbsp;
        <a
          className={styles.announcement__link}
          href={siteConfig.customFields.githubUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          give us a star on GitHub
        </a>
        ! ⭐️
      </p>

      <button
        aria-label="Close"
        className={styles.announcement__close}
        onClick={closeAnnouncementBar}
        type="button"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}

export default AnnouncementBar
