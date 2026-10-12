import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = { title: "ListLabs, version B" };

/** Version B: the client's original colours, tighter corners, buttons without arrows. */
export default function HomeB() {
  return <HomePage variant="b" />;
}
