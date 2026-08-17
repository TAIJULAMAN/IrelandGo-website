# Accessibility Fix: Heading Order Issue

## Issue Description
You encountered an accessibility error reported by Lighthouse: **"Heading elements are not in a sequentially-descending order."**

The specific failing element was `h4.font-medium.mb-4` containing the text "Services" (and subsequently "Support" and "Contact Us").

### Why this happens
In HTML, headings convey the semantic structure of a page. Assistive technologies (like screen readers) rely on this structure to help users navigate. Headings must follow a logical descending order (`<h1>`, `<h2>`, `<h3>`, etc.) without skipping levels. 

In your `footer.tsx`, the column titles were using `<h4>` tags, but there were no preceding `<h3>` or `<h2>` tags directly above them in the component's hierarchy, which caused Lighthouse to flag this as a skipped level.

## Solution Applied

To resolve this, we simply changed the `<h4>` tags to `<h3>` tags in the footer component:

```diff
- <h4 className="font-medium mb-4">Services</h4>
+ <h3 className="font-medium mb-4">Services</h3>

- <h4 className="font-medium mb-4">Support</h4>
+ <h3 className="font-medium mb-4">Support</h3>

- <h4 className="font-medium mb-4">Contact Us</h4>
+ <h3 className="font-medium mb-4">Contact Us</h3>
```

### Affected File
- `components/layout/footer.tsx`

By elevating these to `<h3>`, we ensure they flow logically from any `<h2>` tags that typically exist on the main page content, satisfying accessibility requirements and fixing the Lighthouse warning!
