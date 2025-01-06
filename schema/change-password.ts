import * as z from 'zod';

export const ChangePasswordSchema = z.object({
	password: z.string(),
	newPassword: z.string(),
	newPasswordConfirmation: z.string(),
});
