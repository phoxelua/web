# Howard Nguyen - Portfolio Website

Personal portfolio website built with Jekyll, based on the [Agency Bootstrap theme](https://startbootstrap.com/templates/agency/).

Live site: [howardanguyen.com](https://howardanguyen.com)

## Prerequisites

- Ruby 2.5+ (check with `ruby -v`)
- Jekyll 3.9+ (check with `jekyll -v`)
- Python 3.x (for local testing)

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
│   ├── header.html       # Hero section
│   ├── career.html       # Work timeline
│   ├── portfolio_grid.html
│   ├── modals.html       # Portfolio modals
│   └── css/              # Styles
├── _layouts/             # Page templates
│   └── default.html      # Main layout
├── _posts/               # Portfolio projects (Markdown)
├── _plugins/             # Jekyll plugins (hex_to_rgb)
├── img/                  # Images
│   ├── career/           # Company logos
│   └── portfolio/        # Project images
├── js/                   # JavaScript files
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
jekyll serve
```

Then open: `http://localhost:4000`

> **Note:** Localhost loads everything instantly from disk and isn't representative of real-world performance. See Testing section below for proper performance testing.

## Testing Performance

### Test with Network Throttling (Recommended)

1. **Start Jekyll server:**
   ```bash
   jekyll serve
   ```

2. **Open Chrome DevTools:**
   - Navigate to `http://localhost:4000`
   - Press `F12` or `Cmd+Option+I`
   - Go to **Network** tab
   - Click dropdown that says **"No throttling"**
   - Select **"Fast 3G"** or **"Slow 3G"**
   - Check **"Disable cache"** checkbox
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+F5` (Windows)

3. **What to observe:**
   - Loading screen should appear instantly
   - Header background color shows immediately
   - Header image loads progressively
   - Fonts load without blocking
   - Portfolio images lazy-load when scrolling

### Test on Real GitHub Pages

Most accurate test - deploy to GitHub Pages:

```bash
git add .
git commit -m "Update site"
git push origin gh-pages
```

Wait ~1 minute, then visit: https://howardanguyen.com

Test on different devices/networks:
- Desktop (WiFi)
- Mobile (4G/5G)
- Mobile (3G - throttled)

## Content Management

### Add New Portfolio Project

1. Create new file in `_posts/` with format: `YYYY-MM-DD-project-name.markdown`

2. Add frontmatter:
   ```yaml
   ---
   title: Project Name
   subtitle: Short description
   layout: default
   modal-id: unique-id
   project-date: Month Year
   technologies: [Tech1, Tech2, Tech3]
   topics: [Topic1, Topic2]
   description: Detailed description
   date: YYYY-MM-DD
   thumbnail: folder/image.jpg
   teaser:
     - src: folder/preview.jpg
       alt: Description
   gallery:
     - src: folder/image1.jpg
       alt: Description
   teaser-col: 12
   gallery-col: 6
   ---
   Full project description in Markdown...
   ```

3. Add images to `img/portfolio/project-name/`

4. Rebuild: `jekyll build`

### Update Career Timeline

Edit `_includes/career.html` to add/modify work experience entries.

### Modify Site Settings

Edit `_config.yml`:
- Site title, description, keywords
- Social media links
- Color scheme (`color.primary`, `color.secondary`)
- Google Analytics tracking ID

## Performance Optimizations

This site includes several performance optimizations:

- ✅ **Optimized header image**: 182KB JPEG (was 1.7MB PNG)
- ✅ **Lazy loading**: Portfolio images load on-demand
- ✅ **CDN libraries**: jQuery & Bootstrap from CDN
- ✅ **Font optimization**: Combined requests, non-blocking load
- ✅ **Loading screen**: Smooth UX while assets load
- ✅ **Preload hints**: Critical resources prioritized
- ✅ **Video optimization**: `preload="none"` for modal videos

## SEO Optimizations

This site is optimized for search engines with:

### Technical SEO
- ✅ **Sitemap.xml**: Auto-generated sitemap for search engines
- ✅ **Robots.txt**: Proper crawler instructions
- ✅ **Canonical URLs**: Prevents duplicate content issues
- ✅ **Structured Data**: JSON-LD schema markup for rich results
- ✅ **Mobile-friendly**: Responsive design with proper viewport meta

### Meta Tags
- ✅ **SEO-optimized titles**: Descriptive page titles with keywords
- ✅ **Meta descriptions**: Compelling descriptions for search results
- ✅ **Meta keywords**: Relevant keywords for indexing
- ✅ **Open Graph tags**: Optimized social media sharing (Facebook, LinkedIn)
- ✅ **Twitter Cards**: Rich previews on Twitter

### Content SEO
- ✅ **Semantic HTML**: Proper heading hierarchy (h1, h2, h3)
- ✅ **Alt text on images**: Descriptive alt tags for accessibility & SEO
- ✅ **Fast load times**: Performance optimizations help SEO rankings
- ✅ **HTTPS**: Secure connection (GitHub Pages default)

### Submit to Search Engines

After deploying, submit your sitemap to search engines:

**Google Search Console:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://howardanguyen.com`
3. Submit sitemap: `https://howardanguyen.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site: `https://howardanguyen.com`
3. Submit sitemap: `https://howardanguyen.com/sitemap.xml`

### SEO Best Practices

To maintain good SEO rankings:
- ✅ Keep content updated and relevant
- ✅ Use descriptive project titles and descriptions
- ✅ Add alt text to all new images
- ✅ Maintain fast load times
- ✅ Build backlinks (share on LinkedIn, GitHub, etc.)
- ✅ Monitor with Google Analytics and Search Console

## Deployment

Site is hosted on **GitHub Pages** from the `gh-pages` branch.

### Deploy to GitHub Pages

```bash
# Make sure you're on gh-pages branch
git branch

# Build site
jekyll build

# Commit and push
git add .
git commit -m "Deploy updates"
git push origin gh-pages
```

Site will update at https://howardanguyen.com in ~1 minute.

## Troubleshooting

**Jekyll build fails:**
```bash
# Check Ruby version
ruby -v

# Reinstall Jekyll
gem install jekyll bundler
```

**Changes not showing:**
- Make sure you ran `jekyll build`
- Hard refresh browser: `Cmd+Shift+R`
- Check `site/` directory was updated

**Images not loading:**
- Verify image paths are relative: `img/portfolio/...`
- Check file names match (case-sensitive)
- Ensure images are copied to `site/img/`

## Resources

- [Jekyll Documentation](https://jekyllrb.com/)
- [Original Agency Theme](https://startbootstrap.com/templates/agency/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
