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
import { LoginSchema } from '@/schema';
import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export function LoginForm({
	className,
}: React.ComponentPropsWithoutRef<'form'>) {
	const { pending: formActionIsPending } = useFormStatus();
	const searchParams = useSearchParams();
	const email = searchParams.get('email');

	const form = useForm({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: email ?? '',
			password: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
		const result = await signIn('credentials', {
			...data,
			redirect: true,
			callbackUrl: '/',
		});
	};

	return (
		<div className={cn('flex flex-col gap-6', className)}>
			<div className="flex flex-col items-center gap-2 text-center">
				<h1 className="text-2xl font-bold">Login to your account</h1>
				<p className="text-balance text-sm text-muted-foreground">
					Enter your email below to login to your account
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
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<FormInput
											{...field}
											type="password"
											placeholder="Password"
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
							Login
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{' '}
						<Link
							href="/register"
							className="underline underline-offset-4"
						>
							Sign up
						</Link>
					</div>
				</form>
			</Form>
		</div>
	);
}
