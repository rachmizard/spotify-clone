import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SpotifyService } from "@/services";

export default function useTransferPlayback() {
	const spotifyService = new SpotifyService();
	const queryClient = useQueryClient();

	return useMutation<
		any,
		Error,
		{ device_ids: string[] },
		{ devices: Device[] }
	>((variables) => spotifyService.transferPlayback(variables), {
		onMutate(variables) {
			queryClient.cancelQueries(["available-devices"]);

			const oldDevices = queryClient.getQueryData<{ devices: Device[] }>([
				"available-devices",
			]);

			queryClient.setQueryData<{ devices: Device[] | undefined }>(
				["available-devices"],
				(old) => {
					if (!old || !old.devices) return old;

					const devices = old.devices.map((device) => {
						if (variables.device_ids.includes(device.id)) {
							return {
								...device,
								is_active: true,
							};
						}
						return {
							...device,
							is_active: false,
						};
					});

					return {
						devices,
					};
				}
			);

			return oldDevices;
		},
		onError(error, variables, oldDevices) {
			queryClient.setQueryData(["available-devices"], oldDevices);
		},
		onSettled() {
			queryClient.invalidateQueries(["available-devices"]);
		},
	});
}
