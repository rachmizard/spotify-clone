import { useEffect, useMemo, useState } from "react";

import useInterval from "./use-interval";

export default function useIntervalTrackProgress(
	duration: number | undefined,
	progressMs: number,
	isPlaying: boolean
) {
	const [progress, setProgress] = useState(progressMs);
	const [stopProgressTrack, setStopProgressTrack] = useState(false);

	const intervalDelay =
		(stopProgressTrack || progressMs === 0 || progress === 0) && !isPlaying
			? null
			: 1000;

	useInterval(() => {
		if (!isPlaying) return;
		if (stopProgressTrack) return;

		setProgress((prev) => prev + 1000);
	}, intervalDelay);

	useEffect(() => {
		if (!isPlaying) return;
		if (stopProgressTrack) return;

		setProgress(progressMs);
	}, [progressMs, stopProgressTrack, isPlaying]);

	useEffect(() => {
		if (duration && progress >= duration) {
			setProgress(0);
		}
	}, [duration, progress]);

	const value = useMemo(
		() => ({ progress, stopProgressTrack, setStopProgressTrack }),
		[stopProgressTrack, progress]
	);

	return value;
}
