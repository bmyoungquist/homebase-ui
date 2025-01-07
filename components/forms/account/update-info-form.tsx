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
import { UpdateAccountInfoSchema } from '@/schema/update-account-info';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export function UpdateAccountInfoForm({
	className,
}: React.ComponentPropsWithoutRef<'form'>) {
	const { data: session, update } = useSession();
	const { pending: formActionIsPending } = useFormStatus();
	const { toast } = useToast();

	const form = useForm({
		resolver: zodResolver(UpdateAccountInfoSchema),
		defaultValues: {
			email: session?.user?.email ?? '',
			firstName: session?.user?.firstName ?? '',
			lastName: session?.user?.lastName ?? '',
		},
	});

	useEffect(() => {
		if (!session?.user) return;

		form.setValue('email', session.user.email);
		form.setValue('firstName', session.user.firstName);
		form.setValue('lastName', session.user.lastName);
	}, [session]);

	const onSubmit = async (
		formData: z.infer<typeof UpdateAccountInfoSchema>
	) => {
		const result = await fetch(
			`http://localhost:3000/v1/users/${session?.user?.id}`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					email: formData.email,
					firstName: formData.firstName,
					lastName: formData.lastName,
				}),
				headers: { 'Content-Type': 'application/json' },
			}
		);

		if (result.ok) {
			update({
				user: { ...formData },
			});
			toast({
				variant: 'success',
				title: 'Success!',
				description: 'Your information has been updated.',
			});
		} else {
			toast({
				variant: 'destructive',
				title: 'Oops! Something went wrong.',
				description: `We were unable to update your information.\n ${JSON.stringify(
					await result.json()
				)}`,
			});
		}
	};

	return (
		<div className={cn('flex flex-col gap-2', className)}>
			<h1 className="text-xl font-bold">Account Info</h1>
			<Form {...form}>
				<form className="w-96" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<FormInput
											{...field}
											type="email"
											placeholder="Email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<FormInput
											{...field}
											placeholder="First Name"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<FormInput
											{...field}
											placeholder="Last Name"
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
							Save
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
