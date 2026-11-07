import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Mark } from "@/components/mark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useHydrateVela } from "@/lib/store";

const LINKS = [
  { to: "/voice", label: "Voice" },
  { to: "/tunnel", label: "Tunnel" },
  { to: "/desk", label: "Desk" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function Wrap({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8", className)}>{children}</div>;
}

export function Shell({ children }: { children: ReactNode }) {
  useHydrateVela();
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-bg text-fg">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 ios-glow-radial" aria-hidden="true" />

      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-volt focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main id="content" className="flex-1">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="sticky top-0 z-40 w-full pt-2 sm:pt-3 pb-2 transition-all">
      <Wrap>
        <header className="ios-glass flex h-14 md:h-16 items-center justify-between gap-4 md:gap-8 rounded-2xl md:rounded-full px-4 md:px-6 transition-all">
          {/* Zone 1: Single brand wordmark with emblem */}
          <Link to="/" className="inline-flex items-center gap-2.5 text-fg whitespace-nowrap shrink-0 group">
            <Mark />
            <span className="text-base font-semibold tracking-tight text-white group-hover:text-volt transition-colors">
              VELA
            </span>
            <span className="hidden sm:inline-block text-[11px] font-medium tracking-wide text-muted/70 uppercase">
              Telecom Cloud
            </span>
          </Link>

          {/* Zone 2: 4 single-line navigation links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {LINKS.map((link) => {
              const active = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "inline-flex h-9 items-center px-4 rounded-full text-sm font-medium transition-all whitespace-nowrap shrink-0",
                    active
                      ? "ios-pill-active text-white"
                      : "text-muted hover:text-white hover:bg-white/[0.04]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/console"
              className={cn(
                buttonVariants({ variant: "line", size: "sm" }),
                "hidden sm:inline-flex text-xs h-9",
                pathname === "/console" && "border-volt/50 text-white bg-volt/10",
              )}
            >
              Console
            </Link>
            <Link to="/pricing" className={cn(buttonVariants({ size: "sm" }), "h-9 text-xs")}>
              <span>Get a Line</span>
              <ArrowUpRight className="size-3.5 opacity-80" />
            </Link>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full text-muted hover:text-white md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </header>

        {/* Mobile dropdown sheet */}
        {open ? (
          <div className="mt-2 ios-glass rounded-2xl p-4 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex h-11 items-center px-4 rounded-xl text-base font-medium transition-colors",
                    pathname === link.to ? "bg-white/10 text-white" : "text-muted hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="my-2 border-t border-line" />
              <Link
                to="/console"
                className="flex h-11 items-center justify-between px-4 rounded-xl text-base font-medium text-white hover:bg-white/5"
              >
                <span>Console</span>
                <span className="text-xs text-muted">Workspace</span>
              </Link>
            </nav>
          </div>
        ) : null}
      </Wrap>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-gradient-to-b from-transparent to-black/40">
      <Wrap className="grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <Mark />
            <span className="text-base font-semibold tracking-tight text-white">VELA</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted leading-relaxed">
            Next-generation enterprise telecommunications cloud. Direct SIP trunking, WebRTC browser softphones, WireGuard encrypted tunnels, and disposable remote virtual desktops with zero KYC.
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs text-faint">
            <span>Encrypted WebRTC</span>
            <span aria-hidden="true">·</span>
            <span>WireGuard Protocol</span>
            <span aria-hidden="true">·</span>
            <span>Crypto Settlement</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Telephony & Network</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/voice" className="text-muted hover:text-white transition-colors">
                Cloud Voice & Dialer
              </Link>
            </li>
            <li>
              <Link to="/tunnel" className="text-muted hover:text-white transition-colors">
                WireGuard Private Tunnel
              </Link>
            </li>
            <li>
              <Link to="/desk" className="text-muted hover:text-white transition-colors">
                Disposable Cloud Desk
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Operations</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link to="/pricing" className="text-muted hover:text-white transition-colors">
                Workspace Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/checkout"
                search={{ plan: "lattice", term: "month" }}
                className="text-muted hover:text-white transition-colors"
              >
                Instant Activation
              </Link>
            </li>
            <li>
              <Link to="/console" className="text-muted hover:text-white transition-colors">
                Subscriber Console
              </Link>
            </li>
          </ul>
        </div>
      </Wrap>

      <div className="border-t border-line/60 py-6">
        <Wrap className="flex flex-col gap-3 text-xs text-muted/80 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} VELA Communications Cloud. All network rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-faint">
            <span>Carrier-grade 99.99% SLA</span>
            <span>Zero Call Recording Retention</span>
            <span>Private Callsign Authentication</span>
          </div>
        </Wrap>
      </div>
    </footer>
  );
}
