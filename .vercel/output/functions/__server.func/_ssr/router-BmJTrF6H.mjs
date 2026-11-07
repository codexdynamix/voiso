import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Menu, n as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BmJTrF6H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8", className),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "6,9 12,9 20,16 12,23 6,23 14,16",
			className: "text-volt",
			fill: "currentColor"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "14,11 18,11 24,16 18,21 14,21 20,16",
			fill: "currentColor"
		})]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt disabled:pointer-events-none disabled:opacity-40", {
	variants: {
		variant: {
			primary: "bg-volt text-ink hover:bg-fg",
			line: "border border-line bg-transparent text-fg hover:border-muted",
			ghost: "bg-transparent text-fg hover:bg-surface"
		},
		size: {
			md: "min-h-11 px-5 text-sm",
			lg: "min-h-12 px-6 text-base"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var PLANS = [
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
			"Manual dialer and SMS"
		]
	},
	{
		id: "lattice",
		name: "Lattice",
		price: 49,
		blurb: "The workspace most teams actually run.",
		seats: 8,
		minutes: 3e3,
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
			"Predictive dialer and IVR"
		]
	},
	{
		id: "foundry",
		name: "Foundry",
		price: 129,
		blurb: "A floor of seats, a pinned exit IP, three desks.",
		seats: 25,
		minutes: 1e4,
		dids: 8,
		tunnels: "Dedicated exit IP",
		desk: "3 desks · up to 8 vCPU",
		features: [
			"25 voice seats",
			"10,000 outbound minutes",
			"8 DIDs included",
			"Dedicated VPN exit address",
			"3 desks, up to 8 vCPU / 32 GB",
			"Recordings kept for the term"
		]
	}
];
var PLAN_RANK = {
	relay: 0,
	lattice: 1,
	foundry: 2
};
function planById(id) {
	return PLANS.find((plan) => plan.id === id) ?? PLANS[1];
}
function effectivePlanId(planId, active) {
	if (!active) return "lattice";
	return planId ?? "lattice";
}
function planAllows(current, min) {
	return PLAN_RANK[current] >= PLAN_RANK[min];
}
function termPrice(monthly, term) {
	if (term === "month") return monthly;
	return Math.round(monthly * 12 * .85);
}
function velaForSeats(seats) {
	if (seats <= 2) return {
		plan: PLANS[0],
		monthly: PLANS[0].price,
		extra: 0
	};
	if (seats <= 8) return {
		plan: PLANS[1],
		monthly: PLANS[1].price,
		extra: 0
	};
	if (seats <= 25) return {
		plan: PLANS[2],
		monthly: PLANS[2].price,
		extra: 0
	};
	const extra = seats - 25;
	return {
		plan: PLANS[2],
		monthly: PLANS[2].price + extra * 6,
		extra
	};
}
function legacyMonthly(seats) {
	return seats * 52;
}
var ASSETS = [
	{
		id: "usdt",
		label: "USDT",
		network: "TRC-20",
		rate: 1,
		digits: 2,
		address: "TSandBoxVelaDoNotSendUSDT111111"
	},
	{
		id: "usdc",
		label: "USDC",
		network: "ERC-20",
		rate: 1,
		digits: 2,
		address: "0x5andb0xvela000usdc000donotsend"
	},
	{
		id: "btc",
		label: "BTC",
		network: "Bitcoin",
		rate: 67420,
		digits: 6,
		address: "bc1qsandboxveladonotsend000000000000"
	},
	{
		id: "eth",
		label: "ETH",
		network: "Ethereum",
		rate: 3184,
		digits: 5,
		address: "0x5andb0xvela0000eth000donotsend"
	},
	{
		id: "xmr",
		label: "XMR",
		network: "Monero",
		rate: 312,
		digits: 4,
		address: "8SandboxVelaDoNotSendXMR000000000000"
	},
	{
		id: "ltc",
		label: "LTC",
		network: "Litecoin",
		rate: 86,
		digits: 4,
		address: "ltc1qsandboxveladonotsend00000000"
	}
];
function assetById(id) {
	return ASSETS.find((asset) => asset.id === id) ?? ASSETS[0];
}
function cryptoAmount(usd, id) {
	const asset = assetById(id);
	return (usd / asset.rate).toFixed(asset.digits);
}
var DIDS = [
	{
		id: "+1 212 555 0148",
		city: "New York",
		country: "US",
		monthly: 2
	},
	{
		id: "+44 20 7946 0188",
		city: "London",
		country: "UK",
		monthly: 3
	},
	{
		id: "+49 30 555 0190",
		city: "Berlin",
		country: "DE",
		monthly: 3
	},
	{
		id: "+31 20 555 1180",
		city: "Amsterdam",
		country: "NL",
		monthly: 3
	},
	{
		id: "+65 6555 2204",
		city: "Singapore",
		country: "SG",
		monthly: 4
	},
	{
		id: "+81 3 5550 2291",
		city: "Tokyo",
		country: "JP",
		monthly: 5
	},
	{
		id: "+55 11 5555 2206",
		city: "São Paulo",
		country: "BR",
		monthly: 3
	},
	{
		id: "+971 4 555 2201",
		city: "Dubai",
		country: "AE",
		monthly: 5
	}
];
function visibleDids(owned, count) {
	const base = DIDS.slice(0, count).map((did) => did.id);
	const extra = owned.filter((id) => !base.includes(id) && DIDS.some((did) => did.id === id));
	return [...base, ...extra];
}
var REGIONS = [
	{
		id: "iad",
		city: "Ashburn",
		ms: 11,
		load: 72
	},
	{
		id: "fra",
		city: "Frankfurt",
		ms: 18,
		load: 64
	},
	{
		id: "ams",
		city: "Amsterdam",
		ms: 20,
		load: 58
	},
	{
		id: "lhr",
		city: "London",
		ms: 22,
		load: 61
	},
	{
		id: "zrh",
		city: "Zurich",
		ms: 24,
		load: 33
	},
	{
		id: "cdg",
		city: "Paris",
		ms: 26,
		load: 49
	},
	{
		id: "arn",
		city: "Stockholm",
		ms: 28,
		load: 27
	},
	{
		id: "sin",
		city: "Singapore",
		ms: 41,
		load: 55
	},
	{
		id: "nrt",
		city: "Tokyo",
		ms: 48,
		load: 44
	},
	{
		id: "gru",
		city: "São Paulo",
		ms: 54,
		load: 38
	},
	{
		id: "syd",
		city: "Sydney",
		ms: 62,
		load: 22
	},
	{
		id: "jnb",
		city: "Johannesburg",
		ms: 71,
		load: 18
	}
];
function regionById(id) {
	return REGIONS.find((region) => region.id === id) ?? REGIONS[1];
}
function tunnelAddress(regionId) {
	const index = REGIONS.findIndex((region) => region.id === regionId);
	return `10.8.${index < 0 ? 4 : index + 4}.14`;
}
var MACHINES = [
	{
		id: "pool-1",
		name: "pool-1",
		cpu: "2 vCPU",
		ram: "4 GB",
		disk: "40 GB",
		os: "Windows 11",
		min: "relay",
		note: "Shared burst desk. Sleeps after the included hours."
	},
	{
		id: "dx-04",
		name: "dx-04",
		cpu: "4 vCPU",
		ram: "8 GB",
		disk: "80 GB NVMe",
		os: "Windows 11",
		min: "lattice",
		note: "Pinned to your callsign for the term. Wiped on cancel."
	},
	{
		id: "dx-09",
		name: "dx-09",
		cpu: "8 vCPU",
		ram: "16 GB",
		disk: "160 GB NVMe",
		os: "Windows 11",
		min: "foundry",
		note: "Second desk. Same gateway, separate volume."
	},
	{
		id: "dx-12",
		name: "dx-12",
		cpu: "8 vCPU",
		ram: "32 GB",
		disk: "240 GB NVMe",
		os: "Windows 11",
		min: "foundry",
		note: "Heavy desk for browsers, CRMs, and call recordings."
	}
];
function machineById(id) {
	return MACHINES.find((machine) => machine.id === id) ?? MACHINES[1];
}
var PROTOCOLS = [
	{
		id: "wg",
		name: "WireGuard",
		detail: "Default. Short handshake, small surface."
	},
	{
		id: "ovpn",
		name: "OpenVPN",
		detail: "UDP 1194, when a network blocks WireGuard."
	},
	{
		id: "ike",
		name: "IKEv2",
		detail: "Native on phones. Roams between cell and wifi."
	}
];
var LEADS = [
	{
		name: "Northwind Goods",
		number: "+1 212 555 0174"
	},
	{
		name: "Harbor & Pine",
		number: "+1 415 555 0138"
	},
	{
		name: "Lumen Clinic",
		number: "+44 20 7946 0123"
	},
	{
		name: "Fieldnote Studio",
		number: "+49 30 555 0192"
	},
	{
		name: "Kite Logistics",
		number: "+65 6555 0144"
	}
];
var FAQ = [
	{
		q: "Do you require KYC?",
		a: "No. A callsign is the account. Vela does not ask for a legal name, a government ID, a selfie, or a phone number you already own."
	},
	{
		q: "What is prohibited?",
		a: "Fraud, spam, phishing, and unlawful access. No-KYC is not a permit to abuse carriers or other people's machines. Routes that burn our upstreams are dropped."
	},
	{
		q: "Which assets can I pay with?",
		a: "USDT on TRC-20, USDC on ERC-20, Bitcoin, Ethereum, Monero, and Litecoin. Quotes in this preview are fixed, not a live market."
	},
	{
		q: "How fast is provisioning?",
		a: "The sandbox unlocks a workspace immediately. On a real deployment, USDT usually clears in a few minutes and Bitcoin after one confirmation."
	},
	{
		q: "Do you keep VPN logs?",
		a: "Traffic contents and DNS queries are not stored. Session counters reset when you disconnect. A dedicated exit IP on Foundry is reserved for your callsign, not shared."
	},
	{
		q: "What happens to the desk on cancel?",
		a: "The volume is wiped. Recordings that lived on it go with it. Thirty-day plans have no lock-in. Unused months on a yearly invoice return to the paying asset, minus the network fee."
	},
	{
		q: "Is this preview taking my crypto?",
		a: "No. Invoice addresses here are not wallets. Use “Settle in sandbox” to try the workspace. Do not send real funds."
	}
];
var WORDS = [
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
	"rapids"
];
function phraseFor(callsign) {
	let hash = 2166136261;
	const seed = `${callsign}:vela`;
	for (let i = 0; i < seed.length; i += 1) hash = Math.imul(hash ^ seed.charCodeAt(i), 16777619);
	let x = hash >>> 0;
	const used = /* @__PURE__ */ new Set();
	const out = [];
	while (out.length < 12) {
		x = Math.imul(x, 1664525) + 1013904223 >>> 0;
		const index = x % WORDS.length;
		if (used.has(index)) continue;
		used.add(index);
		out.push(WORDS[index]);
	}
	return out;
}
var ADJECTIVES = [
	"amber",
	"quiet",
	"north",
	"brass",
	"cedar",
	"iron",
	"still",
	"rapid",
	"keen",
	"low"
];
var NOUNS = [
	"lark",
	"harbor",
	"ridge",
	"kiln",
	"orbit",
	"pine",
	"ledger",
	"spur",
	"vista",
	"mere"
];
function suggestCallsign() {
	return `${ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]}-${NOUNS[Math.floor(Math.random() * NOUNS.length)]}`;
}
function cleanCallsign(raw) {
	const value = raw.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/^-+/, "").slice(0, 16);
	if (value.length < 3 || !/^[a-z]/.test(value)) return null;
	return value;
}
function profileText(protocol, regionId, address) {
	const host = `${regionId}.vela.invalid`;
	if (protocol === "ovpn") return `client\ndev tun\nproto udp\nremote ${host} 1194\n# Vela sandbox profile — not a live gateway. Do not import.\n`;
	if (protocol === "ike") return `server: ike.${host}\nremote-id: sandbox\nlocal-address: ${address}\n# Vela sandbox profile — not a live gateway. Do not import.\n`;
	return `[Interface]\nPrivateKey = SANDBOX_DO_NOT_IMPORT\nAddress = ${address}/32\nDNS = 1.1.1.1\n\n[Peer]\nPublicKey = SANDBOX_DO_NOT_IMPORT\nEndpoint = ${host}:51820\nAllowedIPs = 0.0.0.0/0, ::/0\n# Vela sandbox profile — not a live gateway. Do not import.\n`;
}
var COMPARE = [
	[
		"Time to first call",
		"A demo, a contract, then a queue",
		"Minutes after confirmation"
	],
	[
		"Identity",
		"Company papers and a passport",
		"A callsign. Nothing else."
	],
	[
		"Billing",
		"Card, net terms, seats locked in",
		"Crypto. Cancel when you want."
	],
	[
		"What you get",
		"Voice, then a pile of add-ons",
		"Voice, tunnel, and a desk"
	],
	[
		"Price shape",
		"About $52 per agent, before usage",
		"One workspace price"
	],
	[
		"Exit",
		"Annual commit, data held",
		"Wipe on cancel. Refund unused months."
	]
];
var dialTimer = null;
function rid() {
	return Math.random().toString(36).slice(2, 10);
}
function clearDial() {
	if (dialTimer) {
		clearTimeout(dialTimer);
		dialTimer = null;
	}
}
var useVela = create()(persist((set, get) => ({
	callsign: "",
	planId: null,
	term: "month",
	asset: "usdt",
	recovery: null,
	recoverySeen: false,
	active: false,
	invoiceId: null,
	did: DIDS[0].id,
	ownedDids: [],
	callStatus: "idle",
	callPeer: "",
	callDirection: "out",
	callStarted: null,
	muted: false,
	held: false,
	recents: [],
	messages: [],
	regionId: "fra",
	protocol: "wg",
	vpnOn: false,
	killSwitch: true,
	machineId: "dx-04",
	deskOpen: false,
	setDid: (id) => set({ did: id }),
	attachDid: (id) => {
		const owned = get().ownedDids;
		set({
			ownedDids: owned.includes(id) ? owned : [...owned, id],
			did: id
		});
	},
	setRegion: (id) => set({ regionId: id }),
	setProtocol: (id) => set({ protocol: id }),
	setKillSwitch: (on) => set({ killSwitch: on }),
	setMachine: (id) => set({ machineId: id }),
	setDeskOpen: (open) => set({ deskOpen: open }),
	toggleMute: () => set({ muted: !get().muted }),
	toggleHold: () => set({ held: !get().held }),
	startCall: (peer) => {
		const trimmed = peer.trim();
		if (!trimmed) return;
		clearDial();
		set({
			callStatus: "dialing",
			callPeer: trimmed,
			callDirection: "out",
			callStarted: null,
			muted: false,
			held: false
		});
		dialTimer = setTimeout(() => {
			const current = get();
			if (current.callStatus === "dialing" && current.callPeer === trimmed) set({
				callStatus: "live",
				callStarted: Date.now()
			});
		}, 850);
	},
	ring: () => {
		clearDial();
		set({
			callStatus: "dialing",
			callPeer: "+1 415 555 0136",
			callDirection: "in",
			callStarted: null,
			muted: false,
			held: false
		});
		dialTimer = setTimeout(() => {
			const current = get();
			if (current.callStatus === "dialing" && current.callDirection === "in") set({
				callStatus: "live",
				callStarted: Date.now()
			});
		}, 4e3);
	},
	answer: () => {
		clearDial();
		if (get().callStatus === "idle") return;
		set({
			callStatus: "live",
			callStarted: Date.now()
		});
	},
	hangup: () => {
		clearDial();
		const current = get();
		if (current.callStatus === "idle") return;
		const seconds = current.callStatus === "live" && current.callStarted ? Math.max(1, Math.round((Date.now() - current.callStarted) / 1e3)) : 0;
		set({
			callStatus: "idle",
			callStarted: null,
			muted: false,
			held: false,
			recents: [{
				id: rid(),
				peer: current.callPeer,
				direction: current.callDirection,
				seconds,
				at: Date.now()
			}, ...current.recents].slice(0, 8)
		});
	},
	sendSms: (to, body) => {
		const trimmedTo = to.trim();
		const trimmedBody = body.trim();
		if (!trimmedTo || !trimmedBody) return;
		set({ messages: [{
			id: rid(),
			to: trimmedTo,
			body: trimmedBody.slice(0, 160),
			at: Date.now()
		}, ...get().messages].slice(0, 12) });
	},
	connectVpn: () => set({ vpnOn: true }),
	disconnectVpn: () => set({ vpnOn: false }),
	settle: ({ planId, term, asset, callsign, invoiceId }) => {
		const included = planId === "relay" ? 1 : planId === "lattice" ? 3 : 8;
		const defaults = DIDS.slice(0, included).map((did) => did.id);
		set({
			active: true,
			planId,
			term,
			asset,
			callsign,
			invoiceId,
			recovery: phraseFor(callsign),
			recoverySeen: false,
			ownedDids: defaults,
			did: defaults[0] ?? DIDS[0].id,
			machineId: planId === "relay" ? "pool-1" : "dx-04",
			deskOpen: false
		});
	},
	ackRecovery: () => set({ recoverySeen: true }),
	resetWorkspace: () => {
		clearDial();
		set({
			callsign: "",
			planId: null,
			active: false,
			recovery: null,
			recoverySeen: false,
			invoiceId: null,
			ownedDids: [],
			did: DIDS[0].id,
			vpnOn: false,
			deskOpen: false,
			callStatus: "idle",
			callPeer: "",
			callStarted: null,
			recents: [],
			messages: [],
			machineId: "dx-04"
		});
	}
}), {
	name: "vela-workspace",
	skipHydration: true,
	partialize: (state) => ({
		callsign: state.callsign,
		planId: state.planId,
		term: state.term,
		asset: state.asset,
		recovery: state.recovery,
		recoverySeen: state.recoverySeen,
		active: state.active,
		invoiceId: state.invoiceId,
		did: state.did,
		ownedDids: state.ownedDids,
		recents: state.recents,
		messages: state.messages,
		regionId: state.regionId,
		protocol: state.protocol,
		vpnOn: state.vpnOn,
		killSwitch: state.killSwitch,
		machineId: state.machineId
	})
}));
function useHydrateVela() {
	(0, import_react.useEffect)(() => {
		useVela.persist.rehydrate();
	}, []);
}
function useHydrated() {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	return ready;
}
var LINKS = [
	{
		to: "/voice",
		label: "Voice"
	},
	{
		to: "/tunnel",
		label: "Tunnel"
	},
	{
		to: "/desk",
		label: "Desk"
	},
	{
		to: "/pricing",
		label: "Pricing"
	}
];
function Wrap({ className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("mx-auto w-full max-w-6xl px-5 md:px-8", className),
		children
	});
}
function Shell({ children }) {
	useHydrateVela();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen flex-col overflow-x-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#content",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-volt focus:px-4 focus:py-2 focus:text-ink",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "content",
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function SiteHeader() {
	const pathname = useRouterState({ select: (state) => state.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-line bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
			className: "flex h-16 items-center justify-between gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex min-h-11 items-center gap-2 text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium tracking-widest",
						children: "VELA"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-6 md:flex",
					"aria-label": "Primary",
					children: LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: link.to,
						className: cn("inline-flex min-h-11 items-center text-sm", pathname === link.to ? "text-fg" : "text-muted hover:text-fg"),
						children: link.label
					}, link.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/console",
							className: cn(buttonVariants({ variant: "line" }), "hidden md:inline-flex"),
							children: "Console"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/pricing",
							className: buttonVariants(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sm:hidden",
								children: "Pricing"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Get a line"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex size-11 items-center justify-center rounded-full text-fg md:hidden",
							"aria-expanded": open,
							"aria-label": open ? "Close menu" : "Open menu",
							onClick: () => setOpen((value) => !value),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-line md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
				className: "flex flex-col py-2",
				children: [LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					className: cn("inline-flex min-h-11 items-center text-base", pathname === link.to ? "text-fg" : "text-muted"),
					children: link.label
				}, link.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/console",
					className: "inline-flex min-h-11 items-center text-base text-fg",
					children: "Console"
				})]
			})
		}) : null]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
			className: "grid gap-10 py-12 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium tracking-widest",
							children: "VELA"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-sm text-sm text-muted",
						children: "Voice, a tunnel, and a desk on one crypto invoice. A callsign is the whole account."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-faint",
					children: "Products"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-1 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/voice",
							className: "inline-flex min-h-11 items-center text-muted hover:text-fg",
							children: "Voice"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/tunnel",
							className: "inline-flex min-h-11 items-center text-muted hover:text-fg",
							children: "Tunnel"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/desk",
							className: "inline-flex min-h-11 items-center text-muted hover:text-fg",
							children: "Desk"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-faint",
					children: "Workspace"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-1 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/pricing",
							className: "inline-flex min-h-11 items-center text-muted hover:text-fg",
							children: "Pricing"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							search: {
								plan: "lattice",
								term: "month"
							},
							className: "inline-flex min-h-11 items-center text-muted hover:text-fg",
							children: "Checkout"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/console",
							className: "inline-flex min-h-11 items-center text-muted hover:text-fg",
							children: "Console"
						}) })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
				className: "flex flex-col gap-2 py-5 text-xs text-faint md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sandbox preview. Invoices do not collect cryptocurrency. Do not send funds." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Fraud, spam, and unlawful access are prohibited." })]
			})
		})]
	});
}
var styles_default = "/assets/styles-qjMV3KnO.css";
var Route$7 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Vela — Voice, tunnel, and desk" },
			{
				name: "description",
				content: "Vela is a no-KYC communications cloud. VoIP, a WireGuard tunnel, and Windows desks, settled in crypto."
			},
			{
				name: "theme-color",
				content: "#0c0d0a"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$6 = () => import("./routes-hSnwhZZc.mjs");
var Route$6 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./checkout-DuY75MpI.mjs");
function readPlan(value) {
	if (value === "relay" || value === "lattice" || value === "foundry") return value;
	return "lattice";
}
function readTerm(value) {
	return value === "year" ? "year" : "month";
}
var Route$5 = createFileRoute("/checkout")({
	validateSearch: (search) => ({
		plan: readPlan(search.plan),
		term: readTerm(search.term)
	}),
	head: () => ({ meta: [{ title: "Checkout — Vela" }, {
		name: "description",
		content: "Sandbox crypto invoice for a Vela workspace. No KYC. No real funds."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./console-B0NkVgaH.mjs");
var Route$4 = createFileRoute("/console")({
	head: () => ({ meta: [{ title: "Console — Vela" }, {
		name: "description",
		content: "Vela workspace. Voice, tunnel, and desk under one callsign."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./desk-DR0GHylJ.mjs");
var Route$3 = createFileRoute("/desk")({
	head: () => ({ meta: [{ title: "Desk — Vela" }, {
		name: "description",
		content: "Windows workstations on a locked gateway. Wiped when the term ends. No KYC."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./pricing-Bjyu81Kd.mjs");
var Route$2 = createFileRoute("/pricing")({
	head: () => ({ meta: [{ title: "Pricing — Vela" }, {
		name: "description",
		content: "Relay, Lattice, and Foundry. One crypto price for voice, tunnel, and desk. No KYC."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./tunnel-BsXxY8hx.mjs");
var Route$1 = createFileRoute("/tunnel")({
	head: () => ({ meta: [{ title: "Tunnel — Vela" }, {
		name: "description",
		content: "WireGuard, OpenVPN, and IKEv2 across 12 regions. No account email. Kill switch on."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./voice-BqNPQ0ui.mjs");
var Route = createFileRoute("/voice")({
	head: () => ({ meta: [{ title: "Voice — Vela" }, {
		name: "description",
		content: "Browser softphone, DIDs, SMS, and a dialer. No per-agent contract and no KYC."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	CheckoutRoute: Route$5.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$7
	}),
	ConsoleRoute: Route$4.update({
		id: "/console",
		path: "/console",
		getParentRoute: () => Route$7
	}),
	DeskRoute: Route$3.update({
		id: "/desk",
		path: "/desk",
		getParentRoute: () => Route$7
	}),
	PricingRoute: Route$2.update({
		id: "/pricing",
		path: "/pricing",
		getParentRoute: () => Route$7
	}),
	TunnelRoute: Route$1.update({
		id: "/tunnel",
		path: "/tunnel",
		getParentRoute: () => Route$7
	}),
	VoiceRoute: Route.update({
		id: "/voice",
		path: "/voice",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Button as A, profileText as C, tunnelAddress as D, termPrice as E, cn as M, velaForSeats as O, planById as S, suggestCallsign as T, cryptoAmount as _, useVela as a, machineById as b, DIDS as c, MACHINES as d, PLANS as f, cleanCallsign as g, assetById as h, useHydrated as i, buttonVariants as j, visibleDids as k, FAQ as l, REGIONS as m, Route$5 as n, ASSETS as o, PROTOCOLS as p, Wrap as r, COMPARE as s, router_exports as t, LEADS as u, effectivePlanId as v, regionById as w, planAllows as x, legacyMonthly as y };
