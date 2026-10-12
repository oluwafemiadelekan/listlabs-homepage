import { ArrowUpRight, LinkSimple, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const USES = [
  {
    title: "Instead of fifty DMs",
    body: "New stock used to mean the same text, sent again and again. One listing. Shared. The people who follow you see it. You stop repeating yourself.",
    option: "Shared",
    Icon: UsersThree,
    audience: "Collectibles",
  },
  {
    title: "Instead of a public auction",
    body: "Going public puts the car in a pile with everyone else's price. Unlisted. Send the link to the people who can know. Widen it later if you want.",
    option: "Unlisted",
    Icon: LinkSimple,
    audience: "Classic cars",
  },
  {
    title: "Instead of a teaser you can't take back",
    body: "Once a one-pager is forwarded, you don't control who has it. Unlisted. Send the link to the buyers who can know.",
    option: "Unlisted",
    Icon: LinkSimple,
    audience: "Business brokers",
  },
];

/**
 * The reference's bento: one sand tile holding the heading, then a 2x2 block.
 * Every tile sits 4px from its neighbours so the corners read as one cut-up shape.
 * Only the three use tiles are links (to their audience pages); nothing else pretends to be.
 */
export function Uses() {
  return (
    <section id="uses" className="section-gap scroll-mt-6">
      <div className="container">
        <RevealGroup className="grid gap-[4px] lg:grid-cols-2">
          <RevealItem className="flex min-h-[240px] flex-col justify-end rounded-card bg-[linear-gradient(140deg,var(--wash-from)_0%,var(--wash-to)_100%)] p-7 sm:p-8">
            <h2 className="t-h2 max-w-[11ch]">Same tool. Different jobs.</h2>
          </RevealItem>

          <div className="grid gap-[4px] sm:grid-cols-2">
            {USES.map((u) => (
              <RevealItem key={u.title} className="flex">
                <a
                  href="#uses"
                  aria-label={`${u.title}. For ${u.audience}`}
                  className="group/use flex w-full flex-col rounded-card bg-plum p-5 text-paper transition-colors duration-[420ms] ease-out hover:bg-plum-deep"
                >
                  <span className="inline-flex items-center gap-1.5 self-start text-[12px] font-medium text-paper/75">
                    <u.Icon size={13} weight="bold" />
                    {u.option}
                  </span>
                  <h3 className="mt-3 text-[18px] font-medium leading-[1.2] tracking-[-0.015em]">{u.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.45] text-paper/80">{u.body}</p>
                  <span className="mt-auto inline-flex items-center gap-1 self-start pt-5 text-[13px] font-medium">
                    {u.audience}
                    <ArrowUpRight
                      size={13}
                      weight="bold"
                      className="transition-transform duration-[420ms] ease-[var(--ease-out-expo)] group-hover/use:-translate-y-0.5 group-hover/use:translate-x-0.5"
                    />
                  </span>
                </a>
              </RevealItem>
            ))}
            <RevealItem className="flex">
              <div className="flex w-full flex-col rounded-card bg-sand p-5 text-ink">
                <h3 className="text-[18px] font-medium leading-[1.2] tracking-[-0.015em]">Instead of asking around</h3>
                <p className="mt-2 text-[13px] leading-[1.45] text-ink-soft">
                  You don&apos;t list what you want. You set a saved search. It watches. You hear about it when it shows up in your world. That is the look side. Same product.
                </p>
              </div>
            </RevealItem>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
