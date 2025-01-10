'use client';

import PlaceInfoForm from './forms/places/place-info';
import Section from './ui/section';
import { MapContainer } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function PlaceInfo() {
	return (
		<>
			<Section title="Place Info">
				<div className="flex flex-row justify-between gap-4">
					<div className="w-full">
						<PlaceInfoForm />
					</div>
					<div className="w-full h-96 rounded-md border">
						<MapContainer
							center={[41.54789902834696, -88.20381706910018]}
							zoom={14}
							scrollWheelZoom={false}
							style={{
								height: '100%',
								minHeight: '100%',
								borderRadius: 'calc(var(--radius) - 2px)',
							}}
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
