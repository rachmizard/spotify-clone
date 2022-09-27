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

import "../styles/globals.css";

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
					<Component {...pageProps} />;
				</Hydrate>

				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</SessionProvider>
	);
}

export default MyApp;
