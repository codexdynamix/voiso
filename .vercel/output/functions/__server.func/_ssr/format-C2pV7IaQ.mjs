//#region node_modules/.nitro/vite/services/ssr/assets/format-C2pV7IaQ.js
function formatDuration(total) {
	const safe = Math.max(0, total);
	const minutes = Math.floor(safe / 60);
	const seconds = safe % 60;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
function formatClock(date) {
	return date.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
//#endregion
export { formatDuration as n, formatClock as t };
