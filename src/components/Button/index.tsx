import clsx from "clsx"
import Link from "@docusaurus/Link"
import React, { ReactNode } from "react"

import styles from "./styles.module.css"

type Props = Readonly<{
  children: ReactNode
  className?: string
  icon?: ReactNode
  href?: string
  onClick?: () => void
  size: "normal" | "small" | "xsmall"
  to?: string
  uppercase: boolean
  variant: "primary" | "secondary" | "tertiary"
}>

const Button = ({
  children,
  className,
  href,
  icon,
  onClick,
  size,
  to,
  uppercase,
  variant,
}: Props) => {
  const classes = clsx(className, styles.button, {
    [styles["button--icon"]]: !!icon,
    [styles["button--primary"]]: variant === "primary",
    [styles["button--secondary"]]: variant === "secondary",
    [styles["button--small"]]: size === "small",
    [styles["button--tertiary"]]: variant === "tertiary",
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
      <Link className={classes} onClick={onClick} to={to}>
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

Button.defaultProps = {
  size: "normal",
  uppercase: true,
  variant: "primary",
}

export default Button
