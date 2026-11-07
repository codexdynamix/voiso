import type { Term } from "@/lib/catalog";
import { cn } from "@/lib/cn";

export function TermToggle({ term, onChange }: { term: Term; onChange: (term: Term) => void }) {
  return (
    <div
      className="inline-flex rounded-full bg-white/[0.06] p-1.5 border border-white/10 shadow-inner"
      role="group"
      aria-label="Billing term"
    >
      {(
        [
          ["month", "Monthly Billing"],
          ["year", "Annual · Save 15%"],
        ] as const
      ).map(([value, label]) => (
        <button
          key={value}
          type="button"
          aria-pressed={term === value}
          onClick={() => onChange(value)}
          className={cn(
            "h-10 rounded-full px-5 text-xs sm:text-sm font-semibold transition-all duration-200",
            term === value
              ? "bg-white text-black shadow-md shadow-black/20"
              : "text-muted hover:text-white",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
