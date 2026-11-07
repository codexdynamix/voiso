import { createFileRoute } from "@tanstack/react-router";
import { VoicePanel } from "@/components/voice-panel";
import { Wrap } from "@/components/shell";
import { DIDS, planById } from "@/lib/catalog";
import { useVela } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/voice")({
  head: () => ({
    meta: [
      { title: "Voice — Vela" },
      {
        name: "description",
        content: "Browser softphone, DIDs, SMS, and a dialer. No per-agent contract and no KYC.",
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

  return (
    <>
      <header className="border-b border-line">
        <Wrap className="py-14 md:py-20">
          <p className="text-xs uppercase tracking-widest text-volt">Voice</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">
            A softphone that does not bill you per pair of ears.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Outbound, inbound, SMS, and — on Lattice — a list dialer. You present a number you hold. The
            workspace price already includes the seats.
          </p>
        </Wrap>
      </header>
      <Wrap className="py-10 md:py-14">
        <VoicePanel />
        <div className="mt-10">
          <h2 className="font-display text-3xl font-medium">Number inventory</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            {plan.name} includes {plan.dids}. Extra DIDs attach in this sandbox without a charge. A live invoice
            would add the monthly amount in the same asset.
          </p>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {DIDS.map((did, index) => {
              const included = index < plan.dids;
              const held = owned.includes(did.id) || included;
              return (
                <li key={did.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <p className="tabular-nums text-sm">{did.id}</p>
                    <p className="text-xs text-faint">
                      {did.city} · {did.country}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted">{included ? "Included" : `${did.monthly} USDT`}</span>
                    <Button variant="line" disabled={held} onClick={() => attachDid(did.id)}>
                      {held ? "On the line" : "Attach"}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Wrap>
    </>
  );
}
