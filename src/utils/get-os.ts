export type Os = "linux" | "bsd" | "macos" | "windows"

export const getOs = (): Os => {
  if (navigator.platform.indexOf("Win") !== -1) {
    return "windows"
  }

  if (navigator.platform.indexOf("Mac") !== -1) {
    return "macos"
  }

  if (navigator.platform.indexOf("Linux") !== -1) {
    return "linux"
  }

  if (navigator.platform.indexOf("BSD") !== -1) {
    return "bsd"
  }

  return "linux"
}
