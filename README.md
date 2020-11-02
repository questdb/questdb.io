[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-green.svg)](https://conventionalcommits.org)

# questdb.io

[This website](https://questdb.io) is built using
[Docusaurus 2](https://v2.docusaurus.io/). Pages & components are written in
TypeScript, the styles in vanilla CSS with variables using
[CSS Modules](https://github.com/css-modules/css-modules).

<!-- prettier-ignore-start -->
<div align="center">
  <a href="http://questdb.io">
    <img src=".github/console.png" width="400" />
  </a>
</div>
<div align="center">
  <a href="http://questdb.io">
    questdb.io
  </a>
</div>
<!-- prettier-ignore-end -->

## Installation

```script
yarn
```

## Local development

```script
yarn start
```

This command starts a local development server and open up a browser window.
Most changes are reflected live without having to restart the server.

## Build for production

```script
yarn build
```

This command generates static content into the `build` directory and can be
served using any static contents hosting service. For that purpose, you can also
use:

```script
yarn serve
```

# Contributing

Feel free to contribute to the project by forking the repository and submitting
pull requests.

## Guidelines

Consult the
[guidelines](https://github.com/questdb/questdb.io/blob/master/docs/__guidelines/markdown.md).

## Lexicon

Consult the
[lexicon](https://github.com/questdb/questdb.io/blob/master/docs/__guidelines/lexicon.md)
for terminology we commonly use

## Commits

The commit messages must follow the
[Conventional Commits](https://conventionalcommits.org/) spec.

# Code Quality

## 1. Linting

The coding style rules are defined by [Prettier](https://prettier.io/) and
enforced by [Eslint](https://eslint.org)

On top of this, we follow the rules set by the
[JavaScript Standard Style](https://standardjs.com/rules.html).

You do not need to run the linting task manually, Webpack will take care of that
for you.

## 2. Git Hooks

We use [Husky](https://github.com/typicode/husky) to automatically deploy git
hooks.

On every `git commit` we check that images added to `static/img/*` do not exceed
10MB.
