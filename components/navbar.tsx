import DropdownProfile from "./dropdown-profile";

export default function Navbar() {
	return (
		<div className="sticky z-10 top-0 bg-black text-gray-300 p-4 flex flex-col w-full h-20">
			<div className="ml-auto">
				<DropdownProfile />
			</div>
		</div>
	);
}
