export default function differenceTime(stringDate: string) {
	const parsedDate = Date.parse(stringDate);
	const date = new Date(parsedDate);
	const now = new Date();
	const diff = Math.abs(now.getTime() - date.getTime());
	const diffDays = Math.floor(diff / (1000 * 3600 * 24));
	const diffHours = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
	const diffMinutes = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
	const diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);

	if (diffDays > 0) {
		return `${diffDays}d`;
	} else if (diffHours > 0) {
		return `${diffHours}h`;
	} else if (diffMinutes > 0) {
		return `${diffMinutes}m`;
	} else if (diffSeconds > 0) {
		return `${diffSeconds}s`;
	} else {
		return "now";
	}
}
