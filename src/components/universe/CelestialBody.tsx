import type { CSSProperties } from "react";
import type { GalaxyWorld } from "@/lib/universe/catalog";

const surfaces: Record<string, { texture: string; ring?: boolean }> = {
  haus: {
    ring: true,
    texture:
      "radial-gradient(ellipse at 50% 42%, rgba(255,236,206,0.35), transparent 46%), linear-gradient(180deg, #cbb48a 0%, #a48458 22%, #e4d2ae 41%, #8d6b42 58%, #c4a36e 74%, #6d5334 100%)",
  },
  fourtee2: {
    texture:
      "radial-gradient(circle at 34% 46%, rgba(90,140,110,0.85) 0 18%, transparent 19%), radial-gradient(circle at 58% 40%, rgba(230,238,242,0.7) 0 14%, transparent 16%), linear-gradient(165deg, #9ec4d4, #2c6490 46%, #16324e)",
  },
  travel: {
    texture: "radial-gradient(circle at 40% 38%, #e4c49a, transparent 42%), linear-gradient(160deg, #c49a62, #8a5a32 55%, #4e301c)",
  },
  music: {
    ring: true,
    texture: "linear-gradient(180deg, #6e6490 0%, #3a3458 28%, #8a80a8 46%, #2a2644 68%, #514868 100%)",
  },
  you: {
    texture: "radial-gradient(circle at 38% 36%, #e4c4d4, transparent 40%), linear-gradient(155deg, #c49aaa, #6a445c 52%, #2a1824)",
  },
  fourtee2digital: {
    texture: "linear-gradient(160deg, #e4eef2, #8eb4c4 34%, #3a6a80 68%, #122830)",
  },
  cinevo: {
    texture: "radial-gradient(circle at 36% 34%, rgba(180,220,220,0.45), transparent 28%), linear-gradient(165deg, #3a8a96, #123e48 48%, #061820)",
  },
  fourtee2labs: {
    texture:
      "radial-gradient(circle at 28% 34%, rgba(0,0,0,0.28) 0 5%, transparent 6%), radial-gradient(circle at 62% 58%, rgba(0,0,0,0.22) 0 7%, transparent 8%), linear-gradient(200deg, #d2c0a0, #8a7048 50%, #4a3420)",
  },
  "origin-atlas": {
    texture: "linear-gradient(200deg, #d8c4a4, #8a6840 55%, #3e2a18)",
  },
  fleshsesh: {
    texture: "radial-gradient(circle at 42% 40%, #c490a8, transparent 32%), linear-gradient(165deg, #6a4458, #2a1824 60%, #100810)",
  },
  academy: {
    texture: "linear-gradient(155deg, #e4d0d8, #a08090 48%, #4a3844)",
  },
  meat: {
    texture: "linear-gradient(165deg, #a07068, #6a3830 50%, #2a1412)",
  },
  "sinorgy-models": {
    ring: true,
    texture: "linear-gradient(160deg, #a08098, #5a3858 48%, #241420)",
  },
};

export function CelestialBody({ world }: { world: GalaxyWorld }) {
  const body = surfaces[world.id];
  const spin = `${26 + (world.id.length % 8) * 5}s`;
  return (
    <span className={`planet-stage planet-stage--${world.type}${body?.ring ? " has-ring" : ""}`}>
      <span className="planet-glow" />
      {body?.ring ? <span className="planet-ring" /> : null}
      <span className="planet-body">
        <span
          className="planet-surface"
          style={{ background: body?.texture, animationDuration: spin } as CSSProperties}
        />
        <span className="planet-shade" />
      </span>
    </span>
  );
}
