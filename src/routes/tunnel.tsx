import { createFileRoute } from "@tanstack/react-router";
import { TunnelPanel } from "@/components/tunnel-panel";
import { Wrap } from "@/components/shell";

export const Route = createFileRoute("/tunnel")({
  head: () => ({
    meta: [
      { title: "Tunnel — Vela" },
      {
        name: "description",
        content: "WireGuard, OpenVPN, and IKEv2 across 12 regions. No account email. Kill switch on.",
      },
    ],
  }),
  component: TunnelPage,
});

function TunnelPage() {
  return (
    <>
      <header className="border-b border-line">
        <Wrap className="py-14 md:py-20">
          <p className="text-xs uppercase tracking-widest text-volt">Tunnel</p>
          <h1 className="mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl">
            A private exit that never asks for an inbox.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Pick a region, a protocol, and whether traffic may exist without the tunnel. Profiles from this
            preview are samples — the host is <span className="text-fg">vela.invalid</span>, which does not resolve.
          </p>
        </Wrap>
      </header>
      <Wrap className="py-10 md:py-14">
        <TunnelPanel />
      </Wrap>
    </>
  );
}
