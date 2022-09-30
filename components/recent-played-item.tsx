import Image from "next/image";

import { getDiffirenceTime } from "@/lib";

type RecentPlayedItemProps = {
	data?: RecentPlayType;
	onClick?: (data: RecentPlayType | undefined) => void;
};

export default function RecentPlayedItem({
	data,
	onClick,
}: RecentPlayedItemProps) {
	const { track, played_at } = data || {};

	const albumSrc = track?.album?.images[0].url;

	return (
		<div className="flex w-full items-center gap-4">
			<div
				onClick={() => onClick && onClick(data)}
				className="relative w-10 h-10 overflow-hidden rounded-full cursor-pointer">
				<Image
					src={albumSrc!}
					layout="fill"
					objectFit="cover"
					alt={track?.album.name}
				/>
			</div>

			<div className="flex flex-col gap-y-1">
				<h4
					onClick={() => onClick && onClick(data)}
					className="font-semibold text-sm text-gray-400 w-32 truncate overflow-hidden cursor-pointer">
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
