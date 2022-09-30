import { useEffect, useMemo, useState } from "react";

import useInterval from "./use-interval";

export default function useIntervalTrackProgress(
	duration: number | undefined,
	progressMs: number
) {
	const [progress, setProgress] = useState(progressMs);
	const [isPaused, setIsPaused] = useState(false);

	useInterval(
		() => !isPaused && setProgress((prev) => prev + 1000),
		isPaused ? null : 1000
	);

	useEffect(() => {
		if (isPaused) return;

		setProgress(progressMs);
	}, [progressMs, isPaused]);

	useEffect(() => {
		if (duration && progress >= duration) {
			setProgress(0);
		}
	}, [duration, progress]);

	const value = useMemo(
		() => ({ progress, isPaused, setIsPaused }),
		[isPaused, progress]
	);

	return value;
}
