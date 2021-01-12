import React from "react"

import Layout from "@theme/Layout"
import Toc from "@theme/TOC"
import TutorialPostItem from "@theme/TutorialPostItem"

import type { Tutorial } from "../../assets/tutorials"

function TutorialPostPage({ content }: Tutorial) {
  const { frontMatter, metadata } = content
  const { title, description } = frontMatter
  const Content = (content as any) as React.ElementType

  return (
    <Layout
      title={title}
      description={description}
      wrapperClassName="blog-wrapper"
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <main className="col col--8">
            <TutorialPostItem frontMatter={frontMatter} metadata={metadata}>
              <Content />
            </TutorialPostItem>
          </main>
          {content.rightToc != null && (
            <div className="col col--2">
              <Toc headings={content.rightToc} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default TutorialPostPage
