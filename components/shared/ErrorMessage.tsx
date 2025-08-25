import React from "react";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: Readonly<ErrorMessageProps>) {
  return (
    <div className="bg-red-100 text-red-700 p-4 rounded mb-4 border border-red-300">
      <span className="font-semibold">Error:</span> {message}
    </div>
  );
}
