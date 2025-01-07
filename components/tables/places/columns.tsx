"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Place = {
	id: number
	name: string
	description: string
	address: string
}

export const PlaceColumns: ColumnDef<Place>[] = [
	{
		accessorKey: "name",
		header: "Name"
	},
	{
		accessorKey: "description",
		header: "Description"
	},
	{
		accessorKey: "address",
		header: "Address"
	},
]