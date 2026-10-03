import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$5 } from "./router-CpjuVblT.mjs";
import { a as fieldTitle, b as worldMaterials, c as galaxyRelationships, d as parentWorld, h as searchWorlds, i as fieldOrder, l as galaxyWorlds, n as currentMissions, o as findWorld, u as isWordmark, v as worldField, y as worldLabel } from "./catalog-CY0O0eXc.mjs";
import { a as readWorldSignal, i as identifyVibe, n as describeVibe, o as saveWorldSignal, r as getAtmosphereProfile, t as CelestialBody } from "./atmosphere-GMgINYAa.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-H32Z-9oU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var stars = Array.from({ length: 90 }, (_, index) => {
	const rand = () => {
		const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
		return value - Math.floor(value);
	};
	const a = rand();
	const b = Math.abs(Math.sin(index * 4.17));
	return {
		left: `${(a * 100).toFixed(2)}%`,
		top: `${(b * 100).toFixed(2)}%`,
		opacity: a > .66 ? .06 : .25 + index % 7 * .1,
		size: index % 11 === 0 ? 2.5 : 1.2,
		delay: `${-(index % 9 * .7).toFixed(2)}s`
	};
});
var tourSteps = [
	{
		title: "ARRIVAL",
		content: "You have entered fourtee2 haus. The house is at the top. Three fields sit beneath it."
	},
	{
		title: "THE HOUSE",
		content: "fourtee2 haus sits at the top. To the left is a star and its cluster. Ahead are the family planets. To the right, the void."
	},
	{
		title: "THREE KINDS",
		content: "Client work is part of the cluster. The fourtee2 family are planets. fleshsesh, the academy, the meat app and sinorgy are new worlds in the void."
	},
	{
		title: "CONSTELLATIONS",
		content: "Groups lifts the names of the three fields: the cluster, the family, and the void."
	}
];
function driftFor(id, t) {
	let seed = 0;
	for (let index = 0; index < id.length; index += 1) seed += id.charCodeAt(index);
	const amp = id === "haus" ? .28 : 1.05 + seed % 4 * .32;
	const speed = .065 + seed % 6 * .014;
	const phase = seed * .65;
	return {
		x: Math.cos(t * speed + phase) * amp,
		y: Math.sin(t * speed * .72 + phase * 1.2) * amp * .8
	};
}
function curve(a, b) {
	const dx = b.x - a.x;
	const dy = b.y - a.y;
	const cx = (a.x + b.x) / 2 - dy * .1;
	const cy = (a.y + b.y) / 2 + dx * .1;
	return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}
function openWorld(navigate, world) {
	if (world.url === "/travel") navigate({ to: "/travel" });
	else if (world.url === "/music") navigate({ to: "/music" });
	else if (world.url === "/you") navigate({ to: "/you" });
	else navigate({
		to: "/worlds/$slug",
		params: { slug: world.id }
	});
}
function GalaxyExplorer({ navIntent, onIntentHandled, onPanel }) {
	const navigate = useNavigate();
	const [view, setView] = (0, import_react.useState)({
		x: 0,
		y: 0,
		zoom: 1
	});
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [hoveredId, setHoveredId] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [listOpen, setListOpen] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [aboutOpen, setAboutOpen] = (0, import_react.useState)(false);
	const [constellations, setConstellations] = (0, import_react.useState)(false);
	const [contrast, setContrast] = (0, import_react.useState)(false);
	const [departing, setDeparting] = (0, import_react.useState)(null);
	const [tourStep, setTourStep] = (0, import_react.useState)(null);
	const [worldSignal, setWorldSignal] = (0, import_react.useState)(null);
	const [motion, setMotion] = (0, import_react.useState)(0);
	const mapRef = (0, import_react.useRef)(null);
	const pointers = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const drag = (0, import_react.useRef)(null);
	const pinch = (0, import_react.useRef)(null);
	const searchRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setWorldSignal(readWorldSignal());
		if (!localStorage.getItem("fourtee2-tour-seen")) {
			const timer = window.setTimeout(() => setTourStep(0), 900);
			return () => window.clearTimeout(timer);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const refresh = () => setWorldSignal(readWorldSignal());
		window.addEventListener("fourtee2:world-signal", refresh);
		return () => window.removeEventListener("fourtee2:world-signal", refresh);
	}, []);
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		let frame = 0;
		let last = 0;
		const started = performance.now();
		const tick = (now) => {
			if (now - last > 32) {
				last = now;
				setMotion((now - started) / 1e3);
			}
			frame = window.requestAnimationFrame(tick);
		};
		frame = window.requestAnimationFrame(tick);
		return () => window.cancelAnimationFrame(frame);
	}, []);
	(0, import_react.useEffect)(() => {
		const node = mapRef.current;
		if (!node) return;
		const onWheel = (event) => {
			event.preventDefault();
			const delta = event.deltaY > 0 ? -.08 : .08;
			setView((current) => ({
				...current,
				zoom: clampZoom(current.zoom + delta)
			}));
		};
		node.addEventListener("wheel", onWheel, { passive: false });
		return () => node.removeEventListener("wheel", onWheel);
	}, []);
	function recenter() {
		setView({
			x: 0,
			y: 0,
			zoom: 1
		});
		setSelectedId(null);
		setDeparting(null);
	}
	(0, import_react.useEffect)(() => {
		if (!navIntent) return;
		if (navIntent === "map") {
			setListOpen(false);
			setSearchOpen(false);
			setAboutOpen(false);
			recenter();
		}
		if (navIntent === "worlds") {
			setSearchOpen(false);
			setAboutOpen(false);
			setListOpen(true);
		}
		if (navIntent === "search") {
			setListOpen(false);
			setAboutOpen(false);
			setQuery("");
			setSearchOpen(true);
		}
		if (navIntent === "about") {
			setListOpen(false);
			setSearchOpen(false);
			setAboutOpen(true);
		}
		onIntentHandled();
	}, [navIntent, onIntentHandled]);
	(0, import_react.useEffect)(() => {
		onPanel?.(listOpen ? "worlds" : searchOpen ? "search" : aboutOpen ? "about" : "map");
	}, [
		aboutOpen,
		listOpen,
		onPanel,
		searchOpen
	]);
	(0, import_react.useEffect)(() => {
		if (searchOpen) window.setTimeout(() => searchRef.current?.focus(), 40);
	}, [searchOpen]);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			if (event.key !== "Escape") return;
			if (searchOpen) setSearchOpen(false);
			else if (listOpen) setListOpen(false);
			else if (aboutOpen) setAboutOpen(false);
			else if (selectedId) setSelectedId(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		aboutOpen,
		listOpen,
		searchOpen,
		selectedId
	]);
	const matches = (0, import_react.useMemo)(() => searchWorlds(query), [query]);
	const matchIds = (0, import_react.useMemo)(() => new Set(matches.map((world) => world.id)), [matches]);
	const selected = selectedId ? findWorld(selectedId) : void 0;
	const atmosphere = worldSignal ? getAtmosphereProfile(worldSignal.vibe, worldSignal.isDay) : getAtmosphereProfile("night", false);
	const style = {
		"--signal-sky": atmosphere.sky,
		"--signal-glow": atmosphere.glow,
		"--signal-horizon": atmosphere.horizon,
		"--signal-stars": String(atmosphere.starOpacity)
	};
	function selectWorld(world) {
		if (drag.current?.moved) return;
		setDeparting(null);
		setSelectedId(world.id);
	}
	function enterWorld(world) {
		setDeparting(world.id);
		setView((current) => ({
			...current,
			zoom: 1.55
		}));
		window.setTimeout(() => openWorld(navigate, world), 420);
	}
	function onPointerDown(event) {
		if (event.target.closest("button, a, input")) {
			if (event.target.closest(".planet")) return;
		}
		event.currentTarget.setPointerCapture(event.pointerId);
		pointers.current.set(event.pointerId, {
			x: event.clientX,
			y: event.clientY
		});
		if (pointers.current.size === 1) drag.current = {
			x: event.clientX,
			y: event.clientY,
			originX: view.x,
			originY: view.y,
			moved: false
		};
		if (pointers.current.size === 2) {
			const [a, b] = [...pointers.current.values()];
			pinch.current = {
				distance: Math.hypot(a.x - b.x, a.y - b.y),
				zoom: view.zoom
			};
			drag.current = null;
		}
	}
	function onPointerMove(event) {
		if (!pointers.current.has(event.pointerId)) return;
		pointers.current.set(event.pointerId, {
			x: event.clientX,
			y: event.clientY
		});
		if (pointers.current.size === 2 && pinch.current) {
			const [a, b] = [...pointers.current.values()];
			const distance = Math.hypot(a.x - b.x, a.y - b.y);
			const next = clampZoom(pinch.current.zoom * (distance / pinch.current.distance));
			setView((current) => ({
				...current,
				zoom: next
			}));
			return;
		}
		if (!drag.current) return;
		const dx = event.clientX - drag.current.x;
		const dy = event.clientY - drag.current.y;
		if (Math.hypot(dx, dy) > 6) drag.current.moved = true;
		const originX = drag.current.originX;
		const originY = drag.current.originY;
		setView((current) => ({
			...current,
			x: originX + dx * .7,
			y: originY + dy * .7
		}));
	}
	function onPointerEnd(event) {
		pointers.current.delete(event.pointerId);
		if (pointers.current.size < 2) pinch.current = null;
		if (pointers.current.size === 0) window.setTimeout(() => {
			drag.current = null;
		}, 0);
	}
	function completeTour() {
		setTourStep(null);
		localStorage.setItem("fourtee2-tour-seen", "true");
	}
	const hotIds = (0, import_react.useMemo)(() => {
		if (!hoveredId) return null;
		const ids = /* @__PURE__ */ new Set([hoveredId]);
		for (const link of galaxyRelationships) {
			if (link.source === hoveredId) ids.add(link.target);
			if (link.target === hoveredId) ids.add(link.source);
		}
		return ids;
	}, [hoveredId]);
	const searching = searchOpen && query.trim().length > 0;
	const points = (0, import_react.useMemo)(() => {
		const next = /* @__PURE__ */ new Map();
		for (const world of galaxyWorlds) {
			const drift = driftFor(world.id, motion);
			next.set(world.id, {
				x: world.x + drift.x,
				y: world.y + drift.y
			});
		}
		return next;
	}, [motion]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "galaxy",
		className: `galaxy${searching ? " is-searching" : ""}${contrast ? " is-contrast" : ""}${departing ? " is-departing" : ""}${constellations ? " show-groups" : ""}`,
		style,
		"aria-label": "fourtee2 galaxy map",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "galaxy-topline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GALAXY // 001" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"ONE HOUSE / ",
					galaxyWorlds.length,
					" WORLDS / ",
					galaxyRelationships.length,
					" LINKS"
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "galaxy-map",
				ref: mapRef,
				onPointerDown,
				onPointerMove,
				onPointerUp: onPointerEnd,
				onPointerCancel: onPointerEnd,
				onWheel: (event) => event.preventDefault(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "galaxy-field",
					style: { transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.zoom})` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "starfield",
							"aria-hidden": "true",
							children: stars.map((star, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
								className: "star",
								style: {
									left: star.left,
									top: star.top,
									opacity: star.opacity,
									width: star.size,
									height: star.size,
									animationDelay: star.delay
								}
							}, index))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "region region--cluster",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "THE CLUSTER" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "region region--void",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "THE VOID" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "region region--family",
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "THE FAMILY" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							className: "links",
							viewBox: "0 0 100 100",
							preserveAspectRatio: "none",
							"aria-hidden": "true",
							children: galaxyRelationships.map((link) => {
								const source = points.get(link.source) ?? findWorld(link.source);
								const target = points.get(link.target) ?? findWorld(link.target);
								if (!source || !target) return null;
								const active = selectedId === link.source || selectedId === link.target;
								const sourceWorld = findWorld(link.source);
								const targetWorld = findWorld(link.target);
								const kind = sourceWorld?.type === "star" || targetWorld?.type === "star" ? " is-cluster" : sourceWorld?.type === "world" || targetWorld?.type === "world" ? " is-void" : "";
								const hot = hotIds?.has(link.source) && hotIds.has(link.target);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									className: `${active || hot ? "is-active" : ""}${kind}`,
									d: curve(source, target)
								}, `${link.source}-${link.target}`);
							})
						}),
						galaxyWorlds.map((world) => {
							const dimmed = searching && !matchIds.has(world.id);
							const quiet = Boolean(hotIds && !hotIds.has(world.id));
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `planet planet--${world.type}${selectedId === world.id ? " is-selected" : ""}${dimmed ? " is-dimmed" : ""}${quiet ? " is-quiet" : ""}`,
								style: {
									left: `${points.get(world.id)?.x ?? world.x}%`,
									top: `${points.get(world.id)?.y ?? world.y}%`,
									"--accent": world.color,
									"--scale": String(world.scale)
								},
								onClick: () => selectWorld(world),
								onDoubleClick: () => enterWorld(world),
								onPointerEnter: () => setHoveredId(world.id),
								onPointerLeave: (event) => {
									setHoveredId(null);
									event.currentTarget.style.removeProperty("--tilt-x");
									event.currentTarget.style.removeProperty("--tilt-y");
								},
								onPointerMove: (event) => {
									const rect = event.currentTarget.getBoundingClientRect();
									const x = (event.clientX - rect.left) / rect.width - .5;
									const y = (event.clientY - rect.top) / rect.height - .5;
									event.currentTarget.style.setProperty("--tilt-y", `${(x * 16).toFixed(1)}deg`);
									event.currentTarget.style.setProperty("--tilt-x", `${(-y * 12).toFixed(1)}deg`);
								},
								"aria-pressed": selectedId === world.id,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CelestialBody, { world }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "planet-label",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
										className: isWordmark(worldLabel(world)) ? "wordmark" : void 0,
										children: worldLabel(world)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: fieldTitle[worldField(world.id)] })]
								})]
							}, world.id);
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "galaxy-controls",
				"aria-label": "Galaxy controls",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setView((current) => ({
							...current,
							zoom: clampZoom(current.zoom + .12)
						})),
						"aria-label": "Zoom in",
						children: "+"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setView((current) => ({
							...current,
							zoom: clampZoom(current.zoom - .12)
						})),
						"aria-label": "Zoom out",
						children: "−"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: recenter,
						children: "CENTER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: constellations ? "is-on" : "",
						onClick: () => setConstellations((value) => !value),
						children: "GROUPS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: contrast ? "is-on" : "",
						onClick: () => setContrast((value) => !value),
						children: "CONTRAST"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "galaxy-help",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DRAG · PINCH · SCROLL · DOUBLE-CLICK TO OPEN" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"ZOOM ",
						Math.round(view.zoom * 100),
						"%"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: worldSignal ? `${worldSignal.location} / ${worldSignal.vibe.toUpperCase()}` : "ORIGIN SIGNAL / NIGHT ORBIT" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "missions",
				"aria-label": "Current missions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "CURRENTLY IN ORBIT" }), currentMissions.map((mission) => {
					const world = findWorld(mission.worldId);
					if (!world) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => selectWorld(world),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { background: world.color } }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: isWordmark(world.name) ? "wordmark" : void 0,
								children: world.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: mission.detail })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: mission.status })
						]
					}, mission.worldId);
				})]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "inspector",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inspector-close",
						onClick: () => setSelectedId(null),
						"aria-label": "Close world preview",
						children: "CLOSE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow",
						children: [
							fieldTitle[worldField(selected.id)],
							" / ",
							selected.type.toUpperCase(),
							" / ",
							selected.status
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: isWordmark(selected.name) ? "wordmark" : void 0,
						children: selected.name
					}),
					parentWorld(selected.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow",
						children: ["UNDER ", parentWorld(selected.id)?.name]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "chip",
						style: { "--accent": selected.color },
						children: selected.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.description }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { children: worldMaterials[selected.id]?.observation }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "enter",
						onClick: () => enterWorld(selected),
						disabled: Boolean(departing),
						children: [
							departing ? "APPROACHING" : "OPEN WORLD",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "→" })
						]
					})
				]
			}),
			searchOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overlay",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Search the universe",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "overlay-close",
						onClick: () => setSearchOpen(false),
						children: "CLOSE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "SEARCH THE UNIVERSE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: searchRef,
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "world, product, idea",
						"aria-label": "Search worlds"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: query.trim() ? `${matches.length} SIGNALS` : "TYPE TO SEARCH" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overlay-list",
						children: [
							!query.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "empty",
								children: "SEARCH A WORLD, A FIELD, OR A NAME."
							}) : null,
							query.trim() && matches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "empty",
								children: "NO SIGNAL MATCHES THAT NAME."
							}) : null,
							query.trim() ? matches.map((world) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setSelectedId(world.id);
									setSearchOpen(false);
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { background: world.color } }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: isWordmark(world.name) ? "wordmark" : void 0,
										children: world.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
										fieldTitle[worldField(world.id)],
										" / ",
										world.type.toUpperCase()
									] })
								]
							}, world.id)) : null
						]
					})
				]
			}),
			listOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overlay",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "All worlds",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "overlay-close",
						onClick: () => setListOpen(false),
						children: "CLOSE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "ALL WORLDS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overlay-list",
						children: fieldOrder.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: fieldTitle[field] }), galaxyWorlds.filter((world) => worldField(world.id) === field).map((world) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setSelectedId(world.id);
								setListOpen(false);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { background: world.color } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: isWordmark(world.name) ? "wordmark" : void 0,
									children: world.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: world.type.toUpperCase() })
							]
						}, world.id))] }, field))
					})
				]
			}),
			aboutOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overlay overlay-about",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "About fourtee2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "overlay-close",
						onClick: () => setAboutOpen(false),
						children: "CLOSE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "ABOUT / TRANSMISSION"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
						"ONE HOUSE.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"THREE FIELDS."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { children: "cdxi is a star, and the client work is part of that cluster. The fourtee2 family are planets. fleshsesh and what sits with it are new worlds, out in the void." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "about-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "CREATE" }), "We build new things."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "CONNECT" }), "Worlds influence one another."] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "EXPLORE" }), "Ideas are followed wherever they lead."] })
						]
					})
				]
			}),
			tourStep !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "tour",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "tour-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "eyebrow",
							children: [
								"SIGNAL ",
								tourStep + 1,
								" / ",
								tourSteps.length
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: tourSteps[tourStep].title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: tourSteps[tourStep].content }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "tour-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: completeTour,
								children: "SKIP"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "enter",
								onClick: () => tourStep < tourSteps.length - 1 ? setTourStep(tourStep + 1) : completeTour(),
								children: [
									tourStep < tourSteps.length - 1 ? "NEXT" : "BEGIN",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "→" })
								]
							})]
						})
					]
				})
			})
		]
	});
}
function clampZoom(value) {
	return Math.min(1.75, Math.max(.64, Number(value.toFixed(2))));
}
var stars_default = /*#__PURE__*/ JSON.parse("[{\"ra\":2.1,\"dec\":29.09,\"mag\":2.07},{\"ra\":2.29,\"dec\":59.15,\"mag\":2.28},{\"ra\":2.35,\"dec\":-45.75,\"mag\":3.88},{\"ra\":3.31,\"dec\":15.18,\"mag\":2.83},{\"ra\":4.86,\"dec\":-8.82,\"mag\":3.56},{\"ra\":6.44,\"dec\":-77.25,\"mag\":2.82},{\"ra\":6.55,\"dec\":-43.68,\"mag\":3.93},{\"ra\":6.57,\"dec\":-42.31,\"mag\":2.4},{\"ra\":9.24,\"dec\":53.9,\"mag\":3.69},{\"ra\":9.83,\"dec\":30.86,\"mag\":3.27},{\"ra\":10.13,\"dec\":56.54,\"mag\":2.24},{\"ra\":10.9,\"dec\":-17.99,\"mag\":2.04},{\"ra\":12.28,\"dec\":57.82,\"mag\":3.46},{\"ra\":14.18,\"dec\":60.72,\"mag\":2.15},{\"ra\":14.19,\"dec\":38.5,\"mag\":3.86},{\"ra\":16.52,\"dec\":-46.72,\"mag\":3.32},{\"ra\":17.1,\"dec\":-55.25,\"mag\":3.94},{\"ra\":17.15,\"dec\":-10.18,\"mag\":3.46},{\"ra\":17.43,\"dec\":35.62,\"mag\":2.07},{\"ra\":21.01,\"dec\":-8.18,\"mag\":3.6},{\"ra\":21.45,\"dec\":60.24,\"mag\":2.66},{\"ra\":22.09,\"dec\":-43.32,\"mag\":3.41},{\"ra\":22.81,\"dec\":-49.07,\"mag\":3.93},{\"ra\":22.87,\"dec\":15.35,\"mag\":3.62},{\"ra\":24.43,\"dec\":-57.24,\"mag\":0.45},{\"ra\":24.5,\"dec\":48.63,\"mag\":3.59},{\"ra\":26.02,\"dec\":-15.94,\"mag\":3.49},{\"ra\":27.87,\"dec\":-10.34,\"mag\":3.74},{\"ra\":28.27,\"dec\":29.58,\"mag\":3.42},{\"ra\":28.38,\"dec\":19.29,\"mag\":3.88},{\"ra\":28.6,\"dec\":63.67,\"mag\":3.35},{\"ra\":28.66,\"dec\":20.81,\"mag\":2.64},{\"ra\":28.99,\"dec\":-51.61,\"mag\":3.69},{\"ra\":29.69,\"dec\":-61.57,\"mag\":2.86},{\"ra\":30,\"dec\":-21.08,\"mag\":3.99},{\"ra\":30.51,\"dec\":2.76,\"mag\":3.82},{\"ra\":30.86,\"dec\":72.42,\"mag\":3.95},{\"ra\":30.97,\"dec\":42.33,\"mag\":2.1},{\"ra\":31.79,\"dec\":23.46,\"mag\":2.01},{\"ra\":32.39,\"dec\":34.99,\"mag\":3},{\"ra\":34.13,\"dec\":-51.51,\"mag\":3.56},{\"ra\":37.95,\"dec\":89.26,\"mag\":1.97},{\"ra\":40.83,\"dec\":3.24,\"mag\":3.47},{\"ra\":42.5,\"dec\":27.26,\"mag\":3.61},{\"ra\":42.67,\"dec\":55.9,\"mag\":3.77},{\"ra\":43.56,\"dec\":52.76,\"mag\":3.93},{\"ra\":44.11,\"dec\":-8.9,\"mag\":3.89},{\"ra\":44.57,\"dec\":-40.3,\"mag\":2.88},{\"ra\":45.57,\"dec\":4.09,\"mag\":2.54},{\"ra\":46.2,\"dec\":53.51,\"mag\":2.91},{\"ra\":46.29,\"dec\":38.84,\"mag\":3.32},{\"ra\":47.04,\"dec\":40.96,\"mag\":2.09},{\"ra\":47.37,\"dec\":44.86,\"mag\":3.79},{\"ra\":48.02,\"dec\":-28.99,\"mag\":3.8},{\"ra\":49.88,\"dec\":-21.76,\"mag\":3.7},{\"ra\":51.08,\"dec\":49.86,\"mag\":1.79},{\"ra\":51.2,\"dec\":9.03,\"mag\":3.61},{\"ra\":51.79,\"dec\":9.73,\"mag\":3.73},{\"ra\":53.23,\"dec\":-9.46,\"mag\":3.72},{\"ra\":55.73,\"dec\":47.79,\"mag\":3.01},{\"ra\":55.81,\"dec\":-9.76,\"mag\":3.52},{\"ra\":56.05,\"dec\":-64.81,\"mag\":3.84},{\"ra\":56.08,\"dec\":32.29,\"mag\":3.84},{\"ra\":56.22,\"dec\":24.11,\"mag\":3.72},{\"ra\":56.3,\"dec\":42.58,\"mag\":3.77},{\"ra\":56.46,\"dec\":24.37,\"mag\":3.87},{\"ra\":56.81,\"dec\":-74.24,\"mag\":3.26},{\"ra\":56.87,\"dec\":24.11,\"mag\":2.85},{\"ra\":57.29,\"dec\":24.05,\"mag\":3.62},{\"ra\":58.53,\"dec\":31.88,\"mag\":2.84},{\"ra\":59.46,\"dec\":40.01,\"mag\":2.9},{\"ra\":59.51,\"dec\":-13.51,\"mag\":2.97},{\"ra\":59.74,\"dec\":35.79,\"mag\":3.98},{\"ra\":60.17,\"dec\":12.49,\"mag\":3.41},{\"ra\":60.79,\"dec\":5.99,\"mag\":3.91},{\"ra\":62.17,\"dec\":47.71,\"mag\":3.96},{\"ra\":63.5,\"dec\":-42.29,\"mag\":3.85},{\"ra\":63.61,\"dec\":-62.47,\"mag\":3.33},{\"ra\":64.47,\"dec\":-33.8,\"mag\":3.55},{\"ra\":64.95,\"dec\":15.63,\"mag\":3.65},{\"ra\":65.73,\"dec\":17.54,\"mag\":3.77},{\"ra\":66.01,\"dec\":-34.02,\"mag\":3.97},{\"ra\":67.14,\"dec\":15.96,\"mag\":3.84},{\"ra\":67.15,\"dec\":19.18,\"mag\":3.53},{\"ra\":67.17,\"dec\":15.87,\"mag\":3.4},{\"ra\":68.5,\"dec\":-55.05,\"mag\":3.3},{\"ra\":68.89,\"dec\":-30.56,\"mag\":3.81},{\"ra\":68.98,\"dec\":16.51,\"mag\":0.87},{\"ra\":69.08,\"dec\":-3.35,\"mag\":3.93},{\"ra\":69.55,\"dec\":-14.3,\"mag\":3.86},{\"ra\":72.46,\"dec\":6.96,\"mag\":3.19},{\"ra\":72.8,\"dec\":5.61,\"mag\":3.68},{\"ra\":73.56,\"dec\":2.44,\"mag\":3.71},{\"ra\":74.25,\"dec\":33.17,\"mag\":2.69},{\"ra\":75.49,\"dec\":43.82,\"mag\":3.03},{\"ra\":75.62,\"dec\":41.08,\"mag\":3.69},{\"ra\":76.37,\"dec\":-22.37,\"mag\":3.19},{\"ra\":76.63,\"dec\":41.23,\"mag\":3.18},{\"ra\":76.96,\"dec\":-5.09,\"mag\":2.78},{\"ra\":78.23,\"dec\":-16.21,\"mag\":3.29},{\"ra\":78.63,\"dec\":-8.2,\"mag\":0.18},{\"ra\":79.17,\"dec\":46,\"mag\":0.08},{\"ra\":79.4,\"dec\":-6.84,\"mag\":3.59},{\"ra\":81.12,\"dec\":-2.4,\"mag\":3.35},{\"ra\":81.28,\"dec\":6.35,\"mag\":1.64},{\"ra\":81.57,\"dec\":28.61,\"mag\":1.65},{\"ra\":82.06,\"dec\":-20.76,\"mag\":2.81},{\"ra\":82.8,\"dec\":-35.47,\"mag\":3.86},{\"ra\":83,\"dec\":-0.3,\"mag\":2.25},{\"ra\":83.18,\"dec\":-17.82,\"mag\":2.58},{\"ra\":83.41,\"dec\":-62.49,\"mag\":3.76},{\"ra\":83.78,\"dec\":9.93,\"mag\":3.39},{\"ra\":83.86,\"dec\":-5.91,\"mag\":2.75},{\"ra\":84.05,\"dec\":-1.2,\"mag\":1.69},{\"ra\":84.41,\"dec\":21.14,\"mag\":2.97},{\"ra\":84.69,\"dec\":-2.6,\"mag\":3.77},{\"ra\":84.91,\"dec\":-34.07,\"mag\":2.65},{\"ra\":85.19,\"dec\":-1.94,\"mag\":1.74},{\"ra\":86.12,\"dec\":-22.45,\"mag\":3.59},{\"ra\":86.74,\"dec\":-14.82,\"mag\":3.55},{\"ra\":86.82,\"dec\":-51.07,\"mag\":3.85},{\"ra\":86.94,\"dec\":-9.67,\"mag\":2.07},{\"ra\":87.74,\"dec\":-35.77,\"mag\":3.12},{\"ra\":87.83,\"dec\":-20.88,\"mag\":3.76},{\"ra\":87.87,\"dec\":39.15,\"mag\":3.97},{\"ra\":88.79,\"dec\":7.41,\"mag\":0.45},{\"ra\":89.1,\"dec\":-14.17,\"mag\":3.71},{\"ra\":89.79,\"dec\":-42.82,\"mag\":3.96},{\"ra\":89.88,\"dec\":54.28,\"mag\":3.72},{\"ra\":89.88,\"dec\":44.95,\"mag\":1.9},{\"ra\":89.93,\"dec\":37.21,\"mag\":2.65},{\"ra\":93.71,\"dec\":-6.27,\"mag\":3.99},{\"ra\":93.72,\"dec\":22.51,\"mag\":3.31},{\"ra\":95.08,\"dec\":-30.06,\"mag\":3.02},{\"ra\":95.53,\"dec\":-33.44,\"mag\":3.85},{\"ra\":95.67,\"dec\":-17.96,\"mag\":1.98},{\"ra\":95.74,\"dec\":22.51,\"mag\":2.87},{\"ra\":95.99,\"dec\":-52.7,\"mag\":-0.62},{\"ra\":97.2,\"dec\":-7.03,\"mag\":3.76},{\"ra\":99.17,\"dec\":-19.26,\"mag\":3.95},{\"ra\":99.43,\"dec\":16.4,\"mag\":1.93},{\"ra\":99.44,\"dec\":-43.2,\"mag\":3.17},{\"ra\":100.98,\"dec\":25.13,\"mag\":3.06},{\"ra\":101.29,\"dec\":-16.72,\"mag\":-1.44},{\"ra\":101.32,\"dec\":12.9,\"mag\":3.35},{\"ra\":102.05,\"dec\":-61.94,\"mag\":3.24},{\"ra\":102.46,\"dec\":-32.51,\"mag\":3.5},{\"ra\":102.48,\"dec\":-50.61,\"mag\":2.94},{\"ra\":103.2,\"dec\":33.96,\"mag\":3.6},{\"ra\":103.53,\"dec\":-24.18,\"mag\":3.89},{\"ra\":104.66,\"dec\":-28.97,\"mag\":1.5},{\"ra\":105.43,\"dec\":-27.93,\"mag\":3.49},{\"ra\":105.76,\"dec\":-23.83,\"mag\":3.02},{\"ra\":107.1,\"dec\":-26.39,\"mag\":1.83},{\"ra\":107.19,\"dec\":-70.5,\"mag\":3.78},{\"ra\":109.21,\"dec\":-67.96,\"mag\":3.97},{\"ra\":109.29,\"dec\":-37.1,\"mag\":2.71},{\"ra\":109.52,\"dec\":16.54,\"mag\":3.58},{\"ra\":110.03,\"dec\":21.98,\"mag\":3.5},{\"ra\":111.02,\"dec\":-29.3,\"mag\":2.45},{\"ra\":111.43,\"dec\":27.8,\"mag\":3.78},{\"ra\":111.79,\"dec\":8.29,\"mag\":2.89},{\"ra\":112.31,\"dec\":-43.3,\"mag\":3.25},{\"ra\":113.65,\"dec\":31.89,\"mag\":1.58},{\"ra\":114.71,\"dec\":-26.8,\"mag\":3.8},{\"ra\":114.83,\"dec\":5.22,\"mag\":0.4},{\"ra\":115.31,\"dec\":-9.55,\"mag\":3.94},{\"ra\":115.46,\"dec\":-72.61,\"mag\":3.93},{\"ra\":115.95,\"dec\":-28.95,\"mag\":3.94},{\"ra\":116.11,\"dec\":24.4,\"mag\":3.57},{\"ra\":116.31,\"dec\":-37.97,\"mag\":3.62},{\"ra\":116.33,\"dec\":28.03,\"mag\":1.16},{\"ra\":117.32,\"dec\":-24.86,\"mag\":3.34},{\"ra\":118.05,\"dec\":-40.58,\"mag\":3.71},{\"ra\":119.19,\"dec\":-52.98,\"mag\":3.46},{\"ra\":120.9,\"dec\":-40,\"mag\":2.21},{\"ra\":121.89,\"dec\":-24.3,\"mag\":2.83},{\"ra\":122.38,\"dec\":-47.34,\"mag\":1.75},{\"ra\":124.13,\"dec\":9.19,\"mag\":3.53},{\"ra\":125.63,\"dec\":-59.51,\"mag\":1.86},{\"ra\":126.42,\"dec\":-3.91,\"mag\":3.91},{\"ra\":126.43,\"dec\":-66.14,\"mag\":3.77},{\"ra\":127.57,\"dec\":60.72,\"mag\":3.35},{\"ra\":130.03,\"dec\":-35.31,\"mag\":3.97},{\"ra\":130.07,\"dec\":-52.92,\"mag\":3.6},{\"ra\":130.16,\"dec\":-46.65,\"mag\":3.77},{\"ra\":130.9,\"dec\":-33.19,\"mag\":3.68},{\"ra\":131.17,\"dec\":18.15,\"mag\":3.94},{\"ra\":131.18,\"dec\":-54.71,\"mag\":1.93},{\"ra\":131.51,\"dec\":-46.04,\"mag\":3.87},{\"ra\":131.69,\"dec\":6.42,\"mag\":3.38},{\"ra\":133.76,\"dec\":-60.64,\"mag\":3.84},{\"ra\":133.85,\"dec\":5.95,\"mag\":3.11},{\"ra\":134.8,\"dec\":48.04,\"mag\":3.12},{\"ra\":135.16,\"dec\":41.78,\"mag\":3.96},{\"ra\":135.61,\"dec\":-66.4,\"mag\":4},{\"ra\":135.91,\"dec\":47.16,\"mag\":3.57},{\"ra\":136.04,\"dec\":-47.1,\"mag\":3.75},{\"ra\":137,\"dec\":-43.43,\"mag\":2.23},{\"ra\":137.74,\"dec\":-58.97,\"mag\":3.43},{\"ra\":137.82,\"dec\":-62.32,\"mag\":3.96},{\"ra\":138.3,\"dec\":-69.72,\"mag\":1.67},{\"ra\":138.59,\"dec\":2.31,\"mag\":3.89},{\"ra\":139.27,\"dec\":-59.28,\"mag\":2.21},{\"ra\":139.71,\"dec\":36.8,\"mag\":3.82},{\"ra\":140.26,\"dec\":34.39,\"mag\":3.14},{\"ra\":140.53,\"dec\":-55.01,\"mag\":2.47},{\"ra\":141.9,\"dec\":-8.66,\"mag\":1.99},{\"ra\":142.68,\"dec\":-40.47,\"mag\":3.6},{\"ra\":142.81,\"dec\":-57.03,\"mag\":3.16},{\"ra\":142.88,\"dec\":63.06,\"mag\":3.65},{\"ra\":143.21,\"dec\":51.68,\"mag\":3.17},{\"ra\":144.96,\"dec\":-1.14,\"mag\":3.9},{\"ra\":145.29,\"dec\":9.89,\"mag\":3.52},{\"ra\":146.31,\"dec\":-62.51,\"mag\":3.69},{\"ra\":146.46,\"dec\":23.77,\"mag\":2.97},{\"ra\":146.78,\"dec\":-65.07,\"mag\":2.92},{\"ra\":147.75,\"dec\":59.04,\"mag\":3.78},{\"ra\":148.19,\"dec\":26.01,\"mag\":3.88},{\"ra\":149.22,\"dec\":-54.57,\"mag\":3.52},{\"ra\":151.83,\"dec\":16.76,\"mag\":3.48},{\"ra\":152.09,\"dec\":11.97,\"mag\":1.36},{\"ra\":152.65,\"dec\":-12.35,\"mag\":3.61},{\"ra\":153.43,\"dec\":-70.04,\"mag\":3.29},{\"ra\":153.68,\"dec\":-42.12,\"mag\":3.85},{\"ra\":154.17,\"dec\":23.42,\"mag\":3.43},{\"ra\":154.27,\"dec\":-61.33,\"mag\":3.39},{\"ra\":154.27,\"dec\":42.91,\"mag\":3.45},{\"ra\":154.99,\"dec\":19.84,\"mag\":2.01},{\"ra\":155.58,\"dec\":41.5,\"mag\":3.06},{\"ra\":156.1,\"dec\":-74.03,\"mag\":3.99},{\"ra\":156.52,\"dec\":-16.84,\"mag\":3.83},{\"ra\":156.97,\"dec\":-58.74,\"mag\":3.81},{\"ra\":158.01,\"dec\":-61.69,\"mag\":3.3},{\"ra\":158.2,\"dec\":9.31,\"mag\":3.84},{\"ra\":159.33,\"dec\":-48.23,\"mag\":3.84},{\"ra\":160.74,\"dec\":-64.39,\"mag\":2.74},{\"ra\":161.69,\"dec\":-49.42,\"mag\":2.69},{\"ra\":162.41,\"dec\":-16.19,\"mag\":3.11},{\"ra\":163.33,\"dec\":34.21,\"mag\":3.79},{\"ra\":163.37,\"dec\":-58.85,\"mag\":3.78},{\"ra\":165.46,\"dec\":56.38,\"mag\":2.34},{\"ra\":165.93,\"dec\":61.75,\"mag\":1.81},{\"ra\":167.15,\"dec\":-58.98,\"mag\":3.93},{\"ra\":167.42,\"dec\":44.5,\"mag\":3},{\"ra\":168.53,\"dec\":20.52,\"mag\":2.56},{\"ra\":168.56,\"dec\":15.43,\"mag\":3.33},{\"ra\":169.55,\"dec\":31.53,\"mag\":3.79},{\"ra\":169.62,\"dec\":33.09,\"mag\":3.49},{\"ra\":169.84,\"dec\":-14.78,\"mag\":3.56},{\"ra\":170.25,\"dec\":-54.49,\"mag\":3.9},{\"ra\":170.98,\"dec\":10.53,\"mag\":4},{\"ra\":172.85,\"dec\":69.33,\"mag\":3.82},{\"ra\":173.25,\"dec\":-31.86,\"mag\":3.54},{\"ra\":173.95,\"dec\":-63.02,\"mag\":3.11},{\"ra\":176.4,\"dec\":-66.73,\"mag\":3.63},{\"ra\":176.51,\"dec\":47.78,\"mag\":3.69},{\"ra\":177.26,\"dec\":14.57,\"mag\":2.14},{\"ra\":177.67,\"dec\":1.76,\"mag\":3.59},{\"ra\":178.46,\"dec\":53.69,\"mag\":2.41},{\"ra\":-177.91,\"dec\":-50.72,\"mag\":2.58},{\"ra\":-177.47,\"dec\":-22.62,\"mag\":3.02},{\"ra\":-177.09,\"dec\":-52.37,\"mag\":3.97},{\"ra\":-176.21,\"dec\":-58.75,\"mag\":2.79},{\"ra\":-176.14,\"dec\":57.03,\"mag\":3.32},{\"ra\":-176.05,\"dec\":-17.54,\"mag\":2.58},{\"ra\":-175.02,\"dec\":-0.67,\"mag\":3.89},{\"ra\":-174.66,\"dec\":-60.4,\"mag\":3.59},{\"ra\":-173.35,\"dec\":-63.1,\"mag\":0.77},{\"ra\":-172.99,\"dec\":-50.23,\"mag\":3.91},{\"ra\":-172.53,\"dec\":-16.52,\"mag\":2.94},{\"ra\":-172.21,\"dec\":-57.11,\"mag\":1.59},{\"ra\":-171.88,\"dec\":-72.13,\"mag\":3.84},{\"ra\":-171.63,\"dec\":69.79,\"mag\":3.85},{\"ra\":-171.4,\"dec\":-23.4,\"mag\":2.65},{\"ra\":-170.7,\"dec\":-69.14,\"mag\":2.69},{\"ra\":-170.57,\"dec\":-48.54,\"mag\":3.85},{\"ra\":-169.62,\"dec\":-48.96,\"mag\":2.2},{\"ra\":-169.58,\"dec\":-1.45,\"mag\":2.74},{\"ra\":-168.43,\"dec\":-68.11,\"mag\":3.04},{\"ra\":-168.07,\"dec\":-59.69,\"mag\":1.25},{\"ra\":-166.49,\"dec\":55.96,\"mag\":1.76},{\"ra\":-166.1,\"dec\":3.4,\"mag\":3.39},{\"ra\":-165.99,\"dec\":38.32,\"mag\":2.89},{\"ra\":-164.46,\"dec\":10.96,\"mag\":2.85},{\"ra\":-164.43,\"dec\":-71.55,\"mag\":3.61},{\"ra\":-160.27,\"dec\":-23.17,\"mag\":2.99},{\"ra\":-159.85,\"dec\":-36.71,\"mag\":2.75},{\"ra\":-159.02,\"dec\":54.93,\"mag\":2.23},{\"ra\":-158.7,\"dec\":-11.16,\"mag\":0.98},{\"ra\":-158.69,\"dec\":54.99,\"mag\":3.99},{\"ra\":-157.24,\"dec\":-39.41,\"mag\":3.9},{\"ra\":-156.33,\"dec\":-0.6,\"mag\":3.38},{\"ra\":-155.03,\"dec\":-53.47,\"mag\":2.29},{\"ra\":-153.11,\"dec\":49.31,\"mag\":1.85},{\"ra\":-152.62,\"dec\":-41.69,\"mag\":3.41},{\"ra\":-152.6,\"dec\":-42.47,\"mag\":3.47},{\"ra\":-151.33,\"dec\":18.4,\"mag\":2.68},{\"ra\":-151.12,\"dec\":-47.29,\"mag\":2.55},{\"ra\":-150.43,\"dec\":-42.1,\"mag\":3.83},{\"ra\":-150.33,\"dec\":-44.8,\"mag\":3.87},{\"ra\":-149.04,\"dec\":-60.37,\"mag\":0.61},{\"ra\":-148.9,\"dec\":64.38,\"mag\":3.67},{\"ra\":-148.41,\"dec\":-26.68,\"mag\":3.25},{\"ra\":-148.33,\"dec\":-36.37,\"mag\":2.06},{\"ra\":-146.08,\"dec\":19.18,\"mag\":-0.05},{\"ra\":-145.15,\"dec\":-46.06,\"mag\":3.55},{\"ra\":-142.04,\"dec\":30.37,\"mag\":3.57},{\"ra\":-141.98,\"dec\":38.31,\"mag\":3.04},{\"ra\":-141.12,\"dec\":-42.16,\"mag\":2.33},{\"ra\":-140.1,\"dec\":-60.84,\"mag\":1.35},{\"ra\":-140.1,\"dec\":-60.83,\"mag\":-0.01},{\"ra\":-139.71,\"dec\":13.73,\"mag\":3.78},{\"ra\":-139.52,\"dec\":-47.39,\"mag\":2.3},{\"ra\":-139.37,\"dec\":-64.98,\"mag\":3.18},{\"ra\":-139.23,\"dec\":-5.66,\"mag\":3.87},{\"ra\":-138.75,\"dec\":27.07,\"mag\":2.35},{\"ra\":-138.44,\"dec\":1.89,\"mag\":3.73},{\"ra\":-138.03,\"dec\":-79.04,\"mag\":3.83},{\"ra\":-137.32,\"dec\":74.16,\"mag\":2.07},{\"ra\":-137.28,\"dec\":-16.04,\"mag\":2.75},{\"ra\":-135.37,\"dec\":-43.13,\"mag\":2.68},{\"ra\":-135.21,\"dec\":-42.1,\"mag\":3.13},{\"ra\":-134.51,\"dec\":40.39,\"mag\":3.49},{\"ra\":-133.98,\"dec\":-25.28,\"mag\":3.25},{\"ra\":-133.72,\"dec\":-47.05,\"mag\":3.91},{\"ra\":-132.02,\"dec\":-48.74,\"mag\":3.88},{\"ra\":-131.93,\"dec\":-52.1,\"mag\":3.41},{\"ra\":-131.12,\"dec\":33.31,\"mag\":3.46},{\"ra\":-130.75,\"dec\":-9.38,\"mag\":2.61},{\"ra\":-130.27,\"dec\":-68.68,\"mag\":2.87},{\"ra\":-129.82,\"dec\":71.83,\"mag\":3},{\"ra\":-129.66,\"dec\":-40.65,\"mag\":3.22},{\"ra\":-129.55,\"dec\":-36.26,\"mag\":3.57},{\"ra\":-129.33,\"dec\":-44.69,\"mag\":3.37},{\"ra\":-128.77,\"dec\":58.97,\"mag\":3.29},{\"ra\":-128.04,\"dec\":29.11,\"mag\":3.66},{\"ra\":-126.33,\"dec\":26.71,\"mag\":2.22},{\"ra\":-126.3,\"dec\":10.54,\"mag\":3.8},{\"ra\":-126.21,\"dec\":-41.17,\"mag\":2.8},{\"ra\":-126.12,\"dec\":-14.79,\"mag\":3.91},{\"ra\":-125.74,\"dec\":-28.14,\"mag\":3.6},{\"ra\":-125.34,\"dec\":-29.78,\"mag\":3.66},{\"ra\":-124.31,\"dec\":26.3,\"mag\":3.81},{\"ra\":-123.93,\"dec\":6.43,\"mag\":2.63},{\"ra\":-123.45,\"dec\":15.42,\"mag\":3.65},{\"ra\":-122.59,\"dec\":-3.43,\"mag\":3.54},{\"ra\":-122.3,\"dec\":4.48,\"mag\":3.71},{\"ra\":-122.26,\"dec\":-33.63,\"mag\":3.97},{\"ra\":-121.21,\"dec\":-63.43,\"mag\":2.83},{\"ra\":-120.89,\"dec\":15.66,\"mag\":3.85},{\"ra\":-120.78,\"dec\":-29.21,\"mag\":3.87},{\"ra\":-120.29,\"dec\":-26.11,\"mag\":2.89},{\"ra\":-119.97,\"dec\":-38.4,\"mag\":3.42},{\"ra\":-119.92,\"dec\":-22.62,\"mag\":2.29},{\"ra\":-118.64,\"dec\":-19.81,\"mag\":2.56},{\"ra\":-118.3,\"dec\":-20.67,\"mag\":3.93},{\"ra\":-117,\"dec\":-19.46,\"mag\":4},{\"ra\":-116.41,\"dec\":-3.69,\"mag\":2.73},{\"ra\":-116.14,\"dec\":-63.69,\"mag\":3.86},{\"ra\":-115.42,\"dec\":-4.69,\"mag\":3.23},{\"ra\":-115.06,\"dec\":46.31,\"mag\":3.91},{\"ra\":-114.7,\"dec\":-25.59,\"mag\":2.9},{\"ra\":-114.52,\"dec\":19.15,\"mag\":3.74},{\"ra\":-114,\"dec\":61.51,\"mag\":2.73},{\"ra\":-112.65,\"dec\":-26.43,\"mag\":1.06},{\"ra\":-112.44,\"dec\":21.49,\"mag\":2.78},{\"ra\":-112.27,\"dec\":1.98,\"mag\":3.82},{\"ra\":-111.64,\"dec\":-78.9,\"mag\":3.86},{\"ra\":-111.03,\"dec\":-28.22,\"mag\":2.82},{\"ra\":-110.71,\"dec\":-10.57,\"mag\":2.54},{\"ra\":-109.68,\"dec\":31.6,\"mag\":2.81},{\"ra\":-109.28,\"dec\":38.92,\"mag\":3.48},{\"ra\":-107.83,\"dec\":-69.03,\"mag\":1.91},{\"ra\":-107.55,\"dec\":-59.04,\"mag\":3.77},{\"ra\":-107.46,\"dec\":-34.29,\"mag\":2.29},{\"ra\":-107.03,\"dec\":-38.05,\"mag\":3},{\"ra\":-106.92,\"dec\":-38.02,\"mag\":3.56},{\"ra\":-106.35,\"dec\":-42.36,\"mag\":3.62},{\"ra\":-105.58,\"dec\":9.38,\"mag\":3.19},{\"ra\":-105.34,\"dec\":-55.99,\"mag\":3.12},{\"ra\":-104.93,\"dec\":30.93,\"mag\":3.92},{\"ra\":-102.8,\"dec\":65.71,\"mag\":3.17},{\"ra\":-102.41,\"dec\":-15.72,\"mag\":2.43},{\"ra\":-101.96,\"dec\":-43.24,\"mag\":3.32},{\"ra\":-101.34,\"dec\":14.39,\"mag\":2.78},{\"ra\":-101.24,\"dec\":24.84,\"mag\":3.12},{\"ra\":-101.24,\"dec\":36.81,\"mag\":3.16},{\"ra\":-99.5,\"dec\":-25,\"mag\":3.27},{\"ra\":-98.67,\"dec\":-55.53,\"mag\":2.84},{\"ra\":-98.65,\"dec\":-56.38,\"mag\":3.31},{\"ra\":-97.39,\"dec\":52.3,\"mag\":2.79},{\"ra\":-97.31,\"dec\":-37.3,\"mag\":2.7},{\"ra\":-97.23,\"dec\":-60.68,\"mag\":3.6},{\"ra\":-97.04,\"dec\":-49.88,\"mag\":2.84},{\"ra\":-96.6,\"dec\":-37.1,\"mag\":1.62},{\"ra\":-96.27,\"dec\":12.56,\"mag\":2.08},{\"ra\":-95.67,\"dec\":-43,\"mag\":1.86},{\"ra\":-95.6,\"dec\":-15.4,\"mag\":3.54},{\"ra\":-95.13,\"dec\":46.01,\"mag\":3.82},{\"ra\":-94.38,\"dec\":-39.03,\"mag\":2.39},{\"ra\":-94.13,\"dec\":4.57,\"mag\":2.76},{\"ra\":-93.57,\"dec\":-64.72,\"mag\":3.61},{\"ra\":-93.39,\"dec\":27.72,\"mag\":3.42},{\"ra\":-93.1,\"dec\":-40.13,\"mag\":2.99},{\"ra\":-93.03,\"dec\":2.71,\"mag\":3.75},{\"ra\":-92.54,\"dec\":-37.04,\"mag\":3.19},{\"ra\":-91.62,\"dec\":56.87,\"mag\":3.73},{\"ra\":-90.94,\"dec\":37.25,\"mag\":3.86},{\"ra\":-90.85,\"dec\":51.49,\"mag\":2.24},{\"ra\":-90.56,\"dec\":29.25,\"mag\":3.7},{\"ra\":-90.24,\"dec\":-9.77,\"mag\":3.32},{\"ra\":-89.84,\"dec\":2.93,\"mag\":3.93},{\"ra\":-88.55,\"dec\":-30.42,\"mag\":2.98},{\"ra\":-88.34,\"dec\":-50.09,\"mag\":3.65},{\"ra\":-88.16,\"dec\":9.56,\"mag\":3.71},{\"ra\":-88.11,\"dec\":28.76,\"mag\":3.84},{\"ra\":-86.56,\"dec\":-21.06,\"mag\":3.84},{\"ra\":-85.59,\"dec\":-36.76,\"mag\":3.1},{\"ra\":-84.75,\"dec\":-29.83,\"mag\":2.72},{\"ra\":-84.74,\"dec\":72.73,\"mag\":3.55},{\"ra\":-84.67,\"dec\":-2.9,\"mag\":3.23},{\"ra\":-84.08,\"dec\":21.77,\"mag\":3.85},{\"ra\":-83.96,\"dec\":-34.38,\"mag\":1.79},{\"ra\":-83.26,\"dec\":-45.97,\"mag\":3.49},{\"ra\":-83.01,\"dec\":-25.42,\"mag\":2.82},{\"ra\":-81.2,\"dec\":-8.24,\"mag\":3.85},{\"ra\":-80.77,\"dec\":38.78,\"mag\":0.03},{\"ra\":-78.59,\"dec\":-26.99,\"mag\":3.17},{\"ra\":-77.48,\"dec\":33.36,\"mag\":3.52},{\"ra\":-76.18,\"dec\":-26.3,\"mag\":2.05},{\"ra\":-75.57,\"dec\":-21.11,\"mag\":3.52},{\"ra\":-75.26,\"dec\":32.69,\"mag\":3.25},{\"ra\":-74.35,\"dec\":-29.88,\"mag\":2.6},{\"ra\":-73.83,\"dec\":-21.74,\"mag\":3.76},{\"ra\":-73.65,\"dec\":13.86,\"mag\":2.99},{\"ra\":-73.44,\"dec\":-4.88,\"mag\":3.43},{\"ra\":-73.27,\"dec\":-27.67,\"mag\":3.32},{\"ra\":-72.56,\"dec\":-21.02,\"mag\":2.88},{\"ra\":-71.86,\"dec\":67.66,\"mag\":3.07},{\"ra\":-70.72,\"dec\":53.37,\"mag\":3.8},{\"ra\":-69.58,\"dec\":-17.85,\"mag\":3.92},{\"ra\":-69.34,\"dec\":-44.46,\"mag\":3.96},{\"ra\":-69.03,\"dec\":-40.62,\"mag\":3.96},{\"ra\":-68.63,\"dec\":3.11,\"mag\":3.36},{\"ra\":-67.57,\"dec\":51.73,\"mag\":3.76},{\"ra\":-67.32,\"dec\":27.96,\"mag\":3.05},{\"ra\":-63.76,\"dec\":45.13,\"mag\":2.86},{\"ra\":-63.44,\"dec\":10.61,\"mag\":2.72},{\"ra\":-63.15,\"dec\":18.53,\"mag\":3.68},{\"ra\":-62.96,\"dec\":70.27,\"mag\":3.84},{\"ra\":-62.3,\"dec\":8.87,\"mag\":0.76},{\"ra\":-61.88,\"dec\":1.01,\"mag\":3.87},{\"ra\":-61.17,\"dec\":6.41,\"mag\":3.71},{\"ra\":-60.92,\"dec\":35.08,\"mag\":3.89},{\"ra\":-60.31,\"dec\":19.49,\"mag\":3.51},{\"ra\":-59.85,\"dec\":-72.91,\"mag\":3.97},{\"ra\":-57.82,\"dec\":-66.18,\"mag\":3.55},{\"ra\":-57.17,\"dec\":-0.82,\"mag\":3.24},{\"ra\":-56.59,\"dec\":46.74,\"mag\":3.8},{\"ra\":-56.13,\"dec\":47.71,\"mag\":3.96},{\"ra\":-55.49,\"dec\":-12.54,\"mag\":3.58},{\"ra\":-54.75,\"dec\":-14.78,\"mag\":3.05},{\"ra\":-54.44,\"dec\":40.26,\"mag\":2.23},{\"ra\":-53.59,\"dec\":-56.74,\"mag\":1.94},{\"ra\":-50.61,\"dec\":14.6,\"mag\":3.64},{\"ra\":-50.61,\"dec\":-47.29,\"mag\":3.11},{\"ra\":-50.09,\"dec\":15.91,\"mag\":3.77},{\"ra\":-49.64,\"dec\":45.28,\"mag\":1.25},{\"ra\":-48.76,\"dec\":-66.2,\"mag\":3.42},{\"ra\":-48.68,\"dec\":61.84,\"mag\":3.41},{\"ra\":-48.45,\"dec\":33.97,\"mag\":2.48},{\"ra\":-48.08,\"dec\":-9.5,\"mag\":3.78},{\"ra\":-46.3,\"dec\":-58.45,\"mag\":3.67},{\"ra\":-45.71,\"dec\":41.17,\"mag\":3.94},{\"ra\":-43.77,\"dec\":43.93,\"mag\":3.72},{\"ra\":-41.77,\"dec\":30.23,\"mag\":3.21},{\"ra\":-41.3,\"dec\":38.05,\"mag\":3.74},{\"ra\":-41.04,\"dec\":5.25,\"mag\":3.92},{\"ra\":-40.36,\"dec\":62.59,\"mag\":2.45},{\"ra\":-38.33,\"dec\":-22.41,\"mag\":3.77},{\"ra\":-37.84,\"dec\":70.56,\"mag\":3.23},{\"ra\":-37.11,\"dec\":-5.57,\"mag\":2.9},{\"ra\":-36.5,\"dec\":45.59,\"mag\":3.98},{\"ra\":-34.98,\"dec\":-16.66,\"mag\":3.69},{\"ra\":-34.63,\"dec\":-77.39,\"mag\":3.73},{\"ra\":-33.95,\"dec\":9.88,\"mag\":2.38},{\"ra\":-33.24,\"dec\":-16.13,\"mag\":2.85},{\"ra\":-31.52,\"dec\":-37.36,\"mag\":3},{\"ra\":-28.55,\"dec\":-0.32,\"mag\":2.95},{\"ra\":-28.25,\"dec\":25.35,\"mag\":3.77},{\"ra\":-27.94,\"dec\":-46.96,\"mag\":1.73},{\"ra\":-27.45,\"dec\":6.2,\"mag\":3.52},{\"ra\":-27.29,\"dec\":58.2,\"mag\":3.39},{\"ra\":-25.37,\"dec\":-60.26,\"mag\":2.87},{\"ra\":-24.59,\"dec\":-1.39,\"mag\":3.86},{\"ra\":-22.79,\"dec\":-0.02,\"mag\":3.65},{\"ra\":-22.68,\"dec\":-43.5,\"mag\":3.97},{\"ra\":-22.18,\"dec\":50.28,\"mag\":3.76},{\"ra\":-19.63,\"dec\":10.83,\"mag\":3.41},{\"ra\":-19.33,\"dec\":-46.88,\"mag\":2.07},{\"ra\":-19.25,\"dec\":30.22,\"mag\":2.93},{\"ra\":-18.37,\"dec\":23.57,\"mag\":3.97},{\"ra\":-17.86,\"dec\":-51.32,\"mag\":3.49},{\"ra\":-17.58,\"dec\":66.2,\"mag\":3.5},{\"ra\":-17.5,\"dec\":24.6,\"mag\":3.51},{\"ra\":-16.85,\"dec\":-7.58,\"mag\":3.73},{\"ra\":-16.34,\"dec\":-15.82,\"mag\":3.27},{\"ra\":-15.59,\"dec\":-29.62,\"mag\":1.17},{\"ra\":-14.52,\"dec\":42.33,\"mag\":3.62},{\"ra\":-14.06,\"dec\":28.08,\"mag\":2.44},{\"ra\":-13.81,\"dec\":15.21,\"mag\":2.49},{\"ra\":-12.64,\"dec\":-21.17,\"mag\":3.68},{\"ra\":-12.41,\"dec\":-45.25,\"mag\":3.88},{\"ra\":-10.71,\"dec\":3.28,\"mag\":3.7},{\"ra\":-10.64,\"dec\":-58.24,\"mag\":3.99},{\"ra\":-9.26,\"dec\":-20.1,\"mag\":3.96},{\"ra\":-5.61,\"dec\":46.46,\"mag\":3.81},{\"ra\":-5.16,\"dec\":77.63,\"mag\":3.21}]");
var NAMED = [
	{
		id: "sirius",
		name: "Sirius",
		ra: 101.29,
		dec: -16.72,
		mag: -1.46
	},
	{
		id: "canopus",
		name: "Canopus",
		ra: 95.99,
		dec: -52.7,
		mag: -.74
	},
	{
		id: "acen",
		name: "Rigil",
		ra: 219.9,
		dec: -60.83,
		mag: -.27
	},
	{
		id: "arcturus",
		name: "Arcturus",
		ra: 213.92,
		dec: 19.18,
		mag: -.05
	},
	{
		id: "vega",
		name: "Vega",
		ra: 279.23,
		dec: 38.78,
		mag: .03
	},
	{
		id: "capella",
		name: "Capella",
		ra: 79.17,
		dec: 46,
		mag: .08
	},
	{
		id: "rigel",
		name: "Rigel",
		ra: 78.63,
		dec: -8.2,
		mag: .13
	},
	{
		id: "procyon",
		name: "Procyon",
		ra: 114.83,
		dec: 5.22,
		mag: .34
	},
	{
		id: "achernar",
		name: "Achernar",
		ra: 24.43,
		dec: -57.24,
		mag: .46
	},
	{
		id: "betelgeuse",
		name: "Betelgeuse",
		ra: 88.79,
		dec: 7.41,
		mag: .5
	},
	{
		id: "bcen",
		name: "Hadar",
		ra: 210.96,
		dec: -60.37,
		mag: .61
	},
	{
		id: "altair",
		name: "Altair",
		ra: 297.7,
		dec: 8.87,
		mag: .77
	},
	{
		id: "acrux",
		name: "Acrux",
		ra: 186.65,
		dec: -63.1,
		mag: .77
	},
	{
		id: "aldebaran",
		name: "Aldebaran",
		ra: 68.98,
		dec: 16.51,
		mag: .85
	},
	{
		id: "antares",
		name: "Antares",
		ra: 247.35,
		dec: -26.43,
		mag: 1.06
	},
	{
		id: "spica",
		name: "Spica",
		ra: 201.3,
		dec: -11.16,
		mag: .97
	},
	{
		id: "pollux",
		name: "Pollux",
		ra: 116.33,
		dec: 28.03,
		mag: 1.14
	},
	{
		id: "fomalhaut",
		name: "Fomalhaut",
		ra: 344.41,
		dec: -29.62,
		mag: 1.16
	},
	{
		id: "deneb",
		name: "Deneb",
		ra: 310.36,
		dec: 45.28,
		mag: 1.25
	},
	{
		id: "mimosa",
		name: "Mimosa",
		ra: 191.93,
		dec: -59.69,
		mag: 1.25
	},
	{
		id: "regulus",
		name: "Regulus",
		ra: 152.09,
		dec: 11.97,
		mag: 1.4
	},
	{
		id: "adhara",
		name: "Adhara",
		ra: 104.66,
		dec: -28.97,
		mag: 1.5
	},
	{
		id: "castor",
		name: "Castor",
		ra: 113.65,
		dec: 31.89,
		mag: 1.58
	},
	{
		id: "gacrux",
		name: "Gacrux",
		ra: 187.79,
		dec: -57.11,
		mag: 1.63
	},
	{
		id: "shaula",
		name: "Shaula",
		ra: 263.4,
		dec: -37.1,
		mag: 1.62
	},
	{
		id: "bellatrix",
		name: "Bellatrix",
		ra: 81.28,
		dec: 6.35,
		mag: 1.64
	},
	{
		id: "elnath",
		name: "Elnath",
		ra: 81.57,
		dec: 28.61,
		mag: 1.65
	},
	{
		id: "miaplacidus",
		name: "Miaplacidus",
		ra: 138.3,
		dec: -69.72,
		mag: 1.67
	},
	{
		id: "alnilam",
		name: "Alnilam",
		ra: 84.05,
		dec: -1.2,
		mag: 1.69
	},
	{
		id: "alnitak",
		name: "Alnitak",
		ra: 85.19,
		dec: -1.94,
		mag: 1.77
	},
	{
		id: "alnair",
		name: "Alnair",
		ra: 332.06,
		dec: -46.96,
		mag: 1.74
	},
	{
		id: "kaus",
		name: "Kaus Australis",
		ra: 276.04,
		dec: -34.38,
		mag: 1.85
	},
	{
		id: "avior",
		name: "Avior",
		ra: 125.63,
		dec: -59.51,
		mag: 1.86
	},
	{
		id: "peacock",
		name: "Peacock",
		ra: 306.41,
		dec: -56.74,
		mag: 1.94
	},
	{
		id: "dcru",
		ra: 183.79,
		dec: -58.75,
		mag: 2.79
	},
	{
		id: "mintaka",
		ra: 83,
		dec: -.3,
		mag: 2.23
	},
	{
		id: "saiph",
		ra: 86.94,
		dec: -9.67,
		mag: 2.06
	},
	{
		id: "wezen",
		ra: 107.1,
		dec: -26.39,
		mag: 1.83
	},
	{
		id: "nunki",
		ra: 283.82,
		dec: -26.3,
		mag: 2.05
	},
	{
		id: "atria",
		ra: 252.17,
		dec: -69.03,
		mag: 1.91
	},
	{
		id: "sargas",
		ra: 264.33,
		dec: -42.99,
		mag: 1.86
	}
];
function angular(ra1, dec1, ra2, dec2) {
	const ra = (ra1 - ra2) * Math.PI / 180;
	const d1 = dec1 * Math.PI / 180;
	const d2 = dec2 * Math.PI / 180;
	const haversine = Math.sin((d2 - d1) / 2) ** 2 + Math.cos(d1) * Math.cos(d2) * Math.sin(ra / 2) ** 2;
	return 2 * Math.asin(Math.min(1, Math.sqrt(haversine))) * 180 / Math.PI;
}
var field = stars_default.filter((row) => !NAMED.some((star) => angular(star.ra, star.dec, row.ra, row.dec) < .8)).map((row, index) => ({
	id: `c${index}`,
	ra: row.ra,
	dec: row.dec,
	mag: row.mag
}));
var skyStars = [...NAMED, ...field];
var skyLines = [
	["acrux", "mimosa"],
	["mimosa", "gacrux"],
	["gacrux", "dcru"],
	["dcru", "acrux"],
	["acen", "bcen"],
	["betelgeuse", "bellatrix"],
	["bellatrix", "rigel"],
	["rigel", "saiph"],
	["saiph", "betelgeuse"],
	["alnitak", "alnilam"],
	["alnilam", "mintaka"],
	["antares", "shaula"],
	["shaula", "sargas"],
	["kaus", "nunki"],
	["canopus", "miaplacidus"],
	["miaplacidus", "avior"]
];
var LABELS = /* @__PURE__ */ new Set([
	"sirius",
	"canopus",
	"acen",
	"acrux",
	"achernar",
	"antares",
	"spica",
	"rigel",
	"fomalhaut",
	"vega",
	"altair",
	"hadar"
]);
function wrap(deg) {
	return ((deg + 180) % 360 + 360) % 360 - 180;
}
function localSiderealDegrees(date, longitude) {
	return ((280.46061837 + 360.98564736629 * (date.getTime() / 864e5 + 2440587.5 - 2451545) + longitude) % 360 + 360) % 360;
}
function horizontal(star, latitude, sidereal) {
	const hourAngle = (sidereal - star.ra) * Math.PI / 180;
	const lat = latitude * Math.PI / 180;
	const dec = star.dec * Math.PI / 180;
	const sinAlt = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(hourAngle);
	const alt = Math.asin(Math.max(-1, Math.min(1, sinAlt)));
	const azimuth = Math.atan2(-Math.sin(hourAngle), Math.tan(dec) * Math.cos(lat) - Math.sin(lat) * Math.cos(hourAngle));
	return {
		alt: alt * 180 / Math.PI,
		az: (azimuth * 180 / Math.PI + 360) % 360
	};
}
function skyView(latitude) {
	const south = latitude < 0;
	return {
		center: south ? 180 : 0,
		facing: south ? "SOUTH" : "NORTH",
		fov: 210
	};
}
function projectSky(latitude, longitude, date) {
	const sidereal = localSiderealDegrees(date, longitude);
	const { center, facing, fov } = skyView(latitude);
	const byId = /* @__PURE__ */ new Map();
	const stars = [];
	for (const star of skyStars) {
		const { alt, az } = horizontal(star, latitude, sidereal);
		const delta = wrap(az - center);
		if (alt < 2 || Math.abs(delta) > fov / 2) continue;
		const placed = {
			...star,
			alt,
			x: 50 + delta / (fov / 2) * 48,
			y: 52 - Math.min(alt, 80) / 80 * 44,
			showName: Boolean(star.name && LABELS.has(star.id) && alt > 18)
		};
		stars.push(placed);
		byId.set(star.id, placed);
	}
	const named = stars.filter((star) => star.showName).sort((a, b) => a.mag - b.mag);
	const keep = new Set(named.slice(0, 6).map((star) => star.id));
	for (const star of stars) star.showName = keep.has(star.id) && star.y < 40;
	return {
		stars,
		lines: skyLines.flatMap(([a, b]) => {
			const from = byId.get(a);
			const to = byId.get(b);
			return from && to ? [[from, to]] : [];
		}),
		facing
	};
}
function LocalSky({ latitude, longitude, place, starOpacity }) {
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 2e4);
		return () => window.clearInterval(timer);
	}, []);
	const sky = projectSky(latitude, longitude, now);
	const ground = place.split("/")[0]?.trim() || "HERE";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "local-sky",
		"aria-hidden": "true",
		style: { opacity: Math.max(.28, starOpacity) },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			preserveAspectRatio: "xMidYMid slice",
			children: [
				sky.lines.filter(([from, to]) => from.y < 50 && to.y < 50).map(([from, to]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: from.x,
					y1: from.y,
					x2: to.x,
					y2: to.y,
					className: "sky-line"
				}, `${from.id}-${to.id}`)),
				sky.stars.map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "sky-star",
					cx: star.x,
					cy: star.y,
					r: Math.max(.18, (2.15 - star.mag) * .22),
					opacity: Math.max(.35, 1 - star.mag * .18)
				}), star.showName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					className: "sky-name",
					x: star.x + .8,
					y: star.y - .7,
					children: star.name
				}) : null] }, star.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					className: "sky-horizon",
					x1: "6",
					y1: "52",
					x2: "94",
					y2: "52"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
					className: "sky-facing",
					x: "50",
					y: "7",
					children: ["LOOKING ", sky.facing]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					className: "sky-place",
					x: "50",
					y: "49",
					children: ground
				})
			]
		})
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var readAtmosphere = createServerFn({ method: "GET" }).validator((input) => {
	const latitude = Number(input?.latitude);
	const longitude = Number(input?.longitude);
	if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) throw new Error("latitude");
	if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) throw new Error("longitude");
	return {
		latitude,
		longitude
	};
}).handler(createSsrRpc("7b364884de8a579608d6cc673bfbadd60c46c5f3e7ac7f68f390cf7455c9415f"));
var PERTH = {
	latitude: -31.9523,
	longitude: 115.8613,
	label: "PERTH / ORIGIN SIGNAL"
};
var fallback = {
	location: PERTH.label,
	temperature: null,
	wind: null,
	cloud: null,
	code: null,
	isDay: false,
	vibe: "night",
	updatedAt: null
};
function formatClock(iso, origin) {
	const value = iso ? new Date(iso) : /* @__PURE__ */ new Date();
	return new Intl.DateTimeFormat("en-AU", {
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
		timeZone: origin ? "Australia/Perth" : void 0
	}).format(value);
}
function LiveHero({ onEnter }) {
	const [place, setPlace] = (0, import_react.useState)(PERTH);
	const [signal, setSignal] = (0, import_react.useState)(fallback);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("TUNING TO PERTH ATMOSPHERE");
	const loadSignal = (0, import_react.useCallback)(async (latitude, longitude, location) => {
		setBusy(true);
		setMessage("READING LIVE ATMOSPHERE");
		try {
			const current = await readAtmosphere({ data: {
				latitude,
				longitude
			} });
			if (!current) throw new Error("unavailable");
			const isDay = current.is_day === 1;
			const code = current.weather_code ?? null;
			const cloud = current.cloud_cover ?? null;
			const next = {
				location,
				temperature: current.temperature_2m ?? null,
				wind: current.wind_speed_10m ?? null,
				cloud,
				code,
				isDay,
				vibe: identifyVibe(code, cloud, isDay),
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			setSignal(next);
			saveWorldSignal(next);
			setPlace({
				latitude,
				longitude,
				label: location
			});
			setMessage(`${describeVibe(next.vibe)} / LIVE`);
		} catch {
			const cached = readWorldSignal();
			if (cached) setSignal(cached);
			setMessage("LIVE SIGNAL UNAVAILABLE / ORBIT CONTINUES");
		} finally {
			setBusy(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const cached = readWorldSignal();
		if (cached) setSignal(cached);
		loadSignal(PERTH.latitude, PERTH.longitude, PERTH.label);
	}, [loadSignal]);
	const useNearby = () => {
		if (!navigator.geolocation) {
			setMessage("NEARBY SIGNAL NOT SUPPORTED / PERTH REMAINS ACTIVE");
			return;
		}
		setMessage("REQUESTING NEARBY ATMOSPHERE");
		navigator.geolocation.getCurrentPosition((position) => void loadSignal(position.coords.latitude, position.coords.longitude, "NEARBY / YOUR SIGNAL"), () => setMessage("LOCATION NOT SHARED / PERTH REMAINS ACTIVE"), {
			enableHighAccuracy: false,
			timeout: 8e3,
			maximumAge: 6e5
		});
	};
	const profile = (0, import_react.useMemo)(() => getAtmosphereProfile(signal.vibe, signal.isDay), [signal.isDay, signal.vibe]);
	const style = {
		"--signal-sky": profile.sky,
		"--signal-glow": profile.glow,
		"--signal-horizon": profile.horizon,
		"--signal-stars": String(profile.starOpacity),
		"--signal-drift": String(profile.drift),
		"--world-wind": String(Math.min(1, Math.max(.16, (signal.wind ?? 10) / 54)))
	};
	const origin = signal.location === PERTH.label;
	const temperature = signal.temperature === null ? "—" : `${Math.round(signal.temperature)}°C`;
	const wind = signal.wind === null ? "—" : `${Math.round(signal.wind)} km/h`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `hero vibe-${signal.vibe}`,
		style,
		"aria-labelledby": "hero-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocalSky, {
				latitude: place.latitude,
				longitude: place.longitude,
				place: place.label,
				starOpacity: profile.starOpacity
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hero-copy",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "A BRAND UNIVERSE / THE SKY FROM HERE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						id: "hero-title",
						className: "wordmark hero-mark",
						children: "fourtee2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "hero-statement",
						children: [
							"A universe of brands, ideas,",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"technology & experiences."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "enter",
						onClick: onEnter,
						children: ["ENTER THE UNIVERSE ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "→" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "world-signal",
				"aria-live": "polite",
				"aria-label": "Live world signal",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "world-signal-head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "WORLD SIGNAL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: describeVibe(signal.vibe) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						signal.location,
						" · ",
						formatClock(signal.updatedAt, origin),
						" · ",
						temperature,
						" · WIND ",
						wind
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: message }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "world-signal-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void loadSignal(PERTH.latitude, PERTH.longitude, PERTH.label),
							disabled: busy,
							children: "REFRESH PERTH"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: useNearby,
							disabled: busy,
							children: "USE MY ATMOSPHERE"
						})]
					})
				]
			})
		]
	});
}
function HomeUniverse({ entered }) {
	const navigate = useNavigate();
	const [intent, setIntent] = (0, import_react.useState)(null);
	const [panel, setPanel] = (0, import_react.useState)("map");
	const current = entered ? panel : null;
	const enter = (0, import_react.useCallback)(() => {
		navigate({
			to: "/",
			search: { galaxy: 1 }
		});
	}, [navigate]);
	const request = (0, import_react.useCallback)((next) => {
		setIntent(next);
		if (!entered) enter();
	}, [enter, entered]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: entered ? "shell is-entered" : "shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "site-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "wordmark",
					onClick: () => request("map"),
					children: "fourtee2"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "site-nav",
					"aria-label": "Galaxy navigation",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: current === "map" ? "is-current" : "",
							onClick: () => request("map"),
							children: "MAP"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: current === "worlds" ? "is-current" : "",
							onClick: () => request("worlds"),
							children: "WORLDS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: current === "search" ? "is-current" : "",
							onClick: () => request("search"),
							children: "SEARCH"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: current === "about" ? "is-current" : "",
							onClick: () => request("about"),
							children: "ABOUT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "nav-split",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/board",
							children: "BOARD"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children: entered ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalaxyExplorer, {
				navIntent: intent,
				onIntentHandled: () => setIntent(null),
				onPanel: setPanel
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveHero, { onEnter: enter }) }),
			!entered ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "site-footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "TRANSMISSION COMPLETE" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "wordmark",
						onClick: () => request("map"),
						children: "fourtee2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "THE UNIVERSE IS STILL EXPANDING." })
				]
			}) : null
		]
	});
}
function HomePage() {
	const { galaxy } = Route$5.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeUniverse, { entered: galaxy === 1 });
}
//#endregion
export { HomePage as component };
