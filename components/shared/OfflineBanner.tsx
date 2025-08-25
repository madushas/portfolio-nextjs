"use client";
import React from "react";
import { useOnlineStatus } from "../../lib/hooks/useOnlineStatus";

export default function OfflineBanner() {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;
  return (
    <div className="bg-yellow-100 text-yellow-800 p-2 text-center">
      You are offline. Some features may not be available.
    </div>
  );
}
