import React, { useState } from "react";
import { useGetPlaylists } from "@/hooks/spotify";

export default function Playlist() {
	const [page, setPage] = useState(1);
	const { isLoading, data } = useGetPlaylists({
		page,
		limit: 15,
	});

	const hasFinishLoadMore = data && data?.total === data?.items?.length;

	return (
		<>
			{isLoading ? (
				<p className="text-gray-500">Fetching your playlists...</p>
			) : (
				<ul className="flex flex-col text-gray-400 space-y-2 overflow-y-auto py-2 px-3 h-[32rem]">
					{data?.items.map((playlist) => (
						<li
							key={playlist.id}
							className="group hover:cursor-pointer">
							<a
								href="#"
								className="text-sm group-hover:text-gray-200">
								{playlist.name}
							</a>
						</li>
					))}

					{!hasFinishLoadMore && (
						<li>
							<button
								onClick={() => setPage((prev) => prev + 1)}
								className="text-sm text-white bg-gray-500 w-full rounded-full hover:bg-gray-400">
								Load more
							</button>
						</li>
					)}
				</ul>
			)}
		</>
	);
}
