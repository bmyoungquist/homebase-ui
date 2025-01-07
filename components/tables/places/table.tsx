"use client"

import { DataTable } from "../data-table"
import { Place, PlaceColumns } from "./columns"

export function PlacesTable() {
	const places: Place[] = [
		{
			id: 1,
			name: "Gleneagle House",
			description: "Mom's House",
			address: "2024 Gleneagle Drive, Plainfield IL, 60586"
		},
		{
			id: 1,
			name: "City Apartment",
			description: "Brandon's Place",
			address: "400 E South Water St, Chicago IL, 60586"
		}
	]

	return <DataTable columns={PlaceColumns} data={places} />
}