/* eslint-disable */
export type Release = {
  assets: {
    browser_download_url: string
    name: string
    size: number
  }[]
  html_url: string
  published_at: string
}
/* eslint-enable */

type Asset = {
  href?: string
  size?: string
}

export const getAssets = ({
  assets,
}: Release): { bsd: Asset; linux: Asset; noJre: Asset; windows: Asset } => {
  const bsdRaw = assets.find(({ name }) => name.includes("bsd"))
  const linuxRaw = assets.find(({ name }) => name.includes("linux"))
  const noJreRaw = assets.find(({ name }) => name.includes("no-jre"))
  const windowsRaw = assets.find(({ name }) => name.includes("win"))
  let bsd = {}
  let linux = {}
  let noJre = {}
  let windows = {}

  if (bsdRaw != null) {
    bsd = {
      href: bsdRaw.browser_download_url,
      size: `${(bsdRaw.size / 1e6).toPrecision(3)} MB`,
    }
  }

  if (linuxRaw != null) {
    linux = {
      href: linuxRaw.browser_download_url,
      size: `${(linuxRaw.size / 1e6).toPrecision(3)} MB`,
    }
  }

  if (noJreRaw != null) {
    noJre = {
      href: noJreRaw.browser_download_url,
      size: `${(noJreRaw.size / 1e6).toPrecision(2)} MB`,
    }
  }

  if (windowsRaw != null) {
    windows = {
      href: windowsRaw.browser_download_url,
      size: `${(windowsRaw.size / 1e6).toPrecision(3)} MB`,
    }
  }

  return { bsd, linux, noJre, windows }
}
