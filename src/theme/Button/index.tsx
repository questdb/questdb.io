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
  uppercase: boolean
  variant: "primary" | "secondary" | "tertiary"
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
      <a
        className={classes}
        href={href}
        onClick={onClick}
        {...(newTab === true
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

  if (to) {
    return (
      <a className={classes} href={to} onClick={onClick}>
        {icon}
        {children}
      </a>
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
  newTab: true,
  size: "normal",
  uppercase: true,
  variant: "primary",
}

export default Button
