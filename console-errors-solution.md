# Browser Errors Logged to Console (Lighthouse Warning)

## Issue Description
You encountered a Lighthouse warning indicating that **"Browser errors were logged to the console."**

Specifically, the errors state:
`Permissions policy violation: unload is not allowed in this document.`

### Why this happens
If you look closely at the "Source" column in the Lighthouse report, you will see that the source is listed as **Jam Chrome Extension** (and the files are named like `content-jam-ui.js` and `host-additional-hook...`). 

These errors are **not caused by your website's code**. 

Chrome recently began deprecating the `unload` event to improve page loading performance (specifically the Back/Forward Cache). Your browser extension ("Jam") is still trying to use this deprecated event in the scripts it injects into your webpage, which triggers this warning in the console.

## Solution

Because this error is caused by a third-party browser extension, there is nothing you need to change in your Next.js codebase. Your code is perfectly fine!

To completely remove this warning during your Lighthouse audits, you can do one of the following:

1. **Run audits in Incognito Mode**: It is highly recommended to run Lighthouse audits in an Incognito window with all extensions disabled. This provides a clean environment and prevents extensions from negatively impacting your performance scores and injecting console errors.
2. **Disable the Jam extension**: Temporarily disable the Jam Chrome Extension while running your audit.
3. **Ignore the error**: You can safely ignore this specific error, knowing that it won't affect your real users (unless they also have that specific extension installed).
