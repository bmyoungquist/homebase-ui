import { ChangePasswordForm } from '@/components/forms/account/change-password-form';
import { UpdateAccountInfoForm } from '@/components/forms/account/update-info-form';
import { DeleteAccountForm } from '@/components/forms/account/delete-account-form';

export default function AccountSettings() {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-0">
				<h1 className="text-2xl font-bold">Account Settings</h1>
				<p className="text-sm text-muted-foreground">
					These settings are for your individual account
				</p>
			</div>
			<section id="AccountInfo" className="flex flex-col gap-2">
				<UpdateAccountInfoForm />
			</section>
			<section id="Password" className="flex flex-col gap-2">
				<ChangePasswordForm />
			</section>
			<section id="DeleteAccount" className="flex flex-col gap-4 mb-8">
				<DeleteAccountForm />
			</section>
		</div>
	);
}
