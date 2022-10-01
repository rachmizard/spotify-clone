import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SpotifyService } from "@/services";

export default function useSkipToNext() {
	const spotifyService = new SpotifyService();
	const queryClient = useQueryClient();

	return useMutation<any, Error, string>(() => spotifyService.skipToNext(), {
		onSettled: () => {
			queryClient.invalidateQueries(["playback-state"]);
		},
	});
}
