# ListLabs homepage

Homepage design for ListLabs (working name), built as a Next.js site in `site/`.
The one metric is handle claims. The page must make a visitor understand, in seconds,
that you list what you have and choose who sees it.

## First thing in a new session

1. Install the design skills if `.agents/` or the skills below are missing:
   `sh scripts/install-skills.sh` (or `scripts/install-skills.ps1` on Windows). `frontend-design` is already in `.claude/skills`.
2. Read `brief-distilled.md`, `PRODUCT.md`, `DESIGN.md`, then open `brand-guidelines.html` in a browser.
3. Run the site: `cd site && npm install && npm run dev -- -p 5260`.

## Source files

- `brief-distilled.md`: the client brief, distilled, with open questions.
- `PRODUCT.md`: product truth (what ListLabs is, who it is for, what is undecided).
- `DESIGN.md`: the current design system. Tokens live in `site/src/app/globals.css`.
- `brand-guidelines.html`: the brand guide as built (v3.2): colour, type, buttons, fields, tiles, imagery, motion, rules. Open it in a browser.
- `reference/client-brand-guidelines-original.html`: the client's original guide, kept for voice and copy rules. Its visual rules are superseded.
- `reference/index-concept-from-client.html`: the client's rough concept, with the real copy for all three page orders.
- `reference/design-references.md`: the visual references the current design follows.

## Fixed by the client

- Copy is word for word from the client draft. Flag lines that do not fit; never rewrite them.
- Inter for all type. The client's colour is violet; we choose the shade (see DESIGN.md).
- One account button in the nav. The handle form appears in the hero and the close only.
- Nav: logo, How it works, Who it's for, About, Blog, account button. Footer: privacy, terms, social icons.
- Product clips are placeholders until captured. No stock dashboards or other companies' UI.
- The name and logo are provisional: `site/src/lib/brand.ts` and `site/src/components/brand/Logo.tsx` are the only places they live.
- No em dashes. No "Turn your network into deals" H1. No "Not another marketplace" headline. Never call ListLabs "a page".
  No named example people. No compliance or AI features.

## Keep the guides in sync

Any change to colour, type, buttons, fields, tiles or motion updates three places in the same commit:
`site/src/app/globals.css` (the tokens), `DESIGN.md` (the spec) and `brand-guidelines.html` (the visual guide,
including its "What changed" table). A guide that describes an older design is a bug.

## Design rules (from Femi's reviews)

- The layout follows the photographer reference closely and is frozen. Change colour or detail, not structure, unless asked.
- Palette after the BloomFi reference: pale cool grey page, plum for dark blocks, lavender for light blocks,
  muted violet only for small marks. Never a bright violet block.
- Nothing may look clickable unless it is. No decorative arrows, icon circles or play buttons.
- No extra tags, eyebrows or labels. A visitor should understand what they see without them.
- Tiles sit 4px apart with large radii so neighbouring shapes read as one cut-up form.
- Header plus hero fill exactly one screen. Every later section uses `.section-gap`; never mix paddings.
- Every claim button and form opens the claim overlay (`site/src/components/claim/ClaimFlow.tsx`).
- Listing cards are buttons that open the details overlay. Photos never carry text; words go in a block below.

## Motion rules

- Nothing instant. Every state change tweens, including hover and in-page anchor jumps.
- Hover, press, focus: about 160 to 260ms ease-out. Reveals and slides: 400 to 900ms, expo ease-out.
- Lenis smooth scroll, lerp 0.11, driven from Motion's frame loop. Anchors scroll through Lenis.
- Never ease-in. Linear only for scroll-linked progress. Transform and opacity by preference.
- Honour prefers-reduced-motion: keep fades, drop travel.

## Stack and code rules

- Next.js 16 (App Router, cacheComponents on), Tailwind v4, `motion` (Framer Motion), Phosphor Icons, Lenis.
- Read `site/AGENTS.md`: this Next.js version differs from older training data; docs are in `site/node_modules/next/dist/docs/`.
- Icons are Phosphor only. Server components import from `@phosphor-icons/react/dist/ssr`.
- Page sections: `site/src/components/home`. Shared UI: `site/src/components/ui`. Motion helpers: `site/src/components/motion`.
- Gotcha: Turbopack on Windows can miss edits to `globals.css`. After a token change, stop the dev server,
  delete `site/.next`, and start it again.

## Skills to reach for

- `impeccable` for direction, critique and polish. `frontend-design` for new UI.
- `emil-design-eng`, `apple-design`, `make-interfaces-feel-better` for detail and motion craft.
- `review-animations` and `fixing-motion-performance` before calling motion done.
- `fixing-accessibility` and `baseline-ui` as the final pass. `prototype` to explore variants of one piece.
