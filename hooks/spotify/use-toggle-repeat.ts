import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SpotifyService } from "@/services";

const spotifyService = new SpotifyService();

export default function useToggleRepeat() {
	const queryClient = useQueryClient();

	return useMutation<any, Error, ToggleRepeatBody, PlaybackType>(
		(variables) => spotifyService.toggleRepeat(variables),
		{
			onMutate(variables) {
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
