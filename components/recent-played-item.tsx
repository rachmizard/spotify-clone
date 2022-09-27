import Image from "next/image";

import { getDiffirenceTime } from "@/lib";

type RecentPlayedItemProps = {
	data?: RecentPlayType;
};

export default function RecentPlayedItem({ data }: RecentPlayedItemProps) {
	const { track, played_at } = data || {};

	const albumSrc = track?.album?.images[0].url;

	return (
		<div className="flex w-full items-center gap-4">
			<div className="relative w-10 h-10 overflow-hidden rounded-full">
				<Image
					src={albumSrc!}
					layout="fill"
					objectFit="cover"
					alt={track?.album.name}
				/>
			</div>

			<div className="flex flex-col gap-y-1">
				<h4 className="font-semibold text-sm text-gray-400 w-32 truncate overflow-hidden">
					{track?.name}
				</h4>
				<p className="text-xs text-gray-300 w-32 truncate overflow-hidden">
					{track?.artists.map((artist) => artist.name).join(", ")}
				</p>
				<a
					href="#"
					className="text-xs text-gray-300 w-32 truncate overflow-hidden">
					{track?.album.name}
				</a>
			</div>

			<div className="flex ml-auto">
				<p className="text-white text-xs">
					{played_at && getDiffirenceTime(played_at)}
				</p>
			</div>
		</div>
	);
}
