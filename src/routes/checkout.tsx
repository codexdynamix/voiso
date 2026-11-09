import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Phone,
  Monitor,
  Globe,
  LockKeyhole,
  ChevronDown,
  CircleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wrap } from "@/components/shell";
import { TermToggle } from "@/components/term-toggle";
import {
  cleanCallsign,
  DEDICATED_PLANS,
  DIDS,
  MACHINES,
  PLANS,
  planById,
  planAllows,
  PROTOCOLS,
  REGIONS,
  suggestCallsign,
  termPrice,
  VPS_PLANS,
  type PlanId,
  type Term,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";

const DEFAULT_MACHINES: Record<PlanId, string[]> = {
  relay: ["pool-1"],
  lattice: ["dx-04"],
  foundry: ["dx-04", "dx-09", "dx-12"],
};

const MACHINE_LABELS: Record<string, string> = {
  "pool-1": "Essential",
  "dx-04": "Standard",
  "dx-09": "Professional",
  "dx-12": "Ultimate",
};

const PHONE_COUNTRIES: Record<string, { name: string }> = {
  US: { name: "United States" },
  UK: { name: "United Kingdom" },
  DE: { name: "Germany" },
  NL: { name: "Netherlands" },
  SG: { name: "Singapore" },
  JP: { name: "Japan" },
  DK: { name: "Denmark" },
  NO: { name: "Norway" },
  SE: { name: "Sweden" },
  FI: { name: "Finland" },
  IS: { name: "Iceland" },
  AU: { name: "Australia" },
  CA: { name: "Canada" },
  BR: { name: "Brazil" },
  AE: { name: "United Arab Emirates" },
};

function CountryFlag({ country }: { country: string }) {
  let design: ReactNode;
  switch (country) {
    case "US":
      design = (
        <>
          {Array.from({ length: 7 }, (_, index) => (
            <rect key={index} y={index * 2.77} width="40" height="1.38" fill={index % 2 ? "#fff" : "#c83b4b"} />
          ))}
          <rect width="17" height="11" fill="#294477" />
          <path d="M2 2h1m3 0h1m3 0h1m3 0h1M3.5 4.5h1m3 0h1m3 0h1m3 0h1M2 7h1m3 0h1m3 0h1m3 0h1M3.5 9.5h1m3 0h1m3 0h1m3 0h1" stroke="#fff" strokeWidth="1" />
        </>
      );
      break;
    case "UK":
      design = (
        <>
          <rect width="40" height="24" fill="#294477" />
          <path d="m0 0 40 24M40 0 0 24" stroke="#fff" strokeWidth="5" />
          <path d="m0 0 40 24M40 0 0 24" stroke="#c83b4b" strokeWidth="2" />
          <path d="M20 0v24M0 12h40" stroke="#fff" strokeWidth="8" />
          <path d="M20 0v24M0 12h40" stroke="#c83b4b" strokeWidth="4" />
        </>
      );
      break;
    case "DE":
      design = <><rect width="40" height="8" fill="#222" /><rect y="8" width="40" height="8" fill="#c83b4b" /><rect y="16" width="40" height="8" fill="#e7b642" /></>;
      break;
    case "NL":
      design = <><rect width="40" height="8" fill="#c83b4b" /><rect y="8" width="40" height="8" fill="#fff" /><rect y="16" width="40" height="8" fill="#294477" /></>;
      break;
    case "SG":
      design = <><rect width="40" height="12" fill="#c83b4b" /><rect y="12" width="40" height="12" fill="#fff" /><circle cx="10" cy="6" r="3.6" fill="#fff" /><circle cx="11.5" cy="5.3" r="3" fill="#c83b4b" /><path d="m17 2.3.8 1.6 1.8.2-1.3 1.2.3 1.8-1.6-.9-1.6.9.3-1.8-1.3-1.2 1.8-.2z" fill="#fff" /></>;
      break;
    case "JP":
      design = <><rect width="40" height="24" fill="#fff" /><circle cx="20" cy="12" r="6.5" fill="#bc3446" /></>;
      break;
    case "DK":
      design = <><rect width="40" height="24" fill="#c83b4b" /><path d="M12 0v24M0 12h40" stroke="#fff" strokeWidth="3" /></>;
      break;
    case "NO":
      design = <><rect width="40" height="24" fill="#c83b4b" /><path d="M12 0v24M0 12h40" stroke="#fff" strokeWidth="6" /><path d="M12 0v24M0 12h40" stroke="#294477" strokeWidth="2.5" /></>;
      break;
    case "SE":
      design = <><rect width="40" height="24" fill="#2874ae" /><path d="M12 0v24M0 12h40" stroke="#f3cf54" strokeWidth="3" /></>;
      break;
    case "FI":
      design = <><rect width="40" height="24" fill="#fff" /><path d="M12 0v24M0 12h40" stroke="#28629a" strokeWidth="4" /></>;
      break;
    case "IS":
      design = <><rect width="40" height="24" fill="#294477" /><path d="M12 0v24M0 12h40" stroke="#fff" strokeWidth="6" /><path d="M12 0v24M0 12h40" stroke="#c83b4b" strokeWidth="2.5" /></>;
      break;
    case "AU":
      design = (
        <>
          <rect width="40" height="24" fill="#294477" />
          <path d="M0 0 20 12M20 0 0 12" stroke="#fff" strokeWidth="3" />
          <path d="M0 0 20 12M20 0 0 12" stroke="#c83b4b" strokeWidth="1.2" />
          <path d="M10 0v12M0 6h20" stroke="#fff" strokeWidth="4" />
          <path d="M10 0v12M0 6h20" stroke="#c83b4b" strokeWidth="1.8" />
          <path d="m29 5 .8 1.8 2-.8-.8 2 .8 2-2-.8-.8 1.8-.8-1.8-2 .8.8-2-.8-2 2 .8zM23 16l.6 1.3 1.4-.5-.5 1.4.5 1.4-1.4-.6-.6 1.3-.6-1.3-1.4.6.5-1.4-.5-1.4 1.4.5zM33 16l.6 1.3 1.4-.5-.5 1.4.5 1.4-1.4-.6-.6 1.3-.6-1.3-1.4.6.5-1.4-.5-1.4 1.4.5z" fill="#fff" />
        </>
      );
      break;
    case "CA":
      design = (
        <>
          <rect width="40" height="24" fill="#fff" />
          <rect width="10" height="24" fill="#c83b4b" />
          <rect x="30" width="10" height="24" fill="#c83b4b" />
          <path d="m20 4 1.8 4 2.6-.8-1.1 3.2 2.8 2-3.5.8.6 3.8-2.6-1.8-2.6 1.8.6-3.8-3.5-.8 2.8-2-1.1-3.2 2.6.8z" fill="#c83b4b" />
        </>
      );
      break;
    case "BR":
      design = <><rect width="40" height="24" fill="#218453" /><path d="m20 3 16 9-16 9L4 12z" fill="#f3cf54" /><circle cx="20" cy="12" r="5.1" fill="#31518a" /><path d="M15.5 10.5q4-1 8.8 1" fill="none" stroke="#fff" strokeWidth="1" /></>;
      break;
    case "AE":
      design = <><rect x="10" width="30" height="8" fill="#218453" /><rect x="10" y="8" width="30" height="8" fill="#fff" /><rect x="10" y="16" width="30" height="8" fill="#222" /><rect width="10" height="24" fill="#c83b4b" /></>;
      break;
    default:
      design = <><rect width="40" height="24" fill="#e7edf3" /><circle cx="20" cy="12" r="7" fill="#94a3b8" /></>;
  }

  return (
    <svg viewBox="0 0 40 24" role="img" aria-label={`${PHONE_COUNTRIES[country]?.name ?? country} flag`} className="h-6 w-10 shrink-0 overflow-hidden rounded-md border border-slate-900/10 shadow-sm">
      {design}
    </svg>
  );
}

function readPlan(value: unknown): PlanId {
  if (value === "relay" || value === "lattice" || value === "foundry") return value;
  return "lattice";
}

function readTerm(value: unknown): Term {
  return value === "year" ? "year" : "month";
}

function readPhones(value: unknown) {
  const values = Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
  const valid = [...new Set(values.filter(
    (id): id is string => typeof id === "string" && DIDS.some((did) => did.id === id),
  ))];
  return valid.length ? valid.slice(0, 1) : undefined;
}

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>) => {
    const phones = readPhones(search.phones);
    return {
      plan: readPlan(search.plan),
      term: readTerm(search.term),
      ...(phones ? { phones } : {}),
    };
  },
  head: () => ({
    meta: [
      { title: "Configure an Order — Vela Communications Cloud" },
      { name: "description", content: "Review phone number, RDP, VPS, and workspace options in the Vela product preview." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const search = Route.useSearch();
  const [regionId, setRegion] = useState("fra");
  const [protocol, setProtocol] = useState("wg");
  const [planId, setPlanId] = useState<PlanId>(search.plan);
  const [term, setTerm] = useState<Term>(search.term);
  const [selectedDids, setSelectedDids] = useState<string[]>(
    search.phones?.length ? search.phones : [DIDS[0].id],
  );
  const [selectedMachines, setSelectedMachines] = useState<string[]>(DEFAULT_MACHINES[search.plan]);
  const [selectedVpsId, setSelectedVpsId] = useState<string | null>(null);
  const [selectedDedicatedId, setSelectedDedicatedId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [suggestion, setSuggestion] = useState("north-lark");
  const [step, setStep] = useState<"draft" | "review">("draft");

  useEffect(() => {
    setSuggestion(suggestCallsign());
  }, []);

  const plan = planById(planId);
  const selectedVps = VPS_PLANS.find((item) => item.id === selectedVpsId);
  const selectedDedicated = DEDICATED_PLANS.find((item) => item.id === selectedDedicatedId);
  const serverMonthlyTotal = (selectedVps?.price ?? 0) + (selectedDedicated?.price ?? 0);
  const monthlyTotal = plan.price + serverMonthlyTotal;
  const total = termPrice(monthlyTotal, term);
  const cleaned = name.trim() ? cleanCallsign(name) : suggestion;
  const invalid = name.trim().length > 0 && !cleanCallsign(name);
  const machineLimit = planId === "foundry" ? 3 : 1;

  function changePlan(nextPlanId: PlanId) {
    setPlanId(nextPlanId);
    setSelectedDids((current) => [current[0] ?? DIDS[0].id]);
    setSelectedMachines(DEFAULT_MACHINES[nextPlanId]);
  }

  function changeDidRegion(id: string) {
    setSelectedDids([id]);
  }

  function toggleMachine(id: string) {
    setSelectedMachines((current) => {
      if (current.includes(id)) {
        return current.length > 1 ? current.filter((selected) => selected !== id) : current;
      }
      if (current.length >= machineLimit) return current;
      return [...current, id];
    });
  }

  return (
    <Wrap className="py-10 md:py-16">
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs text-muted backdrop-blur-md mb-3">
          <ShieldCheck className="size-3.5 text-ios-green" />
          <span className="font-semibold text-white">Service order builder · Preview only</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Configure phone numbers, RDP, and workspace services
        </h1>
        <p className="mt-2 text-sm text-muted">
          Compare options and review an itemized estimate. The phone numbers
          and server plans shown are examples, not live inventory. Payment,
          carrier ordering, and RDP provisioning are not connected, so this
          preview cannot place or charge an order.
        </p>
      </div>

      {step === "draft" && (
        <nav
          aria-label="Configure services"
          className="sticky top-[76px] z-30 mb-6 -mx-4 border-y border-slate-200/80 bg-white/95 px-4 py-2 shadow-sm backdrop-blur-xl sm:top-[84px] sm:mx-0 sm:rounded-2xl sm:border sm:px-2"
        >
          <div className="flex gap-1 overflow-x-auto sm:justify-between">
            {[
              ["workspace", "Workspace"],
              ["phones", "Phone region"],
              ["rdp", "RDP desktops"],
              ["vps", "VPS plans"],
              ["dedicated", "Dedicated servers"],
              ["tunnel", "Secure tunnel"],
            ].map(([id, label], index) => (
              <a
                key={id}
                href={`#${id}`}
                className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-blue-50 hover:text-[#1264d8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1264d8] sm:px-4"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-slate-100 text-[10px] text-slate-500">{index + 1}</span>
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Main Form or Invoice */}
        <div className="ios-glass rounded-3xl p-6 sm:p-8 border border-white/10 lg:col-span-12 shadow-2xl">
          {step === "draft" ? (
            <div className="space-y-8">
              {/* Plan Picker */}
              <div id="workspace" className="scroll-mt-36">
                <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">1. Select example tier</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  {PLANS.map((item) => {
                    const selected = planId === item.id;
                    return (
                      <article
                        key={item.id}
                        className={cn(
                          "flex min-w-0 flex-col rounded-2xl border bg-white p-4 transition-all",
                          selected
                            ? "border-volt ring-2 ring-volt/15 shadow-md shadow-volt/10"
                            : "border-slate-200 hover:border-volt/40 hover:shadow-sm",
                        )}
                      >
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.name}</span>
                        <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                          ${item.price}<span className="ml-1 text-xs font-medium text-slate-500">USD/mo · example</span>
                        </p>
                        <ul className="mt-4 flex-1 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700">
                          {item.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          aria-pressed={selected}
                          onClick={() => changePlan(item.id)}
                          className={cn(
                            "mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-xl px-3 text-xs font-semibold transition-colors",
                            selected
                              ? "bg-emerald-600 text-white hover:bg-emerald-700"
                              : "bg-[#c44712] text-white hover:bg-[#a93b0d]",
                          )}
                        >
                          {selected ? "Selected" : `Choose ${item.name}`}
                        </button>
                      </article>
                    );
                  })}
                </div>
              </div>

              <section className="space-y-7 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <div id="phones" className="scroll-mt-36">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Phone className="size-4 text-volt" />
                        Choose a phone region
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        Choose a requested region. Your {plan.name} plan includes up to {plan.dids} numbers; specific numbers and coverage require carrier confirmation.
                      </p>
                    </div>
                  </div>
                  {(() => {
                    const did = DIDS.find((item) => item.id === selectedDids[0]) ?? DIDS[0];
                    const country = PHONE_COUNTRIES[did.country];
                    return (
                      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-2">
                        <div className="flex items-center gap-2">
                          <details className="group relative min-w-0 flex-1">
                            <summary
                              aria-label={`Choose primary phone region, currently ${country?.name ?? did.country}`}
                              className="flex min-h-14 cursor-pointer list-none items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt [&::-webkit-details-marker]:hidden"
                            >
                              <CountryFlag country={did.country} />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-semibold text-fg">{country?.name ?? did.country}</span>
                                <span className="mt-0.5 block truncate text-xs text-muted">{did.city} · {did.id}</span>
                              </span>
                              <ChevronDown className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10">
                              {DIDS.map((option) => {
                                const optionCountry = PHONE_COUNTRIES[option.country];
                                return (
                                  <button
                                    key={option.id}
                                    type="button"
                                    onClick={(event) => {
                                      changeDidRegion(option.id);
                                      event.currentTarget.closest("details")?.removeAttribute("open");
                                    }}
                                    className={cn(
                                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt",
                                      option.id === did.id && "bg-blue-50/70",
                                    )}
                                  >
                                    <CountryFlag country={option.country} />
                                    <span className="min-w-0 flex-1">
                                      <span className="block truncate text-sm font-semibold text-slate-800">{optionCountry?.name ?? option.country}</span>
                                      <span className="mt-0.5 block truncate text-xs text-slate-500">{option.city} · {option.id}</span>
                                      </span>
                                      <span className="shrink-0 text-right text-xs font-semibold text-emerald-700">Included</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </details>
                            <span className="shrink-0 px-2 text-right text-xs font-semibold text-ios-green">Included</span>
                          </div>
                      </div>
                    );
                  })()}
                </div>

                <div id="rdp" className="scroll-mt-36 border-t border-white/10 pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Monitor className="size-4 text-volt" />
                        Select required RDP desktop(s)
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        RDP is required for every agent in this workflow. Compare the preview desktop specs; the workspace tier includes up to {machineLimit} desktop{machineLimit === 1 ? "" : "s"}.
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-muted">
                      {selectedMachines.length} / {machineLimit}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {MACHINES.map((machine) => {
                      const selected = selectedMachines.includes(machine.id);
                      const available = planAllows(plan.id, machine.min);
                      const atLimit = selectedMachines.length >= machineLimit;
                      return (
                        <article
                          key={machine.id}
                          className={cn(
                            "flex min-w-0 flex-col rounded-2xl border bg-white p-4 transition-all",
                            selected
                              ? "border-volt ring-2 ring-volt/15 shadow-md shadow-volt/10"
                              : "border-slate-200 hover:border-volt/40 hover:shadow-sm",
                          )}
                        >
                          <div className="flex min-h-8 items-start justify-between gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                              {MACHINE_LABELS[machine.id]}
                            </span>
                            {selected && (
                              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                                Selected
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            {planById(machine.min).price}
                            <span className="ml-1 text-xs font-medium text-slate-500">USD/mo · example</span>
                          </p>
                          <p className="mt-1 text-[11px] text-slate-500">
                            Included with {planById(machine.min).name}
                          </p>
                          <ul className="mt-4 flex-1 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700">
                            {[machine.os, machine.cpu, `${machine.ram} memory`, `${machine.disk} storage`].map((feature) => (
                              <li key={feature} className="flex items-start gap-2">
                                <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <button
                            type="button"
                            aria-pressed={selected}
                            disabled={available && !selected && atLimit}
                            onClick={() => {
                              if (available) toggleMachine(machine.id);
                              else changePlan(machine.min);
                            }}
                            className={cn(
                              "mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-xl px-3 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                              selected
                                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                : available
                                  ? "bg-[#c44712] text-white hover:bg-[#a93b0d]"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                            )}
                          >
                            {selected ? "Selected" : available ? "Choose RDP" : `Upgrade to ${planById(machine.min).name}`}
                          </button>
                        </article>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-[11px] text-muted">
                    Example bundle pricing only. No desktop is reserved or provisioned from this preview.
                  </p>
                </div>

                <div id="vps" className="scroll-mt-36 border-t border-white/10 pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Monitor className="size-4 text-volt" />
                        Add a VPS
                      </p>
                      <p className="mt-1 text-xs text-muted">Optional example USA VPS plans. Their illustrative monthly rates are not provider quotes.</p>
                    </div>
                    {selectedVps && (
                      <button type="button" onClick={() => setSelectedVpsId(null)} className="shrink-0 text-xs font-medium text-muted hover:text-white">
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {VPS_PLANS.map((item) => {
                      const selected = selectedVpsId === item.id;
                      return (
                        <article key={item.id} className={cn(
                          "flex min-w-0 flex-col rounded-2xl border bg-white p-4 transition-all",
                          selected ? "border-volt ring-2 ring-volt/15 shadow-md shadow-volt/10" : "border-slate-200 hover:border-volt/40 hover:shadow-sm",
                        )}>
                          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.name}</span>
                          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            ${item.price}<span className="ml-1 text-xs font-medium text-slate-500">USD/mo · example</span>
                          </p>
                          <ul className="mt-4 flex-1 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700">
                            {item.specs.map((feature) => (
                              <li key={feature} className="flex items-start gap-2">
                                <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <button
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setSelectedVpsId(selected ? null : item.id)}
                            className={cn(
                              "mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-xl px-3 text-xs font-semibold transition-colors",
                              selected ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-[#c44712] text-white hover:bg-[#a93b0d]",
                            )}
                          >
                            {selected ? "Selected" : "Choose VPS"}
                          </button>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <div id="dedicated" className="scroll-mt-36 border-t border-white/10 pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-white">
                        <Monitor className="size-4 text-volt" />
                        Add a dedicated server
                      </p>
                      <p className="mt-1 text-xs text-muted">Optional example Chicago server plans. Their illustrative monthly rates are not provider quotes.</p>
                    </div>
                    {selectedDedicated && (
                      <button type="button" onClick={() => setSelectedDedicatedId(null)} className="shrink-0 text-xs font-medium text-muted hover:text-white">
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {DEDICATED_PLANS.map((item) => {
                      const selected = selectedDedicatedId === item.id;
                      return (
                        <article key={item.id} className={cn(
                          "flex min-w-0 flex-col rounded-2xl border bg-white p-4 transition-all",
                          selected ? "border-volt ring-2 ring-volt/15 shadow-md shadow-volt/10" : "border-slate-200 hover:border-volt/40 hover:shadow-sm",
                        )}>
                          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.name}</span>
                          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            ${item.price}<span className="ml-1 text-xs font-medium text-slate-500">USD/mo · example</span>
                          </p>
                          <ul className="mt-4 flex-1 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700">
                            {item.specs.map((feature) => (
                              <li key={feature} className="flex items-start gap-2">
                                <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <button
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setSelectedDedicatedId(selected ? null : item.id)}
                            className={cn(
                              "mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-xl px-3 text-xs font-semibold transition-colors",
                              selected ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-[#c44712] text-white hover:bg-[#a93b0d]",
                            )}
                          >
                            {selected ? "Selected" : "Choose server"}
                          </button>
                        </article>
                      );
                    })}
                  </div>
                </div>

                <div id="tunnel" className="scroll-mt-36 border-t border-white/10 pt-6">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white">
                    <LockKeyhole className="size-4 text-volt" />
                    Configure secure tunnel
                  </p>
                  <p className="mt-1 text-xs text-muted">Select an example protocol and region. No VPN provider or live tunnel is connected.</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <label className="text-xs font-medium text-muted">
                      Protocol
                      <select
                        value={protocol}
                        onChange={(event) => {
                          const selected = PROTOCOLS.find((item) => item.id === event.target.value);
                          if (selected) setProtocol(selected.id);
                        }}
                        className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white px-3 text-sm text-fg focus:outline-none focus:ring-1 focus:ring-volt"
                      >
                        {PROTOCOLS.map((item) => (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="text-xs font-medium text-muted">
                      Exit region
                      <select
                        value={regionId}
                        onChange={(event) => setRegion(event.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-white/10 bg-white px-3 text-sm text-fg focus:outline-none focus:ring-1 focus:ring-volt"
                      >
                        {REGIONS.map((region) => (
                          <option key={region.id} value={region.id}>{region.city} · {region.ms} ms</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] text-ios-green">
                    <Globe className="size-3.5" /> Example tunnel preference · no live service
                  </p>
                </div>
              </section>

              {/* Term Toggle */}
              <div>
                <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">3. Billing term</p>
                <TermToggle term={term} onChange={setTerm} />
              </div>

              {/* Callsign / Anonymous Handle */}
              <div>
                <label htmlFor="callsign" className="text-xs uppercase tracking-wider text-muted font-semibold block mb-2">
                  4. Preview workspace label (optional)
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
                    Used only to label this local preview; it does not create an account.
                  </p>
                )}
              </div>

              <Button
                className="w-full sm:w-auto"
                size="lg"
                disabled={Boolean(invalid)}
                onClick={() => setStep("review")}
              >
                <span>Review order</span>
                <ArrowRight className="size-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-b border-line pb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-volt">
                  Order review · Not submitted
                </span>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                  {plan.name} · {term === "year" ? "Annual" : "Monthly"}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Preview estimate: ${total.toLocaleString()} USD-equivalent
                  {term === "year" ? " per year" : " per month"}.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-950">
                <div className="flex items-start gap-3">
                  <CircleAlert className="mt-0.5 size-5 shrink-0 text-amber-700" />
                  <div>
                    <h3 className="font-semibold text-amber-950">
                      Checkout is not connected yet
                    </h3>
                    <p className="mt-2 leading-relaxed">
                      This review does not place an order, charge a payment
                      method, reserve a phone number, or provision an RDP
                      desktop. There is no live payment confirmation in this
                      preview. Do not send funds to any address shown elsewhere
                      in sample content.
                    </p>
                    <p className="mt-3 leading-relaxed">
                      Live ordering requires a payment processor with verified
                      payment webhooks, a phone-number carrier, and an RDP
                      provider connected to the order system.
                    </p>
                  </div>
                </div>
              </div>

              <dl className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Workspace label</dt>
                  <dd className="font-mono font-medium text-white">{cleaned}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Phone region request</dt>
                  <dd className="text-right font-medium text-white">
                    {DIDS.find((item) => item.id === selectedDids[0])?.city ?? "Not selected"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">RDP desktops requested</dt>
                  <dd className="text-right font-medium text-white">
                    {selectedMachines.length} · {selectedMachines.map((id) => MACHINE_LABELS[id]).join(", ")}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-white/10 pt-3">
                  <dt className="font-semibold text-white">Estimated recurring total</dt>
                  <dd className="font-semibold text-volt">
                    ${total.toLocaleString()} USD-equivalent
                    {term === "year" ? "/yr" : "/mo"}
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button size="lg" disabled aria-describedby="checkout-unavailable">
                  Checkout unavailable
                </Button>
                <Button variant="line" size="lg" onClick={() => setStep("draft")}>
                  Edit order
                </Button>
              </div>
              <p id="checkout-unavailable" className="text-xs text-muted">
                Payment cannot be started because no payment processor or
                fulfillment providers are connected.
              </p>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="ios-glass rounded-3xl p-6 sm:p-7 border border-white/10 lg:col-span-12 shadow-xl">
          <p className="text-xs uppercase tracking-wider text-muted font-semibold">Example order estimate</p>
          <p className="mt-2 text-2xl font-semibold text-white tracking-tight">{plan.name} example bundle</p>

          <dl className="mt-5 grid gap-x-8 gap-y-3 text-xs sm:grid-cols-2 xl:grid-cols-3">
            <div className="flex justify-between items-center py-2 border-b border-line">
            <dt className="text-muted">Workspace tier</dt>
            <dd className="font-semibold text-white">${plan.price} USD / mo · example</dd>
            </div>
            {selectedVps && (
            <div className="flex justify-between items-center py-2 border-b border-line">
              <dt className="text-muted">VPS · {selectedVps.name}</dt>
              <dd className="font-semibold text-white">${selectedVps.price} USD / mo · example</dd>
            </div>
            )}
            {selectedDedicated && (
            <div className="flex justify-between items-center py-2 border-b border-line">
              <dt className="text-muted">Dedicated · {selectedDedicated.name}</dt>
              <dd className="font-semibold text-white">${selectedDedicated.price} USD / mo · example</dd>
            </div>
            )}
            <div className="flex justify-between items-center py-2 border-b border-line">
              <dt className="text-muted">Example phone allowance</dt>
              <dd className="font-semibold text-white font-mono">{plan.dids}</dd>
            </div>
            <div className="flex justify-between gap-3 text-[11px]">
              <dt className="min-w-0 truncate text-muted">
                Primary line · {DIDS.find((item) => item.id === selectedDids[0])?.city} · {selectedDids[0]}
              </dt>
              <dd className="shrink-0 font-semibold text-amber-200">Not reserved</dd>
            </div>
          <div className="flex justify-between items-center py-2 border-b border-line">
            <dt className="text-muted">Selected RDP desktops</dt>
            <dd className="font-semibold text-white font-mono">{selectedMachines.length} requested · example</dd>
          </div>
          {selectedMachines.map((id) => {
            const machine = MACHINES.find((item) => item.id === id);
            return machine ? (
              <div key={id} className="flex justify-between gap-3 text-[11px]">
                <dt className="min-w-0 truncate text-muted">{machine.name} · {machine.cpu} / {machine.ram}</dt>
                <dd className="shrink-0 font-semibold text-amber-200">Not provisioned</dd>
              </div>
            ) : null;
          })}
          <div className="flex justify-between items-center py-2 border-b border-line">
            <dt className="text-muted">Example tunnel preference</dt>
            <dd className="font-semibold text-white">{PROTOCOLS.find((item) => item.id === protocol)?.name} · {REGIONS.find((item) => item.id === regionId)?.city}</dd>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-line">
            <dt className="text-muted">Example agent allowance · {plan.seats}</dt>
            <dd className="font-semibold text-amber-200">Not ordered</dd>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-line">
            <dt className="text-muted">Example minute allowance · {plan.minutes.toLocaleString()}</dt>
            <dd className="font-semibold text-amber-200">Not ordered</dd>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-line">
            <dt className="text-muted">Recurring subtotal (estimate)</dt>
            <dd className="font-semibold text-white">${monthlyTotal.toLocaleString()} USD-equivalent / mo</dd>
          </div>
          {term === "year" && (
            <div className="flex justify-between items-center py-2 border-b border-line">
              <dt className="text-muted">Annual estimate · example 15% adjustment</dt>
              <dd className="font-semibold text-ios-green">${total.toLocaleString()} USD-equivalent / yr</dd>
            </div>
          )}
          <div className="flex justify-between items-center py-2 border-b border-line">
            <dt className="text-muted">Subscription Term</dt>
            <dd className="font-semibold text-white">{term === "year" ? "Annual estimate" : "Monthly estimate"}</dd>
          </div>
          <div className="flex justify-between items-center py-3">
            <dt className="text-sm font-semibold text-white">{term === "year" ? "Annual total" : "Monthly total"} <span className="text-xs font-normal text-muted">(USD equivalent)</span></dt>
              <dd className="text-base font-semibold text-volt font-mono tabular-nums">
                ${total.toLocaleString()} USD-equivalent
              </dd>
            </div>
          </dl>

          <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] text-muted leading-relaxed">
            <span className="font-semibold text-white block mb-1">Illustrative estimate only</span>
            Pricing, number availability, verification requirements, and
            provisioning times must be confirmed by the service providers.
          </div>
        </aside>
      </div>
    </Wrap>
  );
}
