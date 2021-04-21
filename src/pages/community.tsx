import React from "react"
import clsx from "clsx"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import PageLayout from "@theme/PageLayout"
import Button from "@theme/Button"
import seCss from "../css/section.module.css"
import paCss from "../css/community/page.module.css"

type Contribute = {
  image: string
  title: string
}

const contributes: Contribute[] = [
  {
    image: "/img/pages/community/plugin.svg",
    title: "Create a Plugin",
  },
  {
    image: "/img/pages/community/bug.svg",
    title: "Report a Bug",
  },
  {
    image: "/img/pages/community/docs.svg",
    title: "Improve the Docs",
  },
]

const Community = () => {
  const title = "Community"
  const { siteConfig } = useDocusaurusContext()

  return (
    <PageLayout canonical="/community" title={title}>
      <section className={clsx(seCss.section)}>
        <h1
          className={clsx(
            seCss.section__title,
            seCss["section__title--jumbotron"],
            seCss["section__title--accent"],
            paCss.hero__title,
          )}
        >
          An open-source project that{" "}
          <span className={paCss.pink__color}>thrives</span> on collaboration
          and quality
        </h1>
        <div
          className={clsx(seCss["section--inner"], paCss.flex__reverse_section)}
        >
          <div className={`${paCss.half__section} ${paCss.padding_60}`}>
            <h2 className={paCss.section__title}>
              We’re super proud of the QuestDB community and all our
              contributors do
            </h2>
            <p
              className={clsx(seCss.section__subtitle, paCss.section__subtitle)}
            >
              As a way of saying &quot;thank you&quot; for being part of the
              journey, we want to offer contributors some of our coveted
              stickers, pins, t-shirts, and awesome virtual swag.
            </p>
            <div className={paCss.border} />
            <div>
              <p className={paCss.default_text}>
                Stay up to date with all things QuestDB
              </p>
              <div>
                <input
                  type="text"
                  className={paCss.custom_input}
                  placeholder="Email address"
                />
                <Button>Sign Up</Button>
              </div>
            </div>
          </div>
          <div className={`${paCss.half__section} ${paCss.section_center}`}>
            <img
              src="/img/pages/community/slack.png"
              alt=""
              className={paCss.section_image}
            />
          </div>
        </div>
      </section>
      <section className={clsx(seCss.section, seCss["section--odd"])}>
        <div className={paCss.section__inner}>
          <h2 className={`${paCss.section__title} ${paCss.text_center_header}`}>
            Here’s what to do to get your hands on QuestDB swag
          </h2>
          <div className={paCss.flex__section}>
            <div className={paCss.half__section}>
              <img
                src="/img/pages/community/step1.svg"
                alt=""
                className={paCss.section_image}
              />
            </div>
            <div className={paCss.half__section}>
              <p className={paCss.level__title}>Level 1</p>
              <h2 className={paCss.section__title}>Show the love</h2>
              <p className={paCss.default_text}>
                To claim your swag for the this level:
              </p>
              <p className={paCss.property}>
                You have joined our{" "}
                <a
                  className={paCss.link_item}
                  href={siteConfig.customFields.slackUrl}
                >
                  Community Slack
                </a>
              </p>
              <p className={paCss.property}>
                You have{" "}
                <a
                  className={paCss.link_item}
                  href={siteConfig.customFields.githubUrl}
                >
                  starred our repository on GitHub
                </a>
              </p>
              <div className={paCss.custom_box}>
                <p className={`${paCss.default_text} ${paCss.mb5}`}>
                  What you get:
                </p>
                <p className={paCss.second_text}>
                  Stickers, pins, bottles and virtual swag{" "}
                  <span className={paCss.pink__color}>(new!)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={clsx(seCss.section, seCss["section--center"])}>
        <div className={clsx(seCss["section--inner"])}>
          <div className={paCss.half__section}>
            <p className={paCss.level__title}>Level 2</p>
            <h2 className={paCss.section__title}>Contributor</h2>
            <p className={paCss.default_text}>
              To claim your swag for the this level:
            </p>
            <p className={paCss.property}>
              You have asked or answered a question on Stack Overflow{" "}
              <a
                className={paCss.link_item}
                href={siteConfig.customFields.stackoverflowUrl}
              >
                with the QuestDB tag
              </a>
            </p>
            <p className={paCss.property}>
              You have voted, commented on, or opened a{" "}
              <a className={paCss.link_item} href="#">
                GitHub issue
              </a>
            </p>
            <div>
              <p className={paCss.default_text}>How to contribute?</p>
              <div className={paCss.contributes}>
                {contributes.map((item: Contribute, index: number) => (
                  <div className={paCss.contribute_Item} key={index}>
                    <div className={paCss.contribute_Inner}>
                      <img
                        src={item.image}
                        alt="icon"
                        className={paCss.main_icon}
                      />
                      <span className={paCss.contribute_text}>
                        {item.title}
                      </span>
                    </div>
                    <img src="/img/pages/community/arrow.svg" alt="arrow" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={`${paCss.half__section} ${paCss.section_center}`}>
            <img
              src="/img/pages/community/step2.svg"
              alt=""
              className={paCss.section_image}
            />
            <div className={`${paCss.custom_box} ${paCss.text_center}`}>
              <p className={`${paCss.default_text} ${paCss.mb5}`}>
                What you get:
              </p>
              <p className={paCss.second_text}>High-quality QuestDB t-shirt</p>
            </div>
          </div>
        </div>
      </section>
      <section className={clsx(seCss["section--odd"])}>
        <div
          className={clsx(
            seCss["section--inner"],
            paCss.flex__reverse_section,
            seCss["section--center"],
          )}
        >
          <div className={paCss.half__section}>
            <p className={paCss.level__title}>Level 3</p>
            <h2 className={paCss.section__title}>Dedicated to the Quest</h2>
            <p className={paCss.default_text}>
              To claim your swag for the this level:
            </p>
            <p className={paCss.property}>
              You have written a{" "}
              <a className={paCss.link_item} href="#">
                tutorial or guide using QuestDB
              </a>
            </p>
            <div className={paCss.card}>
              <p className={`${paCss.default_text} ${paCss.mb5}`}>
                How can you claim swag?
              </p>
              <p className={`${paCss.default_text} ${paCss.mb5}`}>
                Send an email to{" "}
                <a className={paCss.link_item} href="mailto: swag@questdb.io">
                  swag@questdb.io
                </a>{" "}
                with the following information:
              </p>
              <p className={paCss.list__description}>
                Subject: Level (1/2/3) Swag Plz!
              </p>
              <p className={paCss.list__description}>
                Your message must contain:
              </p>
              <div className={paCss.message__contents}>
                <p className={paCss.message__content}>First name & last name</p>
                <p className={paCss.message__content}>A shipping address</p>
                <p className={paCss.message__content}>
                  Shirt size (if applicable)
                </p>
                <p className={paCss.message__content}>
                  Claim details e.g. (Github username, relevant URLs)
                </p>
              </div>
            </div>
          </div>
          <div className={`${paCss.half__section} ${paCss.section_center}`}>
            <img
              src="/img/pages/community/step3.svg"
              alt="image"
              className={paCss.section_image}
            />
            <div className={`${paCss.custom_box} ${paCss.text_center}`}>
              <p className={`${paCss.default_text} ${paCss.mb5}`}>
                What you get:
              </p>
              <p className={paCss.second_text}>
                For this level, we have even more cool swag in store!
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default Community
