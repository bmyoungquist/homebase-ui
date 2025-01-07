import * as z from 'zod';

export const ChangePasswordSchema = z.object({
	currentPassword: z.string(),
	password: z.string(),
	confirmPassword: z.string(),
});
