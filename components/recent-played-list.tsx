import { useRef } from "react";
import { FaSpinner } from "react-icons/fa";
import { BsMusicNoteList } from "react-icons/bs";

import { useGetRecentlyPlayed } from "@/hooks/spotify";
import RecentPlayedItem from "./recent-played-item";

import { useIntersectionObserver, useIsomorphicLayoutEffect } from "@/hooks";

export default function RecentPlayedList() {
	const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
		useGetRecentlyPlayed();

	return (
		<div className="flex flex-col bg-black w-[40%] h-screen text-gray-500 px-6 py-4">
			<h1 className="flex items-center gap-x-2">
				<span>
					<BsMusicNoteList size="20" />
				</span>
				Recently Played
			</h1>
			{isLoading && (
				<div className="flex h-[50%] items-center justify-center">
					<FaSpinner size="23" className="animate-spin" />
				</div>
			)}
			{!isLoading && (
				<div className="flex flex-col space-y-7 mt-4 w-full px-4 py-4 h-[32rem] overflow-y-auto">
					{data?.pages.map((page) => {
						return page.items.map((item, key) => (
							<RecentPlayedItem key={key} data={item} />
						));
					})}

					<Loader
						show={hasNextPage! || isFetchingNextPage}
						onFetchNextPage={() => fetchNextPage()}
					/>
				</div>
			)}
		</div>
	);
}

type LoaderProps = {
	onFetchNextPage?: () => void;
	show: boolean;
};

const Loader = (props: LoaderProps) => {
	const { onFetchNextPage, show } = props;

	const ref = useRef<HTMLDivElement | null>(null);
	const entry = useIntersectionObserver(ref, {});
	const isVisible = !!entry?.isIntersecting;

	useIsomorphicLayoutEffect(() => {
		if (isVisible && show) {
			onFetchNextPage && onFetchNextPage();
		}
	}, [isVisible, show]);

	return (
		<div ref={ref} className="flex justify-center">
			{show && <FaSpinner size="18" className="animate-spin" />}
		</div>
	);
};
