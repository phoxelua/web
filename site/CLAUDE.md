# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See README.md for build commands, project structure, content management, and deployment instructions.

## Branch Strategy

- `master` — source code
- `gh-pages` — built/deployed site (current working branch)

The compiled site lives in `/site/`. Deployment is pushing to `gh-pages`.

## Build

- `jekyll build` — builds to `/site/`
- `jekyll serve --port 4000` — local dev server
- Always rebuild and commit `site/` alongside source changes

## Architecture Notes

Modern portfolio site. No jQuery or Bootstrap — vanilla JS + CSS custom properties. Dark theme only.

- `_layouts/default.html` — homepage shell (hero, career, portfolio)
- `_layouts/project.html` — dedicated project page layout with back link and content sections
- `_includes/nav.html` — shared navigation component (adapts links for homepage vs project pages)
- `_includes/css/agency.css` — full stylesheet; uses **Liquid variables** for accent colors from `_config.yml` and **CSS custom properties** for theming
- `_plugins/hex_to_rgb.rb` — Jekyll filter converting hex → RGB for `rgba()` usage in CSS
- `_includes/head.html` — SEO/meta tags (Open Graph, Twitter Cards, per-page descriptions/images)
- `js/agency.js` — vanilla JS: smooth scroll, scrollspy, IntersectionObserver scroll reveals, mobile nav
- `js/loader.js` — page load spinner fade-out

## Key Files for Common Changes

- **Colors**: `_config.yml` (`color.primary`, `color.secondary`) → Liquid into `agency.css`
- **Career timeline**: `_includes/career.html` — compact left-rail layout
- **Portfolio grid**: `_includes/portfolio_grid.html` — CSS Grid, links to `/portfolio/<slug>/` pages
- **Project pages**: `_layouts/project.html` + `_posts/*.markdown` (layout: project) — dedicated pages at `/portfolio/<slug>/`
- **Navigation**: `_includes/nav.html` — shared nav used by both layouts
- **Section redirects**: `career/index.html` and `portfolio/index.html` — meta-refresh redirects to `/#career` and `/#portfolio`
- **Custom domain**: `CNAME` file

## CSS Conventions

- All colors use CSS custom properties (`--bg`, `--text`, `--accent`, etc.) defined in `:root`
- Link styles (text-decoration, color) are reset globally on `a, a:visited, a:active, a:focus` — don't add redundant resets on child selectors
- `text-transform: none` is set on the base `h1-h6` rule — don't repeat it on individual heading selectors
- Touch targets must be at least 44x44px (WCAG)
- Image `<img>` tags should include `width` and `height` attributes to prevent CLS
- Use absolute image paths (`/img/...`) not relative

## Content Style

- About section: use dashes attached to left word (`foo- bar` not `foo — bar`)
- Career dates: use spaced dashes (`2021 - Present`)

## Adding a New Portfolio Project

1. Create `_posts/YYYY-MM-DD-slug.markdown` with front matter:
   ```yaml
   title, subtitle, layout: project, project-date, technologies, topics, description, date, thumbnail, teaser, gallery
   ```
2. Add images to `img/portfolio/<slug>/`
3. Rebuild: `jekyll build`
