import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as Wrap } from "./router-BmJTrF6H.mjs";
import { t as TunnelPanel } from "./tunnel-panel-DWDvDe5k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tunnel-BsXxY8hx.js
var import_jsx_runtime = require_jsx_runtime();
function TunnelPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
			className: "py-14 md:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-volt",
					children: "Tunnel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl",
					children: "A private exit that never asks for an inbox."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-5 max-w-2xl text-lg text-muted",
					children: [
						"Pick a region, a protocol, and whether traffic may exist without the tunnel. Profiles from this preview are samples — the host is ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-fg",
							children: "vela.invalid"
						}),
						", which does not resolve."
					]
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, {
		className: "py-10 md:py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TunnelPanel, {})
	})] });
}
//#endregion
export { TunnelPage as component };
