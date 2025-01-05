'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { RegisterSchema } from '@/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormStatus } from 'react-dom';
import {
	Form,
	FormControl,
	FormField,
	FormInput,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { LabeledIndicator } from '@/components/ui/labeled-indicator';
import RequiredIndicator from '@/components/ui/required-indicator';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export function RegisterForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const { pending: formActionIsPending } = useFormStatus();
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

	const [eightChars, setEightCars] = useState<boolean | undefined>();
	const [oneLower, setOneLower] = useState<boolean | undefined>();
	const [oneUpper, setOneUpper] = useState<boolean | undefined>();
	const [oneNumber, setOneNumber] = useState<boolean | undefined>();
	const [oneSpecial, setOneSpecial] = useState<boolean | undefined>();
	const [passwordsMatch, setPasswordsMatch] = useState<boolean | undefined>();
	const [password, setPassword] = useDebounce<string | undefined>(
		undefined,
		300
	);
	const [passwordConfirmation, setPasswordConfirmation] = useDebounce<
		string | undefined
	>(undefined, 300);

	useEffect(() => {
		if (password === undefined) return;

		setEightCars(password.length >= 8);
		setOneLower(/[a-z]/.test(password));
		setOneUpper(/[A-Z]/.test(password));
		setOneNumber(/[0-9]/.test(password));
		setOneSpecial(/[#?!@$%^&*-]/.test(password));
	}, [password]);

	useEffect(() => {
		if (passwordConfirmation === undefined)
			return setPasswordsMatch(undefined);
		if (password === '' && passwordConfirmation === '')
			return setPasswordsMatch(undefined);
		setPasswordsMatch(passwordConfirmation === password);
	}, [passwordConfirmation, password]);

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
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Password <RequiredIndicator />
									</FormLabel>
									<div className="flex flex-col text-xs font-sans">
										<LabeledIndicator
											text="1 lowercase"
											state={oneLower}
										/>
										<LabeledIndicator
											text="1 uppercase"
											state={oneUpper}
										/>
										<LabeledIndicator
											text="1 number"
											state={oneNumber}
										/>
										<LabeledIndicator
											text="1 special character (#?!@$%^&*-)"
											state={oneSpecial}
										/>
										<LabeledIndicator
											text="8 characters minimum"
											state={eightChars}
										/>
									</div>
									<FormControl>
										<FormInput
											{...field}
											placeholder="Password"
											type="password"
											onKeyUp={(e) =>
												setPassword(
													(
														e.target as HTMLInputElement
													).value
												)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Confirm Password <RequiredIndicator />
									</FormLabel>
									<LabeledIndicator
										text="Passwords match"
										state={passwordsMatch}
									/>
									<FormControl>
										<FormInput
											{...field}
											placeholder="Confirm Password"
											type="password"
											onKeyUp={(e) =>
												setPasswordConfirmation(
													(
														e.target as HTMLInputElement
													).value
												)
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
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
