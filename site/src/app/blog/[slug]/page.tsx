import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BlogPost } from "@/components/pages/BlogPages";
import { SiteShell } from "@/components/site/SiteShell";
import { POSTS, postBySlug } from "@/lib/blog";
import { basePath } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = postBySlug((await params).slug);
  return { title: post ? post.title : "ListLabs blog" };
}

async function Content({ params }: { params: Promise<{ slug: string }> }) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();
  return <BlogPost post={post} base={basePath("a")} />;
}

/** The shell renders straight away; only the part that reads the route param waits (Cache Components). */
export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <SiteShell variant="a">
      <Suspense fallback={<div className="min-h-[80vh]" />}>
        <Content params={params} />
      </Suspense>
    </SiteShell>
  );
}
