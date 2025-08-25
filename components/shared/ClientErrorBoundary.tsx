"use client";
import ErrorBoundary from "./ErrorBoundary";
import React from "react";

interface ClientErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ClientErrorBoundary({ children, fallback }: Readonly<ClientErrorBoundaryProps>) {
  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
}
