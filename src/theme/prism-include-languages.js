import { constants, dataTypes, functions, keywords } from "@questdb/sql-grammar"
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment"

const prismIncludeLanguages = (Prism) => {
  if (ExecutionEnvironment.canUseDOM) {
    Prism.languages["questdb-sql"] = {
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
        lookbehind: true,
      },
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
      keyword: new RegExp(
        `\\b(?:${keywords.concat(dataTypes).join("|")})\\b`,
        "i",
      ),
      boolean: new RegExp(`\\b(?:${constants.join("|")})\\b`, "i"),
      number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
      operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:)\b/i,
      punctuation: /[;[\]()`,.]/,
    }
  }
}

export default prismIncludeLanguages
