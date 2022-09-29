import { useEffect, useMemo } from "react";
import { usePlaybackContext } from "@/context/playback-context";
import { useQueryClient } from "@tanstack/react-query";

import { useGetPlaybackState } from "@/hooks/spotify";

import {
	convertMillieSecondToStringMinutes,
	convertMillisecondToPercentage,
} from "@/lib/utils/converter";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function PlayerProgressBar() {
	const queryClient = useQueryClient();
	const { isActive, isPaused, player } = usePlaybackContext();
	const { data: externalState } = useGetPlaybackState({
		enabled: isActive && !isPaused,
		refetchInterval: 1000,
	});

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

	const progress = externalState?.progress_ms || 0;
	const progressWidth = useMemo(
		() =>
			convertMillisecondToPercentage(
				progress,
				externalState?.item?.duration_ms || 0
			),
		[externalState?.item?.duration_ms, progress]
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
				{convertMillieSecondToStringMinutes(
					externalState?.item?.duration_ms || 0
				)}
			</span>
		</div>
	);
}
