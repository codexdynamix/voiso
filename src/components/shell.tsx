import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { Mark } from "@/components/mark";
import { cn } from "@/lib/cn";
import { useHydrateVela } from "@/lib/store";

const PRODUCT_LINKS = [
  { to: "/checkout", hash: "phones", label: "Phone Numbers" },
  { to: "/checkout", hash: "rdp", label: "RDP Plans" },
  { to: "/checkout", hash: "vps", label: "VPS Plans" },
  { to: "/checkout", hash: "dedicated", label: "Dedicated Servers" },
  { to: "/checkout", hash: "tunnel", label: "Secure Tunnel" },
] as const;

const HOME_SECTION_LINKS = [
  { id: "sales", label: "Sales" },
  { id: "support", label: "Support" },
  { id: "flow-builder", label: "Flow Builder" },
  { id: "omnichannel", label: "Omnichannel" },
  { id: "ai-models", label: "Multi-LLM" },
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

      <div className="border-b border-amber-300 bg-amber-50 text-amber-950" role="status">
        <Wrap className="flex flex-col gap-1 py-2 text-xs sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p>
            <span className="font-bold uppercase tracking-wide">Preview only:</span>{" "}
            calls, payments, phone numbers, VPN, and remote desktops are not
            connected to live services. No order is placed or payment taken.
          </p>
          <Link
            to="/checkout"
            search={{ plan: "lattice", term: "month" }}
            className="shrink-0 font-semibold underline underline-offset-2"
          >
            Configure an order
          </Link>
        </Wrap>
      </div>

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
  const hash = useRouterState({ select: (state) => state.location.hash });
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
        <header className="flex h-14 md:h-16 items-center justify-between gap-4 md:gap-6 rounded-full bg-white/92 backdrop-blur-xl border border-slate-200/80 shadow-[0_10px_40px_-24px_rgba(16,24,40,0.45)] px-4 md:px-6 transition-all">
          {/* Zone 1: Single brand wordmark with emblem */}
          <Link
            to="/"
            aria-label="Vela home"
            title="Go to home page"
            className="inline-flex items-center gap-2.5 text-slate-900 whitespace-nowrap shrink-0"
          >
            <Mark />
            <span className="voiso-wordmark text-[1.05rem] leading-none">VELA</span>
            <span className="hidden 2xl:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-500">
              Communications Cloud
            </span>
          </Link>

          {/* Service links stay visible in the main header. */}
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            <Link
              to="/"
              className={cn(
                "inline-flex h-9 items-center rounded-full px-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100/60 hover:text-[#1264d8] xl:px-2.5",
                pathname === "/" && !hash && "bg-blue-50 text-[#1264d8]",
              )}
            >
              Home
            </Link>
            {PRODUCT_LINKS.map((link) => (
              <Link
                key={link.hash}
                to={link.to}
                search={{ plan: "lattice", term: "month" }}
                hash={link.hash}
                className={cn(
                  "inline-flex h-9 items-center rounded-full px-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100/60 hover:text-[#1264d8] xl:px-2.5",
                  pathname === link.to && hash === `#${link.hash}` && "bg-blue-50 text-[#1264d8]",
                )}
              >
                {link.label}
              </Link>
            ))}
            <details className="group relative hidden xl:block">
              <summary
                className="inline-flex h-9 list-none items-center gap-1.5 rounded-full px-3 text-sm font-medium text-slate-600 transition-colors hover:text-[#1264d8] hover:bg-slate-100/60 cursor-pointer"
              >
                Solutions
                <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute left-0 top-full z-50 w-48 pt-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                  {HOME_SECTION_LINKS.map(({ id, label }) => (
                    <a
                      key={id}
                      href={`/#${id}`}
                      onClick={(event) => handleSectionClick(event, id)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </details>
            <Link
              to="/integrations"
              className={cn(
                "hidden h-9 items-center rounded-full px-2 text-xs font-medium text-slate-600 transition-colors hover:text-[#1264d8] hover:bg-slate-100/60 xl:inline-flex",
                pathname === "/integrations" && "bg-blue-50 text-[#1264d8] font-semibold",
              )}
            >
              Integrations
            </Link>
            <Link
              to="/pricing"
              className={cn(
                "inline-flex h-9 items-center rounded-full px-2 text-xs font-medium text-slate-600 transition-colors hover:text-[#1264d8] hover:bg-slate-100/60",
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
                "hidden xl:inline-flex items-center justify-center text-xs font-semibold text-slate-700 hover:text-[#1264d8] px-3.5 py-2 rounded-full hover:bg-slate-100 transition-colors",
                pathname === "/console" && "text-[#1264d8] bg-blue-50",
              )}
            >
              Console
            </Link>
            <Link
              to="/checkout"
              search={{ plan: "lattice", term: "month" }}
              className="voiso-cta inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <span>Order services</span>
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
              <Link
                to="/"
                className={cn(
                  "flex h-11 items-center rounded-xl px-4 text-base font-medium transition-colors",
                  pathname === "/" && !hash ? "ios-pill-active text-fg" : "text-muted hover:text-volt",
                )}
              >
                Home
              </Link>
              <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted">Services</p>
              {PRODUCT_LINKS.map((link) => (
                <Link
                  key={link.hash}
                  to={link.to}
                  search={{ plan: "lattice", term: "month" }}
                  hash={link.hash}
                  className={cn(
                    "flex h-11 items-center px-4 rounded-xl text-base font-medium transition-colors",
                    pathname === link.to && hash === `#${link.hash}` ? "ios-pill-active text-fg" : "text-muted hover:text-volt",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted">Solutions</p>
              {HOME_SECTION_LINKS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`/#${id}`}
                  onClick={(event) => handleSectionClick(event, id)}
                  className="flex h-11 items-center rounded-xl px-4 text-base font-medium text-muted transition-colors hover:text-volt"
                >
                  {label}
                </a>
              ))}
              <Link
                to="/integrations"
                className={cn(
                  "flex h-11 items-center rounded-xl px-4 text-base font-medium transition-colors",
                  pathname === "/integrations" ? "ios-pill-active text-fg" : "text-muted hover:text-volt",
                )}
              >
                Integrations
              </Link>
              <a href="/#solutions" onClick={(event) => handleSectionClick(event, "solutions")} className="flex h-11 items-center rounded-xl px-4 text-base font-medium text-muted transition-colors hover:text-volt">
                Solutions
              </a>
              <a href="/#trust" onClick={(event) => handleSectionClick(event, "trust")} className="flex h-11 items-center rounded-xl px-4 text-base font-medium text-muted transition-colors hover:text-volt">
                Security
              </a>
              <Link to="/pricing" className="flex h-11 items-center rounded-xl px-4 text-base font-medium text-muted transition-colors hover:text-volt">
                Pricing
              </Link>
              <Link
                to="/checkout"
                search={{ plan: "lattice", term: "month" }}
                className="flex h-11 items-center rounded-xl px-4 text-base font-semibold text-volt transition-colors hover:bg-white/5"
              >
                Configure phone numbers & RDP
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
            <span className="voiso-wordmark text-[0.95rem] leading-none">VELA</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted leading-relaxed">
            Product preview for a communications workspace. Live calling,
            number provisioning, payment processing, VPN, and hosted desktops
            are not connected in this preview.
          </p>
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
            <li>
              <Link to="/integrations" className="text-muted hover:text-white transition-colors">
                CRM & MicroSIP Integrations
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
                Configure phone numbers & RDP
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
            <span>Preview environment</span>
            <span>No payment is processed</span>
            <span>Provider setup required for live service</span>
          </div>
        </Wrap>
      </div>
    </footer>
  );
}
