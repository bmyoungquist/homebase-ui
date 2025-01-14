"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deletePlace } from "@/lib/services/places"
import { ColumnDef } from "@tanstack/react-table"
import { Copy, Eye, MoreHorizontal, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { PlaceColumnData, usePlaceColumnDataStore } from "./state"
import { useToast } from "@/hooks/use-toast"

export const PlaceColumns: ColumnDef<PlaceColumnData>[] = [
	{
		accessorKey: "name",
		header: "Name",
		enableSorting: true
	},
	{
		accessorKey: "description",
		header: "Description",
		enableSorting: true
	},
	{
		accessorKey: "address",
		header: "Address",
		enableSorting: true,
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const place = row.original
			const router = useRouter()
			const { placeData, setPlaceData } = usePlaceColumnDataStore();
			const { toast } = useToast()

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(place.address ?? "")}
						>
							<Copy /> Copy address
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => router.push(`/places/${place.id}`)}
						>
							<Eye /> View place
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive"
							onClick={async () => {
								const result = await deletePlace(place.id)
								if (result.ok) {
									setPlaceData(placeData?.filter(data => data !== place))
									toast({
										variant: "success",
										description: `Successfully deleted place: ${place.name}`
									})
								}
								else {
									toast({
										variant: "destructive",
										description: `Failed to delete place: ${place.name}`
									})
								}
							}}
						>
							<Trash /> Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu >
			)
		},
	}
]