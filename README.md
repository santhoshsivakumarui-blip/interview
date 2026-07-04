# Interview Hub

This repository contains a collection of static HTML study guides and interview-prep notes.

## What changed
- Added a shared navbar across all HTML pages.
- Added a landing page at index.html for easier browsing.
- Added shared assets in site.css and nav.js.
- Added .nojekyll so GitHub Pages serves the site cleanly.

## Deploy
This site is ready for GitHub Pages or any static host.

### GitHub Pages
1. Push the repository to GitHub.
2. Open the repository settings.
3. Go to Pages.
4. Select Deploy from a branch and choose the main branch with the root folder.
5. Save and wait for the site to publish.

### Local preview
Run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/.