import { FaSpinner } from "react-icons/fa";

export default function Loader() {
	return (
		<div className="flex h-full text-gray-500 items-center justify-center">
			<FaSpinner size="23" className="animate-spin" />
		</div>
	);
}
