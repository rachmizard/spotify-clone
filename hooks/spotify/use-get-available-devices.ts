import { useQuery } from "@tanstack/react-query";

import { SpotifyService } from "@/services";

export default function useGetDevices(enabled?: boolean) {
	const spotifyService = new SpotifyService();

	return useQuery(
		["available-devices"],
		() => spotifyService.getAvailableDevices(),
		{
			enabled,
			keepPreviousData: true,
		}
	);
}
