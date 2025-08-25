import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { StaticImageData } from "next/image";

export type ProjectType = {
  title: string;
  description: string;
  license?: string; // Optional; display N/A if missing
  image: { asset: SanityImageSource } | StaticImageData;
  year: string;
  technologies: string[];
  tags: string[];
  githubRepo?: string;
  demoLink?: string;
};
