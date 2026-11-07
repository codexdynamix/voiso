import { useEffect, useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { Download, Shield, ShieldCheck, ShieldAlert, Globe, Server } from "lucide-react";
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
    return () => window.clearInterval(id);
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

  const status = handshaking ? "Handshaking" : vpnOn ? "Active" : killSwitch ? "Held" : "Disconnected";

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      {/* Left Column: Tunnel Engine & Controls */}
      <div className="min-w-0 ios-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between">
        <div>
          {/* Top Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "size-12 rounded-2xl flex items-center justify-center transition-all",
                  vpnOn
                    ? "bg-ios-green/15 text-ios-green border border-ios-green/30 shadow-lg shadow-ios-green/10"
                    : handshaking
                      ? "bg-volt/15 text-volt border border-volt/30 animate-pulse"
                      : "bg-white/[0.04] text-muted border border-white/10",
                )}
              >
                {vpnOn ? (
                  <ShieldCheck className="size-6" />
                ) : killSwitch && !vpnOn ? (
                  <ShieldAlert className="size-6 text-volt" />
                ) : (
                  <Shield className="size-6" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-muted">
                    WireGuard Tunnel
                  </span>
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      vpnOn ? "bg-ios-green animate-pulse" : "bg-muted",
                    )}
                  />
                </div>
                <h2 className="text-2xl font-semibold text-white tracking-tight">{status}</h2>
              </div>
            </div>

            <Button
              onClick={onConnect}
              variant={vpnOn ? "line" : "primary"}
              size="lg"
              className={cn(vpnOn && "hover:border-red-500/50 hover:text-red-400")}
            >
              {handshaking ? "Cancel Handshake" : vpnOn ? "Disconnect Tunnel" : "Connect to Gateway"}
            </Button>
          </div>

          {/* Network IP & Region Metadata */}
          <div className="mt-6 rounded-2xl bg-black/40 border border-white/10 p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-muted block">Selected Egress</span>
                <span className="font-semibold text-white mt-1 block flex items-center gap-1.5">
                  <Globe className="size-3.5 text-volt" />
                  {region.city}
                </span>
              </div>

              <div>
                <span className="text-muted block">Virtual IP (IPv4)</span>
                <span className="font-mono font-semibold text-white mt-1 block">
                  {vpnOn ? address : "Not Assigned"}
                </span>
              </div>

              <div>
                <span className="text-muted block">Measured Roundtrip</span>
                <span className="font-mono font-semibold text-ios-green mt-1 block tabular-nums">
                  {region.ms} ms latency
                </span>
              </div>
            </div>

            {!vpnOn && killSwitch && (
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs text-volt">
                <ShieldAlert className="size-4 shrink-0" />
                <span>Kill switch active: Network adapter drops raw packets until handshake completes.</span>
              </div>
            )}
          </div>

          {/* Hard Kill Switch Setting Card */}
          <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div>
              <p className="text-sm font-semibold text-white">Network Kill Switch</p>
              <p className="text-xs text-muted mt-0.5">
                Block all unencrypted system traffic if the WireGuard tunnel drops unexpectedly.
              </p>
            </div>
            <Switch.Root
              checked={killSwitch}
              onCheckedChange={setKillSwitch}
              aria-label="Kill switch"
              className="relative h-7 w-12 shrink-0 rounded-full bg-white/10 data-[state=checked]:bg-volt transition-colors duration-200 outline-none"
            >
              <Switch.Thumb className="block size-5 translate-x-1 rounded-full bg-white transition-transform duration-200 data-[state=checked]:translate-x-6 data-[state=checked]:bg-black shadow-md" />
            </Switch.Root>
          </div>

          {/* Protocol Selector */}
          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">Tunnel Protocol</p>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {PROTOCOLS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={protocol === item.id}
                  onClick={() => setProtocol(item.id as ProtocolId)}
                  className={cn(
                    "p-3 rounded-2xl border text-left transition-all",
                    protocol === item.id
                      ? "border-volt/60 bg-volt/[0.08] shadow-sm shadow-volt/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20",
                  )}
                >
                  <span className="block text-sm font-semibold text-white">{item.name}</span>
                  <span className="mt-1 block text-xs text-muted leading-snug">{item.detail}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info & Download Profile */}
        <div className="mt-8 pt-5 border-t border-line flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-muted">
            {dedicated
              ? "Dedicated exit IP allocated to your callsign."
              : "High-reputation shared egress IP pool. Dedicated IP available on Foundry."}
          </p>

          <Button variant="line" size="sm" onClick={download}>
            <Download className="size-4" />
            <span>Download .conf Profile</span>
          </Button>
        </div>
      </div>

      {/* Right Column: Global Edge Regions List */}
      <div className="ios-glass rounded-3xl p-6 border border-white/10 flex flex-col">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted font-semibold">Global Gateways</p>
            <span className="text-sm font-semibold text-white">12 Available Regions</span>
          </div>
          <span className="text-[11px] font-mono text-ios-green">All Nominal</span>
        </div>

        <ul className="mt-4 space-y-2 max-h-[460px] overflow-y-auto pr-1">
          {REGIONS.map((item) => {
            const selected = item.id === regionId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setRegion(item.id)}
                  aria-pressed={selected}
                  className={cn(
                    "w-full rounded-2xl border p-3.5 text-left transition-all",
                    selected
                      ? "border-volt/60 bg-volt/[0.08] shadow-md shadow-volt/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white flex items-center gap-2">
                      <Server className="size-3.5 text-muted" />
                      {item.city}
                    </span>
                    <span className="font-mono text-xs text-ios-green font-medium tabular-nums">
                      {item.ms} ms
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between gap-3 text-[11px] text-muted">
                    <span>Node load</span>
                    <span className="font-mono tabular-nums">{item.load}%</span>
                  </div>

                  <div className="mt-1 h-1 w-full rounded-full bg-white/10 overflow-hidden" aria-hidden="true">
                    <div
                      className="h-full bg-volt rounded-full"
                      style={{ width: `${item.load}%` }}
                    />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
