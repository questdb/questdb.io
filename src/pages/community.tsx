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
  image: string
  title: string
  url: string
}

const contribution: Contribute[] = [
  {
    image: "/img/pages/community/plugin.svg",
    title: "Help build a new feature",
    url: "https://github.com/questdb/questdb",
    alt: "A plugin icon",
  },
  {
    image: "/img/pages/community/bug.svg",
    title: "Report an issue",
    url: "https://github.com/questdb/questdb/issues",
    alt: "A bug icon",
  },
  {
    image: "/img/pages/community/docs.svg",
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
                      <img
                        src={item.image}
                        alt={item.alt}
                        className={paCss.main_icon}
                        width={18}
                        height={18}
                      />

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
                      <img
                        src="/img/pages/community/arrow.svg"
                        alt="An arrow icon"
                        width={8}
                        height={11}
                      />
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
