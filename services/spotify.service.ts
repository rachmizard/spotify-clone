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
		params: GetParams = {
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

	public async getToken(req: ReqTokenPayload) {
		try {
			return await super.sendPostRequest<any>(
				"https://accounts.spotify.com/api/token",
				{},
				{
					params: req,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			);
		} catch (error) {
			throw error;
		}
	}
}
