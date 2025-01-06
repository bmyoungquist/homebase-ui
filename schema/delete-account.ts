import * as z from 'zod';

export const DeleteAccountSchema = z.object({
	email: z.string().min(1, {
		message: 'Please enter your email',
	}),
	password: z.string().min(1, { message: 'Please enter your password' }),
});
