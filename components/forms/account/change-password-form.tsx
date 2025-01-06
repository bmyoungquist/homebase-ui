'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormInput,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormStatus } from 'react-dom';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { ChangePasswordSchema } from '@/schema/change-password';

export function ChangePasswordForm({
	className,
}: React.ComponentPropsWithoutRef<'form'>) {
	const { data: session, update } = useSession();
	const { pending: formActionIsPending } = useFormStatus();
	const { toast } = useToast();

	const form = useForm({
		resolver: zodResolver(ChangePasswordSchema),
		defaultValues: {
			password: '',
			newPassword: '',
			newPasswordConfirmation: '',
		},
	});

	const onSubmit = async (formData: z.infer<typeof ChangePasswordSchema>) => {
		const result = await fetch(
			`http://localhost:3000/v1/users/${session?.user?.id}/password`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					password: formData.password,
					newPassword: formData.newPassword,
					newPasswordConfirmation: formData.newPasswordConfirmation,
				}),
				headers: { 'Content-Type': 'application/json' },
			}
		);

		if (result.ok) {
			toast({
				variant: 'success',
				title: 'Success!',
				description: 'Your password has been updated',
			});
		} else {
			toast({
				variant: 'destructive',
				title: 'Oops! Something went wrong.',
				description: `We were unable to update your password.\n ${JSON.stringify(
					await result.json()
				)}`,
			});
		}
	};

	return (
		<div className={cn('flex flex-col gap-2', className)}>
			<h1 className="text-xl font-bold">Password</h1>
			<Form {...form}>
				<form className="w-96" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-2">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Current Password</FormLabel>
									<FormControl>
										<FormInput
											{...field}
											type="password"
											placeholder="Current Password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="newPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
									<FormControl>
										<FormInput
											{...field}
											type="password"
											placeholder="New Password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="newPasswordConfirmation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm New Password</FormLabel>
									<FormControl>
										<FormInput
											{...field}
											type="password"
											placeholder="Confirm New Password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							variant="secondary"
							type="submit"
							className="max-w-min mt-2"
							disabled={formActionIsPending}
						>
							Change Password
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
