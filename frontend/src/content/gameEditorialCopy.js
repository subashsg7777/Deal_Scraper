const GAME_COPY_BY_ID = {
  '69b52f0660f9e6d7a4183316': {
    title: 'Cyberpunk 2077',
    summary:
      'Cyberpunk 2077 is a strong price-watch candidate because it tends to swing between full-price visibility and aggressive sale periods. That makes it useful for shoppers who want to know whether the current number is a real opportunity or just a temporary marketing dip. This page is meant to answer the question that matters most before a purchase: does the current offer line up with the game\'s recent history and the way major stores usually discount it?',
    whyTrack:
      'Track this title if you care about value per hour and you do not want to buy during a short-lived high point. Large releases with long support windows often show gradual price compression, then sharp drops around major seasonal events or platform promos. That means the page is most useful when you are comparing a live price against a pattern rather than against a single snapshot.',
    bestTime:
      'The best time to buy is usually when a major platform sale coincides with a general gaming event window. If one store drops first, the others often react, so it is worth checking back after the first discount wave. For a game like this, patience can pay off because a temporary hold can turn into a better bundle, a deeper discount, or a more complete edition.',
    platformInsight:
      'Steam often has the clearest price history, Epic can be competitive during promotional campaigns, and Xbox prices may line up with console-specific sale cycles. Comparing all three helps you spot whether a discount is platform-wide or only tied to a single storefront. If the live feeds are missing, the content here still gives you a buying framework instead of leaving the page empty.',
    priceFallback:
      'If live price data is unavailable right now, use this page as a reference point, then refresh after the next store update. The game is still worth tracking because the long-term value pattern is usually more important than one missing snapshot.',
  },
  '69b7713923c3b3b3ff8a4ca2': {
    title: 'Elden Ring',
    summary:
      'Elden Ring is the kind of game people watch for months because its price tends to matter more than its launch window. It has strong evergreen demand, which means discounts often arrive in deliberate waves rather than random dips. This page explains whether the current offer is close to the typical sale floor and whether waiting is likely to save more money without forcing you to miss the moment you actually want to play.',
    whyTrack:
      'Track this title if you want a game with long replay value and a price curve that rewards patience. High-demand catalog games usually hold value longer, especially when DLC interest or community buzz keeps demand stable. That creates a useful comparison problem: a discount can look small on paper but still be meaningful if the title rarely goes lower.',
    bestTime:
      'The best buying window is usually when platform-wide sales overlap with a quieter period between major content updates. If the current price is close to a recently observed low, buying sooner can be reasonable. If the price is still well above the recent trough, waiting for the next seasonal cycle is often the smarter call.',
    platformInsight:
      'Steam is usually the easiest store for long-term history checks, while Epic may occasionally undercut it during promotions or coupon-style events. Xbox pricing can be attractive for console owners, especially when sale timing matches subscription or ecosystem deals. Comparing the three stores gives you a much clearer picture than relying on one storefront alone.',
    priceFallback:
      'If the live feed does not load, the game is still worth monitoring because its discount pattern is usually stable enough to compare over time. Come back after the next refresh and treat the updated feed as a decision checkpoint rather than a surprise.',
  },
  '69b52f0660f9e6d7a4183327': {
    title: 'Red Dead Redemption 2',
    summary:
      'Red Dead Redemption 2 is a classic price-tracking page because the game regularly appears in sales while still feeling premium enough that buyers want confidence before they commit. The key question is not whether it gets discounted at all, but whether the current offer is meaningfully better than the recent average. This page turns that decision into something you can scan quickly without losing the broader context.',
    whyTrack:
      'Track this title if you want a large, story-driven game and you care about the difference between a routine discount and a genuinely strong deal. Long-tail catalog hits often rotate through sales in predictable cycles, and those cycles can be more important than the exact percentage off in the current promo.',
    bestTime:
      'The strongest buying moment is often when the game appears in a wide seasonal sale and the discount lines up across more than one platform. If one storefront is clearly ahead of the others, that can be a good sign that the market is already moving downward. If all stores are still clustered near the same price, waiting usually gives you more leverage.',
    platformInsight:
      'Steam is often the easiest place to compare long-term patterns, Epic can occasionally match with a short promotion, and Xbox can be attractive for players staying inside the console ecosystem. The important part is not just the cheapest number, but whether the discount is persistent enough to feel like a real floor rather than a temporary blip.',
    priceFallback:
      'If the current feed is blank or slow, the page still gives you the context needed to judge whether a listed price is reasonable. Check back after the next update and compare the new number against the recent trend instead of buying on a single glance.',
  },
  '69b52f0660f9e6d7a4183326': {
    title: 'Hogwarts Legacy',
    summary:
      'Hogwarts Legacy is a useful comparison page because many buyers look at platform performance, edition value, and sale timing together. The game has broad mainstream appeal, which means the price can move in response to both general store events and larger franchise moments. This page gives you enough written context to decide whether the current price is close to the floor or whether you should wait for a stronger promotion.',
    whyTrack:
      'Track this title if you want a newer premium game and you are trying to avoid paying early-adopter pricing after the biggest launch wave has passed. Games with wide audience appeal often settle into a more stable discount pattern once the main release buzz cools down. That makes the page most valuable when you are trying to separate a normal sale from a genuinely good buy.',
    bestTime:
      'The best time to buy is usually during major storefront sales or when a platform-specific promotion briefly undercuts the others. If the current price is still close to the recent average, waiting can save money without much downside. If the game has already fallen near a recent low, buying now may be the better choice because another drop may take longer to appear.',
    platformInsight:
      'Steam tends to be the easiest place to judge price history, Epic can be competitive when promotions are active, and Xbox may be the right choice if that is where you actually plan to play. Comparing all three stores matters because the best value is not always the absolute lowest price; sometimes it is the version and platform combination that aligns with your library.',
    priceFallback:
      'If the live data does not load, the page still gives you enough context to avoid a blind purchase. Return after the next refresh, compare the current offer with the last recorded pattern, and buy only when the price feels clearly ahead of the recent trend.',
  },
}

function buildGenericCopy(title, description, id) {
  const baseTitle = title || `Game #${id}`
  const intro = description
    ? `${description} This page adds a buying context layer on top of the raw number, so you can decide whether the current price is close to a real floor or just a temporary promotion. The goal is simple: give you enough text, history, and store comparison context to make a confident decision without waiting for a data-heavy widget to finish loading.`
    : `${baseTitle} deserves more than a thin price snapshot. This page combines a plain-language summary, a current price comparison, and recent movement context so you can judge whether the live offer is worth taking now or whether it makes more sense to wait for the next sale cycle.`

  return {
    title: baseTitle,
    summary: intro,
    whyTrack:
      `Track ${baseTitle} when you want a clearer sense of value over time instead of relying on one store listing. Games with active demand or frequent promotions can look expensive at first glance, then become compelling once you compare them against their recent history. That is why a content-first page is useful even before the price feed finishes updating.`,
    bestTime:
      `The best time to buy ${baseTitle} is usually when the current offer lines up with a broader platform sale or when a recent discount pattern starts repeating. If the difference between stores is small, waiting for the next refresh is often safe. If one storefront is clearly ahead, that is a stronger signal that the deal is actually worth taking.`,
    platformInsight:
      `Comparing Steam, Epic Games, and Xbox helps you avoid treating one store as the whole market. Some titles move faster on one platform than another, and some sales are tied to platform-specific events. When live data is missing, this explanation still gives you a useful framework instead of a blank screen.`,
    priceFallback:
      `If live price data is unavailable right now, the page still explains the game and why its price matters. Refresh after the next update and compare the new snapshot with the short history pattern before deciding to buy.`,
  }
}

export function getGameEditorialCopy({ id, title, description }) {
  const curated = GAME_COPY_BY_ID[id]
  const fallback = buildGenericCopy(title, description, id)

  if (!curated) return fallback

  return {
    title: curated.title || fallback.title,
    summary: description ? `${description} ${curated.summary}` : curated.summary,
    whyTrack: curated.whyTrack,
    bestTime: curated.bestTime,
    platformInsight: curated.platformInsight,
    priceFallback: curated.priceFallback,
  }
}