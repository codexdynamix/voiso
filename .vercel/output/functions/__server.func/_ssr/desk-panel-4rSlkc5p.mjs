import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Button, D as tunnelAddress, M as cn, S as planById, a as useVela, b as machineById, d as MACHINES, i as useHydrated, v as effectivePlanId, w as regionById, x as planAllows } from "./router-BmJTrF6H.mjs";
import { t as formatClock } from "./format-C2pV7IaQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-panel-4rSlkc5p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILES = [
	{
		name: "Calls.csv",
		body: "peer,seconds,result\n+1 212 555 0174,18,human\n+1 415 555 0138,0,machine\n+44 20 7946 0123,0,no-answer\n"
	},
	{
		name: "Routes.conf",
		body: "gateway = locked\nclipboard = local\nwipe = on-cancel\n"
	},
	{
		name: "Scratch.txt",
		body: "Notes stay in this browser until you disconnect.\n"
	}
];
function DeskPanel() {
	const machineId = useVela((state) => state.machineId);
	const deskOpen = useVela((state) => state.deskOpen);
	const planId = useVela((state) => state.planId);
	const active = useVela((state) => state.active);
	const callsign = useVela((state) => state.callsign);
	const vpnOn = useVela((state) => state.vpnOn);
	const regionId = useVela((state) => state.regionId);
	const setMachine = useVela((state) => state.setMachine);
	const setDeskOpen = useVela((state) => state.setDeskOpen);
	const plan = planById(effectivePlanId(planId, active));
	const machine = machineById(machineId);
	if (!deskOpen) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 md:grid-cols-2",
		children: MACHINES.map((item) => {
			const allowed = planAllows(plan.id, item.min);
			const selected = item.id === machineId;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: cn("flex flex-col rounded-lg border p-5", selected ? "border-volt bg-raised" : "border-line bg-bg"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-widest text-faint",
						children: item.os
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl font-medium",
						children: item.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: item.note
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-3 gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-faint",
								children: "CPU"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: item.cpu })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-faint",
								children: "RAM"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: item.ram })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-faint",
								children: "Disk"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: item.disk })] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: allowed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								setMachine(item.id);
								setDeskOpen(true);
							},
							children: "Connect"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/pricing",
							className: "inline-flex min-h-11 items-center text-sm text-volt",
							children: "Included with Foundry"
						})
					})
				]
			}, item.id);
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Desktop, {
		name: machine.name,
		spec: `${machine.cpu} · ${machine.ram}`,
		callsign: callsign || "guest",
		address: vpnOn ? tunnelAddress(regionId) : "direct",
		region: regionById(regionId).city,
		planName: plan.name,
		onClose: () => setDeskOpen(false)
	});
}
function Desktop({ name, spec, callsign, address, region, planName, onClose }) {
	const hydrated = useHydrated();
	const [clock, setClock] = (0, import_react.useState)("--:--");
	const [file, setFile] = (0, import_react.useState)(FILES[2].name);
	const [notes, setNotes] = (0, import_react.useState)(FILES[2].body);
	const [lines, setLines] = (0, import_react.useState)([{
		kind: "out",
		text: `${name} ready. Type help.`
	}]);
	const [command, setCommand] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		const tick = () => setClock(formatClock(/* @__PURE__ */ new Date()));
		tick();
		const id = window.setInterval(tick, 1e3);
		return () => window.clearInterval(id);
	}, [hydrated]);
	function openFile(next) {
		const found = FILES.find((item) => item.name === next);
		setFile(next);
		if (found) setNotes(found.body);
	}
	function run(event) {
		event.preventDefault();
		const raw = command.trim();
		if (!raw) return;
		const verb = raw.toLowerCase();
		let output = `command not found: ${raw}`;
		if (verb === "help") output = "whoami · ip · status · clear";
		if (verb === "whoami") output = callsign;
		if (verb === "ip") output = address === "direct" ? `direct · tunnel down · exit via ${region}` : `${address} via ${region}`;
		if (verb === "status") output = `${name} · ${planName} · ${spec}`;
		if (verb === "clear") {
			setLines([]);
			setCommand("");
			return;
		}
		setLines((current) => [
			...current,
			{
				kind: "in",
				text: raw
			},
			{
				kind: "out",
				text: output
			}
		].slice(-12));
		setCommand("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-lg border border-line bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 border-b border-line px-4 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [name, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted",
					children: [" · ", spec]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums text-muted",
					children: clock
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "desk-wallpaper grid gap-3 p-3 md:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: FILES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => openFile(item.name),
						className: cn("min-h-11 rounded-md border px-3 text-sm", file === item.name ? "border-volt bg-raised text-fg" : "border-line bg-raised text-muted"),
						children: item.name
					}, item.name))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 lg:grid-cols-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-56 flex-col rounded-md border border-line bg-raised lg:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "border-b border-line px-3 py-2 text-xs text-muted",
							children: file
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: notes,
							onChange: (event) => setNotes(event.target.value),
							className: "min-h-48 flex-1 resize-none bg-transparent p-3 text-sm text-fg outline-none",
							"aria-label": "Desk notes"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-56 flex-col rounded-md border border-line bg-ink lg:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "border-b border-line px-3 py-2 text-xs text-muted",
								children: "Terminal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 space-y-1 overflow-auto p-3 font-sans text-sm",
								children: lines.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: line.kind === "in" ? "text-volt" : "text-fg",
									children: line.kind === "in" ? `› ${line.text}` : line.text
								}, `${line.text}-${index}`))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: run,
								className: "flex border-t border-line",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "sr-only",
										htmlFor: "desk-cmd",
										children: "Command"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "desk-cmd",
										value: command,
										onChange: (event) => setCommand(event.target.value),
										placeholder: "whoami",
										className: "h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-fg outline-none"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "min-h-11 px-4 text-sm text-volt",
										children: "Run"
									})
								]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Gateway locked. Clipboard stays in this browser."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "line",
					onClick: onClose,
					children: "Disconnect"
				})]
			})
		]
	});
}
//#endregion
export { DeskPanel as t };
