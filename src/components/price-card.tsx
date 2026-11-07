import { Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { termPrice, type Plan, type Term } from "@/lib/catalog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function PriceCard({ plan, term }: { plan: Plan; term: Term }) {
  const amount = termPrice(plan.price, term);
  return (
    <article
      className={cn(
        "ios-glass flex h-full flex-col justify-between rounded-3xl p-7 border transition-all duration-300",
        plan.featured
          ? "border-volt/60 bg-volt/[0.04] shadow-2xl shadow-volt/15 ring-1 ring-volt/30"
          : "border-white/10 hover:border-white/20 hover:bg-white/[0.05]",
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            {plan.featured ? "Recommended for Scale" : "Standard Tier"}
          </span>
          {plan.featured && (
            <span className="rounded-full bg-volt/20 text-volt px-3 py-0.5 text-xs font-semibold">
              Most Popular
            </span>
          )}
        </div>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{plan.name}</h2>
        <p className="mt-2 text-sm text-muted leading-relaxed min-h-[40px]">{plan.blurb}</p>

        <div className="mt-6 flex items-baseline gap-2">
          <span className="text-5xl font-semibold tracking-tight text-white tabular-nums">
            {amount}
          </span>
          <span className="text-sm font-medium text-muted">
            {term === "year" ? "USDT / yr" : "USDT / 30d"}
          </span>
        </div>

        <p className="mt-1 text-xs text-muted/70">
          {term === "year"
            ? `Equivalent to ${(amount / 12).toFixed(1)} USDT / month (billed annually)`
            : `${plan.price} USDT standard monthly rate, cancel anytime`}
        </p>

        <div className="my-6 border-t border-line" />

        <ul className="space-y-3 text-sm text-fg/90">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-volt/20 text-volt text-xs">
                <Check className="size-3" strokeWidth={2.5} />
              </span>
              <span className="leading-snug">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 pt-4 border-t border-line">
        <Link
          to="/checkout"
          search={{ plan: plan.id, term }}
          className={cn(
            buttonVariants({ variant: plan.featured ? "primary" : "line", size: "lg" }),
            "w-full flex items-center justify-center gap-2",
          )}
        >
          <span>Subscribe to {plan.name}</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </article>
  );
}
