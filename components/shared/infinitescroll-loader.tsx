import { useRef } from "react";

import { useIntersectionObserver, useIsomorphicLayoutEffect } from "@/hooks";
import Loader from "./loader";

type InfiniteScrollLoaderProps = {
	onFetchNextPage?: () => void;
	show: boolean;
};

const InfiniteScrollLoader = (props: InfiniteScrollLoaderProps) => {
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
			{show && <Loader />}
		</div>
	);
};

export default InfiniteScrollLoader;
