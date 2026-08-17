# Missing Source Maps (Lighthouse Warning)

## Issue Description
You encountered a Lighthouse warning indicating: **"Missing source maps for large first-party JavaScript."**

The report lists several files from:
1. `localhost` (specifically Next.js internal files like `next_dist_compiled_react-dom`)
2. `chrome-extension://...` (The Jam Chrome Extension again)

### Why this happens
Source maps are files that map minified/compiled code back to the original source code, making it easier to debug in the browser console. Lighthouse flags this when it sees large JavaScript files without an accompanying `.map` file.

There are two reasons you are seeing this:

1. **Running Lighthouse in Dev Mode:** It looks like you are running the Lighthouse audit while running your Next.js app in development mode (`npm run dev`). In development, Next.js ships large unoptimized code chunks, and sometimes the source maps for internal Next.js dependencies aren't perfectly aligned for Lighthouse's strict checks. **Lighthouse audits should always be run on a production build.**
2. **Jam Extension:** Just like the previous error, the Jam Chrome extension is injecting its own scripts into the page without providing source maps, which Lighthouse catches and flags.

## The Solution

There are two steps to completely resolve this:

### Step 1: Run a Production Build (Highly Recommended)
Never run Lighthouse audits on `npm run dev`. Your scores will be artificially low, and you'll get warnings like this one. Instead, do this:
1. Stop your development server (`Ctrl + C`)
2. Run `npm run build` to create an optimized production build.
3. Run `npm run start` to start the production server.
4. Open an **Incognito Window** (to disable the Jam extension) and run the Lighthouse audit again.

### Step 2: Enable Production Source Maps (Optional)
By default, Next.js does not generate source maps for production builds to keep the build fast and secure. If you *really* want source maps in production to satisfy Lighthouse (though it's not strictly necessary), you can enable them in your `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this line:
  productionBrowserSourceMaps: true,
};

export default nextConfig;
```

**Summary:** Run `npm run build` followed by `npm run start`, and test in an Incognito window. You will see these errors disappear!
