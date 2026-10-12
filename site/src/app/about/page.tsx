import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { SiteShell } from "@/components/site/SiteShell";
import { basePath } from "@/lib/site";

export const metadata: Metadata = { title: "About ListLabs" };

export default function Page() {
  return (
    <SiteShell variant="a">
      <AboutPage base={basePath("a")} />
    </SiteShell>
  );
}
