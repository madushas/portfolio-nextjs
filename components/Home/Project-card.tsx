import { ProjectType } from "@/data/projects";
import { cn } from "@/lib/utils";
import {
  BadgeCheckIcon,
  CalendarIcon,
  CodeIcon,
  RocketIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { m } from "framer-motion";
import { SanityImage } from "../shared/SanityImage";
import Image from "next/image";

export default function ProjectCard({
  title,
  description,
  license,
  image,
  year,
  technologies,
  tags,
  githubRepo,
  demoLink,
  index,
}: ProjectType & { index: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "group/project border-border bg-card hover:bg-accent/30 relative flex flex-col pt-10 transition-colors duration-600 ease-in-out lg:border-r",
        (index === 0 || index === 3) && "border-border lg:border-l",
        index < 3 && "border-border lg:border-b",
      )}
    >
      <div className="p-4">
        {typeof image === "object" && "asset" in image ? (
          <SanityImage asset={image.asset} alt={title} />
        ) : (
          <Image
            src={image.src}
            alt={title}
            width={400}
            height={300}
            className="w-full h-auto object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 2}
          />
        )}
        <div className="m-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-secondary/70 text-secondary-foreground border-border inline-block rounded-full border px-3 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-10 mb-2 px-10 text-xl font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-neutral-300 transition-all duration-200 group-hover/project:h-8 group-hover/project:bg-blue-500 dark:bg-neutral-700" />
        <span className="text-card-foreground inline-block transition duration-200 group-hover/project:translate-x-2">
          {title}
        </span>
      </div>
      <div className="border-border mx-4 mt-4 flex grow flex-col space-y-4">
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="text-accent-foreground flex items-center space-x-2 text-sm">
          <CalendarIcon className="h-5 w-5" />
          <span>
            <strong>Year:</strong> {year}
          </span>
        </div>
        <div className="text-accent-foreground flex items-center space-x-2 text-sm">
          <BadgeCheckIcon className="h-5 w-5" />
          <span>
            <strong>License:</strong> {license}
          </span>
        </div>
        <div className="text-accent-foreground flex items-center space-x-2 text-sm">
          <CodeIcon className="h-5 w-5" />
          <span>
            <strong>Technologies:</strong> {technologies.join(", ")}
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between p-4">
        {githubRepo ? (
          <Button variant="outline" asChild>
            <Link
              href={githubRepo}
              prefetch={false}
              target="_blank"
              className="flex items-center cursor-pointer"
              rel="noopener noreferrer"
            >
              <SiGithub className="mr-2 h-5 w-5" />
              View Project
            </Link>
          </Button>
        ) : (
          <span />
        )}
        {demoLink ? (
          <Button variant="outline" asChild>
            <Link
              href={demoLink}
              prefetch={true}
              target="_blank"
              className="flex items-center cursor-pointer"
              rel="noopener noreferrer"
            >
              <RocketIcon className="mr-2 h-5 w-5" />
              Live Demo
            </Link>
          </Button>
        ) : (
          <span />
        )}
      </div>
    </m.div>
  );
}
