type ListBaseResponse<T> = {
	href: string;
	items: T[];
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	cursors: {
		after: string;
		before: string;
	};
};

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
	album_type: string;
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
	release_date_precision: string;
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
	context: null;
};
