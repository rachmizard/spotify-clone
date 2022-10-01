import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SpotifyService } from "@/services";

export default function useSkipToPosition() {
	const spotifyService = new SpotifyService();
	const queryClient = useQueryClient();

	return useMutation<any, Error, string>(
		() => spotifyService.skipToPrevious(),
		{
			onSettled: () => {
				queryClient.invalidateQueries(["playback-state"]);
			},
		}
	);
}
