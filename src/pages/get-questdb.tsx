import clsx from "clsx"
import { differenceInDays, format, formatDistanceToNowStrict } from "date-fns"
import DocusaurusHead from "@docusaurus/Head"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { usePluginData } from "@docusaurus/useGlobalData"
import React, { ReactNode, useEffect, useState } from "react"

import Button from "@theme/Button"
import CodeBlock from "@theme/CodeBlock"
import IdealImage from "@theme/Image"
import Layout from "@theme/Layout"
import { MetadataContextProvider } from "@theme/useMetadataContext"

import Console from "../../static/img/pages/getQuestdb/console.png"
import biCss from "../css/get-questdb/binary.module.css"
import chCss from "../css/get-questdb/changelog.module.css"
import ctCss from "../css/get-questdb/cta.module.css"
import heCss from "../css/get-questdb/help.module.css"
import ilCss from "../css/get-questdb/illustration.module.css"
import seCss from "../css/section.module.css"
import { getAssets, getOs, Os, Release } from "../utils"

type BinaryProps = Readonly<{
  architecture: boolean
  basis: string
  children?: ReactNode
  detailsGrow: number
  grow: number
  href?: string
  logo: ReactNode
  rt: boolean
  size?: string
  title: string
}>

const Binary = ({
  architecture,
  basis,
  children,
  detailsGrow,
  grow,
  href,
  logo,
  rt,
  size,
  title,
}: BinaryProps) => {
  const hasDetails = Boolean(architecture || rt || size)

  return (
    <section className={clsx(biCss.binary)}>
      <div className={biCss.binary__expand} style={{ flexBasis: basis }} />

      {logo}

      <h3
        className={clsx(biCss.binary__title, {
          [biCss["binary__title--grow"]]: !hasDetails,
        })}
        style={{ flexGrow: grow }}
      >
        {title}
      </h3>

      {hasDetails && (
        <p className={biCss.binary__details} style={{ flexGrow: detailsGrow }}>
          {architecture && (
            <span className={clsx("color--pink", biCss.binary__architecture)}>
              64-bit
            </span>
          )}

          <span className={biCss.binary__size}>
            {rt && " rt -"}
            {size != null && ` ${size}`}
          </span>
        </p>
      )}

      {href != null && (
        <Button
          className={biCss.binary__download}
          href={href}
          newTab={false}
          variant="tertiary"
        >
          Download
        </Button>
      )}

      {children}
    </section>
  )
}

Binary.defaultProps = {
  architecture: false,
  basis: "auto",
  detailsGrow: 1,
  grow: 0,
  rt: false,
}

const GetQuestdbPage = () => {
  const title = "Download QuestDB"
  const description =
    "Download QuestDB, an open source time series SQL database for fast ingestion and queries"
  const { siteConfig } = useDocusaurusContext()
  const { release } = usePluginData<{ release: Release }>("fetch-release")
  const [os, setOs] = useState<Os | undefined>()
  const [releaseDate, setReleaseDate] = useState(
    format(new Date(release.published_at), "MMMM M, yyyy"),
  )
  const assets = getAssets(release)

  useEffect(() => {
    const isClient = typeof window !== "undefined"

    if (!isClient) {
      return
    }

    if (differenceInDays(new Date(), new Date(release.published_at)) < 31) {
      setReleaseDate(
        `${formatDistanceToNowStrict(new Date(release.published_at))} ago`,
      )
    }
    setOs(getOs())
  }, [release.published_at])

  const perOs = {
    bsd: (
      <Binary
        architecture
        href={assets.bsd.href}
        logo={
          <img
            alt="BSD Logo"
            className={biCss.binary__logo}
            src="/img/pages/getQuestdb/bsd.svg"
          />
        }
        rt
        size={assets.bsd.size}
        title="FreeBSD"
      >
        <p className={biCss.binary__docs}>
          <a href="/docs/get-started/binaries#your-operating-system-version">
            Docs
          </a>
        </p>
      </Binary>
    ),
    linux: (
      <Binary
        architecture
        href={assets.linux.href}
        logo={
          <img
            alt="Linux Logo"
            className={biCss.binary__logo}
            src="/img/pages/getQuestdb/linux.svg"
          />
        }
        rt
        size={assets.linux.size}
        title="Linux"
      >
        <p className={biCss.binary__docs}>
          <a href="/docs/get-started/binaries#your-operating-system-version">
            Docs
          </a>
        </p>
      </Binary>
    ),
    macos: (
      <Binary
        basis="15px"
        grow={1}
        logo={
          <img
            alt="macOS Logo"
            className={biCss.binary__logo}
            src="/img/pages/getQuestdb/macos.svg"
          />
        }
        title="macOS (via Homebrew)"
      >
        <div />

        <CodeBlock className="language-shell">
          {`brew update
brew install questdb`}
        </CodeBlock>

        <p className={biCss.binary__docs}>
          <a href="/docs/get-started/homebrew">Docs</a>
        </p>
      </Binary>
    ),
    windows: (
      <Binary
        architecture
        href={assets.windows.href}
        logo={
          <img
            alt="Windows Logo"
            className={biCss.binary__logo}
            src="/img/pages/getQuestdb/windows.svg"
          />
        }
        rt
        size={assets.windows.size}
        title="Windows"
      >
        <p className={biCss.binary__docs}>
          <a href="/docs/get-started/binaries#your-operating-system-version">
            Docs
          </a>
        </p>
      </Binary>
    ),
  }

  useEffect(() => {
    const isClient = typeof window !== "undefined"

    if (!isClient) {
      return
    }

    setOs(getOs())
  }, [])

  return (
    <MetadataContextProvider>
      <Layout description={description} title={title}>
        <DocusaurusHead>
          <link rel="canonical" href={`${siteConfig.url}get-questdb/`} />
          <meta name="description" content={description} />
        </DocusaurusHead>

        <section
          className={clsx(seCss["section--inner"], seCss["section--accent"])}
        >
          <div className={seCss.section__header}>
            <h1
              className={clsx(
                seCss.section__title,
                seCss["section__title--accent"],
              )}
            >
              Download QuestDB
            </h1>

            <p
              className={clsx(
                seCss.section__subtitle,
                seCss["section__subtitle--accent"],
                "text--center",
              )}
            >
              You can find below download links for the latest version of
              QuestDB ({siteConfig.customFields.version}). Once your download is
              finished, you can check our documentation for{" "}
              <a href="/docs/get-started/docker/">Docker</a>, the{" "}
              <a href="/docs/get-started/binaries/">binaries</a> or{" "}
              <a href="/docs/get-started/homebrew/">Homebrew</a> to get started.
            </p>

            <IdealImage
              alt="Screenshot of the Web Console showing various SQL statements and the result of one as a chart"
              className={ilCss.illustration}
              img={Console}
              src="/img/pages/getQuestdb/console.png"
            />

            <div className={ctCss.cta}>
              <p
                className={clsx(ctCss.cta__details, {
                  [ctCss["cata__details--download"]]: os !== "macos",
                })}
              >
                Latest Release:&nbsp;
                <span className="color--pink">
                  {siteConfig.customFields.version}
                </span>
                &nbsp;({releaseDate})
              </p>
              {os != null && os !== "macos" && assets[os] && (
                <Button href={assets[os].href} newTab={false}>
                  {os}&nbsp;Download
                </Button>
              )}
            </div>

            <div className={chCss.changelog}>
              <a
                className={chCss.changelog__link}
                href={release.html_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                View the changelog
              </a>
              <a
                className={chCss.changelog__link}
                href={`${siteConfig.customFields.githubUrl}/tags`}
                rel="noopener noreferrer"
                target="_blank"
              >
                View previous releases
              </a>
            </div>
          </div>
        </section>

        <div className={seCss["section--binaries"]}>
          <Binary
            basis="40px"
            grow={2.6}
            logo={
              <img
                alt="Docker logo"
                className={biCss.binary__logo}
                src="/img/pages/getQuestdb/docker.svg"
              />
            }
            title="Docker"
          >
            <CodeBlock className="language-shell">
              docker run -p 9000:9000 questdb/questdb
            </CodeBlock>
            <p className={biCss.binary__docs}>
              <a href="/docs/get-started/docker">Docs</a>
            </p>
          </Binary>
          <Binary
            grow={0.6}
            logo={
              <img
                alt="Helm logo"
                className={biCss.binary__logo}
                src="/img/pages/getQuestdb/helm.svg"
              />
            }
            title="Kubernetes (via Helm)"
          >
            <CodeBlock className="language-shell">
              {`helm repo add questdb https://helm.${siteConfig.customFields.domain}/
helm install questdb/questdb --version ${siteConfig.customFields.helmVersion}`}
            </CodeBlock>
            <p className={biCss.binary__docs}>
              <a
                href={siteConfig.customFields.artifactHubUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Docs
              </a>
            </p>
          </Binary>
          {os != null ? (
            <>
              {perOs[os]}
              {os !== "linux" && perOs.linux}
              {os !== "macos" && perOs.macos}
              {os !== "windows" && perOs.windows}
              {os !== "bsd" && perOs.bsd}
            </>
          ) : (
            <>
              {perOs.linux}
              {perOs.macos}
              {perOs.windows}
              {perOs.bsd}
            </>
          )}
          <Binary
            architecture
            detailsGrow={3.5}
            href={assets.noJre.href}
            logo={
              <img
                alt="Planet with wings"
                className={biCss.binary__logo}
                src="/img/pages/getQuestdb/nojre.svg"
              />
            }
            size={assets.noJre.size}
            title="Any (no JVM)"
          >
            <p className={biCss.binary__docs}>
              <a href="/docs/get-started/binaries#any-no-jvm-version">Docs</a>
            </p>
          </Binary>
          <Binary
            grow={0.5}
            logo={
              <img
                alt="Maven logo"
                className={biCss.binary__logo}
                src="/img/pages/getQuestdb/maven.svg"
              />
            }
            title="Maven"
          >
            <CodeBlock className="language-xml">
              {`<dependency>
  <groupId>org.questdb</groupId>
  <artifactId>questdb</artifactId>
  <version>${siteConfig.customFields.version}</version>
</dependency>`}
            </CodeBlock>
            <p className={biCss.binary__docs}>
              <a href="/docs/reference/api/java-embedded">Docs</a>
            </p>
          </Binary>
          <Binary
            grow={2}
            logo={
              <img
                alt="Gradle logo"
                className={biCss.binary__logo}
                src="/img/pages/getQuestdb/gradle.svg"
              />
            }
            title="Gradle"
          >
            <CodeBlock className="language-shell">
              {`implementation 'org.questdb:questdb:${siteConfig.customFields.version}'`}
            </CodeBlock>
            <div style={{ height: "2.75rem" }} />
            <p className={biCss.binary__docs}>
              <a href="/docs/reference/api/java-embedded">Docs</a>
            </p>
          </Binary>
        </div>

        <div className={heCss.help}>
          <img
            alt="SQL statement in a code editor with an artistic view of the query result shown as a chart and a table"
            className={heCss.help__illustration}
            src="/img/pages/getQuestdb/query.svg"
          />

          <div className={heCss.help__text}>
            <h2 className={heCss.help__title}>How does it work</h2>
            <p>
              QuestDB is distributed as a single binary. You can download
              either:
            </p>
            <ul className={heCss.help__list}>
              <li className={heCss.help__bullet}>
                The &quot;rt&quot; version, this includes a trimmed JVM so you
                do not need anything else (~ {assets.linux.size})
              </li>
              <li className={heCss.help__bullet}>
                The binary itself (~ {assets.noJre.size}), without the JVM. In
                this case, you need Java 11 installed locally
              </li>
            </ul>
            <p>
              To find out more about how to use the binaries, please check
              the&nbsp;
              <a href="/docs/get-started/binaries/">dedicated page</a> in our
              documentation.
            </p>
            <p>
              Check out the{" "}
              <a
                href={release.html_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                v{siteConfig.customFields.version} CHANGELOG
              </a>{" "}
              for information on the latest release.
            </p>
          </div>
        </div>
      </Layout>
    </MetadataContextProvider>
  )
}

export default GetQuestdbPage
