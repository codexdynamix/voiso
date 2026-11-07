import { cn } from "@/lib/cn";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true">
      <polygon points="6,9 12,9 20,16 12,23 6,23 14,16" className="text-volt" fill="currentColor" />
      <polygon points="14,11 18,11 24,16 18,21 14,21 20,16" fill="currentColor" />
    </svg>
  );
}
