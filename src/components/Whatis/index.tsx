import clsx from "clsx"
import React, { useCallback, useState } from "react"

import Button from "../Button"
import sectionStyles from "../Section/styles.module.css"
import whatisStyles from "./styles.module.css"

const Whatis = () => {
  const [opened, setOpened] = useState<"is" | "goodFor" | "isNot">("is")
  const handleClickIs = useCallback(() => {
    setOpened("is")
  }, [])
  const handleClickGoodFor = useCallback(() => {
    setOpened("goodFor")
  }, [])
  const handleClickIsNot = useCallback(() => {
    setOpened("isNot")
  }, [])

  return (
    <section
      className={clsx(
        sectionStyles.section,
        sectionStyles["section--inner"],
        whatisStyles.whatis,
      )}
    >
      <h1 className={clsx(whatisStyles.whatis__title, "text--center")}>
        What is QuestDB?
      </h1>
      <h2 className={clsx(whatisStyles.whatis__subtitle, "text--center")}>
        QuestDB ships with an interactive web console which allows your to
        import data with a simple drag and drop, and to start querying right
        away.
      </h2>

      <div className={whatisStyles.whatis__footer}>
        <div className={whatisStyles.whatis__menu}>
          <Button
            className={whatisStyles["whatis__menu--item"]}
            onClick={handleClickIs}
            size="small"
            style={opened === "is" ? "primary" : "tertiary"}
          >
            QuestDB is
          </Button>
          <Button
            className={whatisStyles["whatis__menu--item"]}
            onClick={handleClickGoodFor}
            size="small"
            style={opened === "goodFor" ? "primary" : "tertiary"}
          >
            QuestDB is good for
          </Button>
          <Button
            className={whatisStyles["whatis__menu--item"]}
            onClick={handleClickIsNot}
            size="small"
            style={opened === "isNot" ? "primary" : "tertiary"}
          >
            QuestDB is not
          </Button>
        </div>

        <div className={whatisStyles.whatis__content}>
          <div
            className={clsx(whatisStyles.whatis__toggle, {
              [whatisStyles["whatis__toggle--active"]]: opened === "is",
            })}
          >
            <div className={whatisStyles.whatis__description}>
              QuestDB enhances ANSI SQL with time-series extensions to
              manipulate timestamped data efficiently, without verbose.
            </div>

            <div className={whatisStyles.whatis__list}>
              <div className={whatisStyles.whatis__item}>Column Oriented</div>
              <div className={whatisStyles.whatis__item}>
                Relational Model, using SQL
              </div>
              <div className={whatisStyles.whatis__item}>
                Constantly ingesting with O(1) complexity
              </div>
              <div className={whatisStyles.whatis__item}>Disk persisted</div>
              <div className={whatisStyles.whatis__item}>
                Non-blocking read/write
              </div>
            </div>
          </div>

          <div
            className={clsx(whatisStyles.whatis__toggle, {
              [whatisStyles["whatis__toggle--active"]]: opened === "goodFor",
            })}
          >
            <div className={whatisStyles.whatis__description}>
              QuestDB enhances ANSI SQL with time-series extensions to
              manipulate timestamped data efficiently, without verbose.
            </div>

            <div className={whatisStyles.whatis__list}>
              <div className={whatisStyles.whatis__item}>Column Oriented</div>
              <div className={whatisStyles.whatis__item}>
                Relational Model, using SQL
              </div>
              <div className={whatisStyles.whatis__item}>
                Constantly ingesting with O(1) complexity
              </div>
              <div className={whatisStyles.whatis__item}>Disk persisted</div>
              <div className={whatisStyles.whatis__item}>
                Non-blocking read/write
              </div>
            </div>
          </div>

          <div
            className={clsx(whatisStyles.whatis__toggle, {
              [whatisStyles["whatis__toggle--active"]]: opened === "isNot",
            })}
          >
            <div className={whatisStyles.whatis__description}>
              QuestDB enhances ANSI SQL with time-series extensions to
              manipulate timestamped data efficiently, without verbose.
            </div>

            <div className={whatisStyles.whatis__list}>
              <div className={whatisStyles.whatis__item}>Column Oriented</div>
              <div className={whatisStyles.whatis__item}>
                Relational Model, using SQL
              </div>
              <div className={whatisStyles.whatis__item}>
                Constantly ingesting with O(1) complexity
              </div>
              <div className={whatisStyles.whatis__item}>Disk persisted</div>
              <div className={whatisStyles.whatis__item}>
                Non-blocking read/write
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Whatis
