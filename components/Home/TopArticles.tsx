"use client";

import { HTMLProps } from "react";
import { format } from "date-fns";
import { useSanityData } from "@/lib/hooks/useSanityData";
import { GetTopPostsSortByDate } from "@/sanity/queries";
import { urlForImage } from "@/sanity/lib/image";
import { Post, SanityPost } from "@/sanity/schema";
import FeaturedBlog from "../Blog/FeaturedBlog";
import SectionContainer from "../shared/SectionContainer";
import Link from "next/link";

const TOP_ARTICLES_COUNT = 3;

export default function TopArticles(
  props: Readonly<HTMLProps<HTMLDivElement>>,
) {
  const { data: postsData, error, isLoading } = useSanityData<SanityPost[]>(
    GetTopPostsSortByDate,
  );

  const posts: Post[] = (postsData ?? []).slice(0, TOP_ARTICLES_COUNT).map(
    (post) => ({
      ...post,
      publishedAt: format(new Date(post.publishedAt), "MMMM dd, yyyy"),
      imageURL: urlForImage(post.mainImage),
      author: post.author?.name ?? "",
      slug: post.slug,
      categories: post.categories,
    }),
  );

  if (error) {
    console.error("Failed to fetch posts:", error);
  }

  return (
    <SectionContainer
      id="toparticles"
      title="Featured Posts"
      subtitle="A few recent long-form pieces—balanced for scan depth and clarity."
      action={
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 rounded-[var(--r-2)] border border-border bg-card px-3 py-2 text-xs font-medium text-foreground hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]"
          aria-label="See all blog posts"
        >
          See all
        </Link>
      }
    >
      <FeaturedBlog blogs={posts} loading={isLoading} />
    </SectionContainer>
  );
}
