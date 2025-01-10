'use client';

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
import { PlaceInfoSchema } from '@/schema/place-info';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function PlaceInfoForm() {
	const [formActionIsPending] = useTransition();

	const form = useForm({
		resolver: zodResolver(PlaceInfoSchema),
		defaultValues: {
			name: '',
			description: '',
			address1: '',
			address2: '',
			city: '',
			state: '',
			zipCode: '',
			country: '',
		},
	});

	const onSubmit = async (formData: z.infer<typeof PlaceInfoSchema>) => {};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<div className="flex flex-row gap-2 items-center justify-between">
										<FormLabel className="w-1/4">
											Name
										</FormLabel>
										<div className="flex-flex-col w-3/4">
											<FormControl>
												<FormInput
													{...field}
													placeholder="Name"
												/>
											</FormControl>
											<FormMessage />
										</div>
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<div className="flex flex-row gap-2 items-center justify-between">
									<FormLabel className="w-1/4">
										Description
									</FormLabel>
									<div className="flex-flex-col w-3/4">
										<FormControl>
											<FormInput
												{...field}
												placeholder="Description"
											/>
										</FormControl>
										<FormMessage />
									</div>
								</div>
							)}
						/>
						<FormField
							control={form.control}
							name="address1"
							render={({ field }) => (
								<div className="flex flex-row gap-2 items-center justify-between">
									<FormLabel className="w-1/4">
										Address 1
									</FormLabel>
									<div className="flex-flex-col w-3/4">
										<FormControl>
											<FormInput
												{...field}
												placeholder="Address 1"
											/>
										</FormControl>
										<FormMessage />
									</div>
								</div>
							)}
						/>
						<FormField
							control={form.control}
							name="address2"
							render={({ field }) => (
								<div className="flex flex-row gap-2 items-center justify-between">
									<FormLabel className="w-1/4">
										Address 2
									</FormLabel>
									<div className="flex-flex-col w-3/4">
										<FormControl>
											<FormInput
												{...field}
												placeholder="Address 2"
											/>
										</FormControl>
										<FormMessage />
									</div>
								</div>
							)}
						/>
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<div className="flex flex-row gap-2 items-center justify-between">
									<FormLabel className="w-1/4">
										City
									</FormLabel>
									<div className="flex-flex-col w-3/4">
										<FormControl>
											<FormInput
												{...field}
												placeholder="City"
											/>
										</FormControl>
										<FormMessage />
									</div>
								</div>
							)}
						/>
						<FormField
							control={form.control}
							name="state"
							render={({ field }) => (
								<div className="flex flex-row gap-2 items-center justify-between">
									<FormLabel className="w-1/4">
										State
									</FormLabel>
									<div className="flex-flex-col w-3/4">
										<FormControl>
											<FormInput
												{...field}
												placeholder="State"
											/>
										</FormControl>
										<FormMessage />
									</div>
								</div>
							)}
						/>
						<FormField
							control={form.control}
							name="zipCode"
							render={({ field }) => (
								<div className="flex flex-row gap-2 items-center justify-between">
									<FormLabel className="w-1/4">
										Zip Code
									</FormLabel>
									<div className="flex-flex-col w-3/4">
										<FormControl>
											<FormInput
												{...field}
												placeholder="Zip Code"
											/>
										</FormControl>
										<FormMessage />
									</div>
								</div>
							)}
						/>
						<Button
							variant="secondary"
							type="submit"
							className="mt-2"
							disabled={formActionIsPending}
						>
							Save
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
}
