import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React from "react"

import useUserPreferencesContext from "@theme/hooks/useUserPreferencesContext"

import styles from "./styles.module.css"

const AnnouncementBar = () => {
  const {
    isAnnouncementBarClosed,
    closeAnnouncementBar,
  } = useUserPreferencesContext()
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context

  if (isAnnouncementBarClosed) {
    return null
  }

  return (
    <div className={styles.announcement} role="banner">
      <div className={styles.announcement__content}>
        If you like QuestDB,&nbsp;
        <Link
          className={styles.announcement__link}
          href={siteConfig.customFields.githubUrl}
        >
          give us a star on GitHub
        </Link>
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
