import type { VisibilityKey } from "@/lib/brand";
import type { AudienceKey } from "@/lib/site";

export type Example = {
  asset: string;
  price: string;
  title: string;
  location: string;
  image: string;
  alt: string;
  position?: string;
  stats?: [string, string][];
  about?: string;
  visibility: VisibilityKey;
};

export type CatalogItem = Example & {
  id: string;
  category: string;
  /** Sort key in dollars. */
  value: number;
  /** Days since listed, for "Newest". */
  age: number;
};

/*
  Example listings for the audience pages. A visitor without a handle only sees Public listings and,
  once a member, Listed ones; Shared and Unlisted never appear here. That is why each page ends
  with a count of listings it cannot show. Northgate HVAC comes from the client's product screens;
  the rest are illustrative and need client sign-off.
*/
export const CATALOG: Record<AudienceKey, CatalogItem[]> = {
  collectibles: [
    { id: "dress-watch", asset: "Collectibles", category: "Watches", price: "$18,500", value: 18500, age: 2, title: "1960s dress watch, serviced", location: "Chicago, IL", image: "/images/watch.jpg", alt: "A vintage dress watch on a leather strap resting on its box", position: "45% 45%", stats: [["Era", "1960s"], ["Service", "2026"]], about: "Original dial, recent full service, box and papers.", visibility: "public" },
    { id: "bullion-coins", asset: "Collectibles", category: "Coins", price: "$9,400", value: 9400, age: 5, title: "Gold and silver coins, 14 pieces", location: "Dallas, TX", image: "/images/coins.jpg", alt: "Gold and silver coins on a dark surface", stats: [["Pieces", "14"], ["Metal", "Gold, silver"]], about: "Mixed bullion and proof coins, all in capsules.", visibility: "listed" },
    { id: "silver-age-comics", asset: "Collectibles", category: "Comics", price: "$6,200", value: 6200, age: 1, title: "Silver Age comics, 40 issues", location: "Portland, OR", image: "/images/comics.jpg", alt: "A spread of vintage superhero comic books", stats: [["Issues", "40"], ["Graded", "12"]], about: "Forty issues from one owner, twelve graded.", visibility: "public" },
    { id: "pen-set", asset: "Collectibles", category: "Writing", price: "$2,850", value: 2850, age: 9, title: "Fountain pen set, three pens", location: "Boston, MA", image: "/images/pens.jpg", alt: "Three fountain pens resting on the edge of a white box", position: "50% 50%", stats: [["Pens", "3"], ["Nibs", "18k gold"]], about: "Three pens, all inked and tested, original box.", visibility: "public" },
    { id: "lp-collection", asset: "Collectibles", category: "Records", price: "$42,000", value: 42000, age: 3, title: "1,200 LP collection", location: "Nashville, TN", image: "/images/records.jpg", alt: "A hand pulling a record from shelves of vinyl", position: "40% 50%", stats: [["LPs", "1,200"], ["Grade", "VG+"]], about: "Jazz and soul first pressings, catalogued.", visibility: "listed" },
    { id: "les-paul-pair", asset: "Collectibles", category: "Instruments", price: "$310,000", value: 310000, age: 6, title: "1959 and 1960 Les Paul Standard pair", location: "Austin, TX", image: "/images/guitar.jpg", alt: "Two vintage sunburst electric guitars hanging on a wall", position: "50% 60%", stats: [["Years", "1959, 1960"], ["Pieces", "2"]], about: "Sold as a pair, original cases.", visibility: "listed" },
  ],
  "classic-cars": [
    { id: "porsche-911", asset: "Vehicles", category: "Coupe", price: "$142,000", value: 142000, age: 2, title: "1973 911 coupe", location: "Scottsdale, AZ", image: "/images/porsche.jpg", alt: "A red classic coupe on grey asphalt", position: "50% 60%", stats: [["Miles", "61,000"], ["Engine", "2.4L flat-six"]], about: "Matching numbers, documented history.", visibility: "public" },
    { id: "roadster-190sl", asset: "Vehicles", category: "Roadster", price: "$96,000", value: 96000, age: 4, title: "1959 190SL roadster", location: "Miami, FL", image: "/images/mercedes.jpg", alt: "A dark blue classic roadster parked on a brick road", position: "50% 55%", stats: [["Miles", "48,000"], ["Top", "Soft and hard"]], about: "Older restoration, driven monthly.", visibility: "listed" },
    { id: "fj40", asset: "Vehicles", category: "4x4", price: "$74,000", value: 74000, age: 1, title: "1978 FJ40 Land Cruiser", location: "Denver, CO", image: "/images/landcruiser.jpg", alt: "A cream vintage Land Cruiser parked outside a brick building", position: "50% 60%", stats: [["Miles", "92,000"], ["Drive", "4x4"]], about: "Frame-off restoration, rust free.", visibility: "public" },
    { id: "stingray", asset: "Vehicles", category: "Coupe", price: "$58,500", value: 58500, age: 7, title: "1974 Corvette Stingray", location: "Detroit, MI", image: "/images/corvette.jpg", alt: "A yellow classic sports car in front of a concrete building", position: "50% 65%", stats: [["Miles", "70,000"], ["Engine", "350 V8"]], about: "Two owners, numbers matching.", visibility: "public" },
    { id: "e-type", asset: "Vehicles", category: "Coupe", price: "$185,000", value: 185000, age: 3, title: "1963 E-Type coupe", location: "Greenwich, CT", image: "/images/jaguar.jpg", alt: "A silver classic coupe on a dusty country road", position: "50% 55%", stats: [["Miles", "39,000"], ["Engine", "3.8L"]], about: "Concours prepared, full records.", visibility: "listed" },
    { id: "bel-air-set", asset: "Vehicles", category: "Set", price: "$210,000", value: 210000, age: 10, title: "Three Bel Airs, sold as a set", location: "Fresno, CA", image: "/images/carshow.jpg", alt: "Three restored classic cars with their hoods up at a car show", position: "40% 55%", stats: [["Cars", "3"], ["Years", "1955 to 1957"]], about: "A matched trio from one collection.", visibility: "listed" },
  ],
  "business-brokers": [
    { id: "northgate-hvac", asset: "Business", category: "Trades", price: "$3.3M", value: 3300000, age: 2, title: "Northgate HVAC, 22-year regional contractor", location: "Ohio", image: "/images/hvac.jpg", alt: "A technician working on a building's heating system", position: "50% 35%", stats: [["Revenue", "$7.9M"], ["Growth", "9%"]], about: "Owner retiring. 60% recurring service revenue, 31 employees.", visibility: "listed" },
    { id: "machine-shop", asset: "Business", category: "Manufacturing", price: "$1.9M", value: 1900000, age: 5, title: "Precision machine shop", location: "Grand Rapids, MI", image: "/images/machineshop.jpg", alt: "An industrial workshop full of machinery", stats: [["Revenue", "$4.2M"], ["Staff", "14"]], about: "Aerospace and medical customers, equipment owned.", visibility: "public" },
    { id: "landscaping", asset: "Business", category: "Trades", price: "$1.2M", value: 1200000, age: 8, title: "Commercial landscaping company", location: "Charlotte, NC", image: "/images/landscaping.jpg", alt: "A landscaping crew in hi-vis jackets beside an excavator and truck", stats: [["Revenue", "$3.1M"], ["Crews", "6"]], about: "Multi-year contracts with office parks.", visibility: "listed" },
    { id: "dental", asset: "Business", category: "Healthcare", price: "$2.6M", value: 2600000, age: 1, title: "Dental practice, six operatories", location: "Tampa, FL", image: "/images/dental.jpg", alt: "A bright dental treatment room", stats: [["Revenue", "$2.9M"], ["Patients", "4,100"]], about: "Doctor willing to stay through transition.", visibility: "listed" },
    { id: "cafe", asset: "Business", category: "Food", price: "$420K", value: 420000, age: 4, title: "Neighbourhood café, two sites", location: "Seattle, WA", image: "/images/cafe.jpg", alt: "A café counter with a coffee machine and a ticket display", stats: [["Revenue", "$1.1M"], ["Sites", "2"]], about: "Leases renewed to 2031.", visibility: "public" },
    { id: "bakery", asset: "Business", category: "Food", price: "$780K", value: 780000, age: 6, title: "Bakery and café, 11 years trading", location: "Savannah, GA", image: "/images/shop.jpg", alt: "The inside of a bakery with glass display cases of pastries", stats: [["Revenue", "$1.6M"], ["Staff", "18"]], about: "Wholesale accounts plus retail counter.", visibility: "listed" },
  ],
};
