import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import Link from "next/link"

interface BreadcrumbSlotProps {
	params: {
		breadcrumbs: string[]
	}
}

export default async function BreadcrumbsSlot({ params }: BreadcrumbSlotProps) {
	const breadcrumbs = (await params).breadcrumbs

	return (
		<div className="flex items-center gap-2 px-4">
			<SidebarTrigger className="-ml-1" />
			<Separator orientation="vertical" className="mr-2 h-4" />
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem className="hidden md:block">
						<Link href="/dashboard">
							Home
						</Link>
					</BreadcrumbItem>
					{breadcrumbs.map((crumb, ix) => {
						if (!(crumb === "dashboard" && ix === 0))
							return (
								<>
									<BreadcrumbSeparator key={`bs-${crumb}-${ix}`} className="hidden md:block" />
									<BreadcrumbItem key={`bi-${crumb}-${ix}`}>
										<BreadcrumbPage key={`bp-${crumb}-${ix}`}>
											<Link key={`l-${crumb}-${ix}`} href={`/${breadcrumbs.slice(0, ix + 1).join("/")}z`} passHref>
												{crumb.charAt(0).toUpperCase() + crumb.slice(1, crumb.length)}
											</Link>
										</BreadcrumbPage>
									</BreadcrumbItem>
								</>
							)
					})}
				</BreadcrumbList>
			</Breadcrumb>
		</div>)
}