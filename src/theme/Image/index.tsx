import React, { ComponentProps } from "react"

import Image from "@theme/IdealImage"

const IdealImage = ({
  src,
  ...props
}: ComponentProps<typeof Image> & { src: string }) => {
  if (process.env.NODE_ENV === "development") {
    return <img {...props} src={src} />
  }

  // eslint-disable-next-line
  return <Image {...props} />
}

export default IdealImage
