import clsx from "clsx"
import React from "react"

import styles from "./styles.module.css"

type Props = Readonly<{
  className?: string
  name: string
  pattern?: string
  placeholder?: string
  required?: boolean
  title?: string
  type: "text" | "number" | "email"
}>

const Input = ({
  className,
  name,
  pattern,
  placeholder,
  required,
  title,
  type,
}: Props) => {
  const classes = clsx(className, styles.input)

  return (
    <input
      className={classes}
      name={name}
      required={required}
      pattern={pattern}
      placeholder={placeholder}
      title={title}
      type={type}
    />
  )
}

Input.defaultProps = {
  type: "text",
}

export default Input
