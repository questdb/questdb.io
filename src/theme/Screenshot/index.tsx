import clsx from "clsx"
import React from "react"
import styles from "./styles.module.css"

type Props = {
  alt: string
  margin: boolean
  shadow: boolean
  small: boolean
  src: string
}

const Screenshot = ({ alt, margin, shadow, small, src }: Props) => (
  <img
    alt={alt}
    className={clsx({
      [styles.margin]: margin,
      [styles.shadow]: shadow,
      [styles.small]: small,
    })}
    src={src}
  />
)

Screenshot.defaultProps = {
  margin: true,
  shadow: true,
  small: false,
}

export default Screenshot
