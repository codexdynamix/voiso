import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Button, M as cn, S as planById, a as useVela, r as Wrap, v as effectivePlanId } from "./router-BmJTrF6H.mjs";
import { t as DeskPanel } from "./desk-panel-4rSlkc5p.mjs";
import { t as TunnelPanel } from "./tunnel-panel-DWDvDe5k.mjs";
import { t as VoicePanel } from "./voice-panel-DTk97P0t.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/console-B0NkVgaH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RecoveryDialog() {
	const recovery = useVela((state) => state.recovery);
	const seen = useVela((state) => state.recoverySeen);
	const active = useVela((state) => state.active);
	const ack = useVela((state) => state.ackRecovery);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const open = Boolean(active && recovery && !seen);
	async function copy() {
		if (!recovery) return;
		try {
			await navigator.clipboard.writeText(recovery.join(" "));
			setCopied(true);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-line bg-raised p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "font-display text-3xl font-medium",
					children: "Store this phrase"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "mt-2 text-sm text-muted",
					children: "Twelve words restore the workspace. This is not a wallet seed. It will not be shown again."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 grid grid-cols-2 gap-2",
					children: (recovery ?? []).map((word, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex min-h-11 items-center gap-2 rounded-md border border-line bg-bg px-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-faint",
							children: index + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: word })]
					}, word))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void copy(),
						children: copied ? "Copied" : "Copy phrase"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "line",
						onClick: ack,
						children: "I've stored it"
					})]
				})
			]
		})] })
	});
}
function ConsolePage() {
	const [pane, setPane] = (0, import_react.useState)("voice");
	const callsign = useVela((state) => state.callsign);
	const active = useVela((state) => state.active);
	const planId = useVela((state) => state.planId);
	const invoiceId = useVela((state) => state.invoiceId);
	const asset = useVela((state) => state.asset);
	const reset = useVela((state) => state.resetWorkspace);
	const plan = planById(effectivePlanId(planId, active));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
		className: "py-10 md:py-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoveryDialog, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-faint",
						children: "Workspace"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-4xl leading-tight sm:text-5xl",
						children: callsign || "Unsigned preview"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2 text-xs uppercase tracking-widest",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex min-h-11 items-center rounded-full border border-line px-4",
						children: plan.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex min-h-11 items-center rounded-full border border-volt px-4 text-volt",
						children: active ? "Settled" : "Sandbox"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-sm text-muted",
				children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Invoice ",
					invoiceId,
					" settled in sandbox via ",
					asset.toUpperCase(),
					". The phrase dialog is the only secret we keep."
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Previewing Lattice so you can place a call, bring a tunnel up, and open a desk.",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pricing",
						className: "text-volt",
						children: "Settle an invoice"
					}),
					" ",
					"to pin a plan."
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-3 gap-1 rounded-md bg-surface p-1",
				role: "tablist",
				"aria-label": "Workspace",
				children: [
					["voice", "Voice"],
					["tunnel", "Tunnel"],
					["desk", "Desk"]
				].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": pane === id,
					onClick: () => setPane(id),
					className: cn("min-h-11 rounded-md text-sm", pane === id ? "bg-bg text-fg" : "text-muted"),
					children: label
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				role: "tabpanel",
				children: [
					pane === "voice" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoicePanel, {}) : null,
					pane === "tunnel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TunnelPanel, {}) : null,
					pane === "desk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskPanel, {}) : null
				]
			}),
			active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: reset,
				className: "mt-8 min-h-11 text-sm text-faint hover:text-fg",
				children: "End this sandbox workspace"
			}) : null
		]
	});
}
//#endregion
export { ConsolePage as component };
