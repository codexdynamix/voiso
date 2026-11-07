import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
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
    <Wrap className="py-10 md:py-14">
      <RecoveryDialog />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-widest text-faint">Workspace</p>
          <h1 className="mt-2 text-4xl leading-tight sm:text-5xl">{callsign || "Unsigned preview"}</h1>
        </div>
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-widest">
          <span className="inline-flex min-h-11 items-center rounded-full border border-line px-4">{plan.name}</span>
          <span className="inline-flex min-h-11 items-center rounded-full border border-volt px-4 text-volt">
            {active ? "Settled" : "Sandbox"}
          </span>
        </div>
      </div>
      <p className="mt-4 max-w-2xl text-sm text-muted">
        {active ? (
          <>
            Invoice {invoiceId} settled in sandbox via {asset.toUpperCase()}. The phrase dialog is the only secret
            we keep.
          </>
        ) : (
          <>
            Previewing Lattice so you can place a call, bring a tunnel up, and open a desk.{" "}
            <Link to="/pricing" className="text-volt">
              Settle an invoice
            </Link>{" "}
            to pin a plan.
          </>
        )}
      </p>

      <div className="mt-6 grid grid-cols-3 gap-1 rounded-md bg-surface p-1" role="tablist" aria-label="Workspace">
        {(
          [
            ["voice", "Voice"],
            ["tunnel", "Tunnel"],
            ["desk", "Desk"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={pane === id}
            onClick={() => setPane(id)}
            className={cn("min-h-11 rounded-md text-sm", pane === id ? "bg-bg text-fg" : "text-muted")}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6" role="tabpanel">
        {pane === "voice" ? <VoicePanel /> : null}
        {pane === "tunnel" ? <TunnelPanel /> : null}
        {pane === "desk" ? <DeskPanel /> : null}
      </div>

      {active ? (
        <button type="button" onClick={reset} className="mt-8 min-h-11 text-sm text-faint hover:text-fg">
          End this sandbox workspace
        </button>
      ) : null}
    </Wrap>
  );
}
