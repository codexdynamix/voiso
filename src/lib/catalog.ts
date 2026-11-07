export type PlanId = "relay" | "lattice" | "foundry";
export type Term = "month" | "year";
export type AssetId = "usdt" | "usdc" | "btc" | "eth" | "xmr" | "ltc";
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

export type Asset = {
  id: AssetId;
  label: string;
  network: string;
  rate: number;
  digits: number;
  address: string;
};

export const ASSETS: Asset[] = [
  {
    id: "usdt",
    label: "USDT",
    network: "TRC-20",
    rate: 1,
    digits: 2,
    address: "TSandBoxVelaDoNotSendUSDT111111",
  },
  {
    id: "usdc",
    label: "USDC",
    network: "ERC-20",
    rate: 1,
    digits: 2,
    address: "0x5andb0xvela000usdc000donotsend",
  },
  {
    id: "btc",
    label: "BTC",
    network: "Bitcoin",
    rate: 67420,
    digits: 6,
    address: "bc1qsandboxveladonotsend000000000000",
  },
  {
    id: "eth",
    label: "ETH",
    network: "Ethereum",
    rate: 3184,
    digits: 5,
    address: "0x5andb0xvela0000eth000donotsend",
  },
  {
    id: "xmr",
    label: "XMR",
    network: "Monero",
    rate: 312,
    digits: 4,
    address: "8SandboxVelaDoNotSendXMR000000000000",
  },
  {
    id: "ltc",
    label: "LTC",
    network: "Litecoin",
    rate: 86,
    digits: 4,
    address: "ltc1qsandboxveladonotsend00000000",
  },
];

export function assetById(id: AssetId): Asset {
  return ASSETS.find((asset) => asset.id === id) ?? ASSETS[0];
}

export function cryptoAmount(usd: number, id: AssetId) {
  const asset = assetById(id);
  return (usd / asset.rate).toFixed(asset.digits);
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
    q: "Do you require KYC?",
    a: "No. A callsign is the account. Vela does not ask for a legal name, a government ID, a selfie, or a phone number you already own.",
  },
  {
    q: "What is prohibited?",
    a: "Fraud, spam, phishing, and unlawful access. No-KYC is not a permit to abuse carriers or other people's machines. Routes that burn our upstreams are dropped.",
  },
  {
    q: "Which assets can I pay with?",
    a: "USDT on TRC-20, USDC on ERC-20, Bitcoin, Ethereum, Monero, and Litecoin. Quotes in this preview are fixed, not a live market.",
  },
  {
    q: "How fast is provisioning?",
    a: "The sandbox unlocks a workspace immediately. On a real deployment, USDT usually clears in a few minutes and Bitcoin after one confirmation.",
  },
  {
    q: "Do you keep VPN logs?",
    a: "Traffic contents and DNS queries are not stored. Session counters reset when you disconnect. A dedicated exit IP on Foundry is reserved for your callsign, not shared.",
  },
  {
    q: "What happens to the desk on cancel?",
    a: "The volume is wiped. Recordings that lived on it go with it. Thirty-day plans have no lock-in. Unused months on a yearly invoice return to the paying asset, minus the network fee.",
  },
  {
    q: "Is this preview taking my crypto?",
    a: "No. Invoice addresses here are not wallets. Use “Settle in sandbox” to try the workspace. Do not send real funds.",
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
