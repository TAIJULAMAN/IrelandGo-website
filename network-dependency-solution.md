# Network Dependency Tree & Preconnect Solution

Lighthouse has flagged the **"Network dependency tree"** and specifically pointed out a file that looks like this:
`/day-trips(localhost) - 385 ms`
`...chunks/[root-of...]__.css(localhost) - 384 ms`

Lighthouse is also mentioning **"Preconnected origins"**.

Here is the exact solution for both of these audits.

---

## 1. The Network Dependency Tree (CSS Chunk)
Notice how the file Lighthouse is complaining about is `chunks/[root-of...]__.css`? 

**This is the exact same False Positive as the previous Render-Blocking CSS warning.**

Because you are running the `npm run dev` server, Next.js is injecting heavy, unoptimized CSS chunks that have massive source maps attached to them. This creates an artificially long "Network Dependency Tree" that blocks the initial render. 

**The Fix:** 
You cannot fix this in development. You must build your app for production (`npm run build` followed by `npm start`). When Next.js compiles for production, it breaks the CSS out of these massive JS chunks, minifies it, and automatically preloads the Critical CSS. The "Network dependency tree" warning for this CSS chunk will completely disappear in production.

## 2. Preconnect Origins
Lighthouse says: *"No additional origins are good candidates for preconnecting"* and *"no origins were preconnected"*.

This actually means you **passed** this audit! Lighthouse is just giving you informational feedback. You don't have any third-party domains (like heavy external fonts or external scripts on the critical path) that require preconnecting. 

Because we moved the Google Maps script to `strategy="lazyOnload"`, it is no longer in the critical rendering path, which means you don't even need to preconnect to `maps.googleapis.com` anymore. 

## Summary
There is no code for you to change here! To see these warnings vanish and get your actual 90+ Lighthouse score, simply test the production version of your app:
1. `npm run build`
2. `npm start`
3. Run Lighthouse again!
