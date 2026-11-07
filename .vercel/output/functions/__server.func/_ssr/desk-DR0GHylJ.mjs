import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as Wrap } from "./router-BmJTrF6H.mjs";
import { t as DeskPanel } from "./desk-panel-4rSlkc5p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-DR0GHylJ.js
var import_jsx_runtime = require_jsx_runtime();
function DeskPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-line",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Wrap, {
			className: "py-14 md:py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-volt",
					children: "Desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-3xl text-4xl leading-tight sm:text-5xl",
					children: "A Windows machine with no account manager attached."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-2xl text-lg text-muted",
					children: "Connect to a desk sized for the plan. The session in this preview is local — notes and the terminal never leave the browser. On cancel, a real volume would be wiped."
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrap, {
		className: "py-10 md:py-14",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeskPanel, {})
	})] });
}
//#endregion
export { DeskPage as component };
