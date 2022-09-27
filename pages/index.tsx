import MainLayout from "@/layouts/main-layout";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
	const { data: session } = useSession();

	return (
		<MainLayout>
			<div className="flex flex-col items-center justify-center h-full">
				<h1 className="text-4xl font-bold text-white">
					Welcome{" "}
					<span className="text-green-500">{session?.user.name}</span>
				</h1>
			</div>
		</MainLayout>
	);
};

export default Home;
