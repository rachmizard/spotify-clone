declare interface SpotifyProfile extends Record<string, any> {
	id: string;
	name: string;
	email: string;
	image: string;
}

type PlaylistImage = {
	height: number | string | null;
	url: string;
	width: number | string | null;
};

type PlaylistOwner = {
	display_name: string;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	type: string;
	uri: string;
};

type PlaylistTracks = {
	href: string;
	total: number;
};

type PlaylistType = {
	collaborative: boolean;
	description: string;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: PlaylistImage[];
	name: string;
	owner: PlaylistOwner;
	primary_color: string | null;
	public: boolean;
	snapshot_id: string;
	tracks: PlaylistTracks;
	type: string;
	uri: string;
};

type Artist = {
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
};

type AlbumImage = {
	height: number;
	url: string;
	width: number;
};

type AlbumType = {
	album_type: "album" | "single" | "compilation";
	artists: Artist[];
	available_markets: [];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: AlbumImage[];
	name: string;
	release_date: string;
	release_date_precision: "day" | "month" | "year";
	restrictions: {
		reason: "market" | "product" | "explicit";
	};
	total_tracks: number;
	type: string;
	uri: string;
};

type TrackType = {
	album: AlbumType;
	artists: Artist[];
	available_markets: [];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: {
		isrc: string;
	};
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
};

type RecentPlayType = {
	track: TrackType;
	played_at: string;
	context: SpotifyContext;
};

type Device = {
	id: string;
	is_active: boolean;
	is_private_session: boolean;
	is_restricted: boolean;
	name: string;
	type: "computer" | "smartphone" | "speaker";
	volume_percent: number;
};

type SpotifyContext = {
	type: "artist" | "playlist" | "album" | "show" | "episode";
	href: string;
	external_urls: {
		spotify: string;
	};
	uri: string;
};

type PlaybackType = {
	device: Device;
	shuffle_state: boolean;
	repeat_state: "off" | "track" | "context";
	timestamp: number;
	context: SpotifyContext;
	progress_ms: integer | null;
	item: {
		album: AlbumType;
		artists: Artist[];
		available_markets: [];
		disc_number: number;
		duration_ms: number;
		explicit: boolean;
		external_ids: {
			isrc: string;
			ean: string;
			upc: string;
		};
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		is_playable: boolean;
		is_local: boolean;
		name: string;
		popularity: number;
		preview_url: string;
		track_number: number;
		type: string;
		uri: string;
	};
	currently_playing_type: "track" | "episode" | "ad" | "unknown";
	actions: {
		disallows: any;
	};
	is_playing: false;
};

declare interface PlaybackParams {
	market?: string;
	additional_types: "track" | "episode";
}

declare type PlaybackStartOrResumeBody = {
	device_id?: string;
	context_uri?: string;
	uris?: string[];
	offset?: {
		position?: number;
		uri?: string;
	};
	position_ms?: number;
};

declare type ToggleShuffleBody = {
	device_id: string;
	state: boolean;
};

declare type ToggleRepeatBody = {
	device_id: string;
	state: "track" | "context" | "off";
};

declare type ControlVolumeBody = {
	volume_percent: number;
	device_id?: string;
};
