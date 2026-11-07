import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
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
    body: "gateway = locked\nclipboard = local\nwipe = on-cancel\n",
  },
  {
    name: "Scratch.txt",
    body: "Notes stay in this browser until you disconnect.\n",
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
      <div className="grid gap-4 md:grid-cols-2">
        {MACHINES.map((item) => {
          const allowed = planAllows(plan.id, item.min);
          const selected = item.id === machineId;
          return (
            <article
              key={item.id}
              className={cn("flex flex-col rounded-lg border p-5", selected ? "border-volt bg-raised" : "border-line bg-bg")}
            >
              <p className="text-xs uppercase tracking-widest text-faint">{item.os}</p>
              <h2 className="mt-2 font-display text-3xl font-medium">{item.name}</h2>
              <p className="mt-2 text-sm text-muted">{item.note}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-sm">
                <div>
                  <dt className="text-faint">CPU</dt>
                  <dd>{item.cpu}</dd>
                </div>
                <div>
                  <dt className="text-faint">RAM</dt>
                  <dd>{item.ram}</dd>
                </div>
                <div>
                  <dt className="text-faint">Disk</dt>
                  <dd>{item.disk}</dd>
                </div>
              </dl>
              <div className="mt-5">
                {allowed ? (
                  <Button
                    onClick={() => {
                      setMachine(item.id);
                      setDeskOpen(true);
                    }}
                  >
                    Connect
                  </Button>
                ) : (
                  <Link to="/pricing" className="inline-flex min-h-11 items-center text-sm text-volt">
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
    { kind: "out", text: `${name} ready. Type help.` },
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
    if (verb === "help") output = "whoami · ip · status · clear";
    if (verb === "whoami") output = callsign;
    if (verb === "ip") output = address === "direct" ? `direct · tunnel down · exit via ${region}` : `${address} via ${region}`;
    if (verb === "status") output = `${name} · ${planName} · ${spec}`;
    if (verb === "clear") {
      setLines([]);
      setCommand("");
      return;
    }
    setLines((current) =>
      [...current, { kind: "in" as const, text: raw }, { kind: "out" as const, text: output }].slice(-12),
    );
    setCommand("");
  }

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-bg">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 text-sm">
        <span>
          {name}
          <span className="text-muted"> · {spec}</span>
        </span>
        <span className="tabular-nums text-muted">{clock}</span>
      </div>
      <div className="desk-wallpaper grid gap-3 p-3 md:p-4">
        <div className="flex flex-wrap gap-2">
          {FILES.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => openFile(item.name)}
              className={cn(
                "min-h-11 rounded-md border px-3 text-sm",
                file === item.name ? "border-volt bg-raised text-fg" : "border-line bg-raised text-muted",
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="grid gap-3 lg:grid-cols-5">
          <label className="flex min-h-56 flex-col rounded-md border border-line bg-raised lg:col-span-3">
            <span className="border-b border-line px-3 py-2 text-xs text-muted">{file}</span>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="min-h-48 flex-1 resize-none bg-transparent p-3 text-sm text-fg outline-none"
              aria-label="Desk notes"
            />
          </label>
          <div className="flex min-h-56 flex-col rounded-md border border-line bg-ink lg:col-span-2">
            <p className="border-b border-line px-3 py-2 text-xs text-muted">Terminal</p>
            <div className="flex-1 space-y-1 overflow-auto p-3 font-sans text-sm">
              {lines.map((line, index) => (
                <p key={`${line.text}-${index}`} className={line.kind === "in" ? "text-volt" : "text-fg"}>
                  {line.kind === "in" ? `› ${line.text}` : line.text}
                </p>
              ))}
            </div>
            <form onSubmit={run} className="flex border-t border-line">
              <label className="sr-only" htmlFor="desk-cmd">
                Command
              </label>
              <input
                id="desk-cmd"
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                placeholder="whoami"
                className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-fg outline-none"
              />
              <button type="submit" className="min-h-11 px-4 text-sm text-volt">
                Run
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-2">
        <p className="text-xs text-muted">Gateway locked. Clipboard stays in this browser.</p>
        <Button variant="line" onClick={onClose}>
          Disconnect
        </Button>
      </div>
    </div>
  );
}
