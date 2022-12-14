import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SpotifyService } from "@/services";

export default function usePlayback() {
	const spotifyService = new SpotifyService();
	const queryClient = useQueryClient();

	return useMutation<any, Error, PlaybackStartOrResumeBody, PlaybackType>(
		(variables) => spotifyService.startPlayback(variables),
		{
			onMutate: () => {
				queryClient.cancelQueries(["playback-state"]);

				const previousPlayback = queryClient.getQueryData<PlaybackType>(
					["playback-state"]
				);

				queryClient.setQueryData<PlaybackType | undefined>(
					["playback-state"],
					(old) => {
						if (!old) return old;

						return {
							...old,
							is_playing: true,
						};
					}
				);

				return previousPlayback;
			},
			onError: (_, __, previousPlayback) => {
				queryClient.setQueryData(["playback-state"], previousPlayback);
			},
			onSettled: () => {
				queryClient.invalidateQueries(["playback-state"]);
			},
		}
	);
}
