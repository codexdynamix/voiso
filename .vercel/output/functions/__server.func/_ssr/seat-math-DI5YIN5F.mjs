import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { O as velaForSeats, y as legacyMonthly } from "./router-BmJTrF6H.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seat-math-DI5YIN5F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SeatMath() {
	const [seats, setSeats] = (0, import_react.useState)(8);
	const legacy = legacyMonthly(seats);
	const quote = velaForSeats(seats);
	const keep = Math.max(0, legacy - quote.monthly);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-raised p-5 md:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-volt",
					children: "Seat math"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl font-medium text-fg md:text-4xl",
					children: "Stop renting agents one at a time."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-4xl tabular-nums text-fg",
					children: [seats, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 font-sans text-sm text-muted",
						children: "seats"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider, {
				className: "relative mt-8 flex h-11 w-full touch-none items-center",
				min: 1,
				max: 40,
				step: 1,
				value: [seats],
				onValueChange: ([value]) => setSeats(value ?? 1),
				"aria-label": "Team size",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
					className: "relative h-1 grow rounded-full bg-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full rounded-full bg-volt" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, {
					className: "block size-5 rounded-full border-2 border-ink bg-volt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-volt",
					"aria-label": "Seats"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
						label: "Typical per-agent suite",
						value: legacy,
						hint: "About $52 per agent, before usage",
						muted: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
						label: `Vela ${quote.plan.name}`,
						value: quote.monthly,
						hint: quote.extra > 0 ? `${quote.extra} seats above Foundry at 6 USDT` : quote.plan.blurb
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Figure, {
						label: "You keep",
						value: keep,
						hint: "Every month, before minute overage",
						accent: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-faint",
				children: "Illustrative monthly totals in USDT. Overage after the included pool is 0.012 USDT a minute. Inbound to your DIDs stays included."
			})
		]
	});
}
function Figure({ label, value, hint, muted, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-line bg-bg p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-faint",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: accent ? "mt-2 font-display text-4xl tabular-nums text-volt" : muted ? "mt-2 font-display text-4xl tabular-nums text-muted" : "mt-2 font-display text-4xl tabular-nums text-fg",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: hint
			})
		]
	});
}
//#endregion
export { SeatMath as t };
