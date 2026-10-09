import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { findWorld, galaxyRelationships, isWordmark, worldMaterials, worldSystems, type GalaxyWorld } from "@/lib/universe/catalog";
import { CelestialBody } from "@/components/universe/CelestialBody";
import { MediaWorld } from "@/components/universe/MediaWorld";
import { getAtmosphereProfile, readWorldSignal, type WorldSignalSnapshot } from "@/lib/universe/atmosphere";

function RelatedWorld({ world }: { world: GalaxyWorld }) {
  const className = isWordmark(world.name) ? "wordmark" : undefined;
  if (world.url === "/travel") return <Link to="/travel" className={className}>{world.name}</Link>;
  if (world.url === "/music") return <Link to="/music" className={className}>{world.name}</Link>;
  if (world.url === "/you") return <Link to="/you" className={className}>{world.name}</Link>;
  return (
    <Link to="/worlds/$slug" params={{ slug: world.id }} className={className}>
      {world.name}
    </Link>
  );
}

export function WorldView({ slug }: { slug: string }) {
  const world = findWorld(slug);
  const material = world ? worldMaterials[world.id] : undefined;
  const systems = world ? worldSystems[world.id] ?? [] : [];
  const [active, setActive] = useState<string | null>(null);
  const [signal, setSignal] = useState<WorldSignalSnapshot | null>(null);

  useEffect(() => {
    setSignal(readWorldSignal());
    const refresh = () => setSignal(readWorldSignal());
    window.addEventListener("fourtee2:world-signal", refresh);
    return () => window.removeEventListener("fourtee2:world-signal", refresh);
  }, []);

  const atmosphere = useMemo(
    () => (signal ? getAtmosphereProfile(signal.vibe, signal.isDay) : getAtmosphereProfile("night", false)),
    [signal],
  );

  if (!world || !material) {
    return (
      <main className="missing">
        <p className="eyebrow">WORLD SIGNAL NOT FOUND</p>
        <Link to="/" search={{ galaxy: 1 }} className="enter">
          RETURN TO GALAXY
        </Link>
      </main>
    );
  }

  if (world.id === "fourtee2media") return <MediaWorld />;

  const links = galaxyRelationships.filter((link) => link.source === world.id || link.target === world.id);
  const style = {
    "--accent": world.color,
    "--signal-sky": atmosphere.sky,
    "--signal-glow": atmosphere.glow,
  } as CSSProperties;

  return (
    <main className="world" style={style}>
      <header className="site-header">
        <Link to="/" search={{ galaxy: 1 }} className="wordmark">
          fourtee2
        </Link>
        <p className="header-note">
          {world.type.toUpperCase()} / {world.name}
        </p>
        <Link to="/" search={{ galaxy: 1 }} className="text-link">
          GALAXY
        </Link>
      </header>
      <section className="world-hero">
        <div className="world-orb" aria-hidden="true">
          <CelestialBody world={world} />
        </div>
        <div>
          <p className="eyebrow">
            {world.type.toUpperCase()} / {world.status} / {world.category}
          </p>
          <h1 className={isWordmark(world.name) ? "wordmark" : undefined}>{world.name}</h1>
          <blockquote>{material.observation}</blockquote>
          <p>{material.fieldNote}</p>
          <p className="eyebrow">{signal ? `${signal.location} / ${signal.vibe.toUpperCase()}` : "ORIGIN / NIGHT ORBIT"}</p>
          {world.url !== `/worlds/${world.id}` && (
            <Link to={world.url === "/travel" ? "/travel" : world.url === "/music" ? "/music" : "/you"} className="enter">
              OPEN LIVE FIELD
            </Link>
          )}
        </div>
      </section>
      <section className="systems">
        <div className="section-head">
          <p className="eyebrow">SYSTEMS</p>
          <span>{systems.length} MODULES</span>
        </div>
        <div className="system-grid">
          {systems.map((system, index) => (
            <article key={system.id} className={active === system.id ? "is-active" : ""}>
              <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
              <h2>{system.title}</h2>
              <p>{system.description}</p>
              <button type="button" onClick={() => setActive(active === system.id ? null : system.id)} aria-expanded={active === system.id}>
                {system.actionLabel}
              </button>
              {active === system.id && <p className="system-detail">{system.detail}</p>}
            </article>
          ))}
        </div>
        <div className="nodes">
          {world.children.map((child) => (
            <span key={child}>{child}</span>
          ))}
        </div>
      </section>
      <section className="relations">
        <p className="eyebrow">RELATIONSHIPS</p>
        {links.length ? (
          links.map((link) => {
            const otherId = link.source === world.id ? link.target : link.source;
            const other = findWorld(otherId);
            return (
              <p key={`${link.source}-${link.target}`}>
                {other ? <RelatedWorld world={other} /> : <span>{otherId}</span>}
                <b>{link.relationshipType}</b>
              </p>
            );
          })
        ) : (
          <p>NO EXTERNAL PATHS LOCKED</p>
        )}
      </section>
      <footer className="site-footer">
        <p>END OF WORLD VIEW</p>
        <Link to="/" search={{ galaxy: 1 }} className="wordmark">
          fourtee2
        </Link>
      </footer>
    </main>
  );
}
