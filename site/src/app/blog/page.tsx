import type { Metadata } from "next";
import { BlogIndex } from "@/components/pages/BlogPages";
import { SiteShell } from "@/components/site/SiteShell";
import { basePath } from "@/lib/site";

export const metadata: Metadata = { title: "ListLabs blog" };

export default function Page() {
  return (
    <SiteShell variant="a">
      <BlogIndex base={basePath("a")} />
    </SiteShell>
  );
}
