import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type WheelEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  currentMissions,
  findWorld,
  galaxyRelationships,
  galaxyWorlds,
  isWordmark,
  searchWorlds,
  worldLabel,
  worldField,
  fieldOrder,
  fieldTitle,
  journeyById,
  parentWorld,
  worldDepth,
  worldMaterials,
  type GalaxyWorld,
  type JourneyId,
} from "@/lib/universe/catalog";
import { CelestialBody } from "@/components/universe/CelestialBody";
import { getAtmosphereProfile, readWorldSignal, type WorldSignalSnapshot } from "@/lib/universe/atmosphere";

export type NavIntent = "map" | "worlds" | "search" | "about" | null;

type View = { x: number; y: number; zoom: number };

function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const starColors = ["#f7f4ee", "#d7e4ff", "#ffe3b5", "#e6d4ff"];

function makeStars(count: number, seed: number, size: [number, number], opacity: [number, number]) {
  return Array.from({ length: count }, (_, index) => {
    const roll = hash(seed + index * 3.17);
    const s = size[0] + roll * (size[1] - size[0]);
    return {
      left: `${(hash(seed + index * 1.13) * 100).toFixed(2)}%`,
      top: `${(hash(seed + index * 2.71 + 9) * 100).toFixed(2)}%`,
      opacity: opacity[0] + hash(seed + index * 5.9) * (opacity[1] - opacity[0]),
      size: Number(s.toFixed(2)),
      delay: `${(-(hash(seed + index) * 6)).toFixed(2)}s`,
      color: starColors[Math.floor(hash(seed + index * 8.2) * starColors.length)],
    };
  });
}

const dustStars = makeStars(170, 11, [0.5, 1.15], [0.12, 0.4]);
const midStars = makeStars(54, 41, [1.15, 1.9], [0.4, 0.78]);
const brightStars = makeStars(16, 88, [2.1, 3.4], [0.72, 1]);
const warpRays = Array.from({ length: 26 }, (_, index) => index * (360 / 26));

function driftFor(id: string, t: number) {
  let seed = 0;
  for (let index = 0; index < id.length; index += 1) seed += id.charCodeAt(index);
  const amp = id === "haus" ? 0.28 : 1.05 + (seed % 4) * 0.32;
  const speed = 0.065 + (seed % 6) * 0.014;
  const phase = seed * 0.65;
  return {
    x: Math.cos(t * speed + phase) * amp,
    y: Math.sin(t * speed * 0.72 + phase * 1.2) * amp * 0.8,
  };
}

function curve(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const cx = (a.x + b.x) / 2 - dy * 0.1;
  const cy = (a.y + b.y) / 2 + dx * 0.1;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

function openWorld(navigate: ReturnType<typeof useNavigate>, world: GalaxyWorld) {
  if (world.url === "/travel") void navigate({ to: "/travel" });
  else if (world.url === "/music") void navigate({ to: "/music" });
  else if (world.url === "/you") void navigate({ to: "/you" });
  else void navigate({ to: "/worlds/$slug", params: { slug: world.id } });
}

export function GalaxyExplorer({
  journey,
  navIntent,
  onIntentHandled,
  onPanel,
}: {
  journey?: JourneyId;
  navIntent: NavIntent;
  onIntentHandled: () => void;
  onPanel?: (panel: Exclude<NavIntent, null>) => void;
}) {
  const navigate = useNavigate();
  const [view, setView] = useState<View>({ x: 0, y: 0, zoom: 1 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [listOpen, setListOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [constellations, setConstellations] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [departing, setDeparting] = useState<string | null>(null);
  const [inFlight, setInFlight] = useState(false);
  const [caption, setCaption] = useState<{ kicker: string; title: string; line: string } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [worldSignal, setWorldSignal] = useState<WorldSignalSnapshot | null>(null);
  const [motion, setMotion] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapSize, setMapSize] = useState({ w: 960, h: 640 });
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const drag = useRef<{ x: number; y: number; originX: number; originY: number; moved: boolean } | null>(null);
  const pinch = useRef<{ distance: number; zoom: number } | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const flightTimer = useRef<number | null>(null);

  function flyTo(world: GalaxyWorld, kicker?: string) {
    if (flightTimer.current) window.clearTimeout(flightTimer.current);
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reach = worldDepth(world.id);
    setDeparting(null);
    setSelectedId(world.id);
    if (calm) {
      setInFlight(false);
      setCaption(null);
      return;
    }
    setInFlight(true);
    setCaption({
      kicker: kicker ?? fieldTitle[worldField(world.id)],
      title: world.name,
      line: reach === 0 ? "NEAR FIELD" : reach === 1 ? "MID FIELD" : "DEEP FIELD",
    });
    flightTimer.current = window.setTimeout(() => {
      setInFlight(false);
      setCaption(null);
      flightTimer.current = null;
    }, 1680);
  }

  useEffect(() => {
    const route = journeyById(journey);
    if (!route) return;
    const world = findWorld(route.stops[1] ?? route.stops[0]);
    setSelectedId(null);
    setDeparting(null);
    if (!world) return;
    const timer = window.setTimeout(() => flyTo(world, route.title), 460);
    return () => {
      window.clearTimeout(timer);
      if (flightTimer.current) window.clearTimeout(flightTimer.current);
    };
  }, [journey]);

  useEffect(() => {
    const node = mapRef.current;
    if (!node) return;
    const measure = () => setMapSize({ w: node.clientWidth, h: node.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setWorldSignal(readWorldSignal());
  }, []);

  useEffect(() => {
    const refresh = () => setWorldSignal(readWorldSignal());
    window.addEventListener("fourtee2:world-signal", refresh);
    return () => window.removeEventListener("fourtee2:world-signal", refresh);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let frame = 0;
    let last = 0;
    const started = performance.now();
    const tick = (now: number) => {
      if (now - last > 32) {
        last = now;
        setMotion((now - started) / 1000);
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const node = mapRef.current;
    if (!node) return;
    const onWheel = (event: globalThis.WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY > 0 ? -0.08 : 0.08;
      setView((current) => ({ ...current, zoom: clampZoom(current.zoom + delta) }));
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, []);

  function recenter() {
    setView({ x: 0, y: 0, zoom: 1 });
    setSelectedId(null);
    setDeparting(null);
  }

  useEffect(() => {
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

  useEffect(() => {
    const panel = listOpen ? "worlds" : searchOpen ? "search" : aboutOpen ? "about" : "map";
    onPanel?.(panel);
  }, [aboutOpen, listOpen, onPanel, searchOpen]);

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => searchRef.current?.focus(), 40);
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (searchOpen) setSearchOpen(false);
      else if (listOpen) setListOpen(false);
      else if (aboutOpen) setAboutOpen(false);
      else if (selectedId) setSelectedId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aboutOpen, listOpen, searchOpen, selectedId]);

  const matches = useMemo(() => searchWorlds(query), [query]);
  const matchIds = useMemo(() => new Set(matches.map((world) => world.id)), [matches]);
  const selected = selectedId ? findWorld(selectedId) : undefined;
  const atmosphere = worldSignal ? getAtmosphereProfile(worldSignal.vibe, worldSignal.isDay) : getAtmosphereProfile("night", false);
  const style = {
    "--signal-sky": atmosphere.sky,
    "--signal-glow": atmosphere.glow,
    "--signal-horizon": atmosphere.horizon,
    "--signal-stars": String(atmosphere.starOpacity),
  } as CSSProperties;

  function selectWorld(world: GalaxyWorld) {
    if (drag.current?.moved) return;
    setDeparting(null);
    setSelectedId(world.id);
  }

  function enterWorld(world: GalaxyWorld) {
    setSelectedId(world.id);
    setDeparting(world.id);
    window.setTimeout(() => openWorld(navigate, world), 920);
  }

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("button, a, input")) {
      if ((event.target as HTMLElement).closest(".planet")) return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 1) drag.current = { x: event.clientX, y: event.clientY, originX: view.x, originY: view.y, moved: false };
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom: view.zoom };
      drag.current = null;
    }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      const next = clampZoom(pinch.current.zoom * (distance / pinch.current.distance));
      setView((current) => ({ ...current, zoom: next }));
      return;
    }
    if (!drag.current) return;
    const dx = event.clientX - drag.current.x;
    const dy = event.clientY - drag.current.y;
    if (Math.hypot(dx, dy) > 6) drag.current.moved = true;
    const originX = drag.current.originX;
    const originY = drag.current.originY;
    setView((current) => ({ ...current, x: originX + dx * 0.7, y: originY + dy * 0.7 }));
  }

  function onPointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    pointers.current.delete(event.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) {
      setDragging(false);
      window.setTimeout(() => { drag.current = null; }, 0);
    }
  }

  const hotIds = useMemo(() => {
    if (!hoveredId) return null;
    const ids = new Set<string>([hoveredId]);
    for (const link of galaxyRelationships) {
      if (link.source === hoveredId) ids.add(link.target);
      if (link.target === hoveredId) ids.add(link.source);
    }
    return ids;
  }, [hoveredId]);
  const points = useMemo(() => {
    const next = new Map<string, { x: number; y: number }>();
    for (const world of galaxyWorlds) {
      const drift = driftFor(world.id, motion);
      next.set(world.id, { x: world.x + drift.x, y: world.y + drift.y });
    }
    return next;
  }, [motion]);
  const searching = searchOpen && query.trim().length > 0;
  const focusId = selectedId ?? hoveredId;
  const focus = focusId ? findWorld(focusId) : undefined;
  const depth = focus ? worldDepth(focus.id) : 0;
  const focusPoint = focusId ? points.get(focusId) : undefined;
  const aim = departing ? 1 : selectedId ? 0.86 : hoveredId ? 0.2 : 0;
  const camX = view.x + ((50 - (focusPoint?.x ?? 50)) / 100) * mapSize.w * aim;
  const camY = view.y * 0.4 + ((38 - (focusPoint?.y ?? 38)) / 100) * mapSize.h * aim * 0.7;
  const camZ = departing ? 280 + depth * 40 : inFlight ? 190 + depth * 42 : selectedId ? 70 + depth * 78 : hoveredId ? depth * 16 : 0;
  const travelZoom = departing ? 1.55 + depth * 0.18 : inFlight ? 1.22 + depth * 0.14 : selectedId ? 1.06 + depth * 0.2 : hoveredId ? 1 + depth * 0.035 : 1;
  const zoom = Math.min(2.55, view.zoom * travelZoom);
  const pitch = departing ? 6 : inFlight ? 11 : 36 - aim * (10 + depth * 6);
  const yaw = Math.max(-12, Math.min(12, view.x * 0.01 - ((focusPoint?.x ?? 50) - 50) * aim * 0.08));
  const depthLabel = depth === 0 ? "NEAR FIELD" : depth === 1 ? "MID FIELD" : "DEEP FIELD";
  const pathIds = useMemo(() => {
    const ids = new Set<string>();
    if (!focusId) return ids;
    ids.add(focusId);
    let cursor = parentWorld(focusId);
    while (cursor) {
      ids.add(cursor.id);
      cursor = parentWorld(cursor.id);
    }
    return ids;
  }, [focusId]);

  const routeIndex = journeyById(journey)?.stops.indexOf(selectedId ?? "") ?? -1;

  return (
    <section
      id="galaxy"
      className={`galaxy${searching ? " is-searching" : ""}${contrast ? " is-contrast" : ""}${departing ? " is-departing" : ""}${inFlight ? " is-flight" : ""}${depth > 0 ? " is-travelling" : ""}${dragging ? " is-dragging" : ""}${constellations ? " show-groups" : ""}`}
      style={{ ...style, "--travel": String(depth + (departing ? 1.4 : 0)), "--pitch": String(pitch), "--ox": `${focusPoint?.x ?? 50}%`, "--oy": `${focusPoint?.y ?? 40}%` } as CSSProperties}
      aria-label="fourtee2 galaxy map"
    >
      <div className="galaxy-topline">
        <span>GALAXY // 001</span>
        <span>
          ONE HOUSE / {galaxyWorlds.length} WORLDS / {depthLabel}
        </span>
      </div>
      <div
        className="galaxy-map"
        ref={mapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onWheel={(event: WheelEvent) => event.preventDefault()}
      >
        <div className="galaxy-scene">
        <div
          className="galaxy-field"
          style={{
            transform: `translate3d(${camX}px, ${camY}px, ${camZ}px) rotateX(${pitch}deg) rotateY(${yaw}deg) scale(${zoom})`,
          }}
        >
          <div className="galaxy-disk" aria-hidden="true" />
          <div className="starfield starfield--far" aria-hidden="true">
            {dustStars.map((star, index) => (
              <i key={index} className="star" style={{ left: star.left, top: star.top, opacity: star.opacity, width: star.size, height: star.size, background: star.color, animationDelay: star.delay }} />
            ))}
          </div>
          <div className="starfield starfield--mid" aria-hidden="true">
            {midStars.map((star, index) => (
              <i key={index} className="star" style={{ left: star.left, top: star.top, opacity: star.opacity, width: star.size, height: star.size, background: star.color, animationDelay: star.delay }} />
            ))}
          </div>
          <div className="starfield starfield--near" aria-hidden="true">
            {brightStars.map((star, index) => (
              <i key={index} className="star star--bright" style={{ left: star.left, top: star.top, opacity: star.opacity, width: star.size, height: star.size, background: star.color, animationDelay: star.delay }} />
            ))}
          </div>
          <div className="travel-wash" aria-hidden="true" />
          <div className="region region--cluster" aria-hidden="true">
            <span>THE CLUSTER</span>
          </div>
          <div className="region region--void" aria-hidden="true">
            <span>THE VOID</span>
          </div>
          <div className="region region--family" aria-hidden="true">
            <span>THE FAMILY</span>
          </div>
          <div className="links3d" aria-hidden="true">
            {galaxyRelationships.map((link) => {
              const source = points.get(link.source) ?? findWorld(link.source);
              const target = points.get(link.target) ?? findWorld(link.target);
              const sourceWorld = findWorld(link.source);
              const targetWorld = findWorld(link.target);
              if (!source || !target || !sourceWorld || !targetWorld) return null;
              const za = depthZ(worldDepth(sourceWorld.id));
              const zb = depthZ(worldDepth(targetWorld.id));
              const dx = ((target.x - source.x) / 100) * mapSize.w;
              const dy = ((target.y - source.y) / 100) * mapSize.h;
              const midZ = (za + zb) / 2;
              const length = Math.hypot(dx, dy) || 1;
              const kind =
                sourceWorld.type === "star" || targetWorld.type === "star"
                  ? " is-cluster"
                  : sourceWorld.type === "world" || targetWorld.type === "world"
                    ? " is-void"
                    : "";
              const hot = (selectedId === link.source || selectedId === link.target) || (hotIds?.has(link.source) && hotIds.has(link.target));
              return (
                <i
                  key={`${link.source}-${link.target}`}
                  className={`link3d${hot ? " is-active" : ""}${kind}`}
                  style={{
                    left: `${source.x}%`,
                    top: `${source.y}%`,
                    width: `${length}px`,
                    transform: `translateZ(${midZ}px) rotateZ(${Math.atan2(dy, dx)}rad)`,
                  }}
                />
              );
            })}
          </div>
          {galaxyWorlds.map((world) => {
            const dimmed = searching && !matchIds.has(world.id);
            const quiet = Boolean(hotIds && !hotIds.has(world.id));
            const offPath = depth > 0 && !pathIds.has(world.id);
            const reach = worldDepth(world.id);
            return (
              <button
                key={world.id}
                type="button"
                className={`planet planet--${world.type}${selectedId === world.id ? " is-selected" : ""}${dimmed ? " is-dimmed" : ""}${quiet ? " is-quiet" : ""}${offPath ? " is-offpath" : ""}`}
                style={{ left: `${points.get(world.id)?.x ?? world.x}%`, top: `${points.get(world.id)?.y ?? world.y}%`, "--accent": world.color, "--scale": String(world.scale), "--depth": String(reach), "--z": String(depthZ(reach)) } as CSSProperties}
                onClick={() => selectWorld(world)}
                onDoubleClick={() => enterWorld(world)}
                onPointerEnter={() => setHoveredId(world.id)}
                onPointerLeave={(event) => {
                  setHoveredId(null);
                  event.currentTarget.style.removeProperty("--tilt-x");
                  event.currentTarget.style.removeProperty("--tilt-y");
                }}
                onPointerMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const x = (event.clientX - rect.left) / rect.width - 0.5;
                  const y = (event.clientY - rect.top) / rect.height - 0.5;
                  event.currentTarget.style.setProperty("--tilt-y", `${(x * 16).toFixed(1)}deg`);
                  event.currentTarget.style.setProperty("--tilt-x", `${(-y * 12).toFixed(1)}deg`);
                }}
                aria-pressed={selectedId === world.id}
              >
                <CelestialBody world={world} />
                <span className="planet-label">
                  <b className={isWordmark(worldLabel(world)) ? "wordmark" : undefined}>{worldLabel(world)}</b>
                  <small>{fieldTitle[worldField(world.id)]}</small>
                </span>
              </button>
            );
          })}
        </div>
        <div className="warp" aria-hidden="true">
          {warpRays.map((ray) => (
            <i key={ray} style={{ "--r": `${ray}deg`, animationDelay: `${(ray / 360) * 0.7}s` } as CSSProperties} />
          ))}
        </div>
        </div>
        {caption ? (
          <div className="pass" key={caption.title}>
            <p className="eyebrow">{caption.kicker}</p>
            <h2 className={isWordmark(caption.title) ? "wordmark" : undefined}>{caption.title}</h2>
            <p>{caption.line}</p>
          </div>
        ) : null}
      </div>
      {journeyById(journey) ? (
        <div className="journey" aria-label="Chosen journey">
          <span>{journeyById(journey)?.title}</span>
          <ol>
            {journeyById(journey)?.stops.map((id) => {
              const world = findWorld(id);
              if (!world) return null;
              return (
                <li key={id}>
                  <button type="button" className={selectedId === id ? "is-on" : ""} onClick={() => flyTo(world, journeyById(journey)?.title)} disabled={inFlight}>
                    {worldLabel(world)}
                  </button>
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            className="journey-next"
            disabled={inFlight || routeIndex < 0 || routeIndex >= (journeyById(journey)?.stops.length ?? 1) - 1}
            onClick={() => {
              const route = journeyById(journey);
              if (!route) return;
              const index = route.stops.indexOf(selectedId ?? "");
              const next = route.stops[Math.min(route.stops.length - 1, index + 1)];
              const world = next ? findWorld(next) : undefined;
              if (world && world.id !== selectedId) flyTo(world, route.title);
            }}
          >
            FURTHER
          </button>
        </div>
      ) : null}
      <div className="galaxy-controls" aria-label="Galaxy controls">
        <button type="button" onClick={() => setView((current) => ({ ...current, zoom: clampZoom(current.zoom + 0.12) }))} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => setView((current) => ({ ...current, zoom: clampZoom(current.zoom - 0.12) }))} aria-label="Zoom out">−</button>
        <button type="button" onClick={recenter}>CENTER</button>
        <button type="button" className={constellations ? "is-on" : ""} onClick={() => setConstellations((value) => !value)}>GROUPS</button>
        <button type="button" className={contrast ? "is-on" : ""} onClick={() => setContrast((value) => !value)}>CONTRAST</button>
      </div>
      <p className="galaxy-help">
        <span>DRAG · PINCH · SCROLL · DOUBLE-CLICK TO OPEN</span>
        <span>ZOOM {Math.round(zoom * 100)}% · {depthLabel}</span>
        <span>{worldSignal ? `${worldSignal.location} / ${worldSignal.vibe.toUpperCase()}` : "ORIGIN SIGNAL / NIGHT ORBIT"}</span>
      </p>
      <aside className="missions" aria-label="Current missions">
        <p>CURRENTLY IN ORBIT</p>
        {currentMissions.map((mission) => {
          const world = findWorld(mission.worldId);
          if (!world) return null;
          return (
            <button key={mission.worldId} type="button" onClick={() => selectWorld(world)}>
              <i style={{ background: world.color }} />
              <span>
                <b className={isWordmark(world.name) ? "wordmark" : undefined}>{world.name}</b>
                <small>{mission.detail}</small>
              </span>
              <em>{mission.status}</em>
            </button>
          );
        })}
      </aside>
      {selected && !inFlight && (
        <aside className="inspector" aria-live="polite">
          <button type="button" className="inspector-close" onClick={() => setSelectedId(null)} aria-label="Close world preview">
            CLOSE
          </button>
          <p className="eyebrow">
            {fieldTitle[worldField(selected.id)]} / {selected.type.toUpperCase()} / {selected.status}
          </p>
          <h2 className={isWordmark(selected.name) ? "wordmark" : undefined}>{selected.name}</h2>
          {parentWorld(selected.id) ? (
            <p className="eyebrow">UNDER {parentWorld(selected.id)?.name}</p>
          ) : null}
          <span className="chip" style={{ "--accent": selected.color } as CSSProperties}>
            {selected.category}
          </span>
          <p>{selected.description}</p>
          <blockquote>{worldMaterials[selected.id]?.observation}</blockquote>
          <button type="button" className="enter" onClick={() => enterWorld(selected)} disabled={Boolean(departing)}>
            {departing ? "APPROACHING" : "OPEN WORLD"} <b>→</b>
          </button>
        </aside>
      )}
      {searchOpen && (
        <section className="overlay" role="dialog" aria-modal="true" aria-label="Search the universe">
          <button type="button" className="overlay-close" onClick={() => setSearchOpen(false)}>CLOSE</button>
          <p className="eyebrow">SEARCH THE UNIVERSE</p>
          <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="world, product, idea" aria-label="Search worlds" />
          <small>{query.trim() ? `${matches.length} SIGNALS` : "TYPE TO SEARCH"}</small>
          <div className="overlay-list">
            {!query.trim() ? <p className="empty">SEARCH A WORLD, A FIELD, OR A NAME.</p> : null}
            {query.trim() && matches.length === 0 ? <p className="empty">NO SIGNAL MATCHES THAT NAME.</p> : null}
            {query.trim()
              ? matches.map((world) => (
              <button
                key={world.id}
                type="button"
                onClick={() => {
                  setSelectedId(world.id);
                  setSearchOpen(false);
                }}
              >
                <i style={{ background: world.color }} />
                <span className={isWordmark(world.name) ? "wordmark" : undefined}>{world.name}</span>
                <em>
                  {fieldTitle[worldField(world.id)]} / {world.type.toUpperCase()}
                </em>
              </button>
            ))
              : null}
          </div>
        </section>
      )}
      {listOpen && (
        <section className="overlay" role="dialog" aria-modal="true" aria-label="All worlds">
          <button type="button" className="overlay-close" onClick={() => setListOpen(false)}>CLOSE</button>
          <p className="eyebrow">ALL WORLDS</p>
          <div className="overlay-list">
            {fieldOrder.map((field) => (
              <div key={field}>
                <h3>{fieldTitle[field]}</h3>
                {galaxyWorlds
                  .filter((world) => worldField(world.id) === field)
                  .map((world) => (
                    <button
                      key={world.id}
                      type="button"
                      onClick={() => {
                        setSelectedId(world.id);
                        setListOpen(false);
                      }}
                    >
                      <i style={{ background: world.color }} />
                      <span className={isWordmark(world.name) ? "wordmark" : undefined}>{world.name}</span>
                      <em>{world.type.toUpperCase()}</em>
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </section>
      )}
      {aboutOpen && (
        <section className="overlay overlay-about" role="dialog" aria-modal="true" aria-label="About fourtee2">
          <button type="button" className="overlay-close" onClick={() => setAboutOpen(false)}>CLOSE</button>
          <p className="eyebrow">ABOUT / TRANSMISSION</p>
          <h2>
            ONE HOUSE.
            <br />
            THREE FIELDS.
          </h2>
          <blockquote>cdxi is a star, and the client work is part of that cluster. The fourtee2 family are planets. fleshsesh and what sits with it are new worlds, out in the void.</blockquote>
          <div className="about-grid">
            <span><b>CREATE</b>We build new things.</span>
            <span><b>CONNECT</b>Worlds influence one another.</span>
            <span><b>EXPLORE</b>Ideas are followed wherever they lead.</span>
          </div>
        </section>
      )}
    </section>
  );
}

function depthZ(reach: number) {
  return [36, -8, -64][reach] ?? -64;
}

function clampZoom(value: number) {
  return Math.min(1.75, Math.max(0.64, Number(value.toFixed(2))));
}
