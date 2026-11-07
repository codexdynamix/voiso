import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { PhoneCall, Shield, Monitor, RefreshCw, CheckCircle2 } from "lucide-react";
import { DeskPanel } from "@/components/desk-panel";
import { RecoveryDialog } from "@/components/recovery-dialog";
import { Wrap } from "@/components/shell";
import { TunnelPanel } from "@/components/tunnel-panel";
import { VoicePanel } from "@/components/voice-panel";
import { effectivePlanId, planById } from "@/lib/catalog";
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
  const invoiceId = useVela((state) => state.invoiceId);
  const asset = useVela((state) => state.asset);
  const reset = useVela((state) => state.resetWorkspace);
  const plan = planById(effectivePlanId(planId, active));

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
                Enterprise Workspace
              </span>
              <span className="text-muted/40">·</span>
              <span className="text-xs text-volt font-mono uppercase">{plan.name} Tier</span>
            </div>

            <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              {callsign || "Unsigned Sandbox"}
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-muted">
              {active ? (
                <span className="flex items-center gap-1.5 text-ios-green">
                  <CheckCircle2 className="size-4" />
                  Invoice {invoiceId} confirmed via {asset.toUpperCase()} on-chain settlement.
                </span>
              ) : (
                <>
                  Running in live interactive sandbox mode. Full features enabled.{" "}
                  <Link to="/pricing" className="text-volt font-medium hover:underline">
                    Settle crypto invoice
                  </Link>{" "}
                  to reserve your callsign.
                </>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={cn(
                "rounded-full px-3.5 py-1 text-xs font-semibold flex items-center gap-1.5",
                active
                  ? "bg-ios-green/15 text-ios-green border border-ios-green/30"
                  : "bg-volt/15 text-volt border border-volt/30",
              )}
            >
              <span className="size-1.5 rounded-full bg-current" />
              {active ? "Settled Account" : "Sandbox Preview"}
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

      {/* Tab Panels */}
      <div className="mt-8">
        {pane === "voice" ? <VoicePanel /> : null}
        {pane === "tunnel" ? <TunnelPanel /> : null}
        {pane === "desk" ? <DeskPanel /> : null}
      </div>

      {/* Disconnect Workspace Action */}
      {active ? (
        <div className="mt-10 pt-6 border-t border-line flex justify-end">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 text-xs font-medium text-red-400/80 hover:text-red-400 hover:underline"
          >
            <RefreshCw className="size-3.5" />
            <span>Terminate & Wipe This Sandbox Workspace</span>
          </button>
        </div>
      ) : null}
    </Wrap>
  );
}
