import React from "react";
import { cn } from "@/lib/cn";

// The signature Voiso purple/magenta click cursor pointer
export function VoisoPointer({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M5.5 3.5L18.5 10.5L12 12.5L9.5 19L5.5 3.5Z"
        fill="url(#voiso-pointer-grad)"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="voiso-pointer-grad" x1="5.5" y1="3.5" x2="18.5" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A855F7" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Ratings Social Proof
export function TrustpilotBadge({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5 text-xs font-semibold text-fg", className)}>
      <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-[#00B67A]" fill="currentColor" aria-hidden="true">
        <path d="M12 0l3.708 7.514L24 8.727l-6 5.849 1.416 8.261L12 18.932 4.584 22.837 6 14.576 0 8.727l8.292-1.213L12 0z" />
      </svg>
      <div className="flex items-center gap-0.5 text-[#00B67A]">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-400 text-sm leading-none">★</span>
        ))}
      </div>
      <span className="text-xs text-muted">Trustpilot 4.6/5</span>
    </div>
  );
}

export function G2Badge({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5 text-xs font-semibold text-fg", className)}>
      <span className="flex size-4 items-center justify-center rounded bg-[#FF492C] text-[10px] font-black text-white">
        G
      </span>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-400 text-sm leading-none">★</span>
        ))}
      </div>
      <span className="text-xs text-muted">G2 Score 4.8/5</span>
    </div>
  );
}

export function CapterraBadge({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5 text-xs font-semibold text-fg", className)}>
      <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" aria-hidden="true">
        <path d="M12 2L3 20H21L12 2Z" fill="#1C355E" />
        <path d="M12 6L6 18H18L12 6Z" fill="#FF9800" />
      </svg>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-400 text-sm leading-none">★</span>
        ))}
      </div>
      <span className="text-xs text-muted">Capterra 4.7/5</span>
    </div>
  );
}
