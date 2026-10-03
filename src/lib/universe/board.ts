export type SavedSignal = {
  sourceId: string;
  signalType: "destination" | "playlist" | "ritual";
  portal: "travel" | "music" | "you";
  title: string;
  subtitle?: string;
  href: string;
};

const KEY = "fourtee2-signals";

export function readSignals(): SavedSignal[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedSignal[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeSignals(signals: SavedSignal[]) {
  window.localStorage.setItem(KEY, JSON.stringify(signals));
  window.dispatchEvent(new CustomEvent("fourtee2:signals"));
}

export function removeSignal(signal: Pick<SavedSignal, "sourceId" | "signalType">) {
  const next = readSignals().filter((item) => !(item.sourceId === signal.sourceId && item.signalType === signal.signalType));
  writeSignals(next);
}

export function toggleSignal(signal: SavedSignal) {
  const current = readSignals();
  const exists = current.some((item) => item.sourceId === signal.sourceId && item.signalType === signal.signalType);
  const next = exists
    ? current.filter((item) => !(item.sourceId === signal.sourceId && item.signalType === signal.signalType))
    : [signal, ...current];
  writeSignals(next);
  return !exists;
}
