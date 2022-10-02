import create from "zustand";

type UseSearchStore = {
	query: string;
	setQuery: (q: string) => void;
};

const useSearchStore = create<UseSearchStore>((set) => ({
	query: "",
	setQuery: (q) => {
		set({ query: q });
	},
}));

export default useSearchStore;
