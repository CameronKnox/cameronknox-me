# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Rules

- Never include "Co-Authored-By", "Created by", or "Generated with Claude Code" in commit messages or PR descriptions.

## Project Overview

This is a personal tech blog built with Hugo static site generator. The site features:
- Custom light-only minimal theme
- Analog clock in the header and homepage hero
- Monospace aesthetic using self-hosted JetBrains Mono
- Tag and category taxonomy for blog posts
- Responsive design with custom CSS

## Development Commands

### Start development server
```bash
hugo server
```
Runs local dev server with live reload, typically at http://localhost:1313

### Build for production
```bash
hugo
```
Builds static site to `public/` directory

### Create new blog post

Using the provided scripts (includes template with frontmatter):

**Linux/Mac:**
```bash
./new-post.sh "Post Title" "category1,category2" "tag1,tag2,tag3"
```

**PowerShell:**
```powershell
.\new-post.ps1 "Post Title" "category1,category2" "tag1,tag2,tag3"
```

**Windows Batch:**
```batch
new-post.bat "Post Title" "category1,category2" "tag1,tag2,tag3"
```

These scripts create posts in `content/posts/` with proper frontmatter and template content.

## Architecture

### Theme

- Light-only; colors are CSS custom properties on `:root` in `static/css/main.css`
- JetBrains Mono is self-hosted from `static/fonts/` and preloaded in `baseof.html`

### Clock System

The analog clocks (header and homepage hero) are driven by CSS animations, with `static/js/analog-clock.js` only syncing them:
- Each hand runs an infinite linear `clock-spin` animation (60s / 3600s / 43200s) defined in `static/css/main.css`
- JS sets a negative `animation-delay` per hand from the current time, so there is no per-frame JavaScript
- Hands stay hidden (`.analog-clock:not(.is-ready)`) until JS positions them, which prevents a flash at 12:00
- Resyncs every minute, on tab focus, and on back/forward cache restore (covers DST, sleep/wake)
- Under `prefers-reduced-motion`, the second hand ticks with `steps(60)`; the global reduced-motion rule excludes `.hand`
- Clock SVG lives in `layouts/partials/clock.html` (takes a size class: `clock-sm` or `clock-lg`)
- Script is loaded with `defer`

### Template Structure

Hugo templates use Go's template syntax:

- **`layouts/_default/baseof.html`** - Base template for all pages: head/SEO meta, top bar with nav and clock, footer

- **`layouts/index.html`** - Homepage hero plus the 10 most recent posts ("All posts" link appears past 10)

- **`layouts/partials/post-item.html`** - Shared post card used by every list page; edit this instead of duplicating markup

- **`layouts/_default/single.html`** - Individual post/page template (date, reading time and prev/next only render for the `posts` section)

- **`layouts/_default/list.html`** - List pages (e.g., all posts)

- **`layouts/_default/terms.html`** - Tags/categories index, rendered as pills sorted by post count

- **`layouts/taxonomy/*.html`** - Tag and category archive pages

- **`data/projects.toml`** - Work/projects list (name, url, optional description). Rendered by `layouts/partials/projects.html` on the homepage "Work" section and on About via the `{{< projects >}}` shortcode; edit projects here only

- **`archetypes/default.md`** - Basic frontmatter template (simple TOML format)

### Content Structure

Blog posts live in `content/posts/` with frontmatter:

```yaml
---
title: "Post Title"
date: 2025-01-23T15:25:00-05:00
description: "Brief description for SEO"
tags: ["tag1", "tag2"]
categories: ["blog"]
draft: false
---
```

- Posts use Markdown with Goldmark renderer
- `unsafe = false`, so raw HTML in Markdown is stripped
- Syntax highlighting uses the light `github` style (configured in `hugo.toml`)

### Configuration

**`hugo.toml`** contains:
- Base URL: `https://cameronknox.io/`
- Menu definitions (Home, About, Tags)
- `[params]` site description and avatar (used for meta description and og:image)
- Markdown/syntax highlighting settings
- `buildFuture = false` - future-dated posts are not published

### Static Assets

- **CSS:** `static/css/main.css` - Single CSS file with all styles
  - CSS custom properties for theming
  - Layout widths: `--content-width` (960px, homepage and lists, top bar matches it) and `--reading-width` (720px, applied via `.content-narrow` to posts and standalone pages)
  - Monospace font stack throughout

- **JavaScript:** `static/js/analog-clock.js` - Clock animation

- **`static/_headers`** - Security headers/CSP for the host; add any new third-party image or script origin here

- **Favicon:** `static/favicon.ico`

## Important Notes

- The site uses monospace fonts exclusively (JetBrains Mono, with Cascadia Code/Consolas fallbacks)
- The clock is the only JavaScript, vanilla with no frameworks
- Posts are stored with underscored filenames (e.g., `first_blog_post.md`)
- The `public/` directory is the build output and should not be edited directly
