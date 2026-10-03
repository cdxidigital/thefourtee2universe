import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  airportValue,
  destinations,
  formatPlaybackTime,
  portals,
  ritualPhases,
  searchAirports,
  selectedPlaylist,
  travelPriorities,
  type Airport,
  type PlaylistTrack,
  type PortalKey,
} from "@/lib/universe/catalog";
import { SaveSignal } from "@/components/universe/SaveSignal";

export function PortalView({ portal }: { portal: PortalKey }) {
  const data = portals[portal];
  return (
    <div className={`portal portal--${data.key}`}>
      <header className="site-header">
        <Link to="/" search={{ galaxy: undefined }} className="wordmark" aria-label="Return to fourtee2">
          fourtee2
        </Link>
        <p className="header-note">{data.eyebrow}</p>
        <nav className="site-nav" aria-label="Portal navigation">
          <Link to="/travel" className={data.key === "travel" ? "is-current" : ""}>TRAVEL</Link>
          <Link to="/music" className={data.key === "music" ? "is-current" : ""}>MUSIC</Link>
          <Link to="/you" className={data.key === "you" ? "is-current" : ""}>YOU</Link>
          <span className="nav-split" aria-hidden="true" />
          <Link to="/board">BOARD</Link>
        </nav>
      </header>
      <main>
        <section className={`portal-hero portal-hero--${data.key}`}>
          <p className="eyebrow">{data.designation}</p>
          <h1 className="wordmark portal-mark">{data.wordmark}</h1>
          <p className="orbit">{data.orbit}</p>
          <a className="scroll-note" href="#manifest">READ FIELD NOTE</a>
          <p className="hero-status">{data.status}</p>
        </section>
        <section id="manifest" className="manifest">
          <div className="manifest-index">
            <p>FIELD NOTE</p>
            <span>{data.index}</span>
          </div>
          <div>
            <p className="eyebrow">MANIFEST / ACTIVE</p>
            <h2>{data.headline}</h2>
            <div className="manifest-body">
              <p>{data.intro}</p>
              <p>{data.note}</p>
            </div>
          </div>
        </section>
        {portal === "travel" && (
          <>
            <FieldNotes />
            <TravelIntelligence />
          </>
        )}
        {portal === "music" && <MusicPlayer />}
        {portal === "you" && <RitualInstrument />}
        <section className="axes">
          <div className="section-head">
            <p className="eyebrow">FIELD INTERFACE</p>
            <h2>{data.axisTitle}</h2>
            <p>Three ways into the field. Move in any order.</p>
          </div>
          <div className="axis-list">
            {data.axes.map((axis) => (
              <article key={axis.code}>
                <p className="eyebrow">{axis.code}</p>
                <h3>{axis.title}</h3>
                <p>{axis.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="log">
          <p className="eyebrow">ARCHIVE / 042</p>
          <h2>{data.logTitle}</h2>
          <ol>
            {data.log.map((entry) => (
              <li key={entry.sequence}>
                <span>{entry.sequence}</span>
                <div>
                  <h3>{entry.title}</h3>
                  <p>{entry.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <footer className="site-footer">
          <p>END OF CURRENT FIELD</p>
          <Link to="/" search={{ galaxy: undefined }} className="wordmark">
            fourtee2
          </Link>
          <span>RETURN TO THE UNIVERSE</span>
        </footer>
      </main>
    </div>
  );
}

function FieldNotes() {
  const [active, setActive] = useState(destinations[0]);
  return (
    <section className="notes" aria-labelledby="notes-title">
      <div className="section-head">
        <p className="eyebrow">LIVE FIELD NOTES</p>
        <h2 id="notes-title">
          Start anywhere.
          <br />
          Go everywhere.
        </h2>
      </div>
      <div className="notes-layout">
        <div className="notes-list" role="listbox" aria-label="Destination field notes">
          {destinations.map((destination) => (
            <button key={destination.id} type="button" className={active.id === destination.id ? "is-active" : ""} onClick={() => setActive(destination)} aria-pressed={active.id === destination.id}>
              <span>{destination.number}</span>
              <strong>{destination.name}</strong>
              <em>{destination.location}</em>
            </button>
          ))}
        </div>
        <div className="coord-map" aria-hidden="true">
          {destinations.map((destination) => (
            <button key={destination.id} type="button" tabIndex={-1} className={active.id === destination.id ? "pin is-active" : "pin"} style={{ left: `${destination.mapX}%`, top: `${destination.mapY}%` }} onClick={() => setActive(destination)}>
              {destination.number}
            </button>
          ))}
        </div>
        <article className="note-card">
          <p className="eyebrow">ACTIVE NOTE / {active.number}</p>
          <h3>{active.name}</h3>
          <span>
            {active.lat.toFixed(4)}° / {active.lng.toFixed(4)}°
          </span>
          <blockquote>{active.note}</blockquote>
          <SaveSignal
            signal={{
              signalType: "destination",
              portal: "travel",
              sourceId: `route-${active.id}`,
              title: active.name,
              subtitle: `${active.location} / field route`,
              href: "/travel",
            }}
          />
        </article>
      </div>
    </section>
  );
}

function AirportField({ id, label, value, onChange, placeholder }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const matches = searchAirports(value);

  const choose = (airport: Airport) => {
    onChange(airportValue(airport));
    setIndex(0);
    setOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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

  return (
    <label className="field">
      <span>{label}</span>
      <input
        id={id}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onChange={(event) => {
          onChange(event.target.value);
          setIndex(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 140)}
        onKeyDown={onKeyDown}
        required
      />
      {open && (
        <div className="suggest" id={`${id}-list`} role="listbox">
          {matches.length ? (
            matches.map((airport, itemIndex) => (
              <button key={airport.code} type="button" role="option" aria-selected={itemIndex === index} className={itemIndex === index ? "is-active" : ""} onMouseDown={(event) => { event.preventDefault(); choose(airport); }}>
                <strong>
                  {airport.city} <span>{airport.code}</span>
                </strong>
                <em>
                  {airport.airport} / {airport.country}
                </em>
              </button>
            ))
          ) : (
            <p>NO AIRPORT SIGNAL</p>
          )}
        </div>
      )}
    </label>
  );
}

function TravelIntelligence() {
  const [priority, setPriority] = useState<(typeof travelPriorities)[number]["id"]>("value");
  const active = travelPriorities.find((item) => item.id === priority) ?? travelPriorities[1];
  const [origin, setOrigin] = useState("Perth (PER)");
  const [destination, setDestination] = useState("");
  const [depart, setDepart] = useState("2026-10-14");
  const [ret, setRet] = useState("2026-10-21");
  const [people, setPeople] = useState("1 traveller");
  const [locked, setLocked] = useState("");
  const [note, setNote] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (ret < depart) {
      setLocked("");
      setNote("RETURN IS BEFORE DEPARTURE.");
      return;
    }
    setNote("");
    setLocked(`${origin.toUpperCase()} → ${destination.toUpperCase()} / ${active.label} / ${people.toUpperCase()} / ${depart}–${ret}`);
  };

  return (
    <section className="intel">
      <div className="section-head">
        <p className="eyebrow">TRAVEL INTELLIGENCE</p>
        <h2>Decide what the route means.</h2>
      </div>
      <form className="route-form" onSubmit={onSubmit}>
        <AirportField id="origin" label="ORIGIN" value={origin} onChange={setOrigin} placeholder="City or airport" />
        <AirportField id="destination" label="DESTINATION" value={destination} onChange={setDestination} placeholder="Where to?" />
        <label className="field">
          <span>DEPART</span>
          <input type="date" value={depart} onChange={(event) => setDepart(event.target.value)} required />
        </label>
        <label className="field">
          <span>RETURN</span>
          <input type="date" value={ret} min={depart} onChange={(event) => setRet(event.target.value)} required />
        </label>
        <label className="field">
          <span>TRAVELLERS</span>
          <select value={people} onChange={(event) => setPeople(event.target.value)}>
            <option>1 traveller</option>
            <option>2 travellers</option>
            <option>3 travellers</option>
            <option>4 travellers</option>
            <option>5+ travellers</option>
          </select>
        </label>
        <button type="submit" className="enter">
          SET ROUTE <b>→</b>
        </button>
        <p className={locked ? "route-status is-active" : "route-status"} aria-live="polite">
          {note && !locked ? note : locked ? `ROUTE SIGNAL LOCKED / ${locked}` : "ENTER THE COORDINATES. THE FIELD WILL HOLD THE INTENT."}
        </p>
      </form>
      {locked && (
        <SaveSignal
          signal={{
            signalType: "destination",
            portal: "travel",
            sourceId: locked,
            title: `${origin} → ${destination}`,
            subtitle: `${active.label} / ${people}`,
            href: "/travel",
          }}
        />
      )}
      <div className="priorities" role="tablist" aria-label="Travel priority">
        {travelPriorities.map((item) => (
          <button key={item.id} type="button" role="tab" aria-selected={priority === item.id} className={priority === item.id ? "is-active" : ""} onClick={() => setPriority(item.id)}>
            <span>{item.number}</span>
            <strong>{item.label}</strong>
          </button>
        ))}
      </div>
      <article className="readout">
        <p className="eyebrow">ACTIVE PRIORITY / {active.metric}</p>
        <h3>{active.title}</h3>
        <blockquote>{active.description}</blockquote>
      </article>
    </section>
  );
}

function MusicPlayer() {
  const [track, setTrack] = useState<PlaylistTrack>(selectedPlaylist.tracks[0]);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!playing) {
      audio.pause();
      return;
    }
    void audio.play().then(() => setFailed(false)).catch(() => {
      setPlaying(false);
      setFailed(true);
    });
  }, [playing, track.id]);

  const toggle = () => setPlaying((value) => !value);

  return (
    <section className="player" aria-labelledby="player-title">
      <div className="section-head">
        <p className="eyebrow">SELECTED PLAYLIST</p>
        <p>{selectedPlaylist.tracks.length} TRANSMISSIONS</p>
      </div>
      <div className="player-deck">
        <div>
          <h2 id="player-title" className="wordmark">
            4[music]2
          </h2>
          <p className="lede">{selectedPlaylist.title}. Select a transmission, then play it in the field.</p>
          <SaveSignal
            signal={{
              signalType: "playlist",
              portal: "music",
              sourceId: selectedPlaylist.id,
              title: selectedPlaylist.title,
              subtitle: "Selected transmissions",
              href: "/music",
            }}
          />
          <div className="queue" role="listbox" aria-label="Playlist">
            {selectedPlaylist.tracks.map((item, index) => (
              <button key={item.id} type="button" role="option" aria-selected={track.id === item.id} className={track.id === item.id ? "is-active" : ""} onClick={() => { setTrack(item); setPlaying(false); setTime(0); setFailed(false); }}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.title}</strong>
                <em>{item.detail}</em>
              </button>
            ))}
          </div>
        </div>
        <div className="deck">
          <p className="eyebrow">NOW PLAYING</p>
          <h3>{track.title}</h3>
          <span>{track.detail}</span>
          <div className={playing ? "bars is-on" : "bars"} aria-hidden="true">
            <i /><i /><i /><i /><i /><i /><i />
          </div>
          <audio
            ref={audioRef}
            key={track.id}
            preload="none"
            src={`https://cdn1.suno.ai/${track.id}.mp3`}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
            onEnded={() => {
              const index = selectedPlaylist.tracks.findIndex((item) => item.id === track.id);
              const next = selectedPlaylist.tracks[index + 1];
              if (!next) {
                setPlaying(false);
                return;
              }
              setTime(0);
              setFailed(false);
              setTrack(next);
            }}
            onError={() => setFailed(true)}
          />
          <div className="deck-controls">
            <button type="button" className="enter" onClick={toggle}>
              {playing ? "PAUSE SIGNAL" : "PLAY SIGNAL"}
            </button>
            <label className="timeline">
              <span>{formatPlaybackTime(time)}</span>
              <input
                type="range"
                min={0}
                max={duration || 1}
                step={0.1}
                value={Math.min(time, duration || 1)}
                aria-label={`Seek ${track.title}`}
                onChange={(event) => {
                  const next = Number(event.target.value);
                  if (audioRef.current) audioRef.current.currentTime = next;
                  setTime(next);
                }}
              />
              <span>{formatPlaybackTime(duration)}</span>
            </label>
            {failed && <p className="route-status">SIGNAL UNAVAILABLE ON THIS TRANSMISSION</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

function RitualInstrument() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const total = ritualPhases.reduce((sum, phase) => sum + phase.seconds, 0);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setElapsed((value) => (value + 1 >= total ? total : value + 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, total]);

  useEffect(() => {
    if (running && elapsed >= total) setRunning(false);
  }, [elapsed, running, total]);

  let cursor = elapsed;
  let phase: (typeof ritualPhases)[number] = ritualPhases[0];
  for (const item of ritualPhases) {
    if (cursor < item.seconds || item === ritualPhases[ritualPhases.length - 1]) {
      phase = item;
      break;
    }
    cursor -= item.seconds;
  }
  const remain = Math.max(0, phase.seconds - (elapsed >= total ? phase.seconds : cursor));

  return (
    <section className="ritual">
      <div className="section-head">
        <p className="eyebrow">RITUAL INSTRUMENT / 20:00</p>
        <h2>Hold one protocol.</h2>
      </div>
      <div className="ritual-panel">
        <p className="eyebrow">{phase.label}</p>
        <strong className="ritual-time">{formatPlaybackTime(remain)}</strong>
        <p>{elapsed >= total ? "Protocol complete. The field is quiet." : phase.cue}</p>
        <div className="ritual-actions">
          <button type="button" className="enter" onClick={() => setRunning((value) => !value)} disabled={elapsed >= total}>
            {running ? "PAUSE" : elapsed > 0 ? "RESUME" : "START"}
          </button>
          <button type="button" onClick={() => { setRunning(false); setElapsed(0); }}>
            RESET
          </button>
        </div>
        <ol className="ritual-phases">
          {ritualPhases.map((item) => (
            <li key={item.id} className={item.id === phase.id && elapsed < total ? "is-active" : ""}>
              <span>{item.label}</span>
              <em>{item.seconds / 60} MIN</em>
            </li>
          ))}
        </ol>
        <SaveSignal
          signal={{
            signalType: "ritual",
            portal: "you",
            sourceId: "protocol-20",
            title: "20-minute protocol",
            subtitle: "Prepare / perform / recover",
            href: "/you",
          }}
        />
      </div>
    </section>
  );
}
