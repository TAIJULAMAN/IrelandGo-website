# 3rd Party Code (Lighthouse Warning)

## Issue Description
You encountered a Lighthouse warning stating:
**"3rd party code can significantly impact load performance. Reduce and defer loading of 3rd party code to prioritize your page's content."**

### Why this happens
"3rd party code" refers to any JavaScript loaded from a domain other than your own (e.g., Google Maps, Google Analytics, social media widgets, or Chrome Extensions). Browsers have to pause rendering your page to download and execute these external scripts, which slows down your initial page load time.

Because the screenshot cuts off the list of specific scripts, there are two main culprits here:

1. **The Jam Chrome Extension (Again):** Just like the previous errors, if you run a Lighthouse audit with the Jam extension enabled, Lighthouse sees all of Jam's injected scripts as "3rd party code" that is slowing down your page.
2. **Google Maps or Analytics:** Your application uses external services (like Google Maps for the routes). If these scripts are loaded immediately when the page opens, they block the main thread.

## The Solution

Here is how you can resolve this and improve your score:

### 1. Test in Incognito First
As mentioned in the previous solutions, the very first step is to **run the Lighthouse audit in an Incognito window** on a production build (`npm run build`). This completely removes the Jam extension from the equation. Often, this is enough to clear the error!

### 2. Optimize Necessary 3rd Party Scripts (If applicable)
If you still see this warning in Incognito mode for scripts you actually need (like Google Maps), you should defer their loading using the Next.js `<Script>` component. 

Instead of loading them in a standard `<script>` tag, you can use Next.js `next/script` with the `lazyOnload` strategy. This tells the browser to wait until the page has finished loading before downloading the external script:

```jsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Example of deferring a 3rd party script */}
        <Script 
          src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}
```

**Summary:** Try the Incognito production build first. If you still see the error, look at the list of URLs Lighthouse provides under this warning, and ensure any of your own external scripts are using `next/script` with `strategy="lazyOnload"`.
