type ListBaseResponse<T> = {
	href: string;
	items: T[];
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	cursors: {
		after: string;
		before: string;
	};
};
