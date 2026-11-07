import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Check } from "../_libs/lucide-react.mjs";
import { E as termPrice, M as cn, f as PLANS, j as buttonVariants, r as Wrap } from "./router-BmJTrF6H.mjs";
import { t as TermToggle } from "./term-toggle-Dj6l069x.mjs";
import { t as SeatMath } from "./seat-math-DI5YIN5F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-Bjyu81Kd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PriceCard({ plan, term }) {
	const amount = termPrice(plan.price, term);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("flex h-full flex-col rounded-lg border p-6", plan.featured ? "border-volt bg-raised" : "border-line bg-bg"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-volt",
				children: plan.featured ? "Most teams" : "Workspace"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-3xl font-medium",
				children: plan.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 min-h-12 text-sm text-muted",
				children: plan.blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 font-display text-5xl tabular-nums text-fg",
				children: [amount, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 font-sans text-sm text-muted",
					children: term === "year" ? "USDT / year" : "USDT / 30 days"
				})]
			}),
			term === "year" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-faint",
				children: [plan.price, " USDT if you pay every 30 days"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-faint",
				children: [termPrice(plan.price, "year"), " USDT if you pay the year"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 space-y-3 text-sm",
				children: plan.features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "mt-0.5 size-4 shrink-0 text-volt",
						strokeWidth: 1.75
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: feature })]
				}, feature))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/checkout",
				search: {
					plan: plan.id,
					term
				},
				className: cn(buttonVariants({
					variant: plan.featured ? "primary" : "line",
					size: "lg"
				}), "mt-8 w-full"),
				children: ["Continue with ", plan.name]
			})
		]
	});
}
function PricingPage() {
	const [term, setTerm] = (0, import_react.useState)("month");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
			className: "py-14 md:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-volt",
					children: "Pricing"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl",
					children: "A workspace price. Not a seat hostage."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl text-lg text-muted",
					children: "Pay in USDT, USDC, BTC, ETH, XMR, or LTC. Thirty days has no lock. The year is 15% less and unused months return to the same asset."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TermToggle, {
						term,
						onChange: setTerm
					})
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
		className: "py-12 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid items-stretch gap-4 lg:grid-cols-3",
				children: PLANS.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceCard, {
					plan,
					term
				}, plan.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-faint",
				children: "Past 25 seats, Foundry adds 6 USDT per seat each 30 days. Outbound over the minute pool is 0.012 USDT. Inbound to your DIDs is included."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeatMath, {})
			})
		]
	})] });
}
//#endregion
export { PricingPage as component };
