import clsx from "clsx"
import React from "react"
import Layout from "@theme/Layout"
import { MDXProvider } from "@mdx-js/react"
import MDXComponents from "@theme/MDXComponents"
import type { Props } from "@theme/MDXPage"

const MDXPage = (
  props: Props & {
    content: {
      frontMatter: {
        wrapperClassname: string
      }
    }
  },
) => {
  const { content: MDXPageContent } = props
  const { frontMatter, metadata } = MDXPageContent
  const { title, description, wrapperClassname } = frontMatter
  const { permalink } = metadata

  return (
    <Layout
      title={title}
      description={description}
      permalink={permalink}
      /* @ts-ignore */
      wrapperClassname={clsx("container", "row", wrapperClassname)}
    >
      <main className="col col--8 col--offset-2">
        <div className="lg padding-vert--lg">
          <MDXProvider components={MDXComponents}>
            <MDXPageContent />
          </MDXProvider>
        </div>
      </main>
    </Layout>
  )
}

export default MDXPage
