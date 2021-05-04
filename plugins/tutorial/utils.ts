import fs from "fs-extra"
import globby from "globby"
import path from "path"

import { getContentPathList } from "@docusaurus/plugin-content-blog/lib/blogUtils"
import { LoadContext } from "@docusaurus/types"
import {
  aliasedSitePath,
  getFolderContainingFile,
  normalizeUrl,
  parseMarkdownFile,
} from "@docusaurus/utils"

import {
  DateLink,
  Tutorial,
  TutorialContent,
  TutorialContentPaths,
  TutorialPluginOptions,
} from "./types"

// YYYY-MM-DD-{name}.mdx?
const FILENAME_PATTERN = /^(\d{4}-\d{1,2}-\d{1,2})-?(.*?).mdx?$/

function toUrl({ date, link }: DateLink) {
  return `${date
    .toISOString()
    .substring(0, "2019-01-01".length)
    .replace(/-/g, "/")}/${link}`
}

export async function generateTutorial(
  contentPaths: TutorialContentPaths,
  { siteConfig, siteDir }: LoadContext,
  options: TutorialPluginOptions,
): Promise<Tutorial[]> {
  const routeBasePath = options.routeBasePath

  if (!fs.existsSync(contentPaths.contentPath)) {
    return []
  }

  const { baseUrl = "" } = siteConfig
  const sourceFiles = await globby(options.include, {
    cwd: contentPaths.contentPath,
  })

  const tutorials: Tutorial[] = []

  await Promise.all(
    sourceFiles.map(async (sourceFile: string) => {
      // Lookup in localized folder in priority
      const contentPath = await getFolderContainingFile(
        getContentPathList(contentPaths),
        sourceFile,
      )

      const source = path.join(contentPath, sourceFile)
      const aliasedSource = aliasedSitePath(source, siteDir)

      const relativePath = path.relative(siteDir, source)
      const fileName = path.basename(sourceFile)

      const { frontMatter: unsafeFrontMatter, content, excerpt } = await parseMarkdownFile(source)
      const frontMatter = unsafeFrontMatter as any; // TODO add validation + TS assertion?

      if (frontMatter.draft && process.env.NODE_ENV === "production") {
        return
      }

      let date
      // Extract date and title from filename.
      const match = fileName.match(FILENAME_PATTERN)
      let linkName = fileName.replace(/\.mdx?$/, "")

      if (match) {
        const [, dateString, name] = match
        date = new Date(dateString)
        linkName = name
      }

      // Prefer user-defined date.
      if (frontMatter.date) {
        date = new Date(frontMatter.date)
      }

      // Use file create time for tutorial
      date = date || (await fs.stat(source)).birthtime

      const slug =
        frontMatter.slug || (match ? toUrl({ date, link: linkName }) : linkName)
      frontMatter.title = frontMatter.title || linkName

      tutorials.push({
        id: frontMatter.slug || frontMatter.title,
        metadata: {
          permalink: normalizeUrl([baseUrl, routeBasePath, slug]),
          source: aliasedSource,
          description: frontMatter.description || excerpt,
          date,
          title: frontMatter.title,
          truncated: options.truncateMarker.test(content) || false,
        },
      })
    }),
  )

  tutorials.sort(
    (a, b) => b.metadata.date.getTime() - a.metadata.date.getTime(),
  )

  return tutorials
}
