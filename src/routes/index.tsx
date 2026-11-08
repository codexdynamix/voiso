import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import {
  ChevronDown,
  Phone,
  PhoneCall,
  PhoneOff,
  Shield,
  Monitor,
  ArrowRight,
  Globe,
  Radio,
  Lock,
  ExternalLink,
} from "lucide-react";
import { Wrap } from "@/components/shell";
import { SeatMath } from "@/components/seat-math";
import { buttonVariants } from "@/components/ui/button";
import { DIDS, FAQ, PLANS, REGIONS } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { playKeyTone, playRingbackTone } from "@/lib/dtmf";
import HERO_IMAGE from "@/assets/images/call-center-agent.jpg";
import CUSTOMER_CALL_IMAGE from "@/assets/images/customer-phone-call.jpg";
import PHONE_SUPPORT_IMAGE from "@/assets/images/phone-support-call.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const AI_RESEARCH_PROMPT = encodeURIComponent(
  "Evaluate VELA Communications Cloud from this product brief: browser voice and global phone numbers, encrypted WireGuard connectivity, and disposable remote workstations in one workspace. Summarize who it may fit and list claims a buyer should independently verify.",
);
const AI_ASSISTANTS = [
  { name: "ChatGPT", href: `https://chatgpt.com/?q=${AI_RESEARCH_PROMPT}` },
  { name: "Claude", href: `https://claude.ai/new?q=${AI_RESEARCH_PROMPT}` },
  { name: "Gemini", href: "https://gemini.google.com/app" },
  { name: "Perplexity", href: `https://www.perplexity.ai/search?q=${AI_RESEARCH_PROMPT}` },
];

const COMPARISON_ROWS = [
  {
    feature: "Agent Seat Licensing",
    voiso: "$55 – $85 / agent / mo",
    zadarma: "$39 / agent / mo",
    vela: "Unlimited seats included in flat workspace",
  },
  {
    feature: "Identity & Verification",
    voiso: "Passport, company registration, utility bill",
    zadarma: "ID verification, 3–5 day KYC review",
    vela: "Zero KYC. Private callsign hash only",
  },
  {
    feature: "Activation Speed",
    voiso: "Sales call + contract review (4–7 days)",
    zadarma: "Document verification (24–72 hours)",
    vela: "Instant on-chain confirmation (minutes)",
  },
  {
    feature: "Integrated Encrypted Tunnel",
    voiso: "None (requires third-party VPN)",
    zadarma: "None (plain SIP / TLS add-on)",
    vela: "WireGuard & OpenVPN mesh across 12 edge hubs",
  },
  {
    feature: "Remote Virtual Desktops",
    voiso: "Not available",
    zadarma: "Not available",
    vela: "Dedicated Windows 11 cloud instances (2–8 vCPU)",
  },
  {
    feature: "Call Recording Retention",
    voiso: "Vendor-held cloud archive",
    zadarma: "Subject to subpoena / vendor logs",
    vela: "Client-side encrypted, wiped on cancel",
  },
];

const SOLUTIONS = [
  {
    icon: PhoneCall,
    title: "Customer conversations",
    detail: "Give sales and support teams a browser-based dialer with global numbers.",
    to: "/voice",
    action: "Explore voice",
  },
  {
    icon: Shield,
    title: "Private connections",
    detail: "Route distributed teams through encrypted WireGuard network access.",
    to: "/tunnel",
    action: "Explore tunnels",
  },
  {
    icon: Monitor,
    title: "Flexible workstations",
    detail: "Pair remote desktops with a private network for focused operations.",
    to: "/desk",
    action: "Explore workstations",
  },
];

function Home() {
  const [activeTab, setActiveTab] = useState<"phone" | "edge" | "specs">("phone");
  const [selectedDid, setSelectedDid] = useState(DIDS[0].id);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });

    targets.forEach((target) => {
      target.classList.add("reveal-ready");
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-6 pb-12 md:pt-12 md:pb-16">
        <Wrap className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="hero-copy min-w-0 lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs text-muted shadow-sm">
              <span className="size-2 rounded-full bg-ios-green animate-pulse" />
              <span className="font-semibold text-fg">Communications workspace</span>
              <span aria-hidden="true" className="text-faint">·</span>
              <span>Voice, privacy, and remote work</span>
            </div>

            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.04] tracking-tight text-fg sm:text-5xl lg:text-6xl">
              A clearer line for every <span className="text-volt">conversation.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
              Global browser calling, private network access, and flexible remote workstations in one connected workspace.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/pricing" className={buttonVariants({ size: "lg" })}>
                <span>Explore plans</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link to="/console" className={buttonVariants({ variant: "line", size: "lg" })}>
                <span>Open the console</span>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="size-3.5 text-volt" />
                Private callsign access
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Radio className="size-3.5 text-ios-green" />
                Global voice coverage
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="size-3.5 text-volt" />
                Encrypted connectivity
              </span>
            </div>
          </div>

          <div className="hero-visual lg:col-span-6">
            <div className="hero-photo-frame relative aspect-[5/4] overflow-hidden rounded-3xl bg-raised shadow-xl shadow-slate-900/15">
              <img
                src={HERO_IMAGE}
                alt="Call-center support agent wearing a headset and answering a customer"
                className="hero-photo absolute inset-0 size-full object-cover"
                fetchPriority="high"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/5" />
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-xs font-medium text-white backdrop-blur-md sm:right-6 sm:top-6">
                <span className="size-2 rounded-full bg-ios-green animate-pulse" />
                Ready across 100+ regions
              </div>
              <div className="hero-live-card absolute bottom-4 left-4 right-4 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl sm:bottom-6 sm:left-6 sm:right-auto sm:w-80">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-volt/10 text-volt">
                    <PhoneCall className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-fg">Workspace preview</p>
                    <p className="mt-0.5 text-xs text-muted">Voice support · New York</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-ios-green">
                    <span className="size-1.5 rounded-full bg-ios-green" />
                    Ready
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <div className="hero-wave flex h-6 items-center gap-1" aria-hidden="true">
                    {[10, 18, 12, 22, 14, 20, 9, 17, 12, 21, 11].map((height, index) => (
                      <span key={index} style={{ height: `${height}px` }} />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-muted">Voice, messaging, and routing</span>
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      <section data-reveal className="home-story border-y border-line bg-white py-8 md:py-12">
        <Wrap className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="relative min-h-72 overflow-hidden rounded-3xl bg-raised shadow-lg shadow-slate-900/10 lg:col-span-7">
            <img
              src={CUSTOMER_CALL_IMAGE}
              alt="Customer support professional speaking on a phone while using a laptop"
              className="absolute inset-0 size-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl sm:bottom-6 sm:left-6">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">One connected workspace</p>
              <p className="mt-1 text-lg font-semibold text-fg">Every conversation, in context.</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                <span className="size-2 rounded-full bg-ios-green" />
                Voice, messaging, and teams
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-volt">Made for customer teams</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              A clearer view of every customer conversation.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Bring voice, messaging, and routing together, then give your team the context to respond with confidence.
            </p>
            <ul className="mt-6 grid gap-3 text-sm text-fg sm:grid-cols-2">
              <li className="flex items-center gap-2"><PhoneCall className="size-4 text-volt" /> One shared conversation timeline</li>
              <li className="flex items-center gap-2"><Globe className="size-4 text-volt" /> Teams across every time zone</li>
            </ul>
            <Link to="/voice" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-volt px-5 text-sm font-semibold text-ink shadow-md shadow-volt/20 transition hover:bg-volt-hover">
              Explore the voice workspace
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Wrap>
      </section>

      {/* 4-Metric Glass Shelf */}
      <section data-reveal className="border-y border-line bg-white/[0.015]">
        <Wrap className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-line lg:divide-y-0 lg:divide-x">
          {[
            { metric: "100+", label: "Countries & DIDs", detail: "Instant number provisioning" },
            { metric: "<18 ms", label: "Edge VoIP Latency", detail: "Direct Tier-1 peering" },
            { metric: "0", label: "KYC Documents", detail: "Callsign is your whole ID" },
            { metric: "100%", label: "On-Chain Privacy", detail: "USDT, BTC, ETH, XMR accepted" },
          ].map((item, idx) => (
            <div key={idx} className="p-6 md:p-8">
              <p className="text-3xl md:text-4xl font-semibold tracking-tight text-white tabular-nums">
                {item.metric}
              </p>
              <p className="mt-1 text-sm font-medium text-fg">{item.label}</p>
              <p className="mt-0.5 text-xs text-muted">{item.detail}</p>
            </div>
          ))}
        </Wrap>
      </section>

      <section data-reveal className="border-b border-line bg-white py-16 md:py-20">
        <Wrap className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-volt">Live workspace preview</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              See the voice tools in motion.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Switch between the softphone, edge regions, and codec details. The preview is interactive; calls are simulated locally.
            </p>
            <Link to="/voice" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-volt px-5 text-sm font-semibold text-ink shadow-md shadow-volt/20 transition hover:bg-volt-hover">
              Explore voice
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <div className="mx-auto w-full max-w-xl">
              <InteractiveTelecomIsland activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
        </Wrap>
      </section>

      {/* Interactive Products Showcase */}
      <section id="products" data-reveal className="scroll-mt-24 py-20 md:py-28">
        <Wrap>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-volt">The Three Pillars</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl text-white">
              An all-in-one communications stack.
            </h2>
            <p className="mt-3 text-base text-muted">
              Legacy providers charge separate bills for voice lines, VPN access, and secure remote computing. Vela unites all three under one callsign.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Voice Pillar */}
            <div data-reveal className="ios-glass flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:border-white/20">
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/40 border border-white/5">
                  <img
                    src={HERO_IMAGE}
                    alt="Call-center support agent wearing a headset at her workstation"
                    className="size-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                    <PhoneCall className="size-3 text-volt" />
                    <span>Carrier Voice</span>
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">Browser Softphone & Dialer</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Inbound, outbound, SMS, predictive dialing, and IVR call routing right in your browser. Present any international DID with crystal-clear Opus audio.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-fg/90">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-volt" />
                    No software or desktop client install required
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-volt" />
                    Predictive list dialer with human voice detection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-volt" />
                    Unlimited agent seats without per-seat taxes
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-line">
                <Link to="/voice" className="inline-flex items-center gap-2 text-sm font-medium text-volt hover:underline">
                  <span>Launch Voice Console</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            {/* Tunnel Pillar */}
            <div data-reveal className="ios-glass flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:border-white/20">
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/40 border border-white/5">
                  <img
                    src={PHONE_SUPPORT_IMAGE}
                    alt="Customer service professional speaking on a phone at her desk"
                    className="size-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                    <Shield className="size-3 text-ios-green" />
                    <span>Private Mesh</span>
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">WireGuard Encrypted Tunnel</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Fast, ultra-quiet WireGuard tunnels across 12 international egress hubs. Built-in hard kill switch ensures no unencrypted IP leaks ever leave your device.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-fg/90">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-ios-green" />
                    Hardware kill switch active by default
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-ios-green" />
                    12 high-bandwidth low-latency egress points
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-ios-green" />
                    Dedicated exit IP reservation on Foundry
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-line">
                <Link to="/tunnel" className="inline-flex items-center gap-2 text-sm font-medium text-volt hover:underline">
                  <span>Configure Tunnels</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>

            {/* Desk Pillar */}
            <div data-reveal className="ios-glass flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:border-white/20">
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/40 border border-white/5">
                  <img
                    src={CUSTOMER_CALL_IMAGE}
                    alt="Customer support professional handling a phone call with a laptop open"
                    className="size-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                    <Monitor className="size-3 text-ios-purple" />
                    <span>Ephemeral VM</span>
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">Disposable Remote Desktops</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Dedicated Windows 11 remote workstations tied directly to your WireGuard gateway. All disks and session records are cryptographically wiped upon cancellation.
                </p>

                <ul className="mt-4 space-y-2 text-xs text-fg/90">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-ios-purple" />
                    2 to 8 vCPU with up to 32 GB RAM options
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-ios-purple" />
                    Local clipboard isolation and locked gateway
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-ios-purple" />
                    Zero residual data retention upon term end
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-line">
                <Link to="/desk" className="inline-flex items-center gap-2 text-sm font-medium text-volt hover:underline">
                  <span>Explore Desktops</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      <section id="solutions" data-reveal className="scroll-mt-24 border-y border-line bg-white py-16 md:py-20">
        <Wrap className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-volt">Solutions</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              One workspace, shaped around your team.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
              Start with the tools you need today. Add global voice, private connectivity, or a remote workstation as your operation grows.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {SOLUTIONS.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Link
                  key={solution.title}
                  to={solution.to}
                  data-reveal
                  style={{ transitionDelay: `${index * 90}ms` }}
                  className="group flex min-h-36 items-start gap-4 rounded-2xl border border-line bg-card-hover p-5 transition duration-200 hover:-translate-y-0.5 hover:border-volt/30 hover:bg-white"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-volt shadow-sm">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-fg">{solution.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{solution.detail}</span>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-volt">
                      {solution.action}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Wrap>
      </section>

      {/* Head-to-Head Comparison: VELA vs. Voiso & Zadarma */}
      <section id="trust" data-reveal className="scroll-mt-24 border-t border-line py-20 md:py-28 bg-white/[0.01]">
        <Wrap>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-wider text-volt">Uncompromised Architecture</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl text-white">
              Why leading operators choose Vela over Voiso and Zadarma
            </h2>
            <p className="mt-3 text-base text-muted">
              Built from scratch for teams requiring real privacy, zero bureaucratic onboarding, and predictable flat workspace billing.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <div className="min-w-[680px] ios-glass rounded-3xl overflow-hidden border border-white/10">
              <div className="grid grid-cols-12 gap-4 border-b border-line bg-white/[0.03] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted">
                <div className="col-span-4">Capability</div>
                <div className="col-span-3 text-muted/70">Voiso</div>
                <div className="col-span-2 text-muted/70">Zadarma</div>
                <div className="col-span-3 text-volt font-bold">Vela</div>
              </div>

              <div className="divide-y divide-line">
                {COMPARISON_ROWS.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-4 px-6 py-4 text-sm items-center hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="col-span-4 font-medium text-white flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-volt/60" />
                      {row.feature}
                    </div>
                    <div className="col-span-3 text-muted">{row.voiso}</div>
                    <div className="col-span-2 text-muted">{row.zadarma}</div>
                    <div className="col-span-3 font-medium text-white flex items-center gap-2">
                      <span className="text-ios-green">✓</span>
                      {row.vela}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* Interactive Global Phone Numbers Selector */}
      <section data-reveal className="py-20 md:py-24 border-t border-line">
        <Wrap>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-volt">Global DID Fleet</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                Instant virtual phone numbers in 100+ countries
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                Pick a local, mobile, or toll-free DID. Provisioning happens automatically without paperwork.
              </p>
            </div>
            <Link to="/voice" className={buttonVariants({ variant: "line" })}>
              <span>View Full Inventory</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {DIDS.map((did) => {
              const isSelected = selectedDid === did.id;
              return (
                <div
                  key={did.id}
                  onClick={() => setSelectedDid(did.id)}
                  className={cn(
                    "ios-glass rounded-2xl p-4 cursor-pointer transition-all duration-200 border",
                    isSelected
                      ? "border-volt/60 bg-volt/[0.08] shadow-lg shadow-volt/10"
                      : "border-white/10 hover:border-white/20 hover:bg-white/[0.04]",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                      {did.country}
                    </span>
                    <span className="text-xs font-medium text-volt">{did.monthly} USDT/mo</span>
                  </div>
                  <p className="mt-2 font-mono text-base font-semibold text-white">{did.id}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted">
                    <span>{did.city}</span>
                    <span className="text-[11px] text-ios-green">● Active Route</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Wrap>
      </section>

      {/* Seat Math & Pricing Section */}
      <section data-reveal className="border-t border-line py-20 md:py-24 bg-white/[0.01]">
        <Wrap>
          <SeatMath />

          <div className="mt-16 pt-12 border-t border-line">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-volt">Transparent Billing</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Flat workspace rates for your whole floor</h2>
              </div>
              <Link to="/pricing" className={buttonVariants({ variant: "line" })}>
                Compare All Specifications
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {PLANS.map((plan) => (
                <Link
                  key={plan.id}
                  to="/checkout"
                  search={{ plan: plan.id, term: "month" }}
                  className={cn(
                    "ios-glass rounded-3xl p-6 transition-all duration-300 hover:scale-[1.01] hover:border-white/25 flex flex-col justify-between",
                    plan.featured ? "border-volt/60 bg-volt/[0.04] shadow-xl shadow-volt/10" : "border-white/10",
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-white">{plan.name}</p>
                      {plan.featured && (
                        <span className="rounded-full bg-volt/20 text-volt px-2.5 py-0.5 text-xs font-semibold">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-4xl font-semibold text-white tracking-tight tabular-nums">
                      {plan.price}
                      <span className="ml-2 text-sm font-normal text-muted">USDT / mo</span>
                    </p>
                    <p className="mt-3 text-sm text-muted">{plan.blurb}</p>

                    <div className="my-6 border-t border-line" />

                    <ul className="space-y-2.5 text-xs text-fg/90">
                      {plan.features.slice(0, 5).map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-volt">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line">
                    <span className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-volt">
                      <span>Choose {plan.name}</span>
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      {/* FAQ Accordion */}
      <section data-reveal className="border-t border-line py-20 md:py-24">
        <Wrap className="max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-volt">Got Questions?</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Everything you need to know</h2>
            <p className="mt-2 text-sm text-muted">
              Clear answers regarding privacy, KYC, carrier quality, and cryptography.
            </p>
          </div>

          <Accordion.Root type="single" collapsible className="mt-10 divide-y divide-line border-y border-line">
            {FAQ.map((item) => (
              <Accordion.Item key={item.q} value={item.q} className="py-2">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-base font-medium text-white hover:text-volt transition-colors">
                    {item.q}
                    <ChevronDown className="size-4 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pb-4 text-sm text-muted leading-relaxed">
                  {item.a}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Wrap>
      </section>

      <section data-reveal className="border-t border-line bg-white py-14 md:py-16">
        <Wrap className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-volt">AI assistant shortcuts</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Explore the platform with your preferred assistant.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Start a separate conversation with a product brief. These links open external services; they do not connect an account or share private data.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {AI_ASSISTANTS.map((assistant, index) => (
              <a
                key={assistant.name}
                href={assistant.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${assistant.name} with the VELA product brief`}
                data-reveal
                style={{ transitionDelay: `${index * 70}ms` }}
                className="group flex min-h-14 items-center justify-between rounded-xl border border-line bg-card-hover px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-volt/30 hover:bg-white"
              >
                <span className="font-semibold text-fg">{assistant.name}</span>
                <ExternalLink className="size-4 text-muted transition-colors group-hover:text-volt" />
              </a>
            ))}
          </div>
        </Wrap>
      </section>

      <section data-reveal className="border-y border-line bg-card-hover py-14 md:py-16">
        <Wrap className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-volt">Ready when you are</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Bring your team online with one connected workspace.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              Compare plans or explore the live console to see how VELA fits your operation.
            </p>
          </div>
          <div className="flex w-full flex-wrap gap-3 md:w-auto md:shrink-0">
            <Link to="/pricing" className={buttonVariants({ size: "lg" })}>
              Compare plans
              <ArrowRight className="size-4" />
            </Link>
            <Link to="/console" className={buttonVariants({ variant: "line", size: "lg" })}>
              Open console
            </Link>
          </div>
        </Wrap>
      </section>
    </div>
  );
}

// Interactive Apple-Style Telephony Island Component
function InteractiveTelecomIsland({
  activeTab,
  setActiveTab,
}: {
  activeTab: "phone" | "edge" | "specs";
  setActiveTab: (tab: "phone" | "edge" | "specs") => void;
}) {
  const [dialed, setDialed] = useState("+1 212 555 0148");
  const [callActive, setCallActive] = useState(false);
  const [callTimer, setCallTimer] = useState(0);

  useEffect(() => {
    let interval: number;
    if (callActive) {
      interval = window.setInterval(() => setCallTimer((t) => t + 1), 1000);
    } else {
      setCallTimer(0);
    }
    return () => clearInterval(interval);
  }, [callActive]);

  const handleDigitPress = (d: string) => {
    playKeyTone(d);
    setDialed((prev) => (prev.length < 18 ? prev + d : prev));
  };

  const handleCall = () => {
    if (callActive) {
      setCallActive(false);
    } else {
      setCallActive(true);
      const stopRing = playRingbackTone();
      setTimeout(stopRing, 2500);
    }
  };

  const formatSecs = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="ios-glass rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden border border-white/15">
      {/* Top Segmented Controls */}
      <div className="flex items-center justify-between gap-2 border-b border-line pb-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.06] border border-white/5">
          <button
            type="button"
            onClick={() => setActiveTab("phone")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
              activeTab === "phone" ? "bg-white text-black shadow-sm" : "text-muted hover:text-white",
            )}
          >
            Softphone
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("edge")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
              activeTab === "edge" ? "bg-white text-black shadow-sm" : "text-muted hover:text-white",
            )}
          >
            Edge Hubs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
              activeTab === "specs" ? "bg-white text-black shadow-sm" : "text-muted hover:text-white",
            )}
          >
            Codec
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-ios-green animate-pulse" />
          <span className="text-[11px] font-mono text-muted uppercase">Opus 48kHz</span>
        </div>
      </div>

      {activeTab === "phone" && (
        <div className="mt-5 space-y-4">
          {/* Virtual Active Call Display */}
          <div className="rounded-2xl bg-black/40 border border-white/10 p-4 text-center relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-muted">
              <span>Carrier DID: +1 212 555 0148</span>
              <span className="font-mono text-volt">{callActive ? formatSecs(callTimer) : "Ready"}</span>
            </div>

            <p className="mt-2 text-2xl font-mono font-semibold tracking-wider text-white">
              {dialed || "Enter number"}
            </p>

            {/* Soundwave animation when call is active */}
            {callActive ? (
              <div className="vela-wave mt-3 flex h-7 items-center justify-center gap-1">
                {[12, 24, 18, 30, 26, 14, 28, 20, 16, 28, 14].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-volt"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-2 text-xs text-muted">WebRTC encrypted session · Audio rendered locally</p>
            )}
          </div>

          {/* Interactive Dial Keypad with Web Audio DTMF feedback */}
          <div className="grid grid-cols-3 gap-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleDigitPress(key)}
                className="h-11 rounded-xl bg-white/[0.04] border border-white/5 text-base font-semibold text-white hover:bg-white/[0.1] active:scale-95 transition-all flex items-center justify-center"
              >
                {key}
              </button>
            ))}
          </div>

          {/* Call / End Controls */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setDialed((prev) => prev.slice(0, -1))}
              className="h-11 px-4 rounded-xl border border-line text-xs font-medium text-muted hover:text-white hover:bg-white/5 transition-all"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleCall}
              className={cn(
                "flex-1 h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-98",
                callActive
                  ? "bg-hangup text-ink shadow-lg shadow-hangup/25"
                  : "bg-ios-green text-ink shadow-lg shadow-ios-green/25",
              )}
            >
              {callActive ? (
                <>
                  <PhoneOff className="size-4" />
                  <span>End Call</span>
                </>
              ) : (
                <>
                  <Phone className="size-4" />
                  <span>Start Test Call</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {activeTab === "edge" && (
        <div className="mt-4 space-y-2 max-h-72 overflow-y-auto pr-1">
          <p className="text-xs text-muted mb-3">Live latency to global WebRTC & SIP media gateways:</p>
          {REGIONS.slice(0, 6).map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="size-3.5 text-volt" />
                <span className="font-medium text-white">{r.city}</span>
                <span className="text-muted/60">({r.id.toUpperCase()})</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-ios-green font-semibold tabular-nums">{r.ms} ms</span>
                <div className="w-12 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-volt" style={{ width: `${100 - r.ms}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "specs" && (
        <div className="mt-4 space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
            <div className="flex items-center justify-between text-white font-medium">
              <span>Opus Fullband Audio</span>
              <span className="text-ios-green">Active (48 kHz)</span>
            </div>
            <p className="mt-1 text-muted">
              Dynamic adaptive bitrate (6kbps – 510kbps) with packet loss concealment. Far superior to legacy G.711.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
            <div className="flex items-center justify-between text-white font-medium">
              <span>SRTP / DTLS 1.3 Encryption</span>
              <span className="text-volt">Enforced</span>
            </div>
            <p className="mt-1 text-muted">
              End-to-end media encryption prevents eavesdropping on open Wi-Fi or cellular connections.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
            <div className="flex items-center justify-between text-white font-medium">
              <span>Direct Carrier Interconnect</span>
              <span className="text-ios-purple">Tier-1 SIP</span>
            </div>
            <p className="mt-1 text-muted">
              Redundant upstream routes to Verizon, Lumen, Telstra, and Deutsche Telekom.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
