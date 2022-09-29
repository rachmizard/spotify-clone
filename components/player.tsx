import Image from "next/image";
import {
	BiPauseCircle,
	BiPlay,
	BiShuffle,
	BiSkipNext,
	BiSkipPrevious,
	BiLaptop,
	BiRepeat,
} from "react-icons/bi";
import { MdRepeatOne } from "react-icons/md";

import { usePlaybackContext } from "@/context/playback-context";
import {
	useGetPlaybackState,
	useToggleRepeat,
	useToggleShuffle,
} from "@/hooks/spotify";

import PlayerProgressBar from "./player-progress-bar";

export default function Player() {
	const { player, isActive, deviceId, isPaused, currentTrack } =
		usePlaybackContext();

	const toggleShuffle = useToggleShuffle();
	const toggleRepeat = useToggleRepeat();
	const playbackState = useGetPlaybackState({
		refetchInterval: false,
	});

	const handleTogglePlayback = async () => {
		await player?.togglePlay();
	};

	const handlePreviousTrack = async () => {
		await player?.previousTrack();
	};

	const handleNextTrack = async () => {
		await player?.nextTrack();
	};

	const handleToggleShuffle = async () => {
		if (!isActive) return;

		toggleShuffle.mutate({
			device_id: deviceId!,
			state: !isActiveShuffle,
		});
	};

	const handleToggleRepeat = async () => {
		if (!isActive) return;
		const states = ["off", "track", "context"];

		const index = states.indexOf(repeatState);
		const state = states[(index + 1) % states.length] as
			| "off"
			| "track"
			| "context";

		repeatState &&
			toggleRepeat.mutate({
				device_id: deviceId!,
				state,
			});
	};

	const { data } = playbackState;

	const isActiveShuffle = !!data?.shuffle_state;
	const repeatState = data?.repeat_state || "off";

	const PlayingIcon = !isPaused ? BiPauseCircle : BiPlay;
	const RepeatIcon = repeatState === "track" ? MdRepeatOne : BiRepeat;

	const image =
		currentTrack?.album.images[0].url ||
		data?.item?.album.images[0].url ||
		"";

	return (
		<div className="sticky bottom-0 bg-zinc-800 w-full h-[6rem] py-4 px-4 shadow-xl space-y-1">
			<div className="flex justify-between items-center">
				<div className="flex w-[33%] items-center gap-x-4 overflow-hidden">
					{(currentTrack || data) && (
						<div className="w-12 h-12 rounded-full relative overflow-hidden">
							<Image
								src={image}
								layout="fill"
								objectFit="cover"
								alt={currentTrack?.name || data?.item?.name!}
							/>
						</div>
					)}

					<p className="flex flex-col text-gray-300 gap-y-1 truncate">
						<span className="truncate">
							{currentTrack?.name || data?.item?.name!}
						</span>
						<span className="text-gray-300 text-xs truncate">
							{currentTrack?.artists[0]?.name ||
								data?.item?.artists[0].name!}
						</span>
					</p>
				</div>
				<div className="flex flex-col w-[33%] items-center justify-center">
					<div className="flex items-center gap-x-3">
						<button
							className="text-gray-300 hover:text-white"
							onClick={handleToggleShuffle}>
							<BiShuffle
								size="22"
								className={`${
									isActiveShuffle
										? " text-green-500 "
										: "text-gray-300"
								} `}
							/>
						</button>
						<button
							className="text-gray-300 hover:text-white"
							onClick={() => player?.seek(0)}
							onDoubleClick={handlePreviousTrack}>
							<BiSkipPrevious size="38" />
						</button>

						<button
							className="text-gray-300 hover:text-white"
							onClick={handleTogglePlayback}>
							<PlayingIcon size="48" />
						</button>

						<button className="text-gray-300 hover:text-white">
							<BiSkipNext size="38" onClick={handleNextTrack} />
						</button>

						<button
							className="text-gray-300 hover:text-white"
							onClick={handleToggleRepeat}>
							<RepeatIcon
								size="22"
								className={`${
									repeatState !== "off"
										? " text-green-500 "
										: "text-gray-300"
								} `}
							/>
						</button>
					</div>

					<PlayerProgressBar />
				</div>
				<div className="flex w-[33%] justify-end">
					<button>
						<BiLaptop size="22" className="text-gray-300" />
					</button>
				</div>
			</div>
		</div>
	);
}
