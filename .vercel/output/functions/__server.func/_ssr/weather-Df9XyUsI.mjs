import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/weather-Df9XyUsI.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var readAtmosphere_createServerFn_handler = createServerRpc({
	id: "7b364884de8a579608d6cc673bfbadd60c46c5f3e7ac7f68f390cf7455c9415f",
	name: "readAtmosphere",
	filename: "src/lib/universe/weather.ts"
}, (opts) => readAtmosphere.__executeServer(opts));
var readAtmosphere = createServerFn({ method: "GET" }).validator((input) => {
	const latitude = Number(input?.latitude);
	const longitude = Number(input?.longitude);
	if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) throw new Error("latitude");
	if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) throw new Error("longitude");
	return {
		latitude,
		longitude
	};
}).handler(readAtmosphere_createServerFn_handler, async ({ data }) => {
	try {
		const url = new URL("https://api.open-meteo.com/v1/forecast");
		url.searchParams.set("latitude", String(data.latitude));
		url.searchParams.set("longitude", String(data.longitude));
		url.searchParams.set("current", "temperature_2m,is_day,weather_code,cloud_cover,wind_speed_10m");
		url.searchParams.set("timezone", "auto");
		const response = await fetch(url);
		if (!response.ok) return null;
		return (await response.json()).current ?? null;
	} catch {
		return null;
	}
});
//#endregion
export { readAtmosphere_createServerFn_handler };
