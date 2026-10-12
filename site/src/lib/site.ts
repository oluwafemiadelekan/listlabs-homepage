export type Variant = "a" | "b";

/** Version A lives at the root, Version B under /b. Every internal link goes through this. */
export const basePath = (v: Variant) => (v === "b" ? "/b" : "");

export const variantFromPath = (pathname: string | null): Variant =>
  pathname === "/b" || pathname?.startsWith("/b/") ? "b" : "a";

export type AudienceKey = "collectibles" | "classic-cars" | "business-brokers";

/**
 * The three audience pages. "status" and "body" are the client's use-card copy, word for word.
 * "lead" is ours and needs client approval.
 */
export const AUDIENCES: Record<
  AudienceKey,
  { name: string; status: string; body: string; option: "Shared" | "Unlisted"; lead: string; hidden: number; hiddenAs: string }
> = {
  collectibles: {
    name: "Collectibles",
    status: "Instead of fifty DMs",
    body: "New stock used to mean the same text, sent again and again. One listing. Shared. The people who follow you see it. You stop repeating yourself.",
    option: "Shared",
    lead: "Watches, coins, comics, records and instruments, listed by the dealers who hold them.",
    hidden: 37,
    hiddenAs: "shared with dealers' followers",
  },
  "classic-cars": {
    name: "Classic cars",
    status: "Instead of a public auction",
    body: "Going public puts the car in a pile with everyone else's price. Unlisted. Send the link to the people who can know. Widen it later if you want.",
    option: "Unlisted",
    lead: "Coupes, roadsters and 4x4s from specialty dealers, most of them never shown to the open market.",
    hidden: 24,
    hiddenAs: "sent by link to people who can know",
  },
  "business-brokers": {
    name: "Business brokers",
    status: "Instead of a teaser you can't take back",
    body: "Once a one-pager is forwarded, you don't control who has it. Unlisted. Send the link to the buyers who can know.",
    option: "Unlisted",
    lead: "Owner-operated businesses from brokers who decide, buyer by buyer, who sees the numbers.",
    hidden: 19,
    hiddenAs: "sent by link to qualified buyers",
  },
};

export const AUDIENCE_KEYS = Object.keys(AUDIENCES) as AudienceKey[];
