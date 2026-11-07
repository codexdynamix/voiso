import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Download } from "../_libs/lucide-react.mjs";
import { A as Button, C as profileText, D as tunnelAddress, M as cn, S as planById, a as useVela, m as REGIONS, p as PROTOCOLS, v as effectivePlanId, w as regionById, x as planAllows } from "./router-BmJTrF6H.mjs";
import { n as SwitchThumb, t as Switch } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tunnel-panel-DWDvDe5k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TunnelPanel() {
	const regionId = useVela((state) => state.regionId);
	const protocol = useVela((state) => state.protocol);
	const vpnOn = useVela((state) => state.vpnOn);
	const killSwitch = useVela((state) => state.killSwitch);
	const planId = useVela((state) => state.planId);
	const active = useVela((state) => state.active);
	const setRegion = useVela((state) => state.setRegion);
	const setProtocol = useVela((state) => state.setProtocol);
	const setKillSwitch = useVela((state) => state.setKillSwitch);
	const connectVpn = useVela((state) => state.connectVpn);
	const disconnectVpn = useVela((state) => state.disconnectVpn);
	const [handshaking, setHandshaking] = (0, import_react.useState)(false);
	const plan = planById(effectivePlanId(planId, active));
	const region = regionById(regionId);
	const address = tunnelAddress(regionId);
	const dedicated = planAllows(plan.id, "foundry");
	(0, import_react.useEffect)(() => {
		if (!handshaking) return;
		const id = window.setTimeout(() => {
			connectVpn();
			setHandshaking(false);
		}, 650);
		return () => window.clearTimeout(id);
	}, [handshaking, connectVpn]);
	function onConnect() {
		if (handshaking) {
			setHandshaking(false);
			return;
		}
		if (vpnOn) disconnectVpn();
		else setHandshaking(true);
	}
	function download() {
		const text = profileText(protocol, region.id, address);
		const blob = new Blob([text], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = `vela-${region.id}-sandbox.conf`;
		anchor.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 rounded-lg border border-line bg-raised p-4 md:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-faint",
							children: "Tunnel"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl font-medium",
							children: handshaking ? "Handshaking" : vpnOn ? "Up" : killSwitch ? "Held" : "Down"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [vpnOn ? `${region.city} · ${address}` : `Ready for ${region.city}`, vpnOn ? ` · ${region.ms} ms` : ""]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: onConnect,
						variant: vpnOn ? "line" : "primary",
						size: "lg",
						children: handshaking ? "Cancel" : vpnOn ? "Disconnect" : "Connect"
					})]
				}),
				!vpnOn && killSwitch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-volt",
					children: "Kill switch is holding traffic until the tunnel is up."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center justify-between gap-4 rounded-md border border-line px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: "Kill switch"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-faint",
						children: "Drops traffic if the tunnel drops."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
						checked: killSwitch,
						onCheckedChange: setKillSwitch,
						"aria-label": "Kill switch",
						className: "relative h-7 w-12 shrink-0 rounded-full bg-line data-[state=checked]:bg-volt",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "block size-5 translate-x-1 rounded-full bg-fg transition-transform duration-200 data-[state=checked]:translate-x-6 data-[state=checked]:bg-ink" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-2 sm:grid-cols-3",
					children: PROTOCOLS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-pressed": protocol === item.id,
						onClick: () => setProtocol(item.id),
						className: cn("min-h-16 rounded-md border px-3 py-2 text-left", protocol === item.id ? "border-volt bg-bg" : "border-line"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm text-fg",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-xs text-muted",
							children: item.detail
						})]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: dedicated ? "Dedicated exit reserved for this callsign." : "Shared exit. Dedicated IP is on Foundry."
					}), dedicated ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pricing",
						className: "text-sm text-volt",
						children: "See Foundry"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "line",
					className: "mt-4",
					onClick: download,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "Download sandbox profile"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-line bg-bg p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-faint",
				children: "Regions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 max-h-96 space-y-2 overflow-auto",
				children: REGIONS.map((item) => {
					const selected = item.id === regionId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setRegion(item.id),
						"aria-pressed": selected,
						className: cn("w-full rounded-md border p-3 text-left", selected ? "border-volt" : "border-line hover:border-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-fg",
								children: item.city
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums text-sm text-muted",
								children: [item.ms, " ms"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-2 block h-1 rounded-full bg-line",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block h-1 rounded-full bg-volt",
								style: { width: `${item.load}%` }
							})
						})]
					}) }, item.id);
				})
			})]
		})]
	});
}
//#endregion
export { TunnelPanel as t };
