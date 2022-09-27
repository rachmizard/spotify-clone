import Image from "next/image";

export default function FriendActivity() {
	return (
		<div className="flex w-full items-center gap-4">
			<div className="relative w-10 h-10 rounded-full overflow-hidden">
				<Image
					src="/images/spotify-logo.png"
					alt="User Profile"
					objectFit="cover"
					layout="fill"
				/>
			</div>

			<div className="flex flex-col">
				<h4 className="font-semibold text-gray-400">sandall</h4>
				<p className="text-xs text-gray-300">Runtuh - Runtuh</p>
				<p className="text-xs text-gray-300">Top 50 Indonesia</p>
			</div>

			<div className="flex ml-auto">
				<p className="text-white text-xs">18 hr</p>
			</div>
		</div>
	);
}
