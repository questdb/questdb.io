import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment"
import siteConfig from "@generated/docusaurus.config"
import { constants, dataTypes, functions, keywords } from "@questdb/sql-grammar"

const prismIncludeLanguages = (PrismObject) => {
  if (ExecutionEnvironment.canUseDOM) {
    const {
      themeConfig: { prism: { additionalLanguages = [] } = {} },
    } = siteConfig
    window.Prism = PrismObject
    additionalLanguages.forEach((lang) => {
      require(`prismjs/components/prism-${lang}`) // eslint-disable-line
    })
    Prism.languages["questdb-sql"] = {
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
        lookbehind: true,
      },
      dataType: new RegExp(`\\b(?:${dataTypes.join("|")})\\b`, "i"),
      variable: [
        {
          pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
          greedy: true,
        },
        /@[\w.$]+/,
      ],
      string: {
        pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
        greedy: true,
        lookbehind: true,
      },
      function: new RegExp(`\\b(?:${functions.join("|")})(?=\\s*\\()`, "i"),
      keyword: new RegExp(`\\b(?:${keywords.join("|")})\\b`, "i"),
      boolean: new RegExp(`\\b(?:${constants.join("|")})\\b`, "i"),
      number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
      number: /[+-]?\b\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/i,
      operator: /[\+|\-|\/|\/\/|%|<@>|@>|<@|&|\^|~|<|>|<=|=>|==|!=|<>|=|!~]/i,
      punctuation: /[;[\]()`,.]/,
    }
    delete window.Prism
  }
}

export default prismIncludeLanguages
