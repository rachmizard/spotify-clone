import { useOutSideClick } from "@/hooks";
import { useRef, useState } from "react";
import { BiBarChart, BiBroadcast, BiLaptop } from "react-icons/bi";

export default function Devices() {
	const ref = useRef<HTMLDivElement | null>(null);
	const [showDevices, setShowDevices] = useState<"open" | "close">("close");

	const transitionClassname: Record<"open" | "close", string> = {
		open: "transition ease-out duration-100 transform opacity-100 scale-100 visible",
		close: "transition ease-in duration-100 transform opacity-0 scale-95 invisible",
	};

	useOutSideClick(ref, () => {
		setShowDevices("close");
	});

	return (
		<div className="relative flex flex-col">
			<div
				ref={ref}
				className={`absolute flex flex-col gap-y-4 text-gray-300 bottom-10 left-0 right-0 bg-zinc-900 px-8 py-8 w-[320px] shadow-lg rounded-md ${transitionClassname[showDevices]} `}>
				<div className="flex gap-x-4">
					<BiBarChart size="30" className="text-green-500" />
					<div className="flex flex-col gap-x-3">
						<h2 className="text-lg font-semibold ">
							Current Device
						</h2>
						<div className="flex gap-x-2 items-center">
							<BiBroadcast size="18" className="text-green-500" />
							<p className="text-sm text-green-500">Desktop</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col gap-y-2">
					<h2 className="text-md font-semibold tracking-wide">
						Select another device
					</h2>

					<button className="flex p-3 items-center gap-x-4 hover:bg-zinc-800 rounded-lg">
						<BiLaptop size="24" />
						<span className="text-gray-300">Desktop</span>
					</button>
				</div>
			</div>
			<button
				onClick={(event) => {
					ref.current?.contains(event.target as Node)
						? setShowDevices("close")
						: setShowDevices("open");
				}}>
				<BiLaptop
					size="22"
					className={
						showDevices === "close"
							? "text-gray-300"
							: "text-green-500"
					}
				/>
			</button>
		</div>
	);
}
