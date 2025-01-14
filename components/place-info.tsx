'use client';

import PlaceInfoForm from './forms/places/place-info';
import Section from './ui/section';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function PlaceInfo({ id }: { id?: number }) {
	const position: LatLngTuple = [41.54789902834696, -88.20381706910018]

	const ResizeMap = () => {
		const map = useMap();
		map.on("resize", () => { })
		map.invalidateSize();
		return null;
	};

	return (
		<>
			<Section title="Place Info">
				<div className="flex flex-row justify-between gap-4 items-center">
					<div className="w-full">
						<PlaceInfoForm id={id} />
					</div>
					<div className="h-96 w-1/2">
						<MapContainer
							center={position}
							zoom={15}
							scrollWheelZoom={false}
							className="rounded-md h-96 spect-square filter grayscale dark:invert"
						>
							<ResizeMap />
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
						</MapContainer>
					</div>
				</div>
			</Section>
		</>
	);
}
