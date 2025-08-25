"use client";
import React from "react";
import { useAppStore } from "@/lib/stores/useAppStore";
import Spinner from "./Spinner";

export default function LoadingOverlay() {
  const isLoading = useAppStore((state) => state.isLoading);
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[hsl(var(--background)/0.95)]">
      <Spinner />
    </div>
  );
}
