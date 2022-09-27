export interface SpotifyImage {
	url: string;
}

export interface SpotifyProfile extends Record<string, any> {
	id: string;
	display_name: string;
	email: string;
	images: SpotifyImage[];
}
