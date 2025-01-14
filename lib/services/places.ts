export async function deletePlace(id: number | undefined) {
	return fetch(`http://localhost:3000/v1/places/${id}`, {
		method: 'DELETE'
	})
}