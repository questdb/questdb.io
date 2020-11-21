import clsx from "clsx"
import React from "react"

import styles from "./styles.module.css"

type Props = {
  alt: string
  margin: boolean
  shadow: boolean
  small: boolean
  src: string
  title?: string
}

const Screenshot = ({ alt, margin, shadow, small, src, title }: Props) => (
  <figure>
    <img
      alt={alt}
      className={clsx({
        [styles.margin]: margin,
        [styles.shadow]: shadow,
        [styles.small]: small,
        [styles.title]: title != null,
      })}
      src={src}
    />
    {title != null && (
      <figcaption className={styles.caption}>{title}</figcaption>
    )}
  </figure>
)

Screenshot.defaultProps = {
  margin: true,
  shadow: true,
  small: false,
}

export default Screenshot
