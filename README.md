# 🏍️ Бип-бип, сука

A [Hugo](https://gohugo.io/) static blog about motorcycle news — translations, reviews, racing, and tech. Content is in Russian. Live at **[blog.alimov.top](https://blog.alimov.top)**.

**Theme:** [Mainroad](https://github.com/Vimux/Mainroad)

---

## Quick start

**Requirements:** [Hugo (Extended)](https://gohugo.io/installation/)

```bash
# Clone with theme submodules
git clone --recurse-submodules <your-repo-url>
cd my-blog

# Run dev server
hugo server -D
```

Open http://localhost:1313. Drafts are shown when using `-D`.

---

## Adding a post

Create a new file under `content/posts/YYYY/MM/slug.md` with frontmatter like:

```yaml
---
title: "Заголовок статьи"
date: 2026-02-10T12:35:51
categories:
  - Новости
  - Гонки
tags:
  - MotoGP
source: "https://example.com/original-article/"
cover:
  image: "https://example.com/cover.jpg"
  alt: "Описание изображения"
  hidden: false
---

Текст поста в Markdown…
```

Permalinks are `/:contentbasename/` (e.g. `/slug/`).

---

## Build & deploy

**Local build:**

```bash
hugo --gc --minify
```

Output is in `public/` (gitignored).

**Deploy:** Pushing to `main` runs [GitHub Actions](.github/workflows/hugo-cd.yaml): the site is built and published to GitHub Pages. Custom domain is set via `static/CNAME` and the workflow.

---

## Project layout

| Path | Purpose |
|------|--------|
| `hugo.toml` | Site config, params, menu, Goldmark |
| `content/posts/` | Articles (by year/month) |
| `layouts/` | Custom templates (override theme) |
| `layouts/partials/` | Partials (footer, post_meta, etc.) |
| `static/css/extra.css` | Custom styles |
| `static/CNAME` | Custom domain for GitHub Pages |
| `i18n/ru.yaml` | Russian UI strings |
| `themes/mainroad/` | Active theme (git submodule) |

---

## Useful commands

```bash
# Update theme submodules
git submodule update --init --recursive

# Build without drafts/future/expired
hugo --gc --minify
```

---

## License

Content and code in this repo are subject to the project’s license. Theme and other submodules have their own licenses.
