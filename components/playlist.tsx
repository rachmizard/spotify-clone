import { useState } from "react";

import Loader from "./shared/loader";
import InfiniteScrollLoader from "./shared/infinitescroll-loader";

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
				<div className="h-[32rem]">
					<Loader />
				</div>
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

					<li className="mt-2">
						<InfiniteScrollLoader
							show={!hasFinishLoadMore}
							onFetchNextPage={() => setPage((prev) => prev + 1)}
						/>
					</li>
				</ul>
			)}
		</>
	);
}
