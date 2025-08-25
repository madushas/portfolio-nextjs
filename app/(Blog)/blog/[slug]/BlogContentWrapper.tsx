"use client";
import dynamic from "next/dynamic";
const BlogContentClient = dynamic(() => import("./BlogContentClient"), { ssr: false });
export default function BlogContentWrapper({ post }: { post: any }) {
  return <BlogContentClient post={post} />;
}