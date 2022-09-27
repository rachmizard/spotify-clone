import { useQuery } from "@tanstack/react-query";

import { SpotifyService } from "@/services";

export default function useGetPlaylists(
	params?: Pick<Partial<GetParams>, "page" | "limit">
) {
	const { page = 1, limit = 10 } = params ?? {};
	const spotify = new SpotifyService();

	const cursor = {
		limit: page * limit,
		offset: 0,
	};

	return useQuery(["playlists", cursor], () => spotify.getPlaylists(cursor), {
		keepPreviousData: true,
		staleTime: 560000,
	});
}
