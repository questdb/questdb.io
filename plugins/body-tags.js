const {
  customFields,
  favicon,
  organizationName,
  url,
} = require("../docusaurus.config.js")

const innerHTML = `{
  "@context" : "http://schema.org",
  "@type" : "Organization",
  "name" : "${organizationName}",
  "url" : "${url}",
  "logo" : "${url}/${favicon}",
  "description": "${customFields.description}",
  "sameAs" : [
    "${customFields.twitterUrl}",
    "${customFields.linkedInUrl}"
  ]
}`

module.exports = () => ({
  name: "body-tags",
  injectHtmlTags() {
    return {
      preBodyTags: [
        {
          tagName: "script",
          attributes: {
            type: "application/ld+json",
          },
          innerHTML,
        },
      ],
    }
  },
})
