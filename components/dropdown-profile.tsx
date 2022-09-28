import { useRef, useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

import { useOutSideClick } from "@/hooks";

const DropdownProfile = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { data: session, status } = useSession();

	const ref = useRef<HTMLDivElement>(null);
	useOutSideClick(ref, () => setIsOpen(false));

	const openDropDownClassName = ["opacity-1 visible", "translate-y-3"].join(
		" "
	);
	const closeDropDownClassName = [
		"opacity-0 invisible",
		"translate-y-0",
	].join(" ");

	const dropDownClassName = isOpen
		? openDropDownClassName
		: closeDropDownClassName;

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(true)}
				className="flex items-center justify-center transition-all duration-75 w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-800 hover:ring-white ">
				<span className="relative w-10 h-10 overflow-hidden rounded-full">
					{status === "authenticated" && (
						<Image
							src={session?.user?.image!}
							layout="fill"
							objectFit="cover"
							priority
							quality={100}
							alt={session?.user.name}
						/>
					)}
				</span>
			</button>

			<div
				ref={ref}
				className={"absolute transition-all duration-100 ease-in-out top-10 right-0 w-48 bg-zinc-800 text-gray-300 rounded-md shadow-lg ".concat(
					dropDownClassName
				)}>
				<div className="flex flex-col p-4">
					<div className="flex flex-row items-center">
						<div className="relative w-12 h-12 overflow-hidden rounded-full bg-gray-500">
							{status === "authenticated" && (
								<Image
									src={session?.user?.image!}
									layout="fill"
									objectFit="cover"
									priority
									quality={100}
									alt={session?.user.name}
								/>
							)}
						</div>
						<div className="flex flex-col ml-4">
							<p className="text-sm font-semibold">
								{session?.user?.name}
							</p>
							<p className="text-xs">
								<span className="text-green-500">Online</span>
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-y-2 mt-4">
						<a
							href="#"
							className="text-sm font-semibold hover:text-gray-100">
							Profile
						</a>
						<a
							href="#"
							onClick={() => {
								setIsOpen(false);
								signOut();
							}}
							className="text-sm font-semibold hover:text-gray-100">
							Logout
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DropdownProfile;
