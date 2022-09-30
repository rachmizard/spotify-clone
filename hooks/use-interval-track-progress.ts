import { useEffect, useMemo, useState } from "react";

import useInterval from "./use-interval";

export default function useIntervalTrackProgress(
	duration: number | undefined,
	progressMs: number
) {
	const [progress, setProgress] = useState(progressMs);
	const [isPaused, setIsPaused] = useState(false);

	const intervalDelay =
		isPaused || progressMs === 0 || progress === 0 ? null : 1000;

	useInterval(
		() => !isPaused && setProgress((prev) => prev + 1000),
		intervalDelay
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
