import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";

type MyAppProps = {
	session?: Session;
};

function MyApp({ Component, pageProps }: AppProps<MyAppProps>) {
	return (
		<SessionProvider session={pageProps.session}>
			<Component {...pageProps} />;
		</SessionProvider>
	);
}

export default MyApp;
