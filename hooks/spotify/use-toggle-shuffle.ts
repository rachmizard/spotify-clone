import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SpotifyService } from "@/services";

const spotifyService = new SpotifyService();

export default function useToggleShuffle() {
	const queryClient = useQueryClient();

	return useMutation<any, Error, ToggleShuffleBody, PlaybackType>(
		(variables) => spotifyService.toggleShuffle(variables),
		{
			onMutate(variables) {
				queryClient.cancelQueries(["playback-state"]);

				const oldPlaybackState = queryClient.getQueryData<PlaybackType>(
					["playback-state"]
				);

				queryClient.setQueryData(["playback-state"], () => ({
					...oldPlaybackState,
					shuffle_state: variables.state,
				}));

				return oldPlaybackState;
			},
			onError(_, __, context) {
				queryClient.setQueryData(["playback-state"], context);
			},
			onSettled() {
				queryClient.invalidateQueries(["playback-state"]);
			},
		}
	);
}
