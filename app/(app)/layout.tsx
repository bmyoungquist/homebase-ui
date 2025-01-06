import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function AppLayout({
	children,
	breadcrumbs,
}: {
	children: React.ReactNode;
	breadcrumbs: React.ReactNode;
}) {
	console.log(children);
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="sticky flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					{breadcrumbs}
				</header>
				<div className="px-16 pt-4">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
