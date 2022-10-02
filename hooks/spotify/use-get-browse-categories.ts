import { SpotifyService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function useGetSeveralBrowseCategories() {
	const spotifyService = new SpotifyService();

	return useQuery(["browse-categories"], () =>
		spotifyService.getSeveralBrowseCategories()
	);
}
