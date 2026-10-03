import { useEffect, useState } from "react";
import { readSignals, toggleSignal, type SavedSignal } from "@/lib/universe/board";

export function SaveSignal({ signal }: { signal: SavedSignal }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => {
      setSaved(readSignals().some((item) => item.sourceId === signal.sourceId && item.signalType === signal.signalType));
    };
    sync();
    window.addEventListener("fourtee2:signals", sync);
    return () => window.removeEventListener("fourtee2:signals", sync);
  }, [signal.sourceId, signal.signalType]);

  return (
    <button
      type="button"
      className={saved ? "save-signal is-saved" : "save-signal"}
      aria-pressed={saved}
      onClick={() => setSaved(toggleSignal(signal))}
    >
      <span>{saved ? "SAVED TO MY BOARD" : "SAVE TO MY BOARD"}</span>
      <b>{saved ? "●" : "+"}</b>
    </button>
  );
}
