import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { A as Button, S as planById, a as useVela, c as DIDS, r as Wrap } from "./router-BmJTrF6H.mjs";
import { t as VoicePanel } from "./voice-panel-DTk97P0t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/voice-BqNPQ0ui.js
var import_jsx_runtime = require_jsx_runtime();
function VoicePage() {
	const owned = useVela((state) => state.ownedDids);
	const active = useVela((state) => state.active);
	const planId = useVela((state) => state.planId);
	const attachDid = useVela((state) => state.attachDid);
	const plan = planById(active ? planId ?? "lattice" : "lattice");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
			className: "py-14 md:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-volt",
					children: "Voice"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl",
					children: "A softphone that does not bill you per pair of ears."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl text-lg text-muted",
					children: "Outbound, inbound, SMS, and — on Lattice — a list dialer. You present a number you hold. The workspace price already includes the seats."
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
		className: "py-10 md:py-14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoicePanel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-medium",
					children: "Number inventory"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted",
					children: [
						plan.name,
						" includes ",
						plan.dids,
						". Extra DIDs attach in this sandbox without a charge. A live invoice would add the monthly amount in the same asset."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 divide-y divide-line border-y border-line",
					children: DIDS.map((did, index) => {
						const included = index < plan.dids;
						const held = owned.includes(did.id) || included;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular-nums text-sm",
								children: did.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-faint",
								children: [
									did.city,
									" · ",
									did.country
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted",
									children: included ? "Included" : `${did.monthly} USDT`
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "line",
									disabled: held,
									onClick: () => attachDid(did.id),
									children: held ? "On the line" : "Attach"
								})]
							})]
						}, did.id);
					})
				})
			]
		})]
	})] });
}
//#endregion
export { VoicePage as component };
