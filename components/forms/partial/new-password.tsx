import { FormControl, FormField, FormInput, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LabeledIndicator } from "@/components/ui/labeled-indicator";
import RequiredIndicator from "@/components/ui/required-indicator";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { Control } from "react-hook-form";

export function NewPasswordFields({
	passwordLabel = "Password",
	passwordControl,
	confirmPasswordLabel = "ConfirmPassword",
	confirmPasswordControl
}: {
	passwordLabel?: string,
	passwordControl: Control<{ password: string }>,
	confirmPasswordLabel?: string,
	confirmPasswordControl: Control<{ confirmPassword: string }>
}
) {
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
		if (password === undefined || password === "") {
			setEightCars(undefined);
			setOneLower(undefined);
			setOneUpper(undefined);
			setOneNumber(undefined);
			setOneSpecial(undefined);
			return
		}

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
		<>
			<FormField
				control={passwordControl}
				name="password"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							{passwordLabel} <RequiredIndicator />
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
				control={confirmPasswordControl}
				name="confirmPassword"
				render={({ field }) => (
					<FormItem>
						<FormLabel>
							{confirmPasswordLabel} <RequiredIndicator />
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
				)} />
		</>
	)
}