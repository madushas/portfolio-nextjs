import { ProjectType } from "@/data/projects";
import { cn } from "@/lib/utils";
import { CalendarIcon, CodeIcon, BadgeCheckIcon, RocketIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Chip } from "../ui/chip";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { m } from "framer-motion";
import { SanityImage } from "../shared/SanityImage";
import Image from "next/image";

export default function ProjectCard(props: ProjectType & { index: number }) {
  const { title, description, license, image, year, technologies, tags, githubRepo, demoLink, index } = props;
  let primaryHref: string | null = null;
  let primaryLabel: string | null = null;
  let secondaryHref: string | null = null;
  let secondaryLabel: string | null = null;
  if (demoLink && githubRepo) {
    primaryHref = demoLink;
    primaryLabel = "Live Demo";
    secondaryHref = githubRepo;
    secondaryLabel = "Source";
  } else if (demoLink) {
    primaryHref = demoLink; primaryLabel = "Live Demo";
  } else if (githubRepo) {
    primaryHref = githubRepo; primaryLabel = "View Source";
  }

  return (
    <m.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 0.84, 0.44, 1], delay: index * 0.06 }}
      className={cn(
        // Radius normalized: using --r-2 for card container (previously none)
        "group flex h-full flex-col overflow-hidden rounded-[var(--r-2)] border border-border/70 bg-card transition-all duration-300",
        "hover:bg-accent/40 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.025] focus-within:shadow-2xl focus-within:-translate-y-1 focus-within:scale-[1.025]"
      )}
    >
      {/* Media & tags */}
      <div className="relative">
        <div className="w-full h-[220px] min-h-[220px] max-h-[220px] bg-background flex items-center justify-center overflow-hidden">
          {typeof image === "object" && "asset" in image ? (
            <SanityImage asset={image.asset} alt={title} className="!rounded-none w-full h-full object-contain" />
          ) : (
            <Image
              src={(image as any).src}
              alt={title}
              width={320}
              height={220}
              className="w-full h-full object-contain"
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              loading={index > 2 ? "lazy" : undefined}
              priority={index < 2}
              decoding="async"
            />
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        <h3 className="mb-2 line-clamp-2 text-base font-semibold leading-snug tracking-tight md:text-lg text-foreground">
          {title}
        </h3>
        {tags?.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag) => (
              <Chip key={tag} size="sm" variant="solid">
                {tag}
              </Chip>
            ))}
            {tags.length > 4 && (
              <Chip size="sm" variant="muted">+{tags.length - 4}</Chip>
            )}
          </div>
        )}
        <p className="readable mb-4 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground md:text-sm">
          {description}
        </p>
        <div className="mt-auto grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-foreground/80 md:text-xs">
          <div className="flex items-center gap-1.5" aria-label="Year">
            <CalendarIcon className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium">{year}</span>
          </div>
          <div className="flex items-center gap-1.5" aria-label="License">
            <BadgeCheckIcon className="h-3.5 w-3.5 text-primary" />
            <span className="font-medium">{license || "N/A"}</span>
          </div>
          <div className="col-span-2 flex items-start gap-1.5" aria-label="Technologies">
            <CodeIcon className="mt-0.5 h-3.5 w-3.5 text-primary" />
            <span className="line-clamp-1 truncate flex-1" title={technologies.join(", ")}>{technologies.join(", ")}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {primaryHref ? (
            <Button asChild size="sm" className="h-8 px-3 text-[12px]">
              <Link href={primaryHref} target="_blank" rel="noopener noreferrer" prefetch={false}>
                {demoLink ? <RocketIcon className="mr-1.5 h-4 w-4" /> : <SiGithub className="mr-1.5 h-4 w-4" />}
                {primaryLabel}
              </Link>
            </Button>
          ) : (
            <span className="text-[11px] text-muted-foreground">No links</span>
          )}
          {secondaryHref && secondaryLabel && (
            <Button asChild variant="outline" size="sm" className="h-8 px-3 text-[12px]">
              <Link href={secondaryHref} target="_blank" rel="noopener noreferrer" prefetch={false}>
                {secondaryLabel === "Live Demo" ? (
                  <RocketIcon className="mr-1.5 h-4 w-4" />
                ) : (
                  <SiGithub className="mr-1.5 h-4 w-4" />
                )}
                {secondaryLabel}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </m.article>
  );
}
