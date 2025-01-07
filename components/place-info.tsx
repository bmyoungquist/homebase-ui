'use client';

import PlaceInfoForm from './forms/places/place-info';
import Section from './ui/section';
import { MapContainer } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';

export default function PlaceInfo() {
	return (
		<>
			<Section title="Place Info">
				<div className="flex flex-row justify-between">
					<PlaceInfoForm />
					<div className="w-96 w-96 rounded-md border">
						<MapContainer
							center={[51.505, -0.09]}
							zoom={10}
							scrollWheelZoom={false}
						>
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
