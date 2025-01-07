import * as z from 'zod';

export const ChangePasswordSchema = z.object({
	name: z.string().min(1, { message: "Place name is Required" }),
	description: z.string(),
	streetAddress: z.string(),
	state: z.string(),
	zipCode: z.string(),
	country: z.string(),
});
