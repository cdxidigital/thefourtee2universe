import catalog from "./stars.json" with { type: "json" };

export type SkyStar = {
  id: string;
  name?: string;
  ra: number;
  dec: number;
  mag: number;
};

export type PlacedStar = SkyStar & {
  x: number;
  y: number;
  alt: number;
  showName: boolean;
};

const NAMED: SkyStar[] = [
  { id: "sirius", name: "Sirius", ra: 101.29, dec: -16.72, mag: -1.46 },
  { id: "canopus", name: "Canopus", ra: 95.99, dec: -52.7, mag: -0.74 },
  { id: "acen", name: "Rigil", ra: 219.9, dec: -60.83, mag: -0.27 },
  { id: "arcturus", name: "Arcturus", ra: 213.92, dec: 19.18, mag: -0.05 },
  { id: "vega", name: "Vega", ra: 279.23, dec: 38.78, mag: 0.03 },
  { id: "capella", name: "Capella", ra: 79.17, dec: 46.0, mag: 0.08 },
  { id: "rigel", name: "Rigel", ra: 78.63, dec: -8.2, mag: 0.13 },
  { id: "procyon", name: "Procyon", ra: 114.83, dec: 5.22, mag: 0.34 },
  { id: "achernar", name: "Achernar", ra: 24.43, dec: -57.24, mag: 0.46 },
  { id: "betelgeuse", name: "Betelgeuse", ra: 88.79, dec: 7.41, mag: 0.5 },
  { id: "bcen", name: "Hadar", ra: 210.96, dec: -60.37, mag: 0.61 },
  { id: "altair", name: "Altair", ra: 297.7, dec: 8.87, mag: 0.77 },
  { id: "acrux", name: "Acrux", ra: 186.65, dec: -63.1, mag: 0.77 },
  { id: "aldebaran", name: "Aldebaran", ra: 68.98, dec: 16.51, mag: 0.85 },
  { id: "antares", name: "Antares", ra: 247.35, dec: -26.43, mag: 1.06 },
  { id: "spica", name: "Spica", ra: 201.3, dec: -11.16, mag: 0.97 },
  { id: "pollux", name: "Pollux", ra: 116.33, dec: 28.03, mag: 1.14 },
  { id: "fomalhaut", name: "Fomalhaut", ra: 344.41, dec: -29.62, mag: 1.16 },
  { id: "deneb", name: "Deneb", ra: 310.36, dec: 45.28, mag: 1.25 },
  { id: "mimosa", name: "Mimosa", ra: 191.93, dec: -59.69, mag: 1.25 },
  { id: "regulus", name: "Regulus", ra: 152.09, dec: 11.97, mag: 1.4 },
  { id: "adhara", name: "Adhara", ra: 104.66, dec: -28.97, mag: 1.5 },
  { id: "castor", name: "Castor", ra: 113.65, dec: 31.89, mag: 1.58 },
  { id: "gacrux", name: "Gacrux", ra: 187.79, dec: -57.11, mag: 1.63 },
  { id: "shaula", name: "Shaula", ra: 263.4, dec: -37.1, mag: 1.62 },
  { id: "bellatrix", name: "Bellatrix", ra: 81.28, dec: 6.35, mag: 1.64 },
  { id: "elnath", name: "Elnath", ra: 81.57, dec: 28.61, mag: 1.65 },
  { id: "miaplacidus", name: "Miaplacidus", ra: 138.3, dec: -69.72, mag: 1.67 },
  { id: "alnilam", name: "Alnilam", ra: 84.05, dec: -1.2, mag: 1.69 },
  { id: "alnitak", name: "Alnitak", ra: 85.19, dec: -1.94, mag: 1.77 },
  { id: "alnair", name: "Alnair", ra: 332.06, dec: -46.96, mag: 1.74 },
  { id: "kaus", name: "Kaus Australis", ra: 276.04, dec: -34.38, mag: 1.85 },
  { id: "avior", name: "Avior", ra: 125.63, dec: -59.51, mag: 1.86 },
  { id: "peacock", name: "Peacock", ra: 306.41, dec: -56.74, mag: 1.94 },
  { id: "dcru", ra: 183.79, dec: -58.75, mag: 2.79 },
  { id: "mintaka", ra: 83.0, dec: -0.3, mag: 2.23 },
  { id: "saiph", ra: 86.94, dec: -9.67, mag: 2.06 },
  { id: "wezen", ra: 107.1, dec: -26.39, mag: 1.83 },
  { id: "nunki", ra: 283.82, dec: -26.3, mag: 2.05 },
  { id: "atria", ra: 252.17, dec: -69.03, mag: 1.91 },
  { id: "sargas", ra: 264.33, dec: -42.99, mag: 1.86 },
];

function angular(ra1: number, dec1: number, ra2: number, dec2: number) {
  const ra = ((ra1 - ra2) * Math.PI) / 180;
  const d1 = (dec1 * Math.PI) / 180;
  const d2 = (dec2 * Math.PI) / 180;
  const haversine = Math.sin((d2 - d1) / 2) ** 2 + Math.cos(d1) * Math.cos(d2) * Math.sin(ra / 2) ** 2;
  return (2 * Math.asin(Math.min(1, Math.sqrt(haversine))) * 180) / Math.PI;
}

const field: SkyStar[] = catalog
  .filter((row) => !NAMED.some((star) => angular(star.ra, star.dec, row.ra, row.dec) < 0.8))
  .map((row, index) => ({ id: `c${index}`, ra: row.ra, dec: row.dec, mag: row.mag }));

export const skyStars: SkyStar[] = [...NAMED, ...field];

export const skyLines: Array<[string, string]> = [
  ["acrux", "mimosa"],
  ["mimosa", "gacrux"],
  ["gacrux", "dcru"],
  ["dcru", "acrux"],
  ["acen", "bcen"],
  ["betelgeuse", "bellatrix"],
  ["bellatrix", "rigel"],
  ["rigel", "saiph"],
  ["saiph", "betelgeuse"],
  ["alnitak", "alnilam"],
  ["alnilam", "mintaka"],
  ["antares", "shaula"],
  ["shaula", "sargas"],
  ["kaus", "nunki"],
  ["canopus", "miaplacidus"],
  ["miaplacidus", "avior"],
];

const LABELS = new Set(["sirius", "canopus", "acen", "acrux", "achernar", "antares", "spica", "rigel", "fomalhaut", "vega", "altair", "hadar"]);

function wrap(deg: number) {
  return ((((deg + 180) % 360) + 360) % 360) - 180;
}

export function localSiderealDegrees(date: Date, longitude: number) {
  const julian = date.getTime() / 86400000 + 2440587.5;
  const days = julian - 2451545.0;
  const gst = 280.46061837 + 360.98564736629 * days;
  return ((gst + longitude) % 360 + 360) % 360;
}

export function horizontal(star: SkyStar, latitude: number, sidereal: number) {
  const hourAngle = ((sidereal - star.ra) * Math.PI) / 180;
  const lat = (latitude * Math.PI) / 180;
  const dec = (star.dec * Math.PI) / 180;
  const sinAlt = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(hourAngle);
  const alt = Math.asin(Math.max(-1, Math.min(1, sinAlt)));
  const azimuth = Math.atan2(-Math.sin(hourAngle), Math.tan(dec) * Math.cos(lat) - Math.sin(lat) * Math.cos(hourAngle));
  return { alt: (alt * 180) / Math.PI, az: ((azimuth * 180) / Math.PI + 360) % 360 };
}

export function skyView(latitude: number) {
  const south = latitude < 0;
  return { center: south ? 180 : 0, facing: south ? "SOUTH" : "NORTH", fov: 210 };
}

export function projectSky(latitude: number, longitude: number, date: Date) {
  const sidereal = localSiderealDegrees(date, longitude);
  const { center, facing, fov } = skyView(latitude);
  const byId = new Map<string, PlacedStar>();
  const stars: PlacedStar[] = [];

  for (const star of skyStars) {
    const { alt, az } = horizontal(star, latitude, sidereal);
    const delta = wrap(az - center);
    if (alt < 2 || Math.abs(delta) > fov / 2) continue;
    const placed: PlacedStar = {
      ...star,
      alt,
      x: 50 + (delta / (fov / 2)) * 48,
      y: 52 - (Math.min(alt, 80) / 80) * 44,
      showName: Boolean(star.name && LABELS.has(star.id) && alt > 18),
    };
    stars.push(placed);
    byId.set(star.id, placed);
  }

  const named = stars.filter((star) => star.showName).sort((a, b) => a.mag - b.mag);
  const keep = new Set(named.slice(0, 6).map((star) => star.id));
  for (const star of stars) star.showName = keep.has(star.id) && star.y < 40;

  const lines = skyLines.flatMap(([a, b]) => {
    const from = byId.get(a);
    const to = byId.get(b);
    return from && to ? [[from, to] as [PlacedStar, PlacedStar]] : [];
  });

  return { stars, lines, facing };
}
