import Image from "next/image";

import { useGetSeveralBrowseCategories } from "@/hooks/spotify";
import { getRandomColor } from "@/lib/utils/color-mapping";
import Loader from "./shared/loader";

export default function Browse() {
	const { data, isLoading } = useGetSeveralBrowseCategories();
	return (
		<div className="flex flex-col space-y-3">
			<h1 className="text-4xl font-bold text-white">
				What are you looking for?
			</h1>

			<p className="text-white text-lg">Browse All</p>

			<div className="grid grid-cols-3 gap-4">
				{isLoading ? (
					<Loader />
				) : (
					data?.categories?.items?.map((category) => (
						<div
							key={category.id}
							className={`w-full flex flex-col p-4 overflow-hidden rounded-lg shadow-lg relative min-h-[200px]`}
							style={{
								backgroundColor: getRandomColor(),
							}}>
							<h1 className="text-white font-bold text-lg tracking-wide">
								{category.name}
							</h1>
							<div className="flex w-full absolute bottom-0 left-6 justify-end">
								<div className="relative w-[100px] h-[100px] rotate-[28deg]">
									<Image
										src={category.icons[0].url}
										layout="fill"
										priority
										alt={category.name}
									/>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
