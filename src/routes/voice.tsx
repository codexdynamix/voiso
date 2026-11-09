import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Globe, Plus } from "lucide-react";
import { VoicePanel } from "@/components/voice-panel";
import { Wrap } from "@/components/shell";
import { DIDS, planById } from "@/lib/catalog";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/voice")({
  head: () => ({
    meta: [
      { title: "Voice & Dialer — Vela Communications Cloud" },
      {
        name: "description",
        content: "Preview a business softphone and predictive-dialer workflow with example phone-number regions. Carrier calling, SMS, and number ordering are not connected.",
      },
    ],
  }),
  component: VoicePage,
});

function VoicePage() {
  const plan = planById("lattice");

  const [query, setQuery] = useState("");

  const filteredDids = DIDS.filter(
    (d) =>
      d.city.toLowerCase().includes(query.toLowerCase()) ||
      d.country.toLowerCase().includes(query.toLowerCase()) ||
      d.id.includes(query),
  );

  return (
    <div>
      {/* Header */}
      <header className="border-b border-line py-12 md:py-16">
        <Wrap>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs text-muted backdrop-blur-md mb-3">
              <span className="size-1.5 rounded-full bg-ios-green animate-pulse" />
              <span className="font-semibold text-white">Voice & number options · Preview</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-white">
              Review phone regions and dialer options.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
              Explore the voice workflow and configure a phone region in the
              order builder. Calls, SMS, carrier service, and number ordering
              are not live in this preview.
            </p>
          </div>
        </Wrap>
      </header>

      {/* Main Voice Panel & Phone Hardware */}
      <Wrap className="py-10 md:py-14">
        <VoicePanel />

        {/* Global DID Inventory Section */}
        <div className="mt-16 pt-12 border-t border-line">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-volt">Phone number options</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-white">Example number regions</h2>
              <p className="mt-1 text-xs sm:text-sm text-muted">
                Choose a region to prefill the order builder. The {plan.name} plan
                example includes up to {plan.dids} numbers.
              </p>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-amber-200">
                These are illustrative examples, not live or reservable numbers.
                Carrier coverage, exact number, monthly charges, local
                documentation, and activation must be confirmed before a real
                order can be placed.
              </p>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter by city, country..."
                className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-3.5 text-xs text-white placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-volt"
              />
            </div>
          </div>

          <div className="mt-6 ios-glass rounded-3xl overflow-hidden border border-white/10 divide-y divide-line">
            {filteredDids.map((did) => {
              const included = DIDS.findIndex((item) => item.id === did.id) < plan.dids;
              return (
                <div
                  key={did.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 sm:px-6 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-volt shrink-0">
                      <Globe className="size-5" />
                    </div>

                    <div>
                      <p className="font-mono text-sm font-semibold text-white">{did.id}</p>
                      <p className="text-xs text-muted">
                        {did.city}, {did.country} · example number
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="text-xs font-medium text-muted">
                      {included ? (
                        <span className="text-ios-green font-semibold">Included in {plan.name}</span>
                      ) : (
                        `Example rate: $${did.monthly} / mo*`
                      )}
                    </span>

                    <Link
                      to="/checkout"
                      search={{
                        plan: "lattice",
                        term: "month",
                        phones: [did.id],
                      }}
                      className={cn(
                        "inline-flex h-9 items-center justify-center gap-2 rounded-xl px-3 text-xs font-medium transition-colors",
                        "bg-volt text-black hover:bg-volt/90",
                      )}
                    >
                      <Plus className="size-3.5" />
                      <span>Select region</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] text-muted">
            *Illustrative allowance and rates only; selecting a region does not
            reserve, purchase, or activate a number.
          </p>
        </div>
      </Wrap>
    </div>
  );
}
