import Image from "next/image";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { POSTS, type Post } from "@/lib/blog";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";

function Meta({ post, className }: { post: Post; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 text-[13px] text-muted", className)}>
      <span className="rounded-chip bg-paper px-2.5 py-0.5 font-medium text-ink-soft">{post.category}</span>
      <span>{post.date}</span>
      <span aria-hidden="true">·</span>
      <span>{post.read}</span>
    </p>
  );
}

/** A post card: photo block, then the words in a white block 4px below. The whole card is the link. */
function PostCard({ post, base, featured = false }: { post: Post; base: string; featured?: boolean }) {
  return (
    <a href={`${base}/blog/${post.slug}`} className={cn("group/post grid h-full gap-[4px]", featured && "lg:grid-cols-[1.3fr_1fr]")}>
      <div className={cn("relative overflow-hidden rounded-card bg-plum", featured ? "min-h-[300px] lg:min-h-[440px]" : "aspect-[4/3]")}>
        <Image
          src={post.image}
          alt={post.alt}
          fill
          sizes={featured ? "(min-width: 1024px) 620px, 100vw" : "(min-width: 1024px) 360px, 100vw"}
          className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out-expo)] group-hover/post:scale-[1.04]"
          style={{ objectPosition: post.position }}
        />
      </div>
      <div className={cn("flex flex-col rounded-card bg-paper p-6 transition-colors duration-[300ms] ease-out group-hover/post:bg-white", featured && "justify-between gap-10 sm:p-8")}>
        <Meta post={post} />
        <div className={featured ? "" : "mt-4"}>
          <h2 className={cn("font-medium tracking-[-0.025em]", featured ? "t-h2" : "text-[20px] leading-[1.2]")}>{post.title}</h2>
          <p className={cn("mt-3 text-ink-soft", featured ? "t-body max-w-[42ch]" : "text-[14px] leading-[1.5]")}>{post.dek}</p>
        </div>
      </div>
    </a>
  );
}

export function BlogIndex({ base }: { base: string }) {
  const [featured, ...rest] = POSTS;
  return (
    <section className="pt-[clamp(24px,5vh,56px)]">
      <div className="container">
        <Reveal>
          <h1 className="t-h1">Blog</h1>
          <p className="t-body mt-4 max-w-[48ch] text-ink-soft">Notes on moving things through relationships, and on getting more from {BRAND.name}.</p>
        </Reveal>
        <Reveal className="mt-10">
          <PostCard post={featured} base={base} featured />
        </Reveal>
        <RevealGroup className="mt-4 grid gap-4 sm:gap-2 md:grid-cols-3">
          {rest.map((p) => (
            <RevealItem key={p.slug} className="flex">
              <PostCard post={p} base={base} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export function BlogPost({ post, base }: { post: Post; base: string }) {
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <>
      <article className="pt-[clamp(24px,5vh,56px)]">
        <div className="container">
          <a href={`${base}/blog`} className="inline-flex items-center gap-1.5 text-[14px] text-ink-soft transition-colors duration-[200ms] hover:text-ink">
            <ArrowLeft size={14} /> Blog
          </a>
          <Reveal className="mx-auto mt-8 max-w-[760px]">
            <Meta post={post} />
            <h1 className="t-h1 mt-5">{post.title}</h1>
            <p className="t-statement mt-5 text-ink-soft">{post.dek}</p>
          </Reveal>
          <Reveal delay={0.08} className="relative mt-10 aspect-[16/9] overflow-hidden rounded-card bg-plum sm:aspect-[21/9]">
            <Image src={post.image} alt={post.alt} fill priority sizes="(min-width: 1080px) 1080px, 100vw" className="object-cover" style={{ objectPosition: post.position }} />
          </Reveal>
          <div className="mx-auto mt-12 max-w-[680px]">
            {post.body.map((b, i) => (
              <div key={i} className={i ? "mt-8" : ""}>
                {b.h && <h2 className="text-[24px] font-medium tracking-[-0.02em]">{b.h}</h2>}
                <p className={cn("text-[18px] leading-[1.65] text-ink-soft", b.h && "mt-3")}>{b.p}</p>
              </div>
            ))}
            <p className="mt-12 border-t border-line pt-6 text-[14px] text-muted">The {BRAND.name} team</p>
          </div>
        </div>
      </article>

      <section className="section-gap">
        <div className="container">
          <h2 className="t-h2">More from the blog</h2>
          <RevealGroup className="mt-8 grid gap-4 sm:gap-2 md:grid-cols-3">
            {more.map((p) => (
              <RevealItem key={p.slug} className="flex">
                <PostCard post={p} base={base} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
