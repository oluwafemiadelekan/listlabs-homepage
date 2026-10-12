# ListLabs homepage

A homepage design for ListLabs (working name), built in Next.js. The visitor should understand in a few seconds
that you list what you have and choose who sees it, then claim a handle.

## Run it

```sh
cd site
npm install
npm run dev -- -p 5260
```

Open http://localhost:5260.

## What is in here

| Path | What it is |
| --- | --- |
| `site/` | The Next.js 16 site: Tailwind v4, Motion (Framer Motion), Phosphor Icons, Lenis smooth scroll. |
| `CLAUDE.md` | Working rules for Claude Code: brief, design rules, motion rules, stack notes. Read first. |
| `brief-distilled.md` | The client brief, distilled, with open questions. |
| `PRODUCT.md` | Product truth: what ListLabs is, who it is for, what is still undecided. |
| `DESIGN.md` | The current design system: palette, type, shapes, components, rules. |
| `brand-guidelines.html` | The brand guide as built: palette, type, buttons, fields, tiles, imagery, motion, do and don't. Open in a browser. |
| `reference/` | The client's original brand guide and rough concept (archived), plus notes on the visual references. |
| `.claude/skills/` | `frontend-design`, vendored under its Apache-2.0 licence. |
| `skills.json`, `scripts/` | The other design skills, pinned to their sources, with install scripts. |

## Design skills

The design was built with a set of Claude Code skills. One is vendored; the rest belong to their authors and
are installed from their own repositories:

```sh
sh scripts/install-skills.sh
```

On Windows:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/install-skills.ps1
```

They install into this project, not globally. `skills.json` lists each skill, its source and what it is for.

## Open questions with the client

- The final company name and logo. Both are single swaps: `site/src/lib/brand.ts` and `site/src/components/brand/Logo.tsx`.
- Whether "Claim your handle" creates an account or joins a waitlist.
- The section order. This build follows the design reference: hero, uses, features, how it works, try it, close.
- The colour direction: the brief fixes violet with a dark hero. This build keeps violet as plum, lavender and a
  muted violet mark on a pale page.
- Product clips are not captured yet. Photos stand in for them.

## Image credits

The photos in `site/public/images` are stand-ins from Wikimedia Commons. Credits and licences are in
`site/public/images/CREDITS.md`. Replace them with client photography before launch.
