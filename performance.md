- **performance optimization techniques**
  If your goal is to **master performance optimization—not just memorize `useMemo()` and `next/image`—you should learn performance as a full-stack discipline**.
  That means understanding the entire chain:

  > **Network → Server → HTML → CSS → JavaScript → React render → DOM → Browser rendering → Images/fonts → Third-party scripts → User interaction → Backend/API → Database → Caching**
  > And then learn how JavaScript/TypeScript, React, and Next.js affect every stage.
  > Next.js already configures many lower-level bundling/building optimizations for you, while React provides the component/rendering model.
  > Below is the **master roadmap I would use if I wanted to become genuinely strong at web/app performance engineering.**

  ***

  # 1. The Performance Mental Model

  ```
                      WEBSITE / APP
                           │
         ┌─────────────────┼──────────────────┐
         │                 │                  │
      NETWORK            SERVER             CLIENT
         │                 │                  │
   DNS/TLS              API/DB            JavaScript
   HTML                 SSR/RSC           React
   CSS                  Cache             DOM
   Images               Compression       Browser
   Fonts                CDN               Rendering
         │                 │                  │
         └─────────────────┼──────────────────┘
                           ↓
                    USER EXPERIENCE
                           ↓
         Loading → Rendering → Interaction
  ```

  You should eventually be able to answer:
  - Why is the first byte slow?
  - Why is LCP slow?
  - Why is JavaScript large?
  - Why did this component render?
  - Why did 100 components render?
  - Why is scrolling laggy?
  - Why is typing laggy?
  - Why is hydration expensive?
  - Why is the browser downloading something it doesn't need?
  - Why is an API request slow?
  - Why does an image shift the layout?
  - Why did adding an analytics SDK make the page slower?
  - Why does production behave differently from development?
    That's the level you want.

  ***

  # 2. The 12 Major Performance Areas

  I'd divide your learning into these:
  | Area | What you need to master |
  | ----------------------- | ---------------------------------------------------- |
  | 1. Measurement | DevTools, Lighthouse, profiling, Web Vitals |
  | 2. Network | HTTP, caching, compression, CDN, HTTP/2/3 |
  | 3. Loading | Critical path, preload, prefetch, lazy loading |
  | 4. JavaScript | Bundles, tree shaking, code splitting, execution |
  | 5. React rendering | Re-renders, reconciliation, memoization |
  | 6. Next.js architecture | SSR, SSG, ISR, RSC, Server/Client Components |
  | 7. Images | Responsive images, formats, dimensions, lazy loading |
  | 8. CSS/UI | Critical CSS, layout, paint, compositing |
  | 9. Third-party code | Analytics, ads, chat, widgets, SDKs |
  | 10. Data/API | Fetching, caching, waterfalls, pagination |
  | 11. Memory/runtime | Leaks, expensive computations, workers |
  | 12. Architecture | Reusable, pure, maintainable performant systems |
  This is the complete picture.

  ***

  # 3. First Master Web Performance Fundamentals

  Before React/Next.js, learn browser performance.
  web.dev Performance Course
  This is extremely important because React is only one part of the browser.
  Learn:

  ### Network
  - DNS lookup
  - TCP
  - TLS
  - HTTP/1.1
  - HTTP/2
  - HTTP/3
  - QUIC
  - connection reuse
  - compression
  - Brotli
  - gzip
  - CDN
  - caching
  - cache-control
  - ETag
  - stale-while-revalidate

  ### Browser loading

  Learn the:

  ```
  HTML
   ↓
  CSS
   ↓
  JavaScript
   ↓
  Fonts
   ↓
  Images
   ↓
  Other resources
  ```

  And understand:
  - render-blocking resources
  - parser-blocking scripts
  - preload
  - prefetch
  - preconnect
  - lazy loading
  - priority
  - resource hints
    The critical rendering path is one of the fundamental concepts of web performance.

  ***

  # 4. Master Core Web Vitals

  You absolutely need these.

  ## LCP

  **Largest Contentful Paint**
  Measures loading performance.
  Usually affected by:
  - slow server response
  - slow HTML
  - hero image
  - fonts
  - render-blocking CSS
  - JavaScript
  - third-party code

  ***

  ## INP

  **Interaction to Next Paint**
  Measures responsiveness.
  Affected by:
  - expensive JavaScript
  - long tasks
  - React rendering
  - event handlers
  - huge component trees
  - synchronous computation

  ***

  ## CLS

  **Cumulative Layout Shift**
  Affected by:
  - images without dimensions
  - dynamic content
  - fonts
  - ads
  - injected elements
  - animations that change layout

  ***

  Also understand:
  - TTFB
  - FCP
  - Speed Index
  - Total Blocking Time
  - Time to Interactive
  - Long Tasks

  ***

  # 5. Learn Chrome DevTools Extremely Well

  This is one of the highest-value skills.
  Master:

  ### Network tab

  Understand:

  ```
  Request
   ↓
  Queueing
   ↓
  DNS
   ↓
  Connection
   ↓
  TLS
   ↓
  Request
   ↓
  TTFB
   ↓
  Download
  ```

  Learn to identify:
  - slow requests
  - waterfalls
  - duplicate requests
  - huge files
  - unused files
  - blocking resources
  - cache misses
  - third-party requests

  ***

  ### Performance tab

  Learn:

  ```
  Main thread
  ├── JavaScript
  ├── Style
  ├── Layout
  ├── Paint
  ├── Composite
  └── Idle
  ```

  You should eventually look at a performance trace and immediately ask:

  > "What's occupying the main thread?"

  ***

  ### Memory

  Learn:
  - heap snapshots
  - retained objects
  - detached DOM nodes
  - memory leaks
  - garbage collection

  ***

  ### React DevTools

  Learn:
  - component profiler
  - render reasons
  - commit durations
  - component tree
  - state updates

  ***

  # 6. JavaScript Performance

  This is where your JavaScript/TypeScript knowledge becomes extremely important.

  ## Avoid unnecessary computation

  Bad:

  ```
  functionprocessUsers(users:User[]) {returnusers.filter(...).map(...).sort(...).filter(...).map(...);
  }
  ```

  If this runs on every render with 100,000 records, you've created a problem.
  Learn:
  - algorithmic complexity
  - Big O
  - data structures
  - memoization
  - lazy evaluation
  - batching
  - debouncing
  - throttling
  - caching

  ***

  # 7. Pure Functions

  This is especially important in React.
  A pure function:

  ```
  functionadd(a:number,b:number) {returna+b;
  }
  ```

  Same input:

  ```
  add(2, 3)
  ```

  always produces:

  ```
  5
  ```

  No:
  - network request
  - mutation
  - DOM manipulation
  - random side effect
  - global mutation
    React explicitly emphasizes purity because it allows React and its tooling/compiler to reason about components and optimize them correctly.

  ***

  # 8. Immutable Data

  Avoid:

  ```
  user.name="John";
  ```

  Prefer:

  ```
  setUser(prev => ({
    ...prev,
    name:"John",
  }));
  ```

  Why?
  Because reference identity becomes extremely important in React.

  ```
  oldObject===newObject
  ```

  React and memoization techniques can use that information.

  ***

  # 9. React Rendering Performance

  This is where you need to become very strong.
  Understand:

  ```
  State update
       ↓
  Component render
       ↓
  Child renders
       ↓
  Reconciliation
       ↓
  Commit
       ↓
  DOM updates
       ↓
  Browser rendering
  ```

  Not every React render means the DOM changes.
  That's a very important distinction.

  ***

  # 10. Avoid Unnecessary Re-renders

  Example:

  ```
  functionParent() {const [count,setCount]=useState(0);return (<><buttononClick={() =>setCount(c =>c+1)}>
          {count}</button><ExpensiveComponent/></>
    );
  }
  ```

  You need to understand why `ExpensiveComponent` may render again.
  Then learn techniques such as:
  - component splitting
  - local state
  - children composition
  - memoization
  - stable references
  - context splitting
  - external stores
    React itself recommends keeping state local and avoiding unnecessary state-update chains from Effects.

  ***

  # 11. `React.memo`

  ```
  constProductCard=memo(functionProductCard({
    product,
  }:Props) {return<div>{product.name}</div>;
  });
  ```

  It can skip rendering when props haven't changed.
  But don't blindly do:

  ```
  memo(...)memo(...)memo(...)memo(...)
  ```

  React's documentation explicitly says memoization is an optimization, not something your correctness should depend on.
  Understand **when it helps and when it doesn't**.

  ***

  # 12. `useMemo`

  Use it when an expensive calculation genuinely benefits from caching.

  ```
  constfilteredProducts=useMemo(
    () =>filterProducts(products,query),
    [products,query]
  );
  ```

  Good candidates:

  ```
  10,000-item filtering
  large sorting
  expensive transformation
  expensive calculations
  ```

  Not:

  ```
  constname=useMemo(() =>user.name, [user]);
  ```

  That's usually pointless.
  React explicitly recommends treating `useMemo` as a performance optimization rather than something required for correctness.

  ***

  # 13. `useCallback`

  ```
  consthandleDelete=useCallback(
    (id:string) => {deleteUser(id);
    },
    []
  );
  ```

  The important question isn't:

  > "Should I use useCallback?"
  > It's:
  > **"Does function identity matter here?"**
  > For example:

  ```
  constChild=memo(...)
  ```

  and:

  ```
  <ChildonDelete={handleDelete}/>
  ```

  Then stable function identity can matter.

  ***

  # 14. React Compiler

  This is now a major topic you should learn.
  React Compiler can automatically optimize/memoize components and values, reducing the need for manually adding `useMemo`, `useCallback`, and `memo`.
  So your modern mental model should be:

  ```
  Old React optimization mindset:

  memo
  useMemo
  useCallback
        ↓
  manual optimization

  Modern React:

  write good/pure React
        ↓
  React Compiler
        ↓
  automatic optimization
  ```

  But you still need to understand manual memoization because:
  - you will work on existing codebases
  - some cases require control
  - you need to understand performance problems
  - not every bottleneck is a React memoization problem

  ***

  # 15. Context Performance

  A common problem:

  ```
  <UserContext.Providervalue={user}>
  ```

  If the context value changes, many consumers can update.
  Learn:

  ### Context splitting

  Instead of:

  ```
  AppContext
   ├── user
   ├── theme
   ├── cart
   ├── notifications
   └── settings
  ```

  use:

  ```
  UserContext
  ThemeContext
  CartContext
  NotificationContext
  SettingsContext
  ```

  Also learn:
  - selectors
  - external stores
  - Zustand
  - Redux
  - `useSyncExternalStore`

  ***

  # 16. Don't Abuse `useEffect`

  This is one of the most important React performance lessons.
  Bad pattern:

  ```
  const [fullName,setFullName]=useState("");useEffect(() => {setFullName(`${firstName}${lastName}`);
  }, [firstName,lastName]);
  ```

  You don't need an Effect.
  Do:

  ```
  constfullName=`${firstName}${lastName}`;
  ```

  The first approach can create an unnecessary update/render cycle.
  React specifically calls out unnecessary Effects that update state as a common source of performance problems.

  ***

  # 17. Component Architecture for Performance

  Learn to build:

  ```
  Page
   │
   ├── Header
   │
   ├── Search
   │
   ├── Filter
   │
   ├── ProductList
   │    ├── ProductCard
   │    ├── ProductCard
   │    └── ProductCard
   │
   └── Footer
  ```

  instead of:

  ```
  GiantComponent.tsx
  ```

  Why?
  Because component boundaries give you control over:
  - rendering
  - state
  - loading
  - code splitting
  - caching
  - memoization
  - ownership

  ***

  # 18. Reusable Components

  Performance doesn't mean:

  > "Make everything reusable."
  > Instead:
  > **Make abstractions reusable without making the runtime unnecessarily expensive.**
  > Good:

  ```
  <Buttonvariant="primary"size="lg">
    Buy now</Button>
  ```

  Bad abstraction:

  ```
  UniversalComponent
    47 props
    15 contexts
    9 effects
    6 conditional branches
  ```

  Reusable ≠ performant automatically.

  ***

  # 19. Next.js Performance

  Now move into Next.js.
  Next.js Documentation
  The most important concepts:

  ```
  Server Components
  Client Components
  SSR
  SSG
  ISR
  Streaming
  Suspense
  Caching
  Data fetching
  Route handlers
  Middleware
  Image optimization
  Font optimization
  Script optimization
  Dynamic imports
  Bundle optimization
  ```

  ***

  # 20. Server Components vs Client Components

  This is one of the biggest Next.js performance concepts.
  Default:

  ```
  exportdefaultasyncfunctionPage() {constdata=awaitgetData();return<Productsdata={data}/>;
  }
  ```

  You can keep computation/data fetching on the server.
  Client component:

  ```
  "use client";
  ```

  means the component participates in the client-side React application.
  Think:

  ```
  Server Component
         ↓
  HTML / RSC payload
         ↓
  Browser

  Client Component
         ↓
  JavaScript bundle
         ↓
  Browser
         ↓
  Hydration / interaction
  ```

  Therefore:

  > **Don't make everything `"use client"`.**
  > This is a major Next.js performance rule.

  ***

  # 21. Reduce Client JavaScript

  Ask:

  > Does this component actually need browser JavaScript?
  > If not:

  ```
  // Server Component
  ```

  instead of:

  ```
  "use client";
  ```

  Reducing client JavaScript can improve:
  - download
  - parse
  - compile
  - execute
  - hydration
  - memory
  - interaction performance

  ***

  # 22. Code Splitting

  Don't ship the entire application upfront.
  Learn:

  ```
  constEditor=dynamic(() =>import("./Editor"));
  ```

  Then the editor doesn't need to be included in the initial JavaScript path.
  Great candidates:
  - charts
  - maps
  - editors
  - admin tools
  - modals
  - rich text editors
  - payment widgets
  - large UI libraries

  ***

  # 23. Lazy Loading

  Use lazy loading for content that isn't immediately required.
  Examples:

  ```
  Below-the-fold images
  Heavy components
  Analytics
  Chat widgets
  Maps
  Charts
  Video players
  ```

  ***

  # 24. Images

  This is a huge area.
  Next.js provides `next/image` with optimization capabilities such as responsive sizing and modern formats.
  Learn:

  ```
  <Imagesrc="/hero.jpg"alt="Hero"width={1200}height={700}/>
  ```

  Understand:
  - intrinsic dimensions
  - responsive images
  - `sizes`
  - `srcset`
  - WebP
  - AVIF
  - compression
  - lazy loading
  - priority
  - LCP images
  - placeholders
  - blur
  - CDN optimization

  ***

  # 25. Don't Optimize Images Only With Compression

  Image performance is:

  ```
  File size
  +
  Dimensions
  +
  Format
  +
  Delivery
  +
  Priority
  +
  Lazy loading
  +
  CDN
  ```

  For example:

  ```
  Original:
  4000 × 3000
  5 MB

  User device:
  390 × 844
  ```

  Don't send 4000×3000 unnecessarily.

  ***

  # 26. Image Layout Stability

  Bad:

  ```
  <imgsrc="..."/>
  ```

  without knowing dimensions.
  The browser may not know how much space to reserve.
  Result:

  ```
  Content appears
       ↓
  Image loads
       ↓
  Content moves
       ↓
  CLS
  ```

  Reserve space.

  ***

  # 27. Fonts

  Fonts can be surprisingly expensive.
  Learn:
  - font subsetting
  - WOFF2
  - font-display
  - preload
  - variable fonts
  - system fonts
  - reducing font families
  - reducing weights
    Don't load:

  ```
  Roboto 100
  Roboto 200
  Roboto 300
  Roboto 400
  Roboto 500
  Roboto 600
  Roboto 700
  Roboto 800
  Roboto 900
  ```

  unless you genuinely need them.

  ***

  # 28. Third-Party JavaScript

  This is **one of the most important topics you specifically mentioned**.
  Examples:

  ```
  Google Analytics
  Google Tag Manager
  Facebook Pixel
  Hotjar
  Intercom
  Zendesk
  Stripe
  PayPal
  Google Maps
  YouTube
  Ads
  A/B testing
  Chat widgets
  Social embeds
  ```

  Third-party JavaScript can delay content and hurt user performance if loaded too early. Next.js provides `next/script` specifically to control loading/execution strategies.

  ***

  # 29. Third-Party Script Strategies

  Next.js:

  ```
  <Scriptsrc="..."strategy="afterInteractive"/>
  ```

  or:

  ```
  <Scriptsrc="..."strategy="lazyOnload"/>
  ```

  Conceptually:

  ```
  Critical
     ↓
  Load immediately

  Important
     ↓
  After interaction

  Non-critical
     ↓
  Idle / lazy
  ```

  Don't load everything at startup.

  ***

  # 30. Third-Party Performance Strategy

  For every third-party dependency ask:

  ### 1. Do we need it?

  ### 2. Can we remove it?

  ### 3. Can we self-host it?

  ### 4. Can we delay it?

  ### 5. Can we load it only on certain routes?

  ### 6. Can we load it after interaction?

  ### 7. Can we replace the library with a smaller one?

  ### 8. Can we dynamically import it?

  ### 9. Does it block LCP?

  ### 10. Does it create long tasks?

  This mindset is much more valuable than memorizing `next/script`.

  ***

  # 31. API Performance

  You also need backend knowledge.
  Learn:

  ```
  Client
   ↓
  Next.js Server
   ↓
  API
   ↓
  Database
  ```

  Identify:

  ```
  Waterfall
  ```

  Example:

  ```
  Request user
       ↓
  Request orders
       ↓
  Request products
       ↓
  Request reviews
  ```

  Could potentially become:

  ```
          ┌→ user
  Page ───┼→ orders
          ├→ products
          └→ reviews
  ```

  Parallelize independent requests.

  ***

  # 32. Database Performance

  If you want **full-stack performance mastery**, don't stop at React.
  Learn:
  - indexes
  - query plans
  - N+1 queries
  - joins
  - pagination
  - connection pooling
  - caching
  - denormalization
  - query batching
  - database latency
    A React optimization cannot save a 4-second SQL query.

  ***

  # 33. Caching

  You need to understand caching at every layer.

  ```
  Browser Cache
        ↓
  CDN Cache
        ↓
  Next.js Cache
        ↓
  Application Cache
        ↓
  Database Cache
  ```

  Learn:
  - Cache-Control
  - ETag
  - immutable assets
  - stale-while-revalidate
  - CDN caching
  - request memoization
  - data caching
  - revalidation
  - ISR
    Caching is one of the biggest performance multipliers.

  ***

  # 34. Streaming

  Next.js + React can stream UI.
  Conceptually:

  ```
  Server
   │
   ├── Header ─────────→ Browser
   │
   ├── Main content ───→ Browser
   │
   └── Slow section ───→ Browser later
  ```

  With:

  ```
  <Suspensefallback={<Loading/>}><SlowComponent/></Suspense>
  ```

  Instead of waiting for everything.

  ***

  # 35. Suspense

  Think of Suspense as a way to structure asynchronous UI.

  ```
  <Suspensefallback={<Skeleton/>}><ProductRecommendations/></Suspense>
  ```

  This helps you build interfaces around independent loading boundaries.

  ***

  # 36. Rendering Performance

  Understand the browser pipeline:

  ```
  JavaScript
     ↓
  Style calculation
     ↓
  Layout
     ↓
  Paint
     ↓
  Composite
  ```

  This is absolutely critical.

  ***

  # 37. Layout / Reflow

  Expensive:

  ```
  DOM change
   ↓
  Layout
   ↓
  Another DOM measurement
   ↓
  Layout
   ↓
  Another DOM change
  ```

  This can cause **layout thrashing**.
  Learn to avoid patterns involving repeated:

  ```
  element.offsetHeightelement.offsetWidthgetBoundingClientRect()
  ```

  mixed with DOM writes.

  ***

  # 38. CSS Performance

  Learn:
  - selector complexity
  - unused CSS
  - CSS splitting
  - critical CSS
  - animations
  - `transform`
  - `opacity`
  - layout properties
  - containment
  - `content-visibility`
  - `will-change`
    Prefer GPU-friendly animation patterns when appropriate:

  ```
  transform:translateX(...);opacity: ...;
  ```

  rather than repeatedly changing:

  ```
  topleftwidthheight
  ```

  for animations.

  ***

  # 39. Lists

  Large lists are a classic performance problem.
  Bad:

  ```
  {users.map(user => (<UserCarduser={user}/>
  ))}
  ```

  with:

  ```
  100,000 users
  ```

  Learn:

  ### Pagination

  ```
  1
  2
  3
  4
  ...
  ```

  ### Infinite scrolling

  ### Virtualization

  Only render what's visible:

  ```
  100,000 items

           ↓

  Viewport

  ┌──────────────┐
  │ item 100     │
  │ item 101     │
  │ item 102     │
  │ item 103     │
  │ item 104     │
  └──────────────┘

  Only ~20 DOM nodes
  ```

  Learn libraries such as TanStack Virtual when appropriate.

  ***

  # 40. Search/Input Performance

  For expensive search:

  ```
  User typing
   ↓
  debounce
   ↓
  API
  ```

  Instead of:

  ```
  U → API
  s → API
  e → API
  r → API
  ```

  Use:

  ```
  User types
   ↓
  wait 300ms
   ↓
  request
  ```

  Also understand React concurrency tools such as:
  - `useTransition`
  - `useDeferredValue`
    These solve different problems than debouncing.

  ***

  # 41. Web Workers

  If computation is genuinely CPU-heavy:

  ```
  Main Thread
       │
       ├── UI
       ├── React
       └── Browser
  ```

  Move expensive computation:

  ```
  Main Thread
       │
       └── Web Worker
               ↓
          Heavy calculation
  ```

  Useful for:
  - image processing
  - large data transformations
  - encryption
  - parsing
  - scientific calculations
  - complex algorithms

  ***

  # 42. TypeScript Performance

  TypeScript itself usually doesn't affect runtime performance directly because types disappear after compilation.
  But TypeScript can affect:

  ### Build performance

  Learn:
  - project references
  - incremental compilation
  - `skipLibCheck`
  - type complexity
  - declaration generation
  - build caching

  ### Runtime architecture

  Types help you create:
  - predictable data
  - smaller APIs
  - safer abstractions
  - reusable utilities
    But remember:

  ```
  typeUser=...
  ```

  doesn't exist at runtime.

  ***

  # 43. Bundle Optimization

  Learn how your JavaScript gets transformed:

  ```
  TypeScript
     ↓
  Compiler
     ↓
  Bundler
     ↓
  Tree shaking
     ↓
  Code splitting
     ↓
  Minification
     ↓
  Chunks
     ↓
  Browser
  ```

  Understand:
  - tree shaking
  - dead-code elimination
  - minification
  - source maps
  - chunks
  - dynamic imports
  - dependency graphs
  - bundle analysis

  ***

  # 44. Dependency Optimization

  Don't install a 200 KB library for a 2 KB feature.
  Learn to evaluate:

  ```
  Package size
  +
  Dependencies
  +
  Tree-shaking support
  +
  Browser compatibility
  +
  Runtime cost
  +
  Execution cost
  ```

  Tools worth learning:
  - bundle analyzers
  - `package.json`
  - npm/pnpm
  - import cost analysis
  - dependency graphs

  ***

  # 45. Import Optimization

  Instead of:

  ```
  import*aslodashfrom"lodash";
  ```

  prefer an approach that lets your bundler eliminate unused code when supported.
  Also watch for:

  ```
  large library
   ↓
  one tiny function
  ```

  Sometimes a native API is better.

  ***

  # 46. Avoid Barrel-File Problems

  Be aware of:

  ```
  import {Button }from"@/components";
  ```

  where:

  ```
  components/index.ts
  ```

  exports hundreds of things.
  Depending on your tooling/module setup, barrel files can complicate dependency graphs and bundling.
  Learn how module graphs actually work rather than blindly following an import style.

  ***

  # 47. Data Fetching Performance

  Learn:

  ```
  fetch
  cache
  dedupe
  prefetch
  parallel requests
  pagination
  infinite queries
  optimistic updates
  stale data
  revalidation
  ```

  Also learn libraries such as:
  - TanStack Query
  - SWR
    But understand the underlying concepts before using them.

  ***

  # 48. Optimistic UI

  Instead of:

  ```
  Click
   ↓
  request
   ↓
  server
   ↓
  response
   ↓
  update UI
  ```

  sometimes:

  ```
  Click
   ↓
  update UI immediately
   ↓
  request
   ↓
  server
  ```

  Example:

  ```
  Like ❤️
  ```

  feels instant even if the server takes 300 ms.

  ***

  # 49. Prefetching

  If you know the user will probably navigate somewhere:

  ```
  Current page
       ↓
  likely next page
       ↓
  prefetch
  ```

  But be careful.
  Prefetching everything can **waste bandwidth**.
  Performance optimization is often about:

  > **Doing less work, not doing more work faster.**

  ***

  # 50. Loading Strategy

  You should be able to classify every resource:

  ```
  CRITICAL
  IMPORTANT
  OPTIONAL
  ```

  Example:

  ### Critical

  ```
  HTML
  critical CSS
  hero image
  essential JS
  ```

  ### Important

  ```
  fonts
  secondary JS
  ```

  ### Optional

  ```
  analytics
  chat
  recommendations
  ads
  below-fold images
  ```

  Then load accordingly.

  ***

  # 51. Mobile Performance

  Never optimize only for your MacBook.
  Test:

  ```
  Low-end Android
  Slow CPU
  Slow network
  Small screen
  Limited memory
  ```

  Chrome DevTools allows CPU/network throttling; React's documentation similarly recommends testing under artificial CPU slowdown and measuring production builds for realistic results.

  ***

  # 52. Performance Budget

  This is an advanced but extremely useful concept.
  Set limits.
  Example:

  ```
  Initial JS:       < 200 KB
  Hero image:       < 150 KB
  Fonts:            < 100 KB
  LCP:              < 2.5s
  INP:              < 200ms
  CLS:              < 0.1
  ```

  The exact budgets depend on your application.
  The idea is:

  > **Performance becomes an engineering requirement rather than an afterthought.**

  ***

  # 53. Monitoring in Production

  Lighthouse isn't enough.
  You need:

  ```
  Real users
     ↓
  Real devices
     ↓
  Real networks
     ↓
  Real performance
  ```

  Learn:
  - Real User Monitoring
  - Web Vitals
  - performance marks
  - performance measures
  - error monitoring
  - tracing
  - analytics
    Useful APIs:

  ```
  performance.mark("start");performance.measure("operation","start"
  );
  ```

  ***

  # 54. Architecture: Performance by Design

  Eventually you want this:

  ```
                PERFORMANCE
                     │
         ┌───────────┼───────────┐
         ↓           ↓           ↓
      Network      Runtime     Rendering
         │           │           │
        CDN        React       Browser
        Cache      JS          DOM
        HTTP       CPU         CSS
         │           │           │
         └───────────┼───────────┘
                     ↓
                 UX / Vitals
  ```

  Performance should be considered when designing the architecture—not added after the application becomes slow.

  ***

  # 55. Your React Performance Checklist

  When you see a slow React component, ask:

  ```
  □ Why is it rendering?
  □ How often does it render?
  □ How expensive is render?
  □ Are props changing?
  □ Are object references changing?
  □ Are function references changing?
  □ Is context causing the render?
  □ Is state too high in the tree?
  □ Is there an unnecessary Effect?
  □ Is expensive computation happening?
  □ Is a large list being rendered?
  □ Is memoization actually useful?
  □ Could React Compiler handle it?
  ```

  ***

  # 56. Your Next.js Performance Checklist

  For every Next.js page:

  ```
  □ Is this Server Component?
  □ Does it actually need "use client"?
  □ How much client JS ships?
  □ Are requests parallel?
  □ Is there a request waterfall?
  □ Is data cached?
  □ Can content stream?
  □ Can this component be dynamically imported?
  □ Are images optimized?
  □ Are fonts optimized?
  □ Are third-party scripts delayed?
  □ Is the LCP element prioritized?
  □ Are unnecessary dependencies included?
  □ Is the page statically generated?
  □ Can ISR be used?
  □ Is the CDN being utilized?
  ```

  ***

  # 57. Your Third-Party Checklist

  For every external SDK:

  ```
                      THIRD PARTY
                           │
                Do we actually need it?
                           │
                   ┌───────┴───────┐
                  NO              YES
                  │                │
                REMOVE        Can we delay?
                                    │
                              Can we lazy load?
                                    │
                             Can we route-scope?
                                    │
                             Can we self-host?
                                    │
                            Can we reduce API?
                                    │
                           Measure its impact
  ```

  This is one of the areas where Next.js's `Script` component is particularly useful.

  ***

  # 58. The Most Important Optimization Principle

  Memorize this:

  > **Don't optimize blindly. Measure → Identify bottleneck → Change one thing → Measure again.**
  > Not:

  ```
  Slow website
   ↓
  useMemo everywhere
   ↓
  React.memo everywhere
   ↓
  useCallback everywhere
   ↓
  hope
  ```

  Instead:

  ```
  Problem
     ↓
  Measure
     ↓
  Profile
     ↓
  Find bottleneck
     ↓
  Hypothesis
     ↓
  Optimize
     ↓
  Measure again
     ↓
  Keep/revert
  ```

  That's how professional performance engineers work.

  ***

  # 59. The Master Skill Tree I Recommend for You

  Since you specifically want to master **JavaScript + TypeScript + React + Next.js + full website/app performance**, I'd learn in this order:

  ```
  LEVEL 1
  JavaScript Fundamentals
  │
  ├── Event loop
  ├── Promises
  ├── async/await
  ├── closures
  ├── memory
  ├── garbage collection
  └── algorithms
          ↓
  LEVEL 2
  Browser Fundamentals
  │
  ├── HTTP
  ├── DNS
  ├── TLS
  ├── caching
  ├── rendering
  ├── DOM
  ├── CSS
  └── network waterfall
          ↓
  LEVEL 3
  Web Performance
  │
  ├── LCP
  ├── INP
  ├── CLS
  ├── TTFB
  ├── critical path
  ├── DevTools
  └── Lighthouse
          ↓
  LEVEL 4
  React Performance
  │
  ├── rendering
  ├── reconciliation
  ├── state
  ├── context
  ├── memo
  ├── useMemo
  ├── useCallback
  ├── effects
  ├── purity
  └── React Compiler
          ↓
  LEVEL 5
  Next.js Performance
  │
  ├── Server Components
  ├── Client Components
  ├── SSR
  ├── SSG
  ├── ISR
  ├── streaming
  ├── Suspense
  ├── caching
  ├── dynamic imports
  ├── images
  ├── fonts
  └── scripts
          ↓
  LEVEL 6
  Full-Stack Performance
  │
  ├── API
  ├── database
  ├── caching
  ├── CDN
  ├── queues
  ├── concurrency
  └── observability
          ↓
  LEVEL 7
  Advanced Performance Engineering
  │
  ├── Web Workers
  ├── virtualization
  ├── memory profiling
  ├── browser internals
  ├── performance budgets
  ├── RUM
  ├── tracing
  └── architecture
  ```

  ***

  # 60. The 20 Topics I Would Prioritize Most

  If you don't want to study everything simultaneously, prioritize these:
  1. **Browser rendering pipeline**
  2. **Chrome DevTools Performance**
  3. **Network waterfall**
  4. **Core Web Vitals**
  5. **JavaScript event loop**
  6. **JavaScript execution/memory**
  7. **React rendering/reconciliation**
  8. **React state architecture**
  9. **React purity**
  10. **React Compiler**
  11. **Memoization**
  12. **Next.js Server vs Client Components**
  13. **Next.js caching**
  14. **Code splitting**
  15. **Image optimization**
  16. **Third-party JavaScript**
  17. **API waterfalls**
  18. **Database/query performance**
  19. **CDN/browser caching**
  20. **Production monitoring/RUM**
      If you master those, you'll be far beyond someone who simply knows `useMemo()`.

  ***

  # 61. A Practical Project-Based Way to Master This

  This is what I'd actually recommend.
  Build **one deliberately slow Next.js application**.
  For example:

  ```
  E-commerce application

  ├── Homepage
  ├── Product listing
  ├── Search
  ├── Filters
  ├── Product details
  ├── Cart
  ├── Checkout
  ├── Reviews
  ├── Recommendations
  ├── Analytics
  ├── Chat widget
  ├── Maps
  └── Admin dashboard
  ```

  Then deliberately make it bad:

  ```
  Huge images
  Huge JS bundle
  1000 products
  Unnecessary renders
  Bad context
  Many effects
  Sequential API requests
  Unoptimized fonts
  Third-party scripts
  Huge dependencies
  No caching
  No pagination
  No virtualization
  ```

  Then optimize it systematically.
  Measure:

  ```
  Before
   ↓
  Lighthouse
   ↓
  DevTools
   ↓
  React Profiler
   ↓
  Network
   ↓
  Bundle analyzer
   ↓
  Memory
   ↓
  Database
  ```

  Then:

  ```
  Optimization #1
   ↓
  Measure

  Optimization #2
   ↓
  Measure

  Optimization #3
   ↓
  Measure
  ```

  Keep a performance journal:

  ```
  Problem:
  LCP = 4.8s

  Cause:
  Hero image = 1.8MB

  Fix:
  Responsive AVIF + priority

  Result:
  LCP = 2.4s

  Improvement:
  50%
  ```

  That will teach you **far more than reading 100 optimization tips**.

  ***

  ## The final mindset

  You want to transition from:

  > **"I'm a React/Next.js developer who knows some performance tricks."**
  > to:
  > **"I'm a software engineer who can diagnose and optimize the entire execution and delivery pipeline of a web application."**
  > That's a much more powerful skill.
  > And your focus on **third-party integration, loading, rendering, images, reusable components, pure functions, JavaScript/TypeScript, React and Next.js** is exactly the right direction—but don't isolate those topics. Tie all of them back to **network cost, CPU cost, memory cost, rendering cost, and user-perceived latency**.
  > React's current documentation is particularly worth following because React Compiler changes how much manual memoization you need, while React's rules around purity remain foundational.
  > If you want to go deep, I would treat this as a **6–9 month Performance Engineering curriculum**, with progressively harder projects and real DevTools profiling—not just a list of APIs.
