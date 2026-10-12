/*
  Placeholder posts in the brand voice: lead with the reader's pain, then the fix; plain words;
  no em dashes; no AI or compliance angles. All of it needs client sign-off before launch.
*/
export type Post = {
  slug: string;
  title: string;
  dek: string;
  category: "Dealmaking" | "Product";
  date: string;
  read: string;
  image: string;
  alt: string;
  position?: string;
  body: { h?: string; p: string }[];
};

export const POSTS: Post[] = [
  {
    slug: "the-best-deals-never-hit-a-public-catalog",
    title: "Why the best deals never hit a public catalog",
    dek: "The good stuff moves before anyone posts it. Here is why, and what that means for how you list.",
    category: "Dealmaking",
    date: "October 6, 2026",
    read: "4 min read",
    image: "/images/meeting.jpg",
    alt: "Two people shaking hands across a desk with papers on it",
    position: "50% 45%",
    body: [
      { p: "Ask any dealer where their best sale of the year came from. It almost never came from a public post. It came from a call, a text, a name someone passed along." },
      { h: "Public is a last resort", p: "Going public sets a price everyone can see and compare. It invites the tyre-kickers and tells your competitors what you have. For the right item, that costs more than it earns." },
      { h: "But private does not scale", p: "Keeping it in your phone works until it doesn't. You forget who asked. You send the same photos twelve times. The buyer who would have paid the most never hears about it." },
      { h: "The middle ground", p: "That gap is why ListLabs exists. You list once, then decide who sees it: the people you invite, the people with the link, the people who follow you, members you don't know yet, or everyone. Widen it when you are ready. Never before." },
    ],
  },
  {
    slug: "five-levels-of-who-sees-it",
    title: "Five levels of who sees it",
    dek: "Private, Unlisted, Shared, Listed, Public. What each one does, and when to reach for it.",
    category: "Product",
    date: "September 29, 2026",
    read: "3 min read",
    image: "/images/talk.jpg",
    alt: "Two women talking at a meeting table in front of a brick wall",
    position: "50% 50%",
    body: [
      { p: "Every listing has one setting that matters more than the rest: who can see it. There are five, and you can change it any time." },
      { h: "Private", p: "People you invite. Use it while you are still checking the numbers, or when only two or three buyers should know." },
      { h: "Unlisted", p: "People with the link. Nobody finds it by browsing. Send it to the people who can know, and widen it later if you want." },
      { h: "Shared", p: "Members who follow you. Your regulars see new stock without you texting each one." },
      { h: "Listed and Public", p: "Listed reaches members you don't know yet. Public goes everywhere, on every platform we integrate with. Most listings never need it, and that is the point." },
    ],
  },
  {
    slug: "say-it-once",
    title: "Say it once: the end of the text bomb",
    dek: "New stock should not mean fifty identical messages. One listing, shared, does the job.",
    category: "Dealmaking",
    date: "September 22, 2026",
    read: "3 min read",
    image: "/images/diner.jpg",
    alt: "Two people talking over a meal at a restaurant table",
    position: "50% 45%",
    body: [
      { p: "You know the routine. Something new comes in, and you spend the evening sending the same photos and the same paragraph to everyone who might care." },
      { h: "What it costs", p: "Hours you do not get back. Messages that get buried. And the quiet worry that you forgot the one person who would have bought it on the spot." },
      { h: "What to do instead", p: "Write the listing once. Set it to Shared. The people who follow you see it in their feed, and anyone you trust can pass it on to their people. You answer the ones who reply." },
    ],
  },
  {
    slug: "let-the-deal-find-you",
    title: "Let the deal find you",
    dek: "Looking is not a want-ad. It is a saved search that watches your world for you.",
    category: "Product",
    date: "September 15, 2026",
    read: "2 min read",
    image: "/images/notify.jpg",
    alt: "A man reading his phone beside a cup of coffee",
    position: "50% 50%",
    body: [
      { p: "Posting what you want tells everyone what you will pay for. Asking around takes days and depends on who you happen to call." },
      { h: "Set it and forget it", p: "A saved search watches for what you describe. When something that matches shows up among the people and listings you can see, you hear about it." },
      { h: "Matching starts close", p: "Saved searches look at your own network first, then wider as listings open up. The first person to hear about a deal is usually the one who closes it." },
    ],
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);
