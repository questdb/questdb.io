import clsx from "clsx"
import Link from "@docusaurus/Link"
import React from "react"

import sectionStyles from "../Section/styles.module.css"
import seenOnStyles from "./styles.module.css"

const SeenOn = () => (
  <section
    className={clsx(
      sectionStyles.section,
      sectionStyles["section--inner"],
      seenOnStyles.section,
    )}
  >
    <Link
      className={seenOnStyles["product-hunt"]}
      href="https://www.producthunt.com/posts/questdb?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-questdb"
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=224674&theme=dark&period=daily"
        alt="QuestDB - Fastest open source database for time-series and analytics | Product Hunt Embed"
        width="250px"
        height="54px"
      />
    </Link>
  </section>
)

export default SeenOn
