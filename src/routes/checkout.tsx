import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Copy, Check, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
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
      { title: "Instant Activation — Vela Communications Cloud" },
      { name: "description", content: "Instant crypto invoice for Vela cloud communications. No KYC. No credit card." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const settle = useVela((state) => state.settle);
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
    setSuggestion(suggestCallsign());
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Wrap className="py-10 md:py-16">
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs text-muted backdrop-blur-md mb-3">
          <ShieldCheck className="size-3.5 text-ios-green" />
          <span className="font-semibold text-white">Instant Private Activation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Reserve your communications workspace
        </h1>
        <p className="mt-2 text-sm text-muted">
          No credit card, no identity documents, no per-agent agreements. Settle in crypto and start instantly.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Main Form or Invoice */}
        <div className="ios-glass rounded-3xl p-6 sm:p-8 border border-white/10 lg:col-span-8 shadow-2xl">
          {step === "draft" ? (
            <div className="space-y-8">
              {/* Plan Picker */}
              <div>
                <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">1. Select Tier</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {PLANS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={planId === item.id}
                      onClick={() => setPlanId(item.id)}
                      className={cn(
                        "p-4 rounded-2xl border text-left transition-all",
                        planId === item.id
                          ? "border-volt/60 bg-volt/[0.08] shadow-md shadow-volt/10"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20",
                      )}
                    >
                      <span className="block text-sm font-semibold text-white">{item.name}</span>
                      <span className="mt-1 block font-mono text-sm text-volt tabular-nums">
                        {item.price} USDT <span className="text-xs text-muted">/ mo</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Term Toggle */}
              <div>
                <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">2. Billing Cycle</p>
                <TermToggle term={term} onChange={setTerm} />
              </div>

              {/* Asset Selector */}
              <div>
                <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">3. Settlement Asset</p>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {ASSETS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={assetId === item.id}
                      onClick={() => setAssetId(item.id)}
                      className={cn(
                        "p-3 rounded-2xl border text-left transition-all",
                        assetId === item.id
                          ? "border-volt/60 bg-volt/[0.08] shadow-sm shadow-volt/10"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20",
                      )}
                    >
                      <span className="block text-sm font-semibold text-white">{item.label}</span>
                      <span className="block text-xs text-muted font-mono">{item.network}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Callsign / Anonymous Handle */}
              <div>
                <label htmlFor="callsign" className="text-xs uppercase tracking-wider text-muted font-semibold block mb-2">
                  4. Callsign (Private Workspace Handle)
                </label>
                <div className="relative">
                  <input
                    id="callsign"
                    value={name}
                    autoComplete="off"
                    placeholder={suggestion}
                    onChange={(event) => setName(event.target.value)}
                    className="h-12 w-full rounded-2xl border border-white/10 bg-black/40 px-4 text-sm font-mono text-white placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-volt"
                  />
                </div>

                <div className="mt-2.5 flex items-center gap-3 text-xs">
                  <button
                    type="button"
                    className="text-volt font-medium hover:underline flex items-center gap-1"
                    onClick={() => setName(suggestion)}
                  >
                    <span>Use &ldquo;{suggestion}&rdquo;</span>
                  </button>
                  <span className="text-muted/40">·</span>
                  <button
                    type="button"
                    className="text-muted hover:text-white flex items-center gap-1"
                    onClick={() => setSuggestion(suggestCallsign())}
                  >
                    <RefreshCw className="size-3" />
                    <span>Shuffle</span>
                  </button>
                </div>

                {invalid ? (
                  <p className="mt-2 text-xs text-red-400">Must be 3–16 letters or digits starting with a letter.</p>
                ) : (
                  <p className="mt-2 text-xs text-muted">
                    This callsign represents the entire account. No personal identity is linked or required.
                  </p>
                )}
              </div>

              <Button
                className="w-full sm:w-auto"
                size="lg"
                disabled={Boolean(invalid)}
                onClick={() => setStep("invoice")}
              >
                <span>Generate Sandbox Invoice</span>
                <ArrowRight className="size-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-volt">
                    Sandbox Settlement Node
                  </span>
                  <h2 className="mt-1 text-3xl font-semibold text-white tracking-tight">
                    {amount} {asset.label}
                  </h2>
                  <p className="text-xs text-muted mt-0.5">
                    {usd} USDT value on {asset.network} · Callsign: <span className="font-mono text-white font-medium">{cleaned}</span>
                  </p>
                </div>

                <span className="rounded-full bg-ios-green/15 text-ios-green border border-ios-green/30 px-3 py-1 text-xs font-semibold">
                  Quote Active
                </span>
              </div>

              {/* QR and Address Card */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-5 rounded-2xl bg-black/40 border border-white/5">
                <InvoiceQr value={`vela-sandbox:${asset.label}:${amount}:${asset.address}`} />

                <div className="min-w-0 flex-1 w-full">
                  <span className="text-xs uppercase tracking-wider text-muted font-semibold block">
                    Deposit Address ({asset.network})
                  </span>

                  <p className="mt-2 text-xs font-mono break-all text-white p-3 rounded-xl bg-white/[0.04] border border-white/10 select-all">
                    {asset.address}
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <Button variant="line" size="sm" onClick={() => void copyAddress()}>
                      {copied ? <Check className="size-3.5 text-ios-green" /> : <Copy className="size-3.5" />}
                      <span>{copied ? "Address Copied" : "Copy Address"}</span>
                    </Button>
                  </div>

                  <p className="mt-4 text-xs text-muted leading-relaxed">
                    Sandbox simulation: Click &ldquo;Confirm & Unlock Workspace&rdquo; below to simulate instantaneous on-chain confirmation.
                  </p>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Chain Verification</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {["Invoice Generated", "Tx Broadcasted", "Confirmations (1/1)", "Workspace Live"].map(
                    (label, index) => {
                      const done = index <= phase;
                      return (
                        <div
                          key={label}
                          className={cn(
                            "p-2.5 rounded-xl border text-center transition-all",
                            done
                              ? "bg-ios-green/10 border-ios-green/30 text-white"
                              : "bg-white/[0.01] border-white/5 text-muted",
                          )}
                        >
                          <span
                            className={cn(
                              "size-2 rounded-full inline-block mx-auto mb-1.5",
                              done ? "bg-ios-green" : "bg-muted/40",
                            )}
                          />
                          <p className="font-medium text-[11px] leading-tight">{label}</p>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button size="lg" disabled={watching} onClick={() => setWatching(true)}>
                  {watching ? "Broadcasting Confirmation..." : "Confirm & Unlock Workspace"}
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
                  Modify Tier
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="ios-glass rounded-3xl p-6 sm:p-7 border border-white/10 lg:col-span-4 shadow-xl">
          <p className="text-xs uppercase tracking-wider text-muted font-semibold">Workspace Summary</p>
          <p className="mt-2 text-2xl font-semibold text-white tracking-tight">{plan.name} Package</p>

          <dl className="mt-6 space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-line">
              <dt className="text-muted">Subscription Term</dt>
              <dd className="font-semibold text-white">{term === "year" ? "Annual (Save 15%)" : "30-Day Monthly"}</dd>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-line">
              <dt className="text-muted">Included Agent Seats</dt>
              <dd className="font-semibold text-white font-mono">{plan.seats} Seats</dd>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-line">
              <dt className="text-muted">Outbound Minute Pool</dt>
              <dd className="font-semibold text-white font-mono">{plan.minutes.toLocaleString()} Min</dd>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-line">
              <dt className="text-muted">Included Carrier DIDs</dt>
              <dd className="font-semibold text-white font-mono">{plan.dids} Numbers</dd>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-line">
              <dt className="text-muted">Private Tunnel Hubs</dt>
              <dd className="font-semibold text-white">12 Global Gateways</dd>
            </div>
            <div className="flex justify-between items-center py-3">
              <dt className="text-sm font-semibold text-white">Total Crypto Due</dt>
              <dd className="text-base font-semibold text-volt font-mono tabular-nums">
                {amount} {asset.label}
              </dd>
            </div>
          </dl>

          <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] text-muted leading-relaxed">
            <span className="font-semibold text-white block mb-1">Zero Identity Obligation</span>
            Vela workspaces do not require KYC. The generated callsign is the cryptographic key to your entire communication instance.
          </div>
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
          width: 280,
          color: { dark: "#000000", light: "#ffffff" },
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
    <div className="flex size-44 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-lg">
      {src ? (
        <img src={src} alt="Sandbox invoice QR code" className="size-full object-contain" />
      ) : (
        <span className="px-4 text-center text-xs text-black font-medium">Generating QR...</span>
      )}
    </div>
  );
}
