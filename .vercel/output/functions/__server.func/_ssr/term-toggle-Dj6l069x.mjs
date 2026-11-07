import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { M as cn } from "./router-BmJTrF6H.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/term-toggle-Dj6l069x.js
var import_jsx_runtime = require_jsx_runtime();
function TermToggle({ term, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "inline-flex rounded-full border border-line p-1",
		role: "group",
		"aria-label": "Billing term",
		children: [["month", "30 days"], ["year", "Year · 15% off"]].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-pressed": term === value,
			onClick: () => onChange(value),
			className: cn("min-h-11 rounded-full px-4 text-sm", term === value ? "bg-volt text-ink" : "text-muted hover:text-fg"),
			children: label
		}, value))
	});
}
//#endregion
export { TermToggle as t };
