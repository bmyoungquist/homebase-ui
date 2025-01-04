import { House } from 'lucide-react';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] });

export default function Logo() {
	return (
		<div className="flex flex-row gap-2 items-center justify-center">
			<div className="rounded-md bg-primary p-1 max-h-min drop-shadow-lg">
				<House className="size-4 stroke-primary-foreground" />
			</div>
			<span
				className={`font-black text-2xl  ${nunito.className} drop-shadow-lg`}
			>
				Homebase
			</span>
		</div>
	);
}
