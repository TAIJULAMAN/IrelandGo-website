# Render Blocking CSS Optimization Solution

## The Problem
Lighthouse reported render-blocking requests that delay the First Contentful Paint (FCP) and Largest Contentful Paint (LCP). Specifically, the external CSS from `unpkg.com` (`leaflet.css`) was blocking the page's initial render. Every external resource added via a `<link rel="stylesheet">` tag stops the HTML parser until the CSS is downloaded and parsed.

## The Solution

To mitigate render-blocking CSS, we have implemented the following strategies:

1. **Local Bundling of External CSS:**
   Instead of loading CSS from a third-party CDN like `unpkg.com` which requires an additional DNS lookup, connection, and TLS handshake, we downloaded the `leaflet.css` file and placed it directly in the project (`public/leaflet.css` or importing it into `globals.css`). Next.js can then bundle this CSS with the rest of the application's styles, significantly reducing the critical path network overhead.

2. **Next.js Built-in CSS Optimization:**
   By importing CSS files directly in Next.js (e.g., inside `layout.tsx` or `page.tsx`), Next.js automatically optimizes the CSS delivery. It extracts the CSS required for the initial render and injects it, ensuring minimal render-blocking.

3. **Deferring Non-Critical CSS:**
   For styles that are not needed immediately for the initial page load, Next.js naturally code-splits CSS. By ensuring external CSS is integrated into the Next.js build pipeline rather than being injected via standard `<link>` tags in the HTML `<head>`, we improve load times.

## Steps Taken in This Project
- We moved away from relying on the `unpkg.com` CDN for Leaflet CSS.
- We imported styles properly so Next.js handles bundling, effectively eliminating the render-blocking issue from the CDN.
