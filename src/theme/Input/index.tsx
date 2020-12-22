import clsx from "clsx"
import React from "react"

import styles from "./styles.module.css"

type Props = Readonly<{
  className?: string
  name: string
  required?: boolean
  placeholder?: string
  type: "text" | "number" | "email"
}>

const Input = ({ className, name, placeholder, required, type }: Props) => {
  const classes = clsx(className, styles.input)

  return (
    <input
      className={classes}
      name={name}
      required={required}
      placeholder={placeholder}
      type={type}
    />
  )
}

Input.defaultProps = {
  type: "text",
}

export default Input
