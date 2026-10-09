import { Link } from "@tanstack/react-router";
import { findWorld } from "@/lib/universe/catalog";

function Signal({ color = "currentColor" }: { color?: string }) {
  return (
    <svg className="media-signal" viewBox="0 0 72 72" aria-hidden="true">
      <g fill="none" stroke={color} strokeWidth="8" strokeLinecap="round">
        <path d="M16 50c8-10 8-18 0-28" />
        <path d="M30 58c14-16 14-30 0-46" />
        <path d="M44 66c20-22 20-40 0-62" />
      </g>
    </svg>
  );
}

function Lockup({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <p className={`media-lockup media-lockup--${tone}`}>
      <span>fourtee2</span>
      <span className="media-name">media</span>
      <Signal />
    </p>
  );
}

export function MediaWorld() {
  const music = findWorld("music");
  const others = findWorld("others");
  const projects = [music, others].filter((world) => world !== undefined);

  return (
    <main className="media-world">
      <header className="site-header">
        <Link to="/" search={{ galaxy: 1 }} className="wordmark">
          fourtee2
        </Link>
        <p className="header-note">PLANET / fourtee2media</p>
        <Link to="/" search={{ galaxy: 1 }} className="text-link">
          GALAXY
        </Link>
      </header>
      <section className="media-hero">
        <p className="media-kicker">THE MEDIA FIELD</p>
        <Lockup />
        <p className="media-lede">Sound and rooms. Both projects belong to fourtee2media.</p>
      </section>
      <section className="media-projects">
        {projects.map((world) =>
          world.url === "/music" ? (
            <Link key={world.id} to="/music" className="media-project">
              <small>PROJECT</small>
              <b>{world.name}</b>
              <span>{world.description}</span>
            </Link>
          ) : (
            <Link key={world.id} to="/worlds/$slug" params={{ slug: world.id }} className="media-project">
              <small>PROJECT</small>
              <b>{world.name}</b>
              <span>{world.description}</span>
            </Link>
          ),
        )}
      </section>
      <section className="media-reverse">
        <Lockup tone="paper" />
        <p>White lockup, for carbon black.</p>
      </section>
      <section className="media-palette" aria-label="Brand colors">
        <p className="media-kicker">FOURTEE BLUE / CARBON</p>
        <div>
          <span style={{ background: "#0055FF" }}>#0055FF</span>
          <span style={{ background: "#1A1A1A", color: "#fff" }}>#1A1A1A</span>
          <span style={{ background: "#8E8E93" }}>COOL GREY</span>
          <span style={{ background: "#8ECAFF" }}>SKY BLUE</span>
          <span style={{ background: "#F4F1EA", color: "#1A1A1A" }}>OFF-WHITE</span>
        </div>
      </section>
      <footer className="site-footer">
        <p>END OF MEDIA FIELD</p>
        <Link to="/worlds/$slug" params={{ slug: "fourtee2" }}>
          BACK TO THE FAMILY
        </Link>
      </footer>
    </main>
  );
}
