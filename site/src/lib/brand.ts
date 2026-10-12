/**
 * The only place the provisional name lives. Rename in one pass.
 * The mark is in components/brand/Logo.tsx, also a single swap.
 */
export const BRAND = {
  name: "ListLabs",
  handleDomain: "listlabs.com",
  ctaPrimary: "Claim your handle",
  ctaNav: "Claim your handle",
  helper: "Free to join. First in, first found.",
} as const;

/** The five visibility levels, copy from the client draft, word for word. */
export const VISIBILITY = [
  { key: "private", label: "Private", who: "People you invite." },
  { key: "unlisted", label: "Unlisted", who: "People with the link." },
  { key: "shared", label: "Shared", who: "Members that follow you." },
  { key: "listed", label: "Listed", who: "Members you don't know." },
  { key: "public", label: "Public", who: "Everyone, on every platform we integrate with." },
] as const;

export type VisibilityKey = (typeof VISIBILITY)[number]["key"];
