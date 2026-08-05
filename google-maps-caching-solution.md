# Google Maps API Cache Lifetime Solution

The Lighthouse warning **"Use efficient cache lifetimes"** pointing to `maps.googleapis.com/maps/api/js` is a very common issue when using Google Maps. 

## The Short Answer
**You cannot fix the cache lifetime itself, but you can safely ignore this specific warning.**

Lighthouse is complaining because the Google Maps script has a Cache TTL (Time To Live) of only 30 minutes. However, because this script is hosted on Google's servers, **you have no control over its caching headers**. Google intentionally sets this short cache lifetime because their Maps API receives frequent, critical updates.

Even though you can't fix the cache header, you *can* optimize how the script loads so it doesn't block your page rendering (which is what actually impacts your Lighthouse score).

---

## The Actual Fix: Optimize Script Loading in Next.js

Since you cannot cache the script longer, the best practice is to load it asynchronously so it doesn't hurt your **First Contentful Paint (FCP)** or **Largest Contentful Paint (LCP)**.

In your `app/layout.tsx`, you are likely using a standard HTML `<script>` tag. You should replace it with the **Next.js `<Script>` component**.

### 1. Update `app/layout.tsx`

Open `app/layout.tsx` and make the following changes:

```tsx
// 1. Import Script from next/script at the top
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* 2. Replace your standard <script> with this: */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="afterInteractive" // Loads script immediately after the page becomes interactive
          // Alternatively, use strategy="lazyOnload" if you don't need the map immediately on page load
        />
      </body>
    </html>
  );
}
```

### 2. Why this is the best approach
- **`strategy="afterInteractive"`**: Next.js will wait until the main page has rendered and hydrated before fetching the heavy 374 KiB Google Maps script. This drastically improves your initial page load speed and LCP.
- **`strategy="lazyOnload"`**: If Google Maps is only needed on specific actions (like a user typing in an autocomplete field later down the page), you can use `lazyOnload` to completely remove it from the initial load sequence.

## Conclusion
You will still see the "Use efficient cache lifetimes" warning in Lighthouse for Google Maps. This is a known false-positive in the web development community. By using `next/script`, you have done everything possible to optimize its delivery.
