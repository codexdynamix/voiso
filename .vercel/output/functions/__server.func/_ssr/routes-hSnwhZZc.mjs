import { a as AccordionTrigger, i as AccordionItem, n as AccordionContent, r as AccordionHeader, t as Accordion, v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as ChevronDown } from "../_libs/lucide-react.mjs";
import { M as cn, f as PLANS, j as buttonVariants, l as FAQ, m as REGIONS, r as Wrap, s as COMPARE } from "./router-BmJTrF6H.mjs";
import { t as SeatMath } from "./seat-math-DI5YIN5F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-hSnwhZZc.js
var import_jsx_runtime = require_jsx_runtime();
var PRODUCTS = [
	{
		index: "01",
		title: "Voice",
		href: "/voice",
		copy: "Inbound, outbound, SMS, and a dialer that is not locked behind a sales call. Present a DID you hold. Pay for the workspace, not a tax on every agent.",
		points: [
			"Softphone in the browser",
			"IVR and queues on Lattice",
			"Numbers in eight cities"
		]
	},
	{
		index: "02",
		title: "Tunnel",
		href: "/tunnel",
		copy: "WireGuard first, OpenVPN and IKEv2 when a network is difficult. Twelve regions. A kill switch that actually holds traffic. No email address on the account.",
		points: [
			"Kill switch on by default",
			"Sandbox profiles you can download",
			"Dedicated exit on Foundry"
		]
	},
	{
		index: "03",
		title: "Desk",
		href: "/desk",
		copy: "A Windows workstation on a locked gateway. Notes and a terminal in the session. The volume is wiped when you cancel — it is not a vendor archive.",
		points: [
			"2 to 8 vCPU",
			"Clipboard stays local",
			"Wiped on cancel"
		]
	}
];
function Home() {
	const best = REGIONS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
				className: "grid items-start gap-10 py-10 lg:grid-cols-2 lg:gap-12 lg:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-volt",
							children: "No-KYC communications"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-4 text-4xl leading-tight sm:text-5xl lg:text-6xl",
							children: [
								"The contact center that never asks ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "italic text-volt",
									children: "who you are"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-lg text-muted",
							children: "Carrier voice, a WireGuard tunnel, and a Windows desk. One crypto invoice. No passport. No per-agent contract."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pricing",
								className: buttonVariants({ size: "lg" }),
								children: "Get a line"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/console",
								className: buttonVariants({
									variant: "line",
									size: "lg"
								}),
								children: "Open the console"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-faint",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Callsign instead of documents" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "USDT, BTC, ETH, XMR" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Live after confirmation" })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rack, {})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, {
				className: "grid grid-cols-2 md:grid-cols-4",
				children: [
					["12", "Regions on the tunnel"],
					[`${best.ms} ms`, `Best hop · ${best.city}`],
					["0", "Documents to open an account"],
					["6", "Assets accepted at checkout"]
				].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-line py-8 md:border-l md:px-6 md:first:border-l-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-4xl tabular-nums",
						children: value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: label
					})]
				}, label))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
				className: "py-16 md:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-volt",
					children: "Three products, one invoice"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 divide-y divide-line border-y border-line",
					children: PRODUCTS.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "grid gap-6 py-10 md:grid-cols-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-faint",
								children: product.index
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 font-display text-4xl font-medium",
								children: product.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "md:col-span-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-xl text-lg text-muted",
									children: product.copy
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-5 grid gap-2 sm:grid-cols-3",
									children: product.points.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "text-sm text-fg",
										children: point
									}, point))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: product.href,
									className: "mt-6 inline-flex min-h-11 items-center text-sm text-volt",
									children: ["Explore ", product.title.toLowerCase()]
								})
							]
						})]
					}, product.href))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, {
				className: "py-16 md:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeatMath, {})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
				className: "py-16 md:py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-volt",
						children: "Compared"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 max-w-2xl font-display text-4xl font-medium",
						children: "What a sales-gated contact center still makes you do."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 overflow-hidden rounded-lg border border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden grid-cols-3 gap-4 border-b border-line px-4 py-3 text-xs uppercase tracking-widest text-faint md:grid",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " " }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Typical suite" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vela" })
							]
						}), COMPARE.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 border-b border-line px-4 py-4 last:border-b-0 md:grid-cols-3 md:gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-faint",
									children: row[0]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: row[1]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-fg",
									children: row[2]
								})
							]
						}, row[0]))]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, {
				className: "grid gap-10 py-16 md:grid-cols-3 md:py-24",
				children: [
					[
						"01",
						"Pick a callsign",
						"Three to sixteen letters. No legal name, no inbox, no selfie."
					],
					[
						"02",
						"Post a crypto invoice",
						"USDT, USDC, BTC, ETH, XMR, or LTC. The quote is the exact credit."
					],
					[
						"03",
						"Work starts",
						"Seats, the tunnel, and the desk wake together. Cancel and the desk is wiped."
					]
				].map(([index, title, copy]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-volt",
						children: index
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-3xl font-medium",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted",
						children: copy
					})
				] }, index))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
				className: "py-16 md:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-volt",
						children: "Pricing"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl font-medium",
						children: "One number for the whole floor."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/pricing",
						className: buttonVariants({ variant: "line" }),
						children: "Compare plans"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 md:grid-cols-3",
					children: PLANS.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/checkout",
						search: {
							plan: plan.id,
							term: "month"
						},
						className: cn("rounded-lg border p-5", plan.featured ? "border-volt bg-raised" : "border-line hover:border-muted"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: plan.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-display text-4xl tabular-nums",
								children: [plan.price, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 font-sans text-sm text-muted",
									children: "USDT"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted",
								children: plan.blurb
							})
						]
					}, plan.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b border-line",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
				className: "py-16 md:py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-4xl font-medium",
					children: "Questions, answered flat."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					className: "mt-8 border-t border-line",
					children: FAQ.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: item.q,
						className: "border-b border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionTrigger, {
							className: "group flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-base",
							children: [item.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" })]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "max-w-3xl pb-4 text-sm text-muted",
							children: item.a
						})]
					}, item.q))
				})]
			})
		})
	] });
}
function Rack() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-line bg-raised p-4 md:p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-xs uppercase tracking-widest text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rack · fra-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 text-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vela-live size-1.5 rounded-full bg-volt" }), "Live"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-line",
				children: [
					[
						"Voice",
						"Lattice · 8 seats warm",
						"18 ms"
					],
					[
						"Tunnel",
						"Frankfurt · kill switch on",
						"Up"
					],
					[
						"Desk",
						"dx-04 · 4 vCPU",
						"Idle"
					]
				].map(([name, detail, state]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm text-fg",
							children: name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm text-muted",
							children: detail
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-sm tabular-nums text-volt",
						children: state
					})]
				}, name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-2 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center",
				children: [
					["Jitter", "18 ms"],
					["Loss", "0.0%"],
					["Docs", "None"]
				].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs uppercase tracking-widest text-faint",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1 font-display text-2xl tabular-nums",
					children: value
				})] }, label))
			})
		]
	});
}
//#endregion
export { Home as component };
