import { dehydrate, QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import Browse from "@/components/browse";

import { useSearch } from "@/hooks/spotify";
import { useDebounce } from "@/hooks";

import { SpotifyService } from "@/services";

import { useSearchStore } from "@/stores";
import { convertMillieSecondToStringMinutes } from "@/lib/utils/converter";

export default function SearchPage() {
	const query = useSearchStore((store) => store.query);
	const debouncedQueryValue = useDebounce(query, 1000);

	const { data: search } = useSearch(debouncedQueryValue);

	return !!debouncedQueryValue && !!search ? (
		<div className="grid grid-cols-2 gap-6">
			<div className="w-full flex flex-col gap-y-4">
				<p className="text-white text-xl font-bold">Top Result</p>

				<div className="flex flex-col gap-y-2 bg-zinc-800 hover:bg-zinc-700 transition duration-200 rounded-md shadow-lg px-8 py-6">
					<div className="relative w-32 h-32 rounded-full overflow-hidden">
						<Image
							src={search.artists.items[0].images[1].url}
							layout="fill"
							priority
							objectFit="cover"
							quality={100}
							alt={search.artists.items[0].id}
						/>
					</div>
					<div className="space-y-4">
						<h2 className="text-2xl font-semibold text-white">
							{search.artists.items[0].name}
						</h2>
						<div className="bg-zinc-900 px-4 block max-w-[6rem] py-1 rounded-full">
							<p className="uppercase text-sm text-white text-center truncate tracking-wider">
								Artist
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full">
				<p className="text-white text-xl font-bold">Songs</p>

				<div className="flex flex-col gap-y-4 py-6">
					{search.tracks.items.map((track, key) => (
						<div
							key={key}
							className="flex items-center justify-between gap-x-3">
							<div className="flex gap-3">
								<div className="relative w-12 h-12 overflow-hidden">
									<Image
										src={track.album.images[0].url}
										priority
										quality={50}
										layout="fill"
										objectFit="cover"
										alt={track.id}
									/>
								</div>
								<div className="flex flex-col gap-1">
									<p className="text-white font-semibold">
										{track.name}
									</p>
									<p className="text-gray-400 text-sm">
										{track.artists[0].name}
									</p>
								</div>
							</div>
							<div className="text-zinc-400 ">
								<span className="font-light text-sm">
									{convertMillieSecondToStringMinutes(
										track.duration_ms
									)}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	) : (
		<Browse />
	);
}

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
