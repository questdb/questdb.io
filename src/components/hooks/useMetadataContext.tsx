import React, { createContext, ReactNode, useContext } from "react"

type Metadata = {
  altFooter: boolean
}

type Props = Readonly<{
  children: ReactNode
  value?: Metadata
}>

const metadata: Metadata = {
  altFooter: false,
}

const MetadataContext = createContext(metadata)

export const MetadataContextProvider = ({ children, value }: Props) => (
  <MetadataContext.Provider value={value || metadata}>
    {children}
  </MetadataContext.Provider>
)

export const useMetadataContext = () => useContext(MetadataContext)
