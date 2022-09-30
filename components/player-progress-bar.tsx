import { useEffect } from "react";
import Slider from "rc-slider";
import { usePlaybackContext } from "@/context/playback-context";
import { useQueryClient } from "@tanstack/react-query";

import { useGetPlaybackState } from "@/hooks/spotify";
import { useIntervalTrackProgress } from "@/hooks";

import { convertMillieSecondToStringMinutes } from "@/lib/utils/converter";

export default function PlayerProgressBar() {
	const queryClient = useQueryClient();

	const { isActive, isPaused, player, state } = usePlaybackContext();
	const { data: externalState } = useGetPlaybackState({
		enabled: isActive && !isPaused,
		refetchInterval: 10000,
		refetchOnWindowFocus: true,
	});

	const currentProgress = state?.position || externalState?.progress_ms || 0;
	const duration = state?.duration || externalState?.item?.duration_ms || 0;

	const isExternalPaused = externalState?.is_playing === false;
	const isPlaying = !isPaused || !isExternalPaused;

	const { progress, setIsPaused } = useIntervalTrackProgress(
		duration,
		currentProgress,
		isPlaying
	);

	useEffect(() => {
		if (!isActive) return;

		if (isPaused && isExternalPaused) {
			setIsPaused(true);
		} else {
			setIsPaused(false);
		}
	}, [isActive, isExternalPaused, isPaused, setIsPaused]);

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

	return (
		<div className="flex w-full items-center gap-3 max-w-lg mx-auto">
			<span className="text-gray-300 text-xs">
				{convertMillieSecondToStringMinutes(progress)}
			</span>
			<div className="w-full">
				<Slider
					min={0}
					max={duration}
					defaultValue={progress}
					step={1000}
					value={progress}
					trackStyle={{ backgroundColor: "white", height: 5 }}
					handleStyle={{
						backgroundColor: "#1db954",
						border: "none",
						opacity: 1,
					}}
					railStyle={{ backgroundColor: "gray", height: 5 }}
					onChange={(number) => {
						handleSeekValue(number as number);
					}}
				/>
			</div>

			<span className="text-gray-300 text-xs">
				{convertMillieSecondToStringMinutes(duration)}
			</span>
		</div>
	);
}
