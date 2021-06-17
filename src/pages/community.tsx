import React from "react"
import clsx from "clsx"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import PageLayout from "@theme/PageLayout"
import Button from "@theme/Button"
import seCss from "../css/section.module.css"
import paCss from "../css/community/page.module.css"
import MailchimpSubscribe from "react-mailchimp-subscribe"

type FormProps = {
  status: string
  message: string
  onValidated: Function
}

const CustomForm: React.FC<FormProps> = ({
  status,
  message,
  onValidated,
}: FormProps) => {
  let email
  const submit = () =>
    email != null &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
    })

  return (
    <div>
      <input
        className={paCss.custom_input}
        ref={(node) => (email = node)}
        type="email"
        placeholder="Email address"
      />
      <Button onClick={submit} className={paCss.signup_button}>
        Sign Up
      </Button>
      {status === "sending" && <div>sending...</div>}
      {status === "error" && (
        <div dangerouslySetInnerHTML={{ __html: message }} />
      )}
      {status === "success" && (
        <div dangerouslySetInnerHTML={{ __html: message }} />
      )}
    </div>
  )
}

type Contribute = {
  alt: string
  image: JSX.Element
  title: string
  url: string
}

const PlugInIcon = () => {
  return (
    <svg fill="none" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.707 18l3.103-3.116a6.183 6.183 0 0 0 3.437 1.056h.906a6.18 6.18 0 0 0 4.372-1.81l3.018-3.017L14.68 9.25 18 5.932l-1.708-1.708-3.32 3.319-2.517-2.516 3.32-3.32L12.067 0l-3.32 3.319L6.89 1.458 3.871 4.475a6.181 6.181 0 0 0-1.81 4.375v.905a6.18 6.18 0 0 0 1.056 3.437L0 16.294zm2.768-9.15A3.741 3.741 0 0 1 5.58 6.186l1.31-1.31 6.244 6.237-1.31 1.309a3.745 3.745 0 0 1-2.671 1.104h-.906c-1 .002-1.96-.396-2.668-1.104a3.761 3.761 0 0 1-1.104-2.667z"
        fill="currentColor"
      />
    </svg>
  )
}

const BugIcon = () => {
  return (
    <svg width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.656 4.769h-.281V3.577C12.375 1.6 10.865 0 9 0 7.136 0 5.625 1.6 5.625 3.577v1.192h-.281a2.183 2.183 0 0 0-1.538.65L0 3.46v2.65l3.094 1.592v1.836H0v2.384h3.108c.021.57.115 1.136.281 1.678L0 15.35V18l4.5-2.32c1.12 1.398 2.76 2.204 4.49 2.204 1.73 0 3.372-.806 4.49-2.203L17.98 18v-2.65L14.6 13.6c.166-.542.26-1.107.28-1.678H18V9.538h-3.094V7.702L18 6.11V3.46l-3.806 1.96a2.183 2.183 0 0 0-1.538-.65zM7.875 15.308c-1.508-.517-2.53-2.004-2.531-3.684v-4.47h2.53v8.154zm0-10.54v-1.19c0-.66.503-1.193 1.125-1.193s1.125.534 1.125 1.193V4.77h-2.25zm4.781 6.856c0 1.68-1.023 3.167-2.531 3.684V7.153h2.531v4.471z"
        fill="currentColor"
      />
    </svg>
  )
}

const DocsIcon = () => {
  return (
    <svg fill="none" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 0v18h18V0zm11.25 14.539h-7.5v-2.077h7.5zm3-4.5H3.75V7.962h10.5zm0-4.5H3.75V3.461h10.5z"
        fill="currentColor"
      />
    </svg>
  )
}

const ArrowIcon = () => {
  return (
    <svg fill="none" height="11" width="8" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 10l6-4.5L1 1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

const contribution: Contribute[] = [
  {
    image: <PlugInIcon />,
    title: "Help build a new feature",
    url: "https://github.com/questdb/questdb",
    alt: "A plugin icon",
  },
  {
    image: <BugIcon />,
    title: "Report an issue",
    url: "https://github.com/questdb/questdb/issues",
    alt: "A bug icon",
  },
  {
    image: <DocsIcon />,
    title: "Improve the docs",
    url: "https://github.com/questdb/questdb.io",
    alt: "A document icon",
  },
]

const Community = () => {
  const { siteConfig } = useDocusaurusContext()
  const newsletterUrl =
    "https://questdb.us7.list-manage.com/subscribe/post?u=f692ae4038a31e8ae997a0f29&amp;id=bdd4ec2744"
  const title = "QuestDB developer community"
  const description =
    "Get involved with the developer community that's building the fastest open-source time series database."

  return (
    <PageLayout canonical="/community" description={description} title={title}>
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
              We’re super proud of the QuestDB community and everything our
              contributors do
            </h2>
            <p
              className={clsx(seCss.section__subtitle, paCss.section__subtitle)}
            >
              As a way of saying &quot;thank you&quot; for being part of the
              journey, we want to offer contributors some of our stickers, pins,
              t-shirts, and awesome virtual swag.
            </p>
            <div className={paCss.border} />
            <div>
              <p className={paCss.default_text}>
                Stay up to date with all things QuestDB
              </p>
              <div>
                <MailchimpSubscribe
                  url={newsletterUrl}
                  render={({ subscribe, status, message }) => (
                    <CustomForm
                      status={status}
                      message={message}
                      onValidated={(formData) => subscribe(formData)}
                    />
                  )}
                />
              </div>
            </div>
            <div className={paCss.join_slack}>
              <p
                className={`${paCss.default_text} ${paCss.join_slack_description}`}
              >
                Join our growing community on &nbsp;
                <a
                  className={paCss.link_item}
                  href={siteConfig.customFields.slackUrl}
                >
                  QuestDB’s Slack
                </a>
              </p>
              <a
                className={paCss.link_item}
                href={siteConfig.customFields.slackUrl}
              >
                <img
                  src="/img/pages/community/slack-logo.svg"
                  alt="slack logo"
                  className={paCss.slack_logo}
                  width={50}
                  height={50}
                />
              </a>
            </div>
          </div>
          <div className={`${paCss.half__section} ${paCss.section_center}`}>
            <img
              src="/img/pages/community/slack.png"
              alt="A collage showing conversation from the QuestDB community Slack workspace with QuestDB stickers that participants receive"
              className={paCss.section_image}
              width={500}
              height={500}
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
                src="/img/pages/community/stickers-mugs.png"
                alt="A mug and a pack of stickers printed with the QuestDB logo"
                className={paCss.section_image}
                width={500}
                height={414}
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
            <h2 className={paCss.section__title}>Open-source contributor</h2>
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
              <a
                className={paCss.link_item}
                href="https://github.com/questdb/questdb/issues"
              >
                GitHub issue
              </a>
            </p>
            <div className={paCss.contribution}>
              <p className={paCss.default_text}>How to contribute?</p>
              <div>
                {contribution.map((item: Contribute, index: number) => (
                  <div className={paCss.contribute_Item} key={index}>
                    <div className={paCss.contribute_Inner}>
                      <span className={paCss.contribute_icon}>
                        {item.image}
                      </span>
                      <span className={paCss.contribute_text}>
                        <a
                          className={paCss.contribution_link_item}
                          href={item.url}
                        >
                          {item.title}
                        </a>
                      </span>
                    </div>
                    <a className={paCss.contribution_link_item} href={item.url}>
                      <ArrowIcon />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={`${paCss.half__section} ${paCss.section_center}`}>
            <img
              src="/img/pages/community/questdb-shirt.png"
              alt="A black t-shirt with the QuestDB logo printed on the front"
              className={paCss.section_image}
              width={500}
              height={500}
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
              <a className={paCss.link_item} href="/tutorial/">
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
                Subject: Level (1/2/3) Swag!
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
                  Claim details e.g. (GitHub username, relevant URLs)
                </p>
              </div>
            </div>
          </div>
          <div className={`${paCss.half__section} ${paCss.section_center}`}>
            <img
              src="/img/pages/community/questdb-swag-mousemat.png"
              alt="A pink and black water bottle, a cellphone cover and a circular mousemat printed with the QuestDB logo"
              className={paCss.section_image}
              width={500}
              height={561}
            />
            <div className={`${paCss.custom_box} ${paCss.text_center}`}>
              <p className={`${paCss.default_text} ${paCss.mb5}`}>
                What you get:
              </p>
              <p className={paCss.second_text}>
                For this level, we have even more cool swag!
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default Community
