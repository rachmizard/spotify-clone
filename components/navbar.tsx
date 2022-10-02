import { useRouter } from "next/router";
import { BsSpotify } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";

import DropdownProfile from "./dropdown-profile";
import { useSearchStore } from "@/stores";

export default function Navbar() {
	const router = useRouter();
	const { query, setQuery } = useSearchStore((store) => store);

	return (
		<div className="sticky z-10 top-0 bg-black text-gray-300 p-4 flex flex-col w-full h-20">
			<div className="flex justify-between items-center gap-x-4">
				<BsSpotify size="36" className="text-green-500" />

				<div className="flex w-[50%] flex-col">
					<div className="relative flex items-center">
						<BiSearchAlt size="24" className="absolute left-4" />
						<input
							placeholder="What do you want to listen to?"
							value={query}
							onChange={(event) => {
								setQuery(event.target.value);
							}}
							className="rounded-full transition duration-150 bg-zinc-800 w-full h-10 px-4 pl-12 text-gray-300 hover:transition-none hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-300 font-light text-sm tracking-wide"
							onClick={() => router.push("/search")}
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
