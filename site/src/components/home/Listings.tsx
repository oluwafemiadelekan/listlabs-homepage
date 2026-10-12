import Image from "next/image";
import { Globe, LinkSimple, ListMagnifyingGlass, LockSimple, MapPin, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { VISIBILITY, type VisibilityKey } from "@/lib/brand";

const ICONS = { private: LockSimple, unlisted: LinkSimple, shared: UsersThree, listed: ListMagnifyingGlass, public: Globe };

type Example = {
  asset: string;
  price: string;
  title: string;
  location: string;
  image: string;
  alt: string;
  position?: string;
  stats?: [string, string][];
  visibility: VisibilityKey;
};

/*
  Example listings, taken from the client's own product screens (and the brand guide's Mustang),
  so the homepage shows what a listing looks like. Lister names are left off: the brief bans
  named example people on the homepage. Each card shows who can see it instead.
*/
const EXAMPLES: Example[] = [
  {
    asset: "Real estate",
    price: "$2.4M",
    title: "Riverbend, 24-unit multifamily, value-add",
    location: "Austin, TX",
    image: "/images/apartment.jpg",
    alt: "A mid-century apartment block with rows of balconies",
    position: "50% 35%",
    stats: [["Cap rate", "6.8%"], ["NOI", "$0.2M"]],
    visibility: "shared",
  },
  {
    asset: "Real estate",
    price: "$8.1M",
    title: "Cedar Industrial Park",
    location: "Denver, CO",
    image: "/images/warehouse.jpg",
    alt: "Warehouse aisles stacked with boxed goods on pallet racking",
    position: "50% 60%",
    stats: [["Cap rate", "7.2%"], ["NOI", "$0.6M"]],
    visibility: "listed",
  },
  {
    asset: "Vehicles",
    price: "$940K",
    title: "Fleet disposal, 18 tractor units",
    location: "Location not specified",
    image: "/images/truck.jpg",
    alt: "A blue tractor unit pulling two trailers on a mountain road",
    position: "45% 50%",
    visibility: "unlisted",
  },
  {
    asset: "Collectibles",
    price: "$68,500",
    title: "1967 Mustang Fastback",
    location: "Location not specified",
    image: "/images/car.jpg",
    alt: "A red 1967 Mustang Fastback in a showroom",
    position: "55% 60%",
    visibility: "private",
  },
];

function ListingCard({ l }: { l: Example }) {
  const v = VISIBILITY.find((x) => x.key === l.visibility)!;
  const Icon = ICONS[l.visibility];
  return (
    <article className="flex h-full w-full flex-col gap-[4px]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-plum">
        <Image src={l.image} alt={l.alt} fill sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw" className="object-cover" style={{ objectPosition: l.position }} />
        <span className="absolute left-3 top-3 rounded-pill bg-paper px-3 py-1 text-[12px] font-medium text-ink">{l.asset}</span>
      </div>
      <div className="flex flex-1 flex-col rounded-card bg-paper p-5">
        <div className="text-[24px] font-medium leading-none tracking-[-0.03em] tnum">{l.price}</div>
        <h3 className="mt-2 text-[14px] leading-[1.35] text-ink-soft">{l.title}</h3>
        <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted">
          <MapPin size={14} />
          {l.location}
        </p>
        {l.stats && (
          <dl className="mt-4 grid grid-cols-2 gap-[4px]">
            {l.stats.map(([k, val]) => (
              <div key={k} className="rounded-[14px] bg-cream px-3 py-2.5">
                <dt className="text-[12px] text-muted">{k}</dt>
                <dd className="m-0 mt-0.5 text-[15px] font-medium tnum">{val}</dd>
              </div>
            ))}
          </dl>
        )}
        <p className="mt-auto flex items-start gap-2 pt-4 text-[13px] leading-[1.4]">
          <Icon size={15} weight="fill" className="mt-px shrink-0 text-violet" />
          <span>
            <span className="font-medium">{v.label}.</span> <span className="text-ink-soft">{v.who}</span>
          </span>
        </p>
      </div>
    </article>
  );
}

/** A row of example listings, each showing who can see it. Sits under the statement. */
export function Listings() {
  return (
    <section aria-label="Example listings" className="pt-16 sm:pt-20">
      <div className="container">
        <RevealGroup className="grid gap-[4px] sm:grid-cols-2 lg:grid-cols-4">
          {EXAMPLES.map((l) => (
            <RevealItem key={l.title} className="flex">
              <ListingCard l={l} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
