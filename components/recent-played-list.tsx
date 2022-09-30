import { FaSpinner } from "react-icons/fa";
import { BsMusicNoteList } from "react-icons/bs";

import InfiniteScrollLoader from "./shared/infinitescroll-loader";
import RecentPlayedItem from "./recent-played-item";

import { useGetRecentlyPlayed, useStartPlayback } from "@/hooks/spotify";
import { usePlaybackContext } from "@/context/playback-context";

function getStartPlaybackPayload(
	contextType: "artist" | "playlist" | "album" | "show" | "episode",
	payload: Partial<PlaybackStartOrResumeBody>
): Partial<PlaybackStartOrResumeBody> {
	if (contextType === "artist") {
		return {
			device_id: payload.device_id,
			uris: payload.uris,
			position_ms: 0,
		};
	}

	return {
		context_uri: payload.context_uri,
		device_id: payload.device_id,
		offset: payload.offset,
		position_ms: 0,
	};
}

export default function RecentPlayedList() {
	const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
		useGetRecentlyPlayed();
	const { deviceId } = usePlaybackContext();

	const startPlayback = useStartPlayback();

	const handleClick = (recent: RecentPlayType | undefined) => {
		if (!recent) return;

		const variables = getStartPlaybackPayload(recent.context.type, {
			context_uri: recent.context.uri,
			device_id: deviceId!,
			offset: {
				uri: recent.track.uri,
			},
			position_ms: 0,
			uris: [recent.track.uri],
		});

		startPlayback.mutate(variables);
	};

	return (
		<div className="flex flex-col bg-black w-[40%] h-screen text-gray-500 px-6 py-4">
			<h1 className="flex items-center gap-x-2">
				<span>
					<BsMusicNoteList size="20" />
				</span>
				Recently Played
			</h1>
			{isLoading && (
				<div className="flex h-[50%] items-center justify-center">
					<FaSpinner size="23" className="animate-spin" />
				</div>
			)}
			{!isLoading && (
				<div className="flex flex-col space-y-7 mt-4 w-full px-4 py-4 h-[32rem] overflow-y-auto">
					{data?.pages.map((page) => {
						return page.items.map((item, key) => (
							<RecentPlayedItem
								key={key}
								data={item}
								onClick={handleClick}
							/>
						));
					})}

					<InfiniteScrollLoader
						show={hasNextPage! || isFetchingNextPage}
						onFetchNextPage={() => fetchNextPage()}
					/>
				</div>
			)}
		</div>
	);
}
