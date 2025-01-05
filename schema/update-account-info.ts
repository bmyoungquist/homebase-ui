import * as z from 'zod';

export const UpdateAccountInfoSchema = z.object({
	email: z.string().email({
		message: 'Please enter a valid email address',
	}),
	firstName: z.string().min(1, { message: 'Please enter your first name' }),
	lastName: z.string().min(0),
});
