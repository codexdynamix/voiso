import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PriceCard } from "@/components/price-card";
import { SeatMath } from "@/components/seat-math";
import { Wrap } from "@/components/shell";
import { TermToggle } from "@/components/term-toggle";
import { PLANS, type Term } from "@/lib/catalog";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Vela" },
      {
        name: "description",
        content: "Relay, Lattice, and Foundry. One crypto price for voice, tunnel, and desk. No KYC.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const [term, setTerm] = useState<Term>("month");
  return (
    <>
      <header className="border-b border-line">
        <Wrap className="py-14 md:py-20">
          <p className="text-xs uppercase tracking-widest text-volt">Pricing</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">
            A workspace price. Not a seat hostage.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Pay in USDT, USDC, BTC, ETH, XMR, or LTC. Thirty days has no lock. The year is 15% less and unused
            months return to the same asset.
          </p>
          <div className="mt-8">
            <TermToggle term={term} onChange={setTerm} />
          </div>
        </Wrap>
      </header>
      <Wrap className="py-12 md:py-16">
        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PriceCard key={plan.id} plan={plan} term={term} />
          ))}
        </div>
        <p className="mt-6 text-sm text-faint">
          Past 25 seats, Foundry adds 6 USDT per seat each 30 days. Outbound over the minute pool is 0.012 USDT.
          Inbound to your DIDs is included.
        </p>
        <div className="mt-12">
          <SeatMath />
        </div>
      </Wrap>
    </>
  );
}
