import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Wrap } from "@/components/shell";
import { TermToggle } from "@/components/term-toggle";
import {
  ASSETS,
  assetById,
  cleanCallsign,
  cryptoAmount,
  PLANS,
  planById,
  suggestCallsign,
  termPrice,
  type AssetId,
  type PlanId,
  type Term,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { useVela } from "@/lib/store";

function readPlan(value: unknown): PlanId {
  if (value === "relay" || value === "lattice" || value === "foundry") return value;
  return "lattice";
}

function readTerm(value: unknown): Term {
  return value === "year" ? "year" : "month";
}

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: readPlan(search.plan),
    term: readTerm(search.term),
  }),
  head: () => ({
    meta: [
      { title: "Checkout — Vela" },
      { name: "description", content: "Sandbox crypto invoice for a Vela workspace. No KYC. No real funds." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const settle = useVela((state) => state.settle);
  const active = useVela((state) => state.active);
  const [planId, setPlanId] = useState<PlanId>(search.plan);
  const [term, setTerm] = useState<Term>(search.term);
  const [assetId, setAssetId] = useState<AssetId>("usdt");
  const [name, setName] = useState("");
  const [suggestion, setSuggestion] = useState("north-lark");
  const [step, setStep] = useState<"draft" | "invoice">("draft");
  const [phase, setPhase] = useState(0);
  const [watching, setWatching] = useState(false);
  const [copied, setCopied] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    setPlanId(search.plan);
    setTerm(search.term);
  }, [search.plan, search.term]);

  const plan = planById(planId);
  const usd = termPrice(plan.price, term);
  const asset = assetById(assetId);
  const amount = cryptoAmount(usd, assetId);
  const cleaned = name.trim() ? cleanCallsign(name) : suggestion;
  const invalid = name.trim().length > 0 && !cleanCallsign(name);

  useEffect(() => {
    if (!watching) return;
    const timers = [
      window.setTimeout(() => setPhase(1), 500),
      window.setTimeout(() => setPhase(2), 1100),
      window.setTimeout(() => setPhase(3), 1700),
      window.setTimeout(() => finish(), 2200),
    ];
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [watching]);

  function finish() {
    if (finished.current || !cleaned) return;
    finished.current = true;
    const invoiceId = `VL-${Date.now().toString(36).toUpperCase()}`;
    settle({ planId, term, asset: assetId, callsign: cleaned, invoiceId });
    void navigate({ to: "/console" });
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(asset.address);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Wrap className="py-12 md:py-16">
      <p className="text-xs uppercase tracking-widest text-volt">Checkout</p>
      <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">Pay the workspace. Skip the paperwork.</h1>
      <p className="mt-4 max-w-2xl text-muted">
        {active
          ? "Settling again replaces the current sandbox plan."
          : "A callsign is the only field. No legal name, no card, no inbox."}
      </p>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 rounded-lg border border-line bg-raised p-5 md:p-6">
          {step === "draft" ? (
            <>
              <fieldset>
                <legend className="text-sm text-muted">Plan</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {PLANS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={planId === item.id}
                      onClick={() => setPlanId(item.id)}
                      className={cn(
                        "min-h-16 rounded-md border px-3 py-3 text-left",
                        planId === item.id ? "border-volt" : "border-line",
                      )}
                    >
                      <span className="block text-sm">{item.name}</span>
                      <span className="mt-1 block tabular-nums text-xs text-muted">{item.price} USDT</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6">
                <TermToggle term={term} onChange={setTerm} />
              </div>

              <div className="mt-6">
                <p className="text-sm text-muted">Asset</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {ASSETS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={assetId === item.id}
                      onClick={() => setAssetId(item.id)}
                      className={cn(
                        "min-h-14 rounded-md border px-3 py-2 text-left",
                        assetId === item.id ? "border-volt bg-bg" : "border-line",
                      )}
                    >
                      <span className="block text-sm">{item.label}</span>
                      <span className="block text-xs text-faint">{item.network}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-faint">Preview quotes, not a live market.</p>
              </div>

              <div className="mt-6">
                <label htmlFor="callsign" className="text-sm text-muted">
                  Callsign
                </label>
                <input
                  id="callsign"
                  value={name}
                  autoComplete="off"
                  placeholder={suggestion}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-line bg-bg px-3 text-sm"
                />
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <button type="button" className="min-h-11 text-sm text-volt" onClick={() => setName(suggestion)}>
                    Use {suggestion}
                  </button>
                  <button
                    type="button"
                    className="min-h-11 text-sm text-muted"
                    onClick={() => setSuggestion(suggestCallsign())}
                  >
                    Shuffle
                  </button>
                </div>
                {invalid ? (
                  <p className="text-sm text-volt">Use 3–16 letters or digits, starting with a letter.</p>
                ) : (
                  <p className="text-sm text-faint">This is the account. We do not ask who it belongs to.</p>
                )}
              </div>

              <Button className="mt-6" size="lg" disabled={invalid} onClick={() => setStep("invoice")}>
                Create invoice
              </Button>
            </>
          ) : (
            <>
              <p className="text-xs uppercase tracking-widest text-volt">Sandbox — do not send funds</p>
              <h2 className="mt-2 font-display text-3xl font-medium">
                {amount} {asset.label}
              </h2>
              <p className="mt-2 text-sm text-muted">
                {usd} USDT credit · {asset.network} · {cleaned} · {plan.name}
              </p>
              <div className="mt-5 flex flex-wrap items-start gap-5">
                <InvoiceQr value={`vela-sandbox:${asset.label}:${amount}:${asset.address}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-widest text-faint">Address</p>
                  <p className="mt-2 text-sm break-all text-fg">{asset.address}</p>
                  <Button variant="line" className="mt-3" onClick={() => void copyAddress()}>
                    {copied ? "Copied" : "Copy address"}
                  </Button>
                  <p className="mt-4 text-sm text-muted">
                    These addresses are not wallets. Nothing is monitoring them. The button below only pretends
                    the chain confirmed.
                  </p>
                </div>
              </div>
              <ol className="mt-6 space-y-1">
                {["Invoice posted", "Broadcast observed", "Confirmation", "Workspace unlocked"].map(
                  (label, index) => {
                    const done = index <= phase;
                    return (
                      <li key={label} className="flex min-h-11 items-center gap-3 text-sm">
                        <span className={cn("size-2.5 rounded-full", done ? "bg-volt" : "bg-line")} />
                        <span className={done ? "text-fg" : "text-faint"}>{label}</span>
                      </li>
                    );
                  },
                )}
              </ol>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="lg" disabled={watching} onClick={() => setWatching(true)}>
                  {watching ? "Watching sandbox" : "Settle in sandbox"}
                </Button>
                <Button
                  variant="line"
                  size="lg"
                  disabled={watching}
                  onClick={() => {
                    setStep("draft");
                    setPhase(0);
                  }}
                >
                  Edit order
                </Button>
              </div>
            </>
          )}
        </div>

        <aside className="rounded-lg border border-line p-5">
          <p className="text-xs uppercase tracking-widest text-faint">Order</p>
          <p className="mt-3 font-display text-3xl">{plan.name}</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Term</dt>
              <dd>{term === "year" ? "Year" : "30 days"}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Credit</dt>
              <dd className="tabular-nums">{usd} USDT</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Due</dt>
              <dd className="tabular-nums">
                {amount} {asset.label}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Seats</dt>
              <dd>{plan.seats}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">Identity</dt>
              <dd>None</dd>
            </div>
          </dl>
          <p className="mt-5 text-xs text-faint">
            Lawful use only. Fraud, spam, phishing, and breaking into machines are refused even without KYC.
          </p>
        </aside>
      </div>
    </Wrap>
  );
}

function InvoiceQr({ value }: { value: string }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    void import("qrcode")
      .then((mod) => {
        const qr =
          typeof mod.toDataURL === "function"
            ? mod
            : (mod as { default?: { toDataURL?: typeof mod.toDataURL } }).default;
        if (!qr?.toDataURL) return null;
        return qr.toDataURL(value, {
          margin: 1,
          width: 320,
          color: { dark: "#12130e", light: "#f3f1e7" },
        });
      })
      .then((url) => {
        if (alive && url) setSrc(url);
      })
      .catch(() => {
        if (alive) setSrc(null);
      });
    return () => {
      alive = false;
    };
  }, [value]);

  return (
    <div className="flex h-56 w-56 shrink-0 items-center justify-center overflow-hidden rounded-md bg-fg">
      {src ? (
        <img src={src} alt="Sandbox invoice code" className="h-56 w-56" />
      ) : (
        <span className="px-4 text-center text-sm text-ink">Preparing code</span>
      )}
    </div>
  );
}
