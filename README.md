# Sandip Patel — Personal Portfolio

A modern, responsive single-page portfolio website showcasing AI Architecture and Secure Agentic Systems expertise.

## Features
- **Single-Page Layout**: All content consolidated into one smooth-scrolling page
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Light/Dark Mode**: Automatic theme based on system preference
- **Modern Design**: Clean typography with Inter font, consistent color palette
- **Accessible**: Semantic HTML, ARIA labels, skip navigation link
- **SEO Optimized**: Structured data, Open Graph meta tags, semantic markup

## Structure
```
index.html          — Single-page portfolio (main entry)
assets/
  css/styles.css    — Complete design system with CSS variables
  js/main.js        — Navigation, theme, and interactions
  img/              — Images and icons
sitemap.xml         — Search engine sitemap
robots.txt          — Search engine directives
.nojekyll           — GitHub Pages config (bypasses Jekyll)
```

## Sections
- **Hero**: Introduction and role
- **About**: Background and expertise overview
- **Expertise**: Key skills and focus areas
- **Publications**: Research papers and articles
- **Speaking**: Conference talks and appearances
- **Projects**: Notable work and initiatives
- **Awards**: Recognition and achievements
- **Contact**: Professional links and email

## Quick Customization
1. Update personal info in `index.html` (name, bio, links)
2. Add your photo to `assets/img/` and update the hero section
3. Update `sitemap.xml` with your actual domain

## Deployment

### GitHub Pages (Recommended)
1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** / **(root)**
5. Save — site publishes at `https://<username>.github.io/<repo>/`

### Other Hosting
Upload folder contents to any static web host (Netlify, Vercel, Azure Static Web Apps, etc.)

## Tech Stack
- Pure HTML5, CSS3, JavaScript (no frameworks or build tools)
- Google Fonts (Inter)
- CSS Custom Properties for theming
- CSS Grid and Flexbox for layouts

## Browser Support
Works in all modern browsers. Dark mode requires `prefers-color-scheme` support.
