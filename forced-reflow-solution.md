# Forced Reflow Optimization Solution

## The Problem
Lighthouse identified forced reflows occurring during the initial page load. A forced reflow (or layout thrashing) happens when JavaScript queries geometric properties (like `offsetWidth`, `clientHeight`, `getBoundingClientRect`) immediately after styles have been invalidated by a change to the DOM state. The browser is forced to immediately recalculate the layout to return the correct value, which is very computationally expensive and can lead to stuttering and poor performance.

The issue was traced back to dynamic components (such as Map Route) rendering before their container dimensions were fully established, causing forced synchronous layouts.

## The Solution

To prevent forced reflows, we need to batch DOM reads and writes, or provide static dimensions so the browser doesn't have to recalculate the layout on the fly.

1. **Pre-defining Container Dimensions:**
   We assigned a fixed minimum height (`min-h-[280px]`) to containers that load dynamic content, such as the Google Maps component. This reserves the necessary space on the page before the JavaScript executes, preventing the browser from having to reflow the surrounding content when the map finally loads.

2. **Avoiding Synchronous Layout Thrashing:**
   By preventing the map component from dynamically shifting the layout, we ensure that scripts querying the DOM for sizing do not trigger a forced reflow. The space is already allocated.

3. **Optimized Loading Strategy:**
   With the implementation of the global `useGoogleMaps` hook, the map scripts are loaded asynchronously (`strategy="afterInteractive"`). The components now wait gracefully for the script to load before attempting to render, rather than causing layout shifts as they repeatedly check for the Google Maps API availability.

## Steps Taken in This Project
- Added specific minimum heights to map container components (e.g., `MapRoute`).
- Ensured CSS rules were applied before JS execution where possible.
- Replaced multiple local instantiations of `useJsApiLoader` (which could cause redundant layout calculations) with a single, globally managed state.
