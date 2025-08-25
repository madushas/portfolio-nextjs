"use client";

import { useSanityData } from "@/lib/hooks/useSanityData";
import { GetAllProjects } from "@/sanity/queries";
import ProjectCard from "./Project-card";
import SectionContainer from "../shared/SectionContainer";
import FeaturedProject from "./FeaturedProject";

export default function Projects(
  props: Readonly<React.HTMLProps<HTMLDivElement>>
) {
  const { data: projects, error, isLoading } = useSanityData<any[]>(GetAllProjects);

  return (
    <SectionContainer
      id="projects"
      title="My Latest Projects"
      subtitle="Check out some of my recent work and see what I've been up to."
    >
      {isLoading && (
        <div className="flex justify-center py-10">
          <span className="text-muted-foreground">Loading projects...</span>
        </div>
      )}
      {error && (
        <div className="flex justify-center py-10">
          <span className="text-destructive">Failed to load projects.</span>
        </div>
      )}
      {projects && projects.length > 0 && (
        <>
          <FeaturedProject {...projects[0]} />
          <div className="container grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(1).map((feature, index) => (
              <ProjectCard key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </>
      )}
    </SectionContainer>
  );
}
