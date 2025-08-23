import React from "react";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-100 text-red-700 p-4 rounded mb-4 border border-red-300">
      <span className="font-semibold">Error:</span> {message}
    </div>
  );
}
