import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Monitor, ShieldCheck, Terminal as TerminalIcon, FileText, Check } from "lucide-react";
import {
  effectivePlanId,
  machineById,
  MACHINES,
  planAllows,
  planById,
  regionById,
  tunnelAddress,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { formatClock } from "@/lib/format";
import { useHydrated, useVela } from "@/lib/store";
import { Button } from "@/components/ui/button";

const FILES = [
  {
    name: "Calls.csv",
    body: "peer,seconds,result\n+1 212 555 0174,18,human\n+1 415 555 0138,0,machine\n+44 20 7946 0123,0,no-answer\n",
  },
  {
    name: "Routes.conf",
    body: "gateway = locked\nclipboard = local\nwipe = on-cancel\nencryption = chacha20poly1305\n",
  },
  {
    name: "Scratchpad.txt",
    body: "Session notes stay in browser memory until disconnect.\nNo disk snapshots are preserved upon workspace reset.\n",
  },
];

type Line = { kind: "in" | "out"; text: string };

export function DeskPanel() {
  const machineId = useVela((state) => state.machineId);
  const deskOpen = useVela((state) => state.deskOpen);
  const planId = useVela((state) => state.planId);
  const active = useVela((state) => state.active);
  const callsign = useVela((state) => state.callsign);
  const vpnOn = useVela((state) => state.vpnOn);
  const regionId = useVela((state) => state.regionId);
  const setMachine = useVela((state) => state.setMachine);
  const setDeskOpen = useVela((state) => state.setDeskOpen);
  const plan = planById(effectivePlanId(planId, active));
  const machine = machineById(machineId);

  if (!deskOpen) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {MACHINES.map((item) => {
          const allowed = planAllows(plan.id, item.min);
          const selected = item.id === machineId;
          return (
            <article
              key={item.id}
              className={cn(
                "ios-glass flex flex-col justify-between rounded-3xl p-6 border transition-all duration-200",
                selected ? "border-volt/60 bg-volt/[0.04] shadow-xl shadow-volt/10" : "border-white/10 hover:border-white/20",
              )}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-muted">
                    {item.os} Instance
                  </span>
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-mono text-muted">
                    {item.id}
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-semibold text-white tracking-tight">{item.name}</h2>
                <p className="mt-1 text-xs text-muted leading-relaxed">{item.note}</p>

                <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-black/40 border border-white/5 p-3 text-center">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-muted block">Compute</span>
                    <span className="text-sm font-semibold text-white mt-0.5 block">{item.cpu}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-muted block">Memory</span>
                    <span className="text-sm font-semibold text-white mt-0.5 block">{item.ram}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-muted block">NVMe Disk</span>
                    <span className="text-sm font-semibold text-white mt-0.5 block">{item.disk}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                <span className="text-xs text-muted flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-ios-green" />
                  Wipe on cancel
                </span>

                {allowed ? (
                  <Button
                    size="sm"
                    onClick={() => {
                      setMachine(item.id);
                      setDeskOpen(true);
                    }}
                  >
                    <Monitor className="size-3.5" />
                    <span>Launch Desk</span>
                  </Button>
                ) : (
                  <Link to="/pricing" className="text-xs font-semibold text-volt hover:underline">
                    Included with Foundry
                  </Link>
                )}
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <Desktop
      name={machine.name}
      spec={`${machine.cpu} · ${machine.ram}`}
      callsign={callsign || "guest"}
      address={vpnOn ? tunnelAddress(regionId) : "direct"}
      region={regionById(regionId).city}
      planName={plan.name}
      onClose={() => setDeskOpen(false)}
    />
  );
}

function Desktop({
  name,
  spec,
  callsign,
  address,
  region,
  planName,
  onClose,
}: {
  name: string;
  spec: string;
  callsign: string;
  address: string;
  region: string;
  planName: string;
  onClose: () => void;
}) {
  const hydrated = useHydrated();
  const [clock, setClock] = useState("--:--");
  const [file, setFile] = useState(FILES[2].name);
  const [notes, setNotes] = useState(FILES[2].body);
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: `${name} active on isolated gateway. Type 'help' for diagnostics.` },
  ]);
  const [command, setCommand] = useState("");

  useEffect(() => {
    if (!hydrated) return;
    const tick = () => setClock(formatClock(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [hydrated]);

  function openFile(next: string) {
    const found = FILES.find((item) => item.name === next);
    setFile(next);
    if (found) setNotes(found.body);
  }

  function run(event: FormEvent) {
    event.preventDefault();
    const raw = command.trim();
    if (!raw) return;
    const verb = raw.toLowerCase();
    let output = `command not found: ${raw}`;
    if (verb === "help") output = "whoami · ip · status · clear · ping";
    if (verb === "whoami") output = `callsign: ${callsign} (anonymous session)`;
    if (verb === "ip")
      output =
        address === "direct"
          ? `gateway: direct · exit via ${region}`
          : `encrypted tunnel address: ${address} via ${region}`;
    if (verb === "status") output = `${name} · ${planName} · ${spec} · crypto verified`;
    if (verb === "ping") output = "64 bytes from 10.8.4.1: icmp_seq=1 ttl=64 time=14.2 ms";
    if (verb === "clear") {
      setLines([]);
      setCommand("");
      return;
    }
    setLines((current) =>
      [...current, { kind: "in" as const, text: raw }, { kind: "out" as const, text: output }].slice(-14),
    );
    setCommand("");
  }

  return (
    <div className="ios-glass rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
      {/* Top Window Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5 bg-black/40 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-red-500/80" />
            <span className="size-3 rounded-full bg-amber-500/80" />
            <span className="size-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-semibold text-white">
            {name} <span className="text-muted font-normal">({spec})</span>
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-muted">
          <span>{callsign}</span>
          <span>·</span>
          <span className="tabular-nums text-white">{clock}</span>
        </div>
      </div>

      {/* Main Workspace Stage */}
      <div className="desk-wallpaper p-4 md:p-6 grid gap-4">
        {/* Document Tab Pills */}
        <div className="flex flex-wrap gap-2">
          {FILES.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => openFile(item.name)}
              className={cn(
                "h-8 rounded-lg px-3 text-xs font-medium flex items-center gap-1.5 transition-all",
                file === item.name
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "bg-white/[0.06] text-muted hover:text-white border border-white/5",
              )}
            >
              <FileText className="size-3" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        {/* 2-Column Desktop Editor & Terminal */}
        <div className="grid gap-4 lg:grid-cols-5">
          {/* Notes Workspace */}
          <div className="rounded-2xl border border-white/10 bg-black/50 p-4 lg:col-span-3 flex flex-col min-h-64">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-muted">
              <span>{file}</span>
              <span className="text-[11px] text-ios-green flex items-center gap-1">
                <Check className="size-3" />
                Local Memory Only
              </span>
            </div>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="flex-1 mt-3 resize-none bg-transparent font-mono text-xs text-fg outline-none leading-relaxed"
              aria-label="Desk notes"
            />
          </div>

          {/* Secure Interactive Terminal */}
          <div className="rounded-2xl border border-white/10 bg-black/80 p-4 lg:col-span-2 flex flex-col min-h-64 justify-between">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs text-muted">
                <span className="flex items-center gap-1.5 font-medium text-white">
                  <TerminalIcon className="size-3 text-volt" />
                  Terminal
                </span>
                <span className="font-mono text-[10px] text-muted">sh-v5</span>
              </div>

              <div className="mt-3 space-y-1.5 font-mono text-xs overflow-y-auto max-h-48 pr-1">
                {lines.map((line, idx) => (
                  <p
                    key={idx}
                    className={cn(
                      line.kind === "in" ? "text-volt font-semibold" : "text-fg/80",
                    )}
                  >
                    {line.kind === "in" ? `› ${line.text}` : line.text}
                  </p>
                ))}
              </div>
            </div>

            <form onSubmit={run} className="mt-3 flex items-center gap-2 border-t border-white/10 pt-2">
              <span className="text-volt font-mono text-xs font-bold">›</span>
              <input
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                placeholder="type help..."
                className="h-8 flex-1 bg-transparent font-mono text-xs text-white outline-none placeholder:text-muted/50"
              />
              <button
                type="submit"
                className="text-xs font-semibold text-volt px-2.5 py-1 rounded-md hover:bg-white/5"
              >
                Run
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Session Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3 bg-black/40 text-xs">
        <p className="text-muted">
          Secure sandbox. Clipboard isolated to browser session. Machine wiped upon termination.
        </p>
        <Button variant="line" size="sm" onClick={onClose}>
          Disconnect Session
        </Button>
      </div>
    </div>
  );
}
