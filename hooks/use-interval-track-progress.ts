import { useEffect, useMemo, useState } from "react";

import useInterval from "./use-interval";

export default function useIntervalTrackProgress(
	duration: number | undefined,
	progressMs: number,
	isPlaying: boolean
) {
	const [progress, setProgress] = useState(progressMs);
	const [isPaused, setIsPaused] = useState(false);

	const intervalDelay =
		(isPaused || progress === 0) && !isPlaying ? null : 1000;

	useInterval(
		() => !isPaused && isPlaying && setProgress((prev) => prev + 1000),
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
