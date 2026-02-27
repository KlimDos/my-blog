---
title: "Статьи"
---

### Фильтр по категориям
{{ range .Site.Taxonomies.categories }}
  <a href='{{ .Page.Permalink }}'>{{ .Page.Title }}</a>
{{ end }}

### Фильтр по тегам
{{ range .Site.Taxonomies.tags }}
  <a href='{{ .Page.Permalink }}'>{{ .Page.Title }}</a>
{{ end }}