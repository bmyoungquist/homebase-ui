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
import { signOut, useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { ChangePasswordSchema } from '@/schema/change-password';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { DeleteAccountSchema } from '@/schema/delete-account';

export function DeleteAccountForm({
	className,
}: React.ComponentPropsWithoutRef<'form'>) {
	const { data: session, update } = useSession();
	const { pending: formActionIsPending } = useFormStatus();
	const { toast } = useToast();

	const deleteAccountForm = useForm({
		resolver: zodResolver(DeleteAccountSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (formData: z.infer<typeof DeleteAccountSchema>) => {
		const result = await fetch(
			`http://localhost:3000/v1/users/${session?.user?.id}`,
			{
				method: 'DELETE',
				body: JSON.stringify({
					email: formData.email,
					password: formData.password,
				}),
				headers: { 'Content-Type': 'application/json' },
			}
		);

		if (result.ok) {
			signOut();
		} else {
			toast({
				variant: 'destructive',
				title: 'Oops! Something went wrong.',
				description: `We were unable to delete your account.\n ${JSON.stringify(
					await result.json()
				)}`,
			});
		}
	};

	return (
		<div className={cn('flex flex-col gap-2', className)}>
			<h1 className="text-xl font-bold">Danger Zone</h1>
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="destructive" className="max-w-min">
						Delete Account
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[600px]">
					<DialogHeader>
						<DialogTitle>Delete Account?</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete your account? This
							action cannot be undone and may result in the
							deletion of any organization that you are the sole
							owner of.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-2">
						<Form {...deleteAccountForm}>
							<form
								onSubmit={deleteAccountForm.handleSubmit(
									onSubmit
								)}
								className="flex flex-col gap-2"
							>
								<FormField
									control={deleteAccountForm.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<FormInput
													{...field}
													type="email"
													placeholder="Account Email"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={deleteAccountForm.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<FormInput
													{...field}
													type="password"
													placeholder="Account Password"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<DialogFooter>
									<Button
										variant="destructive"
										type="submit"
										className="mt-4"
										disabled={formActionIsPending}
									>
										Delete Account
									</Button>
								</DialogFooter>
							</form>
						</Form>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}
