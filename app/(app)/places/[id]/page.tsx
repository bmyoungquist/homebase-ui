import PlaceInfo from "@/components/place-info"
import Section from "@/components/ui/section"

export default function ExistingPlacePage({ params: { id } }: { params: { id: number } }) {
	return (
		<div className="flex flex-col gap-4">
			<PlaceInfo id={id} />
			<Section title="Locations">
				<></>
			</Section>
			<Section title="Items Here">
				<></>
			</Section>
			<Section title="Items Here">
				<></>
			</Section>
		</div>
	)
}