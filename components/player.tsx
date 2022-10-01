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

import Volume from "./volume";

import { usePlaybackContext } from "@/context/playback-context";
import {
	useControlVolume,
	useGetPlaybackState,
	useToggleRepeat,
	useToggleShuffle,
} from "@/hooks/spotify";

import PlayerProgressBar from "./player-progress-bar";

const INITIAL_VOLUME_VALUE = 0.2;

export default function Player() {
	const { player, isActive, deviceId, isPaused, currentTrack } =
		usePlaybackContext();

	const toggleShuffle = useToggleShuffle();
	const toggleRepeat = useToggleRepeat();
	const controlVolume = useControlVolume();

	const playbackState = useGetPlaybackState();

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

	const handleSetVolume = async (volume: number) => {
		if (!isActive) {
			controlVolume.mutate({
				volume_percent: Math.round(volume * 100),
			});
		} else {
			await player?.setVolume(volume);
		}
	};

	const { data: externalState } = playbackState;

	const isActiveShuffle = !!externalState?.shuffle_state;
	const isExternalPaused = externalState?.is_playing === false;

	const repeatState = externalState?.repeat_state || "off";

	const initialVolume =
		Math.round(externalState?.device?.volume_percent! * 0.01) ||
		INITIAL_VOLUME_VALUE;

	const PlayingIcon =
		(isActive && !isPaused) || (!isActive && !isExternalPaused)
			? BiPauseCircle
			: BiPlay;

	const RepeatIcon = repeatState === "track" ? MdRepeatOne : BiRepeat;

	const image =
		currentTrack?.album.images[0].url ||
		externalState?.item?.album.images[0].url ||
		"";

	return (
		<div className="sticky bottom-0 bg-zinc-800 w-full h-[6rem] py-4 px-4 shadow-xl space-y-1">
			<div className="flex justify-between px-8 items-center">
				<div className="flex w-[33%] items-center gap-x-4 overflow-hidden">
					{(currentTrack || externalState) && (
						<div className="w-12 h-12 rounded-full relative overflow-hidden">
							<Image
								src={image}
								layout="fill"
								objectFit="cover"
								alt={
									currentTrack?.name ||
									externalState?.item?.name!
								}
							/>
						</div>
					)}

					<p className="flex flex-col text-gray-300 gap-y-1 truncate">
						<span className="truncate">
							{currentTrack?.name || externalState?.item?.name!}
						</span>
						<span className="text-gray-300 text-xs truncate">
							{currentTrack?.artists[0]?.name ||
								externalState?.item?.artists[0].name!}
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
				<div className="flex items-center w-[33%] gap-x-4 justify-end">
					<button>
						<BiLaptop size="22" className="text-gray-300" />
					</button>

					<Volume
						initialVolume={initialVolume}
						onSetVolume={handleSetVolume}
					/>
				</div>
			</div>
		</div>
	);
}
