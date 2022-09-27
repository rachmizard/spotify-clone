import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import { spotify } from "@/lib";

export const authOptions: NextAuthOptions = {
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID!,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
			authorization: spotify.LOGIN_URL,
			userinfo: spotify.USER_INFO_URL,
			token: {
				async request({ client, checks, params, provider }) {
					const tokens = await client.oauthCallback(
						provider.callbackUrl,
						params,
						checks
					);

					return {
						tokens,
					};
				},
			},
		}),
	],
	pages: {
		signIn: "/signin",
	},
	callbacks: {
		async jwt({ token, user, account, isNewUser, profile }) {
			// the user object is what returned from the Credentials login, it has `accessToken` from the server `/login` endpoint
			// assign the accessToken to the `token` object, so it will be available on the `session` callback
			if (user) {
				token = {
					...account,
					...user,
					...profile,
				};
			}

			return token;
		},
		async session({ session, token, user }) {
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.username = token.username;

			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET!,
};
export default NextAuth(authOptions);
