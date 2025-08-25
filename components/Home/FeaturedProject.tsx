import React from "react";
import Image from "next/image";
import { SanityImage } from "@/components/shared/SanityImage";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { m } from "framer-motion";
import { DUR_3, EASE_OUT } from "@/components/shared/motion";

type Featured = {
  title: string;
  description: string;
  image: any;
  year?: string | number;
  technologies?: string[];
  githubRepo?: string;
  demoLink?: string;
};

export default function FeaturedProject(props: Readonly<Featured>) {
  const { title, description, image, year, technologies = [], githubRepo, demoLink } = props;

  return (
  <section className="container mb-8 rounded-[var(--r-3)] border border-border bg-card p-4 md:p-6">
      <div className="grid items-center gap-6 md:grid-cols-12">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR_3, ease: EASE_OUT }}
          className="md:col-span-7"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--r-2)] border border-border">
            {typeof image === "object" && image?.asset ? (
              <SanityImage asset={image.asset} alt={title} />
            ) : (
              <Image
                src={image?.src || "/images/placeholder.webp"}
                alt={title}
                width={1200}
                height={675}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            )}
          </div>
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: DUR_3, ease: EASE_OUT, delay: 0.05 }}
          className="md:col-span-5"
        >
          <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
          <p className="readable text-sm text-muted-foreground">{description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {year && <Chip size="md" variant="muted">{year}</Chip>}
            {technologies.slice(0, 6).map((t) => (
              <Chip key={t} size="md" variant="muted">
                {t}
              </Chip>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            {demoLink && (
              <Button asChild>
                <Link href={demoLink} target="_blank" rel="noopener noreferrer">
                  View case
                </Link>
              </Button>
            )}
            {githubRepo && (
              <Button variant="outline" asChild>
                <Link href={githubRepo} target="_blank" rel="noopener noreferrer">
                  Source
                </Link>
              </Button>
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
}
