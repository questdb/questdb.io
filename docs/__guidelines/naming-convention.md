---
title: Naming convention
---

Our conventions improve consistency and ensure that we have optimal SEO.

## New page

### File name

`file-name.md` (kebab-case, no uppercase here, the same rule applies to blog
posts)

### Title

`A descriptive title` (No Pascal Case)

### Markdown attributes

- `id`: please do NOT set the `id`, Docusaurus will automatically compute it
  from the file path and name.
- `sidebar_label`: `Custom name`, do not set if it is the same as title,
  Docusaurus will automatically fallback to it.

## Images

Images should always be inserted in markdown, not HTML:

```shell
[Image description](path/to/img.jpg)
```

The description is important, it will populate the `alt` attribute which
improves SEO.

## Links

Links should always be inserted in markdown, not HTML:

```shell
[link text](https://path/to/resource.html)
```

:::caution

Please use **meaningful** wording for the link text, content such as "here" or
"click here" is forbidden since it will negatively impact SEO.

:::
