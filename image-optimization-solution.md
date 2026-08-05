# Image Optimization Solution

Based on the Lighthouse performance report, your website is downloading large, unoptimized images (like the local `/attractions/*.jpg` images and external images from Pexels and Cloudinary). This significantly hurts your Largest Contentful Paint (LCP) and perceived page speed.

To save the estimated **~1.3MB** of data and solve the "Use responsive images" warnings, you should migrate all your `<img>` tags to the Next.js `<Image>` component.

## 1. Configure Next.js for External Images
Since you are using images from Cloudinary and Pexels, you must explicitly allow Next.js to optimize them. Open your `next.config.js` (or `.ts`/.`mjs`) and add the `remotePatterns`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};

export default nextConfig;
```

## 2. Replace HTML `<img>` with Next.js `<Image>`

Whenever you use a standard `<img>` tag, the browser downloads the full-resolution original file. The Next.js `<Image>` component automatically generates resized, WebP/AVIF compressed versions on the fly.

### Fixing the Local Attraction Images
In the file where you render `/attractions/1.jpg`, update it like this:

```tsx
import Image from "next/image";

// ❌ Before
<img 
  src="/attractions/1.jpg" 
  alt="Attraction" 
  className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110" 
/>

// ✅ After
<div className="relative w-full h-full"> {/* Ensure parent is relative */}
  <Image 
    src="/attractions/1.jpg" 
    alt="Attraction" 
    fill
    className="object-cover transition-transform duration-700 group-hover/image:scale-110"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
</div>
```

### Fixing the Booking Flow `step-3.tsx` Stops

```tsx
import Image from "next/image";

// ❌ Before
<div className="relative w-32 shrink-0 sm:w-full h-32 sm:h-44">
  <img
    src={getStopImageUrl(stop)}
    alt={stop.name}
    className="w-full h-full object-cover"
  />
</div>

// ✅ After
<div className="relative w-32 shrink-0 sm:w-full h-32 sm:h-44">
  <Image
    src={getStopImageUrl(stop)}
    alt={stop.name}
    fill
    className="object-cover"
    sizes="(max-width: 640px) 128px, 33vw" // 128px on mobile, 33vw on desktop
  />
</div>
```

> [!WARNING]
> I noticed you reverted my previous fix for `getStopImageUrl` in `step-3.tsx`. If `getStopImageUrl(stop)` or `stop?.image?.[0]` returns an **object** instead of a string URL, the Next.js `<Image>` component will throw a fatal error. Please ensure your `src` is always a valid string!

## 3. Why this works
- **Format Conversion**: The warning *"Using a modern image format"* is solved because Next.js automatically converts `.jpg` to highly compressed `.webp` or `.avif`.
- **Responsive Sizing**: The warning *"This image file is larger than it needs to be"* is solved by the `sizes` attribute. It tells Next.js to serve a smaller, 400px wide image to mobile users instead of sending the original 1500px desktop image.
- **Lazy Loading**: Images below the fold are automatically lazy-loaded.
