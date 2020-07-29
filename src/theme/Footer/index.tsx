import clsx from "clsx"
import Link from "@docusaurus/Link"
import useBaseUrl from "@docusaurus/useBaseUrl"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import React from "react"

import { Button, useHomeContext } from "../../components"
import sectionStyles from "../../components/Section/styles.module.css"
import footerStyles from "./styles.module.css"

type Props = Readonly<{
  href?: string
  label: string
  to?: string
}>

const FooterLink = ({ to, href, label, ...props }: Props) => {
  const linkHref = useBaseUrl(href || "", { forcePrependBaseUrl: false })
  const linkTo = useBaseUrl(to || "")

  return (
    <Link
      className={footerStyles.footer__link}
      {...(href
        ? {
            href: linkHref,
            rel: "noopener noreferrer",
            target: "_blank",
          }
        : { to: linkTo })}
      {...props}
    >
      {label}
    </Link>
  )
}

const Footer = () => {
  const context = useDocusaurusContext()
  const homeContext = useHomeContext()
  const { siteConfig } = context
  const { themeConfig } = siteConfig
  const { footer } = themeConfig
  const { copyright, links } = footer

  return (
    <footer
      className={clsx(footerStyles.footer, sectionStyles.section, {
        [footerStyles["footer--alt"]]: homeContext === true,
      })}
    >
      <div
        className={clsx(
          footerStyles.footer__inner,
          sectionStyles["section--inner"],
        )}
      >
        <div
          className={clsx(
            footerStyles.footer__column,
            footerStyles["footer__column--left"],
          )}
        >
          <img
            alt="QuestDB Logo"
            className={footerStyles.footer__logo}
            src="/img/questdbLogoMono.svg"
          />
          <div className={footerStyles.footer__tagline}>
            {siteConfig.tagline}
          </div>

          <Button
            className={footerStyles.footer__github}
            href={siteConfig.customFields.githubUrl}
            icon={
              <img
                alt="GitHub icon"
                height="22"
                src="/img/githubIcon.svg"
                width="22"
              />
            }
            size="xsmall"
            uppercase={false}
            variant="secondary"
          >
            Star us on GitHub
          </Button>
        </div>

        <div
          className={clsx(
            footerStyles.footer__column,
            footerStyles["footer__column--right"],
          )}
        >
          {links.map((linkItem, i) => (
            <div key={i} className={footerStyles.footer__links}>
              {linkItem.title && (
                <div className={footerStyles.footer__title}>
                  {linkItem.title}
                </div>
              )}

              {linkItem.items && (
                <ul className={footerStyles.footer__items}>
                  {linkItem.items.map((item) => (
                    <li
                      className={footerStyles.footer__item}
                      key={item.href || item.to}
                    >
                      <FooterLink {...item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={footerStyles.footer__bottom}>
        <div
          className={footerStyles.footer__copyright}
          // Developer provided the HTML, so assume it's safe.
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: copyright,
          }}
        />
      </div>
    </footer>
  )
}

export default Footer
