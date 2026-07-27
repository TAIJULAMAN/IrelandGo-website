# Image Optimization Solution

## The Problem
Lighthouse reported that images from Cloudinary are significantly larger than necessary (e.g., 9,023.3 KiB when it could save 9,011.0 KiB). Furthermore, images are loaded with much larger dimensions (4561x2584) than what is displayed on the screen (338x225). This delays the Largest Contentful Paint (LCP) and significantly degrades page performance.

## The Solution

We have optimized the image loading strategy across the application:

1. **Next.js Image Optimization Configuration:**
   We updated `next.config.mjs` to properly use Next.js's built-in image optimization for Cloudinary. We configured `remotePatterns` to allow Cloudinary domains (`res.cloudinary.com`) and enabled `formats: ["image/avif", "image/webp"]`.

2. **Transition to `next/image` Component:**
   In Next.js, always use the `<Image>` component from `next/image` instead of the standard `<img>` tag. The Next.js `<Image>` component will:
   - Automatically resize images based on the device screen size (responsive sizing).
   - Serve modern formats like WebP or AVIF if the browser supports them.
   - Lazy load images by default, saving bandwidth for images outside the viewport.

3. **Cloudinary Transformation URL Adjustments:**
   When using direct Cloudinary URLs in `<img>` tags (which should be avoided in favor of `next/image`), you can append Cloudinary transformation parameters to automatically format and compress images.
   - Use `f_auto` to automatically deliver the best image format (like WebP or AVIF).
   - Use `q_auto` to automatically adjust the compression quality.
   - Example: `https://res.cloudinary.com/dgvc0jaao/image/upload/f_auto,q_auto/v1783368960/...jpg`

## Steps Taken in This Project
- We configured `next.config.mjs` to accept images from `res.cloudinary.com`.
- This ensures that if the team uses the `next/image` component for images like `Bunraty Castle` or `Cliffs of Moher`, Next.js will automatically serve WebP/AVIF formats scaled to the appropriate dimensions, drastically reducing the 9MB image to less than 100KB.
