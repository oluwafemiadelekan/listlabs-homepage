# ListLabs homepage: the brief, distilled

Written 2026-10-11 from the client brief, the brand guidelines and the client's rough concept.

## One sentence
A visitor should get what ListLabs does in a few seconds and claim a handle. Handle claims are the
only metric.

## What ListLabs is
- You list what you have and choose who sees it.
- To look for something you set a saved search that watches for it. You never list a want.
- Matching starts with people you already know. Not a want-ad board, not one big public catalog.
- The distinctive idea is the five visibility levels per listing:
  Private (people you invite), Unlisted (people with the link), Shared (members who follow you),
  Listed (members you don't know), Public (everyone, on every integrated platform).
- The brand's three pains: reach, the text bomb (saying it 50 times), no private middle ground.

## Audience
Dealers and brokers who move things through relationships: collectibles, classic and specialty cars,
small-business brokers. The homepage stays general. Audience pages come later. Do not name them in the hero.

## Page spine (working order)
1. Hero: eyebrow "Welcome to ListLabs", H1 "List what you have. Look for what you want.", short sub,
   handle field + "Claim your handle", helper "Free to join. First in, first found."
2. How it works: List it / Decide who sees it (five levels) / Promote it. Clip per step.
3. Try it: one field "I'm listing..." that only accepts a listing.
4. Uses: three status-quo cards (Instead of fifty DMs / a public auction / a teaser you can't take back),
   each with its visibility option and an audience link. Smaller fourth block for the saved search.
5. Features: Public profiles, A feed uniquely your own, Widgets and sites, Cross-promotion. Clip each.
6. Close: "You're either first, or last." Handle field and button.

Alternatives (show one only if it changes the design meaningfully):
- How it works first: short hero with no handle form, then the steps.
- Uses first: hero, uses cards, then how it works.

## What we decide
Layout and grid, hero composition, clip framing, card treatment, spacing rhythm, hover and motion,
and above all how the five visibility levels are shown visually. That one deserves the most care.

## Fixed
See CLAUDE.md "Fixed by the client". Copy, brand, nav, footer, one account button, clip placeholders.

## Brand in numbers
- Inter 900 hero (60px, lh 1.0, ls -1.5px), 700 H2 (36px), 700 H3 (20px), 600 eyebrow (12px uppercase
  +1.2px), 400 body (16px), caption 13px grey-500. JetBrains Mono for tokens only.
- Violet #8B5CF6, hover #7C3AED, light #A78BFA. Ink #111827. Gray 700/500/300/100/50.
- Radius 12px surfaces, 10px buttons. Border 1px rgba(17,24,39,.07). Shadow 0 1px 2px rgba(17,24,39,.05).
- Spacing scale 4 8 16 24 32 48 64. Max width 1040px (the concept uses this; we can widen).
- Icons: simple line, 1.5px stroke, single colour. Screenshots framed on dark.
- Motion per guide: 150 to 200ms ease-out. See CLAUDE.md for how Femi's fluid-motion rule layers on top.

## Still open on the client side
- Final company name and logo (provisional, keep swappable).
- Whether "Claim your handle" creates an account or joins a waitlist.
- Nav button label: "Claim your handle" or "Create an account".
- Final section order.

## Deliverables they asked for
1. Two or three concepts with the real copy, desktop and mobile.
2. After review, one refined design with components set up for a developer.
Figma preferred "unless agreed otherwise". The client sent an artifact, so HTML is the agreed medium.
Figma push remains possible later through the Figma connector if they ask.

## Source files not yet received
Homepage copy doc (Thesis A, five variants), section-order wireframes, brand messaging playbook,
Storybook access. Ask the client for the copy doc and playbook before the refined round.

## Tensions to raise with Femi
- Brand says motion 150 to 200ms "subtle and fast". Femi wants fluid, not fast. Resolution in CLAUDE.md.
- "Linear" animation feels robotic on UI. Use ease-out curves; keep linear for scroll-linked motion.
- The client's concept uses the brand's 1040px container and a stacked card grid. Fine, but it reads
  as a template. The visibility levels are shown as a plain list, which wastes the best idea on the page.
