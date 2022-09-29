import { useInfiniteQuery } from "@tanstack/react-query";

import { SpotifyService } from "@/services";

export default function useGetRecentlyPlayed() {
	const spotify = new SpotifyService();

	return useInfiniteQuery(
		["recently-played"],
		({ pageParam }) => {
			return spotify.getRecentlyPlayed({
				before: pageParam,
				limit: 10,
			});
		},
		{
			keepPreviousData: true,
			staleTime: 1000 * 60 * 5,
			getNextPageParam: (lastPage) =>
				lastPage.cursors?.before || undefined,
		}
	);
}
