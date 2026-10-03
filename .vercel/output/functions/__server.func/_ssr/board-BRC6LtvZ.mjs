//#region node_modules/.nitro/vite/services/ssr/assets/board-BRC6LtvZ.js
var KEY = "fourtee2-signals";
function readSignals() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function writeSignals(signals) {
	window.localStorage.setItem(KEY, JSON.stringify(signals));
	window.dispatchEvent(new CustomEvent("fourtee2:signals"));
}
function removeSignal(signal) {
	writeSignals(readSignals().filter((item) => !(item.sourceId === signal.sourceId && item.signalType === signal.signalType)));
}
function toggleSignal(signal) {
	const current = readSignals();
	const exists = current.some((item) => item.sourceId === signal.sourceId && item.signalType === signal.signalType);
	writeSignals(exists ? current.filter((item) => !(item.sourceId === signal.sourceId && item.signalType === signal.signalType)) : [signal, ...current]);
	return !exists;
}
//#endregion
export { removeSignal as n, toggleSignal as r, readSignals as t };
