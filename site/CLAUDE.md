# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See README.md for build commands, project structure, content management, and deployment instructions.

## Branch Strategy

- `master` — source code
- `gh-pages` — built/deployed site (current working branch)

The compiled site lives in `/site/`. Deployment is pushing to `gh-pages`.

## Build

- `JEKYLL_ENV=production jekyll build` — builds to `/site/` (must use production or URLs become localhost)
- `jekyll serve --port 4000` — local dev server (localhost URLs are expected here)
- Always rebuild and commit `site/` alongside source changes

## Architecture Notes

Modern portfolio site. No jQuery or Bootstrap — vanilla JS + CSS custom properties. Dark theme only.

- `_layouts/default.html` — homepage shell (hero, career, portfolio)
- `_layouts/project.html` — dedicated project page layout with back link and content sections
- `_includes/nav.html` — shared navigation component (adapts links for homepage vs project pages)
- `_includes/css/agency.css` — full stylesheet; uses **Liquid variables** for accent colors from `_config.yml` and **CSS custom properties** for theming
- `_plugins/hex_to_rgb.rb` — Jekyll filter converting hex → RGB for `rgba()` usage in CSS
- `_includes/head.html` — SEO/meta tags (Open Graph, Twitter Cards, per-page descriptions/images)
- `js/agency.js` — vanilla JS: smooth scroll, scrollspy, IntersectionObserver scroll reveals, mobile nav, hero parallax, text scramble, 3D card tilt, magnetic hover, mobile touch feedback
- `js/loader.js` — page load spinner fade-out

## Key Files for Common Changes

- **Colors**: `_config.yml` (`color.primary`, `color.secondary`) → Liquid into `agency.css`
- **Career timeline**: `_includes/career.html` — compact left-rail layout
- **Portfolio grid**: `_includes/portfolio_grid.html` — CSS Grid, links to `/portfolio/<slug>/` pages
- **Project pages**: `_layouts/project.html` + `_posts/*.markdown` (layout: project) — dedicated pages at `/portfolio/<slug>/`
- **Navigation**: `_includes/nav.html` — shared nav used by both layouts
- **Section redirects**: `career/index.html` and `portfolio/index.html` — meta-refresh redirects to `/#career` and `/#portfolio`
- **Custom domain**: `CNAME` file

## Mobile Testing

Desktop browser resized to a small window is NOT the same as a real phone. Key differences:
- `pointer: fine` (desktop) vs `pointer: coarse` (mobile) — gates mouse-only effects
- `hover: hover` (desktop) vs `hover: none` (mobile) — `:hover` CSS never fires on touch
- `prefers-reduced-motion: reduce` — many iPhones have this ON by default (Settings > Accessibility > Motion > Reduce Motion)
- iOS Safari has rendering bugs with `background-clip: text` + dynamic `textContent` changes
- CSS `:active` doesn't fire on iOS without a `touchstart` listener on the element

### Testing on a real phone

Start jekyll bound to all interfaces so your phone can reach it:
```bash
jekyll serve --host 0.0.0.0 --port 4567
```
Then open `http://<your-local-ip>:4567` on the phone (same WiFi). Find your IP with `ipconfig getifaddr en0`.

### Debug overlay

When something doesn't work on mobile, add a temporary debug bar to `agency.js` to check media queries and element state:
```js
var dbg = document.createElement('div');
dbg.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:red;color:white;padding:12px;z-index:99999;font-size:14px;';
dbg.textContent = 'hover:' + matchMedia('(hover:hover)').matches + ' motion:' + matchMedia('(prefers-reduced-motion:reduce)').matches;
document.body.appendChild(dbg);
```

## iOS Safari Pitfalls

- **`background-clip: text` + dynamic content**: Don't change `textContent` on elements using `-webkit-text-fill-color: transparent`. Apply gradient text class only after content is finalized.
- **`:hover` on touch**: Use `@media (hover: hover)` to gate hover-only effects. For mobile, use IntersectionObserver (glow on scroll-into-view) or JS touch events.
- **`:active` on iOS**: Doesn't work without a `touchstart` listener. Use JS class toggling instead.
- **`prefers-reduced-motion`**: Many iOS users have this enabled. Parallax and scroll animations should respect it, but non-vestibular effects (text changes, color transitions) can safely ignore it.

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

## Images

- Always compress images before committing — run `/compress-images` after adding new images
- Use JPEG for photos/screenshots, PNG only for graphics that need transparency
- Portfolio thumbnails are displayed at 4:3 aspect ratio via CSS `aspect-ratio`

## Adding a New Portfolio Project

1. Create `_posts/YYYY-MM-DD-slug.markdown` with front matter:
   ```yaml
   title, subtitle, layout: project, project-date, technologies, topics, description, date, thumbnail, teaser, gallery
   ```
2. Add images to `img/portfolio/<slug>/` (compress first — see Images section above)
3. Rebuild: `jekyll build`
