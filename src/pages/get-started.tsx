import clsx from "clsx"
import { differenceInDays, format, formatDistanceToNowStrict } from "date-fns"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { usePluginData } from "@docusaurus/useGlobalData"
import React, { ReactNode, useEffect, useState } from "react"

import Layout from "@theme/Layout"
import CodeBlock from "@theme/CodeBlock"

import { getAssets, getOs, Os, Release } from "../utils"
import { Button, Head, MetadataContextProvider } from "../components"
import binaryStyles from "../css/binary.module.css"
import instructionStyles from "../css/instruction.module.css"
import sectionStyles from "../css/section.module.css"
import getStartedStyles from "../css/getStarted.module.css"

type BinaryProps = Readonly<{
  architecture: boolean
  basis: string
  children?: ReactNode
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
  href,
  logo,
  rt,
  size,
  title,
}: BinaryProps) => {
  return (
    <section className={clsx(binaryStyles.binary)}>
      <div
        className={binaryStyles.binary__expand}
        style={{ flexBasis: basis }}
      />

      {logo}

      <h3 className={binaryStyles.binary__title}>{title}</h3>

      <p className={binaryStyles.binary__details}>
        {architecture && (
          <span
            className={clsx("color--pink", binaryStyles.binary__architecture)}
          >
            64-bit
          </span>
        )}

        <span className={binaryStyles.binary__size}>
          {rt && " rt -"}
          {size && ` ${size}`}
        </span>
      </p>

      {href && (
        <Button
          className={binaryStyles.binary__download}
          href={href}
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
  rt: false,
}

const GetStarted = () => {
  const context = useDocusaurusContext()
  const { release } = usePluginData<{ release: Release }>("fetch-release")
  const [os, setOs] = useState<Os>()
  const [releaseDate, setReleaseDate] = useState(
    format(new Date(release.published_at), "MMMM M, yyyy"),
  )
  const { siteConfig } = context
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

  return (
    <section
      className={clsx(
        sectionStyles["section--inner"],
        getStartedStyles.getStarted,
      )}
    >
      <div className={getStartedStyles.getStarted__top}>
        <h1
          className={clsx(
            sectionStyles.section__title,
            getStartedStyles.getStarted__title,
          )}
        >
          Get started with QuestDB
        </h1>
        <p
          className={clsx(
            sectionStyles.section__subtitle,
            getStartedStyles.getStarted__subtitle,
          )}
        >
          You can find below download links for the latest version of QuestDB (
          {siteConfig.customFields.version}).
        </p>

        <div className={getStartedStyles.getStarted__cta}>
          <p
            className={clsx(getStartedStyles.getStarted__details, {
              [getStartedStyles["getStarted__details--download"]]:
                os !== "macos",
            })}
          >
            Latest Release:&nbsp;
            <span className="color--pink">
              {siteConfig.customFields.version}
            </span>
            &nbsp;({releaseDate})
          </p>
          {os && os !== "macos" && assets[os] && (
            <Button href={assets[os].href}>{os}&nbsp;Download</Button>
          )}
        </div>

        <div className={getStartedStyles.getStarted__links}>
          <Link
            className={getStartedStyles.getStarted__link}
            href={release.html_url}
          >
            View the changelog
          </Link>
          <Link
            className={getStartedStyles.getStarted__link}
            href={`${siteConfig.customFields.githubUrl}/tags`}
          >
            View previous releases
          </Link>
        </div>
      </div>
    </section>
  )
}

const GetStartedPage = () => {
  const context = useDocusaurusContext()
  const { release } = usePluginData<{ release: Release }>("fetch-release")
  const [os, setOs] = useState<Os | undefined>()
  const { siteConfig } = context
  const assets = getAssets(release)

  const perOs = {
    bsd: (
      <Binary
        architecture
        href={assets.bsd.href}
        logo={
          <svg
            fill="none"
            height="49"
            viewBox="0 0 45 45"
            width="45"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.8065 1.58526C46.1532 3.93085 39.6476 14.2412 38.5478 15.3416C37.448 16.4397 34.6546 15.4294 32.3091 13.0832C29.9624 10.7377 28.9515 7.9437 30.0513 6.8439C31.1505 5.74355 41.4603 -0.761417 43.8065 1.58526Z"
              fill="#F35183"
            />
            <path
              d="M10.8992 4.06696C7.3166 2.03419 2.21877 -0.226877 0.597054 1.39484C-1.04606 3.0374 1.29788 8.24994 3.35205 11.8391C5.18011 8.66099 7.78034 5.98557 10.8992 4.06696Z"
              fill="#F35183"
            />
            <path
              d="M40.2278 14.5327C40.5576 15.6517 40.4983 16.5759 39.9632 17.1099C38.7136 18.3601 35.3379 17.0292 32.2948 14.1332C32.0824 13.9428 31.8717 13.7452 31.6648 13.5378C30.5644 12.4369 29.7083 11.2652 29.1606 10.1862C28.0948 8.27418 27.8281 6.58551 28.6337 5.77987C29.0728 5.34138 29.7753 5.22174 30.6319 5.37595C31.1906 5.02252 31.8503 4.62903 32.5736 4.22566C29.6326 2.69176 26.2887 1.8252 22.7418 1.8252C10.9771 1.8252 1.43945 11.3612 1.43945 23.127C1.43945 34.8906 10.9771 44.4277 22.7418 44.4277C34.5065 44.4277 44.0436 34.8906 44.0436 23.127C44.0436 19.3276 43.0464 15.7648 41.3045 12.6761C40.928 13.3632 40.562 13.9927 40.2278 14.5327Z"
              fill="#F35183"
            />
          </svg>
        }
        rt
        size={assets.bsd.size}
        title="FreeBSD"
      />
    ),
    linux: (
      <Binary
        architecture
        href={assets.linux.href}
        logo={
          <svg
            fill="none"
            height="49"
            viewBox="0 0 41 48"
            width="45"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M29.967 30.6812C30.6494 30.8894 31.3045 31.1783 31.9184 31.5419C32.0499 31.6151 32.1769 31.6913 32.301 31.7556C32.6178 31.7272 33.1348 31.6181 33.5606 31.5299C34.325 31.3423 35.1066 31.2336 35.8931 31.2057C36.1636 31.2069 36.4336 31.2309 36.7 31.2774C36.7385 30.5701 36.7246 29.8608 36.6582 29.1556C36.2825 25.9867 35.0063 22.992 32.9809 20.5263C31.1056 18.4627 28.2172 15.4996 28.2172 13.2493V7.00182C28.1905 5.18357 27.4494 3.44885 26.1542 2.1725C24.8589 0.896144 23.1135 0.180664 21.2951 0.180664C19.4766 0.180664 17.7312 0.896144 16.436 2.1725C15.1407 3.44885 14.3997 5.18357 14.373 7.00182V16.1003C14.0741 17.6752 13.2852 17.8262 12.0479 19.552C10.8267 21.1773 9.85284 22.9744 9.15803 24.885C8.57976 26.6183 7.35746 28.4473 6.79712 29.8877C6.94417 29.8411 7.09386 29.8031 7.24539 29.7742C7.46979 29.7387 7.6966 29.7207 7.92378 29.7204C8.72166 29.7274 9.50395 29.9421 10.1935 30.3435C11.0507 26.8949 12.4595 23.6075 14.3655 20.6084C15.4786 18.8858 15.969 16.8342 15.7551 14.7943C16.4814 15.3711 17.2061 17.1687 19.18 17.1687C21.1539 17.1687 22.4823 15.6177 23.582 15.0678C23.8629 14.9275 24.1197 14.7434 24.3426 14.5224L24.5324 14.5672C26.2458 17.74 27.774 21.0094 29.1093 24.359C29.699 26.4139 29.9879 28.5434 29.967 30.6812ZM18.7093 10.588C18.3905 10.6535 18.0798 10.7537 17.7828 10.8869C17.729 10.9093 17.6797 10.9332 17.6334 10.9571C17.3724 11.0786 17.1224 11.2226 16.8863 11.3874C16.4764 10.9345 16.2356 10.3539 16.2049 9.74376C16.1078 8.58721 16.6128 7.60101 17.3331 7.54124C18.0533 7.48147 18.7138 8.36905 18.8109 9.5256C18.8391 9.88295 18.8047 10.2425 18.7093 10.588ZM23.4909 9.75572C23.453 10.3295 23.2609 10.8824 22.935 11.3561C22.8215 11.2948 22.6959 11.2335 22.5659 11.1708L22.4658 11.1244C22.3164 11.0527 22.1446 10.984 21.9652 10.9167H21.9458C21.5108 10.7578 21.0599 10.6461 20.601 10.5835C20.521 10.2329 20.4953 9.87208 20.5248 9.51365C20.6339 8.21066 21.3885 7.21101 22.2073 7.27975C23.0262 7.34848 23.6014 8.44825 23.4924 9.75572H23.4909Z"
              fill="#F35183"
            />
            <path
              d="M10.2593 34.5198C9.58391 33.4948 8.65748 32.5773 7.73254 32.7267C6.8076 32.8762 6.1576 34.5452 5.55691 35.0458C4.95622 35.5464 2.65508 35.0951 1.95577 35.8452C1.25646 36.5953 1.90496 39.2716 1.78094 40.5476C1.65692 41.8237 0.980023 42.4991 0.90531 43.0983C0.830598 43.6975 1.02933 44.3744 2.156 44.7749C3.28266 45.1753 7.483 46.2258 8.93391 46.55C10.3848 46.8743 13.7857 49.026 15.3861 46.426C16.6368 44.3938 15.8119 42.523 14.4357 40.9481C12.9234 38.8859 11.5291 36.7397 10.2593 34.5198Z"
              fill="#F35183"
            />
            <path
              d="M20.2063 43.2646C19.7416 43.2646 19.3097 43.2392 18.8794 43.1974C19.0091 43.8926 19.0227 44.6045 18.9197 45.3042C20.6371 45.2067 22.3599 45.2682 24.0659 45.488C23.9271 44.4076 23.9822 43.311 24.2288 42.25C22.9948 42.9216 21.6112 43.2706 20.2063 43.2646Z"
              fill="#F35183"
            />
            <path
              d="M39.8214 39.3971C38.7274 38.8971 37.8612 38.0043 37.3947 36.8957C37.1706 35.896 37.3708 34.9711 36.5953 34.3704C35.8198 33.7697 33.29 34.9143 31.7958 34.729C30.7498 34.5975 29.1868 32.9583 28.1199 33.6367C27.4863 34.0402 27.8211 35.645 27.842 36.4967C27.8116 38.2029 27.6858 39.906 27.4654 41.5981C27.2906 42.5738 25.9398 45.6505 28.5667 47.4003C30.3822 48.6106 32.4189 47.351 33.4693 46.3259C34.5561 45.2083 35.8141 44.271 37.196 43.5496C38.4433 43.0974 39.578 42.3807 40.5222 41.4487C40.9226 40.7733 40.8718 39.9978 39.8214 39.3971Z"
              fill="#F35183"
            />
          </svg>
        }
        rt
        size={assets.linux.size}
        title="Linux"
      />
    ),
    macos: (
      <Binary
        basis="15px"
        logo={
          <svg
            fill="none"
            height="49"
            viewBox="0 0 41 49"
            width="45"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40.5025 36.0026C39.4183 38.4037 38.9007 39.4754 37.5045 41.5968C35.5594 44.5593 32.815 48.2491 29.4142 48.2804C26.3933 48.3086 25.6169 46.3145 21.516 46.3385C17.415 46.3625 16.5604 48.3159 13.5395 48.2878C10.1387 48.2575 7.54037 44.9256 5.5932 41.961C0.150298 33.6756 -0.41841 23.9533 2.93853 18.7848C5.32398 15.1096 9.08893 12.9621 12.6274 12.9621C16.2306 12.9621 18.4961 14.9375 21.4763 14.9375C24.3668 14.9375 26.1272 12.959 30.2939 12.959C33.4432 12.959 36.7803 14.6735 39.1584 17.636C31.3666 21.9049 32.6334 33.0276 40.5025 36.0026Z"
              fill="#F35183"
            />
            <path
              d="M27.5724 7.77503C29.0865 5.83203 30.2343 3.09075 29.8169 0.286865C27.3438 0.455912 24.4533 2.02951 22.765 4.07999C21.2321 5.94055 19.9663 8.70061 20.4588 11.3835C23.1563 11.468 25.9497 9.85577 27.5724 7.77503Z"
              fill="#F35183"
            />
          </svg>
        }
        title="macOS (via Homebrew)"
      >
        <div />
        <CodeBlock className="language-shell">
          {`brew update
brew install questdb`}
        </CodeBlock>
      </Binary>
    ),
    windows: (
      <Binary
        architecture
        href={assets.windows.href}
        logo={
          <svg
            fill="none"
            height="49"
            viewBox="0 0 44 44"
            width="45"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M43.7702 0.293945L20.6744 3.68385V20.8612L43.7702 20.6772V0.293945ZM0.904112 22.7251L0.905146 37.3423L18.4134 39.7494L18.3997 22.8388L0.904112 22.7251ZM20.4907 22.9595L20.5231 40.0107L43.7484 43.2886L43.754 22.9978L20.4907 22.9595ZM0.891357 6.38157L0.907559 20.9915L18.4159 20.8919L18.4079 3.99547L0.891357 6.38157Z"
              fill="#F35183"
            />
          </svg>
        }
        rt
        size={assets.windows.size}
        title="Windows"
      />
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
      <Layout
        description={siteConfig.customFields.description}
        title="QuestDB"
        version={siteConfig.customFields.version}
      >
        <Head />
        <GetStarted />

        <div className={binaryStyles.binaries}>
          {os ? (
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
            href={assets.noJre.href}
            logo={
              <svg
                fill="none"
                height="49"
                viewBox="0 0 78 51"
                width="61"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  height="51"
                  id="mask0"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  width="51"
                  x="16"
                  y="0"
                >
                  <circle
                    cx="41.1744"
                    cy="25.8397"
                    fill="#C4C4C4"
                    r="24.9371"
                  />
                </mask>
                <g mask="url(#mask0)">
                  <circle
                    cx="41.1744"
                    cy="25.8397"
                    fill="#EC779B"
                    r="24.9371"
                  />
                  <path
                    d="M50.0829 -1.05298C50.0829 -1.05298 46.3653 4.19695 33.4603 7.04175C20.5554 9.88655 24.273 15.1365 24.4895 16.6655C24.7061 18.1946 28.2104 19.7302 38.7103 11.6354C49.2101 3.5407 51.6152 1.57198 56.8652 1.35542C62.1151 1.13886 50.0829 -1.05298 50.0829 -1.05298Z"
                    fill="#D14671"
                  />
                  <path
                    d="M44.1768 -3.02165C44.1768 -3.02165 41.9915 6.38556 19.4595 5.94916C19.4595 5.94916 40.2393 -3.45805 44.1768 -3.02165Z"
                    fill="#D14671"
                  />
                  <path
                    d="M16.6146 9.66651C16.6146 9.66651 22.0844 8.35403 22.0844 10.7592C22.0844 13.1643 19.2396 17.7612 15.0856 17.7612C10.9316 17.7612 16.6146 9.66651 16.6146 9.66651Z"
                    fill="#D14671"
                  />
                  <path
                    d="M12.2408 25.4164C12.2408 25.4164 15.9584 17.9779 21.648 19.2904C27.3376 20.6029 31.4916 21.479 40.2393 14.9166C48.987 8.35417 51.1788 4.41673 54.2402 6.82185C57.3016 9.22697 48.5539 17.7614 41.9915 19.2904C35.4291 20.8195 10.0522 25.8528 19.2396 32.4152C28.427 38.9776 43.9602 28.9175 49.4267 21.6988C54.8931 14.4802 59.2703 11.6354 59.9265 15.1364C60.5827 18.6375 53.8038 20.3863 49.4267 25.8528C45.0495 31.3193 29.7394 44.4474 15.522 35.6964C1.30454 26.9455 12.2408 25.4164 12.2408 25.4164Z"
                    fill="#D14671"
                  />
                  <path
                    d="M58.8341 5.073C58.8341 5.073 52.708 16.6655 45.4894 19.7301C38.2707 22.7948 18.5835 26.2925 22.521 30.6664C26.4584 35.0402 35.4292 31.1028 41.7718 25.6363C48.1144 20.1698 59.9267 7.04172 63.2079 10.5428C66.4891 14.0438 58.8341 5.073 58.8341 5.073Z"
                    fill="#D14671"
                  />
                  <path
                    d="M66.7087 18.1975C66.0525 18.1975 59.49 19.51 54.2401 23.8838C48.9902 28.2577 44.3965 40.7295 21.2083 43.1347L25.3655 46.8523C25.3655 46.8523 24.9291 44.8835 35.6455 42.2586C46.3619 39.6336 50.3027 34.6035 56.4287 26.9485C62.5547 19.2934 66.7087 23.2276 66.7087 23.2276V18.1975Z"
                    fill="#D14671"
                  />
                  <path
                    d="M27.5544 50.1336C27.5544 50.1336 30.6158 44.2275 36.522 44.2275C42.4281 44.2275 52.4916 36.5724 55.9893 31.5423C59.4871 26.5123 60.1729 24.0875 61.4591 26.2924C64.5205 31.5423 54.8967 35.6964 48.7707 41.386C42.6447 47.0756 34.9536 44.5162 33.2408 51.2296C31.528 57.9429 55.799 38.0391 57.7415 37.0088C61.4591 35.0401 63.6477 37.0088 63.6477 38.9776C63.6477 40.9463 55.9893 54.2909 47.8979 54.2909C39.8065 54.2909 27.771 54.9472 27.771 51.0097"
                    fill="#D14671"
                  />
                </g>
                <path
                  d="M65.3925 20.0851C65.3418 20.492 65.683 21.1168 65.6323 21.5238C73.697 24.3725 76.3888 27.0634 76.0338 29.9631C75.7294 32.5066 71.621 34.5923 64.6721 35.7114C61.7809 36.1693 58.484 36.4745 54.9842 36.5762C54.3755 36.5762 53.7162 36.6271 53.1075 36.6271C50.6728 36.678 48.1875 36.5762 45.6007 36.4745C43.1153 36.3219 40.5285 36.1184 37.9417 35.8132C35.7606 35.5588 33.6303 35.2536 31.6014 34.9484C29.5726 34.6432 27.5944 34.2362 25.7177 33.8292C25.3119 33.7275 24.9062 33.6766 24.5004 33.5749C23.9424 33.4731 23.3845 33.3205 22.8773 33.2188C9.58816 30.0139 1.67556 25.2321 2.08133 21.5694C2.43639 18.4663 7.96507 16.1263 17.5008 15.2615C17.7544 15.2615 18.3817 15.2895 18.6353 15.2895C18.6861 14.8825 19.0642 14.4467 19.1149 14.0906C18.8106 14.0906 17.9065 14.0915 17.6529 14.1423C7.61001 15.1089 1.37123 17.7541 0.914731 21.4677C0.356791 26.3004 9.94322 31.4892 24.2468 34.694C24.8554 34.8466 25.4641 34.9484 26.1235 35.101C26.5293 35.2027 26.935 35.2536 27.3408 35.3554C28.2538 35.5588 29.1668 35.7114 30.1305 35.8641C32.6159 36.271 35.152 36.678 37.7895 36.9323C38.8547 37.0341 39.8691 37.1358 40.9343 37.2376C41.7965 37.3393 42.7095 37.3902 43.5718 37.441C46.1586 37.6445 48.7454 37.6954 51.1801 37.7463C51.8902 37.7463 52.6003 37.7463 53.3104 37.7463C55.4914 37.6954 57.571 37.6445 59.5492 37.4919C61.4259 37.3393 63.2011 37.1358 64.875 36.8306C69.2878 36.1184 76.7439 34.2871 77.2004 30.0648C77.5554 26.6056 73.9645 23.1882 65.3925 20.0851Z"
                  fill="white"
                />
                <path
                  d="M14.3559 29.1484C14.5081 30.878 13.1893 32.4549 11.4648 32.5567C9.74022 32.6584 8.16784 31.3867 8.0664 29.6571C7.91424 27.9275 9.233 26.3505 10.9575 26.2487C12.6821 26.0961 14.2545 27.3679 14.3559 29.1484Z"
                  fill="white"
                />
                <path
                  d="M74.1568 22.3319C74.7654 23.9598 73.9032 25.7911 72.2801 26.4016C70.657 27.012 68.831 26.1472 68.2223 24.5193C67.6137 22.8915 68.4759 21.0601 70.099 20.4497C71.7221 19.8393 73.5481 20.7041 74.1568 22.3319Z"
                  fill="white"
                />
                <path
                  d="M52.9045 40.4419C54.6693 40.4419 56.0999 39.0071 56.0999 37.2371C56.0999 35.4671 54.6693 34.0322 52.9045 34.0322C51.1396 34.0322 49.709 35.4671 49.709 37.2371C49.709 39.0071 51.1396 40.4419 52.9045 40.4419Z"
                  fill="white"
                />
                <path
                  d="M12.1245 36.0671C12.1245 36.0671 12.0731 36.1186 12.1245 36.0671C12.0731 36.1186 12.0731 36.0671 12.1245 36.0671C12.0731 36.0157 12.0731 36.0157 12.1245 36.0671C12.0731 36.0157 12.0731 36.0157 12.1245 36.0671Z"
                  fill="white"
                />
                <path
                  d="M65.3925 32.0739C65.1896 32.43 65.1158 33.1565 64.9129 33.5126C71.2531 39.2101 72.2803 42.884 70.7587 45.3767C69.4399 47.5132 64.7735 47.6658 58.0275 45.7327C55.1871 44.9188 52.0931 43.7997 48.8469 42.3753C48.2889 42.1209 47.6803 41.8666 47.1223 41.6122C44.9413 40.5948 42.6588 39.4757 40.427 38.2548C38.246 37.0848 36.0142 35.7621 33.7825 34.3886C31.9058 33.2186 30.1305 32.0486 28.4567 30.8785C26.7321 29.7085 25.109 28.5385 23.5874 27.3685C23.2323 27.1141 22.928 26.8598 22.6237 26.6054C22.1672 26.2493 21.7614 25.8932 21.3049 25.588C10.6026 16.9909 5.4797 9.25855 7.3564 6.15544C8.87806 3.66279 14.2038 3.71366 22.2179 6.4098L24.6298 7.13678L25.589 6.41744L22.8773 5.44326C14.2546 2.59451 8.21868 2.54363 6.39269 5.545C3.8566 9.71638 10.2983 18.4661 21.8628 27.5211C22.3701 27.928 22.8773 28.2841 23.3845 28.6911C23.6888 28.9455 24.0439 29.1998 24.3989 29.4542C25.1598 30.0137 25.9206 30.5733 26.6814 31.1329C28.7103 32.5573 30.8913 33.9816 33.1738 35.406C34.0868 35.9656 34.9491 36.5252 35.8621 37.0339C36.6229 37.4917 37.3837 37.9495 38.1446 38.3565C40.427 39.6283 42.6588 40.7983 44.8906 41.8666C45.5499 42.1718 46.1586 42.477 46.818 42.7823C48.7961 43.6979 50.7236 44.5118 52.6003 45.224C54.3755 45.8854 56.0494 46.4449 57.6725 46.9028C61.9331 48.1237 69.4906 49.6498 71.6717 46.038C73.4977 43.0366 73.0007 39.2467 65.3925 32.0739Z"
                  fill="white"
                />
                <path
                  d="M10.3994 18.8221C12.1362 18.8221 13.5441 17.41 13.5441 15.6681C13.5441 13.9262 12.1362 12.5142 10.3994 12.5142C8.66259 12.5142 7.25464 13.9262 7.25464 15.6681C7.25464 17.41 8.66259 18.8221 10.3994 18.8221Z"
                  fill="white"
                />
              </svg>
            }
            size={assets.noJre.size}
            title="Any (no JVM)"
          />
          <Binary
            basis="40px"
            logo={
              <svg
                fill="none"
                height="49"
                viewBox="0 0 68 48"
                width="61"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.4803 22.2946H45.4016V16.0324H38.4803V22.2946ZM30.2406 22.2946H37.1619V16.0324H30.2406V22.2946ZM22.1657 22.2946H29.087V16.0324H22.1657V22.2946ZM14.0908 22.2946H20.8473V16.0324H14.0908V22.2946ZM5.85107 22.2946H12.7724V16.0324H5.85107V22.2946ZM14.0908 14.714H20.8473V8.45186H14.0908V14.714ZM22.1657 14.714H29.087V8.45186H22.1657V14.714ZM30.2406 14.714H37.1619V8.45186H30.2406V14.714ZM30.2406 7.13351H37.1619V0.871338H30.2406V7.13351ZM67.484 19.4931C67.484 19.4931 64.5177 16.6916 58.4204 17.6803C57.7612 12.9013 52.6526 10.0998 52.6526 10.0998C52.6526 10.0998 47.8735 15.8676 51.3342 22.2946C50.3455 22.7889 48.6975 23.4481 46.2256 23.4481H0.907245C0.0832751 26.5792 0.0832759 47.3433 22.8249 47.3433C39.1395 47.3433 51.3342 39.7627 57.102 25.92C65.6713 26.5792 67.484 19.4931 67.484 19.4931Z"
                  fill="#F35183"
                />
              </svg>
            }
            title="Docker"
          >
            <CodeBlock className="language-shell">
              docker run -p 9000:9000 questdb/questdb
            </CodeBlock>
            <p className={instructionStyles.binaries__docker}>
              Documentation on&nbsp;
              <Link href={siteConfig.customFields.dockerUrl}>Docker Hub</Link>
            </p>
          </Binary>
          <Binary
            logo={
              <svg
                fill="none"
                height="49"
                viewBox="0 0 41 55"
                width="45"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.6129 42.1058C13.6129 42.1058 11.5662 43.2961 15.0694 43.6988C19.3135 44.183 21.4826 44.1135 26.1596 43.2283C26.1596 43.2283 27.3892 43.9994 29.1065 44.6671C18.6219 49.1607 5.37781 44.4069 13.6129 42.1058Z"
                  fill="#F35183"
                />
                <path
                  d="M12.3318 36.2422C12.3318 36.2422 10.0362 37.9414 13.542 38.304C18.0757 38.7717 21.656 38.81 27.8513 37.617C27.8513 37.617 28.7082 38.4858 30.0557 38.9608C17.3792 42.6676 3.25986 39.2532 12.3318 36.2422Z"
                  fill="#F35183"
                />
                <path
                  d="M23.1322 26.2954C25.7156 29.2697 22.4535 31.9462 22.4535 31.9462C22.4535 31.9462 29.0131 28.5599 26.0006 24.3194C23.1869 20.3649 21.0292 18.4001 32.7101 11.6256C32.7101 11.6256 14.375 16.2049 23.1322 26.2954Z"
                  fill="#F35183"
                />
                <path
                  d="M36.9989 46.443C36.9989 46.443 38.5135 47.6909 35.3309 48.6564C29.2791 50.4897 10.1425 51.0433 4.82647 48.7294C2.91548 47.8981 6.49912 46.7444 7.6264 46.5023C8.80203 46.2474 9.47386 46.2949 9.47386 46.2949C7.34866 44.7978 -4.26262 49.2345 3.57591 50.5052C24.9527 53.9719 42.5438 48.9441 36.9989 46.443Z"
                  fill="#F35183"
                />
                <path
                  d="M14.5969 30.1667C14.5969 30.1667 4.86284 32.4787 11.1498 33.3183C13.8044 33.6737 19.0962 33.5933 24.0254 33.1803C28.0538 32.8404 32.0988 32.1179 32.0988 32.1179C32.0988 32.1179 30.6783 32.7263 29.6506 33.428C19.7659 36.0277 0.670312 34.8183 6.16768 32.1591C10.8168 29.9117 14.5969 30.1667 14.5969 30.1667Z"
                  fill="#F35183"
                />
                <path
                  d="M32.0586 39.9271C42.107 34.7056 37.461 29.6878 34.2182 30.3638C33.4234 30.5292 33.069 30.6726 33.069 30.6726C33.069 30.6726 33.3641 30.2103 33.9276 30.0103C40.3429 27.7548 45.2767 36.6623 31.8567 40.1902C31.8567 40.1904 32.0122 40.0514 32.0586 39.9271Z"
                  fill="#F35183"
                />
                <path
                  d="M26.0005 0.686523C26.0005 0.686523 31.5655 6.25333 20.7225 14.8135C12.0275 21.6802 18.7397 25.5954 20.7188 30.0687C15.6434 25.4895 11.9188 21.4583 14.4176 17.7065C18.0852 12.1992 28.2459 9.52905 26.0005 0.686523Z"
                  fill="#F35183"
                />
                <path
                  d="M15.5844 54.0761C25.2295 54.6935 40.0407 53.7335 40.3915 49.1697C40.3915 49.1697 39.7172 50.8998 32.4203 52.2738C24.188 53.823 14.0346 53.6421 8.01245 52.6492C8.0126 52.6491 9.24525 53.6695 15.5844 54.0761Z"
                  fill="#F35183"
                />
              </svg>
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
          </Binary>
        </div>

        <div className={instructionStyles.instructions}>
          <img
            alt="SQL statement in a code editor with an artistic view of the query result shown as a chart and a table"
            className={instructionStyles.instructions__illustration}
            src="img/pages/getStarted/query.svg"
          />

          <div className={instructionStyles.instructions__text}>
            <h2 className={instructionStyles.instructions__title}>
              How does it wok
            </h2>
            <p>
              QuestDB is distributed as a single binary. You can download
              either:
            </p>
            <p className={instructionStyles.instructions__bullet}>
              The &quot;rt&quot; version, this includes a trimmed JVM so you do
              not need anything else (~ {assets.linux.size})
            </p>
            <p className={instructionStyles.instructions__bullet}>
              The binary itself (~ {assets.noJre.size}), without the JVM. In
              this case, you need Java 11+ installed locally
            </p>
            <p>
              To find out more about how to use the binaries, please check
              the&nbsp;
              <Link to="docs/guide/binaries">dedicated documentation</Link>.
            </p>
            <p>
              Check out the{" "}
              <Link href={release.html_url}>
                v{siteConfig.customFields.version} CHANGELOG
              </Link>{" "}
              for information on the latest release.
            </p>
          </div>
        </div>
      </Layout>
    </MetadataContextProvider>
  )
}

export default GetStartedPage
