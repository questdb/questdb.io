import clsx from "clsx"
import React, { ReactNode } from "react"

import styles from "./styles.module.css"

type Props = Readonly<{
  children: ReactNode
  className?: string
  icon?: ReactNode
  href?: string
  newTab: boolean
  onClick?: () => void
  size: "normal" | "small" | "xsmall"
  to?: string
  type?: "button" | "submit"
  uppercase: boolean
  variant: "primary" | "secondary" | "tertiary" | "plain"
}>

const Button = ({
  children,
  className,
  href,
  icon,
  newTab,
  onClick,
  size,
  to,
  type,
  uppercase,
  variant,
}: Props) => {
  const classes = clsx(className, styles.button, {
    [styles["button--icon"]]: icon != null,
    [styles["button--primary"]]: variant === "primary",
    [styles["button--secondary"]]: variant === "secondary",
    [styles["button--small"]]: size === "small",
    [styles["button--tertiary"]]: variant === "tertiary",
    [styles["button--plain"]]: variant === "plain",
    [styles["button--uppercase"]]: uppercase,
    [styles["button--xsmall"]]: size === "xsmall",
  })

  if (href != null) {
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        {...(newTab
          ? {
              rel: "noopener noreferrer",
              target: "_blank",
            }
          : {})}
      >
        {icon}
        {children}
      </a>
    )
  }

  if (to != null) {
    return (
      <a className={classes} href={to} onClick={onClick}>
        {icon}
        {children}
      </a>
    )
  }

  return (
    <button className={classes} onClick={onClick} type={type ?? "button"}>
      {icon}
      {children}
    </button>
  )
}

Button.defaultProps = {
  newTab: true,
  size: "normal",
  uppercase: true,
  variant: "primary",
}

export default Button
