export function convertMillieSecondToStringMinutes(ms: number | undefined) {
	if (!ms) return "0:00";

	const minutes = Math.floor(ms / 60000);
	const seconds = ((ms % 60000) / 1000).toFixed(0);
	return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
}

export function convertMillisecondToPercentage(
	ms: number,
	duration: number
): string {
	if (!ms) return "0%";

	const percentage = (ms / duration) * 100;
	return `${percentage}%`;
}
