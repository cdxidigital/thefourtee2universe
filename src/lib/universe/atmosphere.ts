export type SignalVibe = "day" | "night" | "cloud" | "rain" | "storm";

export type WorldSignalSnapshot = {
  location: string;
  temperature: number | null;
  wind: number | null;
  cloud: number | null;
  code: number | null;
  isDay: boolean;
  vibe: SignalVibe;
  updatedAt: string | null;
};

export type AtmosphereProfile = {
  sky: string;
  glow: string;
  horizon: string;
  starOpacity: number;
  drift: number;
};

const STORAGE_KEY = "fourtee2-world-signal";

export function identifyVibe(code: number | null, cloud: number | null, isDay: boolean): SignalVibe {
  if (code !== null && [95, 96, 99].includes(code)) return "storm";
  if (code !== null && [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
  if ((cloud ?? 0) > 68 || (code !== null && [45, 48].includes(code))) return "cloud";
  return isDay ? "day" : "night";
}

export function describeVibe(vibe: SignalVibe) {
  return {
    day: "CLEAR DAYLIGHT",
    night: "NIGHT ORBIT",
    cloud: "CLOUD VEIL",
    rain: "RAIN FREQUENCY",
    storm: "ELECTRIC FRONT",
  }[vibe];
}

export function getAtmosphereProfile(vibe: SignalVibe, isDay: boolean): AtmosphereProfile {
  const profiles: Record<SignalVibe, AtmosphereProfile> = {
    day: { sky: "#12213b", glow: "#4f8edb", horizon: "#162b4b", starOpacity: 0.48, drift: 0.3 },
    night: { sky: "#07091c", glow: "#5146b6", horizon: "#171332", starOpacity: 0.9, drift: 0.5 },
    cloud: { sky: "#111525", glow: "#777eaf", horizon: "#25283d", starOpacity: 0.66, drift: 0.38 },
    rain: { sky: "#0b1327", glow: "#4f66c8", horizon: "#111e43", starOpacity: 0.72, drift: 0.72 },
    storm: { sky: "#120b29", glow: "#9a5de0", horizon: "#241545", starOpacity: 0.78, drift: 0.92 },
  };
  return isDay && vibe === "night" ? profiles.day : profiles[vibe];
}

export function saveWorldSignal(signal: WorldSignalSnapshot) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(signal));
    window.dispatchEvent(new CustomEvent("fourtee2:world-signal", { detail: signal }));
  } catch {
    /* private browsing */
  }
}

export function readWorldSignal(): WorldSignalSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<WorldSignalSnapshot>;
    if (!parsed.location || !parsed.vibe || typeof parsed.isDay !== "boolean") return null;
    return {
      location: parsed.location,
      temperature: typeof parsed.temperature === "number" ? parsed.temperature : null,
      wind: typeof parsed.wind === "number" ? parsed.wind : null,
      cloud: typeof parsed.cloud === "number" ? parsed.cloud : null,
      code: typeof parsed.code === "number" ? parsed.code : null,
      isDay: parsed.isDay,
      vibe: parsed.vibe,
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : null,
    };
  } catch {
    return null;
  }
}
