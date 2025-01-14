"use client"

import { useEffect, useState } from "react"
import { DataTable } from "../data-table"
import { PlaceColumns } from "./columns"
import { PlaceColumnData, usePlaceColumnDataStore } from "./state"

export function PlacesTable() {
	const { placeData, setPlaceData } = usePlaceColumnDataStore();

	useEffect(() => {
		fetch('http://localhost:3000/v1/places').then(async res => {
			const data = await res.json()
			data.map(data => data.address = data.streetOne ? [data.streetOne, data.city, `${data.state} ${data.zipCode}`].join(", ") : "")
			setPlaceData(data)
		})
	}, [])

	return <DataTable columns={PlaceColumns} data={placeData || []} />
}