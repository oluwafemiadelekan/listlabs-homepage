import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { AudiencePage } from "@/components/pages/AudiencePage";
import { SiteShell } from "@/components/site/SiteShell";
import { AUDIENCES, AUDIENCE_KEYS, basePath, type AudienceKey } from "@/lib/site";

export function generateStaticParams() {
  return AUDIENCE_KEYS.map((audience) => ({ audience }));
}

const isAudience = (k: string): k is AudienceKey => k in AUDIENCES;

export async function generateMetadata({ params }: { params: Promise<{ audience: string }> }): Promise<Metadata> {
  const k = (await params).audience;
  return { title: isAudience(k) ? `${AUDIENCES[k].name} on ListLabs` : "ListLabs" };
}

async function Content({ params }: { params: Promise<{ audience: string }> }) {
  const k = (await params).audience;
  if (!isAudience(k)) notFound();
  return <AudiencePage audience={k} base={basePath("b")} />;
}

/** The shell renders straight away; only the part that reads the route param waits (Cache Components). */
export default function Page({ params }: { params: Promise<{ audience: string }> }) {
  return (
    <SiteShell variant="b">
      <Suspense fallback={<div className="min-h-[80vh]" />}>
        <Content params={params} />
      </Suspense>
    </SiteShell>
  );
}
