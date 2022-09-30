import { useMutation } from "@tanstack/react-query";

import { SpotifyService } from "@/services";

export default function useControlVolume() {
	const spotifyService = new SpotifyService();

	return useMutation<any, Error, ControlVolumeBody>((variables) =>
		spotifyService.controlVolume(variables)
	);
}
