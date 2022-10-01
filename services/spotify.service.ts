import AdapterService from "./adapter.service";

export default class SpotifyService extends AdapterService {
	constructor() {
		super();
	}

	public async getUserInfo() {
		try {
			return await super.sendGetRequest("/me");
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
			return await super.sendGetRequest(`/playlists/${playlistId}`);
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

	public async getPlaybackState(): Promise<PlaybackType> {
		try {
			return await super.sendGetRequest("/me/player");
		} catch (error) {
			throw error;
		}
	}

	public async toggleShuffle(params: ToggleShuffleBody) {
		try {
			return await super.sendPutRequest(
				`/me/player/shuffle`,
				{},
				{
					params,
				}
			);
		} catch (error) {
			throw error;
		}
	}

	public async toggleRepeat(params: ToggleRepeatBody) {
		try {
			return await super.sendPutRequest(
				`/me/player/repeat`,
				{},
				{
					params,
				}
			);
		} catch (error) {
			throw error;
		}
	}

	public async startPlayback(body: PlaybackStartOrResumeBody) {
		const queryParams: Record<string, any> = {};
		const payload: Record<string, any> = {};

		payload.context_uri = body.context_uri;
		payload.offset = body.offset;
		payload.position_ms = body.position_ms;
		payload.uris = body.uris;

		if (typeof body.device_id !== "undefined" || body.device_id !== null) {
			queryParams.device_id = body.device_id;
		}

		try {
			return await super.sendPutRequest(`/me/player/play`, payload, {
				params: queryParams,
			});
		} catch (error) {
			throw error;
		}
	}

	public async controlVolume(params: ControlVolumeBody) {
		try {
			return await super.sendPutRequest(
				"/me/player/volume",
				{},
				{
					params,
				}
			);
		} catch (error) {
			throw error;
		}
	}

	public async getAvailableDevices(): Promise<{ devices: Device[] }> {
		try {
			return await super.sendGetRequest("/me/player/devices");
		} catch (error) {
			throw error;
		}
	}

	public async transferPlayback(body: { device_ids: string[] }) {
		try {
			return await super.sendPutRequest("/me/player", body);
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
