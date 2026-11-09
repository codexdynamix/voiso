import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { PhoneCall, Shield, Monitor, Server } from "lucide-react";
import { DeskPanel } from "@/components/desk-panel";
import { RecoveryDialog } from "@/components/recovery-dialog";
import { Wrap } from "@/components/shell";
import { TunnelPanel } from "@/components/tunnel-panel";
import { VoicePanel } from "@/components/voice-panel";
import { DEDICATED_PLANS, effectivePlanId, planById, VPS_PLANS } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { useVela } from "@/lib/store";

type Pane = "voice" | "tunnel" | "desk";

export const Route = createFileRoute("/console")({
  head: () => ({
    meta: [
      { title: "Console — Vela" },
      { name: "description", content: "Vela workspace. Voice, tunnel, and desk under one callsign." },
    ],
  }),
  component: ConsolePage,
});

function ConsolePage() {
  const [pane, setPane] = useState<Pane>("voice");
  const callsign = useVela((state) => state.callsign);
  const active = useVela((state) => state.active);
  const planId = useVela((state) => state.planId);
  const selectedVpsId = useVela((state) => state.selectedVpsId);
  const selectedDedicatedId = useVela((state) => state.selectedDedicatedId);
  const plan = planById(effectivePlanId(planId, active));
  const selectedVps = VPS_PLANS.find((item) => item.id === selectedVpsId);
  const selectedDedicated = DEDICATED_PLANS.find((item) => item.id === selectedDedicatedId);

  return (
    <Wrap className="py-8 md:py-12">
      <RecoveryDialog />

      {/* Workspace Header Card */}
      <div className="ios-glass rounded-3xl p-6 sm:p-8 border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-ios-green animate-pulse" />
              <span className="text-xs uppercase tracking-wider font-semibold text-muted">
                Interactive Preview
              </span>
              <span className="text-muted/40">·</span>
              <span className="text-xs text-volt font-mono uppercase">{plan.name} Tier</span>
            </div>

            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              {callsign || "Unsigned Sandbox"}
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-muted">
              Calls, texts, VPN status, phone numbers, and desktop controls are
              simulations only. No account is paid, provisioned, or connected
              to live services.{" "}
              <Link
                to="/checkout"
                search={{ plan: "lattice", term: "month" }}
                className="text-volt font-medium hover:underline"
              >
                Configure an order
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={cn(
                "rounded-full px-3.5 py-1 text-xs font-semibold flex items-center gap-1.5",
                "bg-amber-400/10 text-amber-200 border border-amber-300/30",
              )}
            >
              <span className="size-1.5 rounded-full bg-current" />
              Preview only
            </span>
          </div>
        </div>

        {/* iOS-Style Sliding Tab Bar */}
        <div className="mt-8 flex items-center justify-start border-t border-line pt-6">
          <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.05] border border-white/10">
            {(
              [
                ["voice", "Voice & Dialer", PhoneCall],
                ["tunnel", "WireGuard Tunnel", Shield],
                ["desk", "Virtual Desktops", Monitor],
              ] as const
            ).map(([id, label, Icon]) => {
              const selected = pane === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setPane(id)}
                  className={cn(
                    "flex items-center gap-2 h-10 px-4 sm:px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200",
                    selected
                      ? "bg-white text-black shadow-md shadow-black/20"
                      : "text-muted hover:text-white hover:bg-white/[0.04]",
                  )}
                >
                  <Icon className="size-4" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {selectedVps || selectedDedicated ? (
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Server className="size-4 text-volt" />
            <h2 className="text-sm font-semibold text-white">Selected server services</h2>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[selectedVps && { type: "VPS", plan: selectedVps }, selectedDedicated && { type: "Dedicated server", plan: selectedDedicated }]
              .filter((entry) => entry !== null && entry !== undefined)
              .map((entry) => entry && (
                <div key={entry.plan.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/10 p-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{entry.type} · {entry.plan.name}</p>
                    <p className="mt-1 text-xs text-muted">Example selection · not ordered or provisioned</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-volt">${entry.plan.price} USD/mo</p>
                </div>
              ))}
          </div>
        </section>
      ) : null}

      {/* Tab Panels */}
      <div className="mt-8">
        {pane === "voice" ? <VoicePanel /> : null}
        {pane === "tunnel" ? <TunnelPanel /> : null}
        {pane === "desk" ? <DeskPanel /> : null}
      </div>

    </Wrap>
  );
}
