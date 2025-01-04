import * as z from 'zod';

export const RegisterSchema = z
	.object({
		email: z.string().email({
			message: 'Please enter a valid email address',
		}),
		firstName: z
			.string()
			.min(1, { message: 'Please enter your first name' }),
		lastName: z.string().min(0),
		password: z.string().refine(
			(password) => {
				return (
					password.length >= 8 &&
					/[a-z]/.test(password) &&
					/[A-Z]/.test(password) &&
					/[0-9]/.test(password) &&
					/[#?!@$%^&*-]/.test(password)
				);
			},
			{ message: 'Please enter a valid password' }
		),
		confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
	})
	.refine((data) => data.confirmPassword === data.password, {
		message: 'Passwords must match',
	});
