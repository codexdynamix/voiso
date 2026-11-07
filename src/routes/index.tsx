import { createFileRoute, Link } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { Wrap } from "@/components/shell";
import { SeatMath } from "@/components/seat-math";
import { buttonVariants } from "@/components/ui/button";
import { COMPARE, FAQ, PLANS, REGIONS } from "@/lib/catalog";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/")({
  component: Home,
});

const PRODUCTS = [
  {
    index: "01",
    title: "Voice",
    href: "/voice",
    copy: "Inbound, outbound, SMS, and a dialer that is not locked behind a sales call. Present a DID you hold. Pay for the workspace, not a tax on every agent.",
    points: ["Softphone in the browser", "IVR and queues on Lattice", "Numbers in eight cities"],
  },
  {
    index: "02",
    title: "Tunnel",
    href: "/tunnel",
    copy: "WireGuard first, OpenVPN and IKEv2 when a network is difficult. Twelve regions. A kill switch that actually holds traffic. No email address on the account.",
    points: ["Kill switch on by default", "Sandbox profiles you can download", "Dedicated exit on Foundry"],
  },
  {
    index: "03",
    title: "Desk",
    href: "/desk",
    copy: "A Windows workstation on a locked gateway. Notes and a terminal in the session. The volume is wiped when you cancel — it is not a vendor archive.",
    points: ["2 to 8 vCPU", "Clipboard stays local", "Wiped on cancel"],
  },
] as const;

function Home() {
  const best = REGIONS[0];
  return (
    <>
      <section className="border-b border-line">
        <Wrap className="grid items-start gap-10 py-10 lg:grid-cols-2 lg:gap-12 lg:py-20">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-widest text-volt">No-KYC communications</p>
            <h1 className="mt-4 text-4xl leading-tight sm:text-5xl lg:text-6xl">
              The contact center that never asks <em className="italic text-volt">who you are</em>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Carrier voice, a WireGuard tunnel, and a Windows desk. One crypto invoice. No passport. No per-agent
              contract.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/pricing" className={buttonVariants({ size: "lg" })}>
                Get a line
              </Link>
              <Link to="/console" className={buttonVariants({ variant: "line", size: "lg" })}>
                Open the console
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-faint">
              <li>Callsign instead of documents</li>
              <li>USDT, BTC, ETH, XMR</li>
              <li>Live after confirmation</li>
            </ul>
          </div>
          <Rack />
        </Wrap>
      </section>

      <section className="border-b border-line">
        <Wrap className="grid grid-cols-2 md:grid-cols-4">
          {[
            ["12", "Regions on the tunnel"],
            [`${best.ms} ms`, `Best hop · ${best.city}`],
            ["0", "Documents to open an account"],
            ["6", "Assets accepted at checkout"],
          ].map(([value, label]) => (
            <div key={label} className="border-line py-8 md:border-l md:px-6 md:first:border-l-0">
              <p className="font-display text-4xl tabular-nums">{value}</p>
              <p className="mt-2 text-sm text-muted">{label}</p>
            </div>
          ))}
        </Wrap>
      </section>

      <section className="border-b border-line">
        <Wrap className="py-16 md:py-24">
          <p className="text-xs uppercase tracking-widest text-volt">Three products, one invoice</p>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {PRODUCTS.map((product) => (
              <article key={product.href} className="grid gap-6 py-10 md:grid-cols-12">
                <div className="md:col-span-4">
                  <p className="text-sm text-faint">{product.index}</p>
                  <h2 className="mt-2 font-display text-4xl font-medium">{product.title}</h2>
                </div>
                <div className="md:col-span-8">
                  <p className="max-w-xl text-lg text-muted">{product.copy}</p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                    {product.points.map((point) => (
                      <li key={point} className="text-sm text-fg">
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link to={product.href} className="mt-6 inline-flex min-h-11 items-center text-sm text-volt">
                    Explore {product.title.toLowerCase()}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="border-b border-line">
        <Wrap className="py-16 md:py-24">
          <SeatMath />
        </Wrap>
      </section>

      <section className="border-b border-line">
        <Wrap className="py-16 md:py-24">
          <p className="text-xs uppercase tracking-widest text-volt">Compared</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium">
            What a sales-gated contact center still makes you do.
          </h2>
          <div className="mt-8 overflow-hidden rounded-lg border border-line">
            <div className="hidden grid-cols-3 gap-4 border-b border-line px-4 py-3 text-xs uppercase tracking-widest text-faint md:grid">
              <span> </span>
              <span>Typical suite</span>
              <span>Vela</span>
            </div>
            {COMPARE.map((row) => (
              <div key={row[0]} className="grid gap-2 border-b border-line px-4 py-4 last:border-b-0 md:grid-cols-3 md:gap-4">
                <p className="text-sm text-faint">{row[0]}</p>
                <p className="text-sm text-muted">{row[1]}</p>
                <p className="text-sm text-fg">{row[2]}</p>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="border-b border-line">
        <Wrap className="grid gap-10 py-16 md:grid-cols-3 md:py-24">
          {[
            ["01", "Pick a callsign", "Three to sixteen letters. No legal name, no inbox, no selfie."],
            ["02", "Post a crypto invoice", "USDT, USDC, BTC, ETH, XMR, or LTC. The quote is the exact credit."],
            ["03", "Work starts", "Seats, the tunnel, and the desk wake together. Cancel and the desk is wiped."],
          ].map(([index, title, copy]) => (
            <div key={index}>
              <p className="text-sm text-volt">{index}</p>
              <h2 className="mt-3 font-display text-3xl font-medium">{title}</h2>
              <p className="mt-3 text-muted">{copy}</p>
            </div>
          ))}
        </Wrap>
      </section>

      <section className="border-b border-line">
        <Wrap className="py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-volt">Pricing</p>
              <h2 className="mt-3 font-display text-4xl font-medium">One number for the whole floor.</h2>
            </div>
            <Link to="/pricing" className={buttonVariants({ variant: "line" })}>
              Compare plans
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PLANS.map((plan) => (
              <Link
                key={plan.id}
                to="/checkout"
                search={{ plan: plan.id, term: "month" }}
                className={cn(
                  "rounded-lg border p-5",
                  plan.featured ? "border-volt bg-raised" : "border-line hover:border-muted",
                )}
              >
                <p className="text-sm text-muted">{plan.name}</p>
                <p className="mt-3 font-display text-4xl tabular-nums">
                  {plan.price}
                  <span className="ml-2 font-sans text-sm text-muted">USDT</span>
                </p>
                <p className="mt-3 text-sm text-muted">{plan.blurb}</p>
              </Link>
            ))}
          </div>
        </Wrap>
      </section>

      <section className="border-b border-line">
        <Wrap className="py-16 md:py-24">
          <h2 className="font-display text-4xl font-medium">Questions, answered flat.</h2>
          <Accordion.Root type="single" collapsible className="mt-8 border-t border-line">
            {FAQ.map((item) => (
              <Accordion.Item key={item.q} value={item.q} className="border-b border-line">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-base">
                    {item.q}
                    <ChevronDown className="size-4 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="max-w-3xl pb-4 text-sm text-muted">{item.a}</Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Wrap>
      </section>
    </>
  );
}

function Rack() {
  return (
    <div className="rounded-lg border border-line bg-raised p-4 md:p-5">
      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted">
        <span>Rack · fra-1</span>
        <span className="inline-flex items-center gap-2 text-fg">
          <span className="vela-live size-1.5 rounded-full bg-volt" />
          Live
        </span>
      </div>
      <ul className="mt-4 divide-y divide-line">
        {[
          ["Voice", "Lattice · 8 seats warm", "18 ms"],
          ["Tunnel", "Frankfurt · kill switch on", "Up"],
          ["Desk", "dx-04 · 4 vCPU", "Idle"],
        ].map(([name, detail, state]) => (
          <li key={name} className="flex items-center justify-between gap-3 py-4">
            <span className="min-w-0">
              <span className="block text-sm text-fg">{name}</span>
              <span className="block truncate text-sm text-muted">{detail}</span>
            </span>
            <span className="shrink-0 text-sm tabular-nums text-volt">{state}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-2 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
        {[
          ["Jitter", "18 ms"],
          ["Loss", "0.0%"],
          ["Docs", "None"],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase tracking-widest text-faint">{label}</dt>
            <dd className="mt-1 font-display text-2xl tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
