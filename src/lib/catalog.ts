export type PlanId = "relay" | "lattice" | "foundry";
export type Term = "month" | "year";
export type ProtocolId = "wg" | "ovpn" | "ike";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  blurb: string;
  seats: number;
  minutes: number;
  dids: number;
  tunnels: string;
  desk: string;
  features: string[];
  featured?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "relay",
    name: "Relay",
    price: 19,
    blurb: "A line, one tunnel, and burst time on a shared desk.",
    seats: 2,
    minutes: 800,
    dids: 1,
    tunnels: "1 device",
    desk: "Shared pool · 8 hours",
    features: [
      "2 voice seats",
      "800 outbound minutes",
      "1 DID included",
      "1 WireGuard device",
      "Shared desk, 8 hours",
      "Manual dialer and SMS",
    ],
  },
  {
    id: "lattice",
    name: "Lattice",
    price: 49,
    blurb: "The workspace most teams actually run.",
    seats: 8,
    minutes: 3000,
    dids: 3,
    tunnels: "5 devices · 12 regions",
    desk: "Dedicated 4 vCPU",
    featured: true,
    features: [
      "8 voice seats",
      "3,000 outbound minutes",
      "3 DIDs included",
      "5 tunnels across 12 regions",
      "Dedicated desk, 4 vCPU / 8 GB",
      "Predictive dialer and IVR",
    ],
  },
  {
    id: "foundry",
    name: "Foundry",
    price: 129,
    blurb: "A floor of seats, a pinned exit IP, three desks.",
    seats: 25,
    minutes: 10000,
    dids: 8,
    tunnels: "Dedicated exit IP",
    desk: "3 desks · up to 8 vCPU",
    features: [
      "25 voice seats",
      "10,000 outbound minutes",
      "8 DIDs included",
      "Dedicated VPN exit address",
      "3 desks, up to 8 vCPU / 32 GB",
      "Recordings kept for the term",
    ],
  },
];

export const PLAN_RANK: Record<PlanId, number> = {
  relay: 0,
  lattice: 1,
  foundry: 2,
};

export function planById(id: PlanId): Plan {
  return PLANS.find((plan) => plan.id === id) ?? PLANS[1];
}

export function effectivePlanId(planId: PlanId | null, active: boolean): PlanId {
  if (!active) return "lattice";
  return planId ?? "lattice";
}

export function planAllows(current: PlanId, min: PlanId) {
  return PLAN_RANK[current] >= PLAN_RANK[min];
}

export function termPrice(monthly: number, term: Term) {
  if (term === "month") return monthly;
  return Math.round(monthly * 12 * 0.85);
}

export function velaForSeats(seats: number) {
  if (seats <= 2) return { plan: PLANS[0], monthly: PLANS[0].price, extra: 0 };
  if (seats <= 8) return { plan: PLANS[1], monthly: PLANS[1].price, extra: 0 };
  if (seats <= 25) return { plan: PLANS[2], monthly: PLANS[2].price, extra: 0 };
  const extra = seats - 25;
  return { plan: PLANS[2], monthly: PLANS[2].price + extra * 6, extra };
}

export function legacyMonthly(seats: number) {
  return seats * 52;
}

export type Did = {
  id: string;
  city: string;
  country: string;
  monthly: number;
};

export const DIDS: Did[] = [
  { id: "+1 212 555 0148", city: "New York", country: "US", monthly: 2 },
  { id: "+44 20 7946 0188", city: "London", country: "UK", monthly: 3 },
  { id: "+49 30 555 0190", city: "Berlin", country: "DE", monthly: 3 },
  { id: "+31 20 555 1180", city: "Amsterdam", country: "NL", monthly: 3 },
  { id: "+65 6555 2204", city: "Singapore", country: "SG", monthly: 4 },
  { id: "+81 3 5550 2291", city: "Tokyo", country: "JP", monthly: 5 },
  { id: "+45 32 55 01 48", city: "Copenhagen", country: "DK", monthly: 3 },
  { id: "+47 21 55 01 48", city: "Oslo", country: "NO", monthly: 3 },
  { id: "+46 8 555 01 48", city: "Stockholm", country: "SE", monthly: 3 },
  { id: "+358 9 555 0148", city: "Helsinki", country: "FI", monthly: 3 },
  { id: "+354 555 0148", city: "Reykjavík", country: "IS", monthly: 4 },
  { id: "+61 2 5550 0148", city: "Sydney", country: "AU", monthly: 4 },
  { id: "+1 416 555 0148", city: "Toronto", country: "CA", monthly: 3 },
  { id: "+55 11 5555 2206", city: "São Paulo", country: "BR", monthly: 3 },
  { id: "+971 4 555 2201", city: "Dubai", country: "AE", monthly: 5 },
];

export function visibleDids(owned: string[], count: number) {
  const base = DIDS.slice(0, count).map((did) => did.id);
  const extra = owned.filter((id) => !base.includes(id) && DIDS.some((did) => did.id === id));
  return [...base, ...extra];
}

export type Region = {
  id: string;
  city: string;
  ms: number;
  load: number;
};

export const REGIONS: Region[] = [
  { id: "iad", city: "Ashburn", ms: 11, load: 72 },
  { id: "fra", city: "Frankfurt", ms: 18, load: 64 },
  { id: "ams", city: "Amsterdam", ms: 20, load: 58 },
  { id: "lhr", city: "London", ms: 22, load: 61 },
  { id: "zrh", city: "Zurich", ms: 24, load: 33 },
  { id: "cdg", city: "Paris", ms: 26, load: 49 },
  { id: "arn", city: "Stockholm", ms: 28, load: 27 },
  { id: "sin", city: "Singapore", ms: 41, load: 55 },
  { id: "nrt", city: "Tokyo", ms: 48, load: 44 },
  { id: "gru", city: "São Paulo", ms: 54, load: 38 },
  { id: "syd", city: "Sydney", ms: 62, load: 22 },
  { id: "jnb", city: "Johannesburg", ms: 71, load: 18 },
];

export function regionById(id: string) {
  return REGIONS.find((region) => region.id === id) ?? REGIONS[1];
}

export function tunnelAddress(regionId: string) {
  const index = REGIONS.findIndex((region) => region.id === regionId);
  return `10.8.${index < 0 ? 4 : index + 4}.14`;
}

export type Machine = {
  id: string;
  name: string;
  cpu: string;
  ram: string;
  disk: string;
  os: string;
  min: PlanId;
  note: string;
};

export const MACHINES: Machine[] = [
  {
    id: "pool-1",
    name: "pool-1",
    cpu: "2 vCPU",
    ram: "4 GB",
    disk: "40 GB",
    os: "Windows 11",
    min: "relay",
    note: "Shared burst desk. Sleeps after the included hours.",
  },
  {
    id: "dx-04",
    name: "dx-04",
    cpu: "4 vCPU",
    ram: "8 GB",
    disk: "80 GB NVMe",
    os: "Windows 11",
    min: "lattice",
    note: "Pinned to your callsign for the term. Wiped on cancel.",
  },
  {
    id: "dx-09",
    name: "dx-09",
    cpu: "8 vCPU",
    ram: "16 GB",
    disk: "160 GB NVMe",
    os: "Windows 11",
    min: "foundry",
    note: "Second desk. Same gateway, separate volume.",
  },
  {
    id: "dx-12",
    name: "dx-12",
    cpu: "8 vCPU",
    ram: "32 GB",
    disk: "240 GB NVMe",
    os: "Windows 11",
    min: "foundry",
    note: "Heavy desk for browsers, CRMs, and call recordings.",
  },
];

export function machineById(id: string) {
  return MACHINES.find((machine) => machine.id === id) ?? MACHINES[1];
}

export type ServerPlan = {
  id: string;
  name: string;
  price: number;
  specs: string[];
};

export const VPS_PLANS: ServerPlan[] = [
  {
    id: "vps-basic",
    name: "Basic",
    price: 12,
    specs: ["4 AMD EPYC cores", "8 GB DDR4 ECC", "80 GB NVMe · RAID 10", "10 Gbps · 5 TB", "Windows Server 2019/22", "New York or Chicago"],
  },
  {
    id: "vps-standard",
    name: "Standard",
    price: 24,
    specs: ["6 AMD EPYC cores", "16 GB DDR4 ECC", "160 GB NVMe · RAID 10", "10 Gbps · 10 TB", "Windows Server 2019/22", "New York or Chicago"],
  },
  {
    id: "vps-professional",
    name: "Professional",
    price: 48,
    specs: ["12 AMD EPYC cores", "32 GB DDR4 ECC", "320 GB NVMe · RAID 10", "10 Gbps · 20 TB", "Windows Server 2019/22", "New York or Chicago"],
  },
  {
    id: "vps-ultimate",
    name: "Ultimate",
    price: 96,
    specs: ["24 AMD EPYC cores", "64 GB DDR4 ECC", "500 GB NVMe · RAID 10", "10 Gbps · 50 TB", "Windows Server 2019/22", "New York or Chicago"],
  },
];

export const DEDICATED_PLANS: ServerPlan[] = [
  {
    id: "dedicated-silver",
    name: "Silver",
    price: 70,
    specs: ["Intel Xeon X3470 · 4 cores", "16 GB ECC", "120 GB SSD + 2 TB SATA", "1 Gbps · 20 TB", "Chicago, Illinois", "1 IP · iDRAC/IPMI · 1–3 day setup"],
  },
  {
    id: "dedicated-gold",
    name: "Gold",
    price: 85,
    specs: ["Dual Intel Xeon L5630 · 8 cores", "24 GB ECC", "120 GB SSD + 2 TB SATA", "1 Gbps · 20 TB", "Chicago, Illinois", "1 IP · iDRAC/IPMI · 1–3 day setup"],
  },
  {
    id: "dedicated-diamond",
    name: "Diamond",
    price: 110,
    specs: ["Dual Intel Xeon L5630 · 8 cores", "72 GB ECC", "120 GB SSD + 2 TB SATA", "1 Gbps · 20 TB", "Chicago, Illinois", "1 IP · iDRAC/IPMI · 1–3 day setup"],
  },
  {
    id: "dedicated-platinum",
    name: "Platinum",
    price: 150,
    specs: ["Intel Xeon E5-2620 · 12 cores", "32 GB ECC", "2 × 120 GB SSD + 2 TB SATA", "1 Gbps · 20 TB", "Chicago, Illinois", "1 IP · iDRAC/IPMI · 1–3 day setup"],
  },
];

export const PROTOCOLS: { id: ProtocolId; name: string; detail: string }[] = [
  { id: "wg", name: "WireGuard", detail: "Default. Short handshake, small surface." },
  { id: "ovpn", name: "OpenVPN", detail: "UDP 1194, when a network blocks WireGuard." },
  { id: "ike", name: "IKEv2", detail: "Native on phones. Roams between cell and wifi." },
];

export const LEADS = [
  { name: "Northwind Goods", number: "+1 212 555 0174" },
  { name: "Harbor & Pine", number: "+1 415 555 0138" },
  { name: "Lumen Clinic", number: "+44 20 7946 0123" },
  { name: "Fieldnote Studio", number: "+49 30 555 0192" },
  { name: "Kite Logistics", number: "+65 6555 0144" },
];

export const FAQ = [
  {
    q: "Does this preview require identity verification?",
    a: "This preview does not collect identity documents. Requirements for a live service depend on the payment processor, number carrier, region, and applicable law.",
  },
  {
    q: "What is prohibited?",
    a: "Any future live service must be used lawfully and in accordance with carrier, payment-provider, desktop-provider, and regional requirements. This preview does not authorize access to any external system.",
  },
  {
    q: "Can I pay for an order here?",
    a: "No. A payment processor and server-side payment verification are not connected. Do not send funds or treat an order preview as a payment request.",
  },
  {
    q: "When are phone numbers and RDP provisioned?",
    a: "Nothing is ordered or provisioned in this preview. Live fulfillment timing must be confirmed with the selected carrier and desktop provider after payment verification is implemented.",
  },
  {
    q: "Does the VPN control connect to a real network?",
    a: "No. The tunnel controls and downloaded profiles are illustrative only and do not establish a VPN connection.",
  },
  {
    q: "Can I launch a paid desktop from this site?",
    a: "No. The desktop screen is a browser preview. RDP provider provisioning, subscription changes, and cancellation are not connected.",
  },
  {
    q: "Is this preview taking a payment?",
    a: "No payment is processed and no real wallet address is provided. Do not send funds based on this preview.",
  },
];

const WORDS = [
  "amber",
  "birch",
  "cedar",
  "delta",
  "ember",
  "fjord",
  "granite",
  "harbor",
  "iris",
  "juniper",
  "kite",
  "linen",
  "maple",
  "north",
  "orchid",
  "pine",
  "quartz",
  "ridge",
  "sage",
  "timber",
  "umber",
  "violet",
  "willow",
  "yarrow",
  "brass",
  "flint",
  "keel",
  "mercury",
  "osprey",
  "prairie",
  "quill",
  "rapids",
];

export function phraseFor(callsign: string) {
  let hash = 2166136261;
  const seed = `${callsign}:vela`;
  for (let i = 0; i < seed.length; i += 1) {
    hash = Math.imul(hash ^ seed.charCodeAt(i), 16777619);
  }
  let x = hash >>> 0;
  const used = new Set<number>();
  const out: string[] = [];
  while (out.length < 12) {
    x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
    const index = x % WORDS.length;
    if (used.has(index)) continue;
    used.add(index);
    out.push(WORDS[index]);
  }
  return out;
}

const ADJECTIVES = ["amber", "quiet", "north", "brass", "cedar", "iron", "still", "rapid", "keen", "low"];
const NOUNS = ["lark", "harbor", "ridge", "kiln", "orbit", "pine", "ledger", "spur", "vista", "mere"];

export function suggestCallsign() {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adjective}-${noun}`;
}

export function cleanCallsign(raw: string) {
  const value = raw
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+/, "")
    .slice(0, 16);
  if (value.length < 3 || !/^[a-z]/.test(value)) return null;
  return value;
}

export function profileText(protocol: ProtocolId, regionId: string, address: string) {
  const host = `${regionId}.vela.invalid`;
  if (protocol === "ovpn") {
    return `client\ndev tun\nproto udp\nremote ${host} 1194\n# Vela sandbox profile — not a live gateway. Do not import.\n`;
  }
  if (protocol === "ike") {
    return `server: ike.${host}\nremote-id: sandbox\nlocal-address: ${address}\n# Vela sandbox profile — not a live gateway. Do not import.\n`;
  }
  return `[Interface]\nPrivateKey = SANDBOX_DO_NOT_IMPORT\nAddress = ${address}/32\nDNS = 1.1.1.1\n\n[Peer]\nPublicKey = SANDBOX_DO_NOT_IMPORT\nEndpoint = ${host}:51820\nAllowedIPs = 0.0.0.0/0, ::/0\n# Vela sandbox profile — not a live gateway. Do not import.\n`;
}

export const COMPARE = [
  ["Time to first call", "A demo, a contract, then a queue", "Minutes after confirmation"],
  ["Identity", "Company papers and a passport", "A callsign. Nothing else."],
  ["Billing", "Card, net terms, seats locked in", "Crypto. Cancel when you want."],
  ["What you get", "Voice, then a pile of add-ons", "Voice, tunnel, and a desk"],
  ["Price shape", "About $52 per agent, before usage", "One workspace price"],
  ["Exit", "Annual commit, data held", "Wipe on cancel. Refund unused months."],
];
