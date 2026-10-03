import { createServerFn } from "@tanstack/react-start";

export type WeatherCurrent = {
  temperature_2m?: number;
  is_day?: number;
  weather_code?: number;
  cloud_cover?: number;
  wind_speed_10m?: number;
};

export const readAtmosphere = createServerFn({ method: "GET" })
  .validator((input: { latitude: number; longitude: number }) => {
    const latitude = Number(input?.latitude);
    const longitude = Number(input?.longitude);
    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) throw new Error("latitude");
    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) throw new Error("longitude");
    return { latitude, longitude };
  })
  .handler(async ({ data }): Promise<WeatherCurrent | null> => {
    try {
      const url = new URL("https://api.open-meteo.com/v1/forecast");
      url.searchParams.set("latitude", String(data.latitude));
      url.searchParams.set("longitude", String(data.longitude));
      url.searchParams.set("current", "temperature_2m,is_day,weather_code,cloud_cover,wind_speed_10m");
      url.searchParams.set("timezone", "auto");
      const response = await fetch(url);
      if (!response.ok) return null;
      const payload = (await response.json()) as { current?: WeatherCurrent };
      return payload.current ?? null;
    } catch {
      return null;
    }
  });
