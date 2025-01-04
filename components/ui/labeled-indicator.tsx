import CircleIndicator from "@/components/ui/circle-indicator";

export function LabeledIndicator({ text, state }: { text: string | undefined, state: boolean | undefined }) {
	return (
		<div className="flex flex-col text-xs font-sans">
			<span className="flex flex-row gap-1 items-center align-middle text-muted-foreground">
				<CircleIndicator
					state={state}
				/>
				{text}
			</span>
		</div>
	)
}