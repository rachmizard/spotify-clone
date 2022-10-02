import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import { SpotifyService } from "@/services";
import { spotify } from "@/lib";

const refreshAccessToken = async (token: any) => {
	const spotifyService = new SpotifyService();
	try {
		const response = await spotifyService.getRefreshToken({
			client_id: process.env.SPOTIFY_CLIENT_ID!,
			client_secret: process.env.SPOTIFY_CLIENT_SECRET!,
			grant_type: "refresh_token",
			refresh_token: token.refreshToken,
		});

		return {
			...token,
			accessToken: response.access_token,
			accessTokenExpires: response.expires_in,
			refreshToken: response.refresh_token ?? token.refreshToken, // Fall back to old refresh token
		};
	} catch (error: any) {
		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
};

export const authOptions: NextAuthOptions = {
	debug: true,
	logger: {},
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
		async jwt(params) {
			const { token, user, account, profile } = params;

			if (account && user) {
				return {
					accessToken: account.access_token,
					accessTokenExpires: account.expires_at,
					refreshToken: account.refresh_token,
					user,
					profile,
				};
			}

			if (Date.now() < token.accessTokenExpires) {
				return token;
			}

			return await refreshAccessToken(token);
		},
		async session({ session, token }) {
			const spotifyService = new SpotifyService();
			spotifyService.setAccessToken(token.accessToken);

			session.user = token.user;
			session.accessToken = token.accessToken;
			session.refreshToken = token.refreshToken;

			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET!,
	session: {
		strategy: "jwt",
	},
};
export default NextAuth(authOptions);
