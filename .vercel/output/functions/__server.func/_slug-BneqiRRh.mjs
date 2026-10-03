import { i as __toESM } from "./_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./_ssr/router-CpjuVblT.mjs";
import { b as worldMaterials, c as galaxyRelationships, o as findWorld, u as isWordmark, x as worldSystems } from "./_ssr/catalog-CY0O0eXc.mjs";
import { a as readWorldSignal, r as getAtmosphereProfile, t as CelestialBody } from "./_ssr/atmosphere-GMgINYAa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BneqiRRh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RelatedWorld({ world }) {
	const className = isWordmark(world.name) ? "wordmark" : void 0;
	if (world.url === "/travel") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/travel",
		className,
		children: world.name
	});
	if (world.url === "/music") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/music",
		className,
		children: world.name
	});
	if (world.url === "/you") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/you",
		className,
		children: world.name
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/worlds/$slug",
		params: { slug: world.id },
		className,
		children: world.name
	});
}
function WorldView({ slug }) {
	const world = findWorld(slug);
	const material = world ? worldMaterials[world.id] : void 0;
	const systems = world ? worldSystems[world.id] ?? [] : [];
	const [active, setActive] = (0, import_react.useState)(null);
	const [signal, setSignal] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setSignal(readWorldSignal());
		const refresh = () => setSignal(readWorldSignal());
		window.addEventListener("fourtee2:world-signal", refresh);
		return () => window.removeEventListener("fourtee2:world-signal", refresh);
	}, []);
	const atmosphere = (0, import_react.useMemo)(() => signal ? getAtmosphereProfile(signal.vibe, signal.isDay) : getAtmosphereProfile("night", false), [signal]);
	if (!world || !material) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "missing",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "eyebrow",
			children: "WORLD SIGNAL NOT FOUND"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			search: { galaxy: 1 },
			className: "enter",
			children: "RETURN TO GALAXY"
		})]
	});
	const links = galaxyRelationships.filter((link) => link.source === world.id || link.target === world.id);
	const style = {
		"--accent": world.color,
		"--signal-sky": atmosphere.sky,
		"--signal-glow": atmosphere.glow
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "world",
		style,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "site-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						search: { galaxy: 1 },
						className: "wordmark",
						children: "fourtee2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "header-note",
						children: [
							world.type.toUpperCase(),
							" / ",
							world.name
						]
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
				className: "world-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "world-orb",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CelestialBody, { world })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow",
						children: [
							world.type.toUpperCase(),
							" / ",
							world.status,
							" / ",
							world.category
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: isWordmark(world.name) ? "wordmark" : void 0,
						children: world.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { children: material.observation }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: material.fieldNote }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: signal ? `${signal.location} / ${signal.vibe.toUpperCase()}` : "ORIGIN / NIGHT ORBIT"
					}),
					world.url !== `/worlds/${world.id}` && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: world.url === "/travel" ? "/travel" : world.url === "/music" ? "/music" : "/you",
						className: "enter",
						children: "OPEN LIVE FIELD"
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "systems",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "section-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "SYSTEMS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [systems.length, " MODULES"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "system-grid",
						children: systems.map((system, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: active === system.id ? "is-active" : "",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "eyebrow",
									children: String(index + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: system.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: system.description }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setActive(active === system.id ? null : system.id),
									"aria-expanded": active === system.id,
									children: system.actionLabel
								}),
								active === system.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "system-detail",
									children: system.detail
								})
							]
						}, system.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "nodes",
						children: world.children.map((child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: child }, child))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relations",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "RELATIONSHIPS"
				}), links.length ? links.map((link) => {
					const otherId = link.source === world.id ? link.target : link.source;
					const other = findWorld(otherId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [other ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RelatedWorld, { world: other }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: otherId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: link.relationshipType })] }, `${link.source}-${link.target}`);
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NO EXTERNAL PATHS LOCKED" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "site-footer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "END OF WORLD VIEW" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					search: { galaxy: 1 },
					className: "wordmark",
					children: "fourtee2"
				})]
			})
		]
	});
}
function WorldPage() {
	const { slug } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorldView, { slug });
}
//#endregion
export { WorldPage as component };
