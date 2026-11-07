import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Pause, i as PhoneOff, o as Mic, r as Phone, s as MicOff } from "../_libs/lucide-react.mjs";
import { A as Button, M as cn, S as planById, a as useVela, k as visibleDids, u as LEADS, v as effectivePlanId, x as planAllows } from "./router-BmJTrF6H.mjs";
import { n as formatDuration } from "./format-C2pV7IaQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/voice-panel-DTk97P0t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEYS = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"*",
	"0",
	"#"
];
var HEIGHTS = [
	"h-2",
	"h-5",
	"h-3",
	"h-6",
	"h-4",
	"h-7",
	"h-3",
	"h-5",
	"h-2",
	"h-6",
	"h-4",
	"h-7"
];
function VoicePanel() {
	const store = useVela();
	const plan = planById(effectivePlanId(store.planId, store.active));
	const numbers = visibleDids(store.ownedDids, plan.dids);
	const [digits, setDigits] = (0, import_react.useState)("");
	const [now, setNow] = (0, import_react.useState)(0);
	const [mode, setMode] = (0, import_react.useState)("pad");
	const [smsTo, setSmsTo] = (0, import_react.useState)("");
	const [smsBody, setSmsBody] = (0, import_react.useState)("");
	const dialerAllowed = planAllows(plan.id, "lattice");
	const numberKey = numbers.join("|");
	(0, import_react.useEffect)(() => {
		const list = numberKey.split("|");
		const current = useVela.getState().did;
		if (!list.includes(current) && list[0]) useVela.getState().setDid(list[0]);
	}, [numberKey]);
	(0, import_react.useEffect)(() => {
		if (store.callStatus !== "live") return;
		setNow(Date.now());
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, [store.callStatus]);
	const elapsed = store.callStarted && now ? Math.max(0, Math.floor((now - store.callStarted) / 1e3)) : 0;
	const busy = store.callStatus !== "idle";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 rounded-lg border border-line bg-raised p-4 md:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-faint",
							children: "Presenting"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mt-2 block text-sm text-muted",
							htmlFor: "did",
							children: "Caller ID"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							id: "did",
							value: numbers.includes(store.did) ? store.did : numbers[0],
							onChange: (event) => store.setDid(event.target.value),
							className: "mt-1 h-11 w-full max-w-xs rounded-md border border-line bg-bg px-3 text-sm text-fg",
							children: numbers.map((number) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: number,
								children: number
							}, number))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							plan.name,
							" · ",
							plan.minutes.toLocaleString(),
							" min pool"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-md border border-line bg-bg p-4",
					"aria-live": "polite",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-faint",
								children: store.callStatus === "idle" ? "Idle" : store.callStatus === "dialing" ? store.callDirection === "in" ? "Incoming" : "Calling" : store.held ? "On hold" : "Live"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "tabular-nums text-sm text-muted",
								children: busy && store.callStatus === "live" ? formatDuration(elapsed) : "00:00"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 truncate font-display text-3xl text-fg",
							children: busy ? store.callPeer : "No active call"
						}),
						store.callStatus === "live" && !store.held ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "vela-wave mt-4 flex h-8 items-end gap-1",
							"aria-hidden": "true",
							children: HEIGHTS.map((height, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("w-1 rounded-full bg-volt", height) }, index))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-faint",
							children: "Audio stays in this browser. Nothing is recorded here."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "line",
									disabled: store.callStatus !== "live",
									onClick: store.toggleMute,
									"aria-pressed": store.muted,
									children: [store.muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-4" }), store.muted ? "Unmute" : "Mute"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "line",
									disabled: store.callStatus !== "live",
									onClick: store.toggleHold,
									"aria-pressed": store.held,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }), store.held ? "Resume" : "Hold"]
								}),
								store.callStatus === "dialing" && store.callDirection === "in" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: store.answer,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), "Answer"]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: busy ? "primary" : "line",
									disabled: !busy,
									onClick: store.hangup,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneOff, { className: "size-4" }), "End"]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-6 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-faint",
						children: "Recent"
					}), store.recents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "No calls yet. Dial a test number, or ring this line."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 divide-y divide-line",
						children: store.recents.map((call) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm",
									children: call.peer
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-faint",
									children: call.direction === "out" ? "Outbound" : "Inbound"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-sm text-muted",
								children: formatDuration(call.seconds)
							})]
						}, call.id))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "min-w-0",
						onSubmit: (event) => {
							event.preventDefault();
							store.sendSms(smsTo, smsBody);
							setSmsBody("");
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-faint",
								children: "SMS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: smsTo,
								onChange: (event) => setSmsTo(event.target.value),
								placeholder: "To",
								"aria-label": "SMS recipient",
								className: "mt-3 h-11 w-full rounded-md border border-line bg-bg px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: smsBody,
								onChange: (event) => setSmsBody(event.target.value.slice(0, 160)),
								placeholder: "Message",
								"aria-label": "SMS body",
								className: "mt-2 h-11 w-full rounded-md border border-line bg-bg px-3 text-sm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums text-xs text-faint",
									children: [smsBody.length, "/160"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									variant: "line",
									disabled: !smsTo.trim() || !smsBody.trim(),
									children: "Send"
								})]
							}),
							store.messages.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-3 space-y-2",
								children: store.messages.slice(0, 3).map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "text-sm text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-fg",
											children: message.to
										}),
										" — ",
										message.body
									]
								}, message.id))
							}) : null
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-line bg-bg p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-1 rounded-md bg-surface p-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("min-h-11 rounded-md text-sm", mode === "pad" ? "bg-bg text-fg" : "text-muted"),
					onClick: () => setMode("pad"),
					children: "Keypad"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("min-h-11 rounded-md text-sm", mode === "dialer" ? "bg-bg text-fg" : "text-muted"),
					onClick: () => setMode("dialer"),
					children: "Dialer"
				})]
			}), mode === "pad" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "tel",
						"aria-label": "Number to call",
						value: digits,
						placeholder: "Number",
						onChange: (event) => setDigits(event.target.value.replace(/[^\d+*#\s]/g, "").slice(0, 18)),
						className: "h-14 w-full bg-transparent text-center font-display text-3xl tabular-nums text-fg outline-none placeholder:text-faint"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-3 gap-2",
						children: KEYS.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "min-h-12 rounded-md border border-line bg-raised text-lg text-fg hover:border-muted",
							onClick: () => setDigits((value) => (value + key).slice(0, 18)),
							children: key
						}, key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "line",
							onClick: () => setDigits((value) => value.slice(0, -1)),
							disabled: !digits,
							children: "Delete"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => store.startCall(digits),
							disabled: !digits.trim() || busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), "Call"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "mt-2 w-full",
						onClick: store.ring,
						disabled: busy,
						children: "Simulate an inbound ring"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialer, { allowed: dialerAllowed })]
		})]
	});
}
function Dialer({ allowed }) {
	const [running, setRunning] = (0, import_react.useState)(false);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [result, setResult] = (0, import_react.useState)("Ready");
	const lead = LEADS[index] ?? LEADS[0];
	(0, import_react.useEffect)(() => {
		if (!running) return;
		setResult("Ringing");
		const ring = window.setTimeout(() => {
			const outcomes = [
				"Human · 18s",
				"Machine · skipped",
				"No answer"
			];
			setResult(outcomes[index % outcomes.length] ?? "No answer");
		}, 700);
		const next = window.setTimeout(() => {
			setIndex((value) => (value + 1) % LEADS.length);
		}, 1700);
		return () => {
			window.clearTimeout(ring);
			window.clearTimeout(next);
		};
	}, [running, index]);
	if (!allowed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Predictive dialer starts on Lattice. Relay stays on the keypad."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/pricing",
			className: "mt-4 inline-flex min-h-11 items-center text-sm text-volt",
			children: "See Lattice"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-faint",
				children: "Sample list · five fictional leads"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-2xl",
				children: lead.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 tabular-nums text-sm text-muted",
				children: lead.number
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-volt",
				children: result
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4 w-full",
				variant: running ? "line" : "primary",
				onClick: () => setRunning((value) => !value),
				children: running ? "Stop list" : "Start list"
			})
		]
	});
}
//#endregion
export { VoicePanel as t };
