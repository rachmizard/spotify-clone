import { useState } from "react";
import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { FaSpotify } from "react-icons/fa";

import Button from "@/components/shared/button/button";

export default function SignInPage() {
	const [isLoading, setIsLoading] = useState(false);

	const onSignIn = async () => {
		setIsLoading(true);
		await signIn("spotify", {
			callbackUrl: "/",
			redirect: true,
		});
		setIsLoading(false);
	};

	return (
		<div className="max-w-lg mx-auto flex items-center justify-center w-full min-h-screen">
			<div className="flex flex-col space-y-5 w-full items-center px-10 py-8 rounded-lg shadow-lg">
				<FaSpotify size="200" className="text-green-500" />

				<h1 className="text-2xl text-center text-white">
					Sign In Now!
				</h1>

				<Button
					colorScheme="green"
					isLoading={isLoading}
					onClick={onSignIn}>
					Sign In
				</Button>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (session) {
		return {
			props: {
				session,
			},
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			session,
		},
	};
};
