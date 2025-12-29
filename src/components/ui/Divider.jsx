import React from "react";

export default function Divider({ label = "OU", className = "" }) {
  return (
    <div className={`pt-4 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="h-px w-full bg-black/15" />
        <span className="text-xs text-black/50">{label}</span>
        <div className="h-px w-full bg-black/15" />
      </div>
    </div>
  );
}
