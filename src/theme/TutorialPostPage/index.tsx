import React from "react"

import Layout from "@theme/Layout"
import Toc from "@theme/TOC"
import TutorialPostItem from "@theme/TutorialPostItem"

import type { Tutorial } from "../../assets/tutorials"

function TutorialPostPage({ content }: Tutorial) {
  const { frontMatter, metadata } = content
  const { description, title, image, keywords } = frontMatter
  const _keywords = [...(keywords ?? [])]
  const imageUrl = image ?? "/img/tutorial/placeholder.png"
  const Content = (content as any) as React.ElementType

  return (
    <Layout
      description={description}
      image={imageUrl}
      keywords={_keywords}
      title={title}
      wrapperClassName="blog-wrapper"
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <main className="col col--8">
            <TutorialPostItem frontMatter={frontMatter} metadata={metadata}>
              <Content />
            </TutorialPostItem>
          </main>
          {content.toc != null && (
            <div className="col col--2">
              <Toc toc={content.toc} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default TutorialPostPage
