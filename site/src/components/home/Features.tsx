import Image from "next/image";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";

type F = { title: string; body: string; poster: string; alt: string; position?: string };

const FEATURES: F[] = [
  { title: "Public profiles", body: "Your handle is how people find you. Your profile holds the listings, the history, and the work.", poster: "/images/guitar.jpg", alt: "Two vintage Gibson Les Paul guitars hanging on a wall", position: "50% 60%" },
  { title: "A feed uniquely your own", body: `No one sees everything on ${BRAND.name}. You see what you've earned access to.`, poster: "/images/car.jpg", alt: "A red 1967 Mustang Fastback", position: "40% 60%" },
  { title: "Widgets and sites", body: "Drop your listings on a site you already run. They update when you change them.", poster: "/images/shop.jpg", alt: "A bakery interior with glass display cases" },
  { title: "Cross-promotion", body: "Share someone else's listing with your people. They opt in. You both get the introduction.", poster: "/images/camera.jpg", alt: "A silver Leica M3 camera", position: "55% 50%" },
];

/** A feature tile. The photo holds the place of the product clip until it is captured. */
function Tile({ f, className, children }: { f: F; className?: string; children?: React.ReactNode }) {
  return (
    <figure className={cn("group/tile relative m-0 h-full min-h-[320px] overflow-hidden rounded-card bg-ink", className)}>
      <Image
        src={f.poster}
        alt={f.alt}
        fill
        sizes="(min-width: 768px) 360px, 100vw"
        className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover/tile:scale-[1.04]"
        style={{ objectPosition: f.position ?? "center" }}
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(35,30,60,0.88),rgba(35,30,60,0))]" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-paper">
        <h3 className="t-h3">{f.title}</h3>
        <p className="mt-1.5 max-w-[34ch] text-[13px] leading-[1.45] text-paper/75">{f.body}</p>
      </figcaption>
      {children}
    </figure>
  );
}

/**
 * The reference's gallery. The dark title sits as a tab cut into the corner of the first photo:
 * a 4px cream ring separates it, so the photo seems to wrap around it.
 */
export function Features() {
  return (
    <section id="features" className="scroll-mt-6 pt-14 sm:pt-16">
      <div className="container">
        <RevealGroup className="grid gap-[4px] md:h-[640px] md:grid-cols-3 md:grid-rows-2">
          <RevealItem className="md:row-span-2">
            <Tile f={FEATURES[0]}>
              <div className="absolute left-0 top-0 rounded-br-[30px] bg-cream pb-[4px] pr-[4px]">
                {/* Inverted corners where the tab meets the photo's edges */}
                <span aria-hidden="true" className="absolute left-full top-0 h-[26px] w-[26px] bg-[radial-gradient(circle_at_100%_100%,transparent_25.5px,var(--cream)_26px)]" />
                <span aria-hidden="true" className="absolute left-0 top-full h-[26px] w-[26px] bg-[radial-gradient(circle_at_100%_100%,transparent_25.5px,var(--cream)_26px)]" />
                <div className="flex min-h-[140px] w-[min(260px,62vw)] items-end rounded-[26px] bg-plum p-6 text-paper">
                  <h2 className="t-h2">What you get</h2>
                </div>
              </div>
            </Tile>
          </RevealItem>
          <RevealItem>
            <Tile f={FEATURES[1]} />
          </RevealItem>
          <RevealItem className="md:row-span-2">
            <Tile f={FEATURES[3]} />
          </RevealItem>
          <RevealItem>
            <Tile f={FEATURES[2]} />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
