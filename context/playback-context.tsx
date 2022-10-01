import { createContext, FC, useContext, useMemo, useState } from "react";
import { Session } from "next-auth";

import { useIsomorphicLayoutEffect } from "@/hooks";
import { Spotify } from "@/global";
import { useTransferPlayback } from "@/hooks/spotify";

type PlaybackContextType = {
	player: Spotify.Player | null;
	isPaused: boolean;
	isActive: boolean;
	currentTrack: Spotify.Track | null;
	state: Spotify.PlaybackState | null;
	deviceId: string | null;
};

type SpotifyPlaybackProviderProps = {
	children: React.ReactNode;
	session?: Session;
	name?: string;
	volume?: number;
};

const PlaybackContext = createContext<PlaybackContextType>(
	{} as PlaybackContextType
);
const PlaybackContextProvider = PlaybackContext.Provider;

export const usePlaybackContext = () => useContext(PlaybackContext);

const SpotifyPlaybackProvider: FC<SpotifyPlaybackProviderProps> = (props) => {
	const {
		children,
		session,
		name = "Spotify Web Player",
		volume = 0.5,
	} = props;

	const [currentTrack, setCurrentTrack] = useState<Spotify.Track | null>(
		null
	);
	const [deviceId, setDeviceId] = useState<string>("");
	const [isPaused, setIsPaused] = useState<boolean>(true);
	const [isActive, setIsActive] = useState<boolean>(false);
	const [player, setPlayer] = useState<Spotify.Player | null>(null);
	const [state, setState] = useState<Spotify.PlaybackState | null>(null);

	const transferPlayback = useTransferPlayback();

	useIsomorphicLayoutEffect(() => {
		window.onSpotifyWebPlaybackSDKReady = () => {
			const spotifyPlayer = new window.Spotify.Player({
				name,
				getOAuthToken(callback) {
					session && callback(session?.accessToken);
				},
				volume,
			});

			setPlayer(spotifyPlayer);

			spotifyPlayer.addListener("ready", async ({ device_id }) => {
				transferPlayback.mutate({
					device_ids: [device_id],
				});

				setDeviceId(device_id);
			});

			spotifyPlayer.addListener("not_ready", ({ device_id }) => {
				console.log("Device ID has gone offline", device_id);
			});

			spotifyPlayer.addListener("initialization_error", () => {
				console.log("Failed to initialize");
			});

			spotifyPlayer.addListener("playback_error", () => {
				console.log("Failed to perform playback");
			});

			spotifyPlayer.addListener("autoplay_failed", () => {
				console.log("Failed to perform autoplay");
			});

			spotifyPlayer.addListener("player_state_changed", (state) => {
				if (!state) {
					return;
				}

				setCurrentTrack(state.track_window.current_track);
				setIsPaused(state.paused);

				spotifyPlayer.getCurrentState().then((state) => {
					if (!state || state.track_window.current_track === null) {
						return setIsActive(false);
					}

					setState(state);
					return setIsActive(true);
				});
			});

			spotifyPlayer.connect();
		};
	}, [name, session, volume]);

	const value = useMemo(
		() => ({
			currentTrack,
			isActive,
			isPaused,
			player,
			deviceId,
			state,
		}),
		[currentTrack, isActive, isPaused, player, deviceId, state]
	);

	return (
		<PlaybackContextProvider value={value}>
			{children}
		</PlaybackContextProvider>
	);
};

export default SpotifyPlaybackProvider;
