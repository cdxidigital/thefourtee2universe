import { useEffect, useState } from "react";
import { projectSky } from "@/lib/universe/sky";

export function LocalSky({
  latitude,
  longitude,
  place,
  starOpacity,
}: {
  latitude: number;
  longitude: number;
  place: string;
  starOpacity: number;
}) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const timer = window.setInterval(tick, 20000);
    return () => window.clearInterval(timer);
  }, []);

  if (!now) {
    return <div className="local-sky" aria-hidden="true" style={{ opacity: Math.max(0.28, starOpacity) }} />;
  }

  const sky = projectSky(latitude, longitude, now);
  const ground = place.split("/")[0]?.trim() || "HERE";

  return (
    <div className="local-sky" aria-hidden="true" style={{ opacity: Math.max(0.28, starOpacity) }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {sky.lines.filter(([from, to]) => from.y < 50 && to.y < 50).map(([from, to]) => (
          <line key={`${from.id}-${to.id}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className="sky-line" />
        ))}
        {sky.stars.map((star) => (
          <g key={star.id}>
            <circle className="sky-star" cx={star.x} cy={star.y} r={Math.max(0.18, (2.15 - star.mag) * 0.22)} opacity={Math.max(0.35, 1 - star.mag * 0.18)} />
            {star.showName ? (
              <text className="sky-name" x={star.x + 0.8} y={star.y - 0.7}>
                {star.name}
              </text>
            ) : null}
          </g>
        ))}
        <line className="sky-horizon" x1="6" y1="52" x2="94" y2="52" />
        <text className="sky-facing" x="50" y="7">
          LOOKING {sky.facing}
        </text>
        <text className="sky-place" x="50" y="49">
          {ground}
        </text>
      </svg>
    </div>
  );
}
