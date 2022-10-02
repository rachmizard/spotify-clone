import { SpotifyService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function useSearch(q: string | undefined) {
	const spotifyService = new SpotifyService();

	return useQuery(
		["search", q],
		() =>
			spotifyService.search({
				q,
				type: "track,artist,album,playlist",
				limit: 4,
			}),
		{
			enabled: !!q,
			keepPreviousData: true,
		}
	);
}
