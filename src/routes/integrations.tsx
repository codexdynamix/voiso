import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Cloud,
  Database,
  Headphones,
  LayoutDashboard,
  LockKeyhole,
  MoreHorizontal,
  Monitor,
  Phone,
  PhoneCall,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { Wrap } from "@/components/shell";

const CRM_LOGOS = [
  { name: "Salesforce", src: "/assets/integrations/salesforce.png" },
  { name: "Zoho CRM", src: "/assets/integrations/zoho.png" },
  { name: "HubSpot", src: "/assets/integrations/hubspot.png" },
  { name: "Freshdesk", src: "/assets/integrations/freshdesk.png" },
  { name: "Pipedrive", src: "/assets/integrations/pipedrive.png" },
  { name: "Zendesk", src: "/assets/integrations/zendesk.png" },
  { name: "Bitrix24", src: "/assets/integrations/bitrix24.png" },
  { name: "Zapier", src: "/assets/integrations/zapier.png" },
  { name: "Monday.com", src: "/assets/integrations/monday.png" },
  { name: "ClickUp", src: "/assets/integrations/clickup.png" },
] as const;

const REQUIRED_SETUP = {
  title: "Run MicroSIP inside a hosted Windows desktop",
  description:
    "Every agent must use the company-approved hosted Windows desktop. Connect with RDP before opening MicroSIP or the dialer.",
  remoteDesktop: "Required for every agent",
  vpn: "Separate requirement: use only when the SIP/PBX network is private or IT policy requires it",
  steps: [
    "Use the company-approved hosted Windows desktop assigned for your agent workload",
    "Connect through the approved Remote Desktop client before opening MicroSIP or the dialer; never expose RDP directly to the public internet",
    "Connect the approved VPN only when required by the SIP/PBX network or company policy, then verify registration and audio",
  ],
};

const DESKTOP_OPTIONS = [
  {
    name: "Web Pundits USA RDP",
    fit: "Entry-level hosted Windows RDP",
    price: "Check live pricing",
    detail:
      "See the provider’s live USA RDP plans. Verify the selected plan, Windows license, server resources, user/session terms, and any add-ons directly before ordering.",
    icon: Monitor,
    href: "https://webpundits.in/buy-usa-rdp/",
  },
  {
    name: "Windows VPS",
    fit: "One or a few users · self-managed",
    price: "Compare quotes",
    detail: "A starting budget for a basic virtual server. Check Windows licensing, memory, region, and whether concurrent sessions are permitted.",
    icon: Monitor,
  },
  {
    name: "Managed RDP desktop",
    fit: "Teams that want provider support",
    price: "Compare quotes",
    detail: "A planning range for a managed desktop. Compare included support, backups, user limits, and voice-ready network routes.",
    icon: Headphones,
  },
  {
    name: "Cloud PC / dedicated desktop",
    fit: "Per-user environments · higher isolation",
    price: "Compare quotes",
    detail: "Per-user cloud desktops or dedicated resources. Compute, Windows entitlements, storage, and network usage may be billed separately.",
    icon: Cloud,
  },
];

const RDP_WORKFLOW_STEPS: {
  title: string;
  detail: string;
  visual: "start" | "search" | "computer" | "connect" | "credentials" | "identity" | "connecting" | "desktop";
  alt: string;
}[] = [
  {
    title: "Open Start",
    detail:
      "Select the Start button on the Windows taskbar, or press the Windows key on your keyboard.",
    visual: "start",
    alt: "Microsoft’s Windows 11 Start menu with a red guide circle around the Start button",
  },
  {
    title: "Search for the RDP app",
    detail:
      "Type “Remote Desktop Connection” in Start search and open the desktop app. Shortcut: press Windows + R, enter mstsc, then press Enter.",
    visual: "search",
    alt: "Windows 11 Start menu with the Remote Desktop Connection query and app result highlighted",
  },
  {
    title: "Enter the remote PC",
    detail:
      "In the Computer field, type the exact PC name or address your administrator provided. The image uses a non-routable example address.",
    visual: "computer",
    alt: "Native Windows Remote Desktop Connection window with rdp.example.com in the Computer field; the example is not a real server",
  },
  {
    title: "Start the connection",
    detail:
      "Select Connect. If the PC is only reachable on a private network, connect to your approved VPN first; otherwise follow your administrator’s network instructions.",
    visual: "connect",
    alt: "Native Windows Remote Desktop Connection window with a red guide circle and arrow pointing to Connect",
  },
  {
    title: "Authenticate to Windows",
    detail:
      "If prompted, enter the assigned Windows username (often DOMAIN\\username or username@domain.com), password, and any required MFA. Saved credentials may skip this prompt.",
    visual: "credentials",
    alt: "Credential guidance illustration with a red circle around the username format; not a Windows dialog screenshot",
  },
  {
    title: "Check any identity warning",
    detail:
      "A certificate or identity warning may appear depending on the host. Verify the computer name and certificate with IT before continuing; cancel if they do not match or you are unsure.",
    visual: "identity",
    alt: "Identity-check guide with a red circle around the computer name and certificate details; not a Windows dialog screenshot",
  },
  {
    title: "Wait for Windows to connect",
    detail:
      "Windows authenticates the account and prepares the remote session. Connection time depends on the network and host; do not retry repeatedly if the prompt reports an error.",
    visual: "connecting",
    alt: "Illustrated connection progress guide showing authentication and desktop startup; not a Windows dialog screenshot",
  },
  {
    title: "Confirm the desktop opens",
    detail:
      "You are connected when the remote Windows desktop appears. Open MicroSIP there; connect the approved VPN inside the session only if your SIP/PBX network or IT policy requires it.",
    visual: "desktop",
    alt: "Windows 11 Bloom desktop with the MicroSIP softphone outlined and marked by a red arrow",
  },
];

const MICROSIP_WORKFLOW_STEPS = [
  {
    title: "Get your SIP settings",
    detail:
      "Ask your VoIP provider or PBX administrator for the SIP server, username or extension, domain, and password. Ask whether you also need a separate authentication login, SIP proxy, or specific transport.",
    visual: "details",
    alt: "MicroSIP account form highlighting the provider-issued server and account fields to request",
  },
  {
    title: "Choose Add Account",
    detail:
      "Open MicroSIP’s main menu and choose Add Account. This image points to the menu control; the menu itself can look different across versions. Give the account a recognizable name if you use more than one.",
    visual: "menu",
    alt: "MicroSIP softphone with its main menu control highlighted",
  },
  {
    title: "Enter the server and user",
    detail:
      "Fill in SIP Server, Username, and Domain exactly as supplied. Enter SIP Proxy only when your provider or PBX administrator gives you one.",
    visual: "servers",
    alt: "Official MicroSIP Account window with SIP server, proxy, username, and domain fields highlighted",
  },
  {
    title: "Add authentication details",
    detail:
      "Enter Login only if your authentication username differs from Username; otherwise leave Login blank. Enter the assigned password. Display Name is optional; only change transport or encryption when your provider specifies it.",
    visual: "credentials",
    alt: "Official MicroSIP Account window highlighting the Login and Password fields; the screenshot contains example values only",
  },
  {
    title: "Save the account",
    detail:
      "Select Save to return to the phone. MicroSIP will try to register the account with the SIP server.",
    visual: "save",
    alt: "Official MicroSIP Account window with the Save button highlighted",
  },
  {
    title: "Confirm registration and test",
    detail:
      "Check for the provider’s registered or Online status, then place an approved test call and check both audio directions. If registration fails, verify credentials, server details, and any required VPN with your provider or IT team.",
    visual: "registered",
    alt: "MicroSIP phone showing Online status highlighted after account setup",
  },
] as const;

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "CRM, MicroSIP & RDP Integrations — VELA" },
      {
        name: "description",
        content:
          "Explore CRM and Windows MicroSIP connection patterns, predictive dialer workflows, and when a VoIP setup needs a VPN or remote desktop.",
      },
    ],
  }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  const selectedSetup = REQUIRED_SETUP;

  return (
    <div className="bg-white">
      <header className="overflow-hidden border-b border-line bg-slate-50/80 py-12 md:py-20">
        <Wrap className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-volt/20 bg-volt-light px-3.5 py-1.5 text-xs font-semibold text-volt">
              <Workflow className="size-3.5" />
              CRM + Windows calling workflow
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Plan a CRM, MicroSIP, and dialer workflow.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Explore common ways to connect customer records to calls, place
              Windows softphones, and securely reach hosted desktops when
              needed.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#setup"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-volt px-5 text-sm font-semibold text-white transition-colors hover:bg-volt-hover"
              >
                Plan your setup <ArrowDown className="size-4" />
              </a>
              <Link
                to="/voice"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-volt hover:text-volt"
              >
                Explore the dialer <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <p className="mt-4 max-w-xl text-xs leading-relaxed text-slate-500">
              Integration availability depends on your CRM edition, phone
              provider, network policy, and chosen deployment.
            </p>
          </div>

          <div className="lg:col-span-6">
            <IntegrationPreview />
          </div>
        </Wrap>
      </header>

      <section className="py-16 md:py-20" aria-labelledby="crm-heading">
        <Wrap>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-volt">
              CRM connections
            </p>
            <h2 id="crm-heading" className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Your customer details, right beside every call.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
              A compatible connector can match calls with customer records and
              keep call notes together in one place. These logos are examples,
              not a promise that each is a built-in VELA integration.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CRM_LOGOS.map(({ name, src }) => (
              <div
                key={name}
                className="flex min-h-[4.75rem] items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3 transition-colors hover:border-slate-300"
              >
                <span className="flex size-10 shrink-0 items-center justify-center">
                  <img
                    src={src}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="max-h-9 max-w-9 object-contain"
                  />
                </span>
                <span className="min-w-0 text-[13px] font-semibold leading-snug text-slate-800">
                  {name}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            Confirm each CRM, phone provider, plan, and desired feature before
            rollout. A connection may require a native connector, API or
            webhook work, or third-party automation; availability is not
            guaranteed for every combination.
          </p>
          <div className="mt-8">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">
              A typical CRM-to-call flow
            </h3>
            <ol className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                {
                  title: "Find the right record",
                  detail:
                    "Match an incoming number or look up a contact before placing a call, if the connector supports it.",
                  icon: Users,
                },
                {
                  title: "Place the call",
                  detail:
                    "Use the supported dialer or softphone and confirm the call is routed through your approved provider.",
                  icon: PhoneCall,
                },
                {
                  title: "Log the outcome",
                  detail:
                    "Save a disposition, notes, and follow-up task to the contact when the integration supports call logging.",
                  icon: Check,
                },
              ].map(({ title, detail, icon: Icon }, index) => (
                <li
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-volt-light text-volt">
                      <Icon className="size-4" />
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      0{index + 1}
                    </span>
                  </div>
                  <h4 className="mt-4 font-semibold text-slate-900">{title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Wrap>
      </section>

      <section className="border-y border-line bg-slate-50 py-16 md:py-20" aria-labelledby="microsip-heading">
        <Wrap className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-volt">
              Windows softphone
            </p>
            <h2 id="microsip-heading" className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Make calls with MicroSIP and keep customer details close.
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              MicroSIP is the Windows calling app; your VoIP provider supplies
              the SIP account and calling service. With a compatible CRM
              connector, agents can open customer records and log call notes
              alongside each conversation. In this business workflow, agents
              must reach MicroSIP through the approved hosted Windows desktop
              over RDP.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {[
                "Use your provider-issued SIP account and supported codecs",
                "Access MicroSIP through the approved hosted Windows desktop over RDP",
                "Keep call notes and outcomes connected to the CRM record",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-volt" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-slate-500">
              MicroSIP and Windows are third-party products.{" "}
              <a
                href="https://blogs.windows.com/windowsexperience/2021/06/24/introducing-windows-11/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-volt underline underline-offset-2 hover:text-volt-hover"
              >
                Microsoft source
              </a>
              {" · "}
              <a
                href="https://www.microsip.org/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-volt underline underline-offset-2 hover:text-volt-hover"
              >
                Official MicroSIP website
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-7">
            <WindowsCallingPreview />
          </div>
        </Wrap>
      </section>

      <section id="setup" className="scroll-mt-24 py-16 md:py-20" aria-labelledby="setup-heading">
        <Wrap>
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-volt">
              Required dialer access
            </p>
            <h2 id="setup-heading" className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Does this VoIP setup need RDP and VPN?
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Yes—RDP is mandatory for every agent in this business workflow.
              Agents must connect to the approved hosted Windows desktop
              before using MicroSIP or the dialer. VPN is separate and is
              needed only if the SIP/PBX network is private or IT policy
              requires it.
            </p>
          </div>

          <div className="mt-5 grid gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-12 md:p-8">
            <div className="grid gap-5 md:col-span-12 xl:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Connected desktop</p>
                <RemoteDesktopPreview />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Remote Desktop setup</p>
                <RemoteDesktopSetupPreview />
              </div>
            </div>
            <div className="md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-volt">Selected setup</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{selectedSetup.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{selectedSetup.description}</p>
              <div className="mt-5 space-y-3">
                <Requirement label="RDP" value={selectedSetup.remoteDesktop} icon={Monitor} />
                <Requirement label="VPN" value={selectedSetup.vpn} icon={LockKeyhole} />
              </div>
            </div>
            <div className="md:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recommended sequence</p>
              <ol className="mt-4 space-y-3">
                {selectedSetup.steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-volt ring-1 ring-slate-200">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-sm leading-relaxed text-slate-700">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 flex items-start gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-950">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" />
                <span>
                  Security baseline: use MFA and approved access controls. Do
                  not expose RDP directly to the public internet; follow your
                  organization’s IT policy and provider guidance.
                </span>
              </div>
            </div>
          </div>
            <section className="mt-10 border-t border-slate-200 pt-8" aria-labelledby="rdp-workflow-heading">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-volt">
                  Windows walkthrough
                </p>
                <h3 id="rdp-workflow-heading" className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  From Start menu to connected desktop.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Follow these steps to open and connect with Windows Remote
                  Desktop.
                  Credential and identity prompts can vary by Windows version
                  and policy, and may appear in a different order.
                </p>
              </div>
              <div className="mt-6 grid overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                <div className="relative aspect-video bg-slate-100 sm:aspect-auto sm:min-h-48">
                  <RdpWorkflowVisual
                    visual="prepare"
                    alt="Before connecting, confirm the remote computer address, approved Windows account, and required VPN or gateway details"
                  />
                </div>
                <div className="flex flex-col justify-center p-5 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-volt">
                    Before you begin
                  </p>
                  <h4 className="mt-2 text-lg font-semibold text-slate-900">
                    Confirm you have access details
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Get the remote PC name or IP, approved Windows account, and
                    any required VPN or gateway details from your administrator.
                    Confirm Remote Desktop is enabled and your account is allowed
                    to connect.
                  </p>
                </div>
              </div>
              <ol className="mt-6 grid gap-4">
                {RDP_WORKFLOW_STEPS.map(({ title, detail, visual, alt }, index) => (
                  <li
                    key={title}
                    className={`grid overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] ${
                      index % 2 === 1 ? "sm:[&>div:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-100 sm:aspect-auto sm:min-h-56">
                      <RdpWorkflowVisual visual={visual} alt={alt} />
                    </div>
                    <div className="flex flex-col justify-center p-5 sm:p-7">
                      <div className="flex items-start gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-volt-light text-xs font-bold text-volt">
                          {index + 1}
                        </span>
                        <h4 className="pt-1 font-semibold text-slate-900">{title}</h4>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                The Start-menu base image is from Microsoft’s{" "}
                <a
                  href="https://blogs.windows.com/windowsexperience/2021/06/24/introducing-windows-11/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-volt underline underline-offset-2 hover:text-volt-hover"
                >
                  Windows 11 announcement
                </a>
                ; the connection window and MicroSIP app are real application
                screenshots. Credential and identity prompts are intentionally
                described, not mocked, because their appearance depends on your
                Windows version and organization settings.{" "}
                <a
                  href="https://learn.microsoft.com/en-us/windows-server/remote/remote-desktop-services/remotepc/remote-desktop-allow-access"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-volt underline underline-offset-2 hover:text-volt-hover"
                >
                  Microsoft’s connection steps
                </a>
                .
              </p>
            </section>
            <section className="mt-10 border-t border-slate-200 pt-8" aria-labelledby="microsip-workflow-heading">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-volt">
                  MicroSIP account setup
                </p>
                <h3 id="microsip-workflow-heading" className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                  Add your provider’s VoIP details.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Use the account values supplied by your SIP provider or PBX
                  administrator. Field names are from MicroSIP; settings such
                  as proxy and transport depend on your provider.
                </p>
              </div>
              <ol className="mt-6 grid gap-4">
                {MICROSIP_WORKFLOW_STEPS.map(({ title, detail, visual, alt }, index) => (
                  <li
                    key={title}
                    className={`grid overflow-hidden rounded-2xl border border-slate-200 bg-white sm:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] ${
                      index % 2 === 1 ? "sm:[&>div:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-100 sm:min-h-56">
                      <MicroSipWorkflowVisual visual={visual} alt={alt} />
                    </div>
                    <div className="flex flex-col justify-center p-5 sm:p-7">
                      <div className="flex items-start gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-volt-light text-xs font-bold text-volt">
                          {index + 1}
                        </span>
                        <h4 className="pt-1 font-semibold text-slate-900">{title}</h4>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                The account-window screenshots are from the{" "}
                <a
                  href="https://www.microsip.org/help"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-volt underline underline-offset-2 hover:text-volt-hover"
                >
                  official MicroSIP help
                </a>
                . Example values shown in the screenshots are for illustration
                only; never copy them or share your SIP password.
              </p>
              <aside className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5" aria-labelledby="microsip-troubleshooting-heading">
                <h4 id="microsip-troubleshooting-heading" className="font-semibold text-slate-900">
                  If MicroSIP will not register or has no audio
                </h4>
                <ul className="mt-3 grid gap-3 text-sm leading-relaxed text-slate-600 md:grid-cols-3">
                  <li>
                    <span className="font-semibold text-slate-800">Not registered:</span>{" "}
                    recheck the assigned username, password, server, domain,
                    and any required proxy or VPN with your provider.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-800">No or one-way audio:</span>{" "}
                    check the selected microphone and headset, then ask IT or
                    your provider to verify firewall and voice-network settings.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-800">Inside RDP:</span>{" "}
                    confirm the provider supports softphones in hosted sessions
                    and check the session’s audio redirection and network policy.
                  </li>
                </ul>
              </aside>
            </section>
        </Wrap>
      </section>

      <section className="border-y border-line bg-slate-50 py-16 md:py-20" aria-labelledby="dialer-heading">
        <Wrap className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-volt">
              Outbound workflow
            </p>
            <h2 id="dialer-heading" className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Predictive dialing with the right guardrails.
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              A predictive dialer may pace calls against agent availability
              and return the conversation and disposition to a CRM. Confirm
              that your dialer, provider, and CRM support each part of this
              reference workflow before enabling it.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ol className="grid gap-3 sm:grid-cols-2">
              {[
                { title: "Prepare the audience", detail: "Import eligible leads; check consent, suppression lists, and local calling windows.", icon: Database },
                { title: "Set campaign limits", detail: "Choose pacing, caller ID, retry rules, and a safe abandon-rate threshold.", icon: Workflow },
                { title: "Connect an agent", detail: "When a live call is detected, route it to an available, trained agent.", icon: Phone },
                { title: "Sync the result", detail: "Save call outcome, notes, and follow-up tasks to the matching CRM record.", icon: Check },
              ].map(({ title, detail, icon: Icon }, index) => (
                <li key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-volt-light text-volt">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs font-semibold text-slate-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{detail}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Predictive dialing and call recording are subject to applicable
              telemarketing, privacy, and recording-consent laws. Get local
              compliance advice before activating campaigns. Configure consent,
              suppression, calling windows, retry and abandon-rate limits, and
              a way to pause campaigns when required.
            </p>
          </div>
        </Wrap>
      </section>

      <section className="py-16 md:py-20" aria-labelledby="rdp-pricing-heading">
        <Wrap>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-volt">
                Remote desktop choices
              </p>
              <h2 id="rdp-pricing-heading" className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Compare RDP options before you choose a host.
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                One provider-listed starting price plus other Windows desktop
                types to compare. Prices, licensing, and the number of users
                supported depend on the exact plan.
              </p>
            </div>
            <Link
              to="/desk"
              className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition-colors hover:border-volt hover:text-volt md:self-auto"
            >
              Explore VELA Desk <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DESKTOP_OPTIONS.map(({ name, fit, price, detail, icon: Icon, href }) => (
              <article key={name} className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-volt-light text-volt">
                    <Icon className="size-5" />
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
                    {fit}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">{name}</h3>
                <p className="mt-2 text-sm text-slate-500">Typical planning budget</p>
                <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-950">
                  {price}
                  {price === "From $8" ? <span className="ml-1 text-sm font-medium text-slate-500">/ month</span> : null}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">{detail}</p>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-volt hover:text-volt-hover"
                  >
                    Check provider pricing <ArrowUpRight className="size-4" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>

          <div className="mt-6 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-12 md:p-7">
            <div className="md:col-span-4">
              <p className="font-semibold text-slate-900">Comparing Web Pundit or another host?</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Request a current quote from the provider. Compare the same
                Windows edition, CPU/RAM, user-session rights, location,
                bandwidth, backups, support, and licensing.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:col-span-8">
              {[
                "Windows license and permitted concurrent users",
                "CPU, RAM, storage, and voice network performance",
                "Static IP, VPN compatibility, and server region",
                "Backups, support response, taxes, and renewal price",
              ].map((item) => (
                <p key={item} className="flex items-start gap-2 rounded-xl bg-white p-3 text-xs leading-relaxed text-slate-700">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-volt" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            Provider prices and offers can change, and the same label may cover
            very different resources or user limits. Use each provider’s live
            pricing page to compare the selected configuration, Windows
            licensing, contract, and renewal terms before purchasing. VPN and
            telephony charges may be separate.
          </p>
        </Wrap>
      </section>

      <section className="border-t border-line bg-slate-950 py-14 text-white md:py-16">
        <Wrap className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-blue-200">Ready to map your rollout?</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Start with the CRM and calling setup your team already uses.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Validate the CRM connector, SIP provider, and network route before
              choosing a remote desktop plan.
            </p>
          </div>
          <Link
            to="/pricing"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-slate-900 transition-colors hover:bg-blue-50"
          >
            View VELA plans <ArrowRight className="size-4" />
          </Link>
        </Wrap>
      </section>
    </div>
  );
}

function Requirement({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Monitor;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <p className="flex items-center gap-2 text-xs font-semibold text-slate-700">
        <Icon className="size-3.5 text-volt" />
        {label}
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{value}</p>
    </div>
  );
}

function RdpWorkflowVisual({
  visual,
  alt,
}: {
  visual: "prepare" | (typeof RDP_WORKFLOW_STEPS)[number]["visual"];
  alt: string;
}) {
  const marker = (
    target: { x: number; y: number; r: number },
    path: string,
    arrow: string,
    label: string,
  ) => (
    <svg
      viewBox="0 0 960 540"
      className="pointer-events-none absolute inset-0 size-full"
      role="img"
      aria-label={label}
    >
      <circle cx={target.x} cy={target.y} r={target.r} fill="none" stroke="#e33b36" strokeWidth="8" />
      <path d={path} fill="none" stroke="#e33b36" strokeWidth="8" strokeLinecap="round" />
      <path d={arrow} fill="none" stroke="#e33b36" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  if (visual === "prepare" || visual === "credentials" || visual === "identity" || visual === "connecting") {
    const sources = {
      prepare: "/assets/rdp-workflow/01-prepare.svg",
      credentials: "/assets/rdp-workflow/06-authenticate.svg",
      identity: "/assets/rdp-workflow/07-verify-identity.svg",
      connecting: "/assets/rdp-workflow/08-wait.svg",
    };
    return <img src={sources[visual]} alt={alt} className="size-full object-cover" loading="lazy" />;
  }

  if (visual === "start" || visual === "search") {
    return (
      <div className="relative size-full bg-[#dce8f4]">
        <img
          src="/assets/rdp-workflow/microsoft-windows-11-start.png"
          alt={alt}
          className="size-full object-contain"
          loading="lazy"
        />
        {visual === "start"
          ? marker(
              { x: 410, y: 522, r: 27 },
              "M333 450C360 470 388 491 404 511",
              "m389 499 17 14-21 2",
              "Red guide arrow and circle point to the Windows Start button",
            )
          : null}
        {visual === "search" ? (
          <svg
            viewBox="0 0 960 540"
            className="pointer-events-none absolute inset-0 size-full"
            role="img"
            aria-label="Red guides highlight the typed Remote Desktop Connection search and its app result"
          >
            <rect x="350" y="202" width="260" height="19" rx="4" fill="#fff" stroke="#3784c6" strokeWidth="2" />
            <text x="370" y="216" fontFamily="Segoe UI,Arial,sans-serif" fontSize="16" fill="#334155">
              Remote Desktop Connection
            </text>
            <rect x="250" y="231" width="460" height="60" rx="6" fill="#fff" stroke="#d4deea" strokeWidth="2" />
            <rect x="266" y="243" width="36" height="36" rx="5" fill="#eaf3ff" />
            <path d="M274 250h20v14h-20zm-3 16h26v4h-26zm9 4h8v4h-8z" fill="#3276b8" />
            <text x="316" y="257" fontFamily="Segoe UI,Arial,sans-serif" fontSize="18" fontWeight="600" fill="#25364a">
              Remote Desktop Connection
            </text>
            <text x="316" y="278" fontFamily="Segoe UI,Arial,sans-serif" fontSize="13" fill="#718198">
              App · Select to open
            </text>
            <ellipse cx="480" cy="211" rx="137" ry="19" fill="none" stroke="#e33b36" strokeWidth="7" />
            <ellipse cx="480" cy="261" rx="239" ry="36" fill="none" stroke="#e33b36" strokeWidth="7" />
            <path d="M750 165C735 191 719 212 704 231" fill="none" stroke="#e33b36" strokeWidth="7" strokeLinecap="round" />
            <path d="m687 221 18 11-18 12" fill="none" stroke="#e33b36" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </div>
    );
  }

  if (visual === "computer" || visual === "connect") {
    return (
      <div className="relative size-full bg-[#e8edf4]">
        <img
          src="/assets/rdp-workflow/mstsc-filled-address.png"
          alt={alt}
          className="size-full object-contain"
          loading="lazy"
        />
        {visual === "computer"
          ? marker(
              { x: 300, y: 266, r: 58 },
              "M680 120C590 155 472 195 348 237",
              "m370 218-22 19 26 2",
              "Red guide arrow and circle highlight the example PC address in the Computer field",
            )
          : marker(
              { x: 655, y: 493, r: 44 },
              "M790 394C750 421 710 448 681 473",
              "m678 451-5 24 24-5",
              "Red guide arrow and circle point to the Connect button",
            )}
      </div>
    );
  }

  return (
    <div
      className="relative flex size-full items-center justify-center bg-[#b9d1e5] bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/windows-11-bloom.jpg')" }}
    >
      <img
        src="/assets/microsip-official-main.png"
        alt={alt}
        className="relative z-0 h-[70%] w-auto shadow-xl"
        loading="lazy"
      />
      <div className="absolute inset-x-0 bottom-0 flex h-7 items-center justify-center gap-2 bg-[#e6edf6]/85">
        <span className="grid size-3 grid-cols-2 gap-px" aria-hidden="true">
          <span className="bg-[#1683d8]" /><span className="bg-[#1683d8]" />
          <span className="bg-[#1683d8]" /><span className="bg-[#1683d8]" />
        </span>
        <span className="h-4 w-20 rounded border border-slate-300/70 bg-white/90" />
      </div>
      <svg
        viewBox="0 0 960 540"
        className="pointer-events-none absolute inset-0 size-full"
        role="img"
        aria-label="Red outline and arrow identify MicroSIP on the connected Windows desktop"
      >
        <rect x="372" y="76" width="216" height="349" rx="7" fill="none" stroke="#e33b36" strokeWidth="7" />
        <path d="M794 112C740 101 680 92 595 91" fill="none" stroke="#e33b36" strokeWidth="7" strokeLinecap="round" />
        <path d="m609 80-21 11 20 12" fill="none" stroke="#e33b36" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function MicroSipWorkflowVisual({
  visual,
  alt,
}: {
  visual: (typeof MICROSIP_WORKFLOW_STEPS)[number]["visual"];
  alt: string;
}) {
  if (visual === "details") {
    return (
      <svg viewBox="0 0 960 540" className="size-full bg-[#f3f6fa]" role="img" aria-label={alt}>
        <rect x="54" y="46" width="852" height="448" rx="18" fill="#fff" stroke="#d8e1eb" strokeWidth="2" />
        <text x="92" y="98" fontFamily="Segoe UI,Arial,sans-serif" fontSize="16" fontWeight="700" letterSpacing="2" fill="#56708c">
          ASK YOUR VOIP PROVIDER OR PBX ADMIN
        </text>
        <text x="92" y="142" fontFamily="Segoe UI,Arial,sans-serif" fontSize="25" fontWeight="600" fill="#1e3045">
          Details to have ready
        </text>
        <rect x="92" y="178" width="370" height="82" rx="10" fill="#f7f9fc" stroke="#d9e2ec" />
        <text x="116" y="208" fontFamily="Segoe UI,Arial,sans-serif" fontSize="13" fill="#718198">SIP SERVER / DOMAIN</text>
        <text x="116" y="238" fontFamily="Consolas,monospace" fontSize="18" fontWeight="600" fill="#26394f">sip.example.invalid</text>
        <rect x="492" y="178" width="370" height="82" rx="10" fill="#f7f9fc" stroke="#d9e2ec" />
        <text x="516" y="208" fontFamily="Segoe UI,Arial,sans-serif" fontSize="13" fill="#718198">USERNAME / EXTENSION</text>
        <text x="516" y="238" fontFamily="Consolas,monospace" fontSize="18" fontWeight="600" fill="#26394f">Your assigned account</text>
        <rect x="92" y="282" width="370" height="82" rx="10" fill="#f7f9fc" stroke="#d9e2ec" />
        <text x="116" y="312" fontFamily="Segoe UI,Arial,sans-serif" fontSize="13" fill="#718198">AUTHENTICATION LOGIN</text>
        <text x="116" y="342" fontFamily="Segoe UI,Arial,sans-serif" fontSize="16" fontWeight="600" fill="#26394f">Only if different from username</text>
        <rect x="492" y="282" width="370" height="82" rx="10" fill="#f7f9fc" stroke="#d9e2ec" />
        <text x="516" y="312" fontFamily="Segoe UI,Arial,sans-serif" fontSize="13" fill="#718198">PASSWORD</text>
        <text x="516" y="342" fontFamily="Segoe UI,Arial,sans-serif" fontSize="16" fontWeight="600" fill="#26394f">Get it from your provider</text>
        <rect x="92" y="390" width="770" height="58" rx="10" fill="#fff5f4" />
        <path d="M118 411v15m0 7v2" stroke="#c43b35" strokeWidth="4" strokeLinecap="round" />
        <text x="140" y="416" fontFamily="Segoe UI,Arial,sans-serif" fontSize="14" fontWeight="600" fill="#8f302d">
          Proxy, transport, or encryption? Ask whether your service requires them.
        </text>
        <text x="140" y="437" fontFamily="Segoe UI,Arial,sans-serif" fontSize="12" fill="#8f302d">
          Example host is reserved for documentation; it is not a real SIP server.
        </text>
        <ellipse cx="278" cy="219" rx="186" ry="50" fill="none" stroke="#e33b36" strokeWidth="6" />
        <path d="M830 151C752 171 656 191 300 234" fill="none" stroke="#e33b36" strokeWidth="6" strokeLinecap="round" />
        <path d="m323 222-23 12 24 6" fill="none" stroke="#e33b36" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  const visuals = {
    menu: {
      src: "/assets/microsip-menu-step.png",
      position: "center top",
      marker: (
        <>
          <circle cx="879" cy="175" r="42" />
          <path d="M674 342C739 294 798 235 847 195" />
          <path d="m823 197 24-2-8 22" />
        </>
      ),
      label: "Red guides point to the MicroSIP main menu button",
    },
    servers: {
      src: "/assets/microsip-server-step.png",
      position: "center center",
      marker: (
        <>
          <ellipse cx="590" cy="255" rx="295" ry="225" />
          <path d="M858 106C835 142 817 179 797 211" />
          <path d="m777 196 20 15 2-25" />
        </>
      ),
      label: "Red guides highlight the SIP server, proxy, username, and domain fields",
    },
    credentials: {
      src: "/assets/microsip-auth-step.png",
      position: "center center",
      marker: (
        <>
          <ellipse cx="590" cy="268" rx="286" ry="156" />
          <path d="M851 110C832 161 814 204 793 240" />
          <path d="m771 223 22 17 1-27" />
        </>
      ),
      label: "Red guides highlight the separate Login and Password fields",
    },
    save: {
      src: "/assets/microsip-save-step.png",
      position: "center center",
      marker: (
        <>
          <ellipse cx="475" cy="443" rx="132" ry="51" />
          <path d="M708 302C652 340 592 383 529 421" />
          <path d="m527 396 2 25 21-12" />
        </>
      ),
      label: "Red guides point to Save in the MicroSIP account window",
    },
    registered: {
      src: "/assets/microsip-online-step.png",
      position: "center bottom",
      marker: (
        <>
          <ellipse cx="112" cy="340" rx="99" ry="53" />
          <path d="M362 185C315 227 260 278 210 322" />
          <path d="m209 298 1 24 22-7" />
        </>
      ),
      label: "Red guides highlight MicroSIP's Online status after registration",
    },
  } as const;
  const selected = visuals[visual];

  return (
    <div className="relative size-full bg-[#e8edf4]">
      <img src={selected.src} alt={alt} className="size-full object-cover" style={{ objectPosition: selected.position }} loading="lazy" />
      <svg
        viewBox="0 0 960 540"
        className="pointer-events-none absolute inset-0 size-full"
        role="img"
        aria-label={selected.label}
      >
        <g fill="none" stroke="#e33b36" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
          {selected.marker}
        </g>
      </svg>
    </div>
  );
}

function RemoteDesktopPreview({ fill = false }: { fill?: boolean }) {
  return (
    <figure className={`windows-desktop-wallpaper relative overflow-hidden ${fill ? "size-full" : "min-h-36 rounded-xl border border-slate-300 shadow-sm sm:min-h-44"}`}>
      <div
        role="img"
        aria-label="Windows 11 remote desktop showing the Bloom wallpaper and MicroSIP softphone"
        className={`relative flex items-center justify-center bg-[#0879d9] bg-cover bg-center ${fill ? "size-full" : "h-36 sm:h-44"}`}
        style={{ backgroundImage: "url('/assets/windows-11-bloom.jpg')" }}
      >
        <img
          src="/assets/microsip-official-main.png"
          alt=""
          aria-hidden="true"
          className={`${fill ? "h-[82%]" : "h-[88%]"} w-auto shadow-xl`}
        />
      </div>
    </figure>
  );
}

function RemoteDesktopSetupPreview() {
  return (
    <figure
      className="windows-desktop-wallpaper relative flex min-h-64 items-center justify-center overflow-hidden rounded-xl border border-slate-300 p-4 shadow-sm sm:min-h-72"
    >
      <img
        src="/assets/rdp-workflow/mstsc-filled-address.png?v=native-windows-capture"
        alt="Native Windows Remote Desktop Connection dialog with the example address rdp.example.com in Computer"
        className="relative z-10 h-auto w-full max-w-[34rem] drop-shadow-[0_16px_30px_rgba(0,0,0,0.5)]"
      />
      <div className="absolute inset-x-0 bottom-0 z-0 flex h-8 items-center justify-center gap-2 bg-[#dce7f1]/80 backdrop-blur-md">
        <span className="grid size-3 grid-cols-2 gap-px" aria-hidden="true">
          <span className="bg-[#1683d8]" /><span className="bg-[#1683d8]" />
          <span className="bg-[#1683d8]" /><span className="bg-[#1683d8]" />
        </span>
        <span className="flex h-5 w-28 items-center gap-1.5 rounded-sm border border-slate-300/70 bg-white/90 px-2">
          <span className="size-2.5 rounded-full border border-slate-400" />
          <span className="h-1 w-12 rounded bg-slate-200" />
        </span>
        <span className="hidden size-4 rounded-sm bg-[#e6a62e] sm:block" />
        <span className="hidden size-4 rounded-sm bg-[#1683d8] sm:block" />
      </div>
    </figure>
  );
}

function IntegrationPreview() {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-300/40">
        <div className="flex h-14 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-slate-800">
            <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-600 text-xs font-extrabold text-white">
              N
            </span>
            Northstar
            <span className="font-normal text-slate-400">CRM</span>
          </div>
          <span className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
            JP
          </span>
        </div>
        <div className="grid min-h-[25rem] grid-cols-[3rem_1fr] sm:grid-cols-[3.5rem_1fr]">
          <nav
            aria-label="CRM sections"
            className="flex flex-col items-center gap-5 border-r border-slate-100 bg-slate-50 py-5 text-slate-400"
          >
            <LayoutDashboard className="size-[18px]" />
            <Users className="size-[18px] rounded bg-emerald-50 text-emerald-700" />
            <Building2 className="size-[18px]" />
            <CalendarDays className="size-[18px]" />
          </nav>
          <div className="min-w-0 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Contacts</span>
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-slate-600">Jordan Patel</span>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-base font-semibold text-emerald-800">
                  JP
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                    Jordan Patel
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-500">Operations Director</p>
                </div>
              </div>
              <span
                aria-hidden="true"
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-600 px-3.5 text-xs font-semibold text-white shadow-sm"
              >
                <PhoneCall className="size-3.5" /> Call contact
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-b border-slate-200 pb-5 text-xs text-slate-600">
              <span className="inline-flex items-center gap-2">
                <Building2 className="size-3.5 text-slate-400" /> Northstar Logistics
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone className="size-3.5 text-slate-400" /> +1 (555) 018-2640
              </span>
            </div>
            <div className="mt-5 grid gap-6 sm:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-xs font-semibold text-slate-800">Contact details</p>
                <dl className="mt-4 space-y-4 text-xs">
                  <div>
                    <dt className="text-slate-400">Company</dt>
                    <dd className="mt-1 font-medium text-slate-700">Northstar Logistics</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Lead status</dt>
                    <dd className="mt-1">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                        Qualified
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Next activity</dt>
                    <dd className="mt-1 font-medium text-slate-700">Follow-up tomorrow</dd>
                  </div>
                </dl>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-800">Recent activity</p>
                  <MoreHorizontal className="size-4 text-slate-400" />
                </div>
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                  <div className="flex items-start gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
                      <PhoneCall className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-800">Outbound call</p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        Today, 10:42 AM <span className="px-1">·</span> 4 min
                      </p>
                    </div>
                    <span className="ml-auto shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                      Connected
                    </span>
                  </div>
                  <p className="mt-3 border-t border-slate-200 pt-3 text-xs leading-relaxed text-slate-600">
                    Discussed delivery schedule. Follow up with revised quote.
                  </p>
                </div>
                <p className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
                  <Clock3 className="size-3.5" /> Logged to this contact
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-slate-500">
        Illustrative CRM screen only—not a live account or connected call action. Available call and
        logging features depend on the chosen integration.
      </figcaption>
    </figure>
  );
}

function WindowsCallingPreview() {
  return (
    <figure className="windows-desktop-wallpaper relative flex min-h-[32rem] flex-col items-center justify-center overflow-hidden px-4 py-8 sm:px-8">
      <img
        src="/assets/microsip-official-main.png?v=single-edge"
        alt="Authentic MicroSIP Windows softphone window showing its Phone tab and dial pad"
        className="relative z-10 max-h-[25rem] w-auto max-w-full"
      />
    </figure>
  );
}
