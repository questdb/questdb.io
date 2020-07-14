import clsx from "clsx"
import React from "react"

import Link from "@docusaurus/Link"
import useBaseUrl from "@docusaurus/useBaseUrl"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

import Button from "../../components/Button"
import sectionStyles from "../../components/Section/styles.module.css"
import footerStyles from "./styles.module.css"

const FooterLink = ({ to, href, label, ...props }) => (
  <Link
    className={footerStyles.footer__link}
    {...(href
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
          href: useBaseUrl(href, { forcePrependBaseUrl: false }),
        }
      : {
          to: useBaseUrl(to),
        })}
    {...props}
  >
    {label}
  </Link>
)

const Footer = () => {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  const { themeConfig = {} } = siteConfig
  const { footer } = themeConfig
  const { copyright, links = [], logo = {} } = footer || {}
  const logoUrl = useBaseUrl(logo.src)

  return (
    <footer className={clsx(footerStyles.footer, sectionStyles.section)}>
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
          <h4 className={footerStyles.footer__tagline}>
            {siteConfig.tagline}.
          </h4>

          <Button
            className={footerStyles.footer__github}
            href="https://github.com/questdb/questdb"
            icon={
              <img
                alt="GitHub icon"
                src="/img/githubIcon.svg"
                height="22"
                width="22"
              />
            }
            size="xsmall"
            style="secondary"
            uppercase={false}
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
                <h4 className={footerStyles.footer__title}>{linkItem.title}</h4>
              )}

              {linkItem.items && (
                <ul className={footerStyles.footer__items}>
                  {linkItem.items.map((item, key) => (
                    <li
                      key={item.href || item.to}
                      className={footerStyles.footer__item}
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
