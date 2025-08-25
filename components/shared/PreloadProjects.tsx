import { ProjectType } from "@/data/projects";
import React from "react";

export default function PreloadProjects({
  projects,
}: Readonly<{ projects: ProjectType[] }>) {

  // No preloading needed for Vercel-hosted projects
  return null;
}
