import type { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import MainLayout from "@/layouts/main-layout";
import Image from "next/image";
import { SpotifyService } from "@/services";

const Home: NextPage = () => {
	const { data: session, status } = useSession();

	return (
		<MainLayout>
			<div className="flex flex-col items-center justify-center h-full">
				<h1 className="text-4xl font-bold text-white">
					{status === "loading" ? (
						"Loading..."
					) : (
						<div className="flex flex-col gap-y-6">
							<div className="self-center w-32 h-32 overflow-hidden relative rounded-full">
								<Image
									src={session?.user?.image!}
									layout="fill"
									priority
									quality={100}
									objectFit="cover"
									alt={session?.user.id}
								/>
							</div>

							<div>
								Welcome{" "}
								<span className="text-green-500">
									{session?.user.name}
								</span>
							</div>
						</div>
					)}
				</h1>
			</div>
		</MainLayout>
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
