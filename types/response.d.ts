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
