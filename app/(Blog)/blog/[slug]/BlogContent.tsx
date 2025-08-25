

import { SanityImage } from "@/components/shared/SanityImage";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { GetPostBySlug } from "@/sanity/queries";
import { format } from "date-fns";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import { SiLinkedin, SiX } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";


export const runtime = "edge";

async function getPostFromSanity(slug: string) {
  const query = GetPostBySlug;
  return (
    await client.fetch(query, {
      slug: slug,
    })
  ).map(
    (post: {
      publishedAt: string;
      mainImage: { _type: string; asset: { _ref: string; _type: string } };
      author: { name: string };
      slug: { current: string; _type: string };
      categories: [{ title: string }];
      title: string;
      description: string;
      body: any;
    }) => {
      return {
        ...post,
        date: new Date(post.publishedAt),
        imageURL: urlForImage(post.mainImage),
        author: post.author.name,
        slug: post.slug.current,
        categories: post.categories,
        content: post.body,
      };
    },
  )[0];
}

const conversions: Partial<PortableTextReactComponents> | undefined = {
  types: {
    image: ({ value }) => {
      return <SanityImage {...value} />;
    },
  },
};

const dateToString = (date: string) => format(new Date(date), "MMMM dd, yyyy");

function estimateReadingTime(body: any): number {
  // naive word count across plain text blocks
  try {
    const text = (body || [])
      .filter((b: any) => b._type === 'block')
      .map((b: any) => b.children?.map((c: any) => c.text).join(' ') || '')
      .join(' ');
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  } catch {
    return 3;
  }
}



import BlogContentWrapper from "./BlogContentWrapper";

export default async function BlogContent({ slug }: { slug: string }) {
  const post = await getPostFromSanity(slug);
  if (!post) {
    return (
      <section className="flex min-h-[calc(100vh-256px)] items-center justify-center">
        <div className="text-center">
          <h1 className="text-foreground text-4xl font-bold">Post not found</h1>
          <p className="text-card-foreground text-lg">
            The post you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </section>
    );
  }
  return <BlogContentWrapper post={post} />;
}
