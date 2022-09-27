import Image from "next/image";

export default function RecentPlayed() {
	return (
		<div className="flex w-full items-center gap-4">
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
