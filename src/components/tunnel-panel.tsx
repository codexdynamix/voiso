import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Switch from "@radix-ui/react-switch";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  effectivePlanId,
  planAllows,
  planById,
  profileText,
  PROTOCOLS,
  regionById,
  REGIONS,
  tunnelAddress,
  type ProtocolId,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { useVela } from "@/lib/store";

export function TunnelPanel() {
  const regionId = useVela((state) => state.regionId);
  const protocol = useVela((state) => state.protocol);
  const vpnOn = useVela((state) => state.vpnOn);
  const killSwitch = useVela((state) => state.killSwitch);
  const planId = useVela((state) => state.planId);
  const active = useVela((state) => state.active);
  const setRegion = useVela((state) => state.setRegion);
  const setProtocol = useVela((state) => state.setProtocol);
  const setKillSwitch = useVela((state) => state.setKillSwitch);
  const connectVpn = useVela((state) => state.connectVpn);
  const disconnectVpn = useVela((state) => state.disconnectVpn);

  const [handshaking, setHandshaking] = useState(false);
  const plan = planById(effectivePlanId(planId, active));
  const region = regionById(regionId);
  const address = tunnelAddress(regionId);
  const dedicated = planAllows(plan.id, "foundry");

  useEffect(() => {
    if (!handshaking) return;
    const id = window.setTimeout(() => {
      connectVpn();
      setHandshaking(false);
    }, 650);
    return () => window.clearTimeout(id);
  }, [handshaking, connectVpn]);

  function onConnect() {
    if (handshaking) {
      setHandshaking(false);
      return;
    }
    if (vpnOn) disconnectVpn();
    else setHandshaking(true);
  }

  function download() {
    const text = profileText(protocol, region.id, address);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `vela-${region.id}-sandbox.conf`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const status = handshaking ? "Handshaking" : vpnOn ? "Up" : killSwitch ? "Held" : "Down";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0 rounded-lg border border-line bg-raised p-4 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-faint">Tunnel</p>
            <h2 className="mt-2 font-display text-3xl font-medium">{status}</h2>
            <p className="mt-2 text-sm text-muted">
              {vpnOn ? `${region.city} · ${address}` : `Ready for ${region.city}`}
              {vpnOn ? ` · ${region.ms} ms` : ""}
            </p>
          </div>
          <Button onClick={onConnect} variant={vpnOn ? "line" : "primary"} size="lg">
            {handshaking ? "Cancel" : vpnOn ? "Disconnect" : "Connect"}
          </Button>
        </div>
        {!vpnOn && killSwitch ? (
          <p className="mt-4 text-sm text-volt">Kill switch is holding traffic until the tunnel is up.</p>
        ) : null}

        <div className="mt-6 flex items-center justify-between gap-4 rounded-md border border-line px-4 py-3">
          <div>
            <p className="text-sm">Kill switch</p>
            <p className="text-xs text-faint">Drops traffic if the tunnel drops.</p>
          </div>
          <Switch.Root
            checked={killSwitch}
            onCheckedChange={setKillSwitch}
            aria-label="Kill switch"
            className="relative h-7 w-12 shrink-0 rounded-full bg-line data-[state=checked]:bg-volt"
          >
            <Switch.Thumb className="block size-5 translate-x-1 rounded-full bg-fg transition-transform duration-200 data-[state=checked]:translate-x-6 data-[state=checked]:bg-ink" />
          </Switch.Root>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {PROTOCOLS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={protocol === item.id}
              onClick={() => setProtocol(item.id as ProtocolId)}
              className={cn(
                "min-h-16 rounded-md border px-3 py-2 text-left",
                protocol === item.id ? "border-volt bg-bg" : "border-line",
              )}
            >
              <span className="block text-sm text-fg">{item.name}</span>
              <span className="mt-1 block text-xs text-muted">{item.detail}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            {dedicated ? "Dedicated exit reserved for this callsign." : "Shared exit. Dedicated IP is on Foundry."}
          </p>
          {dedicated ? null : (
            <Link to="/pricing" className="text-sm text-volt">
              See Foundry
            </Link>
          )}
        </div>
        <Button variant="line" className="mt-4" onClick={download}>
          <Download className="size-4" />
          Download sandbox profile
        </Button>
      </div>

      <div className="rounded-lg border border-line bg-bg p-4">
        <p className="text-xs uppercase tracking-widest text-faint">Regions</p>
        <ul className="mt-3 max-h-96 space-y-2 overflow-auto">
          {REGIONS.map((item) => {
            const selected = item.id === regionId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setRegion(item.id)}
                  aria-pressed={selected}
                  className={cn(
                    "w-full rounded-md border p-3 text-left",
                    selected ? "border-volt" : "border-line hover:border-muted",
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-sm text-fg">{item.city}</span>
                    <span className="tabular-nums text-sm text-muted">{item.ms} ms</span>
                  </span>
                  <span className="mt-2 block h-1 rounded-full bg-line" aria-hidden="true">
                    <span className="block h-1 rounded-full bg-volt" style={{ width: `${item.load}%` }} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
