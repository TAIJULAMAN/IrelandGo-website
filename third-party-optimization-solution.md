# Third-Party Script Optimization Solution

## The Problem
Lighthouse reported that third-party code is significantly impacting load performance. Third-party scripts (like Google Maps) block the main thread, delay interactivity (TTI), and compete for network bandwidth with your application's primary content. The application was previously loading the Google Maps API multiple times across different components using `useJsApiLoader`, which triggered redundant network requests and parse times.

## The Solution

To mitigate the impact of third-party scripts, we implemented a centralized, optimized script loading strategy:

1. **Global Script Injection with Next.js `<Script>`:**
   Instead of loading the Google Maps script locally within individual components, we injected it globally in the main `app/layout.tsx` file using the Next.js `<Script>` component.
   
2. **Optimized Loading Strategy (`afterInteractive`):**
   We set the `strategy="afterInteractive"` prop on the `<Script>` component. This tells Next.js to wait until the core application has been rendered and becomes interactive before fetching and executing the heavy Google Maps script. This moves the script out of the critical rendering path, drastically improving initial load performance.

3. **Global State Management via Custom Hook:**
   We created a custom `useGoogleMaps` hook (`hooks/useGoogleMaps.ts`). This hook does not attempt to load the script itself; instead, it simply checks if `window.google` is available on the global window object. 
   - All 11 components that rely on Google Maps (like Places Autocomplete) were refactored to use this hook.
   - This ensures that the application only ever downloads the Google Maps API once, preventing duplicate requests and unnecessary processing overhead.

## Steps Taken in This Project
- Removed `useJsApiLoader` from all 11 map-dependent components (`hero.tsx`, `transfer-search-hero.jsx`, etc.).
- Added `<Script src="https://maps.googleapis.com/maps/api/js?key=...&libraries=places" strategy="afterInteractive" />` to `app/layout.tsx`.
- Implemented `hooks/useGoogleMaps.ts` to manage the `isLoaded` state globally.
- This effectively defers the 3rd party execution until the primary content is painted and interactive.
