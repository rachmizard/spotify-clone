import { SpotifyService } from "@/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useSeekToPosition() {
	const spotifyService = new SpotifyService();
	const queryClient = useQueryClient();

	return useMutation<any, Error, PlaybackSeekBody>(
		(variables) => spotifyService.seekToPosition(variables),
		{
			onSettled: () => {
				queryClient.invalidateQueries(["playback-state"]);
			},
		}
	);
}
