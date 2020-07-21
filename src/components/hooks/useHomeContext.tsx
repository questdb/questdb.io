import React, { createContext, ReactNode, useContext } from "react"

type Props = Readonly<{
  children: ReactNode
  value: boolean
}>

const HomeContext = createContext<HomeContext>(false)

export const HomeContextProvider = ({ children, value }) => (
  <HomeContext.Provider value={value}>{children}</HomeContext.Provider>
)

export const useHomeContext = () => useContext(HomeContext)
