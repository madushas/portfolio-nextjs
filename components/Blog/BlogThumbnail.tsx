import { cn } from "@/lib/utils";
import { Post } from "@/sanity/schema";
import Link from "next/link";
import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Chip } from "@/components/ui/chip";

interface PostThumbnailProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  post: Post;
  type: "featured" | "highlighted" | "normal";
}

// Reuse design-tokenized Chip primitive
const TagChip = ({ title }: { title: string }) => (
  <Chip size="sm" variant="outline" className="uppercase tracking-wide text-[10px]">{title}</Chip>
);

export default function PostThumbnail({ post, type, ...props }: Readonly<PostThumbnailProps>) {
  if (type === "featured") {
    return (
  <article {...props} className={cn("rounded-[var(--r-2)] border border-border/50 bg-card p-4 md:p-6", props.className)}>
        <div className="grid gap-6 md:grid-cols-12 md:items-stretch">
          <Link className="order-1 block md:order-2 md:col-span-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] rounded-[var(--r-2)]" href={`/blog/${post.slug.current}`}>
            <div className="overflow-hidden rounded-[var(--r-2)]">
              <Image
                alt={post.title}
                src={post.imageURL}
                width={1200}
                height={675}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="aspect-[16/9] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                priority
                decoding="async"
              />
            </div>
          </Link>
          <div className="order-2 flex flex-col justify-center md:order-1 md:col-span-6">
            <div className="flex flex-wrap gap-1.5">
              {post.categories.slice(0, 2).map((category) => (
                <TagChip key={category.title} title={category.title} />
              ))}
            </div>
            <h2 className="mt-3 text-2xl font-bold leading-snug md:text-3xl">
              <Link href={`/blog/${post.slug.current}`} className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] rounded-sm line-clamp-3">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 hidden text-sm text-muted-foreground md:line-clamp-3 md:block">{post.description}</p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] md:text-xs text-muted-foreground">
              <div className="font-medium text-foreground">{post.author}</div>
              <time className="font-mono opacity-70">{post.publishedAt}</time>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // highlighted/normal cards
  return (
  <article {...props} className={cn("group rounded-[var(--r-2)] border border-border/50 bg-card transition-shadow hover:shadow-[var(--sh-sm)]", props.className)}>
  <Link className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] rounded-[var(--r-2)]" href={`/blog/${post.slug.current}`}>
  <div className="overflow-hidden rounded-t-[var(--r-2)]">
          <Image
            alt={post.title}
            src={post.imageURL}
            width={800}
            height={450}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            decoding="async"
          />
        </div>
      </Link>
      <div className="px-4 py-4 md:py-5">
        <div className="flex flex-wrap items-center gap-1.5">
          {post.categories.slice(0, 2).map((category) => (
            <TagChip key={category.title} title={category.title} />
          ))}
        </div>
        <h3 className="mt-2 text-[15px] font-semibold leading-snug md:text-base">
          <Link href={`/blog/${post.slug.current}`} className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] rounded-sm line-clamp-2">
            {post.title}
          </Link>
        </h3>
        {/* Description removed to reduce scanning cost */}
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
          <span className="font-medium text-foreground">{post.author}</span>
          <time className="font-mono opacity-70">{post.publishedAt}</time>
        </div>
      </div>
    </article>
  );
}
