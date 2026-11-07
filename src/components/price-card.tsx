import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { termPrice, type Plan, type Term } from "@/lib/catalog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function PriceCard({ plan, term }: { plan: Plan; term: Term }) {
  const amount = termPrice(plan.price, term);
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg border p-6",
        plan.featured ? "border-volt bg-raised" : "border-line bg-bg",
      )}
    >
      <p className="text-xs uppercase tracking-widest text-volt">{plan.featured ? "Most teams" : "Workspace"}</p>
      <h2 className="mt-2 font-display text-3xl font-medium">{plan.name}</h2>
      <p className="mt-2 min-h-12 text-sm text-muted">{plan.blurb}</p>
      <p className="mt-6 font-display text-5xl tabular-nums text-fg">
        {amount}
        <span className="ml-2 font-sans text-sm text-muted">{term === "year" ? "USDT / year" : "USDT / 30 days"}</span>
      </p>
      {term === "year" ? (
        <p className="mt-1 text-sm text-faint">{plan.price} USDT if you pay every 30 days</p>
      ) : (
        <p className="mt-1 text-sm text-faint">{termPrice(plan.price, "year")} USDT if you pay the year</p>
      )}
      <ul className="mt-6 space-y-3 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-volt" strokeWidth={1.75} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/checkout"
        search={{ plan: plan.id, term }}
        className={cn(buttonVariants({ variant: plan.featured ? "primary" : "line", size: "lg" }), "mt-8 w-full")}
      >
        Continue with {plan.name}
      </Link>
    </article>
  );
}
