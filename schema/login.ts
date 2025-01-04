import * as z from 'zod';

export const LoginSchema = z.object({
	email: z
		.string()
		.email({
			message: 'Please enter a valid email address',
		})
		.min(1, { message: 'please enter your email address' }),
	password: z.string().min(1, { message: 'Please enter your password' }),
});
