import React, { createContext, ReactNode, useContext } from "react"

type Props = Readonly<{
  children: ReactNode
  value?: boolean
}>

const HomeContext = createContext<boolean>(false)

export const HomeContextProvider = ({ children, value }: Props) => (
  <HomeContext.Provider value={value || false}>{children}</HomeContext.Provider>
)

export const useHomeContext = () => useContext<boolean>(HomeContext)
