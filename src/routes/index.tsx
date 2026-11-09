import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import * as Accordion from "@radix-ui/react-accordion";
import {
  ChevronDown,
  Phone,
  PhoneOff,
  Shield,
  ArrowRight,
  Globe,
  Radio,
  Sparkles,
  Zap,
  CheckCircle2,
  Cpu,
  RotateCw,
  ExternalLink,
  Check,
} from "lucide-react";
import { Wrap } from "@/components/shell";
import { SeatMath } from "@/components/seat-math";
import { buttonVariants } from "@/components/ui/button";
import { FAQ, REGIONS } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { playKeyTone, playRingbackTone } from "@/lib/dtmf";
import {
  VoisoPointer,
} from "@/components/voiso-graphics";
import {
  OMNI_CHANNELS,
  CRM_INTEGRATIONS,
  CLIENT_LOGOS,
} from "@/lib/voiso-data";
import { VoisoDarkDialer } from "@/components/voiso-dialer";

// Human photography assets
import CALL_CENTER_AGENT_IMAGE from "@/assets/images/call-center-agent.jpg";
import VOISO_SALES_MAN_IMAGE from "@/assets/images/voiso_sales_man_1794106456204.jpg";
import VOISO_SUPPORT_WOMAN_IMAGE from "@/assets/images/voiso_support_woman_1794106474658.jpg";
import VOISO_REMOTE_MAN_IMAGE from "@/assets/images/voiso_remote_man_1794106528829.jpg";
import COPILOT_AGENT_IMAGE from "@/assets/images/copilot-agent.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

// Authentic official AI model logos
function ClaudeLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={cn("size-5 text-[#D97757]", className)} fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
      />
    </svg>
  );
}

function OpenAiLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden="true">
      <path
        fill="#10A37F"
        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
      />
    </svg>
  );
}

function GeminiLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="gemini-official-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1BA1E3" />
          <stop offset="50%" stopColor="#4E87F8" />
          <stop offset="100%" stopColor="#9B72CB" />
        </linearGradient>
      </defs>
      <path
        fill="url(#gemini-official-grad)"
        d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"
      />
    </svg>
  );
}

function MetaLlamaLogo({ className = "size-5" }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" className={cn("size-5 text-[#0081FB]", className)} fill="currentColor" aria-hidden="true">
      <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" />
    </svg>
  );
}

const AI_RESEARCH_PROMPT = encodeURIComponent(
  "Evaluate VELA Communications Cloud: browser voice dialer in 130+ countries, multi-LLM speech analytics with Claude, Gemini, and GPT-4o, WireGuard private tunnels, and disposable remote desktops.",
);

const AI_ASSISTANTS = [
  { name: "ChatGPT (GPT-4o)", href: `https://chatgpt.com/?q=${AI_RESEARCH_PROMPT}`, Logo: OpenAiLogo, color: "text-[#10A37F]" },
  { name: "Claude 3.5 Sonnet", href: `https://claude.ai/new?q=${AI_RESEARCH_PROMPT}`, Logo: ClaudeLogo, color: "text-[#D97757]" },
  { name: "Google Gemini", href: "https://gemini.google.com/app", Logo: GeminiLogo, color: "text-[#4E87F8]" },
  { name: "Meta Llama", href: "https://llama.meta.com", Logo: MetaLlamaLogo, color: "text-[#0081FB]" },
];

const COMPARISON_ROWS = [
  {
    feature: "Agent seat planning",
    vela: "Illustrative tier limits; no live billing",
    legacy: "Not evaluated",
    zadarma: "Not evaluated",
  },
  {
    feature: "AI and predictive dialing",
    vela: "Sample UI only; no AI or calling service connected",
    legacy: "Not evaluated",
    zadarma: "Not evaluated",
  },
  {
    feature: "Phone numbers and verification",
    vela: "Example regions; carrier and identity requirements unconfirmed",
    legacy: "Varies by provider and region",
    zadarma: "Varies by provider and region",
  },
  {
    feature: "RDP and VPN",
    vela: "RDP is required for the proposed agent workflow; VPN is separate",
    legacy: "Availability and requirements not evaluated",
    zadarma: "Availability and requirements not evaluated",
  },
  {
    feature: "External provider comparison",
    vela: "Concept preview; no operational services",
    legacy: "Confirm directly with each provider",
    zadarma: "Confirm directly with each provider",
  },
];

const LLM_MODELS = [
  {
    id: "claude",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    brandColor: "#D97757",
    badgeBg: "bg-[#FAECE5] text-[#A64526] border-[#F2C4B2]",
    Logo: ClaudeLogo,
    focus: "Nuanced Empathy & Objection Handling",
    description:
      "Industry-leading conversational reasoning. Detects subtle emotional friction, customer hesitation, and guides agents with tailored, de-escalation responses during high-stakes sales and support calls.",
    latency: "180 ms",
    bestFor: "Complex B2B negotiations & VIP customer retention",
    samplePrompt: "Customer mentions competitor pricing is 20% lower but needs guaranteed 99.99% uptime.",
    sampleOutput:
      "Coach: Acknowledge the budget priority immediately, then pivot to our redundant 12-hub carrier mesh and carrier SLA which mitigates downtime costs that dwarf the 20% delta.",
  },
  {
    id: "gpt",
    name: "GPT-4o",
    provider: "OpenAI",
    brandColor: "#10A37F",
    badgeBg: "bg-[#E6F7F2] text-[#0D7A5F] border-[#A8E5D3]",
    Logo: OpenAiLogo,
    focus: "Real-Time Translation & CRM Auto-Sync",
    description:
      "Blazing sub-second speech synthesis and structured extraction. Automatically parses spoken caller details into structured CRM fields (deal size, target go-live date, decision makers) while the call is still live.",
    latency: "110 ms",
    bestFor: "High-velocity outbound sales & multilingual support",
    samplePrompt: "Extract contact details, renewal timeline, and generate CRM action note.",
    sampleOutput:
      "Structured CRM Payload: { account: 'Acme Global', term: 'Annual Enterprise', seats: 45, next_step: 'Send contract by Friday', sentiment: 'Highly Receptive' }",
  },
  {
    id: "gemini",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    brandColor: "#4E87F8",
    badgeBg: "bg-blue-50 text-blue-800 border-blue-300",
    Logo: GeminiLogo,
    focus: "Multimodal Long-Context Call Audit",
    description:
      "Unrivaled 2-million-token context window. Ingests full 2-hour recorded meetings, cross-referencing call audio with attached product PDFs and compliance guidelines to spot regulatory discrepancies in seconds.",
    latency: "220 ms",
    bestFor: "Compliance QA, medical/financial telecom & call auditing",
    samplePrompt: "Audit 45-minute mortgage disclosure call against SEC / FINRA compliance rules.",
    sampleOutput:
      "Audit Result: 100% Mandatory Disclosure Compliance verified at minute 14:22. Zero prohibited promissory claims detected. Audio wave pattern matches authentic agent.",
  },
  {
    id: "llama",
    name: "Llama 3.3 70B",
    provider: "Meta (Private On-Prem)",
    brandColor: "#0081FB",
    badgeBg: "bg-sky-50 text-sky-800 border-sky-300",
    Logo: MetaLlamaLogo,
    focus: "Air-Gapped Private Cloud Inference",
    description:
      "Complete data sovereignty. Runs locally inside private VPCs with zero third-party data egress, ensuring strict HIPAA, GDPR, and defense-grade telecommunications confidentiality.",
    latency: "95 ms",
    bestFor: "Zero-egress banking, healthcare & private operations",
    samplePrompt: "Summarize sensitive patient triage call without sending data to public cloud.",
    sampleOutput:
      "Local Edge Inference: Session wiped from memory post-summary. Secure token dispatched to local hospital database via WireGuard encrypted mesh.",
  },
];

function Home() {
  const [activeTab, setActiveTab] = useState<"phone" | "edge" | "specs">("phone");
  const [selectedLlm, setSelectedLlm] = useState(LLM_MODELS[0].id);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);

  // Voiso Hero Carousel Slide
  const [heroSlide, setHeroSlide] = useState(0);

  // Flow Builder Interactive Test State
  const [activeIvrKey, setActiveIvrKey] = useState<"key1" | "key2" | "key3">("key1");

  // Omnichannel Active Channel
  const [selectedChannel, setSelectedChannel] = useState("whatsapp");
  const [dispositionChecked, setDispositionChecked] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" },
    );

    targets.forEach((target) => {
      target.classList.add("reveal-ready");
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setHeroSlide((slide) => (slide + 1) % 3);
    }, 7000);
    return () => window.clearInterval(id);
  }, [heroSlide]);

  const currentLlmData = LLM_MODELS.find((m) => m.id === selectedLlm) || LLM_MODELS[0];

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisDone(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisDone(true);
    }, 1200);
  };

  return (
    <div className="relative overflow-x-hidden bg-[#FAFBFD]">
      {/* 1. HERO SECTION (2-COLUMN WITH AGENT PHOTO) */}
      <section className="relative overflow-hidden pt-8 pb-14 md:pt-12 md:pb-18">
        {/* Ambient Subtle Radial Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#1264d8]/15 via-blue-400/10 to-transparent blur-3xl" />

        <Wrap>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Column: Headlines, Email Capture & Badges */}
            <div className="lg:col-span-7 space-y-6">
              {/* Top Pill Tag */}
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-[#1264d8] shadow-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#1264d8] opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#1264d8]" />
                </span>
                <span>Design, automate, optimize · Next-Gen Communications Cloud</span>
              </div>

              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[58px]">
                A clearer line for every <span className="text-[#1264d8]">conversation.</span>
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed">
                Explore a product concept for business calling, CRM workflows,
                predictive dialing, and Windows RDP workstations. This preview
                uses sample data; phone carriers, payments, AI providers, and
                RDP provisioning are not connected.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/checkout"
                  search={{ plan: "lattice", term: "month" }}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1264d8] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#1264d8]/20 transition-all hover:bg-[#0e52b5]"
                >
                  Configure a sample order
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/integrations"
                  className="inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  View RDP & MicroSIP setup
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-2 border-t border-slate-200/80 pt-4 text-xs text-slate-500">
                <Shield className="size-4 text-amber-600" />
                <span>Preview only · no payment, account, number, or desktop is created</span>
              </div>
            </div>

            {/* Right Column: Illustrative call-center image and sample telemetry */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 aspect-[4/3] sm:aspect-[1/1] max-h-[520px]">
                <img
                  src={CALL_CENTER_AGENT_IMAGE}
                  alt="Illustrative customer support agent wearing a headset"
                  className="size-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/20" />

                {/* Sample call badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 shadow-lg border border-slate-200/80">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-slate-900 leading-tight">Sample call</p>
                    <p className="text-[9px] font-mono text-emerald-600 font-semibold">Illustrative number · 04:12</p>
                  </div>
                </div>

                {/* Floating Soundwave Equalizer - Top Right */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1.5 shadow-lg border border-slate-200/80">
                  <div className="flex items-center gap-0.5 h-4">
                    {[40, 85, 60, 100, 70, 45, 90].map((h, i) => (
                      <span
                        key={i}
                        className="w-1 bg-[#1264d8] rounded-full animate-soundwave"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 120}ms`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 font-mono">Opus 48kHz</span>
                </div>

                {/* Floating AI Copilot Guidance Card - Bottom */}
                <div className="absolute bottom-4 inset-x-4 z-20 rounded-2xl bg-white/95 backdrop-blur-md p-3.5 shadow-2xl border border-slate-200/80">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <ClaudeLogo className="size-4" />
                      <span className="text-xs font-bold text-slate-900">                      Example AI copilot</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Sample metrics
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-700 leading-relaxed font-medium">
                    <span className="text-[#1264d8] font-bold">Example suggestion:</span> Caller asked about pricing. This is sample interface content, not a live AI response.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Wrap>

        {/* Enterprise Logos Marquee */}
        <div className="mt-14 border-y border-slate-200/80 bg-white/80 py-6">
          <Wrap>
            <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
              Example platform names · no customer or partnership claim
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-75 grayscale hover:grayscale-0 transition-all">
              {CLIENT_LOGOS.map((client, i) => (
                <span
                  key={i}
                  className="text-sm font-bold tracking-tight text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {client}
                </span>
              ))}
            </div>
          </Wrap>
        </div>
      </section>

      {/* 2. SLIDING CAROUSEL BANNER CARDS matching Screenshot 043512 */}
      <section data-reveal className="py-8">
        <Wrap>
          <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-all">
            {/* Slide 0: Navy Blue "Embrace AI" */}
            {heroSlide === 0 && (
              <div className="banner-in bg-[#072B56] text-white p-8 sm:p-12 lg:p-16 grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                    Embrace AI
                  </span>
                  <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                    Elevate engagement with AI-powered tools
                  </h2>
                  <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
                    Explore sample predictive-dialer and speech-analytics
                    screens. No calls, transcripts, or AI processing are
                    connected in this preview.
                  </p>
                  <div className="mt-8">
                    <Link
                      to="/pricing"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#072B56] hover:bg-slate-100 transition-all shadow-lg"
                    >
                      <span>Explore</span>
                    </Link>
                  </div>
                </div>

                {/* Right Visual: Toggle Card with Avatars */}
                <div className="lg:col-span-5 relative flex items-center justify-center">
                  <div className="relative rounded-2xl bg-white text-fg p-6 shadow-2xl w-full max-w-md border border-slate-100">
                    <div className="space-y-4">
                      {/* Toggle 1: Predictive Dialer */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <span className="text-sm font-bold text-fg">AI Predictive Dialer</span>
                        <div className="relative flex items-center">
                          <span className="w-11 h-6 bg-volt rounded-full flex items-center p-1 transition-colors">
                            <span className="size-4 bg-white rounded-full translate-x-5 transition-transform" />
                          </span>
                          <div className="absolute -top-1 -right-2">
                            <VoisoPointer className="size-5" />
                          </div>
                        </div>
                      </div>

                      {/* Toggle 2: AMD */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <span className="text-sm font-medium text-slate-700">AI Answering Machine Detection</span>
                        <span className="w-11 h-6 bg-slate-200 rounded-full flex items-center p-1">
                          <span className="size-4 bg-white rounded-full" />
                        </span>
                      </div>

                      {/* Toggle 3: Local Caller ID */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Local Caller ID</span>
                        <span className="w-11 h-6 bg-slate-200 rounded-full flex items-center p-1">
                          <span className="size-4 bg-white rounded-full" />
                        </span>
                      </div>
                    </div>

                    {/* Surrounding Live Agent Avatars */}
                    <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                      {[
                        { name: "James Wilkins", status: "Active call" },
                        { name: "Becky Simmons", status: "Available" },
                        { name: "Steven Weller", status: "Inbound" },
                        { name: "Bianca Howard", status: "Active call" },
                      ].map((a, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-50 p-2 border border-slate-100">
                          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                          <div>
                            <p className="font-bold text-fg text-[11px] leading-tight">{a.name}</p>
                            <p className="text-[10px] text-muted">{a.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 1: Forest Emerald "Intelligent workflows" */}
            {heroSlide === 1 && (
              <div className="banner-in bg-[#054E38] text-white p-8 sm:p-12 lg:p-16 grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                    Intelligent workflows
                  </span>
                  <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                    Smarter flows, faster results
                  </h2>
                  <p className="mt-4 text-base sm:text-lg text-emerald-100 leading-relaxed max-w-xl">
                    Explore illustrative IVR, chatbot, and skill-based queue
                    concepts. This demo does not route calls or connect to a
                    live contact center.
                  </p>
                  <div className="mt-8">
                    <a
                      href="#flow-builder"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#054E38] hover:bg-slate-100 transition-all shadow-lg"
                    >
                      <span>Explore Flow Builder</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="rounded-2xl bg-white p-6 shadow-2xl text-fg w-full max-w-md border border-slate-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">Active Flow Pipeline</p>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900">
                        <span className="flex size-6 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-[10px]">1</span>
                        <span>IVR Language Detection (Opus 48kHz)</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900">
                        <span className="flex size-6 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-[10px]">2</span>
                        <span>Claude 3.5 Sentiment & Urgency Classification</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-900">
                        <span className="flex size-6 items-center justify-center rounded-lg bg-purple-600 text-white font-bold text-[10px]">3</span>
                        <span>Route to VIP Tier-1 Softphone Queue</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 2: Deep Royal "Omnichannel" */}
            {heroSlide === 2 && (
              <div className="banner-in bg-[#1E1B4B] text-white p-8 sm:p-12 lg:p-16 grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                    Many channels, one platform
                  </span>
                  <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                    Unified omnichannel customer experience
                  </h2>
                  <p className="mt-4 text-base sm:text-lg text-indigo-100 leading-relaxed max-w-xl">
                    Unify voice, messaging apps, and SMS in one platform for easy management. Provide personalized support, boost satisfaction, and strengthen relationships.
                  </p>
                  <div className="mt-8">
                    <a
                      href="#omnichannel"
                      className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-[#1E1B4B] hover:bg-slate-100 transition-all shadow-lg"
                    >
                      <span>Explore Omnichannel</span>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="rounded-2xl bg-white p-5 shadow-2xl text-fg w-full max-w-md">
                    <p className="text-xs font-bold text-muted mb-3">Example channel overview</p>
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      {OMNI_CHANNELS.slice(0, 8).map((c) => (
                        <div key={c.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-lg">{c.icon}</span>
                          <p className="font-semibold text-fg text-[10px] mt-1 truncate">{c.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Elongated Dot Indicators matching Screenshot 043512 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setHeroSlide(i)}
                  className={cn(
                    "h-2 rounded-full transition-all cursor-pointer",
                    heroSlide === i ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70",
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      {/* 3. SECTION: ACCELERATE YOUR SALES (OUTBOUND) matching Screenshot 043613 & 043556 */}
      <section id="sales" data-reveal className="py-20 md:py-28 bg-white border-b border-line">
        <Wrap className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-300 bg-pink-50 px-3.5 py-1 text-xs font-semibold text-pink-700">
              Outbound
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
              Accelerate your sales
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              VELA helps your sales team connect faster and convert more. With omnichannel communication, predictive dialer, answering machine detection, and local caller ID, it maximizes call efficiency and ensures more conversations with the right prospects.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/pricing"
                className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-800 hover:border-[#1264d8] hover:text-[#1264d8] transition-colors"
              >
                Explore Sales &gt;
              </Link>
              <Link
                to="/pricing"
                className="rounded-full bg-[#1264d8] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0e52b5] shadow-md shadow-[#1264d8]/20 transition-all"
              >
                Try for Free
              </Link>
            </div>
          </div>

          {/* Right Visual: Soft pink background with centered portrait and perimeter-aligned cards */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[36px] bg-[#FCE6EE] overflow-hidden shadow-xl border border-pink-200/70 min-h-[500px] md:min-h-[560px] flex items-end justify-center">
              {/* Circular Trending Icon in top-left */}
              <div className="absolute top-6 left-6 z-20 size-12 rounded-2xl bg-[#98104E] text-white flex items-center justify-center shadow-md">
                <span className="text-xl">📈</span>
              </div>

              {/* Floating Top-Right: Use Local Caller ID */}
              <div className="absolute top-6 right-6 z-20 rounded-2xl bg-white p-3.5 shadow-xl border border-slate-100 w-56 sm:w-60 hidden sm:block">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">Use Local Caller ID</span>
                  <div className="relative flex items-center">
                    <span className="w-8 h-4.5 bg-[#1264d8] rounded-full flex items-center p-0.5">
                      <span className="size-3.5 bg-white rounded-full translate-x-3.5 transition-transform" />
                    </span>
                    <div className="absolute -top-1 -right-2">
                      <VoisoPointer className="size-4" />
                    </div>
                  </div>
                </div>
                <div className="mt-2 space-y-1 text-[11px] font-mono text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>🇫🇮 +35898564713</span>
                    <span className="text-slate-400">✕</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>🇳🇴 +4722859417</span>
                    <span className="text-slate-400">✕</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>🇸🇪 +4686573298</span>
                    <span className="text-slate-400">✕</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>🇩🇰 +4533914265</span>
                    <span className="text-slate-400">✕</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Assigned team:</span>
                  <span className="font-semibold text-[#1264d8]">Nordic Sales</span>
                </div>
              </div>

              {/* Centered Portrait: Smiling Sales Man in Light Pink Shirt (100% Unobstructed) */}
              <img
                src={VOISO_SALES_MAN_IMAGE}
                alt="Sales representative smiling with arms crossed in pink shirt"
                className="relative z-10 h-[460px] md:h-[530px] w-auto max-w-full object-cover object-bottom pointer-events-none select-none"
              />

              {/* Floating Bottom-Left: Compact Dark Voiso Dialpad Softphone (Tucked cleanly at corner) */}
              <div className="absolute bottom-4 left-4 z-20 scale-75 sm:scale-80 origin-bottom-left max-w-[240px] hidden md:block">
                <VoisoDarkDialer
                  contactName="Simon Atwell"
                  phoneNumber="+44 7488 803 758"
                  initialTime="02:58"
                  isFloating
                />
              </div>

              {/* Bottom-Right: AI Predictive Dialer Toggle & Mini Agent Stack */}
              <div className="absolute bottom-6 right-6 z-20 space-y-3 hidden sm:block">
                {/* Mini Agent Stack */}
                <div className="space-y-1.5 w-44">
                  {[
                    { name: "Simon Atwell", status: "Active call", active: true },
                    { name: "Becky Simmons", status: "● ● ●", active: false },
                    { name: "Bianca Howard", status: "● ● ●", active: false },
                    { name: "Steven Weller", status: "● ● ●", active: false },
                  ].map((agent, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl bg-white/95 backdrop-blur-sm px-3 py-1.5 shadow-md border border-slate-100 text-xs">
                      <span className="font-bold text-slate-800 text-[11px] truncate">{agent.name}</span>
                      <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-md", agent.active ? "bg-blue-50 text-[#1264d8]" : "text-slate-400")}>
                        {agent.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Toggle Card */}
                <div className="rounded-2xl bg-white p-3.5 shadow-xl border border-slate-100 text-xs w-56">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900">AI Predictive Dialer</span>
                    <div className="relative">
                      <span className="w-8 h-4 bg-[#1264d8] rounded-full flex items-center p-0.5">
                        <span className="size-3 bg-white rounded-full translate-x-4" />
                      </span>
                      <div className="absolute -top-1 -right-2">
                        <VoisoPointer className="size-3.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-slate-600 text-[11px]">AI AMD Detection</span>
                    <span className="w-8 h-4 bg-slate-200 rounded-full flex items-center p-0.5">
                      <span className="size-3 bg-white rounded-full" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 4. SECTION: ELEVATE CUSTOMER SUPPORT (INBOUND) matching Screenshot 043605 */}
      <section id="support" data-reveal className="py-20 md:py-28 bg-[#FAFBFD] border-b border-line">
        <Wrap className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Visual: Warm Peach container with smiling woman support specialist */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative rounded-[36px] bg-[#FEE2D5] overflow-hidden shadow-xl border border-orange-200/70 min-h-[500px] md:min-h-[560px] flex items-end justify-center">
              {/* Top-Right Thumbs Up Pill */}
              <div className="absolute top-6 right-6 z-20 size-12 rounded-2xl bg-[#E8592A] text-white flex items-center justify-center shadow-md">
                <span className="text-xl">👍</span>
              </div>

              {/* Floating Chat Message Cards on Left */}
              <div className="absolute top-6 left-6 z-20 space-y-2.5 max-w-[210px] hidden sm:block">
                <div className="rounded-xl bg-white/95 backdrop-blur-sm p-3 shadow-lg border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-500" />
                    <span className="font-bold text-slate-900 text-[11px]">Sabrina Hawkins</span>
                  </div>
                  <p className="mt-1 text-slate-600 text-[11px]">Thank you so much! 🙏</p>
                </div>
                <div className="rounded-xl bg-white/95 backdrop-blur-sm p-3 shadow-lg border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-blue-500" />
                    <span className="font-bold text-slate-900 text-[11px]">Alan Braithwaite</span>
                  </div>
                  <p className="mt-1 text-slate-600 text-[11px]">I've got an issue with my account...</p>
                </div>
                <div className="rounded-xl bg-white/95 backdrop-blur-sm p-3 shadow-lg border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-purple-500" />
                    <span className="font-bold text-slate-900 text-[11px]">Mia Phillips</span>
                  </div>
                  <p className="mt-1 text-slate-600 text-[11px]">Glad I could be of help! Have a great day.</p>
                </div>
              </div>

              {/* Centered Smiling Brunette Support Specialist (100% Unobstructed) */}
              <img
                src={VOISO_SUPPORT_WOMAN_IMAGE}
                alt="Customer support professional smiling with arms crossed"
                className="relative z-10 h-[460px] md:h-[530px] w-auto max-w-full object-cover object-bottom pointer-events-none select-none"
              />

              {/* Floating Visual Flow Builder Node Cards on Bottom Right */}
              <div className="absolute bottom-6 right-6 z-20 rounded-2xl bg-white/95 backdrop-blur-sm p-4 shadow-2xl border border-slate-100 text-xs w-64 hidden sm:block">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span className="text-[#1264d8]">::</span> DTMF (IVR)
                  </span>
                  <span className="text-slate-400 text-[10px]">Text-to-Speech</span>
                </div>
                <div className="mt-2.5 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 font-mono text-slate-700">
                    <span>Key 1 → Sales</span>
                    <span className="text-[#1264d8] text-[10px] font-bold">Routed</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-blue-50 text-[#1264d8] font-mono font-bold">
                    <span>Key 2 → Support</span>
                    <div className="relative">
                      <VoisoPointer className="size-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Copy */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-300 bg-orange-50 px-3.5 py-1 text-xs font-semibold text-orange-800">
              Inbound
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
              Elevate customer support
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              VELA helps you deliver faster, more efficient customer support. With visual flow building, AI-powered insights, and self-service chatbots, it reduces wait times and ensures every caller reaches the right agent—boosting satisfaction and efficiency.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/pricing"
                className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-800 hover:border-[#1264d8] hover:text-[#1264d8] transition-colors"
              >
                Explore Support &gt;
              </Link>
              <Link
                to="/pricing"
                className="rounded-full bg-[#1264d8] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0e52b5] shadow-md shadow-[#1264d8]/20 transition-all"
              >
                Try for Free
              </Link>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 5. SECTION: EMPOWER REMOTE AGENTS (REMOTE) matching Screenshot 043622 */}
      <section id="remote" data-reveal className="py-20 md:py-28 bg-white border-b border-line">
        <Wrap className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800">
              Remote
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
              Empower remote agents
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              VELA keeps your remote team connected and productive. With a cloud-based platform, global call routing, and real-time monitoring, agents can work from anywhere while maintaining seamless communication and high performance.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/pricing"
                className="rounded-full border border-slate-300 px-6 py-2.5 text-sm font-semibold text-slate-800 hover:border-[#1264d8] hover:text-[#1264d8] transition-colors"
              >
                Explore Virtual Software &gt;
              </Link>
              <Link
                to="/pricing"
                className="rounded-full bg-[#1264d8] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0e52b5] shadow-md shadow-[#1264d8]/20 transition-all"
              >
                Try for Free
              </Link>
            </div>
          </div>

          {/* Right Visual: Deep emerald container with remote professional portrait */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[36px] bg-[#006644] overflow-hidden shadow-xl border border-emerald-800 min-h-[500px] md:min-h-[560px] flex items-end justify-center">
              {/* Circular Globe Badge in top-left */}
              <div className="absolute top-6 left-6 z-20 size-12 rounded-2xl bg-white/15 text-white flex items-center justify-center border border-white/20 backdrop-blur-xs">
                <Globe className="size-6 text-emerald-200" />
              </div>

              {/* Floating Top-Right: Call Recording Timeline Scrubber */}
              <div className="absolute top-6 right-6 z-20 rounded-2xl bg-white p-3.5 shadow-xl border border-slate-100 text-xs w-56 sm:w-60 hidden sm:block">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-bold text-slate-900">Call recording</span>
                  <span className="font-mono text-[#1264d8] font-semibold">04:12</span>
                </div>
                {/* Sentiment colored track */}
                <div className="mt-2 h-2 rounded-full overflow-hidden flex bg-slate-100">
                  <span className="w-2/3 bg-emerald-500" />
                  <span className="w-1/6 bg-amber-400" />
                  <span className="w-1/6 bg-rose-500" />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Sentiment: 94% Positive</span>
                  <span className="text-emerald-600 font-semibold">Compliant</span>
                </div>
              </div>

              {/* Centered Smiling Remote Agent in White Dress Shirt (100% Unobstructed) */}
              <img
                src={VOISO_REMOTE_MAN_IMAGE}
                alt="Remote customer support agent smiling with folded arms in white shirt"
                className="relative z-10 h-[460px] md:h-[530px] w-auto max-w-full object-cover object-bottom pointer-events-none select-none"
              />

              {/* Bottom-Left: Conversation Score Speedometer */}
              <div className="absolute bottom-6 left-6 z-20 rounded-2xl bg-white p-3.5 shadow-xl border border-slate-100 text-center w-36 sm:w-40 hidden sm:block">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Conversation Score</p>
                <div className="mt-2 flex items-center justify-center">
                  <div className="relative size-14 rounded-full border-4 border-emerald-500 flex items-center justify-center bg-emerald-50">
                    <span className="text-lg font-extrabold text-emerald-800">4.4</span>
                  </div>
                </div>
                <p className="mt-1 text-[10px] text-slate-500 font-medium">Out of 5.0 (Top 5%)</p>
              </div>

              {/* Bottom-Right: Live Agent List */}
              <div className="absolute bottom-6 right-6 z-20 rounded-2xl bg-white p-3.5 shadow-xl border border-slate-100 text-xs w-60 sm:w-64 hidden sm:block">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900">Agent List</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">12 Online</span>
                </div>
                <div className="mt-2 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">Daniella Carter</span>
                    <span className="text-emerald-600 text-[10px] font-bold">● Available 💬3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">Bradley Hawkins</span>
                    <span className="text-blue-600 text-[10px] font-bold">● Outbound 📞</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">Simon Jones</span>
                    <span className="text-purple-600 text-[10px] font-bold">● Inbound</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">Victor Lewis</span>
                    <span className="text-slate-400 text-[10px]">● Logged Off</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 6. SECTION: VISUAL FLOW BUILDER matching Screenshot 043549 */}
      <section id="flow-builder" data-reveal className="py-20 md:py-28 bg-[#FAFBFD] border-b border-line">
        <Wrap className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left: Interactive Canvas Visual Node Graph */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Top Mini Toolbar matching Screenshot 043549 */}
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 text-slate-600 text-xs">
                  <span className="size-7 rounded-lg bg-white text-volt flex items-center justify-center font-mono font-bold shadow-xs">#</span>
                  <span className="size-7 rounded-lg hover:bg-white flex items-center justify-center cursor-pointer">🎵</span>
                  <span className="size-7 rounded-lg hover:bg-white flex items-center justify-center cursor-pointer">{"{}"}</span>
                  <span className="size-7 rounded-lg hover:bg-white flex items-center justify-center cursor-pointer">💬</span>
                  <span className="size-7 rounded-lg hover:bg-white flex items-center justify-center cursor-pointer">{"</>"}</span>
                  <span className="size-7 rounded-lg hover:bg-white flex items-center justify-center cursor-pointer">🔀</span>
                  <span className="size-7 rounded-lg hover:bg-white flex items-center justify-center cursor-pointer">➡️</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Flow Active</span>
                </div>
              </div>

              {/* Node Layout Canvas */}
              <div className="mt-8 relative min-h-[320px] flex flex-col justify-between">
                {/* SVG Connecting Bezier Splines */}
                <svg className="absolute inset-0 size-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  {/* Key 1 to Play audio */}
                  <path
                    d="M 170 120 C 230 120, 230 40, 300 40"
                    fill="none"
                    stroke={activeIvrKey === "key1" ? "#1264d8" : "#cbd5e1"}
                    strokeWidth={activeIvrKey === "key1" ? "2.5" : "1.5"}
                    strokeDasharray={activeIvrKey === "key1" ? "4 2" : "none"}
                    className={activeIvrKey === "key1" ? "animate-pulse" : ""}
                  />
                  {/* Key 2 to Conditions */}
                  <path
                    d="M 170 145 C 230 145, 230 150, 300 150"
                    fill="none"
                    stroke={activeIvrKey === "key2" ? "#1264d8" : "#cbd5e1"}
                    strokeWidth={activeIvrKey === "key2" ? "2.5" : "1.5"}
                    strokeDasharray={activeIvrKey === "key2" ? "4 2" : "none"}
                    className={activeIvrKey === "key2" ? "animate-pulse" : ""}
                  />
                  {/* Key 3 to Route */}
                  <path
                    d="M 170 170 C 230 170, 230 250, 300 250"
                    fill="none"
                    stroke={activeIvrKey === "key3" ? "#1264d8" : "#cbd5e1"}
                    strokeWidth={activeIvrKey === "key3" ? "2.5" : "1.5"}
                    strokeDasharray={activeIvrKey === "key3" ? "4 2" : "none"}
                    className={activeIvrKey === "key3" ? "animate-pulse" : ""}
                  />
                </svg>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                  {/* Node 1: DTMF (IVR) */}
                  <div className="rounded-2xl border-2 border-volt/30 bg-white p-4 shadow-xl max-w-[200px]">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <span className="font-bold text-fg text-xs flex items-center gap-1.5">
                        <span className="text-volt">::</span> DTMF (IVR)
                      </span>
                      <span className="text-muted text-[10px]">⋮</span>
                    </div>
                    <div className="mt-2 text-[10px] text-slate-500">
                      <span className="font-semibold block text-fg">Text-to-Speech</span>
                      <span className="inline-flex items-center gap-1 text-volt mt-1">▶ Please choose one o...</span>
                    </div>
                    <div className="mt-3 space-y-1.5 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => {
                          playKeyTone("1");
                          setActiveIvrKey("key1");
                        }}
                        className={cn(
                          "w-full text-left px-2 py-1 rounded transition-colors cursor-pointer text-[11px]",
                          activeIvrKey === "key1" ? "bg-volt text-white font-bold" : "text-slate-600 hover:bg-slate-100",
                        )}
                      >
                        Key 1: Account Balance
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playKeyTone("2");
                          setActiveIvrKey("key2");
                        }}
                        className={cn(
                          "w-full text-left px-2 py-1 rounded transition-colors cursor-pointer text-[11px]",
                          activeIvrKey === "key2" ? "bg-volt text-white font-bold" : "text-slate-600 hover:bg-slate-100",
                        )}
                      >
                        Key 2: Support Queue
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          playKeyTone("3");
                          setActiveIvrKey("key3");
                        }}
                        className={cn(
                          "w-full text-left px-2 py-1 rounded transition-colors cursor-pointer text-[11px]",
                          activeIvrKey === "key3" ? "bg-volt text-white font-bold" : "text-slate-600 hover:bg-slate-100",
                        )}
                      >
                        Key 3: VIP Callback
                      </button>
                    </div>
                  </div>

                  {/* Destination Nodes on Right */}
                  <div className="space-y-4">
                    {/* Node 2: Play audio */}
                    <div className={cn(
                      "rounded-xl border p-3.5 transition-all",
                      activeIvrKey === "key1" ? "border-volt bg-volt-light/50 shadow-md ring-1 ring-volt" : "border-slate-200 bg-white shadow-xs",
                    )}>
                      <div className="flex items-center justify-between text-xs font-bold text-fg">
                        <span className="flex items-center gap-1.5">🎵 Play audio</span>
                        <span className="text-muted text-[10px]">⋮</span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500">TTS: "Your account balance is $4,850..."</p>
                    </div>

                    {/* Node 3: Conditions */}
                    <div className={cn(
                      "rounded-xl border p-3.5 transition-all",
                      activeIvrKey === "key2" ? "border-volt bg-volt-light/50 shadow-md ring-1 ring-volt" : "border-slate-200 bg-white shadow-xs",
                    )}>
                      <div className="flex items-center justify-between text-xs font-bold text-fg">
                        <span className="flex items-center gap-1.5">🔀 Conditions</span>
                        <span className="text-muted text-[10px]">⋮</span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500">Condition: Customer CSAT &gt; 4.0 → Tier 1</p>
                    </div>

                    {/* Node 4: Route */}
                    <div className={cn(
                      "rounded-xl border p-3.5 transition-all relative",
                      activeIvrKey === "key3" ? "border-volt bg-volt-light/50 shadow-md ring-1 ring-volt" : "border-slate-200 bg-white shadow-xs",
                    )}>
                      <div className="flex items-center justify-between text-xs font-bold text-fg">
                        <span className="flex items-center gap-1.5 text-rose-600">➡️ Route Queue</span>
                        <span className="text-muted text-[10px]">⋮</span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-500 font-mono">Queue: VIP Callback Dispatch</p>
                      <div className="absolute -top-2 -right-2">
                        <VoisoPointer className="size-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Copy matching Screenshot 043549 */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-volt/30 bg-volt-light px-3.5 py-1 text-xs font-semibold text-volt">
              Design, automate, optimize
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl lg:text-5xl leading-tight">
              Flow Builder
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
              Easily create custom call flows with VELA's no-code, drag-and-drop Flow Builder. Design IVR menus, set up intelligent routing, and integrate with your CRM for a seamless customer experience. Connect voice, chat, and messaging channels for unified interactions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/pricing"
                className="rounded-full border border-line-bright px-6 py-2.5 text-sm font-semibold text-fg hover:border-volt hover:text-volt transition-colors"
              >
                Explore Flow Builder &gt;
              </Link>
              <Link
                to="/pricing"
                className="rounded-full bg-volt px-6 py-2.5 text-sm font-semibold text-white hover:bg-volt-hover shadow-md shadow-volt/20 transition-all"
              >
                Try for Free
              </Link>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 7. SECTION: OMNICHANNEL UNIFIED INBOX matching Screenshot 043536 & 043433 */}
      <section id="omnichannel" data-reveal className="py-20 md:py-28 bg-white border-b border-line">
        <Wrap className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-volt/30 bg-volt-light px-3.5 py-1 text-xs font-semibold text-volt">
              Many channels, one platform
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl lg:text-5xl leading-tight">
              Omnichannel
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
              Deliver a seamless CX with VELA's Omnichannel. Unify voice, messaging apps, and SMS in one platform for easy management. Provide personalized support, boost satisfaction, and strengthen relationships.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/pricing"
                className="rounded-full border border-line-bright px-6 py-2.5 text-sm font-semibold text-fg hover:border-volt hover:text-volt transition-colors"
              >
                Explore Omnichannel &gt;
              </Link>
              <Link
                to="/pricing"
                className="rounded-full bg-volt px-6 py-2.5 text-sm font-semibold text-white hover:bg-volt-hover shadow-md shadow-volt/20 transition-all"
              >
                Try for Free
              </Link>
            </div>
          </div>

          {/* Right Visual: Complete Omnichannel Inbox + Softphone + Dispositions */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-line bg-slate-50 p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Channel Icons Bar matching Screenshot 043536 */}
              <div className="flex items-center gap-2 border-b border-line pb-4 overflow-x-auto">
                {OMNI_CHANNELS.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setSelectedChannel(ch.id)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0",
                      selectedChannel === ch.id
                        ? "bg-volt text-white shadow-xs"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200",
                    )}
                  >
                    <span>{ch.icon}</span>
                    <span>{ch.name}</span>
                  </button>
                ))}
              </div>

              {/* Chat Thread + Dispositions + Softphone */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative">
                {/* Contact list & chat thread */}
                <div className="md:col-span-7 space-y-4">
                  {/* Chat header */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                        SH
                      </div>
                      <div>
                        <p className="font-bold text-fg text-sm">Sabrina Hawkins</p>
                        <p className="text-[11px] text-muted">WhatsApp · +44 7874 484 817</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Sample contact
                    </span>
                  </div>

                  {/* Message conversation */}
                  <div className="space-y-3 p-4 rounded-2xl bg-white border border-slate-200 text-xs">
                    <div className="rounded-xl bg-blue-50 border border-blue-100 p-3 text-slate-800 leading-relaxed">
                      "Hi Sabrina! It's Ben from FundSpark. Great news! Your loan application has been approved. You can access your funds from your FundSpark account. Congrats!"
                    </div>
                    <div className="rounded-xl bg-slate-100 p-3 text-slate-800 leading-relaxed max-w-[85%] ml-auto text-right">
                      "Thank you so much! 🙏"
                    </div>
                  </div>

                  {/* Disposition selection checklist matching Screenshot 043433 */}
                  <div className="rounded-2xl bg-white p-4 border border-slate-200 text-xs shadow-xs">
                    <p className="font-bold text-fg text-[11px] mb-2 uppercase tracking-wider text-muted">Call Disposition</p>
                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() => setDispositionChecked(!dispositionChecked)}
                        className={cn(
                          "w-full flex items-center justify-between p-2 rounded-lg font-bold cursor-pointer transition-colors text-left",
                          dispositionChecked ? "bg-blue-50 text-volt" : "bg-slate-50 text-slate-700 hover:bg-slate-100",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <Check className={cn("size-3.5", dispositionChecked ? "text-volt" : "opacity-0")} />
                          <span>Loan approval</span>
                        </span>
                        <div className="relative">
                          <VoisoPointer className="size-3.5" />
                        </div>
                      </button>
                      {["Satisfaction survey", "New product offer", "Promotion offer", "Payment reminder"].map((d, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg text-slate-600 hover:bg-slate-50">
                          <span className="size-3.5 rounded-full border border-slate-300" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Overlaid Dark Voiso Softphone */}
                <div className="md:col-span-5">
                  <VoisoDarkDialer
                    contactName="Sabrina Hawkins"
                    phoneNumber="+44 7874 484 817"
                    initialTime="04:12"
                  />
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 8. SECTION: SEAMLESS CRM INTEGRATIONS matching Screenshot 043635 */}
      <section id="integrations" data-reveal className="py-20 md:py-28 bg-[#0B1118] text-white">
        <Wrap className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold text-white">
              Integrations
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-tight text-white">
              Seamless integration with your CRM
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Sync with your favorite apps in just a few clicks to leverage the power of VELA's contact center features.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                to="/pricing"
                className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Explore All Integrations &gt;
              </Link>
              <Link
                to="/integrations"
                className="rounded-full border border-white/30 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                CRM & MicroSIP Setup
              </Link>
              <Link
                to="/pricing"
                className="rounded-full bg-volt px-6 py-2.5 text-sm font-semibold text-white hover:bg-volt-hover shadow-lg shadow-volt/30 transition-all"
              >
                Try for Free
              </Link>
            </div>
          </div>

          {/* 3x5 Grid of Authentic Rounded White App Tiles matching Screenshot 043635 */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3.5">
              {CRM_INTEGRATIONS.map((crm, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white text-slate-900 shadow-xl transition-all duration-200 transform hover:-translate-y-1 hover:shadow-volt/20 hover:ring-2 hover:ring-volt cursor-pointer"
                >
                  <div className={cn("size-10 rounded-xl flex items-center justify-center font-black text-sm text-white", crm.bg)}>
                    {crm.initial}
                  </div>
                  <p className="mt-2 text-xs font-bold text-center text-slate-800 group-hover:text-volt transition-colors truncate w-full">
                    {crm.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Wrap>
      </section>

      {/* 9. SECTION: MULTI-LLM INTELLIGENCE (CLAUDE, GPT-4o, GEMINI, LLAMA) */}
      <section id="ai-models" data-reveal className="scroll-mt-24 py-20 md:py-28 bg-white border-b border-line">
        <Wrap>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-volt/20 bg-volt-light px-3 py-1 text-xs font-semibold text-volt">
              <Sparkles className="size-3.5" />
              <span>Multi-LLM Intelligence</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl lg:text-5xl">
              Claude, GPT-4o, Gemini & Llama in one engine.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
              Don't get locked into a single AI provider. VELA natively orchestrates leading foundation models so you can route each conversation to the ideal intelligence engine.
            </p>
          </div>

          {/* Model Selector Cards with Official Logos & Brand Badges */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LLM_MODELS.map((model) => {
              const isSelected = selectedLlm === model.id;
              const Logo = model.Logo;
              return (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => setSelectedLlm(model.id)}
                  className={cn(
                    "flex flex-col justify-between rounded-2xl p-5 text-left transition-all duration-200 border cursor-pointer",
                    isSelected
                      ? "border-volt bg-white shadow-xl shadow-volt/15 ring-2 ring-volt/20"
                      : "border-line bg-white/70 hover:bg-white hover:border-line-bright",
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Logo className="size-6" />
                        <span className="text-xs font-bold uppercase tracking-wider text-muted">{model.provider}</span>
                      </div>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", model.badgeBg)}>
                        {model.latency}
                      </span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-fg">{model.name}</p>
                    <p className="mt-1 text-xs font-semibold text-volt">{model.focus}</p>
                  </div>
                  <p className="mt-4 text-xs text-muted line-clamp-3 leading-relaxed">
                    {model.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Live Playground Showcase */}
          <div className="mt-10 grid gap-8 lg:grid-cols-12 items-stretch">
            {/* Left: Model Detail & Live Test */}
            <div className="lg:col-span-7 rounded-3xl border border-line bg-white p-6 sm:p-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
                <div className="flex items-center gap-3">
                  <currentLlmData.Logo className="size-7" />
                  <div>
                    <h3 className="text-xl font-bold text-fg">{currentLlmData.name} Playground</h3>
                    <p className="text-xs text-muted">Illustrative model details · no live audio or AI service is connected</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "sm" }),
                    "bg-volt text-white hover:bg-volt-hover shadow-md shadow-volt/20 cursor-pointer",
                  )}
                >
                  {isAnalyzing ? (
                    <>
                      <RotateCw className="size-3.5 animate-spin" />
                      <span>Reasoning...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="size-3.5" />
                      <span>Show sample output</span>
                    </>
                  )}
                </button>
              </div>

              {/* Sample Call Scenario */}
              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Simulated Customer Call Input</p>
                  <div className="mt-2 rounded-xl bg-slate-50 border border-line p-3.5 text-sm text-fg leading-relaxed">
                    "{currentLlmData.samplePrompt}"
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted flex items-center justify-between">
                    <span>{currentLlmData.name} Guidance</span>
                    <span className="text-[11px] font-mono text-emerald-600 font-semibold">Latency: {currentLlmData.latency}</span>
                  </p>
                  <div className="mt-2 rounded-xl bg-volt-light/50 border border-volt-border p-4 text-sm font-mono text-fg leading-relaxed">
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2 text-volt py-2">
                        <span className="size-2 rounded-full bg-volt animate-ping" />
                        <span>Showing saved sample output...</span>
                      </div>
                    ) : (
                      <div>
                        {analysisDone && (
                          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                            <CheckCircle2 className="size-3.5" />
                            <span>Sample output · not generated by AI</span>
                          </div>
                        )}
                        <p>{currentLlmData.sampleOutput}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Test with AI Assistants links */}
                <div className="pt-3 border-t border-line">
                  <p className="text-xs font-semibold text-muted mb-2">Test with your preferred AI Assistant:</p>
                  <div className="flex flex-wrap gap-2">
                    {AI_ASSISTANTS.map((ai) => {
                      const AssistantLogo = ai.Logo;
                      return (
                        <a
                          key={ai.name}
                          href={ai.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-line bg-slate-50 text-xs font-medium text-fg hover:border-volt/30 hover:bg-white hover:text-volt transition-colors"
                        >
                          <AssistantLogo className="size-4" />
                          <span>{ai.name}</span>
                          <ExternalLink className="size-3 opacity-60" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Human Network Operations Center */}
            <div className="lg:col-span-5 relative overflow-hidden rounded-3xl border border-line shadow-xl bg-slate-900 min-h-[360px] flex flex-col justify-end p-6">
              <img
                src={COPILOT_AGENT_IMAGE}
                alt="Support agent on a live call with an AI copilot suggesting the next reply"
                className="absolute inset-0 size-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-volt px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  <Cpu className="size-3.5" />
                  Multi-Model Orchestration
                </span>
                <h4 className="mt-3 text-xl font-bold text-white">
                  Example Conversational Co-pilot
                </h4>
                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                  Example interface only. No live call listening, document
                  search, or real-time AI suggestions are connected.
                </p>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 10. SECTION: INTERACTIVE TELECOM SOFTPHONE ISLAND */}
      <section data-reveal className="py-20 md:py-24 bg-slate-50 border-b border-line">
        <Wrap className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-volt/20 bg-volt-light px-3 py-1 text-xs font-semibold text-volt">
              <Radio className="size-3.5" />
              <span>Interactive Softphone</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
              Test drive the browser dialer right now.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Hear realistic DTMF audio feedback and experience sub-20ms edge VoIP latency. Zero plugins or setup needed.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/voice"
                className={cn(
                  buttonVariants({ variant: "primary", size: "md" }),
                  "bg-volt text-white hover:bg-volt-hover shadow-md shadow-volt/20",
                )}
              >
                <span>Full Voice Studio</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="mx-auto w-full max-w-lg">
              <InteractiveTelecomIsland activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
          </div>
        </Wrap>
      </section>

      {/* 11. SECTION: SERVICE READINESS TABLE */}
      <section id="trust" data-reveal className="scroll-mt-24 py-20 md:py-28 bg-white border-b border-line">
        <Wrap>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-volt/20 bg-volt-light px-3 py-1 text-xs font-semibold text-volt">
              <Shield className="size-3.5" />
              <span>Service readiness</span>
            </div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-fg">
              Review the concept and what is not live
            </h2>
            <p className="mt-3 text-base text-muted">
              These are planning examples, not a comparison with other vendors.
              Live rates, compliance requirements, and provider capabilities
              have not been verified.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <div className="min-w-[720px] rounded-3xl border border-line bg-white shadow-xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 border-b border-line bg-slate-100/70 px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted">
                <div className="col-span-4">Capability</div>
                <div className="col-span-4 text-volt font-extrabold flex items-center gap-1.5">
                  <Sparkles className="size-3.5" />
                  VELA Communications Cloud
                </div>
                <div className="col-span-2 text-muted">Live status</div>
                <div className="col-span-2 text-muted">Provider details</div>
              </div>

              <div className="divide-y divide-line">
                {COMPARISON_ROWS.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 gap-4 px-6 py-4.5 text-sm items-center hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="col-span-4 font-semibold text-fg">
                      {row.feature}
                    </div>
                    <div className="col-span-4 font-bold text-volt flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-volt shrink-0" />
                      <span>{row.vela}</span>
                    </div>
                    <div className="col-span-2 text-muted text-xs">{row.legacy}</div>
                    <div className="col-span-2 text-muted text-xs">{row.zadarma}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* 12. SECTION: SEAT MATH ROI CALCULATOR */}
      <section data-reveal className="py-20 md:py-24 bg-slate-50 border-b border-line">
        <Wrap>
          <SeatMath />
        </Wrap>
      </section>

      {/* 13. SECTION: FAQ ACCORDION */}
      <section data-reveal className="py-20 md:py-28 bg-white border-b border-line">
        <Wrap className="max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-volt">Questions & Answers</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-base text-muted">
              Everything you need to know about our multi-LLM orchestration, global numbers, and billing.
            </p>
          </div>

          <div className="mt-12">
            <Accordion.Root type="single" collapsible className="space-y-3">
              {FAQ.map((item, idx) => (
                <Accordion.Item
                  key={idx}
                  value={`item-${idx}`}
                  className="rounded-2xl border border-line bg-white px-6 py-2 shadow-xs transition-colors data-[state=open]:border-volt/40"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left font-semibold text-fg hover:text-volt transition-colors [&[data-state=open]>svg]:rotate-180">
                      <span>{item.q}</span>
                      <ChevronDown className="size-4 shrink-0 transition-transform duration-200 text-muted" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="pb-4 text-sm text-muted leading-relaxed">
                    {item.a}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </Wrap>
      </section>

      {/* 14. SECTION: CONVERSION BANNER */}
      <section data-reveal className="py-16 md:py-20 bg-gradient-to-r from-volt via-[#0052cc] to-[#0d4eae] text-white">
        <Wrap className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-white/80">Configure a sample order</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              Ready to scale human conversations with AI?
            </h2>
            <p className="mt-3 text-base text-white/85 leading-relaxed">
              Review example phone-number, required RDP desktop, VPS, and
              dedicated-server options. Live service requires connected
              payment, carrier, and desktop providers; none are currently
              configured.
            </p>
          </div>

          <div className="flex w-full flex-wrap gap-3 md:w-auto md:shrink-0">
            <Link
              to="/pricing"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-white text-volt hover:bg-slate-100 font-bold shadow-xl shadow-black/20",
              )}
            >
              <span>Explore Plans</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/console"
              className={cn(
                buttonVariants({ variant: "line", size: "lg" }),
                "border-white/30 text-white hover:bg-white/10 backdrop-blur-md",
              )}
            >
              <span>Open Console</span>
            </Link>
          </div>
        </Wrap>
      </section>
    </div>
  );
}

// Interactive Softphone & Telecommunications Component
function InteractiveTelecomIsland({
  activeTab,
  setActiveTab,
}: {
  activeTab: "phone" | "edge" | "specs";
  setActiveTab: (tab: "phone" | "edge" | "specs") => void;
}) {
  const [dialed, setDialed] = useState("+1 (415) 890-4421");
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
    setDialed((prev) => (prev.length < 20 ? prev + d : prev));
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
    <div className="rounded-3xl p-6 shadow-2xl bg-white border border-line relative overflow-hidden">
      {/* Top Segmented Controls */}
      <div className="flex items-center justify-between gap-2 border-b border-line pb-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100">
          <button
            type="button"
            onClick={() => setActiveTab("phone")}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer",
              activeTab === "phone" ? "bg-white text-volt shadow-xs" : "text-muted hover:text-fg",
            )}
          >
            AI Softphone
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("edge")}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer",
              activeTab === "edge" ? "bg-white text-volt shadow-xs" : "text-muted hover:text-fg",
            )}
          >
            Global Hubs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={cn(
              "px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer",
              activeTab === "specs" ? "bg-white text-volt shadow-xs" : "text-muted hover:text-fg",
            )}
          >
            Codecs & Audio
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono text-muted uppercase">Opus 48kHz</span>
        </div>
      </div>

      {activeTab === "phone" && (
        <div className="mt-5 space-y-4">
          {/* Active Call Display */}
          <div className="rounded-2xl bg-slate-900 text-white p-5 text-center relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-volt-light">Carrier Line: San Francisco DID</span>
              <span className="font-mono text-volt-light">{callActive ? formatSecs(callTimer) : "Ready"}</span>
            </div>

            <p className="mt-3 text-2xl font-mono font-bold tracking-wider text-white">
              {dialed || "Enter Phone Number"}
            </p>

            {/* Soundwave animation when call is active */}
            {callActive ? (
              <div className="mt-4 flex h-8 items-center justify-center gap-1.5" aria-label="Streaming audio wave">
                {[12, 28, 18, 32, 24, 16, 30, 22, 14, 28, 18, 30, 16].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-volt animate-soundwave"
                    style={{
                      height: `${h}px`,
                      animationDelay: `${i * 0.08}s`,
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-2 text-xs text-slate-400">WebRTC Opus Audio · Direct SIP Trunking</p>
            )}
          </div>

          {/* Interactive Dial Keypad with Web Audio DTMF feedback */}
          <div className="grid grid-cols-3 gap-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleDigitPress(key)}
                className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-base font-bold text-fg active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-xs"
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
              className="h-11 px-4 rounded-xl border border-line text-xs font-bold text-muted hover:text-fg hover:bg-slate-50 transition-all cursor-pointer"
            >
              Clear
            </button>

            <button
              type="button"
              onClick={handleCall}
              className={cn(
                "flex-1 h-11 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer shadow-md",
                callActive
                  ? "bg-[#EA3943] text-white shadow-rose-900/30 hover:brightness-105"
                  : "bg-emerald-600 text-white shadow-emerald-900/30 hover:brightness-105",
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
          <p className="text-xs text-muted mb-3">Illustrative latency values · no media gateways are connected:</p>
          {REGIONS.slice(0, 6).map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-line text-xs"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="size-4 text-volt" />
                <span className="font-semibold text-fg">{r.city}</span>
              </div>
              <span className="font-mono font-semibold text-emerald-600">{r.ms} ms</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === "specs" && (
        <div className="mt-4 space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-line">
            <p className="font-bold text-fg">Audio Pipeline Specs</p>
            <p className="mt-1 text-muted leading-relaxed">
              Opus 48 kHz dynamic bitrate (6–510 kbps) with jitter-buffer concealment and neural background noise suppression.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-line">
            <p className="font-bold text-fg">Carrier Interconnect</p>
            <p className="mt-1 text-muted leading-relaxed">
              Tier-1 SIP trunks with redundant BGP routing across Ashburn, Frankfurt, Singapore, and Tokyo.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
