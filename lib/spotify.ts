const scopes = [
	"user-read-email",
	"playlist-read-private",
	"playlist-read-collaborative",
	"user-read-email",
	"streaming",
	"user-read-private",
	"user-library-read",
	"user-top-read",
	// "user-library-modify",
	"user-read-playback-state",
	"user-modify-playback-state",
	"user-read-currently-playing",
	"user-read-recently-played",
	"user-follow-read",
].join(" ");

const params = {
	scope: scopes,
	redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
};

const querParamString = new URLSearchParams(params);

export const LOGIN_URL =
	"https://accounts.spotify.com/authorize?" + querParamString.toString();

export const TOKEN_URL = "https://accounts.spotify.com/api/token";

export const USER_INFO_URL = "https://api.spotify.com/v1/me";
