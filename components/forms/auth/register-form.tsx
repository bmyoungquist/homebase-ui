'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RegisterSchema } from '@/schema';
import { Control, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormInput,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import RequiredIndicator from '@/components/ui/required-indicator';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { NewPasswordFields } from '../partial/new-password';
import { useTransition } from 'react';

export function RegisterForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const [formActionIsPending] = useTransition();
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			confirmPassword: '',
		},
	});

	async function onSubmit(formData: z.infer<typeof RegisterSchema>) {
		const result = await fetch('http://localhost:3000/v1/users', {
			method: 'POST',
			body: JSON.stringify({
				email: formData.email,
				firstName: formData.firstName,
				lastName: formData.lastName,
				password: formData.password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		if (result.ok) {
			return router.push(`login?email=${formData.email}`);
		} else {
			toast({
				variant: 'destructive',
				title: 'Oops! Something went wrong.',
				description: JSON.stringify(await result.json()),
			});
		}
	}

	return (
		<div className={cn('flex flex-col gap-6 ', className)} {...props}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Register</h1>
				<p className="text-balance text-sm text-muted-foreground">
					Enter your email and password below to create an account
				</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-6">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Email <RequiredIndicator />
									</FormLabel>
									<FormControl>
										<FormInput
											{...field}
											type="email"
											placeholder="email@example.com"
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
									<FormLabel>
										First Name <RequiredIndicator />
									</FormLabel>
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
								</FormItem>
							)}
						/>
						<NewPasswordFields
							passwordControl={
								form.control as unknown as Control<{
									password: string;
								}>
							}
							confirmPasswordControl={
								form.control as unknown as Control<{
									confirmPassword: string;
								}>
							}
						/>
						<Button
							type="submit"
							className="w-full"
							loading={formActionIsPending}
						>
							Register
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account?{' '}
						<Link
							href="/login"
							className="underline underline-offset-4"
						>
							Log in
						</Link>
					</div>
				</form>
			</Form>
		</div>
	);
}
