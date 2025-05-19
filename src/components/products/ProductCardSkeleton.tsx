import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border bg-card animate-pulse h-full flex flex-col">
      <div className="aspect-[4/5] bg-gray-200 dark:bg-zinc-800 w-full" />
      <div className="p-4 flex-1 flex flex-col">
        <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-2/3 mb-2" />
        <div className="h-3 bg-gray-200 dark:bg-zinc-700 rounded w-1/3 mb-4" />
        <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-1/2" />
      </div>
    </div>
  );
}
