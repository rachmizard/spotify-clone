import { BsSpotify } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";

import DropdownProfile from "./dropdown-profile";

export default function Navbar() {
	return (
		<div className="sticky z-10 top-0 bg-black text-gray-300 p-4 flex flex-col w-full h-20">
			<div className="flex justify-between items-center gap-x-4">
				<BsSpotify size="36" className="text-green-500" />

				<div className="flex w-[50%] flex-col">
					<div className="relative flex items-center">
						<BiSearchAlt size="24" className="absolute left-4" />
						<input
							placeholder="What do you want to listen to?"
							className="rounded-full transition duration-150 bg-zinc-800 w-full h-10 px-4 pl-12 text-gray-300 hover:transition-none hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-300 font-light text-sm tracking-wide"
						/>
					</div>
				</div>

				<div className="flex">
					<DropdownProfile />
				</div>
			</div>
		</div>
	);
}
