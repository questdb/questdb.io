---
title: Content hierarchy
---

Documentation should follow a hierarchy, this is true both for the content and
how titles are organized. In most cases, you can refer to a template and reuse
the hierarchy exposed there. When you write a page that does not derive from a
template, please follow the guidelines exposed here.

## Content

When you need to show a command, please show it at the top of your page as much
as possible. This will ensure that users can easily copy/paste code without
having to scan the whole page.

It is okay to be very descriptive and thorough, however not every detail should
have the same weight. If you are documenting a function with many arguments,
please start with the most common ones first, gradually defining the ones that
people are less likely to use.

## Titles

Pages need to start with text, not a title. Titles should always follow the
following hierarchy:

```shell
h1 (title) > h2 (##) > h3 (###) > h4 (####)
```

This will improve readability and SEO. Example:

```markdown
## The first title should be H2

Then there should be some text

### Then further titles should be H3

Then ideally some text. Subsequent titles can then be used

#### For example H4

or even

##### For example H5

etc
```

## Bad practices

- Repetitive subtitles
- Too many Tip/Info/Warning. Please use maximum 1-2 per page.
