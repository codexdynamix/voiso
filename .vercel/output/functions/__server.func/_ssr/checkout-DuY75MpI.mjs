import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Button, E as termPrice, M as cn, S as planById, T as suggestCallsign, _ as cryptoAmount, a as useVela, f as PLANS, g as cleanCallsign, h as assetById, n as Route$5, o as ASSETS, r as Wrap } from "./router-BmJTrF6H.mjs";
import { t as TermToggle } from "./term-toggle-Dj6l069x.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-DuY75MpI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const search = Route$5.useSearch();
	const navigate = useNavigate();
	const settle = useVela((state) => state.settle);
	const active = useVela((state) => state.active);
	const [planId, setPlanId] = (0, import_react.useState)(search.plan);
	const [term, setTerm] = (0, import_react.useState)(search.term);
	const [assetId, setAssetId] = (0, import_react.useState)("usdt");
	const [name, setName] = (0, import_react.useState)("");
	const [suggestion, setSuggestion] = (0, import_react.useState)("north-lark");
	const [step, setStep] = (0, import_react.useState)("draft");
	const [phase, setPhase] = (0, import_react.useState)(0);
	const [watching, setWatching] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const finished = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		setPlanId(search.plan);
		setTerm(search.term);
	}, [search.plan, search.term]);
	const plan = planById(planId);
	const usd = termPrice(plan.price, term);
	const asset = assetById(assetId);
	const amount = cryptoAmount(usd, assetId);
	const cleaned = name.trim() ? cleanCallsign(name) : suggestion;
	const invalid = name.trim().length > 0 && !cleanCallsign(name);
	(0, import_react.useEffect)(() => {
		if (!watching) return;
		const timers = [
			window.setTimeout(() => setPhase(1), 500),
			window.setTimeout(() => setPhase(2), 1100),
			window.setTimeout(() => setPhase(3), 1700),
			window.setTimeout(() => finish(), 2200)
		];
		return () => timers.forEach((id) => window.clearTimeout(id));
	}, [watching]);
	function finish() {
		if (finished.current || !cleaned) return;
		finished.current = true;
		const invoiceId = `VL-${Date.now().toString(36).toUpperCase()}`;
		settle({
			planId,
			term,
			asset: assetId,
			callsign: cleaned,
			invoiceId
		});
		navigate({ to: "/console" });
	}
	async function copyAddress() {
		try {
			await navigator.clipboard.writeText(asset.address);
			setCopied(true);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
		className: "py-12 md:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-volt",
				children: "Checkout"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-4xl leading-tight sm:text-5xl",
				children: "Pay the workspace. Skip the paperwork."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-muted",
				children: active ? "Settling again replaces the current sandbox plan." : "A callsign is the only field. No legal name, no card, no inbox."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "min-w-0 rounded-lg border border-line bg-raised p-5 md:p-6",
					children: step === "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "text-sm text-muted",
							children: "Plan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid gap-2 sm:grid-cols-3",
							children: PLANS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								"aria-pressed": planId === item.id,
								onClick: () => setPlanId(item.id),
								className: cn("min-h-16 rounded-md border px-3 py-3 text-left", planId === item.id ? "border-volt" : "border-line"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 block tabular-nums text-xs text-muted",
									children: [item.price, " USDT"]
								})]
							}, item.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TermToggle, {
								term,
								onChange: setTerm
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Asset"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3",
									children: ASSETS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										"aria-pressed": assetId === item.id,
										onClick: () => setAssetId(item.id),
										className: cn("min-h-14 rounded-md border px-3 py-2 text-left", assetId === item.id ? "border-volt bg-bg" : "border-line"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-sm",
											children: item.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-xs text-faint",
											children: item.network
										})]
									}, item.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-faint",
									children: "Preview quotes, not a live market."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "callsign",
									className: "text-sm text-muted",
									children: "Callsign"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "callsign",
									value: name,
									autoComplete: "off",
									placeholder: suggestion,
									onChange: (event) => setName(event.target.value),
									className: "mt-2 h-11 w-full rounded-md border border-line bg-bg px-3 text-sm"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "min-h-11 text-sm text-volt",
										onClick: () => setName(suggestion),
										children: ["Use ", suggestion]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "min-h-11 text-sm text-muted",
										onClick: () => setSuggestion(suggestCallsign()),
										children: "Shuffle"
									})]
								}),
								invalid ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-volt",
									children: "Use 3–16 letters or digits, starting with a letter."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-faint",
									children: "This is the account. We do not ask who it belongs to."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6",
							size: "lg",
							disabled: invalid,
							onClick: () => setStep("invoice"),
							children: "Create invoice"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-volt",
							children: "Sandbox — do not send funds"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-2 font-display text-3xl font-medium",
							children: [
								amount,
								" ",
								asset.label
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								usd,
								" USDT credit · ",
								asset.network,
								" · ",
								cleaned,
								" · ",
								plan.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap items-start gap-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceQr, { value: `vela-sandbox:${asset.label}:${amount}:${asset.address}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-widest text-faint",
										children: "Address"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm break-all text-fg",
										children: asset.address
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "line",
										className: "mt-3",
										onClick: () => void copyAddress(),
										children: copied ? "Copied" : "Copy address"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-sm text-muted",
										children: "These addresses are not wallets. Nothing is monitoring them. The button below only pretends the chain confirmed."
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-6 space-y-1",
							children: [
								"Invoice posted",
								"Broadcast observed",
								"Confirmation",
								"Workspace unlocked"
							].map((label, index) => {
								const done = index <= phase;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex min-h-11 items-center gap-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2.5 rounded-full", done ? "bg-volt" : "bg-line") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: done ? "text-fg" : "text-faint",
										children: label
									})]
								}, label);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								disabled: watching,
								onClick: () => setWatching(true),
								children: watching ? "Watching sandbox" : "Settle in sandbox"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "line",
								size: "lg",
								disabled: watching,
								onClick: () => {
									setStep("draft");
									setPhase(0);
								},
								children: "Edit order"
							})]
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-lg border border-line p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-faint",
							children: "Order"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-3xl",
							children: plan.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Term"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: term === "year" ? "Year" : "30 days" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Credit"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "tabular-nums",
										children: [usd, " USDT"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Due"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "tabular-nums",
										children: [
											amount,
											" ",
											asset.label
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Seats"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: plan.seats })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: "Identity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: "None" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-xs text-faint",
							children: "Lawful use only. Fraud, spam, phishing, and breaking into machines are refused even without KYC."
						})
					]
				})]
			})
		]
	});
}
function InvoiceQr({ value }) {
	const [src, setSrc] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let alive = true;
		import("../_libs/qrcode.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())).then((mod) => {
			const qr = typeof mod.toDataURL === "function" ? mod : mod.default;
			if (!qr?.toDataURL) return null;
			return qr.toDataURL(value, {
				margin: 1,
				width: 320,
				color: {
					dark: "#12130e",
					light: "#f3f1e7"
				}
			});
		}).then((url) => {
			if (alive && url) setSrc(url);
		}).catch(() => {
			if (alive) setSrc(null);
		});
		return () => {
			alive = false;
		};
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-56 w-56 shrink-0 items-center justify-center overflow-hidden rounded-md bg-fg",
		children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: "Sandbox invoice code",
			className: "h-56 w-56"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "px-4 text-center text-sm text-ink",
			children: "Preparing code"
		})
	});
}
//#endregion
export { CheckoutPage as component };
