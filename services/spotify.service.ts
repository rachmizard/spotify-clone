import AdapterService from "./adapter.service";

export default class SpotifyService extends AdapterService {
	constructor() {
		super();
	}

	public async getUserInfo() {
		try {
			return await super.sendGetRequest<any>("/me");
		} catch (e) {
			throw e;
		}
	}

	public async getPlaylists(
		params: Pick<GetParams, "limit" | "offset"> = {
			limit: 10,
			offset: 5,
		}
	): Promise<ListBaseResponse<PlaylistType>> {
		try {
			return await super.sendGetRequest("/me/playlists", params);
		} catch (error) {
			throw error;
		}
	}

	public async getPlaylist(playlistId: string) {
		try {
			return await super.sendGetRequest<any>(`/playlists/${playlistId}`);
		} catch (error) {
			throw error;
		}
	}

	public async getRecentlyPlayed(
		params: Pick<GetParams, "after" | "before" | "limit"> = {
			limit: 10,
		}
	): Promise<ListBaseResponse<RecentPlayType>> {
		try {
			return await super.sendGetRequest(
				"/me/player/recently-played",
				params
			);
		} catch (error) {
			throw error;
		}
	}

	public async getRefreshToken(req: ReqTokenPayload) {
		try {
			const response = await fetch(
				"https://accounts.spotify.com/api/token",
				{
					body: new URLSearchParams(req),
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						Autorization: `Basic ${Buffer.from(
							`${req.client_id}:${req.client_secret}`
						).toString("base64")}`,
					},
					method: "POST",
				}
			);

			return await response.json();
		} catch (error: any) {
			throw error;
		}
	}
}
