"use client";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import { SanityImage } from "@/components/shared/SanityImage";
import { SiLinkedin, SiX } from "react-icons/si";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const conversions: Partial<PortableTextReactComponents> | undefined = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return <SanityImage asset={value} alt={value.alt || ""} />;
    },
  },
};

const dateToString = (date: string) => format(new Date(date), "MMMM dd, yyyy");
function estimateReadingTime(body: any): number {
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

type BlogContentClientProps = Readonly<{ post: any }>
export default function BlogContentClient({ post }: BlogContentClientProps) {
  const { title, description, author, date, imageURL, content, slug } = post;
  const readingTime = estimateReadingTime(content);
  const canonicalUrl = `https://madusha.dev/blog/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Person', name: author },
    datePublished: date,
    image: imageURL,
    url: canonicalUrl,
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Blog', item: 'https://madusha.dev/blog' },
      { '@type': 'ListItem', position: 2, name: title, item: canonicalUrl }
    ]
  };
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const article = document.getElementById('main-content');
      if (!article) return;
      const total = article.offsetHeight - window.innerHeight;
      const pct = Math.min(1, Math.max(0, (window.scrollY - article.offsetTop) / total));
      setProgress(isFinite(pct) ? pct : 0);
      const barWrapper = document.querySelector('[data-progress]');
      if (barWrapper instanceof HTMLElement) {
        barWrapper.style.setProperty('--progress', String(isFinite(pct) ? pct : 0));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard?.writeText(canonicalUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };
  return (
  <article id="main-content" className="mx-auto max-w-screen-lg px-4 pb-[var(--sp-10)]">
      <div className="reading-progress fixed left-0 top-0 z-[60] h-1 w-full bg-transparent" data-progress>
  <div className="progress-bar h-full origin-left bg-primary transition-[transform] duration-150" data-progress-bar data-progress-value={progress} />
      </div>
      <script type="application/ld+json" suppressHydrationWarning>{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json" suppressHydrationWarning>{JSON.stringify(breadcrumbLd)}</script>
      {/* Hero Funnel */}
      <header className="mx-auto max-w-[72ch] pt-10 md:pt-8 mt-16">
        <nav className="mb-4 text-xs font-medium text-muted-foreground">
          <Link href="/blog" className="rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]">Blog</Link>
          <span className="mx-2 opacity-40">/</span>
          <span className="text-foreground">Article</span>
        </nav>
        <h1 className="font-bold tracking-tight text-[clamp(2.2rem,3.1vw+1rem,3.1rem)] leading-[1.1]">{title}</h1>
        {description && (
          <p className="mt-3 text-[1.02rem] leading-relaxed text-muted-foreground max-w-prose">{description}</p>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-3 text-[13px] text-muted-foreground">
          <span className="font-medium text-foreground">{author}</span>
          <span className="opacity-40">/</span>
          <time dateTime={String(date)}>{dateToString(date)}</time>
          <span className="opacity-40">/</span>
          <span>{readingTime} min read</span>
          <span className="opacity-40">/</span>
      <div className="flex items-center gap-1.5">
            <Link
              href={`https://x.com/share?text=${encodeURIComponent(title)}&url=${encodeURIComponent(canonicalUrl)}`}
              target="_blank" rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-[var(--r-1)] border border-border/50 bg-card text-xs hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="Share on X"
            >
              <SiX />
            </Link>
            <Link
              href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(canonicalUrl)}&title=${encodeURIComponent(title)}`}
              target="_blank" rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-[var(--r-1)] border border-border/50 bg-card text-xs hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label="Share on LinkedIn"
            >
              <SiLinkedin />
            </Link>
            <button
              type="button"
              onClick={copyLink}
              aria-label="Copy link"
        className="flex h-8 w-8 items-center justify-center rounded-[var(--r-1)] border border-border/50 bg-card text-[11px] font-semibold hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {copied ? '✓' : '⧉'}
            </button>
          </div>
        </div>
      </header>
      {/* Lead Media - reduced dominance */}
      <div className="mx-auto mt-8 max-w-[78ch]">
        {imageURL && (
          <figure className="mb-10 overflow-hidden rounded-[var(--r-2)] border border-border/50 bg-card">
            <Image
              src={imageURL}
              width={1280}
              height={720}
              alt="Cover"
              className="aspect-[12/5] w-full object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1280px"
            />
          </figure>
        )}
        <div className="portableText readable">
          <PortableText value={content} components={conversions} />
        </div>
      </div>
  <output aria-live="polite" className="sr-only">{copied ? 'Link copied to clipboard' : ''}</output>
    </article>
  );
}