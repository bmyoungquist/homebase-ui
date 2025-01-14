import Section from '@/components/ui/section';
import dynamic from 'next/dynamic';

export default function NewLocationPage() {
	const PlaceInfo = dynamic(() => import("@/components/place-info"))

	return (
		<PlaceInfo />
	);
}
