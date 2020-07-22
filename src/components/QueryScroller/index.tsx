import clsx from "clsx"
import React, { useCallback, useEffect, useState } from "react"

import CodeBlock from "@theme/CodeBlock"

import Button from "../Button"
import useWindowWidth from "../hooks/useWindowWidth"
import sectionStyles from "../Section/styles.module.css"
import queryScrollerStyles from "./styles.module.css"

const S = [3, 1, 6, 10]
const M = [3, 0, 4, 8]
const L = [4, 0, 4, 8]

const getTopByIndex = (m: typeof S, index: number) =>
  ({
    1: 25 * m[0],
    2: -25 * m[1],
    3: -25 * m[2],
    4: -25 * m[3],
  }[index])

const searchQuery = `SELECT timestamp, tempC
FROM sensors
WHERE timestamp = '2020-06-14;-2d';`

const sliceQuery = `SELECT timestamp, avg(tempC)
FROM sensors
SAMPLE BY 5m;`

const navigateQuery = `SELECT sensorName, tempC
FROM sensors
LATEST BY sensorName;`

const mergeQuery = `SELECT sensors.timestamp ts, rain1H
FROM sensors
ASOF JOIN weather;`

const Chevron = () => (
  <svg
    focusable="false"
    role="img"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    viewBox="5.40 7.12 9.23 5.25"
  >
    <path d="M6.582 12.141a.695.695 0 01-.978 0 .68.68 0 010-.969l3.908-3.83a.697.697 0 01.979 0l3.908 3.83a.68.68 0 010 .969.697.697 0 01-.979 0L10 9l-3.418 3.141z"></path>
  </svg>
)

const QueryScroller = () => {
  const [top, setTop] = useState(S)
  const [index, setIndex] = useState(2)
  const windowWidth = useWindowWidth()
  const handleClick1 = useCallback(() => {
    setIndex(1)
  }, [])
  const handleClick2 = useCallback(() => {
    setIndex(2)
  }, [])
  const handleClick3 = useCallback(() => {
    setIndex(3)
  }, [])
  const handleClick4 = useCallback(() => {
    setIndex(4)
  }, [])
  const handleUpClick = useCallback(() => {
    setIndex(Math.max(index - 1, 1))
  }, [index])
  const handleDownClick = useCallback(() => {
    setIndex(Math.min(index + 1, 4))
  }, [index])

  useEffect(() => {
    if (windowWidth < 622) {
      setTop(S)
      return
    }

    if (windowWidth < 800) {
      setTop(M)
      return
    }

    setTop(L)
  }, [windowWidth])

  return (
    <section
      className={clsx(
        sectionStyles["section--inner"],
        queryScrollerStyles.queryScroller,
      )}
    >
      <h1
        className={clsx(
          queryScrollerStyles.queryScroller__title,
          "text--center",
        )}
      >
        Augmented SQL for time series
      </h1>

      <h2
        className={clsx(
          queryScrollerStyles.queryScroller__subtitle,
          "text--center",
        )}
      >
        QuestDB enhances ANSI SQL with time series extensions to manipulate time
        stamped data
      </h2>

      <div className={queryScrollerStyles.queryScroller__scroller}>
        <div className={queryScrollerStyles.queryScroller__inner}>
          <div
            className={clsx(queryScrollerStyles.queryScroller__chevron)}
            onClick={handleUpClick}
            style={{ visibility: index === 1 ? "hidden" : "visible" }}
          >
            <Chevron />
          </div>
          <div className={clsx(queryScrollerStyles.queryScroller__left)}>
            <div
              className={clsx(
                queryScrollerStyles.queryScroller__offset,
                queryScrollerStyles[`queryScroller__${index}`],
              )}
              style={{ top: getTopByIndex(top, index) }}
            >
              <CodeBlock>{`${searchQuery}`}</CodeBlock>
              <CodeBlock>{`-- Search time
${searchQuery}`}</CodeBlock>
              <CodeBlock>{`${sliceQuery}`}</CodeBlock>
              <CodeBlock>{`-- Slice time
${sliceQuery}`}</CodeBlock>
              <CodeBlock>{`${navigateQuery}`}</CodeBlock>
              <CodeBlock>{`-- Navigate time
${navigateQuery}`}</CodeBlock>
              <CodeBlock>{`${mergeQuery}`}</CodeBlock>
              <CodeBlock>{`-- Merge time
${mergeQuery}`}</CodeBlock>
            </div>
          </div>
          <div
            className={clsx(
              queryScrollerStyles.queryScroller__chevron,
              queryScrollerStyles["queryScroller__chevron--bottom"],
            )}
            onClick={handleDownClick}
            style={{ visibility: index === 4 ? "hidden" : "visible" }}
          >
            <Chevron />
          </div>
          <div className={queryScrollerStyles.queryScroller__right}>
            <div
              className={clsx(queryScrollerStyles.queryScroller__button, {
                [queryScrollerStyles["queryScroller__button--active"]]:
                  index === 1,
              })}
              onClick={handleClick1}
            >
              <div className={queryScrollerStyles.queryScroller__header}>
                <svg
                  className={queryScrollerStyles.queryScroller__icon}
                  width="22"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.3125 16.3125L13.5 13.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.375 7.3125C3.375 6.26821 3.78984 5.26669 4.52827 4.52827C5.26669 3.78984 6.26821 3.375 7.3125 3.375"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.3125 13.5C10.7298 13.5 13.5 10.7298 13.5 7.3125C13.5 3.89524 10.7298 1.125 7.3125 1.125C3.89524 1.125 1.125 3.89524 1.125 7.3125C1.125 10.7298 3.89524 13.5 7.3125 13.5Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Search Time
              </div>
              <div className={queryScrollerStyles.queryScroller__description}>
                Create time buckets and aggregate by intervals with sample by
              </div>
            </div>

            <div
              className={clsx(queryScrollerStyles.queryScroller__button, {
                [queryScrollerStyles["queryScroller__button--active"]]:
                  index === 2,
              })}
              onClick={handleClick2}
            >
              <div className={queryScrollerStyles.queryScroller__header}>
                <svg
                  className={queryScrollerStyles.queryScroller__icon}
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6875 6.875L2.0625 16.5L11 15.125L12.375 11L14.4375 9.625"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.125 10.3125L11.6875 6.87504L16.8438 1.71879C17.7932 0.769354 19.3318 0.769354 20.2812 1.71879C21.2307 2.66823 21.2307 4.20685 20.2812 5.15629L15.125 10.3125Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Slice Time
              </div>
              <div className={queryScrollerStyles.queryScroller__description}>
                Create time buckets and aggregate by intervals with sample by
              </div>
            </div>

            <div
              className={clsx(queryScrollerStyles.queryScroller__button, {
                [queryScrollerStyles["queryScroller__button--active"]]:
                  index === 3,
              })}
              onClick={handleClick3}
            >
              <div className={queryScrollerStyles.queryScroller__header}>
                <svg
                  className={queryScrollerStyles.queryScroller__icon}
                  width="22"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.75 6L1.5 1.5L6 15.75L9 9L15.75 6Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Navigate Time
              </div>
              <div className={queryScrollerStyles.queryScroller__description}>
                Create time buckets and aggregate by intervals with sample by
              </div>
            </div>
            <div
              className={clsx(queryScrollerStyles.queryScroller__button, {
                [queryScrollerStyles["queryScroller__button--active"]]:
                  index === 4,
              })}
              onClick={handleClick4}
            >
              <div className={queryScrollerStyles.queryScroller__header}>
                <svg
                  className={queryScrollerStyles.queryScroller__icon}
                  width="22"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 1H6.25V12.25H17.5V1Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.25 6.25H1V17.5H12.25V6.25Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Merge Time
              </div>
              <div className={queryScrollerStyles.queryScroller__description}>
                Create time buckets and aggregate by intervals with sample by
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QueryScroller
