export default function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="rounded-md border">
			<div className="flex flex-row justify-start ps-4 py-2 border-b w-100 rounded-t-md">
				<h1 className="text-sm">{title}</h1>
			</div>
			<div className="p-4">{children}</div>
		</div>
	);
}
