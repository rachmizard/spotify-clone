import { convertMillieSecondToStringMinutes } from "@/lib/utils/converter";
import Image from "next/image";

type SearchSongCardItemProps = {
	id?: string | undefined;
	imageUrl: string | undefined;
	name: string | undefined;
	artist: string | undefined;
	duration: number | undefined;
};

export default function SearchSongCardItem(props: SearchSongCardItemProps) {
	const { artist, duration, id, imageUrl, name } = props;

	return (
		<div className="flex items-center justify-between gap-x-3">
			<div className="flex gap-3">
				<div className="relative w-12 h-12 overflow-hidden">
					{imageUrl && (
						<Image
							src={imageUrl}
							priority
							quality={50}
							layout="fill"
							objectFit="cover"
							alt={id || name}
						/>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-white font-semibold">{name}</p>
					<p className="text-gray-400 text-sm">{artist}</p>
				</div>
			</div>
			<div className="text-zinc-400 ">
				<span className="font-light text-sm">
					{convertMillieSecondToStringMinutes(duration)}
				</span>
			</div>
		</div>
	);
}
