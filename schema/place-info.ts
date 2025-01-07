import * as z from 'zod';

export const PlaceInfoSchema = z.object({
	name: z.string().min(1, { message: 'Place name is Required' }),
	description: z.string(),
	address1: z.string(),
	address2: z.string(),
	city: z.string(),
	state: z.string(),
	zipCode: z.string(),
	country: z.string(),
});
