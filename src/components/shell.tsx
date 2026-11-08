import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { Mark } from "@/components/mark";
import { cn } from "@/lib/cn";
import { useHydrateVela } from "@/lib/store";

const PRODUCT_LINKS = [
  { to: "/voice", label: "Voice", detail: "Browser calling and global numbers" },
  { to: "/tunnel", label: "Tunnel", detail: "Private WireGuard connectivity" },
  { to: "/desk", label: "Desk", detail: "Flexible remote workstations" },
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
    const sectionId = window.location.hash.slice(1);
    if (pathname === "/" && sectionId) {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [pathname]);

  const handleSectionClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (pathname !== "/") return;
    event.preventDefault();
    window.history.replaceState(null, "", `/#${sectionId}`);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky top-0 z-40 w-full pt-2 sm:pt-3 pb-2 transition-all">
      <Wrap>
        <header className="flex h-14 md:h-16 items-center justify-between gap-4 md:gap-8 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm px-4 md:px-6 transition-all">
          {/* Zone 1: Single brand wordmark with emblem */}
          <Link to="/" className="inline-flex items-center gap-2.5 text-slate-900 whitespace-nowrap shrink-0 group">
            <Mark />
            <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-[#1264d8] transition-colors">
              VELA
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-2.5 py-0.5 text-[11px] font-semibold text-[#1264d8]">
              <span className="size-1.5 rounded-full bg-[#1264d8] animate-ping" />
              Communications Cloud
            </span>
          </Link>

          {/* Navigation Links matching Voiso standard */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            <details className="group relative">
              <summary
                className={cn(
                  "inline-flex h-9 list-none items-center gap-1.5 rounded-full px-3 text-sm font-medium text-slate-600 transition-colors hover:text-[#1264d8] hover:bg-slate-100/60 cursor-pointer",
                  ["/voice", "/tunnel", "/desk"].includes(pathname) && "bg-blue-50 text-[#1264d8] font-semibold",
                )}
              >
                Products
                <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute left-0 top-full z-50 w-72 pt-2">
                <div className="rounded-2xl p-2 shadow-xl border border-slate-200 bg-white">
                  {PRODUCT_LINKS.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50"
                    >
                      <span className="block text-sm font-semibold text-slate-900">{link.label}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{link.detail}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </details>
            <a href="/#sales" onClick={(event) => handleSectionClick(event, "sales")} className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-slate-600 transition-colors hover:text-[#1264d8] hover:bg-slate-100/60">
              Sales
            </a>
            <a href="/#support" onClick={(event) => handleSectionClick(event, "support")} className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-slate-600 transition-colors hover:text-[#1264d8] hover:bg-slate-100/60">
              Support
            </a>
            <a href="/#flow-builder" onClick={(event) => handleSectionClick(event, "flow-builder")} className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-slate-600 transition-colors hover:text-[#1264d8] hover:bg-slate-100/60">
              Flow Builder
            </a>
            <a href="/#omnichannel" onClick={(event) => handleSectionClick(event, "omnichannel")} className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-slate-600 transition-colors hover:text-[#1264d8] hover:bg-slate-100/60">
              Omnichannel
            </a>
            <a href="/#ai-models" onClick={(event) => handleSectionClick(event, "ai-models")} className="inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-slate-600 transition-colors hover:text-[#1264d8] hover:bg-slate-100/60">
              Multi-LLM
            </a>
            <Link
              to="/pricing"
              className={cn(
                "inline-flex h-9 items-center rounded-full px-3 text-sm font-medium text-slate-600 transition-colors hover:text-[#1264d8] hover:bg-slate-100/60",
                pathname === "/pricing" && "bg-blue-50 text-[#1264d8] font-semibold",
              )}
            >
              Pricing
            </Link>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/console"
              className={cn(
                "hidden lg:inline-flex items-center justify-center text-xs font-semibold text-slate-700 hover:text-[#1264d8] px-3.5 py-2 rounded-full hover:bg-slate-100 transition-colors",
                pathname === "/console" && "text-[#1264d8] bg-blue-50",
              )}
            >
              Console
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-1.5 bg-[#1264d8] hover:bg-[#0e52b5] text-white rounded-full px-5 py-2 text-xs sm:text-sm font-semibold shadow-md shadow-[#1264d8]/20 transition-all cursor-pointer"
            >
              <span>Try for Free</span>
              <ArrowUpRight className="size-3.5 opacity-90" />
            </Link>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full text-slate-600 hover:text-slate-900 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </header>

        {/* Mobile dropdown sheet */}
        {open ? (
          <div id="mobile-navigation" className="mt-2 ios-glass rounded-2xl p-4 lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted">Products</p>
              {PRODUCT_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex h-11 items-center px-4 rounded-xl text-base font-medium transition-colors",
                    pathname === link.to ? "ios-pill-active text-fg" : "text-muted hover:text-volt",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a href="/#solutions" onClick={(event) => handleSectionClick(event, "solutions")} className="flex h-11 items-center rounded-xl px-4 text-base font-medium text-muted transition-colors hover:text-volt">
                Solutions
              </a>
              <a href="/#trust" onClick={(event) => handleSectionClick(event, "trust")} className="flex h-11 items-center rounded-xl px-4 text-base font-medium text-muted transition-colors hover:text-volt">
                Security
              </a>
              <Link to="/pricing" className="flex h-11 items-center rounded-xl px-4 text-base font-medium text-muted transition-colors hover:text-volt">
                Pricing
              </Link>
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
    <footer className="mt-20 border-t border-line bg-white">
      <Wrap className="grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <Mark />
            <span className="text-base font-bold tracking-tight text-fg">VELA</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted leading-relaxed">
            Enterprise telecommunications cloud and intelligent contact center platform. Global SIP trunking, WebRTC browser softphones, WireGuard encrypted tunnels, and multi-LLM intelligence.
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs text-muted">
            <span>Claude 3.5 & GPT-4o & Gemini</span>
            <span aria-hidden="true">·</span>
            <span>Predictive AI Dialer</span>
            <span aria-hidden="true">·</span>
            <span>130+ Global DIDs</span>
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
