import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
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
  return <div className={cn("mx-auto w-full max-w-6xl px-5 md:px-8", className)}>{children}</div>;
}

export function Shell({ children }: { children: ReactNode }) {
  useHydrateVela();
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-volt focus:px-4 focus:py-2 focus:text-ink"
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
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <Wrap className="flex h-16 items-center justify-between gap-3">
        <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-fg">
          <Mark />
          <span className="text-sm font-medium tracking-widest">VELA</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "inline-flex min-h-11 items-center text-sm",
                pathname === link.to ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/console" className={cn(buttonVariants({ variant: "line" }), "hidden md:inline-flex")}>
            Console
          </Link>
          <Link to="/pricing" className={buttonVariants()}>
            <span className="sm:hidden">Pricing</span>
            <span className="hidden sm:inline">Get a line</span>
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-fg md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Wrap>
      {open ? (
        <div className="border-t border-line md:hidden">
          <Wrap className="flex flex-col py-2">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "inline-flex min-h-11 items-center text-base",
                  pathname === link.to ? "text-fg" : "text-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/console" className="inline-flex min-h-11 items-center text-base text-fg">
              Console
            </Link>
          </Wrap>
        </div>
      ) : null}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <Wrap className="grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Mark />
            <span className="text-sm font-medium tracking-widest">VELA</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted">
            Voice, a tunnel, and a desk on one crypto invoice. A callsign is the whole account.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-faint">Products</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <Link to="/voice" className="inline-flex min-h-11 items-center text-muted hover:text-fg">
                Voice
              </Link>
            </li>
            <li>
              <Link to="/tunnel" className="inline-flex min-h-11 items-center text-muted hover:text-fg">
                Tunnel
              </Link>
            </li>
            <li>
              <Link to="/desk" className="inline-flex min-h-11 items-center text-muted hover:text-fg">
                Desk
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-faint">Workspace</p>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <Link to="/pricing" className="inline-flex min-h-11 items-center text-muted hover:text-fg">
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/checkout"
                search={{ plan: "lattice", term: "month" }}
                className="inline-flex min-h-11 items-center text-muted hover:text-fg"
              >
                Checkout
              </Link>
            </li>
            <li>
              <Link to="/console" className="inline-flex min-h-11 items-center text-muted hover:text-fg">
                Console
              </Link>
            </li>
          </ul>
        </div>
      </Wrap>
      <div className="border-t border-line">
        <Wrap className="flex flex-col gap-2 py-5 text-xs text-faint md:flex-row md:items-center md:justify-between">
          <p>Sandbox preview. Invoices do not collect cryptocurrency. Do not send funds.</p>
          <p>Fraud, spam, and unlawful access are prohibited.</p>
        </Wrap>
      </div>
    </footer>
  );
}
