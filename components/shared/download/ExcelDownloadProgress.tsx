"use client";

import { useDownloadStore } from "@/stores/download/downloadStore";

export default function DownloadProgress() {
  const { progress, downloading } = useDownloadStore();

  if (!downloading && progress === 0) return null;

  return (
    <div
      className={`fixed top-4 right-4 bg-white px-4 py-2 rounded-lg border border-neutral-200 transition-all duration-500 z-80 ${progress === 100 ? "translate-x-40 opacity-0" : ""}`}
    >
      <div className="text-sm mb-1">Generando Excel...</div>

      <div className="w-48 h-2 bg-green-600 rounded">
        <div
          className="h-2 bg-green-400 rounded transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-xs mt-1">{progress}%</div>
    </div>
  );
}
