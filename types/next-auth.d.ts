import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: SpotifyProfile;
		accessToken: string;
		refreshToken: string;
		error?: any;
	}
}

declare module "next-auth/jwt" {
	/**
	 * Returned by `getToken` and received as a prop on the `SessionProvider` React Context
	 */
	interface JWT {
		user: SpotifyProfile;
		accessToken: string;
		refreshToken: string;
		accessTokenExpires: number;
	}
}
