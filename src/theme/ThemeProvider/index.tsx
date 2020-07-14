import React, { useEffect } from "react"

import ThemeContext from "@theme/ThemeContext"

const noop = () => {}
const theme = {
  isDarkTheme: true,
  setDarkTheme: noop,
  setLightTheme: noop,
}

const ThemeProvider = ({ children }) => {
  useEffect(() => {
    localStorage.setItem("theme", "dark")
    document.documentElement.setAttribute("data-theme", "dark")
  }, [])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
