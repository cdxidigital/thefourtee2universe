import { i as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as travelPriorities, f as portals, g as selectedPlaylist, m as searchAirports, p as ritualPhases, r as destinations, s as formatPlaybackTime, t as airportValue } from "./catalog-CY0O0eXc.mjs";
import { r as toggleSignal, t as readSignals } from "./board-BRC6LtvZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PortalView-mbt7b1Kf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SaveSignal({ signal }) {
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const sync = () => {
			setSaved(readSignals().some((item) => item.sourceId === signal.sourceId && item.signalType === signal.signalType));
		};
		sync();
		window.addEventListener("fourtee2:signals", sync);
		return () => window.removeEventListener("fourtee2:signals", sync);
	}, [signal.sourceId, signal.signalType]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: saved ? "save-signal is-saved" : "save-signal",
		"aria-pressed": saved,
		onClick: () => setSaved(toggleSignal(signal)),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: saved ? "SAVED TO MY BOARD" : "SAVE TO MY BOARD" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: saved ? "●" : "+" })]
	});
}
function PortalView({ portal }) {
	const data = portals[portal];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `portal portal--${data.key}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "site-header",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					search: { galaxy: void 0 },
					className: "wordmark",
					"aria-label": "Return to fourtee2",
					children: "fourtee2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "header-note",
					children: data.eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "site-nav",
					"aria-label": "Portal navigation",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/travel",
							className: data.key === "travel" ? "is-current" : "",
							children: "TRAVEL"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/music",
							className: data.key === "music" ? "is-current" : "",
							children: "MUSIC"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/you",
							className: data.key === "you" ? "is-current" : "",
							children: "YOU"
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
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: `portal-hero portal-hero--${data.key}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: data.designation
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "wordmark portal-mark",
						children: data.wordmark
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "orbit",
						children: data.orbit
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						className: "scroll-note",
						href: "#manifest",
						children: "READ FIELD NOTE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hero-status",
						children: data.status
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "manifest",
				className: "manifest",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "manifest-index",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "FIELD NOTE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.index })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "MANIFEST / ACTIVE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: data.headline }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "manifest-body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.intro }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.note })]
					})
				] })]
			}),
			portal === "travel" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldNotes, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TravelIntelligence, {})] }),
			portal === "music" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MusicPlayer, {}),
			portal === "you" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RitualInstrument, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "axes",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-head",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "FIELD INTERFACE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: data.axisTitle }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Three ways into the field. Move in any order." })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "axis-list",
					children: data.axes.map((axis) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: axis.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: axis.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: axis.description })
					] }, axis.code))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "log",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "ARCHIVE / 042"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: data.logTitle }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { children: data.log.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.sequence }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: entry.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: entry.detail })] })] }, entry.sequence)) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "site-footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "END OF CURRENT FIELD" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						search: { galaxy: void 0 },
						className: "wordmark",
						children: "fourtee2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RETURN TO THE UNIVERSE" })
				]
			})
		] })]
	});
}
function FieldNotes() {
	const [active, setActive] = (0, import_react.useState)(destinations[0]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "notes",
		"aria-labelledby": "notes-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "LIVE FIELD NOTES"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				id: "notes-title",
				children: [
					"Start anywhere.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Go everywhere."
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "notes-layout",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "notes-list",
					role: "listbox",
					"aria-label": "Destination field notes",
					children: destinations.map((destination) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: active.id === destination.id ? "is-active" : "",
						onClick: () => setActive(destination),
						"aria-pressed": active.id === destination.id,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: destination.number }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: destination.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: destination.location })
						]
					}, destination.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "coord-map",
					"aria-hidden": "true",
					children: destinations.map((destination) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						tabIndex: -1,
						className: active.id === destination.id ? "pin is-active" : "pin",
						style: {
							left: `${destination.mapX}%`,
							top: `${destination.mapY}%`
						},
						onClick: () => setActive(destination),
						children: destination.number
					}, destination.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "note-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "eyebrow",
							children: ["ACTIVE NOTE / ", active.number]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: active.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							active.lat.toFixed(4),
							"° / ",
							active.lng.toFixed(4),
							"°"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { children: active.note }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveSignal, { signal: {
							signalType: "destination",
							portal: "travel",
							sourceId: `route-${active.id}`,
							title: active.name,
							subtitle: `${active.location} / field route`,
							href: "/travel"
						} })
					]
				})
			]
		})]
	});
}
function AirportField({ id, label, value, onChange, placeholder }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [index, setIndex] = (0, import_react.useState)(0);
	const matches = searchAirports(value);
	const choose = (airport) => {
		onChange(airportValue(airport));
		setIndex(0);
		setOpen(false);
	};
	const onKeyDown = (event) => {
		if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) setOpen(true);
		if (event.key === "ArrowDown") {
			event.preventDefault();
			setIndex((current) => Math.min(current + 1, Math.max(matches.length - 1, 0)));
		}
		if (event.key === "ArrowUp") {
			event.preventDefault();
			setIndex((current) => Math.max(current - 1, 0));
		}
		if (event.key === "Enter" && open && matches[index]) {
			event.preventDefault();
			choose(matches[index]);
		}
		if (event.key === "Escape") setOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "field",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				value,
				placeholder,
				autoComplete: "off",
				role: "combobox",
				"aria-expanded": open,
				"aria-controls": `${id}-list`,
				onChange: (event) => {
					onChange(event.target.value);
					setIndex(0);
					setOpen(true);
				},
				onFocus: () => setOpen(true),
				onBlur: () => window.setTimeout(() => setOpen(false), 140),
				onKeyDown,
				required: true
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "suggest",
				id: `${id}-list`,
				role: "listbox",
				children: matches.length ? matches.map((airport, itemIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "option",
					"aria-selected": itemIndex === index,
					className: itemIndex === index ? "is-active" : "",
					onMouseDown: (event) => {
						event.preventDefault();
						choose(airport);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
						airport.city,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: airport.code })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [
						airport.airport,
						" / ",
						airport.country
					] })]
				}, airport.code)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "NO AIRPORT SIGNAL" })
			})
		]
	});
}
function TravelIntelligence() {
	const [priority, setPriority] = (0, import_react.useState)("value");
	const active = travelPriorities.find((item) => item.id === priority) ?? travelPriorities[1];
	const [origin, setOrigin] = (0, import_react.useState)("Perth (PER)");
	const [destination, setDestination] = (0, import_react.useState)("");
	const [depart, setDepart] = (0, import_react.useState)("2026-10-14");
	const [ret, setRet] = (0, import_react.useState)("2026-10-21");
	const [people, setPeople] = (0, import_react.useState)("1 traveller");
	const [locked, setLocked] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const onSubmit = (event) => {
		event.preventDefault();
		if (ret < depart) {
			setLocked("");
			setNote("RETURN IS BEFORE DEPARTURE.");
			return;
		}
		setNote("");
		setLocked(`${origin.toUpperCase()} → ${destination.toUpperCase()} / ${active.label} / ${people.toUpperCase()} / ${depart}–${ret}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "intel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "TRAVEL INTELLIGENCE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Decide what the route means." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "route-form",
				onSubmit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AirportField, {
						id: "origin",
						label: "ORIGIN",
						value: origin,
						onChange: setOrigin,
						placeholder: "City or airport"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AirportField, {
						id: "destination",
						label: "DESTINATION",
						value: destination,
						onChange: setDestination,
						placeholder: "Where to?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "DEPART" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: depart,
							onChange: (event) => setDepart(event.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RETURN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: ret,
							min: depart,
							onChange: (event) => setRet(event.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TRAVELLERS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: people,
							onChange: (event) => setPeople(event.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "1 traveller" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "2 travellers" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "3 travellers" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "4 travellers" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "5+ travellers" })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						className: "enter",
						children: ["SET ROUTE ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "→" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: locked ? "route-status is-active" : "route-status",
						"aria-live": "polite",
						children: note && !locked ? note : locked ? `ROUTE SIGNAL LOCKED / ${locked}` : "ENTER THE COORDINATES. THE FIELD WILL HOLD THE INTENT."
					})
				]
			}),
			locked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveSignal, { signal: {
				signalType: "destination",
				portal: "travel",
				sourceId: locked,
				title: `${origin} → ${destination}`,
				subtitle: `${active.label} / ${people}`,
				href: "/travel"
			} }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "priorities",
				role: "tablist",
				"aria-label": "Travel priority",
				children: travelPriorities.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": priority === item.id,
					className: priority === item.id ? "is-active" : "",
					onClick: () => setPriority(item.id),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.number }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.label })]
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "readout",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "eyebrow",
						children: ["ACTIVE PRIORITY / ", active.metric]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: active.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { children: active.description })
				]
			})
		]
	});
}
function MusicPlayer() {
	const [track, setTrack] = (0, import_react.useState)(selectedPlaylist.tracks[0]);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [time, setTime] = (0, import_react.useState)(0);
	const [duration, setDuration] = (0, import_react.useState)(0);
	const [failed, setFailed] = (0, import_react.useState)(false);
	const audioRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const audio = audioRef.current;
		if (!audio) return;
		if (!playing) {
			audio.pause();
			return;
		}
		audio.play().then(() => setFailed(false)).catch(() => {
			setPlaying(false);
			setFailed(true);
		});
	}, [playing, track.id]);
	const toggle = () => setPlaying((value) => !value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "player",
		"aria-labelledby": "player-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "SELECTED PLAYLIST"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [selectedPlaylist.tracks.length, " TRANSMISSIONS"] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "player-deck",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "player-title",
					className: "wordmark",
					children: "4[music]2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "lede",
					children: [selectedPlaylist.title, ". Select a transmission, then play it in the field."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveSignal, { signal: {
					signalType: "playlist",
					portal: "music",
					sourceId: selectedPlaylist.id,
					title: selectedPlaylist.title,
					subtitle: "Selected transmissions",
					href: "/music"
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "queue",
					role: "listbox",
					"aria-label": "Playlist",
					children: selectedPlaylist.tracks.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "option",
						"aria-selected": track.id === item.id,
						className: track.id === item.id ? "is-active" : "",
						onClick: () => {
							setTrack(item);
							setPlaying(false);
							setTime(0);
							setFailed(false);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(index + 1).padStart(2, "0") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: item.detail })
						]
					}, item.id))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "deck",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "eyebrow",
						children: "NOW PLAYING"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: track.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: track.detail }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: playing ? "bars is-on" : "bars",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
						ref: audioRef,
						preload: "none",
						src: `https://cdn1.suno.ai/${track.id}.mp3`,
						onPlay: () => setPlaying(true),
						onPause: () => setPlaying(false),
						onLoadedMetadata: (event) => setDuration(event.currentTarget.duration),
						onTimeUpdate: (event) => setTime(event.currentTarget.currentTime),
						onEnded: () => {
							const index = selectedPlaylist.tracks.findIndex((item) => item.id === track.id);
							const next = selectedPlaylist.tracks[index + 1];
							if (!next) {
								setPlaying(false);
								return;
							}
							setTime(0);
							setFailed(false);
							setTrack(next);
						},
						onError: () => setFailed(true)
					}, track.id),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "deck-controls",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "enter",
								onClick: toggle,
								children: playing ? "PAUSE SIGNAL" : "PLAY SIGNAL"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "timeline",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPlaybackTime(time) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: 0,
										max: duration || 1,
										step: .1,
										value: Math.min(time, duration || 1),
										"aria-label": `Seek ${track.title}`,
										onChange: (event) => {
											const next = Number(event.target.value);
											if (audioRef.current) audioRef.current.currentTime = next;
											setTime(next);
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPlaybackTime(duration) })
								]
							}),
							failed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "route-status",
								children: "SIGNAL UNAVAILABLE ON THIS TRANSMISSION"
							})
						]
					})
				]
			})]
		})]
	});
}
function RitualInstrument() {
	const [running, setRunning] = (0, import_react.useState)(false);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const total = ritualPhases.reduce((sum, phase) => sum + phase.seconds, 0);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		const timer = window.setInterval(() => {
			setElapsed((value) => value + 1 >= total ? total : value + 1);
		}, 1e3);
		return () => window.clearInterval(timer);
	}, [running, total]);
	(0, import_react.useEffect)(() => {
		if (running && elapsed >= total) setRunning(false);
	}, [
		elapsed,
		running,
		total
	]);
	let cursor = elapsed;
	let phase = ritualPhases[0];
	for (const item of ritualPhases) {
		if (cursor < item.seconds || item === ritualPhases[ritualPhases.length - 1]) {
			phase = item;
			break;
		}
		cursor -= item.seconds;
	}
	const remain = Math.max(0, phase.seconds - (elapsed >= total ? phase.seconds : cursor));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "ritual",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "section-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "RITUAL INSTRUMENT / 20:00"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Hold one protocol." })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ritual-panel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: phase.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
					className: "ritual-time",
					children: formatPlaybackTime(remain)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: elapsed >= total ? "Protocol complete. The field is quiet." : phase.cue }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ritual-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "enter",
						onClick: () => setRunning((value) => !value),
						disabled: elapsed >= total,
						children: running ? "PAUSE" : elapsed > 0 ? "RESUME" : "START"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setRunning(false);
							setElapsed(0);
						},
						children: "RESET"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "ritual-phases",
					children: ritualPhases.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: item.id === phase.id && elapsed < total ? "is-active" : "",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("em", { children: [item.seconds / 60, " MIN"] })]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveSignal, { signal: {
					signalType: "ritual",
					portal: "you",
					sourceId: "protocol-20",
					title: "20-minute protocol",
					subtitle: "Prepare / perform / recover",
					href: "/you"
				} })
			]
		})]
	});
}
//#endregion
export { PortalView as t };
