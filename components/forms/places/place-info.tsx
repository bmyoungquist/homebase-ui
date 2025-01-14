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
import { useToast } from '@/hooks/use-toast';
import { deletePlace } from '@/lib/services/places';
import { cn } from '@/lib/utils';
import { PlaceInfoSchema } from '@/schema/place-info';
import { zodResolver } from '@hookform/resolvers/zod';
import { Description } from '@radix-ui/react-toast';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Place {
	id: number
	name: string
	description?: string
	streetOne?: string
	streetTwo?: string
	city?: string
	state?: string
	zipCode?: string
	country?: string
}


export default function PlaceInfoForm({ id }: { id?: number }) {
	const [formActionIsPending] = useTransition();
	const path = usePathname()
	const { toast } = useToast()
	const router = useRouter()
	const [place, setPlace] = useState<Place>()
	const [isNew, setIsNew] = useState<boolean>(true)

	useEffect(() => {
		if (!id) return
		fetch(`http://localhost:3000/v1/places/${id}`).then(async res => {
			if (res.status === 404) router.push('/places/new')
			if (res.status === 200) {
				setPlace((await res.json()) as Place)
				setIsNew(false)
			}
		})
	}, [])

	useEffect(() => {
		if (!place) return

		form.reset({
			name: place.name ?? '',
			description: place.description ?? '',
			address1: place.streetOne ?? '',
			address2: place.streetTwo ?? '',
			city: place.city ?? '',
			state: place.state ?? '',
			zipCode: place.zipCode ?? '',
			country: place.country ?? '',
		})
	}, [place])

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

	const onSubmit = async (formData: z.infer<typeof PlaceInfoSchema>) => {
		toast({
			variant: 'default',
			title: 'Info',
			description: 'sending request to api',
		})
		const result = await fetch("http://localhost:3000/v1/places", {
			method: 'POST',
			body: JSON.stringify({
				name: formData.name,
				description: formData.description,
				streetOne: formData.address1,
				streetTwo: formData.address2,
				city: formData.city,
				state: formData.state,
				zipCode: formData.zipCode,
			}),
			headers: { 'Content-Type': 'application/json' },
		})

		if (result.ok) {
			toast({
				variant: 'success',
				title: 'Success!',
				description: `We created the place.\n ${JSON.stringify(
					await result.json()
				)}`,
			})
		} else {
			toast({
				variant: 'destructive',
				title: 'Oops! Something went wrong.',
				description: `We were unable to update your password.\n ${JSON.stringify(
					await result.json()
				)}`,
			})
		}
	};

	const deleteExistingPlace = async (e) => {
		e.preventDefault()

		const result = await deletePlace(id)

		if (result.ok) {
			return router.push('/places')
		}

		toast({
			variant: 'destructive',
			title: 'Oops! Something went wrong.',
			description: JSON.stringify((await result).json())
		})
	}

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
										<div className="flex-flex-col w-3/4 max-w-3/4">
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
						<div className="flex flex-row gap-4 mt-2 w-full">
							<Button
								variant="secondary"
								type="submit"
								className='w-full'
								disabled={formActionIsPending}
							>
								{isNew ? "Create" : "Save"}
							</Button>
							<Button
								variant={'destructive'}
								type='button'
								className={cn('w-full', isNew ? 'hidden' : '')}
								disabled={formActionIsPending}
								onClick={deleteExistingPlace}
							>
								Delete
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</>
	);
}