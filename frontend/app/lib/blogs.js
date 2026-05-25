export const BLOGS = [
  {
    slug: 'best-classic-games',
    title: 'The Best Classic Games Of All Time',
    description: 'A curated guide to classic games that still shape modern design, player expectations, and genre fundamentals.',
    publishedAt: '2026-05-19',
    updatedAt: '2026-05-19',
    readTime: '7 min read',
    category: 'Editorial Guide',
    tags: ['classic games', 'design', 'history'],
    sections: [
      {
        heading: 'Why classic games still matter',
        paragraphs: [
          'Classic games are more than nostalgia. They established the pacing, feedback loops, and design language that most modern games still rely on today.',
          'If you want to understand why certain mechanics feel timeless, these are the titles to study first.',
        ],
      },
      {
        heading: 'Standout titles',
        paragraphs: [
          'Tetris, Super Mario Bros., The Legend of Zelda, Doom, Chrono Trigger, Half-Life, and Civilization are all examples of games whose core ideas still hold up decades later.',
          'Each one introduced a memorable loop that is easy to learn and hard to outgrow.',
        ],
      },
      {
        heading: 'How to experience them today',
        paragraphs: [
          'Official collections, remasters, and legal re-releases are the best way to revisit classics. They usually preserve the original design while improving compatibility and convenience.',
          'When possible, compare remasters against the original release so you can see how the game evolved.',
        ],
      },
    ],
    conclusion: 'Classic games endure because they solve a design problem exceptionally well. That makes them worth revisiting whether you care about history, mechanics, or just great play.',
  },
  {
    slug: 'best-games-2025',
    title: 'Top 10 Games That Defined 2025',
    description: 'A year-in-review list of the games that shaped 2025 through ambition, polish, and cultural impact.',
    publishedAt: '2026-05-19',
    updatedAt: '2026-05-19',
    readTime: '6 min read',
    category: 'Year in Review',
    tags: ['2025', 'top games', 'year in review'],
    sections: [
      {
        heading: 'What defined the year',
        paragraphs: [
          '2025 was defined by large RPGs, polished action games, and a few surprise indie hits that stayed in the conversation all year.',
          'The strongest releases were the ones that combined technical confidence with memorable play loops.',
        ],
      },
      {
        heading: 'The list',
        paragraphs: [
          'Highlights included Tears of the Kingdom, Baldur\'s Gate 3, Elden Ring, Starfield, Resident Evil 4 Remake, Hogwarts Legacy, Spider-Man 2, Final Fantasy XVI, God of War Ragnarök, and Street Fighter 6.',
          'Together they represent the breadth of what players cared about in 2025: exploration, combat depth, narrative, and replay value.',
        ],
      },
      {
        heading: 'Why these games matter for buyers',
        paragraphs: [
          'For price watchers, the most important lesson is that high-demand games often keep value longer. Waiting for the right discount window can save a lot without forcing you to miss the experience entirely.',
          'That is exactly where price tracking tools remain useful even after launch hype fades.',
        ],
      },
    ],
    conclusion: 'The best games of 2025 were not just technically impressive. They were the titles that continued to matter after launch.',
  },
  {
    slug: 'steam-sale-calendar-2026',
    title: 'Steam Sale Calendar 2026',
    description: 'A practical breakdown of the seasonal Steam sale windows that matter most for game buyers.',
    publishedAt: '2026-05-19',
    updatedAt: '2026-05-19',
    readTime: '8 min read',
    category: 'Editorial Guide',
    tags: ['steam', 'sales', 'price tracking'],
    sections: [
      {
        heading: 'The major sale windows',
        paragraphs: [
          'Steam still revolves around major seasonal promotions: Spring, Summer, Autumn, and Winter. Those windows usually deliver the most reliable discounts across the store.',
          'For most players, the Summer and Winter sales matter the most because they tend to combine deep cuts with the broadest catalog coverage.',
        ],
      },
      {
        heading: 'What smart buyers watch',
        paragraphs: [
          'The best strategy is not just waiting for a sale badge. It is comparing the current price against recent history and checking whether the discount is actually close to a meaningful low.',
          'Wishlists help, but a price-history view is what turns a sale into a decision.',
        ],
      },
      {
        heading: 'Why DealScraper helps',
        paragraphs: [
          'DealScraper compares Steam, Epic, and Xbox so you can tell whether a discount is store-wide or isolated to one platform.',
          'That keeps you from buying too early and makes seasonal sale timing a real advantage instead of a guessing game.',
        ],
      },
    ],
    conclusion: 'If you plan purchases around Steam\'s sale calendar and compare across stores, you can avoid overpaying without missing the right moment to buy.',
  },
  {
    slug: 'steam-summer-sale-guide',
    title: 'Steam Summer Sale Guide',
    description: 'A tactical guide to getting the most value out of the Steam Summer Sale.',
    publishedAt: '2024-06-24',
    updatedAt: '2024-06-24',
    readTime: '8 min read',
    category: 'Editorial Guide',
    tags: ['steam summer sale', 'PC gaming', 'discounts'],
    sections: [
      {
        heading: 'Why the Summer Sale matters',
        paragraphs: [
          'The Steam Summer Sale is one of the biggest shopping events in PC gaming. For many players, it is the best time of year to expand a library without paying launch pricing.',
          'The strongest deals are usually a mix of deep discounts, visible bundles, and older catalog titles that finally hit a comfortable floor.',
        ],
      },
      {
        heading: 'What to watch during the sale',
        paragraphs: [
          'Look beyond the discount badge and compare the current offer with prior lows. If a game has been cheaper recently, waiting is usually the smarter move.',
          'When the same title drops across multiple stores, it often signals that the market is moving downward instead of just reacting to a temporary promo.',
        ],
      },
      {
        heading: 'How to use DealScraper',
        paragraphs: [
          'Track the game on Steam, Epic, and Xbox at once so you can see which storefront is leading the market.',
          'Use the live comparison and price history together: one tells you the present, the other tells you whether the offer is actually good.',
        ],
      },
    ],
    conclusion: 'A good Summer Sale strategy is patience plus data. If the price history is still trending down, waiting often saves more than buying immediately.',
  },
]

export function getBlogs() {
  return BLOGS
}

export function getBlogBySlug(slug) {
  return BLOGS.find((blog) => blog.slug === slug) ?? null
}
