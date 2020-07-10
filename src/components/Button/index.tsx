import clsx from "clsx"
import React, { ReactNode } from "react"

import Link from "@docusaurus/Link"

import styles from "./styles.module.css"

type Props = Readonly<{
  children: ReactNode
  className?: string
  icon: ReactNode
  href?: string
  onClick?: () => void
  size: "normal" | "small" | "xsmall"
  style: "primary" | "secondary" | "tertiary"
  to?: string
  uppercase: boolean
}>

const Button = ({
  children,
  className,
  href,
  icon,
  onClick,
  size,
  small,
  style,
  to,
  uppercase,
}: Props) => {
  const classes = clsx(className, styles.button, {
    [styles["button--icon"]]: !!icon,
    [styles["button--primary"]]: style === "primary",
    [styles["button--secondary"]]: style === "secondary",
    [styles["button--small"]]: size === "small",
    [styles["button--tertiary"]]: style === "tertiary",
    [styles["button--uppercase"]]: uppercase,
    [styles["button--xsmall"]]: size === "xsmall",
  })

  if (href) {
    return (
      <Link className={classes} href={href} onClick={onClick}>
        {icon}
        {children}
      </Link>
    )
  }

  if (to) {
    return (
      <Link className={classes} to={to} onClick={onClick}>
        {icon}
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} onClick={onClick}>
      {icon}
      {children}
    </button>
  )
}

Button.defaultProps = { size: "normal", style: "primary", uppercase: true }

export default Button
