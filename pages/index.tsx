import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import { SpotifyService } from "@/services";

const Home: NextPage = () => {
	const { data: session } = useSession();
	return (
		<div className="flex flex-col">
			<h2 className="text-4xl max-w-md font-bold text-white truncate">
				Welcome, {session?.user.name}
			</h2>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);
	const queryClient = new QueryClient();
	const spotify = new SpotifyService();

	await queryClient.prefetchQuery(["playlists"], () =>
		spotify.getPlaylists()
	);

	await queryClient.prefetchQuery(["playback-state"], () =>
		spotify.getPlaybackState()
	);

	await queryClient.prefetchInfiniteQuery(["recently-played"], () =>
		spotify.getRecentlyPlayed()
	);

	return {
		props: {
			session,
			dehydratedState: dehydrate(queryClient),
		},
	};
};

export default Home;
