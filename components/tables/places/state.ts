import { create } from 'zustand'

export type PlaceColumnData = {
	id: number
	name: string
	description: string
	address: string
}

export type PlaceColumnDataSore = {
	placeData: PlaceColumnData[] | undefined
	setPlaceData: (newPlaceData: PlaceColumnData[] | undefined) => void
}

const usePlaceColumnDataStore = create<PlaceColumnDataSore>((set) => ({
	placeData: undefined,
	setPlaceData: (newPlaceData: PlaceColumnData[] | undefined) => set((state) => ({ placeData: newPlaceData }))
}))

export { usePlaceColumnDataStore }