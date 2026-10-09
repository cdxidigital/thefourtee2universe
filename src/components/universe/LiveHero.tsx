import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { LocalSky } from "@/components/universe/LocalSky";
import { readAtmosphere } from "@/lib/universe/weather";
import { journeys, type JourneyId } from "@/lib/universe/catalog";
import {
  describeVibe,
  getAtmosphereProfile,
  identifyVibe,
  readWorldSignal,
  saveWorldSignal,
  type SignalVibe,
  type WorldSignalSnapshot,
} from "@/lib/universe/atmosphere";

const PERTH = { latitude: -31.9523, longitude: 115.8613, label: "PERTH / ORIGIN SIGNAL" };

const fallback: WorldSignalSnapshot = {
  location: PERTH.label,
  temperature: null,
  wind: null,
  cloud: null,
  code: null,
  isDay: false,
  vibe: "night",
  updatedAt: null,
};

function formatClock(iso: string | null, origin: boolean) {
  const value = iso ? new Date(iso) : new Date();
  return new Intl.DateTimeFormat("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: origin ? "Australia/Perth" : undefined,
  }).format(value);
}

export function LiveHero({ onEnter }: { onEnter: (journey?: JourneyId) => void }) {
  const [place, setPlace] = useState(PERTH);
  const [signal, setSignal] = useState<WorldSignalSnapshot>(fallback);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("TUNING TO PERTH ATMOSPHERE");
  const [clock, setClock] = useState("—");
  const [launch, setLaunch] = useState<JourneyId | null>(null);
  const chosen = journeys.find((item) => item.id === launch);

  const loadSignal = useCallback(async (latitude: number, longitude: number, location: string) => {
    setBusy(true);
    setMessage("READING LIVE ATMOSPHERE");
    try {
      const current = await readAtmosphere({ data: { latitude, longitude } });
      if (!current) throw new Error("unavailable");
      const isDay = current.is_day === 1;
      const code = current.weather_code ?? null;
      const cloud = current.cloud_cover ?? null;
      const next: WorldSignalSnapshot = {
        location,
        temperature: current.temperature_2m ?? null,
        wind: current.wind_speed_10m ?? null,
        cloud,
        code,
        isDay,
        vibe: identifyVibe(code, cloud, isDay),
        updatedAt: new Date().toISOString(),
      };
      setSignal(next);
      saveWorldSignal(next);
      setPlace({ latitude, longitude, label: location });
      setMessage(`${describeVibe(next.vibe)} / LIVE`);
    } catch {
      const cached = readWorldSignal();
      if (cached) setSignal(cached);
      setMessage("LIVE SIGNAL UNAVAILABLE / ORBIT CONTINUES");
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    const cached = readWorldSignal();
    if (cached) setSignal(cached);
    void loadSignal(PERTH.latitude, PERTH.longitude, PERTH.label);
  }, [loadSignal]);

  useEffect(() => {
    const tick = () => setClock(formatClock(signal.updatedAt, signal.location === PERTH.label));
    tick();
    const timer = window.setInterval(tick, 30000);
    return () => window.clearInterval(timer);
  }, [signal.updatedAt, signal.location]);

  function begin(id: JourneyId) {
    if (launch) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLaunch(id);
    window.setTimeout(() => onEnter(id), calm ? 0 : 1680);
  }

  const useNearby = () => {
    if (!navigator.geolocation) {
      setMessage("NEARBY SIGNAL NOT SUPPORTED / PERTH REMAINS ACTIVE");
      return;
    }
    setMessage("REQUESTING NEARBY ATMOSPHERE");
    navigator.geolocation.getCurrentPosition(
      (position) => void loadSignal(position.coords.latitude, position.coords.longitude, "NEARBY / YOUR SIGNAL"),
      () => setMessage("LOCATION NOT SHARED / PERTH REMAINS ACTIVE"),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 },
    );
  };

  const profile = useMemo(() => getAtmosphereProfile(signal.vibe, signal.isDay), [signal.isDay, signal.vibe]);
  const style = {
    "--signal-sky": profile.sky,
    "--signal-glow": profile.glow,
    "--signal-horizon": profile.horizon,
    "--signal-stars": String(profile.starOpacity),
    "--signal-drift": String(profile.drift),
    "--world-wind": String(Math.min(1, Math.max(0.16, (signal.wind ?? 10) / 54))),
  } as CSSProperties;

  const temperature = signal.temperature === null ? "—" : `${Math.round(signal.temperature)}°C`;
  const wind = signal.wind === null ? "—" : `${Math.round(signal.wind)} km/h`;

  return (
    <section className={`hero vibe-${signal.vibe as SignalVibe}`} style={style} aria-labelledby="hero-title">
      <LocalSky latitude={place.latitude} longitude={place.longitude} place={place.label} starOpacity={profile.starOpacity} />
      <div className="hero-copy">
        <p className="eyebrow">A BRAND UNIVERSE / THE SKY FROM HERE</p>
        <h1 id="hero-title" className="wordmark hero-mark">
          fourtee2
        </h1>
        <p className="hero-statement">
          A universe of brands, ideas,
          <br />
          technology & experiences.
        </p>
        <div className="departures">
          <p className="eyebrow">FROM HERE / PICK A JOURNEY</p>
          {journeys.map((journey) => (
            <button key={journey.id} type="button" className="departure" onClick={() => begin(journey.id)} disabled={Boolean(launch)}>
              <b>{journey.title}</b>
              <span>{journey.line}</span>
            </button>
          ))}
          <button type="button" className="text-link" onClick={() => onEnter()} disabled={Boolean(launch)}>
            OR DRIFT THE MAP
          </button>
        </div>
      </div>
      <aside className="world-signal" aria-live="polite" aria-label="Live world signal">
        <div className="world-signal-head">
          <span>WORLD SIGNAL</span>
          <strong>{describeVibe(signal.vibe)}</strong>
        </div>
        <p>
          {signal.location} · {clock} · {temperature} · WIND {wind}
        </p>
        <small>{message}</small>
        <div className="world-signal-actions">
          <button type="button" onClick={() => void loadSignal(PERTH.latitude, PERTH.longitude, PERTH.label)} disabled={busy}>
            REFRESH PERTH
          </button>
          <button type="button" onClick={useNearby} disabled={busy}>
            USE MY ATMOSPHERE
          </button>
        </div>
      </aside>
      {chosen ? (
        <div className="lift" role="status">
          <div className="lift-warp" aria-hidden="true">
            {Array.from({ length: 16 }, (_, index) => (
              <i key={index} style={{ left: `${4 + index * 6}%`, animationDelay: `${(index % 5) * 0.11}s` }} />
            ))}
          </div>
          <div className="lift-copy">
            <p className="eyebrow">LEAVING THE GROUND</p>
            <h2>{chosen.title}</h2>
            <p>{chosen.line}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
