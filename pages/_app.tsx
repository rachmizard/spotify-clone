import { useState } from "react";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {
	Hydrate,
	DehydratedState,
	QueryClientProvider,
	QueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "rc-slider/assets/index.css";

import "../styles/globals.css";
import SpotifyPlaybackProvider from "@/context/playback-context";
import Script from "next/script";

type MyAppProps = {
	session?: Session;
	dehydratedState?: DehydratedState;
};

function MyApp({
	Component,
	pageProps: { dehydratedState, session, ...pageProps },
}: AppProps<MyAppProps>) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<SessionProvider session={session}>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={dehydratedState}>
					<SpotifyPlaybackProvider
						session={session}
						name="Spotify Web Clone Player"
						volume={1}>
						<Component {...pageProps} />;
					</SpotifyPlaybackProvider>
				</Hydrate>

				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>

			<Script
				src="https://sdk.scdn.co/spotify-player.js"
				strategy="lazyOnload"
				onLoad={() => console.log(`script loaded correctly`)}
			/>
		</SessionProvider>
	);
}

export default MyApp;
