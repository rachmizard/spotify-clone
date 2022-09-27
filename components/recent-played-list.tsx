import { BsMusicNoteList } from "react-icons/bs";

import { useGetRecentlyPlayed } from "@/hooks/spotify";
import RecentPlayedItem from "./recent-played-item";
import Button from "./shared/button/button";

export default function RecentPlayedList() {
	const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
		useGetRecentlyPlayed();

	return (
		<div className="flex flex-col bg-black w-[40%] h-screen text-gray-500 px-6 py-4">
			<h1 className="flex items-center gap-x-2">
				<span>
					<BsMusicNoteList size="20" />
				</span>
				Recently Played
			</h1>
			<div className="flex flex-col space-y-7 mt-4 w-full px-4 py-4 h-[32rem] overflow-y-auto">
				{data?.pages.map((page) => {
					return page.items.map((item, key) => (
						<RecentPlayedItem key={key} data={item} />
					));
				})}

				{hasNextPage && (
					<Button
						isLoading={isFetchingNextPage}
						colorScheme="green"
						onClick={() => fetchNextPage()}>
						Load More
					</Button>
				)}
			</div>
		</div>
	);
}
