---
name: ListLabs homepage
description: Pale grey paper, plum and lavender blocks, a muted violet mark. Rounded cells 4px apart. Inter at medium weight.
colors:
  page: "#F3F3F6"
  lavender: "#E3E1F1"
  lavender-2: "#D6D3EA"
  white: "#FFFFFF"
  ink: "#1F1C2E"
  ink-2: "#2D2845"
  ink-soft: "#4D4962"
  muted: "#878399"
  faint: "#B5B2C3"
  plum: "#2C2649"
  plum-deep: "#231E3C"
  violet: "#6F5FD0"
  violet-deep: "#5A4BB8"
  violet-soft: "#E7E4F8"
  line: "rgba(31,28,46,0.10)"
  line-strong: "rgba(31,28,46,0.18)"
typography:
  h1:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1.4rem + 2.7vw, 3.6rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  statement:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.55rem, 1rem + 1.7vw, 2.4rem)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  h2:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 1.2rem + 1.9vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  h3:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  small:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  cell: "clamp(14px, 2.4vw, 34px)"
  card: "26px"
  pill: "999px"
spacing:
  tile-gap: "4px"
  gutter: "24px"
  container: "1080px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    height: "44px"
  button-primary-circle:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
  capsule:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px"
  tile-dark:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.white}"
    rounded: "{rounded.card}"
    padding: "20px"
  tile-light:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "20px"
---

# ListLabs homepage design system

## Overview

The layout follows a photographer landing page closely: a quiet header, a two-line headline beside the handle claim,
a photo strip cut into rounded cells, a centred statement with one highlighted phrase, a bento, a photo gallery,
and numbered steps with a floating tile. The palette follows the BloomFi reference: a pale cool grey page,
plum for weight, lavender for softness, and a muted violet used only as a mark. See `reference/design-references.md`.

Tokens: `site/src/app/globals.css`. Sections: `site/src/components/home`. Shared UI: `site/src/components/ui`.

## Colors

- Page is pale grey `#F3F3F6`. It also shows through every gap in the photo strip.
- Text and buttons are plum-black `#1F1C2E`.
- Dark blocks are plum `#2C2649`: the use tiles, the gallery title tab, the closing card, the visibility tile.
- Light blocks are lavender `#E3E1F1`, sometimes with a faint lavender wash.
- Muted violet `#6F5FD0` is a mark only: the @ in the handle field, the outline around "you choose who sees it",
  the binoculars mark, the "you" dot in the visibility field. Never a block, never a heading.
- Text never sits on a photo. Photos and words are separate blocks, 4px apart.

## Typography

Inter only, medium weight (500) for headings, sized like the reference: confident, not shouting.
H1 up to 3.6rem on two lines. The statement is up to 2.4rem, centred, with one phrase in an outlined pill
and one small inline icon mark. Body 16px, small 14px, tile copy 13px.

## Layout

Container 1080px plus 24px gutters. Order: header, hero (headline, claim field under it, photo strip), statement,
your listings, uses bento, features gallery, how it works, try it, close, footer.

- The header and hero fill exactly one screen (`min-h: calc(100svh - 80px)`); the photo strip grows to fill what is left.
- Every section after the hero is separated by one gap, `.section-gap`: `clamp(96px, 7vw + 48px, 152px)`, about 150px on desktop.
  Generous, Airbnb-like. Never mix section paddings.
- Tiles inside a section sit 4px apart.

## Shapes

- Photo strip: desktop is a 14-unit grid, three rows of cells. Each photo is one continuous image cut into rounded cells,
  alternating squares (2x2 units) and wide rectangles (4x2 units). Cells are 4px apart. On mobile the middle photo
  alone fills the rest of the screen, cut wide / square, square / wide. The cut is drawn with a
  page-coloured ring around each cell, so the photo itself is never distorted.
- Cards and tiles: 26px radius, 4px apart. Neighbouring tiles read as one cut-up shape.
- Gallery title: a plum tab cut into the corner of the first photo, with a 4px page-coloured ring and
  inverted corners where it meets the photo's edges.
- Controls are pills.

## Components

- Button: plum-black pill. With `arrow`, a white circle holds an up-right arrow that turns 45 degrees on hover.
- Capsule: white pill holding the field and its button; stacks on mobile. The handle field has a violet @.
- Use tile: whole tile is a link to its audience page. Visibility option at the top, title, copy, audience name at the bottom.
- Your listings: the example cards sit in a lavender frame titled "Your listings" with a count per visibility level,
  because only a lister's own view would show Private and Unlisted listings.
- Listing card: the whole card is a button. Modelled on the client's product card. Photo block with an asset-type pill, then a white block 4px below:
  price, title, location, up to two stats in page-grey cells, and the visibility level it uses (violet icon, level, who).
  No lister names (the brief bans named people on the homepage).
- Listing details: a dialog over a dimmed plum backdrop (a bottom sheet on mobile). Photo block, facts block,
  a "Who sees it" five-level selector you can change in place, and a claim block. Escape, the backdrop and the
  close button all dismiss it.
- Claim flow: a full-screen overlay opened by every claim button and form. Steps: handle (live availability check,
  suggestions when taken), email, six-digit code, "What do you move?" (optional), done. A live profile preview sits
  beside the steps on desktop. The "I'm listing" field opens it with the draft carried over. Escape closes it.
- Feature tile: photo block standing in for the product clip, and a plain white block 4px below with the title and one line.
  No overlay, no fade.
- Steps: numbered pill rows. A rounded tile floats beside the active row and glides between rows on a spring.
  Step two's tile is the visibility field: you at the centre, people lighting outward from Private to Public.

## Do's and Don'ts

- Do keep tiles 4px apart and radii large.
- Do make every arrow a real link. Don't add decorative arrows, icon circles or play buttons.
- Don't add eyebrows, tags or labels the client did not write.
- Don't use bright violet blocks, gradients for decoration, glows, or text over photos.
- Don't change the layout when asked to change colour.
