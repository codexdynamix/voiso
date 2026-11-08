import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Globe, Plus, Check } from "lucide-react";
import { VoicePanel } from "@/components/voice-panel";
import { Wrap } from "@/components/shell";
import { DIDS, planById } from "@/lib/catalog";
import { useVela } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/voice")({
  head: () => ({
    meta: [
      { title: "Voice & Dialer — Vela Communications Cloud" },
      {
        name: "description",
        content: "Browser WebRTC softphone, global DID virtual numbers, SMS, and predictive dialer without KYC.",
      },
    ],
  }),
  component: VoicePage,
});

function VoicePage() {
  const owned = useVela((state) => state.ownedDids);
  const active = useVela((state) => state.active);
  const planId = useVela((state) => state.planId);
  const attachDid = useVela((state) => state.attachDid);
  const plan = planById(active ? (planId ?? "lattice") : "lattice");

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
              <span className="font-semibold text-white">Direct WebRTC Telephony</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-white">
              Carrier voice without per-agent licensing.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
              Outbound, inbound, SMS, predictive automated dialer, and IVR queues. Present an international DID you hold. Unlimited seats are already covered in your flat workspace plan.
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
              <p className="text-xs font-semibold uppercase tracking-wider text-volt">Carrier Number Fleet</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-white">International DIDs Inventory</h2>
              <p className="mt-1 text-xs sm:text-sm text-muted">
                Your <span className="text-white font-medium">{plan.name}</span> plan includes {plan.dids} free numbers. Attach extra numbers instantly in sandbox.
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
            {filteredDids.map((did, index) => {
              const included = index < plan.dids;
              const held = owned.includes(did.id) || included;
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
                        {did.city}, {did.country} · Voice & SMS Enabled
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4">
                    <span className="text-xs font-medium text-muted">
                      {included ? (
                        <span className="text-ios-green font-semibold">Included in {plan.name}</span>
                      ) : (
                        `${did.monthly} USDT / mo`
                      )}
                    </span>

                    <Button
                      variant={held ? "line" : "primary"}
                      size="sm"
                      disabled={held}
                      onClick={() => attachDid(did.id)}
                      className={cn(held && "border-ios-green/40 text-ios-green bg-ios-green/10")}
                    >
                      {held ? (
                        <>
                          <Check className="size-3.5" />
                          <span>Active on Line</span>
                        </>
                      ) : (
                        <>
                          <Plus className="size-3.5" />
                          <span>Attach DID</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Wrap>
    </div>
  );
}
