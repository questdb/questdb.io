import React, { ReactNode, useEffect } from "react"

import ThemeContext from "@theme/ThemeContext"

type Props = Readonly<{
  children: ReactNode
}>

const noop = () => {}
const theme = {
  isDarkTheme: true,
  setDarkTheme: noop,
  setLightTheme: noop,
}

const ThemeProvider = ({ children }: Props) => {
  useEffect(() => {
    localStorage.setItem("theme", "dark")
    document.documentElement.setAttribute("data-theme", "dark")
  }, [])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
