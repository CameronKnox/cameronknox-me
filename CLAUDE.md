# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal tech blog built with Hugo static site generator. The site features:
- Custom theme with light/dark mode toggle
- Analog clock in the header
- Terminal/PowerShell aesthetic using monospace fonts (Cascadia Code, Consolas)
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

### Theme System

**Critical: Preventing Theme Flash (FOUC)**
- Theme initialization happens in TWO places and must remain synchronized:
  1. Inline `<script>` in `layouts/_default/baseof.html:33-76` - runs immediately before DOM renders
  2. `static/js/theme-toggle.js` - handles theme toggling after page load
- The inline script applies theme BEFORE first paint to prevent flash
- Uses `.no-transitions` class during initialization to disable transitions
- Theme preference stored in `localStorage` with key `'theme-preference'`
- Falls back to system preference (`prefers-color-scheme`) if no stored preference
- CSS variables defined in `static/css/main.css` for both `[data-theme="light"]` and `[data-theme="dark"]`

**When modifying theme:**
- Keep inline script and theme-toggle.js logic synchronized
- Never remove the inline theme initialization script
- Test tab navigation and page reloads to ensure no flash occurs

### Clock System

The analog clock in the header is powered by `static/js/analog-clock.js`:
- Uses `requestAnimationFrame` for smooth 60fps animation
- Calculates smooth hand positions using milliseconds (no "ticking" second hand)
- Handles visibility changes - stops when tab is hidden, resumes when visible
- Sets initial position without animation to prevent stuttering on page load
- Clock SVG defined inline in `layouts/_default/baseof.html:98-127`
- All clock elements use cached references for performance

**When modifying clock:**
- Initial positioning must happen immediately without transitions to prevent stutter
- Visibility change handlers prevent unnecessary animation when tab is inactive

### Template Structure

Hugo templates use Go's template syntax:

- **`layouts/_default/baseof.html`** - Base template for all pages, includes:
  - Theme initialization script
  - Header with clock and navigation
  - Footer with social links
  - All global CSS/JS includes

- **`layouts/index.html`** - Homepage, shows 10 most recent posts from `/posts` section

- **`layouts/_default/single.html`** - Individual post/page template

- **`layouts/_default/list.html`** - List pages (e.g., all posts)

- **`layouts/taxonomy/*.html`** - Tag and category archive pages

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
- `unsafe = true` in config allows raw HTML in Markdown
- Syntax highlighting uses monokai theme (configured in `hugo.toml`)

### Configuration

**`hugo.toml`** contains:
- Base URL: `https://cameronknox.io/`
- Menu definitions (Home, All posts, About, Tags)
- Social links (GitHub)
- Markdown/syntax highlighting settings
- `buildFuture = true` - publishes posts with future dates

### Static Assets

- **CSS:** `static/css/main.css` - Single CSS file with all styles
  - CSS custom properties for theming
  - Monospace font stack throughout

- **JavaScript:**
  - `static/js/theme-toggle.js` - Theme switching logic
  - `static/js/analog-clock.js` - Clock animation

- **Favicon:** `static/favicon.ico`

## Important Notes

- The site uses monospace fonts exclusively (Cascadia Code, Consolas fallbacks) for terminal aesthetic
- All interactive features (clock, theme toggle) use vanilla JavaScript - no frameworks
- Theme system requires coordination between inline script and external JS
- Posts are stored with underscored filenames (e.g., `first_blog_post.md`)
- The `public/` directory is the build output and should not be edited directly
