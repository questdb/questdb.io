import clsx from "clsx"
import Link from "@docusaurus/Link"
import React, { ReactNode } from "react"

import Button from "../Button"
import binaryStyles from "./styles.module.css"

type Props = Readonly<{
  architecture: boolean
  children: ReactNode
  href?: string
  logo: ReactNode
  rt: boolean
  size?: string
  title: string
}>

const Binary = ({
  architecture,
  children,
  href,
  logo,
  rt,
  size,
  title,
}: Props) => {
  return (
    <section className={clsx(binaryStyles.binary)}>
      <div>{logo}</div>

      <h3 className={binaryStyles.binary__title}>{title}</h3>

      <div className={binaryStyles.binary__details}>
        <span
          className={clsx("color--pink", binaryStyles.binary__architecture)}
        >
          {architecture && "64-bit"}
        </span>

        <span className={binaryStyles.binary__size}>
          {rt && " rt -"}
          {size && ` ${size}`}
        </span>
      </div>

      {href && (
        <Button
          className={binaryStyles.binary__download}
          href={href}
          style="tertiary"
        >
          Download
        </Button>
      )}

      {children}
    </section>
  )
}

Binary.defaultProps = {
  architecture: false,
  rt: false,
}

export default Binary
