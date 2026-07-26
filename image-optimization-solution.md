# Image Optimization Solutions

Based on your Lighthouse report, several images (both from Cloudinary and local assets) are severely impacting your page's load time. They are being downloaded at their massive original sizes (e.g., 4561x2584) even though they are only displayed in small containers (e.g., 338x225).

Here is the step-by-step solution to fix this and improve your LCP and overall performance score.

## Solution 1: Use Next.js `<Image>` Component Everywhere
The most effective way to solve this in a Next.js application is to replace standard HTML `<img>` tags with the `next/image` component. Next.js automatically resizes, compresses, and converts images to modern formats like WebP or AVIF based on the device requesting them.

**Before:**
```tsx
<img 
  src="https://res.cloudinary.com/.../image.jpg" 
  alt="Bunraty Castle" 
  className="w-full h-full object-cover" 
/>
```

**After:**
```tsx
import Image from "next/image";

<div className="relative w-full h-full">
  <Image 
    src="https://res.cloudinary.com/.../image.jpg"
    alt="Bunraty Castle"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```
*(Note: When using `fill`, the parent container must have `position: relative`, `absolute`, or `fixed`.)*

## Solution 2: Configure `next.config.js` for Cloudinary
To allow Next.js to optimize images coming from Cloudinary, you must add the Cloudinary domain to your `next.config.js` (or `next.config.mjs`) file. If you don't do this, Next.js will throw an error when you try to use `<Image src="https://res.cloudinary.com/..." />`.

Update your `next.config.js`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

## Solution 3: Prioritize Above-the-Fold Images
For images that are visible immediately when the page loads (like the `Home.webp` hero image), you must add the `priority` property. This tells the browser to start downloading the image immediately, drastically improving your Largest Contentful Paint (LCP).

```tsx
<Image
  src="/Images/Home.webp"
  alt="Home Hero"
  fill
  priority
  className="object-cover"
  sizes="100vw"
/>
```

## Alternative Solution: Cloudinary URL Transformations
If for some reason you cannot use `next/image` for dynamic Cloudinary images, you can manually append Cloudinary transformation parameters to the URL to force smaller sizes and modern formats.

Add `/f_auto,q_auto,w_800/` to the Cloudinary URL right after `/upload/`.
- `f_auto`: Automatically formats as WebP/AVIF if the browser supports it.
- `q_auto`: Automatically adjusts compression quality without visible loss.
- `w_800`: Resizes the image to 800px wide.

**Example:**
`https://res.cloudinary.com/dgvc0jaao/image/upload/f_auto,q_auto,w_800/v1783368960/...`
