import { useQuery } from "@tanstack/react-query";

import { SpotifyService } from "@/services";

type UseGetPlaybackState = {
	refetchInterval?: number | false;
	staleTime?: number | undefined;
	enabled?: boolean;
	refetchOnWindowFocus?: boolean;
};

const spotify = new SpotifyService();

export default function useGetPlaybackState(props?: UseGetPlaybackState) {
	const {
		refetchInterval = 5000,
		refetchOnWindowFocus,
		staleTime = 1000 * 60 * 5,
		enabled,
	} = props || {};

	return useQuery(["playback-state"], () => spotify.getPlaybackState(), {
		keepPreviousData: true,
		refetchInterval,
		refetchIntervalInBackground: true,
		refetchOnWindowFocus,
		staleTime,
		enabled,
	});
}
