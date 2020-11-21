import React, { createContext, ReactNode, useContext } from "react"

type Metadata = {
  altFooter: boolean
  isBlogPost: boolean
}

type Props = Readonly<{
  children: ReactNode
  value?: Metadata
}>

const metadata: Metadata = {
  altFooter: false,
  isBlogPost: false,
}

const MetadataContext = createContext(metadata)

const useMetadataContext = () => useContext(MetadataContext)

export const MetadataContextProvider = ({ children, value }: Props) => (
  <MetadataContext.Provider value={value ?? metadata}>
    {children}
  </MetadataContext.Provider>
)

export default useMetadataContext
