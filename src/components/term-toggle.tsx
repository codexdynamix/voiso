import type { Term } from "@/lib/catalog";
import { cn } from "@/lib/cn";

export function TermToggle({ term, onChange }: { term: Term; onChange: (term: Term) => void }) {
  return (
    <div className="inline-flex rounded-full border border-line p-1" role="group" aria-label="Billing term">
      {(
        [
          ["month", "30 days"],
          ["year", "Year · 15% off"],
        ] as const
      ).map(([value, label]) => (
        <button
          key={value}
          type="button"
          aria-pressed={term === value}
          onClick={() => onChange(value)}
          className={cn(
            "min-h-11 rounded-full px-4 text-sm",
            term === value ? "bg-volt text-ink" : "text-muted hover:text-fg",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
