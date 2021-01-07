import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment"
import { constants, dataTypes, functions, keywords } from "@questdb/sql-grammar"

const prismIncludeLanguages = (Prism) => {
  if (ExecutionEnvironment.canUseDOM) {
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
  }
}

export default prismIncludeLanguages
