import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Browse from "@/components/browse";
import TopResultCard from "@/components/search/top-result-card";
import SearchSongCardItem from "@/components/search/song-card-item";

import { useSearch } from "@/hooks/spotify";
import { useDebounce } from "@/hooks";

import { SpotifyService } from "@/services";

import { useSearchStore } from "@/stores";

export default function SearchPage() {
	const query = useSearchStore((store) => store.query);
	const debouncedQueryValue = useDebounce(query, 1000);

	const { data: search } = useSearch(debouncedQueryValue);

	const { artists } = search || {};

	return !!debouncedQueryValue && !!search ? (
		<div className="grid grid-cols-2 gap-6">
			<div className="w-full flex flex-col gap-y-4">
				<p className="text-white text-xl font-bold">Top Result</p>

				<TopResultCard
					id={artists?.items[0]?.id}
					imageUrl={artists?.items[0]?.images[0]?.url}
					name={artists?.items[0]?.name}
				/>
			</div>
			<div className="w-full">
				<p className="text-white text-xl font-bold">Songs</p>

				<div className="flex flex-col gap-y-4 py-6">
					{search?.tracks?.items?.map((track, key) => (
						<SearchSongCardItem
							key={key}
							artist={track?.artists[0]?.name}
							duration={track?.duration_ms}
							imageUrl={track?.album?.images[0]?.url}
							name={track?.name}
							id={track?.id}
						/>
					))}
				</div>
			</div>
		</div>
	) : (
		<Browse />
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	const queryClient = new QueryClient();
	const spotify = new SpotifyService();

	await queryClient.prefetchQuery(["playlists"], () =>
		spotify.getPlaylists()
	);

	await queryClient.prefetchQuery(["playback-state"], () =>
		spotify.getPlaybackState()
	);

	await queryClient.prefetchQuery([
		"browse-categories",
		() => spotify.getSeveralBrowseCategories(),
	]);

	await queryClient.prefetchInfiniteQuery(["recently-played"], () =>
		spotify.getRecentlyPlayed()
	);

	return {
		props: {
			session,
			dehydratedState: dehydrate(queryClient),
		},
	};
};
