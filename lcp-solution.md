# LCP Preload Request (Lighthouse Warning)

## Issue Description
You encountered an LCP (Largest Contentful Paint) warning from Lighthouse stating:
**"fetchpriority=high should be applied to the image preload request"**

Lighthouse also highlighted the failing element: `img.object-cover.object-center`.

### Why this happens
The Largest Contentful Paint (LCP) is usually the largest image or block of text on the screen (in this case, your hero image). For optimal page load performance, the browser needs to know that this image is critical and should be fetched with the highest priority immediately, rather than waiting for the rest of the page to parse. 

While Next.js's `<Image>` component handles a lot of this when you use the `priority` prop, sometimes Lighthouse strictly looks for the explicit `fetchpriority="high"` attribute on the underlying image element or preload link.

## Solution Applied

I have updated the hero images in your application to explicitly include `fetchPriority="high"`.

For example, in your Home page hero (`components/home/hero.tsx`), the image now looks like this:

```diff
  <Image
    src="/Images/Home.webp"
    alt="Irish landscape"
    fill
    priority
+   fetchPriority="high"
    sizes="100vw"
    className="object-cover object-center"
  />
```

I also added it to `day-trips-details-hero.tsx` which uses standard `<img>` tags and the same class names. This explicitly tells the browser (and Lighthouse) to fetch the hero image with maximum priority.

*(Note: In React, the attribute is written as camelCase `fetchPriority`, which compiles to the lowercase HTML `fetchpriority` that Lighthouse is looking for).*
