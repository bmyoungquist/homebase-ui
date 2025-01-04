import Logo from "@/components/ui/logo";
import { Camera } from "lucide-react";
import Image from "next/image";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	interface SplashImage {
		imageUri: string
		attribution: string | undefined
		attributionUrl: string | undefined
	}

	const imagesWithAttribution: SplashImage[] = [
		{
			imageUri: "cutting-bread.jpg",
			attribution: "Grace O'Driscoll via Unsplash",
			attributionUrl: "https://unsplash.com/photos/person-holding-green-vegetable-and-brown-bread-_ODVlLRQoTk"
		},
		{
			imageUri: "dairy-aisle.jpg",
			attribution: "Kenny Eliason via Unsplash",
			attributionUrl: "https://unsplash.com/photos/assorted-drinks-on-white-commercial-refrigerator-SvhXD3kPSTY"
		},
		{
			imageUri: "campbells-close-up.jpg",
			attribution: "Kelly Common via Unsplash",
			attributionUrl: "https://unsplash.com/photos/cans-of-campbell-campbell-campbell-campbell-campbell-campbell-campbell-campbell-campbell-campbell-campbell-campbell-campbell-campbell-4N1kpd04Ls0"
		},
		{
			imageUri: "eggplant.jpg",
			attribution: "Kirill Slavetski via Unsplash",
			attributionUrl: "https://unsplash.com/photos/brown-glass-bottles-on-brown-wooden-table-zqu529G_7uo"
		},
		{
			imageUri: "clothes.jpg",
			attribution: "Annie Spratt via Unsplash",
			attributionUrl: "https://unsplash.com/photos/clothes-lot-on-shelf-lkvD9xlWdU0"
		},

	]

	const randomImage = imagesWithAttribution[1]


	return (
		<>
			{/* <CheckAuthRedirect /> */}
			<div className="grid min-h-svh lg:grid-cols-2">
				<div className="flex flex-col gap-4 p-6 md:p-10">
					<div className="flex justify-center gap-2 md:justify-start">
						<Logo />
					</div>
					<div className="flex flex-1 items-center justify-center">
						<div className="w-full max-w-md">
							{children}
						</div>
					</div>

				</div>
				<div className="relative hidden bg-muted lg:block">
					<div className="absolute inset-0 h-full w-full object-cover grayscale opacity-40 z-10 pointer-events-none" style={{
						background: 'url(https://grainy-gradients.vercel.app/noise.svg)'
					}}></div>
					<Image
						src={`/images/auth/splash/${randomImage.imageUri}`}
						alt="Image"
						className="absolute inset-0 h-full w-full object-cover brightness-[0.8] dark:brightness-[0.6] grayscale pointer-events-none"
						width={2000}
						height={2000}
					/>
					{
						randomImage.attribution && randomImage.attributionUrl && (
							<a href={randomImage.attributionUrl} target="_blank" className="opacity-70 dark:opacity-60">
								<div className="absolute right-3 bottom-3 flex flex-row items-center gap-1 bg-background py-1 px-2 rounded-md z-50">
									<Camera className="size-5 max-h-min" />
									<span className="max-h-min font-semibold">{randomImage.attribution}</span>
								</div>
							</a>
						)
					}
				</div>
			</div >
		</>
	)
}