import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PriceCard } from "@/components/price-card";
import { SeatMath } from "@/components/seat-math";
import { Wrap } from "@/components/shell";
import { TermToggle } from "@/components/term-toggle";
import { PLANS, type Term } from "@/lib/catalog";
import { ShieldCheck, Zap, Globe, Lock } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Vela Communications Cloud" },
      {
        name: "description",
        content: "Illustrative workspace estimates for voice, required RDP desktops, VPS plans, and dedicated servers. Live rates and ordering are not connected.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const [term, setTerm] = useState<Term>("month");
  return (
    <div>
      {/* Pricing Header */}
      <header className="relative border-b border-line py-16 md:py-24 overflow-hidden">
        <Wrap className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs text-muted backdrop-blur-md mb-4">
            <span className="size-1.5 rounded-full bg-volt" />
            <span className="font-semibold text-white">Plan comparison · Preview</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-white">
            Example workspace tiers.{" "}
            <span className="bg-gradient-to-r from-volt to-white bg-clip-text text-transparent">
              Compare options.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
            Pick a tier, choose a phone region and required RDP desktop, then
            review optional server plans. Prices and service details are
            illustrative; payment, carrier fulfillment, and desktop
            provisioning are not connected in this preview.
          </p>

          <div className="mt-8 flex justify-center">
            <TermToggle term={term} onChange={setTerm} />
          </div>
        </Wrap>
      </header>

      {/* Main Pricing Cards Grid */}
      <Wrap className="py-12 md:py-20">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <PriceCard key={plan.id} plan={plan} term={term} />
          ))}
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl ios-glass border border-white/10 text-xs">
          <div className="flex items-center gap-3">
            <Zap className="size-4 text-volt shrink-0" />
            <div>
              <p className="font-semibold text-white">Order builder</p>
              <p className="text-muted">Review services and estimated costs</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Globe className="size-4 text-ios-green shrink-0" />
            <div>
              <p className="font-semibold text-white">Phone numbers</p>
              <p className="text-muted">Included allowance varies by tier</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Lock className="size-4 text-ios-purple shrink-0" />
            <div>
              <p className="font-semibold text-white">Provider requirements</p>
              <p className="text-muted">Confirm by region and service</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="size-4 text-volt shrink-0" />
            <div>
              <p className="font-semibold text-white">Illustrative rates</p>
              <p className="text-muted">Confirm before ordering</p>
            </div>
          </div>
        </div>

        {/* Dynamic Seat Math Calculator */}
        <div className="mt-16">
          <SeatMath />
        </div>
      </Wrap>
    </div>
  );
}
