export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "cliffs-of-moher",
    title: "The Ultimate Guide to Visiting the Cliffs of Moher",
    excerpt: "Discover the breathtaking beauty of Ireland's most famous natural wonder. Tips for best viewing spots, timing, and what to bring.",
    image: "/explore -Ireland-1.jpg",
    date: "March 15, 2025",
    author: "Sarah Murphy",
    readTime: "5 min read",
    category: "Nature",
    content: `
      <h2>Experience the Edge of the World</h2>
      <p>Standing 214 meters (702 feet) at their highest point, the Cliffs of Moher stretch for 8 kilometers (5 miles) along the Atlantic coast of County Clare in the west of Ireland. From the cliffs, and on a clear day, one can see the Aran Islands and Galway Bay, as well as the Twelve Pins and the Maum Turk mountains in Connemara, Loop Head to the south and the Blasket Islands in Kerry.</p>
      
      <h3>Best Time to Visit</h3>
      <p>To avoid crowds, it's best to visit the cliffs either early in the morning (before 11 am) or later in the afternoon (after 4 pm). The sunset at the cliffs is particularly spectacular, offering a golden glow over the Atlantic Ocean.</p>

      <h3>What to Expect</h3>
      <p>The O'Brien's Tower marks the highest point of the cliffs and serves as an excellent observation point. The visitor center, built into the hillside, offers an immersive exhibition about the history, geology, flora, and fauna of the cliffs.</p>

      <h3>Safety Tips</h3>
      <ul>
        <li>Always stay on the designated paths.</li>
        <li>Be prepared for changing weather; bring a waterproof jacket.</li>
        <li>Wear comfortable walking shoes.</li>
      </ul>
    `
  },
  {
    id: "2",
    slug: "wicklow-mountains",
    title: "Exploring the Wicklow Mountains: A Hiker's Paradise",
    excerpt: "Just a short drive from Dublin, the Wicklow Mountains offer stunning landscapes, ancient monastic sites, and endless hiking trails.",
    image: "/explore -Ireland-2.png",
    date: "March 10, 2025",
    author: "Liam O'Connor",
    readTime: "7 min read",
    category: "Adventure",
    content: `
      <h2>The Garden of Ireland</h2>
      <p>The Wicklow Mountains National Park covers 20,000 hectares of mountain scenery, including the famous Glendalough Valley. The park is a haven for wildlife and offers some of the best hiking in Ireland.</p>

      <h3>Glendalough Monastic Site</h3>
      <p>Founded by St. Kevin in the 6th century, Glendalough is one of the most important monastic sites in Ireland. The Round Tower, standing 30 meters high, is a testament to the endurance of early Christian architecture.</p>

      <h3>Top Trails</h3>
      <ol>
        <li><strong>The Spinc:</strong> A challenging ridge walk with spectacular views over the Upper Lake.</li>
        <li><strong>Miner's Road:</strong> A flatter, easier walk that takes you past the ruins of an old lead mining village.</li>
        <li><strong>Poulanass Waterfall:</strong> A short but steep climb to a beautiful cascading waterfall.</li>
      </ol>

      <p>Whether you're looking for a leisurely stroll or a strenuous hike, the Wicklow Mountains have something for everyone.</p>
    `
  },
  {
    id: "3",
    slug: "ring-of-kerry",
    title: "Driving the Ring of Kerry: Ireland's Scenic Route",
    excerpt: "A journey through the stunning landscapes of the Iveragh Peninsula. Castles, beaches, and charming villages await.",
    image: "/explore -Ireland-3.jpg",
    date: "March 5, 2025",
    author: "Emma Walsh",
    readTime: "10 min read",
    category: "Road Trip",
    content: `
      <h2>A 179km Circuit of Beauty</h2>
      <p>The Ring of Kerry is a circular tourist route in County Kerry, south-western Ireland. Clockwise from Killarney, it follows the N71 to Kenmare, then the N70 around the Iveragh Peninsula to Killorglin, passing through Sneem, Waterville, Cahersiveen, and Glenbeigh, before returning to Killarney via the N72.</p>

      <h3>Must-See Stops</h3>
      <ul>
        <li><strong>Killarney National Park:</strong> Start your journey exploring the lakes and Muckross House.</li>
        <li><strong>Ladies View:</strong> A scenic viewpoint named after Queen Victoria's ladies-in-waiting.</li>
        <li><strong>Rossbeigh Beach:</strong> A beautiful sandy beach perfect for a walk or a swim.</li>
      </ul>

      <p>Take your time and allow at least a full day to complete the drive, stopping frequently to take in the views and enjoy the local hospitality.</p>
    `
  }
];
