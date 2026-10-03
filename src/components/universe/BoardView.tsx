import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { readSignals, removeSignal, type SavedSignal } from "@/lib/universe/board";

export function BoardView() {
  const [ready, setReady] = useState(false);
  const [signals, setSignals] = useState<SavedSignal[]>([]);

  useEffect(() => {
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

  return (
    <main className="board">
      <header className="site-header">
        <Link to="/" search={{ galaxy: undefined }} className="wordmark">
          fourtee2
        </Link>
        <p className="header-note">SIGNAL BOARD / THIS DEVICE</p>
        <Link to="/" search={{ galaxy: 1 }} className="text-link">
          GALAXY
        </Link>
      </header>
      <section className="board-hero">
        <p className="eyebrow">MY COORDINATES</p>
        <h1>
          Keep what
          <br />
          changes the field.
        </h1>
        <p>Routes, transmissions and rituals you save stay on this device. Nothing is sent anywhere else.</p>
      </section>
      {!ready ? (
        <p className="empty">CALIBRATING SIGNAL BOARD</p>
      ) : (
        <section className="board-groups">
          <Group title="01 / SAVED ROUTES" href="/travel" action="FIND A TRIP" items={routes} empty="NO SAVED ROUTES YET. LOCK A FIELD NOTE OR A ROUTE, THEN SAVE IT." />
          <Group title="02 / SAVED MUSIC" href="/music" action="PLAY MUSIC" items={music} empty="NO SAVED MUSIC YET. OPEN THE LISTENING FIELD AND KEEP THE PLAYLIST." />
          <Group title="03 / SAVED RITUALS" href="/you" action="OPEN PROTOCOL" items={rituals} empty="NO SAVED RITUALS YET. START THE 20-MINUTE PROTOCOL AND HOLD IT HERE." />
        </section>
      )}
    </main>
  );
}

function Group({ title, href, action, items, empty }: { title: string; href: "/travel" | "/music" | "/you"; action: string; items: SavedSignal[]; empty: string }) {
  return (
    <div className="board-group">
      <div className="section-head">
        <p className="eyebrow">{title}</p>
        <Link to={href}>{action}</Link>
      </div>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li key={`${item.signalType}-${item.sourceId}`}>
              <Link to={item.href === "/travel" ? "/travel" : item.href === "/music" ? "/music" : item.href === "/you" ? "/you" : "/board"}>
                <strong>{item.title}</strong>
                <span>{item.subtitle}</span>
              </Link>
              <button type="button" onClick={() => removeSignal(item)}>RELEASE</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">{empty}</p>
      )}
    </div>
  );
}
