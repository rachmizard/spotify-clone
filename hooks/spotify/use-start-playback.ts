import { useMutation } from "@tanstack/react-query";

import { SpotifyService } from "@/services";

export default function usePlayback() {
	const spotifyService = new SpotifyService();

	return useMutation<any, Error, PlaybackStartOrResumeBody>((variables) =>
		spotifyService.startPlayback(variables)
	);
}
