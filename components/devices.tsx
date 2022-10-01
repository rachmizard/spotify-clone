import { useMemo, useRef, useState } from "react";
import { BiBarChart, BiBroadcast, BiLaptop, BiSpeaker } from "react-icons/bi";
import { FiSmartphone } from "react-icons/fi";

import Loader from "./shared/loader";

import { useOutSideClick } from "@/hooks";
import { useGetAvailableDevices, useTransferPlayback } from "@/hooks/spotify";

const toCapitalize = (str: string) => {
	return str[0].toUpperCase() + str.slice(1);
};

export default function Devices() {
	const ref = useRef<HTMLDivElement | null>(null);
	const [showDevices, setShowDevices] = useState<"open" | "close">("close");
	const { data: availableDevices, isLoading } = useGetAvailableDevices();

	const transferPlayback = useTransferPlayback();

	const transitionClassname: Record<"open" | "close", string> = {
		open: "transition ease-out duration-100 transform opacity-100 scale-100 visible",
		close: "transition ease-in duration-100 transform opacity-0 scale-95 invisible",
	};

	useOutSideClick(ref, () => {
		setShowDevices("close");
	});

	const activeDevice = useMemo(() => {
		return availableDevices?.devices.find((device) => !!device.is_active);
	}, [availableDevices]) as Device | undefined;

	const anotherDevices = useMemo(() => {
		return availableDevices?.devices.filter((device) => !device.is_active);
	}, [availableDevices?.devices]) as Device[];

	const ButtonIcon =
		activeDevice?.type === toCapitalize("computer")
			? BiLaptop
			: activeDevice?.type === toCapitalize("smartphone")
			? FiSmartphone
			: BiSpeaker;

	return (
		<div className="relative flex flex-col">
			<div
				ref={ref}
				className={`absolute flex flex-col gap-y-4 text-gray-300 bottom-10 left-[-100px] bg-zinc-900 px-8 py-8 w-[320px] shadow-lg rounded-md ${transitionClassname[showDevices]} `}>
				{isLoading && (
					<div className="flex justify-center items-center">
						<Loader />
					</div>
				)}
				{!isLoading && (
					<>
						{activeDevice && (
							<div className="flex gap-x-4">
								<BiBarChart
									size="30"
									className="text-green-500"
								/>
								<div className="flex flex-col gap-x-3">
									<h2 className="text-lg font-semibold ">
										Current Device
									</h2>
									<div className="flex gap-x-2 items-center">
										<BiBroadcast
											size="18"
											className="text-green-500"
										/>
										<p className="text-sm text-green-500">
											{activeDevice?.name}
										</p>
									</div>
								</div>
							</div>
						)}

						{anotherDevices.length > 0 && (
							<div className="flex flex-col gap-y-2">
								<h2 className="text-md font-semibold tracking-wide">
									Select another device
								</h2>
								{anotherDevices.map((device, key) => {
									const Icon =
										device.type === toCapitalize("computer")
											? BiLaptop
											: device.type ===
											  toCapitalize("smartphone")
											? FiSmartphone
											: BiSpeaker;

									return (
										<button
											key={key}
											className="flex p-3 items-center justify-start gap-x-4 hover:bg-zinc-800 rounded-lg"
											onClick={() =>
												transferPlayback.mutate({
													device_ids: [device.id],
												})
											}>
											<Icon size={24} />
											<span className="text-gray-300 truncate">
												{device.name}
											</span>
										</button>
									);
								})}
							</div>
						)}
					</>
				)}
			</div>
			<button
				onClick={(event) => {
					ref.current?.contains(event.target as Node)
						? setShowDevices("close")
						: setShowDevices("open");
				}}>
				<ButtonIcon
					size="22"
					className={
						"hover:text-green-500 " + showDevices === "close"
							? "text-gray-300"
							: "text-green-500"
					}
				/>
			</button>
		</div>
	);
}
