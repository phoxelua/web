# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See README.md for build commands, project structure, content management, and deployment instructions.

## Branch Strategy

- `master` — source code
- `gh-pages` — built/deployed site (current working branch)

The compiled site lives in `/site/`. Deployment is pushing to `gh-pages`.

## Build

- `source ~/.zshrc` is required before running `jekyll` commands (rbenv/ruby setup)
- `jekyll build` — builds to `/site/`
- `jekyll serve --port 4000` — local dev server
- Always rebuild and commit `site/` alongside source changes

## Architecture Notes

Modern single-page portfolio. No jQuery or Bootstrap — vanilla JS + CSS custom properties.

- `_layouts/default.html` — page shell; includes inline `<script>` for theme persistence (prevents FOUC)
- `_includes/css/agency.css` — full stylesheet; uses **Liquid variables** for accent colors from `_config.yml` and **CSS custom properties** for theming (light/dark via `[data-theme="dark"]`)
- `_plugins/hex_to_rgb.rb` — Jekyll filter converting hex → RGB for `rgba()` usage in CSS
- `_includes/head.html` — SEO/meta tags (Open Graph, Twitter Cards, JSON-LD)
- `_layouts/project.html` — dedicated project page layout with nav, back link, content sections
- `js/agency.js` — vanilla JS: theme toggle (localStorage), smooth scroll, scrollspy, IntersectionObserver scroll reveals
- `js/loader.js` — page load spinner fade-out

## Key Files for Common Changes

- **Colors/theme**: `_config.yml` (`color.primary`, `color.secondary`) → Liquid into `agency.css`. Light/dark variants in `:root` vs `[data-theme="dark"]` blocks
- **Career timeline**: `_includes/career.html` — compact left-rail layout
- **Portfolio grid**: `_includes/portfolio_grid.html` — CSS Grid, links to `/portfolio/<slug>/` pages
- **Project pages**: `_layouts/project.html` + `_posts/*.markdown` (layout: project) — dedicated pages at `/portfolio/<slug>/`
- **Section redirects**: `career/index.html` and `portfolio/index.html` — meta-refresh redirects to `/#career` and `/#portfolio`
- **Navigation**: `_includes/header.html` — glassmorphism nav + hero section
- **Custom domain**: `CNAME` file

## CSS Conventions

- All colors use CSS custom properties (`--bg`, `--text`, `--accent`, etc.) defined in `:root` and `[data-theme="dark"]`
- `--accent-text` is a readable version of the accent color (darker gold `#9a7b00` in light mode, bright yellow in dark)
- Link styles (text-decoration, color) are reset globally on `a, a:visited, a:active, a:focus` — don't add redundant resets on child selectors
- To add a new button alongside social icons, put it inside `ul.social-links` as an `<li>` so it inherits the same box model (height, border, border-radius)

## Content Style

- About section: use dashes attached to left word (`foo- bar` not `foo — bar`)
- Career dates: use spaced dashes (`2021 - Present`)
