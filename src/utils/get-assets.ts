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

export const getAssets = (
  release: Release,
): { bsd: Asset; linux: Asset; noJre: Asset; windows: Asset } => {
  const bsdRaw = release.assets.find(({ name }) => name.indexOf("bsd") !== -1)
  const linuxRaw = release.assets.find(
    ({ name }) => name.indexOf("linux") !== -1,
  )
  const noJreRaw = release.assets.find(
    ({ name }) => name.indexOf("no-jre") !== -1,
  )
  const windowsRaw = release.assets.find(
    ({ name }) => name.indexOf("win") !== -1,
  )
  let bsd = {}
  let linux = {}
  let noJre = {}
  let windows = {}

  if (bsdRaw) {
    bsd = {
      href: bsdRaw.browser_download_url,
      size: `${(bsdRaw.size / 1e6).toPrecision(3)} MB`,
    }
  }

  if (linuxRaw) {
    linux = {
      href: linuxRaw.browser_download_url,
      size: `${(linuxRaw.size / 1e6).toPrecision(3)} MB`,
    }
  }

  if (noJreRaw) {
    noJre = {
      href: noJreRaw.browser_download_url,
      size: `${(noJreRaw.size / 1e6).toPrecision(2)} MB`,
    }
  }

  if (windowsRaw) {
    windows = {
      href: windowsRaw.browser_download_url,
      size: `${(windowsRaw.size / 1e6).toPrecision(3)} MB`,
    }
  }

  return { bsd, linux, noJre, windows }
}
