import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as removeSignal, t as readSignals } from "./board-BRC6LtvZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/board-CZ_eYCAl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BoardView() {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [signals, setSignals] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const sync = () => setSignals(readSignals());
		sync();
		setReady(true);
		window.addEventListener("fourtee2:signals", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("fourtee2:signals", sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	const routes = signals.filter((item) => item.signalType === "destination");
	const music = signals.filter((item) => item.signalType === "playlist");
	const rituals = signals.filter((item) => item.signalType === "ritual");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "board",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "site-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						search: { galaxy: void 0 },
						className: "wordmark",
						children: "fourtee2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "header-note",
						children: "SIGNAL BOARD / THIS DEVICE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						search: { galaxy: 1 },
						className: "text-link",
						children: "GALAXY"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "board-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "MY COORDINATES"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
						"Keep what",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"changes the field."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Routes, transmissions and rituals you save stay on this device. Nothing is sent anywhere else." })
				]
			}),
			!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "empty",
				children: "CALIBRATING SIGNAL BOARD"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "board-groups",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
						title: "01 / SAVED ROUTES",
						href: "/travel",
						action: "FIND A TRIP",
						items: routes,
						empty: "NO SAVED ROUTES YET. LOCK A FIELD NOTE OR A ROUTE, THEN SAVE IT."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
						title: "02 / SAVED MUSIC",
						href: "/music",
						action: "PLAY MUSIC",
						items: music,
						empty: "NO SAVED MUSIC YET. OPEN THE LISTENING FIELD AND KEEP THE PLAYLIST."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
						title: "03 / SAVED RITUALS",
						href: "/you",
						action: "OPEN PROTOCOL",
						items: rituals,
						empty: "NO SAVED RITUALS YET. START THE 20-MINUTE PROTOCOL AND HOLD IT HERE."
					})
				]
			})
		]
	});
}
function Group({ title, href, action, items, empty }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "board-group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: href,
				children: action
			})]
		}), items.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: item.href === "/travel" ? "/travel" : item.href === "/music" ? "/music" : item.href === "/you" ? "/you" : "/board",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.subtitle })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => removeSignal(item),
			children: "RELEASE"
		})] }, `${item.signalType}-${item.sourceId}`)) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "empty",
			children: empty
		})]
	});
}
var SplitComponent = BoardView;
//#endregion
export { SplitComponent as component };
