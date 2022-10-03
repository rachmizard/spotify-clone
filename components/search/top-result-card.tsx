import Image from "next/image";

type TopResultCardProps = {
	imageUrl: string | undefined;
	id: string | undefined;
	name: string | undefined;
};

export default function TopResultCard(props: TopResultCardProps) {
	const { id, imageUrl, name } = props;

	return (
		<div className="flex flex-col gap-y-2 bg-zinc-800 hover:bg-zinc-700 transition duration-200 rounded-md shadow-lg px-8 py-6">
			<div className="relative w-32 h-32 rounded-full overflow-hidden">
				{imageUrl && (
					<Image
						src={imageUrl}
						layout="fill"
						priority
						objectFit="cover"
						quality={100}
						alt={id}
					/>
				)}
			</div>
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold text-white">{name}</h2>
				<div className="bg-zinc-900 px-4 block max-w-[6rem] py-1 rounded-full">
					<p className="uppercase text-sm text-white text-center truncate tracking-wider">
						Artist
					</p>
				</div>
			</div>
		</div>
	);
}
