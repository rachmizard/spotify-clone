import { useRef, useState } from "react";
import Slider from "rc-slider";
import {
	BiVolume,
	BiVolumeMute,
	BiVolumeLow,
	BiVolumeFull,
} from "react-icons/bi";

type VolumeProps = {
	initialVolume: number;
	onSetVolume?: (volume: number) => void;
};

const MIN_VOLUME = 0.2;
const LOW_VOLUME = 0.5;

export default function Volume({ initialVolume, onSetVolume }: VolumeProps) {
	const [volume, setVolume] = useState<number>(initialVolume);
	const oldVolumeRef = useRef<number>(initialVolume);

	const VolumeIcon =
		volume === 0
			? BiVolumeMute
			: volume > 0 && volume < MIN_VOLUME
			? BiVolume
			: volume < LOW_VOLUME
			? BiVolumeLow
			: BiVolumeFull;

	const handleMutetoggle = () => {
		const { current } = oldVolumeRef;

		setVolume(volume === 0 ? current : 0);
		onSetVolume && onSetVolume(volume === 0 ? current : 0);
	};

	return (
		<div className="flex items-center gap-x-3">
			<VolumeIcon
				className="text-gray-300 cursor-pointer"
				size={20}
				onClick={handleMutetoggle}
			/>
			<Slider
				style={{
					width: 100,
				}}
				min={0}
				max={1}
				defaultValue={initialVolume}
				step={0.01}
				value={volume}
				trackStyle={{ backgroundColor: "white", height: 5 }}
				handleStyle={{
					backgroundColor: "#1db954",
					border: "none",
					opacity: 1,
				}}
				railStyle={{ backgroundColor: "gray", height: 5 }}
				onChange={(vol) => {
					if (vol > MIN_VOLUME) {
						oldVolumeRef.current = vol as number;
					}

					setVolume(vol as number);
					onSetVolume && onSetVolume(vol as number);
				}}
			/>
		</div>
	);
}
