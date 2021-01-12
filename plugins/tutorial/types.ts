export type TutorialContentPaths = {
  contentPath: string
  contentPathLocalized: string
}

export interface TutorialContent {
  tutorials: Tutorial[]
  tutorialList: TutorialList
}

export interface TutorialPluginOptions {
  id?: string
  path: string
  remarkPlugins: []
  routeBasePath: string
  include: string[]
  truncateMarker: RegExp
  tutorialListComponent: string
  tutorialPostComponent: string
  tutorialDescription: string
  tutorialTitle: string
}

export interface Tutorial {
  id: string
  metadata: MetaData
}

export interface TutorialListMetadata {
  permalink: string
  tutorialDescription: string
  tutorialTitle: string
}

export interface TutorialList {
  metadata: TutorialListMetadata
  items: string[]
}

export interface MetaData {
  permalink: string
  source: string
  description: string
  date: Date
  title: string
  truncated: boolean
}

export interface DateLink {
  date: Date
  link: string
}

export interface ItemsToMetadata {
  [key: string]: MetaData
}
