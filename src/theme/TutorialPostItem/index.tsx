import React from "react"
import clsx from "clsx"
import { MDXProvider } from "@mdx-js/react"

import Head from "@docusaurus/Head"
import useBaseUrl from "@docusaurus/useBaseUrl"
import Button from "@theme/Button"
import MDXComponents from "@theme/MDXComponents"

import type { Tutorial } from "../../assets/tutorials"
import styles from "./styles.module.css"

type Props = Readonly<{
  children?: React.ReactNode
  frontMatter: Tutorial["content"]["frontMatter"]
  isExternal?: boolean
  isTutorialPage?: boolean
  metadata: Tutorial["content"]["metadata"]
}>

function TutorialPostItem({
  children,
  frontMatter,
  metadata,
  isExternal = false,
  isTutorialPage = false,
}: Props) {
  const { permalink } = metadata
  const { content, description, title, image, keywords } = frontMatter
  const imageUrl = useBaseUrl(image ?? "/img/tutorial/placeholder.png")

  return (
    <>
      {!isTutorialPage && (
        <Head>
          {keywords != null && keywords.length > 0 && (
            <meta name="keywords" content={keywords.join(",")} />
          )}
          {image ?? <meta property="og:image" content={imageUrl} />}
          {image ?? <meta name="twitter:image" content={imageUrl} />}
          {image ?? (
            <meta name="twitter:image:alt" content={`Image for ${title}`} />
          )}
        </Head>
      )}

      {isTutorialPage ? (
        <Button
          className={clsx(styles.article)}
          variant="plain"
          {...{
            href: isExternal ? permalink : undefined,
            to: isExternal ? undefined : permalink,
          }}
          uppercase={false}
        >
          <img
            alt={title}
            className={clsx(styles.article__image)}
            src={imageUrl}
          />

          <span className={clsx(styles.article__content)}>
            <header>
              <h2 className={clsx("margin-bottom--sm", styles.title)}>
                {title}
              </h2>
            </header>

            <section className="markdown">
              <MDXProvider components={MDXComponents}>
                {isExternal ? content : description}
              </MDXProvider>
            </section>
          </span>
        </Button>
      ) : (
        <article className="margin-bottom--xl">
          <header>
            <h1 className="margin-bottom--sm">{title}</h1>
          </header>

          <section className="markdown">
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>
          </section>
        </article>
      )}
    </>
  )
}

export default TutorialPostItem
