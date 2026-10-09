import { useCallback, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { GalaxyExplorer, type NavIntent } from "@/components/universe/Galaxy";
import { LiveHero } from "@/components/universe/LiveHero";
import { type JourneyId } from "@/lib/universe/catalog";

export function HomeUniverse({ entered, journey }: { entered: boolean; journey?: JourneyId }) {
  const navigate = useNavigate();
  const [intent, setIntent] = useState<NavIntent>(null);
  const [panel, setPanel] = useState<Exclude<NavIntent, null>>("map");
  const current = entered ? panel : null;

  const enter = useCallback((next?: JourneyId) => {
    void navigate({ to: "/", search: { galaxy: 1, journey: next } });
  }, [navigate]);

  const request = useCallback(
    (next: Exclude<NavIntent, null>) => {
      setIntent(next);
      if (!entered) enter();
    },
    [enter, entered],
  );

  return (
    <div className={entered ? "shell is-entered" : "shell"}>
      <header className="site-header">
        <button type="button" className="wordmark" onClick={() => request("map")}>
          fourtee2
        </button>
        <nav className="site-nav" aria-label="Galaxy navigation">
          <button type="button" className={current === "map" ? "is-current" : ""} onClick={() => request("map")}>MAP</button>
          <button type="button" className={current === "worlds" ? "is-current" : ""} onClick={() => request("worlds")}>WORLDS</button>
          <button type="button" className={current === "search" ? "is-current" : ""} onClick={() => request("search")}>SEARCH</button>
          <button type="button" className={current === "about" ? "is-current" : ""} onClick={() => request("about")}>ABOUT</button>
          <span className="nav-split" aria-hidden="true" />
          <Link to="/board">BOARD</Link>
        </nav>
      </header>
      <main>
        {entered ? (
          <GalaxyExplorer journey={journey} navIntent={intent} onIntentHandled={() => setIntent(null)} onPanel={setPanel} />
        ) : (
          <LiveHero onEnter={enter} />
        )}
      </main>
      {!entered ? (
        <footer className="site-footer">
          <p>TRANSMISSION COMPLETE</p>
          <button type="button" className="wordmark" onClick={() => request("map")}>
            fourtee2
          </button>
          <span>THE UNIVERSE IS STILL EXPANDING.</span>
        </footer>
      ) : null}
    </div>
  );
}