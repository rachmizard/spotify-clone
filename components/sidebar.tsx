import { signOut } from "next-auth/react";
import Link from "next/link";
import { BiLibrary, BiLogOut, BiSearch } from "react-icons/bi";
import { MdHomeFilled } from "react-icons/md";

import Playlist from "./playlist";

const navigations = [
	{
		name: "Home",
		href: "/",
		icon: MdHomeFilled,
	},

	{
		name: "Search",
		href: "/search",
		icon: BiSearch,
	},

	{
		name: "Libraries",
		href: "/libraries",
		icon: BiLibrary,
	},
];

export default function Sidebar() {
	return (
		<div className="bg-black flex flex-col px-8 py-8 w-[30%]">
			<div className="flex flex-col gap-y-8 justify-between h-full">
				<div className="flex flex-col gap-y-5">
					<ul className="flex flex-col text-gray-300 space-y-4">
						{navigations.map((nav, key) => (
							<Link key={key} href={nav.href} passHref>
								<li className="group hover:cursor-pointer py-2">
									<a
										href={nav.href}
										className="flex items-center space-x-3">
										<nav.icon
											fontSize="24"
											className="300"
										/>
										<span className="group-hover:text-gray-500 transition-all duration-200 font-semibold">
											{nav.name}
										</span>
									</a>
								</li>
							</Link>
						))}
					</ul>
					<div className="border-[0.5px] border-gray-700" />

					<Playlist />
				</div>

				<button
					className="flex text-gray-300 hover:text-gray-500 items-center space-x-3 self-center"
					onClick={() => signOut()}>
					<BiLogOut />
					<span>
						<span>Logout</span>
					</span>
				</button>
			</div>
		</div>
	);
}
