import { UpdateAccountInfoForm } from '@/components/forms/account/update-info-form';
import { Button } from '@/components/ui/button';

export default function AccountSettings() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-0">
				<h1 className="text-2xl font-bold">Account Settings</h1>
				<p className="text-sm text-muted-foreground">
					These settings are for your individual account
				</p>
			</div>
			<section id="AccountInfo" className="flex flex-col gap-2">
				<UpdateAccountInfoForm />
			</section>
			<section id="Password" className="flex flex-col gap-2"></section>
			<section id="DeleteOrInactivate" className="flex flex-row gap-4">
				<Button variant="destructive">Delete Account</Button>
				<Button variant="secondary">Inactivate Account</Button>
			</section>
		</div>
	);
}
