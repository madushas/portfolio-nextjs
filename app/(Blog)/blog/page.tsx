"use client";

import PostThumbnail from "@/components/Blog/BlogThumbnail";
import FeaturedBlog from "@/components/Blog/FeaturedBlog";
import Fallback from "@/components/Blog/PostFallBack";
import Link from "next/link";
import { Chip } from "@/components/ui/chip";
import { urlForImage } from "@/sanity/lib/image";
import { Post, SanityPost } from "@/sanity/schema";
import { format } from "date-fns";
import { useSanityData } from "@/lib/hooks/useSanityData";
import { GetAllPostsSortByDate } from "@/sanity/queries";
import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

const SKELETON_KEYS = ["alpha","beta","gamma","delta","epsilon","zeta"] as const;

const BlogPage = () => {
  const { data: postsData, error, isLoading } = useSanityData<SanityPost[]>(GetAllPostsSortByDate);
  const params = useSearchParams();
  const router = useRouter();
  const activeCategory = params.get("cat") || "all";

  const blogs: Post[] = (postsData ?? []).map((post) => ({
    ...post,
    publishedAt: format(new Date(post.publishedAt), "MMMM dd, yyyy"),
    imageURL: urlForImage(post.mainImage),
    author: post.author?.name ?? "",
    slug: post.slug,
    categories: post.categories,
  }));

  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach(b => b.categories?.forEach((c: any) => c?.title && set.add(c.title)));
    const compare = (a: string, b: string) => String.prototype.localeCompare.call(a, b);
    return Array.from(set).sort(compare);
  }, [blogs]);

  const filtered = activeCategory === "all" ? blogs : blogs.filter(b => b.categories?.some((c: any) => c?.title === activeCategory));

  const changeCategory = (cat: string) => {
    const sp = new URLSearchParams(params.toString());
    if (cat === "all") sp.delete("cat"); else sp.set("cat", cat);
    router.replace(`/blog?${sp.toString()}`, { scroll: false });
  };

  if (error) console.error("Failed to fetch blog posts:", error);

  return (
    <div className="container px-4 pb-[var(--sp-10)] pt-[var(--sp-9)]">
      <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
        <h1 className="font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl">Writing & Notes</h1>
        <p className="mx-auto mt-4 max-w-prose text-sm text-muted-foreground md:text-base">
          Long-form explorations, architecture decisions, and pragmatic lessons learned building resilient systems & developer experience tooling.
        </p>
      </header>
      <section aria-labelledby="featured-heading" className="mb-[var(--sp-9)]">
        <h2 id="featured-heading" className="sr-only">Featured</h2>
        <FeaturedBlog blogs={blogs.slice(0, 3)} loading={isLoading} />
      </section>
      <section aria-labelledby="recent-heading" className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="recent-heading" className="font-semibold tracking-tight text-xl md:text-2xl">Recent Posts</h2>
            <p className="mt-1 text-sm text-muted-foreground hidden md:block">Fresh additions in reverse‑chronological order.</p>
          </div>
          <Link href="/blog" className="text-xs font-medium text-foreground underline underline-offset-4 md:text-sm">All posts</Link>
        </div>
        {/* Category filter chips */}
        <div className="relative -mx-4 overflow-x-auto px-4 pb-2">
          <ul className="flex w-max gap-1.5 text-xs md:text-sm">
            {["all", ...categories].map(cat => {
              const active = cat === activeCategory;
              return (
                <li key={cat}>
                  <Chip
                    asChild
                    size="sm"
                    variant={active ? "primary" : "outline"}
                    className="cursor-pointer px-3 py-1 uppercase"
                  >
                    <button onClick={() => changeCategory(cat)} className="outline-none">
                      {cat === 'all' ? 'All' : cat}
                    </button>
                  </Chip>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {isLoading && blogs.length === 0 && (
            SKELETON_KEYS.map(token => (
              <div key={`skeleton-${token}`} className="animate-pulse rounded-[var(--r-2)] border border-border/50 bg-card p-4">
                <div className="mb-3 aspect-[4/3] w-full rounded-md bg-muted" />
                <div className="mb-2 h-4 w-3/4 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
              </div>
            ))
          )}
          {!isLoading && filtered.length > 3 && (
            filtered.slice(3).map(blog => (
              <PostThumbnail key={blog.slug.current} type="normal" post={blog} className="h-full" />
            ))
          )}
          {!isLoading && filtered.length <= 3 && (
            <div className="flex min-h-[240px] items-center justify-center rounded-[var(--r-2)] border border-border/50 bg-card px-4 py-16">
              <Fallback isLoading={isLoading} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
