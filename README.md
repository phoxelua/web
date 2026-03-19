# Howard Nguyen - Portfolio Website

Personal portfolio website built with Jekyll.

Live site: [howardanguyen.com](https://howardanguyen.com)

## Prerequisites

- Ruby 2.5+ (check with `ruby -v`)
- Jekyll 3.9+ (check with `jekyll -v`)

## Installation

1. **Install Jekyll** (if not already installed):
   ```bash
   gem install jekyll bundler
   ```

2. **Clone and navigate to project**:
   ```bash
   cd /path/to/web
   ```

## Development

### Project Structure

```
.
├── _config.yml           # Site configuration
├── _includes/            # Reusable HTML components
│   ├── nav.html          # Shared navigation (homepage + project pages)
│   ├── header.html       # Nav + hero section
│   ├── career.html       # Work timeline
│   ├── portfolio_grid.html
│   ├── head.html         # SEO meta tags
│   ├── footer.html
│   └── css/agency.css    # Full stylesheet (inlined via Liquid)
├── _layouts/             # Page templates
│   ├── default.html      # Homepage layout
│   └── project.html      # Project page layout
├── _posts/               # Portfolio projects (Markdown)
├── _plugins/             # Jekyll plugins (hex_to_rgb)
├── img/                  # Images
│   ├── career/           # Company logos
│   └── portfolio/        # Project images
├── js/                   # JavaScript (agency.js, loader.js)
├── career/index.html     # Redirect → /#career
├── portfolio/index.html  # Redirect → /#portfolio
├── 404.html              # Custom 404 page
└── site/                 # Build output (gh-pages)
```

### Build Site

Build Jekyll site to `site/` directory:

```bash
jekyll build
```

Watch for changes and rebuild automatically:

```bash
jekyll build --watch
```

### Run Locally

Start the Jekyll development server:

```bash
jekyll serve --port 4000
```

Then open: `http://localhost:4000`

> **Note:** Localhost loads everything instantly from disk and isn't representative of real-world performance. Use Chrome DevTools Network throttling for realistic testing.

## Content Management

### Add New Portfolio Project

1. Create new file in `_posts/` with format: `YYYY-MM-DD-project-name.markdown`

2. Add front matter:
   ```yaml
   ---
   title: Project Name
   subtitle: Short description
   layout: project
   project-date: Month Year
   technologies: [Tech1, Tech2]
   topics: [Topic1, Topic2]
   description: Detailed description for SEO and page header
   date: YYYY-MM-DD
   thumbnail: folder/image.jpg
   teaser:
     - src: folder/preview.jpg
       alt: Description
   gallery:
     - src: folder/image1.jpg
       alt: Description
   ---
   Full project description in Markdown/HTML...
   ```

3. Add images to `img/portfolio/project-name/`

4. Rebuild: `jekyll build`

The project will appear in the portfolio grid and get its own page at `/portfolio/project-name/`.

### Update Career Timeline

Edit `_includes/career.html` to add/modify work experience entries.

### Modify Site Settings

Edit `_config.yml`:
- Site title, description, keywords
- Social media links
- Color scheme (`color.primary`, `color.secondary`)
- Google Analytics tracking ID

## Deployment

Site is hosted on **GitHub Pages** from the `gh-pages` branch.

```bash
jekyll build
git add .
git commit -m "Deploy updates"
git push origin gh-pages
```

Site will update at https://howardanguyen.com in ~1 minute.

## Troubleshooting

**Changes not showing:**
- Make sure you ran `jekyll build`
- Hard refresh browser: `Cmd+Shift+R`
- Check `site/` directory was updated

**Images not loading:**
- Use absolute paths: `/img/portfolio/...`
- Check file names match (case-sensitive)
