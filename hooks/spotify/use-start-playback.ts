import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SpotifyService } from "@/services";

export default function usePlayback() {
	const spotifyService = new SpotifyService();
	const queryClient = useQueryClient();

	return useMutation<any, Error, PlaybackStartOrResumeBody>(
		(variables) => spotifyService.startPlayback(variables),
		{
			onSettled: () => {
				queryClient.invalidateQueries(["playback-state"]);
			},
		}
	);
}
