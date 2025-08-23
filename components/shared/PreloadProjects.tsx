import { ProjectType } from "@/data/projects";
// import removed, handled by React import below
import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { useOnlineStatus } from "../../lib/utils";
import { handleApiError, retryFetch } from "@/lib/api";

export default function PreloadProjects({
  projects,
}: Readonly<{ projects: ProjectType[] }>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isOnline = useOnlineStatus();

  // No preloading needed for Vercel-hosted projects
  return null;
}
