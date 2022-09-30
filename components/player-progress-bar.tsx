import { usePlaybackContext } from "@/context/playback-context";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import { useGetPlaybackState } from "@/hooks/spotify";
import { useIntervalTrackProgress } from "@/hooks";

import {
	convertMillieSecondToStringMinutes,
	convertMillisecondToPercentage,
} from "@/lib/utils/converter";

export default function PlayerProgressBar() {
	const queryClient = useQueryClient();
	const { isActive, isPaused, player, state } = usePlaybackContext();
	const { data: externalState } = useGetPlaybackState({
		enabled: isActive && !isPaused,
		refetchInterval: 10000,
	});

	const duration = state?.duration || externalState?.item?.duration_ms || 0;
	const currentProgress = state?.position || externalState?.progress_ms || 0;

	const { progress, setIsPaused } = useIntervalTrackProgress(
		duration,
		currentProgress
	);

	useEffect(() => {
		if (!isActive) return;

		if (isPaused) {
			setIsPaused(true);
		} else {
			setIsPaused(false);
		}
	}, [isActive, isPaused, setIsPaused]);

	const handleSeekValue = async (value: number) => {
		queryClient.setQueryData<Partial<PlaybackType>>(
			["playback-state"],
			(old) => ({
				...old,
				progress_ms: value,
			})
		);
		await player?.seek(value);
	};

	const progressWidth = useMemo(
		() => convertMillisecondToPercentage(progress, duration),
		[duration, progress]
	);

	return (
		<div className="flex w-full items-center gap-3 max-w-lg mx-auto">
			<span className="text-gray-300 text-xs">
				{convertMillieSecondToStringMinutes(progress)}
			</span>
			<div className="w-full relative">
				<div
					className="absolute top-0 z-10 bg-gray-200 h-1 hover:cursor-pointer"
					style={{
						width: progressWidth,
					}}
				/>
				<input
					type="range"
					min={1}
					max={externalState?.item?.duration_ms}
					value={progress}
					onChange={(e) => handleSeekValue(parseInt(e.target.value))}
					className="absolute w-full z-0 h-1 bg-gray-200 rounded-lg appearance-none outline-none cursor-pointer dark:bg-gray-600"
				/>
			</div>

			<span className="text-gray-300 text-xs">
				{convertMillieSecondToStringMinutes(duration)}
			</span>
		</div>
	);
}
