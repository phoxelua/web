# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See README.md for build commands, project structure, content management, and deployment instructions.

## Branch Strategy

- `master` — source code
- `gh-pages` — built/deployed site (current working branch)

The compiled site lives in `/site/`. Deployment is pushing to `gh-pages`.

## Architecture Notes

Jekyll static site using the Start Bootstrap Agency theme with Bootstrap 3. Single-page layout (`_layouts/default.html`) that includes all sections in order from `_includes/`.

- `_includes/css/agency.css` — main custom stylesheet; uses **Liquid variables** for colors pulled from `_config.yml`, not plain CSS
- `_plugins/hex_to_rgb.rb` — Jekyll filter that enables the color variable flow from config → CSS
- `_includes/head.html` — SEO/meta tags (Open Graph, Twitter Cards, JSON-LD structured data)

## Key Files for Common Changes

- **Colors/theme**: `_config.yml` (`color.primary`, `color.secondary`) → flows into `agency.css` via Liquid
- **Career timeline**: `_includes/career.html`
- **Site behavior**: `js/agency.js`, `js/loader.js`
- **Custom domain**: `CNAME` file
